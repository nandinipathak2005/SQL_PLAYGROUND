// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzle } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import ClueBox from '../components/ClueBox';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import Notebook from '../components/Notebook';
// import GameProgressBar from '../components/GameProgressBar';

// export default function Puzzle3() {
//   const navigate = useNavigate();
//   const { gameTime, deductTime, addNotebookEntry, updatePuzzle } = useContext(GameContext);
//   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//   const [puzzleData, setPuzzleData] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [queryResult, setQueryResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadPuzzle = async () => {
//       try {
//         const data = await fetchPuzzle(3);
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

//   const handleExecuteQuery = async () => {
//     if (!selectedQuery) return alert('Please select a query.');
    
//     setQueryResult({ loading: true, data: null, error: null });
//     try {
//       const result = await executeQuery(selectedQuery);
//       setQueryResult({ loading: false, data: result, error: null });

//       if (result?.notebookUpdate) addNotebookEntry(result.notebookUpdate);
//       if (result?.next) {
//         updatePuzzle(4);
//         navigate('/final-puzzle');
//       } else if (result?.branch) {
//         navigate(result.branch);
//       } else if (result?.timePenalty) {
//         deductTime(result.timePenalty);
//       }
//     } catch (err) {
//       setQueryResult({ loading: false, data: null, error: err.message });
//       deductTime(30);
//     }
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
//           <h1 className="text-xl font-medium text-white">Puzzle 3: Who was backstage with the unknown entity?</h1>
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
//           <GameProgressBar current={3} total={4} />
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
//                   queries={puzzleData.queries.map(q => q.text)} 
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
//           </div>
//         </div>
//         <Notebook isOpen={isNotebookOpen} />
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzle } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import ClueBox from '../components/ClueBox';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import Notebook from '../components/Notebook';
// import GameProgressBar from '../components/GameProgressBar';

// export default function Puzzle3() {
//   const navigate = useNavigate();
//   const { gameTime, deductTime, addNotebookEntry, updatePuzzle } = useContext(GameContext);
//   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//   const [puzzleData, setPuzzleData] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [queryResult, setQueryResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasQueryExecuted, setHasQueryExecuted] = useState(false); // Track if a query has been executed
//   const [selectedQueryId, setSelectedQueryId] = useState(null);

//   useEffect(() => {
//     const loadPuzzle = async () => {
//       try {
//         const data = await fetchPuzzle(3);
//         setPuzzleData(data);
//       } catch (err) {
//         setError(err.message || 'Failed to load puzzle data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadPuzzle();
//   }, []);

//   // const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

//   const handleQuerySelect = (queryText, index) => {
//     setSelectedQuery(queryText);
//     // Assuming your puzzleData.queries array has the 'id' property
//     setSelectedQueryId(puzzleData?.queries[index]?.id);
//   };
//   const handleExecuteQuery = async () => {
//     if (!selectedQuery) return alert('Please select a query.');

//     setQueryResult({ loading: true, data: null, error: null });
//     setHasQueryExecuted(true);
//     console.log("Sending query to backend:", selectedQuery);
//     console.log("Sending query ID to backend:", selectedQueryId); // Log the ID

//     try {
//       const dataToSend = {
//         query: selectedQuery,
//         currentPuzzle: 3,
//         queryId: selectedQueryId, // Include the queryId
//       };
//       const result = await executeQuery(dataToSend);
//       setQueryResult({ loading: false, data: result, error: null });

//       if (result?.notebookUpdate) addNotebookEntry(result.notebookUpdate);
//       // Navigation logic moved to handleProceed
//     } catch (err) {
//       setQueryResult({ loading: false, data: null, error: err.message });
//       deductTime(30);
//     }
//   };

//   // const handleExecuteQuery = async () => {
//   //   if (!selectedQuery) return alert('Please select a query.');

//   //   setQueryResult({ loading: true, data: null, error: null });
//   //   setHasQueryExecuted(true); // Set to true after executing the query
//   //   try {
//   //     const result = await executeQuery({ query: selectedQuery, currentPuzzle: 3 }); // Include currentPuzzle in the request
//   //     setQueryResult({ loading: false, data: result, error: null });

//   //     if (result?.notebookUpdate) addNotebookEntry(result.notebookUpdate);
//   //     // Navigation logic moved to handleProceed
//   //   } catch (err) {
//   //     setQueryResult({ loading: false, data: null, error: err.message });
//   //     deductTime(30);
//   //   }
//   // };

//   // const handleExecuteQuery = async () => {
//   //   if (!selectedQuery) return alert('Please select a query.');
  
