import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const MessageInput = ({ onSendMessage, disabled, placeholder }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200 bg-white p-4"
    >
      <div className="flex items-center space-x-2">
        <div className="flex-1 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || "Type your symptoms or ask a question..."}
            disabled={disabled}
            className={`flex-1 border border-gray-300 rounded-l-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
              disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`p-3 rounded-r-lg transition-colors ${
              message.trim() && !disabled
                ? 'bg-teal-500 text-white hover:bg-teal-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
          </button>
        </div>
      </div>
      
      {/* Quick action buttons */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => !disabled && setMessage("I have a headache and fever")}
          disabled={disabled}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🤒 Fever & Headache
        </button>
        <button
          type="button"
          onClick={() => !disabled && setMessage("I'm feeling nauseous and have stomach pain")}
          disabled={disabled}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🤢 Stomach Issues
        </button>
        <button
          type="button"
          onClick={() => !disabled && setMessage("I have a cough and chest pain")}
          disabled={disabled}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          😷 Respiratory
        </button>
        <button
          type="button"
          onClick={() => !disabled && setMessage("What symptoms can you help me with?")}
          disabled={disabled}
          className="px-3 py-1 text-xs bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ❓ Help
        </button>
      </div>
    </form>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

MessageInput.defaultProps = {
  disabled: false,
  placeholder: "Type your symptoms or ask a question...",
};

export default MessageInput;