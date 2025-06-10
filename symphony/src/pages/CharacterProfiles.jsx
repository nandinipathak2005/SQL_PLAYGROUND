/*import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { fetchCharacters } from '../api';
import Grace from '../assets/Grace.png';
import Lydia from '../assets/Lydia.png';
import Marcus from '../assets/Marcus.png';
import Axel from '../assets/Axel.png';
import Unkown from '../assets/Unknown.png';
export default function CharacterProfiles() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (err) {
        setError(err.message || 'Failed to load characters.');
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  const filteredCharacters = characters.filter(
    (char) =>
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/home0" className="flex items-center text-indigo-300 hover:text-indigo-200 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="w-6 h-6 mr-3 text-indigo-400" />
            Character Profiles
          </h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search characters..."
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.person_id}
                character={character}
                isSelected={selectedCharacter?.person_id === character.person_id}
                onClick={() => setSelectedCharacter(character)}
              />
            ))}
          </div>
          <div className="md:w-1/2 bg-gray-800 rounded-lg p-6 border border-gray-700 min-h-[500px]">
            {selectedCharacter ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500">
                    <img
                      src={`/api/placeholder/300/300?name=${selectedCharacter.name}`}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCharacter.name}</h2>
                    <p className="text-indigo-300">{selectedCharacter.role}</p>
                    <p className="text-gray-400 text-sm">ID: {selectedCharacter.person_id}</p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-indigo-300 mb-2">Notes</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedCharacter.notes}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <Users className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400">Select a character to view their profile</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}*/
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { fetchCharacters } from '../api';

import Lydia from '../assets/Lydia.png';
import Axel from '../assets/Axel.png';
import Marcus from '../assets/Marcus.png';
import Grace from '../assets/Grace.png';
import Unknown from '../assets/Unknown.png';

const images = {
  'Lydia Crane': Lydia,
  'Axel Borne': Axel,
  'Marcus Bell': Marcus,
  'Grace Tanaka': Grace
};


export default function CharacterProfiles() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (err) {
        setError(err.message || 'Failed to load characters.');
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    char.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/home0"
            className="flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="w-6 h-6 mr-3 text-indigo-400" />
            Character Profiles
          </h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search characters..."
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Character Cards */}
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.person_id}
                character={character}
                isSelected={selectedCharacter?.person_id === character.person_id}
                onClick={() => setSelectedCharacter(character)}
              />
            ))}
          </div>

          {/* Right Side: Selected Character Details */}
          <div className="md:w-1/2 bg-gray-800 rounded-lg p-6 border border-gray-700 min-h-[500px]">
            {selectedCharacter ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500">
                    <img
                      src={images[selectedCharacter.name] || Unknown}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover"
                    />

                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCharacter.name}</h2>
                    <p className="text-indigo-300">{selectedCharacter.role}</p>
                    <p className="text-gray-400 text-sm">ID: {selectedCharacter.person_id}</p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-indigo-300 mb-2">Notes</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedCharacter.notes}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <Users className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400">Select a character to view their profile</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


