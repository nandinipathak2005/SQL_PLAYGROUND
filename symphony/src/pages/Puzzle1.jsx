// // import { useState, useEffect, useContext } from 'react';
// // import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { GameContext } from '../GameContext';
// // import { executeQuery, fetchPuzzle } from '../api';
// // import QueryResults from '../components/QueryResults';
// // import StoryBox from '../components/StoryBox';
// // import ClueBox from '../components/ClueBox';
// // import SQLQueryInterface from '../components/SQLQueryInterface';
// // import GameProgressBar from '../components/GameProgressBar';
// // import Notebook from '../components/Notebook';

// // export default function Puzzle1() {
// //   const navigate = useNavigate();
// //   const { gameTime, deductTime, addNotebookEntry, updatePuzzle } = useContext(GameContext);
// //   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
// //   const [puzzleData, setPuzzleData] = useState(null);
// //   const [selectedQuery, setSelectedQuery] = useState(null);
// //   const [queryResult, setQueryResult] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const loadPuzzle = async () => {
// //       try {
// //         const data = await fetchPuzzle(1);
// //         setPuzzleData(data);
// //       } catch (err) {
// //         setError(err.message || 'Failed to load puzzle data.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadPuzzle();
// //   }, []);

// //   const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

// //   const handleExecuteQuery = async () => {
// //     if (!selectedQuery) return alert('Please select a query.');

// //     setQueryResult({ loading: true, data: null, error: null });
// //     try {
// //       // const result = await executeQuery(selectedQuery);
// //       const result = await executeQuery(selectedQuery, puzzleData?.id || 1);

// //       setQueryResult({ loading: false, data: result, error: null });

// //       if (result?.notebookUpdate) addNotebookEntry(result.notebookUpdate);
// //       if (result?.next) {
// //         updatePuzzle(2);
// //         navigate(result.next);
// //       } else if (result?.branch) {
// //         navigate(result.branch);
// //       } else if (result?.timePenalty) {
// //         deductTime(result.timePenalty);
// //       }
// //     } catch (err) {
// //       setQueryResult({ loading: false, data: null, error: err.message });
// //       deductTime(30);
// //     }
// //   };

// //   const formatTime = (minutes) => {
// //     const hours = Math.floor(minutes / 60);
// //     const mins = minutes % 60;
// //     return `${hours}:${mins < 10 ? '0' + mins : mins}`;
// //   };

// //   if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
// //   if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error: {error}</div>;

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
// //       <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
// //         <div className="flex items-center">
// //           <Link to="/game" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
// //             <ArrowLeft className="w-5 h-5 mr-1" />
// //             <span className="text-sm">Back to Game</span>
// //           </Link>
// //           <h1 className="text-xl font-medium text-white">Puzzle 1: Who accessed the vault last?</h1>
// //         </div>
// //         <div className="flex items-center gap-4">
// //           <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
// //             <Clock className="w-4 h-4 text-indigo-300 mr-2" />
// //             <span className="text-white font-medium">{formatTime(gameTime)}</span>
// //           </div>
// //           <button
// //             onClick={() => setIsNotebookOpen(!isNotebookOpen)}
// //             className={`flex items-center px-3 py-1 rounded-full transition-colors ${
// //               isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
// //             }`}
// //           >
// //             <BookOpen className="w-4 h-4 mr-2" />
// //             Notebook
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex min-h-[calc(100vh-56px)]">
// //         <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
// //           <GameProgressBar current={1} total={4} />
// //           <div className="space-y-6 mt-4">
// //             {puzzleData?.story && <StoryBox text={puzzleData.story} />}
// //             {puzzleData?.clue && <ClueBox clue={puzzleData.clue} />}

