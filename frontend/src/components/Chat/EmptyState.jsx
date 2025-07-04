import React from 'react';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-teal-100 rounded-full p-6 mb-4">
        <div className="text-4xl">🩺</div>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Medical Assistant Ready</h3>
      <p className="text-gray-500 max-w-md mb-6">
        I'm here to help analyze your symptoms and provide health guidance. You can:
      </p>
      
      <div className="space-y-3 text-left max-w-md">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-xs">1</span>
          <span>Describe your symptoms in natural language</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-xs">2</span>
          <span>Get AI-powered health condition predictions</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-xs">3</span>
          <span>Receive personalized health recommendations</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 max-w-md">
        <p className="text-xs text-yellow-800">
          <strong>Disclaimer:</strong> This is an AI assistant for informational purposes only. 
          Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;