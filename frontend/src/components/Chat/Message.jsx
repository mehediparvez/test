import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, isOwnMessage }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageText = (text) => {
    // Handle markdown-style formatting
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`bold-${part}-${index}`}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const getMessageIcon = () => {
    if (isOwnMessage) return null;
    
    switch (message.type) {
      case 'diagnosis':
        return '🩺';
      case 'greeting':
        return '👋';
      case 'help':
        return '❓';
      case 'error':
        return '⚠️';
      case 'options':
        return '📋';
      default:
        return '🤖';
    }
  };

  const getMessageColor = () => {
    if (isOwnMessage) return 'bg-teal-500 text-white';
    
    switch (message.type) {
      case 'error':
        return 'bg-red-50 text-red-800 border border-red-200';
      case 'diagnosis':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'greeting':
        return 'bg-green-50 text-green-800 border border-green-200';
      default:
        return 'bg-white text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {!isOwnMessage && (
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
          <span className="text-white text-sm">{getMessageIcon()}</span>
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-3 shadow-sm ${
          isOwnMessage
            ? 'bg-teal-500 text-white rounded-br-none'
            : `${getMessageColor()} rounded-bl-none`
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">
          {formatMessageText(message.text)}
        </div>
        
        {/* Show additional data for diagnosis messages */}
        {message.type === 'diagnosis' && message.data && (
          <div className="mt-3 pt-2 border-t border-blue-300">
            <div className="text-xs text-blue-600">
              <strong>Symptoms analyzed:</strong> {message.data.symptoms_found?.join(', ')}
            </div>
          </div>
        )}
        
        <p
          className={`text-xs mt-2 text-right ${
            isOwnMessage ? 'text-teal-100' : 'text-gray-500'
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
      {isOwnMessage && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center ml-3 mt-1 flex-shrink-0">
          <span className="text-white text-sm">👤</span>
        </div>
      )}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    type: PropTypes.string,
    data: PropTypes.object,
  }).isRequired,
  isOwnMessage: PropTypes.bool.isRequired,
};

export default Message;