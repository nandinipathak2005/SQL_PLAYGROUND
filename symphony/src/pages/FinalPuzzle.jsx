// import React, { useState, useEffect, useContext } from 'react';
// import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { GameContext } from '../GameContext'; 
// import { updatePuzzle } from '../api';

// const FinalPuzzle = () => {
//     const navigate = useNavigate();
//     const { gameTime, notebookEntries, updatePuzzle } = useContext(GameContext);
//     const [isNotebookOpen, setIsNotebookOpen] = useState(false);
//     const [selectedSuspects, setSelectedSuspects] = useState({
//         puzzle1: null,
//         puzzle2: null,
//         puzzle3: null,
//     });
//     const [isSelectionCorrect, setIsSelectionCorrect] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [finalNarrative, setFinalNarrative] = useState('');
//     const [error, setError] = useState(null); // Added state for error handling

//     // Suspect options for each puzzle, based on the PDF
//     const suspectOptions = {
//         puzzle1: [
//             { name: 'Lydia Crane, due to her unusual re-entry.', value: 'lydiaCrane' },
//             { name: 'P1100, based on the later, unrecorded access.', value: 'p1100_phantom' },
//             { name: 'Axel Borne, as he accessed the vault biometrically.', value: 'axelBorne' },
//             { name: 'Grace Tanaka, given her unrestricted access.', value: 'graceTanaka' },
//         ],
//         puzzle2: [
//             { name: 'Axel Borne, the audio technician assigned to the CCTV console.', value: 'axelBorne' },
//             { name: 'Marcus Bell, the anxious stage manager seen near the Main Lobby.', value: 'marcusBell' },
//             { name: 'Lydia Crane, perhaps trying to hide her movements.', value: 'lydiaCrane' },
//             { name: 'P1100, if they somehow manipulated the system remotely.', value: 'p1100_phantom' },
//         ],
//         puzzle3: [
//             { name: 'P1100, acting alone.', value: 'p1100' },
//             { name: 'Grace Tanaka, who entered Room R-03 after P1100.', value: 'graceTanaka' },
//             { name: 'Axel Borne, with his access to backstage systems.', value: 'axelBorne_tech' },
//             { name: 'Marcus Bell, overseeing backstage personnel.', value: 'marcusBell' },
//         ],
//     };

//     // Function to handle suspect selection
//     const handleSuspectSelect = (puzzle, suspectValue) => {
//         setSelectedSuspects((prev) => ({
//             ...prev,
//             [puzzle]: suspectValue,
//         }));
//     };

//     // Function to check the final answer
//     const handleCheckAnswer = async () => {
//         setLoading(true);
//         const correctAnswers = {
//             puzzle1: 'lydiaCrane',
//             puzzle2: 'axelBorne',
//             puzzle3: 'p1100',
//         };

//         if (
//             selectedSuspects.puzzle1 &&
//             selectedSuspects.puzzle2 &&
//             selectedSuspects.puzzle3
//         ) {
//             const isCorrect =
//                 selectedSuspects.puzzle1 === correctAnswers.puzzle1 &&
//                 selectedSuspects.puzzle2 === correctAnswers.puzzle2 &&
//                 selectedSuspects.puzzle3 === correctAnswers.puzzle3;

//             setIsSelectionCorrect(isCorrect);

//             try {
//                 const narrative = isCorrect
//                     ? "Detective, your deductions have been flawless. You've successfully identified Lydia Crane, Axel Borne, and P1100 as the key figures in this intricate scheme. The Symphony of the Spheres has been recovered, and justice prevails. Case Closed."
//                     : "Detective, your investigation has hit a snag. While some of your deductions show promise, crucial errors have led you down the wrong path. The true culprits remain at large, and the Symphony of the Spheres is still missing. The case remains open...";

//                 setFinalNarrative(narrative);
//                 if (isCorrect) {
//                     updatePuzzle(null);
//                 }
//             } catch (error) {
//                 console.error("Error fetching final narrative:", error);
//                 setError("Failed to fetch final results.");
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             alert('Please select a suspect for all three puzzles.');
//             setLoading(false);
//         }
//     };

