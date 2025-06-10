
import { useState } from 'react';
import { login, signup } from '../api';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import dbmspic from '../assets/dbmspic.webp';
// then use: backgroundImage: `linear-gradient(...), url(${bgImage})`

const LoginPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (username, password) => {
        try {
            const res = isSignup ? await signup(username, password) : await login(username, password);
            /*localStorage.setItem('userId', res.userId);
            localStorage.setItem('coins', res.coins);*/
            localStorage.setItem('user', JSON.stringify({
                userId: res.userId,
                coins: res.coins,
                username: username || `User${res.userId}`
            }));

            navigate('/dashboard');
        } catch (err) {
            // setError(err.message);
            setError('Login failed');
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                    url(${dbmspic})`,
            }}
        >
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <h1 className="text-4xl font-extrabold text-red-800 mb-2 drop-shadow">The Stolen Symphony</h1>
                <p className="text-md text-gray-700 font-medium mb-6">
                    Query the Clues. Crack the Riddles. Beat the Clock. Nab the Killer.
                </p>

                {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

                <AuthForm onSubmit={handleAuth} isSignup={isSignup} />

                <button
                    className="mt-4 text-sm text-red-700 hover:underline font-semibold"
                    onClick={() => setIsSignup((prev) => !prev)}
                >
                    {isSignup
                        ? 'Already have an account? Login'
                        : "Don't have an account? Sign up"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
