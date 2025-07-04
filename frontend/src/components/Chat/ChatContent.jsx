import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import EmptyState from './EmptyState';

const ChatContent = ({ messages, isLoading, botStatus }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderTypingIndicator = () => {
    if (!isLoading) return null;
    
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">🤖</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-sm max-w-xs">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  };

  const renderOfflineMessage = () => {
    if (botStatus !== 'offline') return null;
    
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <span>🔴</span>
            <span className="font-medium">Medical Assistant Offline</span>
          </div>
          <p className="text-sm text-red-500 mt-2">
            The medical assistant is currently unavailable. Please try again later.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.length === 0 && botStatus !== 'offline' ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {botStatus === 'offline' && renderOfflineMessage()}
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isOwnMessage={message.sender === 'user'}
            />
          ))}
          {renderTypingIndicator()}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

ChatContent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string,
      type: PropTypes.string,
      data: PropTypes.object,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  botStatus: PropTypes.oneOf(['online', 'offline', 'error', 'checking']),
};

ChatContent.defaultProps = {
  isLoading: false,
  botStatus: 'checking',
};

export default ChatContent;