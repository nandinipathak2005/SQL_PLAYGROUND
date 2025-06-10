// import { useState, useEffect } from 'react';
// import { Music, FileText, ChevronRight, Volume2, Clock, Database, GitBranch } from 'lucide-react';

// export default function HomePage() {
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Simulate loading to trigger animation effects
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   const toggleAudio = () => setIsAudioPlaying(!isAudioPlaying);

//   const startGame = () => {
//     // Navigation logic would use React Router in actual implementation
//     console.log("Starting game...");
//     // In real implementation: navigate("/puzzle/1");
//   };

//   const goToCharacters = () => {
//     // Navigation logic would use React Router in actual implementation
//     console.log("Going to character profiles...");
//     // In real implementation: navigate("/characters");
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-black to-indigo-950 text-white overflow-hidden">
//       {/* Animated background particles */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
//         <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 left-2/3 w-56 h-56 bg-blue-600 rounded-full filter blur-3xl animate-pulse" />
//       </div>
      
//       {/* Subtle music note overlay */}
//       <div 
//         className="absolute inset-0 opacity-20 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/api/placeholder/1200/800')",
//           backgroundBlendMode: "overlay",
//         }}
//       />
      
//       {/* Main content container with entry animation */}
//       <div className={`relative z-10 container mx-auto px-4 pt-8 pb-16 flex flex-col items-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
//         {/* Header with navigation elements */}
//         <div className="w-full flex justify-between items-center mb-8">
//           <div className="flex items-center gap-2">
//             <Music className="w-6 h-6 text-indigo-400" />
//             <span className="text-lg font-medium text-indigo-300">Mystery Sonata</span>
//           </div>
          
//           <button 
//             onClick={toggleAudio}
//             className={`p-3 rounded-full ${isAudioPlaying ? 'bg-indigo-700' : 'bg-gray-800'} hover:bg-indigo-600 transition-all duration-300 shadow-lg`}
//             aria-label="Toggle audio"
//           >
//             <Volume2 className={`w-5 h-5 ${isAudioPlaying ? 'text-indigo-300' : 'text-gray-300'}`} />
//           </button>
//         </div>
        
//         {/* Game title with animated reveal */}
//         <div className={`mt-8 mb-10 text-center transform transition-all duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-8'}`}>
//           <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 pb-2">
//             THE CASE OF THE
//           </h1>
//           <h2 className="text-6xl md:text-8xl font-serif italic mt-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-300 via-indigo-400 to-blue-300">
//             Stolen Symphony
//           </h2>
//           <div className="flex justify-center items-center mt-6 space-x-4">
//             <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-full"></div>
//             <span className="text-xl font-light text-gray-300">A Detective Miles Corbin Mystery</span>
//             <div className="w-12 h-1 bg-gradient-to-l from-indigo-500 to-transparent rounded-full"></div>
//           </div>
//         </div>
        
//         {/* Game description with enhanced styling */}
//         <div className={`max-w-2xl bg-gray-900 bg-opacity-70 p-8 rounded-xl border border-indigo-800 mb-12 shadow-xl backdrop-blur-sm transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <p className="text-lg mb-6 text-gray-200 leading-relaxed">
//             The hushed grandeur of the Grand Symphony Hall, usually alive with melodic anticipation, is instead gripped by a chilling silence. The ancient, handwritten score, rumored to contain a priceless musical cipher, has vanished from the seemingly impenetrable vault.
//           </p>
//           <p className="text-lg mb-6 text-gray-200 leading-relaxed">
//             You have five critical in-game hours to navigate this intricate case. Choose your queries with precision - every incorrect move costs you precious time. Can you unravel the mystery before the final note fades?
//           </p>
//           <div className="flex items-center text-indigo-300 text-sm mt-8 border-t border-indigo-900 pt-6">
//             <FileText className="w-4 h-4 mr-2" />
//             <span>Solve the case before the final curtain falls</span>
//           </div>
//         </div>
        
