// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzle, fetchBranch } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import RiddleComponent from '../components/RiddleComponent';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import Notebook from '../components/Notebook';
// import GameProgressBar from '../components/GameProgressBar';

// export default function Puzzle2() {
//     const navigate = useNavigate();
//     const { gameTime, deductTime, addNotebookEntry, updatePuzzle, currentBranch, notebookEntries, updateBranch } = useContext(GameContext);
//     const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//     const [puzzleData, setPuzzleData] = useState(null);
//     const [branchData, setBranchData] = useState(null);
//     const [selectedQuery, setSelectedQuery] = useState(null);
//     const [queryResult, setQueryResult] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hasQueryExecuted, setHasQueryExecuted] = useState(false);

//     useEffect(() => {
//         const loadPuzzle = async () => {
//             try {
//                 const data = await fetchPuzzle(2);
//                 setPuzzleData(data);
//             } catch (err) {
//                 setError(err.message || 'Failed to load puzzle data.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadPuzzle();
//     }, []);

//     useEffect(() => {
//         const loadBranchData = async () => {
//             try {
//                 const data = await fetchBranch('2-footage-analysis'); // Changed to '2-footage-analysis'
//                 setBranchData(data);
//             } catch (err) {
//                 setError(err.message || 'Failed to load branch data.');
//             } finally {
//                 // setLoading is already handled by the puzzle load
//             }
//         };

//         if (puzzleData) {
//             loadBranchData();
//         }
//     }, [puzzleData]);

//     const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

//     const handleExecuteQuery = async () => {
//         if (!selectedQuery) return alert('Please select a query.');

//         setQueryResult({ loading: true, data: null, error: null });
//         setHasQueryExecuted(true);
//         try {
//             console.log('Executing query:', selectedQuery);
//             console.log('Current puzzle ID:', puzzleData?.id || 2);
//             const payload = { puzzleId: puzzleData?.id || 2 };
//             const result = await executeQuery(selectedQuery, {
//                 puzzleId: puzzleData?.id || 2,
//                 currentBranch: currentBranch,
//             });
//             setQueryResult({ loading: false, data: result, error: null });
//             if (result?.notebookUpdate) {
//                 addNotebookEntry({
//                     title: `Puzzle 2 – Footage`, // Keep the title
//                     content: result.notebookUpdate,
//                 });
//             }

//             if (result?.timePenalty) {
//                 deductTime(result.timePenalty);
//             }

//             if (!result?.table || result.table.length === 0 && !result?.isMisleading) {
//                 alert('No data fetched for this query.');
//             }
//         } catch (err) {
//             setQueryResult({ loading: false, data: null, error: err.message });
//             deductTime(30);
//         }
//     };


//     const handleProceed = () => {
//         const result = queryResult?.data;

//         if (!hasQueryExecuted) {
//             return;
//         }
//         if (result?.isMisleading && result?.branch) {
//             updatePuzzle(2);
//             updateBranch('footage-analysis');
//             navigate(result.branch);
//             return;
//         }

//         if (result?.isCorrect || (!result?.isCorrect && !result?.isMisleading)) {
//             updatePuzzle(3);
//             navigate('/puzzle/3');
//             return;
//         }

//         console.warn("Proceed button clicked with an unexpected query result state.");
//     };

//     const formatTime = (minutes) => {
//         const hours = Math.floor(minutes / 60);
//         const mins = minutes % 60;
//         return `${hours}:${mins < 10 ? '0' + mins : mins}`;
//     };

//     if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
//     if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error: {error}</div>;

//     return (
//         <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
//             <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
//                 <div className="flex items-center">
//                     <Link to="/puzzle/1" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
//                         <ArrowLeft className="w-5 h-5 mr-1" />
//                         <span className="text-sm">Back to Puzzle 1</span>
//                     </Link>
//                     <h1 className="text-xl font-medium text-white">Puzzle 2: Deciphering the Cryptic Clues</h1>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
//                         <Clock className="w-4 h-4 text-indigo-300 mr-2" />
//                         <span className="text-white font-medium">{formatTime(gameTime)}</span>
//                     </div>
//                     <button
//                         onClick={() => setIsNotebookOpen(!isNotebookOpen)}
//                         className={`flex items-center px-3 py-1 rounded-full transition-colors ${isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
//                             }`}
//                     >
//                         <BookOpen className="w-4 h-4 mr-2" />
//                         Notebook
//                     </button>
//                 </div>
//             </div>

//             <div className="flex min-h-[calc(100vh-56px)]">
//                 <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
//                     <GameProgressBar current={2} total={4} />
//                     <div className="space-y-6 mt-4">
//                         {puzzleData?.story && <StoryBox text={puzzleData.story} />}

//                         {puzzleData?.riddle && (
//                             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
//                                 <h3 className="text-lg font-medium text-yellow-300 mb-2 flex items-center">
//                                     <HelpCircle className="w-5 h-5 mr-2" />
//                                     Riddle
//                                 </h3>
//                                 <p className="text-gray-300 italic mb-3">{puzzleData.riddle}</p>
//                                 {puzzleData.options && (
//                                     <RiddleComponent options={puzzleData.options} />
//                                 )}
//                             </div>
//                         )}