//   //   setQueryResult({ loading: true, data: null, error: null });
//   //   setHasQueryExecuted(true); // Set to true after executing the query
//   //   console.log("Sending query to backend:", selectedQuery); // Add this line
//   //   try {
//   //     const result = await executeQuery({ query: selectedQuery, currentPuzzle: 3 }); // Include currentPuzzle in the request
//   //     setQueryResult({ loading: false, data: result, error: null });
  
//   //     if (result?.notebookUpdate) addNotebookEntry(result.notebookUpdate);
//   //     // Navigation logic moved to handleProceed
//   //   } catch (err) {
//   //     setQueryResult({ loading: false, data: null, error: err.message });
//   //     deductTime(30);
//   //   }
//   // };
//   // const handleProceed = () => {
//   //   const result = queryResult?.data;

//   //   if (!hasQueryExecuted) {
//   //     return; // Do nothing if no query has been executed
//   //   }

//   //   if (result?.isMisleading && result?.branch) {
//   //     navigate(result.branch);
//   //     return;
//   //   }

//   //   if (result?.isCorrect || (!result?.isCorrect && !result?.isMisleading)) {
//   //     updatePuzzle(4);
//   //     navigate('/final-puzzle');
//   //     return;
//   //   }
  

//     // Handle incorrect queries or other scenarios if needed
//   //   console.warn("Proceed button clicked with an unexpected query result state.");
//   // };
//   // const handleProceed = () => {
//   //   const result = queryResult?.data;

//   //   if (!hasQueryExecuted) {
//   //     return; // Do nothing if no query has been executed
//   //   }

//   //   if (result?.isMisleading && result?.branch) {
//   //     navigate(result.branch);
//   //     return;
//   //   }

//   //   if (result?.isCorrect) {
//   //     updatePuzzle(4);
//   //     navigate('/final-puzzle');
//   //     return;
//   //   }

//   //   // If it's not misleading and not correct, it's an incorrect query, so go to final puzzle
//   //   if (!result?.isMisleading && !result?.isCorrect) {
//   //     updatePuzzle(4);
//   //     navigate('/final-puzzle');
//   //     return;
//   //   }

//   //   console.warn("Proceed button clicked with an unexpected query result state.");
//   // };
//   const handleProceed = () => {
//     const result = queryResult?.data;

//     console.log("Proceed button clicked. Result:", result); // Log the entire result object

//     if (!hasQueryExecuted) {
//       console.log("No query executed yet.");
//       return; // Do nothing if no query has been executed
//     }

//     if (result?.isMisleading && result?.branch) {
//       console.log("Navigating to branch:", result.branch);
//       navigate(result.branch);
//       return;
//     } else {
//       console.log("Not navigating to branch. isMisleading:", result?.isMisleading, "branch:", result?.branch);
//     }

//     if (result?.isCorrect) {
//       console.log("Navigating to final puzzle (correct).");
//       updatePuzzle(4);
//       navigate('/final-puzzle');
//       return;
//     } else {
//       console.log("Not navigating to final puzzle (correct). isCorrect:", result?.isCorrect);
//     }

//     // If it's not misleading and not correct, it's an incorrect query, so go to final puzzle
//     if (!result?.isMisleading && !result?.isCorrect) {
//       console.log("Navigating to final puzzle (incorrect).");
//       updatePuzzle(4);
//       navigate('/final-puzzle');
//       return;
//     } else {
//       console.log("Not navigating to final puzzle (incorrect). isMisleading:", result?.isMisleading, "isCorrect:", result?.isCorrect);
//     }

//     console.warn("Proceed button clicked with an unexpected query result state.");
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
//           <h1 className="text-xl font-medium text-white">Puzzle 3: Who was backstage with the unknown entity?</h1>
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
//           <GameProgressBar current={3} total={4} />
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
//                   queries={puzzleData.queries.map(q => q.text)}
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

//             {hasQueryExecuted && (
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleProceed}
//                   className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//                 >
//                   Proceed <ArrowRight className="w-4 h-4 ml-2" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <Notebook isOpen={isNotebookOpen} />
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzle } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import ClueBox from '../components/ClueBox';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import Notebook from '../components/Notebook';
// import GameProgressBar from '../components/GameProgressBar';

// export default function Puzzle3() {
//   const navigate = useNavigate();
//   const { gameTime, deductTime, addNotebookEntry, updatePuzzle } = useContext(GameContext);
//   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//   const [puzzleData, setPuzzleData] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [queryResult, setQueryResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasQueryExecuted, setHasQueryExecuted] = useState(false); // Track if a query has been executed
//   const [selectedQueryId, setSelectedQueryId] = useState(null);