// //             {puzzleData?.queries && (
// //               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
// //                 <h3 className="text-lg font-medium text-indigo-300 mb-2 flex items-center">
// //                   <Code className="w-5 h-5 mr-2" />
// //                   SQL Query Interface
// //                 </h3>
// //                 <p className="text-gray-400 text-sm mb-3">
// //                   Choose your SQL query carefully. Each incorrect query will cost you 30 minutes.
// //                 </p>
// //                 <SQLQueryInterface 
// //                   queries={puzzleData.queries.map(q => q.text)} 
// //                   onQuerySelect={handleQuerySelect} 
// //                 />
// //                 <div className="mt-4 flex justify-end">
// //                   <button
// //                     onClick={handleExecuteQuery}
// //                     className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center"
// //                   >
// //                     Execute Query <ArrowRight className="w-4 h-4 ml-2" />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {queryResult && <QueryResults result={queryResult} />}
// //           </div>
// //         </div>
// //         <Notebook isOpen={isNotebookOpen} />
// //       </div>
// //     </div>
// //   );
// // }
// // import { useState, useEffect, useContext } from 'react';
// // import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { GameContext } from '../GameContext';
// // import { executeQuery, fetchPuzzle } from '../api';
// // import QueryResults from '../components/QueryResults';
// // import StoryBox from '../components/StoryBox';
// // import ClueBox from '../components/ClueBox';
// // import SQLQueryInterface from '../components/SQLQueryInterface';
// // import GameProgressBar from '../components/GameProgressBar';
// // import Notebook from '../components/Notebook';

// // export default function Puzzle1() {
// //   const navigate = useNavigate();
// //   const {
// //     gameTime,
// //     deductTime,
// //     addNotebookEntry,
// //     updatePuzzle,
// //     notebookEntries, // ✅ <-- Get notebook entries from context
// //   } = useContext(GameContext);

// //   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
// //   const [puzzleData, setPuzzleData] = useState(null);
// //   const [selectedQuery, setSelectedQuery] = useState(null);
// //   const [queryResult, setQueryResult] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const loadPuzzle = async () => {
// //       try {
// //         const data = await fetchPuzzle(1);
// //         setPuzzleData(data);
// //       } catch (err) {
// //         setError(err.message || 'Failed to load puzzle data.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadPuzzle();
// //   }, []);

// //   const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

// //   const handleExecuteQuery = async () => {
// //     if (!selectedQuery) return alert('Please select a query.');

// //     setQueryResult({ loading: true, data: null, error: null });
// //     try {
// //       const result = await executeQuery(selectedQuery, puzzleData?.id || 1);
// //       setQueryResult({ loading: false, data: result, error: null });

// //       if (result?.notebookUpdate) {
// //         addNotebookEntry({
// //           title: `Puzzle 1 – Lead`,
// //           content: result.notebookUpdate,
// //         });
// //       }

// //       if (result?.next) {
// //         updatePuzzle(2);
// //         navigate(result.next);
// //       } else if (result?.branch) {
// //         navigate(result.branch);
// //       } else if (result?.timePenalty) {
// //         deductTime(result.timePenalty);
// //       }
// //     } catch (err) {
// //       setQueryResult({ loading: false, data: null, error: err.message });
// //       deductTime(30);
// //     }
// //   };

// //   const formatTime = (minutes) => {
// //     const hours = Math.floor(minutes / 60);
// //     const mins = minutes % 60;
// //     return `${hours}:${mins < 10 ? '0' + mins : mins}`;
// //   };

// //   if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
// //   if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error: {error}</div>;

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
// //       <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
// //         <div className="flex items-center">
// //           <Link to="/game" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
// //             <ArrowLeft className="w-5 h-5 mr-1" />
// //             <span className="text-sm">Back to Game</span>
// //           </Link>
// //           <h1 className="text-xl font-medium text-white">Puzzle 1: Who accessed the vault last?</h1>
// //         </div>
// //         <div className="flex items-center gap-4">
// //           <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
// //             <Clock className="w-4 h-4 text-indigo-300 mr-2" />
// //             <span className="text-white font-medium">{formatTime(gameTime)}</span>
// //           </div>
// //           <button
// //             onClick={() => setIsNotebookOpen(!isNotebookOpen)}
// //             className={`flex items-center px-3 py-1 rounded-full transition-colors ${
// //               isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
// //             }`}
// //           >
// //             <BookOpen className="w-4 h-4 mr-2" />
// //             Notebook
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex min-h-[calc(100vh-56px)]">
// //         <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
// //           <GameProgressBar current={1} total={4} />
// //           <div className="space-y-6 mt-4">
// //             {puzzleData?.story && <StoryBox text={puzzleData.story} />}
// //             {puzzleData?.clue && <ClueBox clue={puzzleData.clue} />}

