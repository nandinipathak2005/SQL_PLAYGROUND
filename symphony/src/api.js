export const fetchCharacters = async () => {
  const res = await fetch('http://localhost:3001/api/characters');
  if (!res.ok) throw new Error('Failed to fetch characters');
  return await res.json();
};

// export const fetchPuzzle = async (puzzleId) => {
//   const res = await fetch(`/api/puzzles/${puzzleId}`);
//   if (!res.ok) throw new Error('Failed to fetch puzzle');
//   return await res.json();
// };

export const fetchPuzzle = async (puzzleId) => {
  const res = await fetch(`http://localhost:3001/api/puzzles/${puzzleId}`);
  if (!res.ok) throw new Error('Failed to fetch puzzle');
  return await res.json();
};
export const fetchPuzzleStage2 = async (puzzleId) => {
  const res = await fetch(`http://localhost:3001/api/puzzles2/${puzzleId}`);
  if (!res.ok) throw new Error('Failed to fetch puzzle');
  return await res.json();
};

export const fetchBranch = async (branchId) => {
  const res = await fetch(`http://localhost:3001/api/puzzles/branch/${branchId}`);
  if (!res.ok) throw new Error('Failed to fetch branch');
  return await res.json();
};

export const fetchBranchStage2 = async (branchId) => {
  const res = await fetch(`http://localhost:3001/api/puzzles2/branch/${branchId}`);
  if (!res.ok) throw new Error('Failed to fetch branch');
  return await res.json();
};

// export const executeQuery = async (query, currentPuzzle) => {
//   const res = await fetch('http://localhost:3001/api/query/execute', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ query, currentPuzzle }),
//   });
//   if (!res.ok) throw new Error('Failed to execute query');
//   return await res.json();
// };
// export const executeQuery = async (query, currentPuzzle) => {
//   const res = await fetch('http://localhost:3001/api/query/execute', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     // body: JSON.stringify({ query, currentPuzzle }),
//     body: JSON.stringify({
//       query,
//       currentPuzzle: Number(currentPuzzle), // ✅ force it to number
//     }),
//   });
//   if (!res.ok) throw new Error('Failed to execute query');
//   return await res.json();
// };





//const userId = localStorage.getItem('userId'); // Assuming the userId was stored as 'userId'

// Check if userId exists
/*if (!userId) {
  console.error("User is not logged in or userId is not in localStorage");
  // Handle this case as needed (e.g., redirect to login page)
}*/

/*export const executeQuery = async (query, payload) => {
  const res = await fetch('http://localhost:3001/api/query/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      currentPuzzle: Number(payload?.puzzleId), // Access puzzleId from the payload
      currentBranch: payload?.currentBranch,   // Access currentBranch from the payload
      userId: userId
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to execute query');
  }
  const data = await res.json();

  if (data.updatedCoins !== undefined && user) {
    user.coins = data.updatedCoins;
    localStorage.setItem('user', JSON.stringify(user));
  }
  return data;
};*/
export const executeQuery = async (query, payload) => {
  const userId = localStorage.getItem('userId'); // Optional fallback
  const user = JSON.parse(localStorage.getItem('user')); // ✅ Now defined

  if (!userId && !user) {
    console.error("User is not logged in or user info is missing in localStorage");
    throw new Error("User not logged in");
  }

  const res = await fetch('http://localhost:3001/api/query/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      currentPuzzle: Number(payload?.puzzleId),
      currentBranch: payload?.currentBranch,
      userId: user?.userId || userId
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to execute query');
  }

  const data = await res.json();

  if (data.updatedCoins !== undefined && user) {
    user.coins = data.updatedCoins;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return data;
};



export const executeQuery2 = async (query, payload) => {
  const userId = localStorage.getItem('userId'); // Optional fallback
  const user = JSON.parse(localStorage.getItem('user'));

  if (!userId && !user) {
    console.error("User is not logged in or user info is missing in localStorage");
    throw new Error("User not logged in");
  }
  const res = await fetch('http://localhost:3001/api/query2/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      currentPuzzle: Number(payload?.puzzleId), // Access puzzleId from the payload
      currentBranch: payload?.currentBranch,   // Access currentBranch from the payload
      userId: user?.userId || userId
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to execute query');
  }
  const data = await res.json();

  if (data.updatedCoins !== undefined && user) {
    user.coins = data.updatedCoins;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return data;
};
export const updatePuzzle = async (puzzleId) => {

  return Promise.resolve();
};

const API_BASE = 'http://localhost:3001/api/auth';

export const login = async (username, password) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};

export const signup = async (username, password) => {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Signup failed');
  return await res.json();
};

export const fetchLeaderboard = async () => {
  const res = await fetch(`${API_BASE}/leaderboard`);
  if (!res.ok) throw new Error('Failed to load leaderboard');
  return await res.json();
};

export const fetchUserData = async (userId) => {
  const res = await fetch(`${API_BASE}/users/${userId}`); // Corrected route
  if (!res.ok) {
    throw new Error(`Failed to fetch user data: ${res.status}`);
  }
  return await res.json();
};