//   useEffect(() => {
//     const loadPuzzle = async () => {
//       try {
//         const data = await fetchPuzzle(3);
//         setPuzzleData(data);
//       } catch (err) {
//         setError(err.message || 'Failed to load puzzle data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadPuzzle();
//   }, []);

//   const handleQuerySelect = (queryText, index) => {
//     setSelectedQuery(queryText);
//     // Assuming your puzzleData.queries array has the 'id' property
//     setSelectedQueryId(puzzleData?.queries[index]?.id);
//   };

//   const handleExecuteQuery = async () => {
//     if (!selectedQuery) return alert('Please select a query.');

//     setQueryResult({ loading: true, data: null, error: null });
//     setHasQueryExecuted(true);
//     console.log("Sending query to backend:", selectedQuery);
//     console.log("Sending query ID to backend:", selectedQueryId); // Log the ID

//     try {
//       const dataToSend = {
//         query: selectedQuery,
//         currentPuzzle: 3,
//         queryId: selectedQueryId, // Include the queryId
//       };
//       const result = await executeQuery(dataToSend);
//       setQueryResult({ loading: false, data: result, error: null });

//       if (result?.notebookUpdate) addNotebookEntry(result.notebookUpdate);
//       // Navigation logic moved to handleProceed
//     } catch (err) {
//       setQueryResult({ loading: false, data: null, error: err.message });
//       deductTime(30);
//     }
//   };

//   const handleProceed = () => {
//     if (!hasQueryExecuted) {
//       alert('Please execute a query before proceeding.');
//       return;
//     }

//     // Immediately navigate to the archivist branch if the misleading query is detected
//     if (
//       selectedQuery?.includes("bm.room_id = 'R-03'") &&
//       selectedQuery?.includes("ORDER BY bm.time_in DESC")
//     ) {
//       navigate('/puzzle/3/archivist');
//       return;
//     }

//     const result = queryResult?.data;

//     if (result?.isMisleading && result?.branch) {
//       console.log("Navigating to branch:", result.branch);
//       navigate(result.branch);
//       return;
//     } else {
//       console.log("Not navigating to branch. isMisleading:", result?.isMisleading, "branch:", result?.branch);
//     }

//     if (result?.isCorrect) {
//       console.log("Navigating to final puzzle (correct).");
//       updatePuzzle(4);
//       navigate('/final-puzzle');
//       return;
//     } else {
//       console.log("Not navigating to final puzzle (correct). isCorrect:", result?.isCorrect);
//     }

//     // If it's not misleading (by frontend check) and not correct, it's an incorrect query, so go to final puzzle
//     if (!result?.isMisleading && !result?.isCorrect) {
//       console.log("Navigating to final puzzle (incorrect).");
//       updatePuzzle(4);
//       navigate('/final-puzzle');
//       return;
//     } else {
//       console.log("Not navigating to final puzzle (incorrect). isMisleading:", result?.isMisleading, "isCorrect:", result?.isCorrect);
//     }

//     console.warn("Proceed button clicked with an unexpected query result state.");
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
//           <h1 className="text-xl font-medium text-white">Puzzle 3: Who was backstage with the unknown entity?</h1>
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
//           <GameProgressBar current={3} total={4} />
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
//                   queries={puzzleData.queries.map(q => q.text)}
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

//             {hasQueryExecuted && (
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleProceed}
//                   className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//                 >
//                   Proceed <ArrowRight className="w-4 h-4 ml-2" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <Notebook isOpen={isNotebookOpen} />
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzle } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import ClueBox from '../components/ClueBox';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import Notebook from '../components/Notebook';
// import GameProgressBar from '../components/GameProgressBar';

// export default function Puzzle3() {
//   const navigate = useNavigate();
//   const { gameTime, deductTime, addNotebookEntry, updatePuzzle } = useContext(GameContext);
//   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//   const [puzzleData, setPuzzleData] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [queryResult, setQueryResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasQueryExecuted, setHasQueryExecuted] = useState(false); // Track if a query has been executed
//   const [selectedQueryId, setSelectedQueryId] = useState(null);

//   useEffect(() => {
//     const loadPuzzle = async () => {
//       try {
//         const data = await fetchPuzzle(3);
//         setPuzzleData(data);
//       } catch (err) {
//         setError(err.message || 'Failed to load puzzle data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadPuzzle();
//   }, []);

