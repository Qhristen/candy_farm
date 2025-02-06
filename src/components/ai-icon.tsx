import React from 'react';

const AIIconButton = () => {
  return (
    <div>
  
      {/* Fixed AI Icon Button */}
      <button className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.75 21.75l-.144-1.187a2.25 2.25 0 0 0-1.51-1.51L13.75 19l1.187-.144a2.25 2.25 0 0 0 1.51-1.51L16.75 16.25l.144 1.187a2.25 2.25 0 0 0 1.51 1.51l1.187.144-1.187.144a2.25 2.25 0 0 0-1.51 1.51Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default AIIconButton;
