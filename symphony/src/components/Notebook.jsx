import React from 'react';
import { BookOpen } from 'lucide-react';

function Notebook({ isOpen, entries }) {
  return (
    <div
      className={`fixed top-[56px] right-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold flex items-center mb-4">
          <BookOpen className="w-5 h-5 text-indigo-300 mr-2" /> Detective's Notebook
        </h2>
        <div className="space-y-4">
          {entries &&
            entries.map((entry, index) => (
              <div key={index} className="bg-gray-900 p-3 rounded border border-gray-700">
                <h3 className="text-indigo-300 font-medium mb-1">{entry.title}</h3>
                <p className="text-gray-300 text-sm">{entry.content}</p>
              </div>
            ))}
          {!entries || entries.length === 0 && (
            <p className="text-gray-400 italic">No entries yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notebook;