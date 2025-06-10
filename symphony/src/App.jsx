
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { GameProvider } from './GameContext';
// import HomePage from './pages/HomePage';
// import CharacterProfiles from './pages/CharacterProfiles';
// import Puzzle1 from './pages/Puzzle1';
// import Puzzle1Branch from './pages/Puzzle1Branch';
// import Puzzle2 from './pages/Puzzle2';
// import Puzzle2Branch from './pages/Puzzle2Branch';
// import Puzzle3 from './pages/Puzzle3';
// import Puzzle3Branch from './pages/Puzzle3Branch'
// import Puzzle3Branch2 from './pages/Puzzle3Branch2';
// import FinalPuzzle from './pages/FinalPuzzle';
// import LoginPage from './pages/LoginPage';
// import LeaderboardPage from './pages/LeaderboardPage';
// import DashboardPage from './pages/DashboardPage';
// import ProfilePage from './pages/ProfilePage';
// //import EndStageOne from './pages/EndStageOne';
// //import GameEnd from './pages/GameEnd';
// /* <Route path="/final" element={<FinalPuzzle />} />
//          <Route path="/end" element={<GameEnd />} />*/
// function App() {
//   return (
//     <GameProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/home0" element={<HomePage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/leaderboard" element={<LeaderboardPage />} />
//           <Route path="/characters" element={<CharacterProfiles />} />
//           <Route path="/puzzle/1" element={<Puzzle1 />} />
//           <Route path="/puzzle/1/forgery" element={<Puzzle1Branch />} />
//           <Route path="/puzzle/2" element={<Puzzle2 />} />
//           <Route path="/puzzle/2/stage-left" element={<Puzzle2Branch />} />
//           <Route path="/puzzle/3" element={<Puzzle3 />} />
//           <Route path="/puzzle/3/archivist" element={<Puzzle3Branch />} />
//           <Route path="/puzzle/3/technician" element={<Puzzle3Branch2 />} />
//           <Route path="/final-puzzle" element={<FinalPuzzle />} />
//           {/* <Route path="/end-game" element={<EndStageOne />} />
//          */}
//         </Routes>
//       </Router>
//     </GameProvider>
//   );
// }

// export default App;
     import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './GameContext';
import HomePage from './pages/HomePage';
import HomePageStage2 from './pages/HomePageStage2';
import CharacterProfiles from './pages/CharacterProfiles';
import CharacterProfilesStage2 from './pages/CharacterProfilesStage2';
import Puzzle1 from './pages/Puzzle1';
import Puzzle1Branch from './pages/Puzzle1Branch';
import Puzzle1Stage2 from './pages/Puzzle1Stage2'; // Import the new components
import Puzzle1BranchStage2 from './pages/Puzzle1BranchStage2';
import Puzzle2 from './pages/Puzzle2';
import Puzzle2Branch from './pages/Puzzle2Branch';
import Puzzle2Stage2 from './pages/Puzzle2Stage2';
import Puzzle2BranchStage2 from './pages/Puzzle2BranchStage2';
import Puzzle3 from './pages/Puzzle3';
import Puzzle3Branch from './pages/Puzzle3Branch';
import Puzzle3Branch2 from './pages/Puzzle3Branch2';
import Puzzle3Branch1Stage2 from './pages/Puzzle3Branch1Stage2';
import Puzzle3Stage2 from './pages/Puzzle3Stage2';
import FinalPuzzle from './pages/FinalPuzzle';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import FinalPuzzleStage2 from './pages/FinalPuzzleStage2';
import TablesPage from './pages/TablesPage';

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/instructions" element={<TablesPage />} />
          <Route path="/home0" element={<HomePage />} />
          <Route path="/home1" element={<HomePageStage2 />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/characters" element={<CharacterProfiles />} />
          <Route path="/characters2" element={<CharacterProfilesStage2 />} />
          <Route path="/puzzle/1" element={<Puzzle1 />} />
          <Route path="/puzzle/1/forgery" element={<Puzzle1Branch />} />
          <Route path="/puzzle/1/stage2" element={<Puzzle1Stage2 />} />
          <Route path="/puzzle/1/archivist/stage2" element={<Puzzle1BranchStage2 />} /> {/* Use the component with fetchBranch */}
          <Route path="/puzzle/2" element={<Puzzle2 />} />
          <Route path="/puzzle/2/stage-left" element={<Puzzle2Branch />} />
          <Route path="/puzzle/2/stage2" element={<Puzzle2Stage2 />} />
          <Route path="/puzzle/2/vault-secrets/stage2" element={<Puzzle2BranchStage2 />} /> {/* Use the correct component */}
          <Route path="/puzzle/3" element={<Puzzle3 />} />
          <Route path="/puzzle/3/archivist" element={<Puzzle3Branch />} />
          <Route path="/puzzle/3/technician" element={<Puzzle3Branch2 />} />
          <Route path="/puzzle/3/order-of-names/stage2" element={<Puzzle3Branch1Stage2 />} /> {/* Use the correct component */}
          <Route path="/puzzle/3/stage2" element={<Puzzle3Stage2 />} />
          <Route path="/final-puzzle" element={<FinalPuzzle />} />
          <Route path="/final-puzzle2" element={<FinalPuzzleStage2 />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
