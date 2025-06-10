// import { createContext, useState, useEffect } from 'react';

// export const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [gameTime, setGameTime] = useState(300); // 5 hours in minutes
//   const [notebookEntries, setNotebookEntries] = useState([]);
//   const [currentPuzzle, setCurrentPuzzle] = useState(1);
//   const [gameEndStatus, setGameEndStatus] = useState(null);
//   const [currentBranch, setCurrentBranch] = useState(''); // Add currentBranch state

//   useEffect(() => {
//     const timer = gameTime > 0 && setInterval(() => {
//       setGameTime(prev => prev - 1);
//     }, 60000); // Count down every minute
//     return () => clearInterval(timer);
//   }, [gameTime]);

//   const deductTime = (minutes) => {
//     setGameTime(prev => Math.max(0, prev - minutes));
//   };

//   const addNotebookEntry = (entry) => {
//     setNotebookEntries(prev => [...prev, entry]);
//   };

//   const updatePuzzle = (puzzleId) => {
//     setCurrentPuzzle(puzzleId);
//   };
//   // const updatePuzzle = (puzzleId) => {
//   //   setCurrentPuzzle(puzzleId);
//   // };

//   // Add updateBranch function
//   const updateBranch = (branchName) => {
//     setCurrentBranch(branchName);
//   };

//   const resetGame = () => {
//     setGameTime(300);
//     setNotebookEntries([]);
//     setCurrentPuzzle(1);
//     setGameEndStatus(null);
//   };

//   return (
//     <GameContext.Provider value={{
//       gameTime,
//       deductTime,
//       addNotebookEntry,
//       notebookEntries,
//       currentPuzzle,
//       updatePuzzle,
//       currentBranch, 
//       updateBranch,
//       gameEndStatus,
//       setGameEndStatus,
//       resetGame
//     }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameTime, setGameTime] = useState(300); // 5 hours in minutes
  const [notebookEntries, setNotebookEntries] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(1);
  const [currentBranch, setCurrentBranch] = useState(''); // Add currentBranch state
  const [gameEndStatus, setGameEndStatus] = useState(null);

  useEffect(() => {
    const timer = gameTime > 0 && setInterval(() => {
      setGameTime(prev => prev - 1);
    }, 60000); // Count down every minute
    return () => clearInterval(timer);
  }, [gameTime]);

  const deductTime = (minutes) => {
    setGameTime(prev => Math.max(0, prev - minutes));
  };

  const addNotebookEntry = (entry) => {
    setNotebookEntries(prev => [...prev, entry]);
  };

  const updatePuzzle = (puzzleId) => {
    setCurrentPuzzle(puzzleId);
  };

  // Add updateBranch function
  const updateBranch = (branchName) => {
    setCurrentBranch(branchName);
  };

  const resetGame = () => {
    setGameTime(300);
    setNotebookEntries([]);
    setCurrentPuzzle(1);
    setCurrentBranch(''); // Reset branch
    setGameEndStatus(null);
  };

  return (
    <GameContext.Provider value={{
      gameTime,
      deductTime,
      addNotebookEntry,
      notebookEntries,
      currentPuzzle,
      updatePuzzle,
      currentBranch, // Add currentBranch to the context value
      updateBranch, // Add updateBranch to the context value
      gameEndStatus,
      setGameEndStatus,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};
