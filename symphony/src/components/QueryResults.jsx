// import React from 'react';

// function QueryResults({ result }) {
//   if (!result) {
//     return null;
//   }

//   if (result.loading) {
//     return (
//       <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
//         <h3 className="text-lg font-medium text-indigo-300 mb-2">Query Results</h3>
//         <div className="bg-gray-900 p-3 rounded text-gray-400 italic">Executing query...</div>
//       </div>
//     );
//   }

//   if (result.error) {
//     return (
//       <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
//         <h3 className="text-lg font-medium text-red-400 mb-2">Query Error</h3>
//         <div className="bg-gray-900 p-3 rounded text-red-500">{result.error}</div>
//       </div>
//     );
//   }

//   if (result.data) {
//     if (result.data.resultText) {
//       return (
//         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
//           <h3 className="text-lg font-medium text-indigo-300 mb-2">Query Result</h3>
//           <div className="bg-gray-900 p-3 rounded text-gray-300">{result.data.resultText}</div>
//           {result.data.table && (
//             <div className="mt-4 overflow-x-auto">
//               <table className="w-full text-sm text-left text-gray-400">
//                 <thead className="text-xs text-gray-500 uppercase bg-gray-700">
//                   <tr>
//                     {Object.keys(result.data.table[0]).map((key) => (
//                       <th key={key} scope="col" className="px-6 py-3">
//                         {key}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {result.data.table.map((row, index) => (
//                     <tr key={index} className="bg-gray-800 border-b border-gray-700">
//                       {Object.values(row).map((value, index) => (
//                         <td key={index} className="px-6 py-4">
//                           {value}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       );
//     }
//   }

//   return null; // No result to display
// }

// export default QueryResults;
import React from 'react';

function QueryResults({ result }) {
  if (!result) {
    return null;
  }

  if (result.loading) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-indigo-300 mb-2">Query Results</h3>
        <div className="bg-gray-900 p-3 rounded text-gray-400 italic">Executing query...</div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-red-400 mb-2">Query Error</h3>
        <div className="bg-gray-900 p-3 rounded text-red-500">{result.error}</div>
      </div>
    );
  }

  if (result.data) {
    if (result.data.resultText) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-indigo-300 mb-2">Query Result</h3>
          <div className="bg-gray-900 p-3 rounded text-gray-300">{result.data.resultText}</div>
          {result.data.table && result.data.table.length > 0 && ( // ✅ Check if table exists AND has elements
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-gray-700">
                  <tr>
                    {Object.keys(result.data.table[0]).map((key) => (
                      <th key={key} scope="col" className="px-6 py-3">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.table.map((row, index) => (
                    <tr key={index} className="bg-gray-800 border-b border-gray-700">
                      {Object.values(row).map((value, index) => (
                        <td key={index} className="px-6 py-4">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {result.data.table && result.data.table.length === 0 && ( // ✅ Handle empty table case
            <div className="mt-2 bg-gray-900 p-3 rounded text-gray-400 italic">No data returned for this query.</div>
          )}
        </div>
      );
    }
  }

  return null; // No result to display
}

export default QueryResults;