//   const handleQuerySelect = (queryText, index) => {
//     setSelectedQuery(queryText);
//     // Assuming your puzzleData.queries array has the 'id' property
//     setSelectedQueryId(puzzleData?.queries[index]?.id);
//   };

//   const handleExecuteQuery = async () => {
//     if (!selectedQuery) return alert('Please select a query.');

//     setQueryResult({ loading: true, data: null, error: null });
//     setHasQueryExecuted(true);
//     console.log("Sending query to backend:", selectedQuery);
//     console.log("Sending query ID to backend:", selectedQueryId); // Log the ID

//     try {
//       const dataToSend = {
//         query: selectedQuery,
//         currentPuzzle: 3,
//         queryId: selectedQueryId, // Include the queryId
//       };
//       const result = await executeQuery(dataToSend);
//       setQueryResult({ loading: false, data: result, error: null });

//       if (result?.notebookUpdate) {
//         addNotebookEntry({
//           title: `Puzzle 3`,
//           content: result.notebookUpdate,
//         });
//       }
//       // Navigation logic moved to handleProceed
//     } catch (err) {
//       setQueryResult({ loading: false, data: null, error: err.message });
//       deductTime(30);
//     }
//   };

//   // const handleProceed = () => {
//   //   if (!hasQueryExecuted) {
//   //     alert('Please execute a query before proceeding.');
//   //     return;
//   //   }

//   //   const result = queryResult?.data;

//   //   // Navigate to the archivist branch if the specific misleading query is detected
//   //   if (
//   //     selectedQuery?.includes("bm.room_id = 'R-03'") &&
//   //     selectedQuery?.includes("ORDER BY bm.time_in DESC")
//   //   ) {
//   //     navigate('/puzzle/3/archivist');
//   //     return;
//   //   }

//   //   // Navigate to the technician branch if the other misleading query is detected
//   //   if (
//   //     selectedQuery?.includes("sl.event_type") &&
//   //     selectedQuery?.includes("device_registry") &&
//   //     selectedQuery?.includes("'%Backstage%'") &&
//   //     selectedQuery?.includes("'2025-04-29 13:00:00'") &&
//   //     selectedQuery?.includes("'2025-04-29 14:00:00'")
//   //   ) {
//   //     navigate('/puzzle/3/technician');
//   //     return;
//   //   }

//   //   if (result?.isCorrect) {
//   //     console.log("Navigating to final puzzle (correct).");
//   //     updatePuzzle(4);
//   //     navigate('/final-puzzle');
//   //     return;
//   //   } else if (!result?.isMisleading) {
//   //     // If not misleading and not correct, consider it an incorrect attempt leading to final puzzle
//   //     console.log("Navigating to final puzzle (incorrect attempt).");
//   //     updatePuzzle(4);
//   //     navigate('/final-puzzle');
//   //     return;
//   //   } else {
//   //     console.log("Not navigating based on the current query result.");
//   //   }

//   //   console.warn("Proceed button clicked with an unexpected query result state.");
//   // };
//   const handleProceed = () => {
//     if (!hasQueryExecuted) {
//       alert('Please execute a query before proceeding.');
//       return;
//     }

//     const result = queryResult?.data;

//     // Navigate to the archivist branch if the specific misleading query is detected
//     if (
//       selectedQuery?.includes("bm.room_id = 'R-03'") &&
//       selectedQuery?.includes("ORDER BY bm.time_in DESC")
//     ) {
//       navigate('/puzzle/3/archivist');
//       return;
//     }

//     // Navigate to the technician branch if the other misleading query is detected
//     if (
//       selectedQuery?.includes("sl.event_type") &&
//       selectedQuery?.includes("device_registry") &&
//       selectedQuery?.includes("'%Backstage%'") &&
//       selectedQuery?.includes("'2025-04-29 13:00:00'") &&
//       selectedQuery?.includes("'2025-04-29 14:00:00'")
//     ) {
//       navigate('/puzzle/3/technician');
//       return;
//     }

//     if (result?.isCorrect) {
//       console.log("Navigating to final puzzle (correct).");
//       //updatePuzzle(4);
//       navigate('/final-puzzle');
//       return;
//     } else {
//       // If not a misleading branch query and not correct, proceed to the technician branch.
//       navigate('/final-puzzle');
//       return;
//     }

//     //console.warn("Proceed button clicked with an unexpected query result state.");
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
//           <h1 className="text-xl font-medium text-white">Puzzle 3: Who was backstage with the unknown entity?</h1>
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
//           <GameProgressBar current={3} total={4} />
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
//                   queries={puzzleData.queries.map(q => q.text)}
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

