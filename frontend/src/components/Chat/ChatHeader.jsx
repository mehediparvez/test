import React from 'react';
import PropTypes from 'prop-types';
import ProfileDropdown from './ProfileDropdown';

const ChatHeader = ({ user, botStatus }) => {
  const getStatusInfo = () => {
    switch (botStatus) {
      case 'online':
        return { color: 'text-green-500', text: 'Medical Assistant Online', icon: '🟢' };
      case 'offline':
        return { color: 'text-red-500', text: 'Medical Assistant Offline', icon: '🔴' };
      case 'error':
        return { color: 'text-yellow-500', text: 'Medical Assistant Error', icon: '🟡' };
      default:
        return { color: 'text-gray-500', text: 'Connecting...', icon: '⚪' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Medical Chat Assistant</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">AI-powered symptom analysis and health guidance</span>
          <span className="text-xs">•</span>
          <div className="flex items-center space-x-1">
            <span className="text-xs">{statusInfo.icon}</span>
            <span className={`text-xs ${statusInfo.color}`}>{statusInfo.text}</span>
          </div>
        </div>
      </div>
      <ProfileDropdown user={user} />
    </div>
  );
};

ChatHeader.propTypes = {
  user: PropTypes.object.isRequired,
  botStatus: PropTypes.oneOf(['online', 'offline', 'error', 'checking']),
};

ChatHeader.defaultProps = {
  botStatus: 'checking',
};

export default ChatHeader;