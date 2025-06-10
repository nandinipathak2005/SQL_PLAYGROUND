import React, { useState, useContext } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { updatePuzzle } from '../api';

const FinalPuzzleStage2 = () => {
  const navigate = useNavigate();
  const { gameTime, updatePuzzle } = useContext(GameContext);
  const [selectedCulprits, setSelectedCulprits] = useState({
    puzzle1: null,
    puzzle2: null,
    puzzle3: null,
  });
  const [isSelectionCorrect, setIsSelectionCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finalNarrative, setFinalNarrative] = useState('');
  const [error, setError] = useState(null);

  const culpritOptions = {
    puzzle1: [
      { name: 'Victor Crane, due to his familial connection.', value: 'victorCrane' },
      { name: 'Amelia Grant, due to her Ordo Cantus obsession.', value: 'ameliaGrant_p1_misleading' },
      { name: 'Aiden Crane, the withdrawn former director.', value: 'aidenCrane' },
      { name: 'Leo Voss, the cryptic music theorist.', value: 'leoVoss_p1' },
    ],
    puzzle2: [
      { name: 'Leo Voss, who communicated about a "ledger" and "code."', value: 'leoVoss_p2' },
      { name: 'Amelia Grant, who received the message about the "code."', value: 'ameliaGrant_p2' },
      { name: 'Victor Crane, due to his interest in historical societies.', value: 'victorCrane_p2_misleading' },
      { name: 'Sylvia Markov, the observant janitorial lead.', value: 'sylviaMarkov_p2' },
    ],
    puzzle3: [
      { name: 'Leo Voss, Amelia Grant, Victor Crane, and Sylvia Markov (in a specific order).', value: 'allFour_correct' },
      { name: 'Amelia Grant, due to her archive access.', value: 'ameliaGrant_p3_misleading' },
      { name: 'The Ordo Cantus members directly.', value: 'ordoCantus_p3' },
      { name: 'Aiden Crane, manipulating events from the shadows.', value: 'aidenCrane_p3' },
    ],
  };

  const handleCulpritSelect = (puzzle, culpritValue) => {
    setSelectedCulprits((prev) => ({
      ...prev,
      [puzzle]: culpritValue,
    }));
  };

  const handleCheckAnswer = async () => {
    setLoading(true);
    const correctAnswers = {
      puzzle1: 'victorCrane', // Focus on the revealed connection
      puzzle2: ['leoVoss_p2', 'ameliaGrant_p2'], // Both were involved in the cryptic communication
      puzzle3: 'allFour_correct', // The four staff members are key
    };

    const isPuzzle1Correct = selectedCulprits.puzzle1 === correctAnswers.puzzle1;
    const isPuzzle2Correct = correctAnswers.puzzle2.includes(selectedCulprits.puzzle2);
    const isPuzzle3Correct = selectedCulprits.puzzle3 === correctAnswers.puzzle3;

    const allCorrect = isPuzzle1Correct && isPuzzle2Correct && isPuzzle3Correct;
    setIsSelectionCorrect(allCorrect);

    try {
      const narrative = allCorrect
        ? "Detective, your understanding of the Conservatory's secrets is impeccable. You've correctly identified the crucial connections, the key communicators, and the group needed to unlock the Ordo Cantus archive. The truth is within your grasp!"
        : "Detective, while some of your insights are on track, crucial details have been missed. The full picture of the Ordo Cantus's influence within the Conservatory remains elusive. Review your findings carefully.";

      setFinalNarrative(narrative);
      if (allCorrect) {
        updatePuzzle(null); // Mark the puzzle as completed
      }
    } catch (error) {
      console.error("Error checking final answer:", error);
      setError("Failed to check final results.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? '0' + mins : mins}`;
  };

  const handleProceed = () => {
    if (isSelectionCorrect !== null) {
      navigate('/dashboard'); // Assuming '/stage-3' is the next route
    } else {
      alert('Please check your answers before proceeding.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
        <h1 className="text-xl font-medium text-white">Final Puzzle: Conservatory Culprits</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-indigo-300 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12 8.25a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white font-medium">{formatTime(gameTime)}</span>
          </div>
        </div>
      </div>

      <div className={`flex min-h-[calc(100vh-56px)]`}>
        <div className={`flex-grow p-6 space-y-6`}>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">
              Identify the Key Individuals of Stage 2
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Detective, based on your investigation within the Conservatory, identify the key individuals who held crucial information or connections related to the Ordo Cantus and the hidden archive in each of the main puzzles.
            </p>

            {/* Puzzle 1 Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Puzzle 1: Unraveling Initial Connections - Who provided the first significant link?
              </h3>
              <div className="flex flex-wrap gap-4">
                {culpritOptions.puzzle1.map((culprit) => (
                  <button
                    key={culprit.value}
                    onClick={() => handleCulpritSelect('puzzle1', culprit.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCulprits.puzzle1 === culprit.value
                      ? 'bg-indigo-700 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {culprit.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Puzzle 2 Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Puzzle 2: Deciphering Cryptic Clues - Who were the key communicators of the hidden code?
              </h3>
              <div className="flex flex-wrap gap-4">
                {culpritOptions.puzzle2.map((culprit) => (
                  <button
                    key={culprit.value}
                    onClick={() => handleCulpritSelect('puzzle2', culprit.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCulprits.puzzle2 === culprit.value
                      ? 'bg-indigo-700 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {culprit.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Puzzle 3 Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Puzzle 3: Unlocking ordo_files - Which group was essential to solving the final riddle?
              </h3>
              <div className="flex flex-wrap gap-4">
                {culpritOptions.puzzle3.map((culprit) => (
                  <button
                    key={culprit.value}
                    onClick={() => handleCulpritSelect('puzzle3', culprit.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCulprits.puzzle3 === culprit.value
                      ? 'bg-indigo-700 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {culprit.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Check Answer Button */}
            <div className="mt-6">
              <button
                onClick={handleCheckAnswer}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Answer'}
              </button>
            </div>

            {/* Display result and narrative */}
            {isSelectionCorrect !== null && (
              <div className="mt-6 p-4 rounded-lg border">
                {isSelectionCorrect ? (
                  <>
                    <div className="flex items-center gap-2 text-green-500 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <h4 className="font-semibold">Correct!</h4>
                    </div>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                      {finalNarrative}
                    </p>
                    <button
                      onClick={handleProceed}
                      className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                    >
                      Proceed to next Stage!
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-red-500 mb-2">
                      <XCircle className="w-5 h-5" />
                      <h4 className="font-semibold">Incorrect.</h4>
                    </div>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                      {finalNarrative}
                    </p>
                    <button
                      onClick={handleProceed}
                      className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                    >
                      Sorry...Retry!
                    </button>
                  </>
                )}

              </div>
            )}
            {error && <div className="mt-4 text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPuzzleStage2;