//             {hasQueryExecuted && (
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleProceed}
//                   className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//                 >
//                   Proceed <ArrowRight className="w-4 h-4 ml-2" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <Notebook isOpen={isNotebookOpen} />
//       </div>
//     </div>
//   );
// }

//shreya's change 13 may
import { useState, useEffect, useContext } from 'react';
import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { executeQuery, fetchPuzzle, fetchBranch } from '../api';
import QueryResults from '../components/QueryResults';
import StoryBox from '../components/StoryBox';
import ClueBox from '../components/ClueBox';
import SQLQueryInterface from '../components/SQLQueryInterface';
import Notebook from '../components/Notebook';
import GameProgressBar from '../components/GameProgressBar';

export default function Puzzle3() {
  const navigate = useNavigate();
  const { gameTime, deductTime, addNotebookEntry, updatePuzzle, currentBranch, notebookEntries, updateBranch } = useContext(GameContext);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [puzzleData, setPuzzleData] = useState(null);
  const [branchData, setBranchData] = useState(null); // ✅ State for branch data
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasQueryExecuted, setHasQueryExecuted] = useState(false);

  useEffect(() => {
    const loadPuzzle = async () => {
      try {
        const data = await fetchPuzzle(3);
        setPuzzleData(data);
      } catch (err) {
        setError(err.message || 'Failed to load puzzle data.');
      } finally {
        setLoading(false);
      }
    };
    loadPuzzle();
  }, []);

  useEffect(() => {
    const loadBranchData = async () => {
      try {
        // Dynamically fetch the branch based on currentBranch
        const branchType = currentBranch === '3-archivist' ? '3-archivist' : '3-technician';
        const data = await fetchBranch(branchType);
        setBranchData(data);
      } catch (err) {
        setError(err.message || 'Failed to load branch data.');
      }
    };

    // Only load the branch data if the puzzle data has loaded
    if (puzzleData) {
      loadBranchData();
    }
  }, [puzzleData, currentBranch]); // Depend on puzzleData and currentBranch to ensure correct data is loaded

  const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

  const handleExecuteQuery = async () => {
    if (!selectedQuery) return alert('Please select a query.');

    setQueryResult({ loading: true, data: null, error: null });
    setHasQueryExecuted(true); // Set to true immediately after clicking execute
    try {
      console.log('Executing query:', selectedQuery);
      console.log('Current puzzle ID:', puzzleData?.id || 3);
      const payload = { puzzleId: puzzleData?.id || 3 }; // Create the payload object
      const result = await executeQuery(selectedQuery, {
        puzzleId: puzzleData?.id || 3,
        currentBranch: currentBranch, // ✅ Send the currentBranch from context
      });
      setQueryResult({ loading: false, data: result, error: null });
      if (result?.notebookUpdate) {
        addNotebookEntry({
          title: `Puzzle 3 – Footage`,
          content: result.notebookUpdate,
        });
      }

      if (result?.timePenalty) {
        deductTime(result.timePenalty);
      }

      if (!result?.table || result.table.length === 0 && !result?.isMisleading) {
        alert('No data fetched for this query.');
      }
    } catch (err) {
      setQueryResult({ loading: false, data: null, error: err.message });
      deductTime(30);
    }
  };

  const handleProceed = () => {
    if (!hasQueryExecuted) {
      alert('Please execute a query before proceeding.');
      return;
    }

    const result = queryResult?.data;

    // Handling results for navigation
    if (result?.isMisleading && result?.branch) {
      navigate(result.branch); // Navigate to branch if misleading
      return;
    }

    if (result?.isCorrect) {
      updatePuzzle('final');
      navigate('/final-puzzle'); // Correct query, proceed to final puzzle
    } else {
      navigate('/final-puzzle'); // Even for incorrect query, proceed to the final puzzle
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
          <Link to="/game" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm">Back to Game</span>
          </Link>
          <h1 className="text-xl font-medium text-white">Puzzle 3: Who was backstage with the unknown entity?</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-indigo-300 mr-2" />
            <span className="text-white font-medium">{formatTime(gameTime)}</span>
          </div>
          <button
            onClick={() => setIsNotebookOpen(!isNotebookOpen)}
            className={`flex items-center px-3 py-1 rounded-full transition-colors ${isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Notebook
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-56px)]">
        <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
          <GameProgressBar current={3} total={4} />
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
                  queries={puzzleData.queries.map(q => q.text)}
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

            {hasQueryExecuted && (
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
        <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
      </div>
    </div>
  );
}
