import React from 'react';

function GameProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  const renderSteps = () => {
    const steps = [];
    for (let i = 1; i <= total; i++) {
      steps.push(
        <div key={i} className="flex items-center">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              current >= i ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
          >
            {i === total ? '★' : i}
          </div>
          {i < total && (
            <div
              className={`h-1 w-8 ${current > i ? 'bg-indigo-600' : 'bg-gray-700'}`}
            ></div>
          )}
        </div>
      );
    }
    return steps;
  };

  return (
    <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">{renderSteps()}</div>
        <div className="text-sm text-gray-400">Puzzle {current} of {total}</div>
      </div>
    </div>
  );
}

export default GameProgressBar;