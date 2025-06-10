import React from 'react';

function StoryBox({ text, color = 'text-gray-300' }) {
  return (
    <div className={`bg-gray-800 p-4 rounded-lg border border-gray-700`}>
      <h3 className="text-lg font-medium text-indigo-300 mb-2">Story</h3>
      <p className={`${color} leading-relaxed mb-4`}>{text}</p>
    </div>
  );
}

export default StoryBox;