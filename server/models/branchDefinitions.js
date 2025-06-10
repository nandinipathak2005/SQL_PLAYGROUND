module.exports = {
    '1-forgery': {
      outcome: 'The system reveals one suspicious forged entry...',
      branchEnding: "Looking closely at the access logs, you notice an entry that seems out of place. The timestamp is unusually late, and the person listed... well, they weren't supposed to be on duty at that hour. Could this be a deliberate attempt to muddy the waters?",
      riddle: 'Which SQL operator is crucial for combining data from the vault_access_logs and personnel tables...',
      options: [
        { id: 'a', text: 'WHERE' },
        { id: 'b', text: 'GROUP BY' },
        { id: 'c', text: 'JOIN', correct: true, resultText: 'Correct! JOIN combines rows from two or more tables...' },
        { id: 'd', text: 'ORDER BY' },
      ],
      branchQueries: [
        { text: "SELECT vl.person_id, p.name, vl.access_time FROM vault_access_logs vl JOIN personnel p ON vl.person_id = p.person_id WHERE vl.access_time BETWEEN '2025-04-29 12:00:00' AND '2025-04-29 14:00:00' ORDER BY vl.access_time;" },
        { text: "SELECT * FROM vault_access_logs ORDER BY access_time DESC LIMIT 2;" },
        { text: "SELECT p.name, COUNT(vl.access_id) AS access_count FROM vault_access_logs vl JOIN personnel p ON vl.person_id = p.person_id GROUP BY p.name ORDER BY access_count DESC;" },
      ],
      // Define expected results in queryController
    },
    '2-stage-left': {
      outcome: 'No direct results from this query. However, you recall Marcus Bell was near the Main Lobby...',
      branchEnding: "Even though the immediate query didn't reveal the double-entry, something about the timing feels significant. You remember seeing Marcus Bell pacing near the Main Lobby around the time the vault activity occurred. Could his presence nearby be connected to someone entering the vault twice?",
      riddle: 'Which SQL function would you use to extract the time part from the timestamp column...',
      options: [
        { id: 'a', text: 'DATE()' },
        { id: 'b', text: 'TIME()', correct: true, resultText: 'Correct! TIME() extracts the time part...' },
        { id: 'c', text: 'SUBSTRING()' },
        { id: 'd', text: 'DATETIME()' },
      ],
      branchQueries: [
        { text: "SELECT p.name, TIME(sl.timestamp) AS corruption_time FROM security_logs sl JOIN device_registry dr ON sl.terminal_id = dr.terminal_id JOIN personnel p ON p.person_id = 'P1067' WHERE sl.event_type = 'footage corrupted';" },
        { text: "SELECT * FROM security_logs ORDER BY timestamp DESC;" },
        { text: "SELECT dr.location, COUNT(*) FROM security_logs sl JOIN device_registry dr ON sl.terminal_id = dr.terminal_id GROUP BY dr.location;" },
      ],
      // Define expected results in queryController
    },
    '3-archivist': {
      outcome: '| name | room_id | time_in |...',
      branchEnding: "The initial logs show three entries around the critical time. However, one person seems to have entered and exited very quickly. Could this quick in-and-out be the first part of a double entry? Perhaps looking at backstage movements might reveal someone doubling back.",
      riddle: 'Which SQL clause would you use to find the first person who entered any backstage room after 13:00?',
      options: [
        { id: 'a', text: 'ORDER BY time_in ASC LIMIT 1', correct: true, resultText: 'Correct! ORDER BY with LIMIT 1...' },
        { id: 'b', text: "WHERE time_in > '2025-04-29 13:00:00'" },
        { id: 'c', text: 'SELECT MIN(time_in)' },
        { id: 'd', text: 'GROUP BY person_id' },
      ],
      branchQueries: [
        { text: "SELECT p.name, bm.room_id, bm.time_in FROM backstage_movements bm JOIN personnel p ON bm.person_id = p.person_id WHERE bm.time_in > '2025-04-29 13:00:00' ORDER BY bm.time_in ASC LIMIT 1;" },
        { text: "SELECT DISTINCT person_id FROM backstage_movements WHERE room_id = 'R-03';" },
        { text: "SELECT AVG(JULIANDAY(time_out) - JULIANDAY(time_in)) FROM backstage_movements;" },
      ],
      // Define expected results in queryController
    },
    '3-technician': {
      outcome: '| name | location |...',
      branchEnding: "The timing of the vault access is crucial. The main riddle mentions 'noon, then two'. Could there be a connection to specific times recorded in other systems? Perhaps checking technical logs around those hours might reveal unusual activity or someone trying to manipulate systems around the vault.",
      riddle: 'Which SQL clause is used to specify conditions that rows must satisfy to be selected?',
      options: [
        { id: 'a', text: 'SELECT' },
        { id: 'b', text: 'FROM' },
        { id: 'c', text: 'WHERE', correct: true, resultText: 'Correct! WHERE clause filters rows...' },
        { id: 'd', text: 'GROUP BY' },
      ],
      branchQueries: [
        { text: "SELECT sl.event_type, sl.timestamp FROM security_logs sl JOIN device_registry dr ON sl.terminal_id = dr.terminal_id WHERE dr.location LIKE '%Backstage%' AND sl.timestamp BETWEEN '2025-04-29 13:00:00' AND '2025-04-29 14:00:00';" },
        { text: "SELECT COUNT(*) FROM device_registry WHERE location LIKE '%Backstage%';" },
        { text: "SELECT role, COUNT(*) FROM personnel GROUP BY role;" },
      ],
      // Define expected results in queryController
    },
  };