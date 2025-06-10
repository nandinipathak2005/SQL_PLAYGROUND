module.exports = {
  '1': {
    title: 'Puzzle 1 – Who accessed the vault last?',
    story: 'The hushed grandeur...',
    clue: 'The clock struck noon, then two. Three people went in, but one came back real quick. Who was the one who went in twice?'
,
    queries: [
      { text : "SELECT person_id, COUNT(*) AS access_count FROM vault_access_logs WHERE access_time BETWEEN '2025-04-29 12:00:00' AND '2025-04-29 14:00:00' GROUP BY person_id ORDER BY access_count DESC;" },
      { text: "SELECT * FROM vault_access_logs WHERE method = 'biometric';" },
      { text: "SELECT * FROM vault_access_logs WHERE access_time > '2025-04-29 14:00:00';" },
    ],
    // Define expected results in queryController
  },
  '2': {
    title: 'Puzzle 2 – Who corrupted the footage?',
    story: 'As you review the corrupted security footage...',
    riddle: 'The camera stopped working. Someone close by did it. Who was near when the screen went black?',
    options: [
      // ... riddle options
    ],
    queries: [
      { text: "SELECT p.name, sl.event_type, dr.location FROM security_logs sl JOIN device_registry dr ON sl.terminal_id = dr.terminal_id JOIN personnel p ON p.person_id = 'P1033' WHERE sl.event_type = 'footage corrupted';" },
      { text: "SELECT * FROM security_logs WHERE event_type = 'login';" },
      { text: "SELECT * FROM device_registry dr JOIN security_logs sl ON dr.terminal_id = sl.terminal_id WHERE dr.location = 'Main Lobby' AND sl.event_type = 'footage corrupted';" },
    ],
    // Define expected results in queryController
  },
  '3': {
    title: 'Puzzle 3 – Who was backstage with the unknown entity?',
    story: 'The mysterious P1100...',
    clue: "A person who's not on our list was backstage. They left a mark in the computer. Who was with this mystery person?",
    queries: [
      { id: 1, text: "SELECT bm.*, p.name FROM backstage_movements bm LEFT JOIN personnel p ON bm.person_id = p.person_id WHERE bm.person_id = 'P1100';" }, // Correct
      { id: 2, text: "SELECT * FROM backstage_movements WHERE room_id = 'R-01';" }, // Incorrect
      { id: 3, text: "SELECT p.name, bm.room_id, bm.time_in FROM backstage_movements bm JOIN personnel p ON bm.person_id = p.person_id WHERE bm.room_id = 'R-03' ORDER BY bm.time_in DESC;" }, // Misleading - Archivist
      { id: 4, text: "SELECT p.name, dr.location FROM personnel p JOIN device_registry dr ON p.person_id = SUBSTR(dr.assigned_to, 1, 5) WHERE dr.location LIKE '%Backstage%';" }, // Misleading - Technician
    ],
     
  },
  // 'final': {
  //   title: '🎼 Final Puzzle – Riddle Lock on Symphony Database',
  //   riddle: '“Where time meets tone, the key is in the fifth.”',
  //   clue: 'Clue from Grace’s journal: “Maestro Veil believed in C minor and timestamp ciphers.”',
  //   queries: [
  //     { text: "SELECT * FROM hidden_symphony WHERE key_signature = 'C minor' AND SUBSTRING(note_time, 6, 2) = '05';" },
  //   ],
  //   // Define expected results in queryController
  // },
};