// //             {puzzleData?.queries && (
// //               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
// //                 <h3 className="text-lg font-medium text-indigo-300 mb-2 flex items-center">
// //                   <Code className="w-5 h-5 mr-2" />
// //                   SQL Query Interface
// //                 </h3>
// //                 <p className="text-gray-400 text-sm mb-3">
// //                   Choose your SQL query carefully. Each incorrect query will cost you 30 minutes.
// //                 </p>
// //                 <SQLQueryInterface
// //                   queries={puzzleData.queries.map((q) => q.text)}
// //                   onQuerySelect={handleQuerySelect}
// //                 />
// //                 <div className="mt-4 flex justify-end">
// //                   <button
// //                     onClick={handleExecuteQuery}
// //                     className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center"
// //                   >
// //                     Execute Query <ArrowRight className="w-4 h-4 ml-2" />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {queryResult && <QueryResults result={queryResult} />}
// //           </div>
// //         </div>

// //         {/* ✅ Pass notebook entries */}
// //         <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzle } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import ClueBox from '../components/ClueBox';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import GameProgressBar from '../components/GameProgressBar';
// import Notebook from '../components/Notebook';

// export default function Puzzle1() {
//   const navigate = useNavigate();
//   const {
//     gameTime,
//     deductTime,
//     addNotebookEntry,
//     updatePuzzle,
//     notebookEntries, // ✅ <-- Get notebook entries from context
//   } = useContext(GameContext);

//   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//   const [puzzleData, setPuzzleData] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [queryResult, setQueryResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasQueryExecuted, setHasQueryExecuted] = useState(false); // Track if a query has been executed

//   useEffect(() => {
//     const loadPuzzle = async () => {
//       try {
//         const data = await fetchPuzzle(1);
//         setPuzzleData(data);
//       } catch (err) {
//         setError(err.message || 'Failed to load puzzle data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadPuzzle();
//   }, []);

//   const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

//   // const handleExecuteQuery = async () => {
//   //   if (!selectedQuery) return alert('Please select a query.');

//   //   setQueryResult({ loading: true, data: null, error: null });
//   //   try {
//   //     const result = await executeQuery(selectedQuery, puzzleData?.id || 1);
//   //     setQueryResult({ loading: false, data: result, error: null });
//   //     setHasQueryExecuted(true); // ✅ Set the state after successful execution

//   //     if (result?.notebookUpdate) {
//   //       addNotebookEntry({
//   //         title: `Puzzle 1 – Lead`,
//   //         content: result.notebookUpdate,
//   //       });
//   //     }

//   //     // Navigation logic moved to handleProceed
//   //   } catch (err) {
//   //     setQueryResult({ loading: false, data: null, error: err.message });
//   //     deductTime(30);
//   //   }
//   // };

//   const handleExecuteQuery = async () => {
//         if (!selectedQuery) return alert('Please select a query.');

//         setQueryResult({ loading: true, data: null, error: null });
//         try {
//           const result = await executeQuery(selectedQuery, puzzleData?.id || 1);
//           setQueryResult({ loading: false, data: result, error: null });
//           setHasQueryExecuted(true); // ✅ Set the state after successful execution

//           if (result?.notebookUpdate) {
//             addNotebookEntry({
//               title: `Puzzle 1 – Lead`,
//               content: result.notebookUpdate,
//             });
//           }

