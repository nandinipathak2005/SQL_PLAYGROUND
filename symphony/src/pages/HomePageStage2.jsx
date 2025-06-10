import { useState, useEffect } from 'react';
import { Music, FileText, ChevronRight, Volume2, Clock, Database, GitBranch, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => setIsAudioPlaying(!isAudioPlaying);

  const startGame = () => {
    navigate('/puzzle/1/stage2'); // Or whichever puzzle is the starting point for Stage 2
  };
   const goToCharacters = () => {
    navigate('/characters2');
  };


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
          backgroundImage: "url('/api/placeholder/1200/800')", // Replace with a more fitting image
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

        {/* Game title with updated styling */}
        <div className="mt-8 mb-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-white">
            <span className="text-indigo-300">STAGE 2:</span>
          </h1>
          <h2 className="text-6xl md:text-8xl font-serif italic mt-2 tracking-tight text-purple-300">
            The Conservatory of Secrets
          </h2>
          <div className="flex justify-center items-center mt-6 space-x-4">
            <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
            <span className="text-xl font-light text-gray-300">A Detective Miles Corbin Mystery</span>
            <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
          </div>
        </div>

        {/* Game description updated for Stage 2 */}
        <div className="max-w-2xl bg-gray-900 bg-opacity-80 p-8 rounded-xl border border-indigo-800 mb-12 shadow-xl">
          <p className="text-lg mb-6 text-gray-200">
            The morning after the backstage incident, Detective Corbin stands within the grand Harmonia National Conservatory. Sunlight filters through arched windows, illuminating hushed whispers among the staff. The air is thick with anxiety and intrigue.
          </p>
          <p className="text-lg mb-6 text-gray-200">
            A new encrypted file, "Aria II," appears on his device – a baffling mix of musical notation and arcane symbols. A message from his contact: "The Ordo Cantus… they might have a hidden archive within the Conservatory. Accessible through a code. We suspect the key lies within the staff and their recent communications."
          </p>
          <p className="text-lg mb-6 text-gray-200">
            You have five critical in-game hours to unravel the secrets of the Conservatory. Incorrect queries will cost you 30 minutes. Misleading queries will open alternative story branches, leading to potential dead ends and concealed truths.
          </p>
          <div className="flex items-center text-indigo-300 text-sm mt-8 border-t border-indigo-900 pt-6">
            <KeyRound className="w-4 h-4 mr-2" />
            <span>Unravel the secrets hidden within the Conservatory walls.</span>
          </div>
        </div>

        {/* Action buttons updated for Stage 2 */}
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

        {/* Game features with updated cards for Stage 2 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-900 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-medium text-indigo-300">5 Hours</h3>
            </div>
            <p className="text-gray-400">Race against time to uncover the truth within the Conservatory.</p>
          </div>

          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-900 rounded-lg">
                <Database className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-medium text-indigo-300">SQL Queries</h3>
            </div>
            <p className="text-gray-400">
              Use SQL to investigate the staff, their connections, and the secrets they guard.
            </p>
          </div>

          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-900 rounded-lg">
                <GitBranch className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-medium text-indigo-300">Multiple Paths</h3>
            </div>
            <p className="text-gray-400">
              Your choices and query accuracy will determine the path you take through the Conservatory's mysteries.
            </p>
          </div>
        </div>

        {/* Footer element */}
        <div className="mt-20 text-center text-gray-500">
          <p>Decipher the code. Navigate the shadows. Uncover the Conservatory's secrets.</p>
        </div>
      </div>
    </div>
  );
}
