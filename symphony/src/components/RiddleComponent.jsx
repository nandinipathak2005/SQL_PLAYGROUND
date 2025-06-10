import React, { useState } from 'react';

function RiddleComponent({ options, onSelect, result }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    if (onSelect) {
      onSelect(optionId);
    }
  };

  return (
    <div className="space-y-2">
      {options &&
        options.map((option) => (
          <button
            key={option.id}
            className={`w-full bg-gray-900 p-3 rounded border ${
              selectedOption === option.id
                ? 'border-indigo-500'
                : 'border-gray-700 hover:border-yellow-500'
            } text-white text-left transition-all`}
            onClick={() => handleOptionSelect(option.id)}
            disabled={result}
          >
            {option.text}
          </button>
        ))}
      {result && result.success && (
        <div className="bg-green-800 p-2 rounded text-green-300">{result.message}</div>
      )}
      {result && result.error && (
        <div className="bg-red-800 p-2 rounded text-red-300">{result.message}</div>
      )}
      {!options || options.length === 0 && (
        <p className="text-gray-400 italic">No riddle options available.</p>
      )}
    </div>
  );
}

export default RiddleComponent;