//           if (result?.next) {
//             updatePuzzle(result.next); // Use the next puzzle number from the backend
//             navigate(`/puzzle/${result.next}`);
//           } else if (result?.branch) {
//             navigate(result.branch); // Navigate to the specific branch path
//             // Optionally, you might want to update the puzzle state here as well
//             // if the branch represents a different stage or sub-puzzle.
//           } else if (result?.timePenalty) {
//             deductTime(result.timePenalty);
//           }
//         } catch (err) {
//           setQueryResult({ loading: false, data: null, error: err.message });
//           deductTime(30);
//         }
//       };

//   const handleProceed = () => {
//     // Directly navigate to puzzle 2
//     updatePuzzle(2);
//     navigate('/puzzle2');
//   };

//   const formatTime = (minutes) => {
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return `${hours}:${mins < 10 ? '0' + mins : mins}`;
//   };

//   if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
//   if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error: {error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
//       <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
//         <div className="flex items-center">
//           <Link to="/game" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
//             <ArrowLeft className="w-5 h-5 mr-1" />
//             <span className="text-sm">Back to Game</span>
//           </Link>
//           <h1 className="text-xl font-medium text-white">Puzzle 1: Who accessed the vault last?</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
//             <Clock className="w-4 h-4 text-indigo-300 mr-2" />
//             <span className="text-white font-medium">{formatTime(gameTime)}</span>
//           </div>
//           <button
//             onClick={() => setIsNotebookOpen(!isNotebookOpen)}
//             className={`flex items-center px-3 py-1 rounded-full transition-colors ${
//               isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
//             }`}
//           >
//             <BookOpen className="w-4 h-4 mr-2" />
//             Notebook
//           </button>
//         </div>
//       </div>

//       <div className="flex min-h-[calc(100vh-56px)]">
//         <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
//           <GameProgressBar current={1} total={4} />
//           <div className="space-y-6 mt-4">
//             {puzzleData?.story && <StoryBox text={puzzleData.story} />}
//             {puzzleData?.clue && <ClueBox clue={puzzleData.clue} />}

//             {puzzleData?.queries && (
//               <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
//                 <h3 className="text-lg font-medium text-indigo-300 mb-2 flex items-center">
//                   <Code className="w-5 h-5 mr-2" />
//                   SQL Query Interface
//                 </h3>
//                 <p className="text-gray-400 text-sm mb-3">
//                   Choose your SQL query carefully. Each incorrect query will cost you 30 minutes.
//                 </p>
//                 <SQLQueryInterface
//                   queries={puzzleData.queries.map((q) => q.text)}
//                   onQuerySelect={handleQuerySelect}
//                 />
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     onClick={handleExecuteQuery}
//                     className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center"
//                   >
//                     Execute Query <ArrowRight className="w-4 h-4 ml-2" />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {queryResult && <QueryResults result={queryResult} />}

//             {/* ✅ Proceed Button */}
//             {/* {hasQueryExecuted && queryResult?.error === null && (
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleProceed}
//                   className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//                 >
//                   Proceed to Puzzle 2 <ArrowRight className="w-4 h-4 ml-2" />
//                 </button>
//               </div>
//             )} */}
//             {hasQueryExecuted && queryResult?.error === null && (
//             <div className="mt-6 flex justify-end">
//               <Link
//                 to="/puzzle/2"
//                 className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//               >
//                 Proceed to Puzzle 2 <ArrowRight className="w-4 h-4 ml-2" />
//               </Link>
//             </div>
//           )}
//           </div>
//         </div>

//         {/* ✅ Pass notebook entries */}
//         <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useContext } from 'react';
import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { executeQuery, fetchPuzzle } from '../api';
import QueryResults from '../components/QueryResults';
import StoryBox from '../components/StoryBox';
import ClueBox from '../components/ClueBox';
import SQLQueryInterface from '../components/SQLQueryInterface';
import GameProgressBar from '../components/GameProgressBar';
import Notebook from '../components/Notebook';

