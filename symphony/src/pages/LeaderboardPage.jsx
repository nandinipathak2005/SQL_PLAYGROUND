/*import { useEffect, useState } from 'react';
//import { fetchLeaderboard } from '../api/auth';
import { fetchLeaderboard } from '../api';

const LeaderboardPage = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        fetchLeaderboard().then(setLeaders).catch(console.error);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-indigo-700">Leaderboard</h1>
            <ul className="bg-white rounded-lg shadow divide-y">
                {leaders.map((user, idx) => (
                    <li key={idx} className="p-3 flex justify-between">
                        <span>{idx + 1}. {user.username}</span>
                        <span>{user.coins} 🪙</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardPage;
*/
import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { fetchLeaderboard } from '../api'; //  Use your actual API - adjusted path

const LeaderboardPage = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeaderboard = async () => {
            setLoading(true);
            try {
                //  Replace mockData with your actual API call
                const data = await fetchLeaderboard();
                setLeaders(data);
            } catch (err) {
                setError(err.message || 'Failed to load leaderboard.');
            } finally {
                setLoading(false);
            }
        };
        getLeaderboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                Loading Leaderboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">
                Error: {error}
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-indigo-300 text-center flex items-center justify-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    Leaderboard
                </h1>
                <div className="bg-gray-900 bg-opacity-80 rounded-xl shadow-lg border border-gray-800">
                    <ul className="divide-y divide-gray-700">
                        {leaders.map((user, idx) => (
                            <li key={idx} className="p-4 flex justify-between items-center hover:bg-gray-800 transition-colors">
                                <span className="flex items-center gap-3">
                                    <span className="text-xl font-semibold text-white">{idx + 1}.</span>
                                    <span className="text-lg text-indigo-300">{user.username}</span>
                                </span>
                                <span className="text-lg font-medium text-yellow-400 flex items-center gap-1">
                                    {user.coins} <Trophy className="w-5 h-5 inline-block" />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
