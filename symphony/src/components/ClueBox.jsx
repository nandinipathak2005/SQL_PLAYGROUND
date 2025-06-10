import React from 'react';

function ClueBox({ clue }) {
  return (
    <div className="bg-indigo-900 bg-opacity-30 p-3 rounded border border-indigo-800 text-indigo-200">
      <p className="font-medium">Clue:</p>
      <p className="italic">{clue}</p>
    </div>
  );
}

export default ClueBox;