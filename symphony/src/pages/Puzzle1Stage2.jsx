// import { useState, useEffect, useContext } from 'react';
// import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GameContext } from '../GameContext';
// import { executeQuery, fetchPuzzleStage2 } from '../api';
// import QueryResults from '../components/QueryResults';
// import StoryBox from '../components/StoryBox';
// import ClueBox from '../components/ClueBox';
// import SQLQueryInterface from '../components/SQLQueryInterface';
// import GameProgressBar from '../components/GameProgressBar';
// import Notebook from '../components/Notebook';

// export default function Puzzle1Stage2() {
//     const navigate = useNavigate();
//     const {
//         gameTime,
//         deductTime,
//         addNotebookEntry,
//         updatePuzzle,
//         notebookEntries,
//         currentBranch,
//     } = useContext(GameContext);

//     const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//     const [puzzleData, setPuzzleData] = useState(null);
//     const [selectedQuery, setSelectedQuery] = useState(null);
//     const [queryResult, setQueryResult] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hasQueryExecuted, setHasQueryExecuted] = useState(false);
//     const [currentBranchState, setCurrentBranchState] = useState('ordo'); // Start with 'ordo' branch

//     useEffect(() => {
//         const loadPuzzle = async () => {
//             try {
//                 const data = await fetchPuzzleStage2(1);
//                 setPuzzleData(data);
//             } catch (err) {
//                 setError(err.message || 'Failed to load puzzle data.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadPuzzle();
//     }, []);

//     const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

//     const handleExecuteQuery = async () => {
//         if (!selectedQuery) return alert('Please select a query.');

//         setQueryResult({ loading: true, data: null, error: null });
//         try {
//             const result = await executeQuery(selectedQuery, {
//                 puzzleId: puzzleData?.id || 1,
//                 currentBranch: currentBranch, 
//             });
//             setQueryResult({ loading: false, data: result, error: null });
//             setHasQueryExecuted(true);

//             if (result?.notebookUpdate) {
//                 addNotebookEntry({
//                     title: `Puzzle 1 – Initial Connections`, // Changed title
//                     content: result.notebookUpdate,
//                 });
//             }

//             if (result?.timePenalty) {
//                 deductTime(result.timePenalty);
//             }
//             if(result?.branch){
//                 setCurrentBranchState(result.branch);
//             }

//         } catch (err) {
//             setQueryResult({ loading: false, data: null, error: err.message });
//             deductTime(30);
//         }
//     };

//     const handleProceed = () => {
//         if (queryResult?.data?.branch) {
//             navigate(queryResult.data.branch);
//         } else if (queryResult?.data?.next) {
//             updatePuzzle(queryResult.data.next);
//             navigate(`/puzzle/${queryResult.data.next}`);
//         } else {
//             updatePuzzle(2);
//             navigate('/puzzle/2/stage2');
//         }
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
//                     <Link to="/home0" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
//                         <ArrowLeft className="w-5 h-5 mr-1" />
//                         <span className="text-sm">Back to Game</span>
//                     </Link>
//                     <h1 className="text-xl font-medium text-white">Puzzle 1: Unraveling Initial Connections</h1>
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
//                     <GameProgressBar current={1} total={4} />
//                     <div className="space-y-6 mt-4">
//                         {puzzleData?.story && <StoryBox text={puzzleData.story} />}
//                         {puzzleData?.clue && <ClueBox clue={puzzleData.clue} />}

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
//                                     queries={puzzleData.queries.map((q) => q.text)}
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

//                         {hasQueryExecuted && queryResult?.error === null && (
//                             <div className="mt-6 flex justify-end">
//                                 <button
//                                     onClick={handleProceed}
//                                     className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//                                 >
//                                     Proceed <ArrowRight className="w-4 h-4 ml-2" />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useContext } from 'react';
import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { executeQuery2, fetchPuzzleStage2 } from '../api';
import QueryResults from '../components/QueryResults';
import StoryBox from '../components/StoryBox';
import ClueBox from '../components/ClueBox';
import SQLQueryInterface from '../components/SQLQueryInterface';
import GameProgressBar from '../components/GameProgressBar';
import Notebook from '../components/Notebook';

export default function Puzzle1Stage2() {
    const navigate = useNavigate();
    const {
        gameTime,
        deductTime,
        addNotebookEntry,
        updatePuzzle,
        notebookEntries,
        currentBranch, // ✅ Get currentBranch from context
        setCurrentBranch
    } = useContext(GameContext);

    const [isNotebookOpen, setIsNotebookOpen] = useState(false);
    const [puzzleData, setPuzzleData] = useState(null);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [queryResult, setQueryResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasQueryExecuted, setHasQueryExecuted] = useState(false);
    const { puzzleId } = useParams();

    useEffect(() => {
        const loadPuzzle = async () => {
            try {
                const data = await fetchPuzzleStage2(1);
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
            console.log('puzzleId:', puzzleId);
            console.log('currentBranchState:', currentBranch);
            const result = await executeQuery2(selectedQuery, {
                puzzleId: puzzleData?.id || 1,
                currentBranch: currentBranch,
            });
            setQueryResult({ loading: false, data: result, error: null });
            setHasQueryExecuted(true);
            console.log('Result from server:', result);

            if (result?.notebookUpdate) {
                addNotebookEntry({
                    title: `Puzzle 1 – Initial Connections`,
                    content: result.notebookUpdate,
                });
            }

            if (result?.timePenalty) {
                deductTime(result.timePenalty);
            }
            // if (result?.branch) {
            //     setCurrentBranch(result.branch);
            //     navigate(result.branch);
            // }
            // if (result?.next) {
            //     updatePuzzle(result.next);
            //    // navigate(`/puzzle/${result.next}/stage2`); //removed /stage2
            // }

        } catch (err) {
            setQueryResult({ loading: false, data: null, error: err.message });
            deductTime(30);
        }
    };
    const handleProceed = () => {
        if (queryResult?.data?.branch) {
            navigate(queryResult.data.branch);
             } else if (queryResult?.data?.next) {
            updatePuzzle(queryResult.data.next);
            navigate(`/puzzle/${queryResult.data.next}/stage2`);
        } else {
            // Fallback if neither branch nor next is provided (shouldn't happen with your logic)
            updatePuzzle(2);
            navigate('/puzzle/2');
        }
    };

    // const handleProceed = () => {
    //     console.log('Next Puzzle Id: ', puzzleId);
    //     if (queryResult?.data?.branch) {
    //         navigate(queryResult.data.branch);
    //     } else if (queryResult?.data?.next) {
    //         updatePuzzle(queryResult.data.next);
    //         navigate(`/puzzle/${queryResult.data.next}/stage2`); // Keep /stage2 here if that's the intended route
    //     } else {
    //         navigate(`/puzzle/2/stage2`);
    //     }
    // };

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
                    <Link to="/home1" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        <span className="text-sm">Back to Game</span>
                    </Link>
                    <h1 className="text-xl font-medium text-white">Puzzle 1: Unraveling Initial Connections</h1>
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

                <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
            </div>
        </div>
    );
}

