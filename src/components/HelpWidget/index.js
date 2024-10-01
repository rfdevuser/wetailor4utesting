import React, { useState } from 'react';

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHelpWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed bottom-5 right-5 bg-white border border-gray-200 rounded-lg shadow-lg p-3 transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
      <div className="flex items-center">
        <div 
          className="text-2xl cursor-pointer border-4 border-black"
          onClick={toggleHelpWidget}
        >
          🗨️
        </div>
        {isOpen && (
          <div className="ml-2">
            <p className="text-sm text-gray-700">Hey! I’m your designer. Need any help?</p>
            {/* You can add more elements like a contact form or a chat button here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpWidget;
