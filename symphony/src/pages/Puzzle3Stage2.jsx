// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzle, fetchBranch } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import ClueBox from '../components/ClueBox';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import Notebook from '../components/Notebook';
// import GameProgressBar from '../components/GameProgressBar';

// export default function Puzzle3() {
//   const navigate = useNavigate();
//   const { gameTime, deductTime, addNotebookEntry, updatePuzzle, currentBranch, notebookEntries, updateBranch } = useContext(GameContext);
//   const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//   const [puzzleData, setPuzzleData] = useState(null);
//   const [branchData, setBranchData] = useState(null);
//   const [selectedQuery, setSelectedQuery] = useState(null);
//   const [queryResult, setQueryResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasQueryExecuted, setHasQueryExecuted] = useState(false);

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

//   useEffect(() => {
//     const loadBranchData = async () => {
//       try {
//         // Dynamically fetch the branch based on currentBranch
//         const branchType = currentBranch === '3-archivist' ? '3-archivist' : '3-technician'; //adjust
//         const data = await fetchBranch(branchType);
//         setBranchData(data);
//       } catch (err) {
//         setError(err.message || 'Failed to load branch data.');
//       } finally {
//         // setLoading is already handled by the puzzle load
//       }
//     };

//     // Only load the branch data if the puzzle data has loaded
//     if (puzzleData) {
//       loadBranchData();
//     }
//   }, [puzzleData, currentBranch]);

//   const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

//   const handleExecuteQuery = async () => {
//     if (!selectedQuery) return alert('Please select a query.');

//     setQueryResult({ loading: true, data: null, error: null });
//     setHasQueryExecuted(true);
//     try {
//       console.log('Executing query:', selectedQuery);
//       console.log('Current puzzle ID:', puzzleData?.id || 3);
//       const payload = { puzzleId: puzzleData?.id || 3 };
//       const result = await executeQuery(selectedQuery, {
//         puzzleId: puzzleData?.id || 3,
//         currentBranch: currentBranch,
//       });
//       setQueryResult({ loading: false, data: result, error: null });
//       if (result?.notebookUpdate) {
//         addNotebookEntry({
//           title: `Puzzle 3 – Accessing Files`, // Changed title
//           content: result.notebookUpdate,
//         });
//       }

//       if (result?.timePenalty) {
//         deductTime(result.timePenalty);
//       }

//       if (!result?.table || result.table.length === 0 && !result?.isMisleading) {
//         alert('No data fetched for this query.');
//       }
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

//     const result = queryResult?.data;

//     // Handling results for navigation
//     if (result?.isMisleading && result?.branch) {
//       navigate(result.branch); // Navigate to branch if misleading
//       return;
//     }

//     if (result?.isCorrect) {
//       updatePuzzle('final');
//       navigate('/final-puzzle'); // Correct query, proceed to final puzzle
//     } else {
//       navigate('/final-puzzle'); // Even for incorrect query, proceed to the final puzzle.  Adjust as needed.
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
//           <h1 className="text-xl font-medium text-white">Puzzle 3: Accessing the Files</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
//             <Clock className="w-4 h-4 text-indigo-300 mr-2" />
//             <span className="text-white font-medium">{formatTime(gameTime)}</span>
//           </div>
//           <button
//             onClick={() => setIsNotebookOpen(!isNotebookOpen)}
//             className={`flex items-center px-3 py-1 rounded-full transition-colors ${isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
//               }`}
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
//         <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useContext } from 'react';
import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { executeQuery2, fetchPuzzleStage2, fetchBranchStage2} from '../api';
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
  const [branchData, setBranchData] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasQueryExecuted, setHasQueryExecuted] = useState(false);

  useEffect(() => {
    const loadPuzzle = async () => {
      try {
        const data = await fetchPuzzleStage2(3);
        setPuzzleData(data);
      } catch (err) {
        setError(err.message || 'Failed to load puzzle data.');
      } finally {
        setLoading(false);
      }
    };
    loadPuzzle();
  }, []);

  // useEffect(() => {
  //   const loadBranchData = async () => {
  //     try {
  //       const branchType = currentBranch === '3-archivist' ? '3-archivist' : '3-technician';
  //       const data = await fetchBranchStage2(branchType);
  //       setBranchData(data);
  //     } catch (err) {
  //       setError(err.message || 'Failed to load branch data.');
  //     }
  //   };

  //   if (puzzleData) {
  //     loadBranchData();
  //   }
  // }, [puzzleData, currentBranch]);

  const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

  const handleExecuteQuery = async () => {
    if (!selectedQuery) return alert('Please select a query.');

    setQueryResult({ loading: true, data: null, error: null });
    setHasQueryExecuted(true);
    try {
      const result = await executeQuery2(selectedQuery, {
        puzzleId: puzzleData?.id || 3,
        currentBranch: currentBranch,
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

    if (result?.isMisleading && result?.branch) {
      updateBranch(result.branch);
      navigate(result.branch);
      return;
    }

    if (result?.isCorrect) {
      updatePuzzle('final');
      navigate('/final-puzzle2');
    } else {
      navigate('/final-puzzle2');
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
