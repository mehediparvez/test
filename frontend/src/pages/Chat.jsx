import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatContent from '../components/Chat/ChatContent';
import MessageInput from '../components/Chat/MessageInput';
import { chatbotService } from '../api/chatbotApi';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [botStatus, setBotStatus] = useState('checking');
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef(null);
  
  useEffect(() => {
    // Check chatbot health and initialize WebSocket
    initializeChatbot();
    
    return () => {
      // Cleanup WebSocket connection on unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  const initializeChatbot = async () => {
    try {
      // Check health first
      await chatbotService.getHealth();
      setBotStatus('online');
      
      // Initialize WebSocket connection
      if (user?.id) {
        initializeWebSocket();
      }
    } catch (error) {
      setBotStatus('offline');
      console.error('Chatbot is offline:', error);
      
      // Add offline message
      const offlineMessage = {
        id: Date.now(),
        text: "I'm currently offline. Please try again later or use the quick symptom checker.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        read: true,
        type: 'error'
      };
      setMessages([offlineMessage]);
    }
  };

  const initializeWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = chatbotService.createWebSocket();
    
    // Set up event listeners
    socketRef.current.on('connectionChange', ({ connected }) => {
      setBotStatus(connected ? 'online' : 'offline');
    });

    socketRef.current.on('message', (messageData) => {
      const botMessage = {
        id: messageData.id || Date.now(),
        text: messageData.text,
        sender: 'bot',
        timestamp: new Date(messageData.timestamp).toISOString(),
        read: true,
        type: messageData.type || 'default',
        data: messageData.data || null
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      
      // If it's a diagnosis, offer more options
      if (messageData.type === 'diagnosis' && messageData.data) {
        setTimeout(() => {
          const followUpMessage = {
            id: Date.now() + 1,
            text: "I can provide more information about:\n• Medications\n• Diet recommendations\n• Exercise suggestions\n• Detailed precautions\n\nJust ask me about any of these!",
            sender: 'bot',
            timestamp: new Date().toISOString(),
            read: true,
            type: 'options',
            data: messageData.data
          };
          setMessages(prevMessages => [...prevMessages, followUpMessage]);
        }, 1500);
      }
    });

    socketRef.current.on('typing', ({ typing }) => {
      setIsTyping(typing);
    });

    socketRef.current.on('error', (errorData) => {
      console.error('WebSocket error:', errorData);
      const errorMessage = {
        id: Date.now(),
        text: errorData.error || 'An error occurred. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        read: true,
        type: 'error'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setIsTyping(false);
    });

    // Connect to WebSocket
    socketRef.current.connect(user?.id);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      if (botStatus === 'online' && socketRef.current?.isConnected) {
        // Send via WebSocket
        const sent = socketRef.current.sendMessage(message, user?.id);
        if (!sent) {
          throw new Error('Failed to send message via WebSocket');
        }
      } else {
        // Fallback to REST API
        setIsLoading(true);
        const response = await chatbotService.sendMessage(message);
        
        if (response.success) {
          const botMessage = {
            id: Date.now() + 1,
            text: response.response,
            sender: 'bot',
            timestamp: new Date().toISOString(),
            read: true,
            type: response.type || 'default',
            data: response.data || null
          };
          
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } else {
          throw new Error(response.error || 'Failed to get response');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again or rephrase your question.`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        read: true,
        type: 'error'
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setBotStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && messages.length === 0) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 flex flex-col">
        <ChatHeader user={user} botStatus={botStatus} />
        
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
          <ChatContent 
            messages={messages} 
            currentUser={user} 
            isLoading={isLoading || isTyping}
            botStatus={botStatus}
          />
          <MessageInput 
            onSendMessage={handleSendMessage} 
            disabled={isLoading || isTyping || botStatus === 'offline'}
            placeholder={
              botStatus === 'offline' 
                ? "Chatbot is currently offline..." 
                : isTyping
                ? "Bot is typing..."
                : "Type your symptoms or ask a question..."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;