//         {/* Action buttons with improved visual design */}
//         <div className={`flex flex-col md:flex-row gap-5 mt-4 transform transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <button 
//             onClick={startGame}
//             className="group py-4 px-10 rounded-lg bg-gradient-to-r from-indigo-700 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white text-xl font-medium transition-all flex items-center gap-3 shadow-lg overflow-hidden relative"
//           >
//             <span className="relative z-10">Begin Investigation</span>
//             <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </button>
          
//           <button 
//             onClick={goToCharacters}
//             className="py-4 px-10 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xl font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
//           >
//             Character Profiles
//           </button>
//         </div>
        
//         {/* Game features with animated cards */}
//         <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl transform transition-all duration-700 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <div className="bg-gray-900 bg-opacity-60 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm group">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-indigo-900 rounded-lg">
//                 <Clock className="w-6 h-6 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
//               </div>
//               <h3 className="text-xl font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors">5 Hours</h3>
//             </div>
//             <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Solve the mystery before time runs out and the trail goes cold</p>
//           </div>
          
//           <div className="bg-gray-900 bg-opacity-60 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm group">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-indigo-900 rounded-lg">
//                 <Database className="w-6 h-6 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
//               </div>
//               <h3 className="text-xl font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors">SQL Queries</h3>
//             </div>
//             <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Use your database skills to uncover hidden clues and connections</p>
//           </div>
          
//           <div className="bg-gray-900 bg-opacity-60 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm group">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-indigo-900 rounded-lg">
//                 <GitBranch className="w-6 h-6 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
//               </div>
//               <h3 className="text-xl font-medium text-indigo-300 group-hover:text-indigo-200 transition-colors">Multiple Paths</h3>
//             </div>
//             <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Each decision leads to different story branches and outcomes</p>
//           </div>
//         </div>
        
//         {/* Footer element */}
//         <div className={`mt-20 text-center text-gray-500 transform transition-all duration-700 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <p>Unmask the culprit. Recover the score. Restore the harmony.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// import { useState, useEffect } from 'react';
// import { Music, FileText, ChevronRight, Volume2, Clock, Database, GitBranch } from 'lucide-react';

// export default function HomePage() {
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Simple fade-in effect
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   const toggleAudio = () => setIsAudioPlaying(!isAudioPlaying);

//   const startGame = () => {
//     console.log("Starting game...");
//   };

//   const goToCharacters = () => {
//     console.log("Going to character profiles...");
//   };

//   return (
//     <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
//       {/* Background elements */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 w-full"></div>
      
//       {/* Simple purple glow effects */}
//       <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full opacity-20 blur-xl"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900 rounded-full opacity-20 blur-xl"></div>
      
//       {/* Music themed overlay */}
//       <div 
//         className="absolute inset-0 opacity-10 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/api/placeholder/1200/800')",
//           backgroundBlendMode: "overlay",
//         }}
//       />
      
//       {/* Main content container with opacity transition */}
//       <div className={`relative z-10 container mx-auto px-4 pt-8 pb-16 flex flex-col items-center transition-opacity duration-500 w-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
//         {/* Header with navigation elements */}
//         <div className="w-full flex justify-between items-center mb-8 px-4">
//           <div className="flex items-center gap-2">
//             <Music className="w-6 h-6 text-indigo-400" />
//             <span className="text-lg font-medium text-indigo-300">Mystery Sonata</span>
//           </div>
          
//           <button 
//             onClick={toggleAudio}
//             className={`p-3 rounded-full ${isAudioPlaying ? 'bg-indigo-700' : 'bg-gray-800'} hover:bg-indigo-600 transition-colors`}
//             aria-label="Toggle audio"
//           >
//             <Volume2 className={`w-5 h-5 ${isAudioPlaying ? 'text-indigo-300' : 'text-gray-300'}`} />
//           </button>
//         </div>
        
//         {/* Game title with better styling */}
//         <div className="mt-8 mb-10 text-center w-full">
//           <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider text-white">
//             <span className="text-indigo-300">THE CASE OF THE</span>
//           </h1>
//           <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif italic mt-2 tracking-tight text-purple-300">
//             Stolen Symphony
//           </h2>
//           <div className="flex justify-center items-center mt-6 space-x-4">
//             <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
//             <span className="text-xl font-light text-gray-300">A Detective Miles Corbin Mystery</span>
//             <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
//           </div>
//         </div>
        
