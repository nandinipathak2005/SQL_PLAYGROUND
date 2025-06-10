import React from 'react';

function SQLQueryInterface({ queries, onQuerySelect }) {
  return (
    <div className="space-y-4">
      {queries &&
        queries.map((query, index) => (
          <div
            key={index}
            className="bg-gray-900 p-3 rounded border border-gray-700 hover:border-indigo-500 cursor-pointer transition-all"
            onClick={() => onQuerySelect(query)}
          >
            <p className="text-indigo-300 font-mono text-sm whitespace-pre-wrap">{query}</p>
          </div>
        ))}
      {!queries || queries.length === 0 && (
        <p className="text-gray-400 italic">No query options available.</p>
      )}
    </div>
  );
}

export default SQLQueryInterface;