/*import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate('/');
        } else {
            setUser(storedUser);
        }
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">Your Profile</h1>
                <p className="text-gray-600 mb-6">Welcome back, detective!</p>

                <div className="text-left space-y-4">
                    <div>
                        <span className="font-semibold text-gray-800">Username:</span>
                        <span className="ml-2">{user.username}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">User ID:</span>
                        <span className="ml-2">{user.userId}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-800">Coins:</span>
                        <span className="ml-2">{user.coins}</span>
                    </div>
                </div>

                <button
                    className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-500"
                    onClick={() => navigate('/dashboard')}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Trophy } from 'lucide-react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate('/');
        } else {
            setUser(storedUser);
        }
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-start">
                <h1 className="text-4xl font-bold mb-8 text-indigo-300 text-center flex items-center justify-center gap-3">
                    <UserCircle className="w-8 h-8 text-indigo-400" />
                    Your Profile
                </h1>
                <div className="bg-gray-900 bg-opacity-80 rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-800">
                    <p className="text-gray-400 mb-6 text-center">Welcome, detective!</p>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-300">Username:</span>
                            <span className="text-white">{user.username}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-300">User ID:</span>
                            <span className="text-white">{user.userId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-300">Coins:</span>
                            <span className="text-yellow-400 flex items-center gap-1">
                                {user.coins} <Trophy className="w-5 h-5 inline-block" />
                            </span>
                        </div>
                    </div>

                    <button
                        className="mt-8 bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg w-full transition-colors"
                        onClick={() => navigate('/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

