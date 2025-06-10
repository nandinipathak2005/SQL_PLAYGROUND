import { useState, useEffect, useContext } from 'react';
import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { executeQuery, fetchBranch } from '../api';
import QueryResults from '../components/QueryResults';
import StoryBox from '../components/StoryBox';
import RiddleComponent from '../components/RiddleComponent';
import SQLQueryInterface from '../components/SQLQueryInterface';
import Notebook from '../components/Notebook';

export default function Puzzle3Branch2() {
  const navigate = useNavigate();
 const { gameTime, deductTime, addNotebookEntry, updatePuzzle, currentBranch, notebookEntries, updateBranch } = useContext(GameContext);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [branchData, setBranchData] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [riddleResult, setRiddleResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasQueryExecuted, setHasQueryExecuted] = useState(false); // State to track query execution

  useEffect(() => {
    const loadBranch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBranch('3-technician'); // Fetch data for the '3-technician' branch
        setBranchData(data);
      } catch (err) {
        setError(err.message || 'Failed to load branch data.');
      } finally {
        setLoading(false);
      }
    };

    loadBranch();
  }, []);

  const handleQuerySelect = (queryText) => {
    setSelectedQuery(queryText);
  };

  const handleExecuteQuery = async () => {
    if (!selectedQuery) {
      alert('Please select a query.');
      return;
    }

    setQueryResult({ loading: true, data: null, error: null });
    setHasQueryExecuted(true); // Set to true when query is executed
   try {
      const result = await executeQuery(selectedQuery, {
        puzzleId: 3, // ✅ Explicitly set puzzleId to 2 for the branch
        currentBranch: currentBranch, // ✅ Send the currentBranch from context
      });
      setQueryResult({ loading: false, data: result, error: null });

      if (result?.notebookUpdate) {
       addNotebookEntry({ // ✅ Format as an object with title and content
          title: `Puzzle 3 - Branch`, // Or a more specific title

          content: result.notebookUpdate,
        });
      }
      if (result?.next) {
        navigate(result.next);
      } else if (result?.timePenalty) {
        deductTime(result.timePenalty);
      }
    } catch (err) {
      setQueryResult({ loading: false, data: null, error: err.message || 'Failed to execute query.' });
      deductTime(30);
    }
  };

  const handleProceed = () => {
    // Define what happens when proceed is clicked in the branch
    // For now, let's just go back to Puzzle 2 (main) or you can define a specific next step
    navigate('/final-puzzle');
  };

  const handleRiddleSelect = (selectedOptionId) => {
    const correctOption = branchData?.options?.find(opt => opt.correct);
    if (correctOption && selectedOptionId === correctOption.id) {
      setRiddleResult({ success: true, message: correctOption.resultText || 'Correct!' });
      if (correctOption.next) {
        setTimeout(() => navigate(correctOption.next), 1500);
      }
    } else {
      setRiddleResult({ error: true, message: 'Incorrect. Try again.' });
      deductTime(30);
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? '0' + mins : mins}`;
  };

  if (loading || !branchData) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading Technician's Insight...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error loading Technician's Insight: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-xl font-medium text-blue-400">False Lead: Technician's Insight</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-indigo-300 mr-2" />
            <span className="text-white font-medium">{formatTime(gameTime)}</span>
          </div>
          <button
            onClick={() => setIsNotebookOpen(!isNotebookOpen)}
            className={`flex items-center px-3 py-1 rounded-full transition-colors ${
              isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Notebook
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
            <HelpCircle className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
      <div className="flex min-h-[calc(100vh-56px)]">
        <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
          {branchData.outcome && <StoryBox text={branchData.outcome} color="text-blue-300 italic" />}
          {branchData.branchEnding && <StoryBox text={branchData.branchEnding} color="text-gray-400" />}
          {branchData.riddle && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-4">
              <h3 className="text-lg font-medium text-yellow-300 mb-2 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Riddle
              </h3>
              <p className="text-gray-300 italic mb-3">{branchData.riddle}</p>
              {branchData.options && (
                <RiddleComponent options={branchData.options} onSelect={handleRiddleSelect} result={riddleResult} />
              )}
            </div>
          )}
          {branchData.branchQueries && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-4">
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
          {queryResult && <QueryResults result={queryResult} />}

          {hasQueryExecuted && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleProceed}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                Proceed to Final Puzzle <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>
        {/* ✅ Pass notebookEntries to the Notebook component */}
        <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
      </div>
    </div>
  );
}