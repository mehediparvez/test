import axios from 'axios';
import { io } from 'socket.io-client';

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:5000/api';
const CHATBOT_WS_URL = import.meta.env.VITE_CHATBOT_WS_URL || 'http://localhost:5000';

// Create axios instance with default config for REST endpoints
const chatbotApi = axios.create({
  baseURL: CHATBOT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
chatbotApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
chatbotApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Chatbot API Error:', error);
    return Promise.reject(error);
  }
);

// WebSocket connection class
class ChatbotWebSocket {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.eventHandlers = new Map();
  }

  connect(userId) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(CHATBOT_WS_URL, {
      transports: ['websocket', 'polling'],
      auth: {
        userId: userId,
        token: localStorage.getItem('accessToken')
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to chatbot WebSocket');
      this.isConnected = true;
      this.emit('connectionChange', { connected: true });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chatbot WebSocket');
      this.isConnected = false;
      this.emit('connectionChange', { connected: false });
    });

    this.socket.on('message', (data) => {
      this.emit('message', data);
    });

    this.socket.on('typing', (data) => {
      this.emit('typing', data);
    });

    this.socket.on('error', (data) => {
      this.emit('error', data);
    });

    this.socket.on('symptoms_list', (data) => {
      this.emit('symptoms', data);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  sendMessage(message, userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', {
        message: message,
        user_id: userId,
        timestamp: Date.now()
      });
      return true;
    }
    return false;
  }

  getSymptoms() {
    if (this.socket && this.isConnected) {
      this.socket.emit('get_symptoms');
      return true;
    }
    return false;
  }

  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event).add(handler);
  }

  off(event, handler) {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).delete(handler);
    }
  }

  emit(event, data) {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }
  }
}

// Export both REST API and WebSocket
export const chatbotService = {
  // Get health status (REST)
  getHealth: async () => {
    try {
      const response = await chatbotApi.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Chatbot service is unavailable');
    }
  },

  // Get available symptoms (REST fallback)
  getSymptoms: async () => {
    try {
      const response = await chatbotApi.get('/symptoms');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch symptoms');
    }
  },

  // Predict disease based on symptoms (REST fallback)
  predictDisease: async (symptoms) => {
    try {
      const response = await chatbotApi.post('/predict', { symptoms });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(error.response.data.error || 'Prediction failed');
      }
      throw new Error('Failed to get disease prediction');
    }
  },

  // Chat with the bot (REST fallback)
  sendMessage: async (message) => {
    try {
      const response = await chatbotApi.post('/chat', { message });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(error.response.data.error || 'Chat failed');
      }
      throw new Error('Failed to send message');
    }
  },

  // WebSocket instance
  createWebSocket: () => new ChatbotWebSocket()
};

export default chatbotService;
