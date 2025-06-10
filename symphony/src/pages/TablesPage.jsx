import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, HelpCircle } from 'lucide-react';
import vaultAccessImage from '../assets/vault_access_logs.png';
import securityLogsImage from '../assets/security_logs.png';
import backstageMovementsImage from '../assets/backstage_movements.png';
import personnelImage from '../assets/Personnel.png';
import deviceRegistryImage from '../assets/device_registry.png';


const TablesPage = () => {
    const navigate = useNavigate();
    const [showInstructions, setShowInstructions] = useState(false);

    const handleInstructionsHover = () => setShowInstructions(true);
    const handleInstructionsLeave = () => setShowInstructions(false);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background elements (same as Dashboard) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900 rounded-full opacity-20 blur-xl"></div>
            <div
                className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/api/placeholder/1200/800')",
                    backgroundBlendMode: "overlay",
                }}
            />

            {/* Main content for Tables page */}
            <div className="relative z-10 container mx-auto px-4 pt-8 pb-16">
                <div
                    className="absolute top-4 right-4 z-20"
                    onMouseEnter={handleInstructionsHover}
                    onMouseLeave={handleInstructionsLeave}

                >
                    <HelpCircle className="w-6 h-6 text-gray-400 cursor-pointer" />

                </div>

                {showInstructions && (
                    <div className="absolute top-12 right-4 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg p-4 w-64 text-sm z-50">
                        <h6 className="font-semibold text-white mb-2">Game Instructions</h6>
                        <p className="text-gray-400 mb-1">Select a case to begin your investigation.</p>
                        <p className="text-gray-400 mb-1">Follow the clues and use SQL queries to solve the mystery.</p>
                        <p className="text-gray-400">Solve the case before the time runs out to earn more coins!</p>
                    </div>
                )}
                <div className="w-full flex items-center mb-8 px-4">
                    <div className="flex items-center gap-2" onClick={() => navigate('/')}>
                        <Music className="w-6 h-6 text-indigo-400 cursor-pointer" />
                        <span className="text-lg font-medium text-indigo-300 cursor-pointer">The Fatal Query</span>
                    </div>


                </div>
                <h1 className="text-4xl font-bold mb-8 text-indigo-300 text-center">Database Tables</h1>
                <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Your Mission</h2>
                    <p className="text-gray-400 mb-4">
                        As the lead investigator, your task is to delve into the database records to reconstruct the events
                        surrounding a high-profile incident.  Use your SQL skills to analyze the provided tables.
                    </p>
                    <h3 className="text-xl font-semibold mt-6 mb-2 text-white">🎯 Your immediate goals:</h3>
                    <ul className="list-disc list-inside text-gray-400">
                        <li>
                            <span className="font-semibold text-indigo-300">Unmask the Vault Intruder:</span> Determine precisely who accessed the vault
                            and the exact sequence of their entries and exits within the critical timeframe.
                        </li>
                        <li>
                            <span className="font-semibold text-indigo-300">Restore the Corrupted Vision:</span> Identify the individual responsible
                            for tampering with the security footage and discern their potential motive for obscuring the
                            truth.
                        </li>
                        <li>
                            <span className="font-semibold text-indigo-300">Trace the Backstage Phantom:</span> Uncover the identity and purpose of the
                            enigmatic individual logged as "P1100" within the backstage area during a suspicious hour.
                        </li>
                    </ul>
                    <p className="text-gray-400 mt-4">
                        Examine the tables below to gather the information you need. Good luck, detective.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Placeholder images for the SQL tables.  Replace these with actual images or,  better,  use a library to render tables */}
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-lg font-semibold mb-2 text-white">Table: vault_access_logs</h3>
                       <img src={vaultAccessImage} alt="vault_access_logs" className="w-full rounded-md" />
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-lg font-semibold mb-2 text-white">Table: security_footage</h3>
                       <img src={securityLogsImage} alt="security_logs" className="w-full rounded-md" />
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-lg font-semibold mb-2 text-white">Table: backstage_logs</h3>
                       <img src={backstageMovementsImage} alt="backstage_movements" className="w-full rounded-md" />
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-lg font-semibold mb-2 text-white">Table: employees</h3>
                        <img src={personnelImage} alt="personnel" className="w-full rounded-md" />
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <h3 className="text-lg font-semibold mb-2 text-white">Table:device_registry</h3>
                        <img src={deviceRegistryImage} alt="device_registry" className="w-full rounded-md" />
                    </div>
                </div>
                <button onClick={() => navigate('/dashboard')} className="mt-8 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default TablesPage;