//         {/* Game description with enhanced styling */}
//         <div className="max-w-2xl w-full bg-gray-900 bg-opacity-80 p-6 sm:p-8 rounded-xl border border-indigo-800 mb-12 shadow-xl">
//           <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-200 break-words">
//             The hushed grandeur of the Grand Symphony Hall, usually alive with melodic anticipation, is instead gripped by a chilling silence. The ancient, handwritten score, rumored to contain a priceless musical cipher, has vanished from the seemingly impenetrable vault.
//           </p>
//           <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-200 break-words">
//             You have five critical in-game hours to navigate this intricate case. Choose your queries with precision - every incorrect move costs you precious time. Can you unravel the mystery before the final note fades?
//           </p>
//           <div className="flex items-center text-indigo-300 text-sm mt-6 sm:mt-8 border-t border-indigo-900 pt-4 sm:pt-6">
//             <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
//             <span>Solve the case before the final curtain falls</span>
//           </div>
//         </div>
        
//         {/* Action buttons with improved visual design */}
//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-4 w-full max-w-md sm:max-w-lg">
//           <button 
//             onClick={startGame}
//             className="py-3 sm:py-4 px-6 sm:px-10 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white text-lg sm:text-xl font-medium transition-colors flex items-center justify-center gap-3 shadow-lg relative overflow-hidden group w-full"
//           >
//             <span className="relative z-10">Begin Investigation</span>
//             <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
//             <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//           </button>
          
//           <button 
//             onClick={goToCharacters}
//             className="py-3 sm:py-4 px-6 sm:px-10 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-lg sm:text-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-md w-full"
//           >
//             Character Profiles
//           </button>
//         </div>
        
//         {/* Game features with better cards */}
//         <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl w-full">
//           <div className="bg-gray-900 bg-opacity-80 p-4 sm:p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
//             <div className="flex items-center gap-3 mb-3 sm:mb-4">
//               <div className="p-2 bg-indigo-900 rounded-lg">
//                 <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-300" />
//               </div>
//               <h3 className="text-lg sm:text-xl font-medium text-indigo-300">5 Hours</h3>
//             </div>
//             <p className="text-sm sm:text-base text-gray-400">Solve the mystery before time runs out and the trail goes cold</p>
//           </div>
          
//           <div className="bg-gray-900 bg-opacity-80 p-4 sm:p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
//             <div className="flex items-center gap-3 mb-3 sm:mb-4">
//               <div className="p-2 bg-indigo-900 rounded-lg">
//                 <Database className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-300" />
//               </div>
//               <h3 className="text-lg sm:text-xl font-medium text-indigo-300">SQL Queries</h3>
//             </div>
//             <p className="text-sm sm:text-base text-gray-400">Use your database skills to uncover hidden clues and connections</p>
//           </div>
          
//           <div className="bg-gray-900 bg-opacity-80 p-4 sm:p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group sm:col-span-2 md:col-span-1">
//             <div className="flex items-center gap-3 mb-3 sm:mb-4">
//               <div className="p-2 bg-indigo-900 rounded-lg">
//                 <GitBranch className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-300" />
//               </div>
//               <h3 className="text-lg sm:text-xl font-medium text-indigo-300">Multiple Paths</h3>
//             </div>
//             <p className="text-sm sm:text-base text-gray-400">Each decision leads to different story branches and outcomes</p>
//           </div>
//         </div>
        
//         {/* Footer element */}
//         <div className="mt-16 sm:mt-20 text-center text-gray-500">
//           <p>Unmask the culprit. Recover the score. Restore the harmony.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React from 'react';

