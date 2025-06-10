/*import React from 'react';

function CharacterCard({ character, isSelected, onClick }) {
  return (
    <div
      className={`cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-indigo-900 border-indigo-400 shadow-lg shadow-indigo-900/50'
          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
      } border rounded-lg overflow-hidden`}
      onClick={onClick}
    >
      <div className="w-full h-48 bg-gray-900 relative overflow-hidden">
        <img
          src={`/api/placeholder/300/300?name=${character.name}`}
          alt={character.name}
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <p className="text-xs text-gray-400">ID: {character.person_id}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-medium text-white">{character.name}</h3>
        <p className="text-indigo-300 text-sm mb-2">{character.role}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
*/
import React from 'react';
import Unknown from '../assets/Unknown.png';
import Lydia from '../assets/Lydia.png';
import Axel from '../assets/Axel.png';
import Marcus from '../assets/Marcus.png';
import Grace from '../assets/Grace.png';

const images = {
  'Lydia Crane': Lydia,
  'Axel Borne': Axel,
  'Marcus Bell': Marcus,
  'Grace Tanaka': Grace
};

export default function CharacterCard({ character, isSelected, onClick }) {
  if (!character) return null;

  const imageSrc = images[character.name] || Unknown;

  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 border ${isSelected ? 'border-indigo-500' : 'border-gray-700'
        } cursor-pointer transition duration-200 hover:shadow-lg`}
      onClick={onClick}
    >
      <img
        src={imageSrc}
        alt={character.name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <p className="text-sm text-gray-400">ID: {character.person_id}</p>
      <h3 className="text-lg font-bold">{character.name}</h3>
      <p className="text-indigo-300">{character.role}</p>
    </div>
  );
}