//                         {puzzleData?.queries && (
//                             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
//                                 <h3 className="text-lg font-medium text-indigo-300 mb-2 flex items-center">
//                                     <Code className="w-5 h-5 mr-2" />
//                                     SQL Query Interface
//                                 </h3>
//                                 <p className="text-gray-400 text-sm mb-3">
//                                     Choose your SQL query carefully. Each incorrect query will cost you 30 minutes.
//                                 </p>
//                                 <SQLQueryInterface
//                                     queries={puzzleData.queries.map(q => q.text)}
//                                     onQuerySelect={handleQuerySelect}
//                                 />
//                                 <div className="mt-4 flex justify-end">
//                                     <button
//                                         onClick={handleExecuteQuery}
//                                         className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center"
//                                     >
//                                         Execute Query <ArrowRight className="w-4 h-4 ml-2" />
//                                     </button>
//                                 </div>
//                             </div>
//                         )}

//                         {queryResult && <QueryResults result={queryResult} />}

//                         {hasQueryExecuted && (
//                             <div className="mt-6 flex justify-end">
//                                 <button
//                                     onClick={handleProceed}
//                                     className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//                                 >
//                                     Proceed <ArrowRight className="w-4 h-4 ml-2" />
//                                 </button>
//                             </div>
//                         )}

//                         {queryResult?.data?.isMisleading && queryResult?.data?.branch && branchData && (
//                             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-6">
//                                 {branchData?.story && <StoryBox text={branchData.story} />}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
//             </div>
//         </div>
//     );
// }

import { useState, useEffect, useContext } from 'react';
import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { executeQuery2, fetchPuzzleStage2, fetchBranch } from '../api';
import QueryResults from '../components/QueryResults';
import StoryBox from '../components/StoryBox';
import RiddleComponent from '../components/RiddleComponent';
import SQLQueryInterface from '../components/SQLQueryInterface';
import Notebook from '../components/Notebook';
import GameProgressBar from '../components/GameProgressBar';

export default function Puzzle2Stage2() {
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
        const data = await fetchPuzzleStage2(2);
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
  //       const branchType = currentBranch === '2-stage-left' ? '2-stage-left' : '2-footage-analysis';
  //       const data = await fetchBranch(branchType);
  //       setBranchData(data);
  //     } catch (err) {
  //       setError(err.message || 'Failed to load branch data.');
  //     } finally {
  //       // setLoading is already handled by the puzzle load
  //     }
  //   };

  //   // Only load the branch data if the puzzle data has loaded
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
      console.log('Executing query:', selectedQuery);
      console.log('Current puzzle ID:', puzzleData?.id || 2);
      const payload = { puzzleId: puzzleData?.id || 2 };
      const result = await executeQuery2(selectedQuery, {
        puzzleId: puzzleData?.id || 2,
        currentBranch: currentBranch,
      });
      setQueryResult({ loading: false, data: result, error: null });
      if (result?.notebookUpdate) {
        addNotebookEntry({
          title: `Puzzle 2 – Deciphering Clues`, // More generic title
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
    const result = queryResult?.data;

    if (!hasQueryExecuted) {
      alert('Please execute a query before proceeding.');
      return;
    }

    if (result?.isMisleading && result?.branch) {
      updatePuzzle(2);
      updateBranch(result.branch);
      navigate(result.branch);
      return;
    }

    // For correct or incorrect (not misleading), proceed to Puzzle 3
    if (result?.isCorrect || (!result?.isCorrect && !result?.isMisleading)) {
      updatePuzzle(3);
      navigate('/puzzle/3/stage2');
      return;
    }

    // If it's a misleading query but no branch
    if (result?.isMisleading && !result?.branch) {
      alert('Misleading query, but no branch was provided by the server.');
      return;
    }

    console.warn("Proceed button clicked with an unexpected query result state.");
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
          <Link to="/puzzle/1/stage2" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm">Back to Puzzle 1</span>
          </Link>
          <h1 className="text-xl font-medium text-white">Puzzle 2: Deciphering the Clues</h1>
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
          <GameProgressBar current={2} total={4} />
          <div className="space-y-6 mt-4">
            {puzzleData?.story && <StoryBox text={puzzleData.story} />}

            {/* {puzzleData?.riddle && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-yellow-300 mb-2 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Riddle
                </h3>
                <p className="text-gray-300 italic mb-3">{puzzleData.riddle}</p>
                {puzzleData.options && (
                  <RiddleComponent options={puzzleData.options} />
                )}
              </div>
            )} */}

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

            {queryResult?.data?.isMisleading && queryResult?.data?.branch && branchData && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-6">
                {branchData?.story && <StoryBox text={branchData.story} />}
                {branchData?.riddle && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-yellow-300 mb-2 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Riddle
                    </h3>
                    <p className="text-gray-300 italic mb-3">{branchData.riddle}</p>
                    {branchData.options && (
                      <RiddleComponent options={branchData.options} onSelect={handleRiddleSelect} />
                    )}
                  </div>
                )}
                {branchData?.branchQueries && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Follow-up Queries
                    </h3>
                    <SQLQueryInterface queries={branchData.branchQueries.map(q => q.text)} onQuerySelect={handleQuerySelect} />
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
              </div>
            )}
          </div>
        </div>
        <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
      </div>
    </div>
  );
}