//     const formatTime = (minutes) => {
//         const hours = Math.floor(minutes / 60);
//         const mins = minutes % 60;
//         return `${hours}:${mins < 10 ? '0' + mins : mins}`;
//     };

//     const handleProceed = () => {
//         if (isSelectionCorrect !== null) {
//             navigate('/end-game');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
//             <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
//                 <h1 className="text-xl font-medium text-white">Final Puzzle: The Culprits</h1>
//                 <div className="flex items-center gap-4">
//                     <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             className="w-4 h-4 text-indigo-300 mr-2"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18a6 6 0 100-12 6 6 0 000 12z"
//                                 clipRule="evenodd"
//                             />
//                             <path
//                                 fillRule="evenodd"
//                                 d="M12 8.25a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                         <span className="text-white font-medium">{formatTime(gameTime)}</span>
//                     </div>
//                     <button
//                         onClick={() => setIsNotebookOpen(!isNotebookOpen)}
//                         className={`flex items-center px-3 py-1 rounded-full transition-colors ${isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
//                     >
//                         <BookOpen className="w-4 h-4 mr-2" />
//                         Notebook
//                     </button>
//                 </div>
//             </div>

//             <div className={`flex min-h-[calc(100vh-56px)]`}>
//                 <div
//                     className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6 space-y-6`}
//                 >
//                     <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
//                         <h2 className="text-xl font-semibold text-indigo-300 mb-4">
//                             Identify the Culprits
//                         </h2>
//                         <p className="text-gray-400 leading-relaxed mb-4">
//                             Detective, based on your investigation, select the most likely
//                             culprit for each puzzle. Use your notebook to review the clues.
//                         </p>

//                         {/* Puzzle 1 Selection */}
//                         <div className="mb-4">
//                             <h3 className="text-lg font-semibold text-gray-300 mb-2">
//                                 Puzzle 1: Who accessed the vault last?
//                             </h3>
//                             <div className="flex flex-wrap gap-4">
//                                 {suspectOptions.puzzle1.map((suspect) => (
//                                     <button
//                                         key={suspect.value}
//                                         onClick={() => handleSuspectSelect('puzzle1', suspect.value)}
//                                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSuspects.puzzle1 === suspect.value
//                                             ? 'bg-indigo-700 text-white'
//                                             : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                                             }`}
//                                     >
//                                         {suspect.name}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Puzzle 2 Selection */}
//                         <div className="mb-4">
//                             <h3 className="text-lg font-semibold text-gray-300 mb-2">
//                                 Puzzle 2: Who corrupted the footage?
//                             </h3>
//                             <div className="flex flex-wrap gap-4">
//                                 {suspectOptions.puzzle2.map((suspect) => (
//                                     <button
//                                         key={suspect.value}
//                                         onClick={() => handleSuspectSelect('puzzle2', suspect.value)}
//                                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSuspects.puzzle2 === suspect.value
//                                             ? 'bg-indigo-700 text-white'
//                                             : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                                             }`}
//                                     >
//                                         {suspect.name}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Puzzle 3 Selection */}
//                         <div className="mb-4">
//                             <h3 className="text-lg font-semibold text-gray-300 mb-2">
//                                 Puzzle 3: Who was backstage with the unknown entity?
//                             </h3>
//                             <div className="flex flex-wrap gap-4">
//                                 {suspectOptions.puzzle3.map((suspect) => (
//                                     <button
//                                         key={suspect.value}
//                                         onClick={() => handleSuspectSelect('puzzle3', suspect.value)}
//                                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSuspects.puzzle3 === suspect.value
//                                             ? 'bg-indigo-700 text-white'
//                                             : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                                             }`}
//                                     >
//                                         {suspect.name}
//                                      </button>
//                                  ))}
//                             </div>
//                         </div>