export default function Puzzle1() {
    const navigate = useNavigate();
    const {
        gameTime,
        deductTime,
        addNotebookEntry,
        updatePuzzle,
        notebookEntries, 
        currentBranch,// ✅ <-- Get notebook entries from context
    } = useContext(GameContext);

    const [isNotebookOpen, setIsNotebookOpen] = useState(false);
    const [puzzleData, setPuzzleData] = useState(null);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [queryResult, setQueryResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasQueryExecuted, setHasQueryExecuted] = useState(false); // Track if a query has been executed
    const [currentBranchState, setCurrentBranchState] = useState('forgery');

    useEffect(() => {
        const loadPuzzle = async () => {
            try {
                console.log('currentBranchState:', currentBranch);
                const data = await fetchPuzzle(1);
                setPuzzleData(data);
            } catch (err) {
                setError(err.message || 'Failed to load puzzle data.');
            } finally {
                setLoading(false);
            }
        };
        loadPuzzle();
    }, []);

    const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

    const handleExecuteQuery = async () => {
        if (!selectedQuery) return alert('Please select a query.');

        setQueryResult({ loading: true, data: null, error: null });
        try {
            // const result = await executeQuery(selectedQuery,puzzleData?.id || 1);
             const result = await executeQuery(selectedQuery, { // ✅ Include an object with all data
      puzzleId: puzzleData?.id || 1,
      currentBranch: currentBranch, // ✅ Send the currentBranch from context
    });
            setQueryResult({ loading: false, data: result, error: null });
            setHasQueryExecuted(true); // ✅ Set the state after successful execution

            if (result?.notebookUpdate) {
                addNotebookEntry({
                    title: `Puzzle 1 – Lead`,
                    content: result.notebookUpdate,
                });
            }

            // Time penalty is still applied on incorrect queries
            if (result?.timePenalty) {
                deductTime(result.timePenalty);
            }
        } catch (err) {
            setQueryResult({ loading: false, data: null, error: err.message });
            deductTime(30);
        }
    };

    const handleProceed = () => {
        if (queryResult?.data?.branch) {
            navigate(queryResult.data.branch);
            // Optionally update puzzle state if the branch signifies a new stage
            // if (queryResult.data.branch === '/puzzle/1/forgery') {
            //   updatePuzzle(1.5); // Example: using a float for a sub-puzzle
            // }
        } else if (queryResult?.data?.next) {
            updatePuzzle(queryResult.data.next);
            navigate(`/puzzle/${queryResult.data.next}`);
        } else {
            // Fallback if neither branch nor next is provided (shouldn't happen with your logic)
            updatePuzzle(2);
            navigate('/puzzle/2');
        }
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}:${mins < 10 ? '0' + mins : mins}`;
    };

    if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
            <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/home0" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        <span className="text-sm">Back to Game</span>
                    </Link>
                    <h1 className="text-xl font-medium text-white">Puzzle 1: Who accessed the vault last?</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4 text-indigo-300 mr-2" />
                        <span className="text-white font-medium">{formatTime(gameTime)}</span>
                    </div>
                    <button
                        onClick={() => setIsNotebookOpen(!isNotebookOpen)}
                        className={`flex items-center px-3 py-1 rounded-full transition-colors ${isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Notebook
                    </button>
                </div>
            </div>

            <div className="flex min-h-[calc(100vh-56px)]">
                <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
                    <GameProgressBar current={1} total={4} />
                    <div className="space-y-6 mt-4">
                        {puzzleData?.story && <StoryBox text={puzzleData.story} />}
                        {puzzleData?.clue && <ClueBox clue={puzzleData.clue} />}

                        {puzzleData?.queries && (
                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <h3 className="text-lg font-medium text-indigo-300 mb-2 flex items-center">
                                    <Code className="w-5 h-5 mr-2" />
                                    SQL Query Interface
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Choose your SQL query carefully. Each incorrect query will cost you 30 minutes.
                                </p>
                                <SQLQueryInterface
                                    queries={puzzleData.queries.map((q) => q.text)}
                                    onQuerySelect={handleQuerySelect}
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleExecuteQuery}
                                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center"
                                    >
                                        Execute Query <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {queryResult && <QueryResults result={queryResult} />}

                        {hasQueryExecuted && queryResult?.error === null && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleProceed}
                                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    Proceed <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Pass notebook entries */}
                <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
            </div>
        </div>
    );
}