// export default function HomePage() {
//   return (
//     <div className="bg-red-500 text-white p-10">
//       <h1>Hello from Home Page!</h1>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Test Button
//       </button>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Music, FileText, ChevronRight, Volume2, Clock, Database, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
  const navigate = useNavigate();

  const goToCharacters = () => {
    navigate('/characters');
  };
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple fade-in effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => setIsAudioPlaying(!isAudioPlaying);

  const startGame = () => {
    navigate('/puzzle/1');
  };
  //};

  
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
      
      {/* Simple purple glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900 rounded-full opacity-20 blur-xl"></div>
      
      {/* Music themed overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/api/placeholder/1200/800')",
          backgroundBlendMode: "overlay",
        }}
      />
      
      {/* Main content container with opacity transition */}
      <div className={`relative z-10 container mx-auto px-4 pt-8 pb-16 flex flex-col items-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header with navigation elements */}
        <div className="w-full flex justify-between items-center mb-8 px-4">
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-indigo-400" />
            <span className="text-lg font-medium text-indigo-300">Mystery Sonata</span>
          </div>
          
          <button 
            onClick={toggleAudio}
            className={`p-3 rounded-full ${isAudioPlaying ? 'bg-indigo-700' : 'bg-gray-800'} hover:bg-indigo-600 transition-colors`}
            aria-label="Toggle audio"
          >
            <Volume2 className={`w-5 h-5 ${isAudioPlaying ? 'text-indigo-300' : 'text-gray-300'}`} />
          </button>
        </div>
        
        {/* Game title with better styling */}
        <div className="mt-8 mb-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-white">
            <span className="text-indigo-300">THE CASE OF THE</span>
          </h1>
          <h2 className="text-6xl md:text-8xl font-serif italic mt-2 tracking-tight text-purple-300">
            Stolen Symphony
          </h2>
          <div className="flex justify-center items-center mt-6 space-x-4">
            <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
            <span className="text-xl font-light text-gray-300">A Detective Miles Corbin Mystery</span>
            <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Game description with enhanced styling */}
        <div className="max-w-2xl bg-gray-900 bg-opacity-80 p-8 rounded-xl border border-indigo-800 mb-12 shadow-xl">
          <p className="text-lg mb-6 text-gray-200">
            The hushed grandeur of the Grand Symphony Hall, usually alive with melodic anticipation, is instead gripped by a chilling silence. The ancient, handwritten score, rumored to contain a priceless musical cipher, has vanished from the seemingly impenetrable vault.
          </p>
          <p className="text-lg mb-6 text-gray-200">
            You have five critical in-game hours to navigate this intricate case. Choose your queries with precision - every incorrect move costs you precious time. Can you unravel the mystery before the final note fades?
          </p>
          <div className="flex items-center text-indigo-300 text-sm mt-8 border-t border-indigo-900 pt-6">
            <FileText className="w-4 h-4 mr-2" />
            <span>Solve the case before the final curtain falls</span>
          </div>
        </div>
        
        {/* Action buttons with improved visual design */}
        <div className="flex flex-col md:flex-row gap-5 mt-4">
          <button 
            onClick={startGame}
            className="py-4 px-10 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white text-xl font-medium transition-colors flex items-center gap-3 shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Begin Investigation</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          <button 
            onClick={goToCharacters}
            className="py-4 px-10 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            Character Profiles
          </button>
        </div>
        
        {/* Game features with better cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-900 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-medium text-indigo-300">5 Hours</h3>
            </div>
            <p className="text-gray-400">Solve the mystery before time runs out and the trail goes cold</p>
          </div>
          
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-900 rounded-lg">
                <Database className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-medium text-indigo-300">SQL Queries</h3>
            </div>
            <p className="text-gray-400">Use your database skills to uncover hidden clues and connections</p>
          </div>
          
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-900 rounded-lg">
                <GitBranch className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-medium text-indigo-300">Multiple Paths</h3>
            </div>
            <p className="text-gray-400">Each decision leads to different story branches and outcomes</p>
          </div>
        </div>
        
        {/* Footer element */}
        <div className="mt-20 text-center text-gray-500">
          <p>Unmask the culprit. Recover the score. Restore the harmony.</p>
        </div>
      </div>
    </div>
  );
}