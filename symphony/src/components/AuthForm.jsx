import { useState } from 'react';

const AuthForm = ({ onSubmit, isSignup = false }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(username, password);
            }}
            className="flex flex-col gap-4 w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow"
        >
            <h2 className="text-2xl font-bold text-center">
                {isSignup ? 'Sign Up' : 'Login'} to <span className="text-indigo-700">The Stolen Symphony</span>
            </h2>
            <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className="bg-indigo-700 text-white p-2 rounded hover:bg-indigo-600 transition">
                {isSignup ? 'Sign Up' : 'Login'}
            </button>
        </form>
    );
};

export default AuthForm;