//                         {/* Check Answer Button */}
//                         <div className="mt-6">
//                             <button
//                                 onClick={handleCheckAnswer}
//                                 className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
//                                 disabled={loading}
//                             >
//                                 {loading ? (
//                                     'Checking...'
//                                 ) : (
//                                     'Check Answer'
//                                 )}
//                             </button>
//                         </div>

//                         {/* Display result and narrative */}
//                         {isSelectionCorrect !== null && (
//                             <div className="mt-6 p-4 rounded-lg border">
//                                 {isSelectionCorrect ? (
//                                     <>
//                                         <div className="flex items-center gap-2 text-green-500 mb-2">
//                                             <CheckCircle className="w-5 h-5" />
//                                             <h4 className="font-semibold">Correct!</h4>
//                                         </div>
//                                         <p className="text-gray-400 leading-relaxed whitespace-pre-line">
//                                             {finalNarrative}
//                                         </p>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <div className="flex items-center gap-2 text-red-500 mb-2">
//                                             <XCircle className="w-5 h-5" />
//                                             <h4 className="font-semibold">Incorrect.</h4>
//                                         </div>
//                                         <p className="text-gray-400 leading-relaxed whitespace-pre-line">
//                                             {finalNarrative}
//                                         </p>
//                                     </>
//                                 )}
//                                 {isSelectionCorrect !== null && (
//                                     <div className="mt-6">
//                                         <button
//                                             onClick={handleProceed}
//                                             className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
//                                         >
//                                             Proceed to End Game
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                         {error && (
//                             <div className="mt-4 text-red-500">
//                                 {error}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div
//                     className={`w-80 bg-gray-700 border-l border-gray-600 fixed top-0 bottom-0 right-0 p-6 overflow-y-auto transition-transform duration-300 transform ${isNotebookOpen ? 'translate-x-0' : 'translate-x-full'}`}
//                 >
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-semibold text-indigo-300">
//                             Detective's Notebook
//                         </h2>
//                         <button
//                             onClick={() => setIsNotebookOpen(false)}
//                             className="text-gray-400 hover:text-gray-300"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 24 24"
//                                 fill="currentColor"
//                                 className="w-5 h-5"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 011.06 1.06L13.06 12l5.47 5.47a.75.75 0 01-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                     {notebookEntries.length > 0 ? (
//                         <ul className="space-y-2">
//                             {notebookEntries.map((entry, index) => (
//                                 <li
//                                     key={index}
//                                     className="text-gray-400 text-sm border-b border-gray-600 pb-2"
//                                 >
//                                     {entry}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-500 text-sm">No entries yet.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FinalPuzzle;

import React, { useState, useContext } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { updatePuzzle } from '../api';

const FinalPuzzle = () => {
  const navigate = useNavigate();
  const { gameTime, updatePuzzle } = useContext(GameContext); // Removed notebookEntries
  const [selectedSuspects, setSelectedSuspects] = useState({
    puzzle1: null,
    puzzle2: null,
    puzzle3: null,
  });
  const [isSelectionCorrect, setIsSelectionCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finalNarrative, setFinalNarrative] = useState('');
  const [error, setError] = useState(null);

  // Suspect options for each puzzle
  const suspectOptions = {
    puzzle1: [
      { name: 'Lydia Crane, due to her unusual re-entry.', value: 'lydiaCrane' },
      { name: 'P1100, based on the later, unrecorded access.', value: 'p1100_phantom' },
      { name: 'Axel Borne, as he accessed the vault biometrically.', value: 'axelBorne' },
      { name: 'Grace Tanaka, given her unrestricted access.', value: 'graceTanaka' },
    ],
    puzzle2: [
      { name: 'Axel Borne, the audio technician assigned to the CCTV console.', value: 'axelBorne' },
      { name: 'Marcus Bell, the anxious stage manager seen near the Main Lobby.', value: 'marcusBell' },
      { name: 'Lydia Crane, perhaps trying to hide her movements.', value: 'lydiaCrane' },
      { name: 'P1100, if they somehow manipulated the system remotely.', value: 'p1100_phantom' },
    ],
    puzzle3: [
      { name: 'P1100, acting alone.', value: 'p1100' },
      { name: 'Grace Tanaka, who entered Room R-03 after P1100.', value: 'graceTanaka' },
      { name: 'Axel Borne, with his access to backstage systems.', value: 'axelBorne_tech' },
      { name: 'Marcus Bell, overseeing backstage personnel.', value: 'marcusBell' },
    ],
  };

  // Function to handle suspect selection
  const handleSuspectSelect = (puzzle, suspectValue) => {
    setSelectedSuspects((prev) => ({
      ...prev,
      [puzzle]: suspectValue,
    }));
  };

  // Function to check the final answer
  const handleCheckAnswer = async () => {
    setLoading(true);
    const correctAnswers = {
      puzzle1: 'lydiaCrane',
      puzzle2: 'axelBorne',
      puzzle3: 'p1100',
    };

    if (
      selectedSuspects.puzzle1 &&
      selectedSuspects.puzzle2 &&
      selectedSuspects.puzzle3
    ) {
      const isCorrect =
        selectedSuspects.puzzle1 === correctAnswers.puzzle1 &&
        selectedSuspects.puzzle2 === correctAnswers.puzzle2 &&
        selectedSuspects.puzzle3 === correctAnswers.puzzle3;

      setIsSelectionCorrect(isCorrect);

      try {
        const narrative = isCorrect
          ? "Detective, your deductions have been flawless. You've successfully identified Lydia Crane, Axel Borne, and P1100 as the key figures in this intricate scheme. The Symphony of the Spheres has been recovered, and justice prevails. Case Closed."
          : "Detective, your investigation has hit a snag. While some of your deductions show promise, crucial errors have led you down the wrong path. The true culprits remain at large, and the Symphony of the Spheres is still missing. The case remains open...";

        setFinalNarrative(narrative);
        if (isCorrect) {
          updatePuzzle(null);
        }
      } catch (error) {
        console.error("Error fetching final narrative:", error);
        setError("Failed to fetch final results.");
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please select a suspect for all three puzzles.');
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
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
        <h1 className="text-xl font-medium text-white">Final Puzzle: The Culprits</h1>
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
        <div
          className={`flex-grow p-6 space-y-6`}
        >
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">
              Identify the Culprits
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Detective, based on your investigation, select the most likely
              culprit for each puzzle.
            </p>

            {/* Puzzle 1 Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Puzzle 1: Who accessed the vault last?
              </h3>
              <div className="flex flex-wrap gap-4">
                {suspectOptions.puzzle1.map((suspect) => (
                  <button
                    key={suspect.value}
                    onClick={() => handleSuspectSelect('puzzle1', suspect.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSuspects.puzzle1 === suspect.value
                      ? 'bg-indigo-700 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {suspect.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Puzzle 2 Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Puzzle 2: Who corrupted the footage?
              </h3>
              <div className="flex flex-wrap gap-4">
                {suspectOptions.puzzle2.map((suspect) => (
                  <button
                    key={suspect.value}
                    onClick={() => handleSuspectSelect('puzzle2', suspect.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSuspects.puzzle2 === suspect.value
                      ? 'bg-indigo-700 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {suspect.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Puzzle 3 Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Puzzle 3: Who was backstage with the unknown entity?
              </h3>
              <div className="flex flex-wrap gap-4">
                {suspectOptions.puzzle3.map((suspect) => (
                  <button
                    key={suspect.value}
                    onClick={() => handleSuspectSelect('puzzle3', suspect.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedSuspects.puzzle3 === suspect.value
                      ? 'bg-indigo-700 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {suspect.name}
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
                    <div className="mt-6">
                      <button
                        onClick={handleProceed}
                        className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                      >
                        Proceed to next Stages!
                      </button>
                    </div>
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

                    <div className="mt-6">
                      <button
                        onClick={handleProceed}
                        className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                      >
                        Sorry...Retry!
                      </button>
                    </div>
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

export default FinalPuzzle;