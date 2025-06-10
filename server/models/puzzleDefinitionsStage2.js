module.exports = {
  '1': {
    title: 'Puzzle 1 – Unraveling Initial Connections',
    story: 'Corbin examines his notes about staff connections, focusing on a symbol from the "Echoes of the Past" cutscene...',
    clue: 'My contact mentioned the Ordo Cantus might have connections within the staff. Look for any direct relationships listed.',
    queries: [
      { text: "SELECT sp1.name AS Staff_Member, sp2.name AS Related_To FROM staff_profiles sp1 JOIN staff_profiles sp2 ON sp1.related_to = sp2.staff_id WHERE sp1.related_to IS NOT NULL;" },
      { text: "SELECT name, position FROM staff_profiles ORDER BY position;" },
      { text: "SELECT name, note FROM staff_profiles WHERE note LIKE '%Ordo%';" },
      

    ],
    riddle: "Which SQL clause would most accurately revert the change to Amelia Grant's note, while preserving other potential data?",
    options: [
        "UPDATE staff_profiles SET note = 'Deep interest in Ordo Cantus.' WHERE name = 'Amelia Grant' AND note = 'Obsessed with the Ordo Cantus lineage';",
        "UPDATE staff_profiles SET note = 'Deep interest in Ordo Cantus.' WHERE name = 'Amelia Grant';",
        "UPDATE staff_profiles SET note = 'Deep interest in Ordo Cantus.' WHERE staff_id = (SELECT staff_id FROM staff_profiles WHERE name = 'Amelia Grant');",
        "UPDATE staff_profiles SET note = 'Deep interest in Ordo Cantus.' WHERE name LIKE 'Amelia%';"
    ]
  },
  '2': {
    title: 'Puzzle 2 – Deciphering Cryptic Communications',
    story: 'Corbin analyzes "Aria II" and cross-references it with staff communications...',
    clue: 'The encrypted file mentions "Aria II." Corbin recalls the staff communications, hoping for a link.',
    queries: [
      { text: "SELECT sender_phone, receiver_phone, message, timestamp FROM communication_logs WHERE message LIKE '%aria%' OR message LIKE '%code%' OR message LIKE '%ledger%';"},
      { text: "SELECT * FROM communication_logs ORDER BY timestamp ASC LIMIT 3;" },
      // { text: "UPDATE room_bookings SET end_time = '2025-04-25 16:00:00' WHERE staff_id = 'S005' AND room_id = 'RB03'; SELECT * FROM room_bookings WHERE staff_id = 'S005';" },
        { text: "SELECT rb.room, sp.name, rb.start_time FROM room_bookings rb JOIN staff_profiles sp ON rb.staff_id = sp.staff_id WHERE rb.room = 'Archive Vault';" },


    ],
    riddle: "Which of the following datatype is most appropriate for storing a string of up to 255 characters?",
     options: [
        { id: 'a', text: 'TEXT' },
        { id: 'b', text: 'TINY TEXT', correct: true, resultText: 'Correct! ' },
        { id: 'c', text: 'BLOB' },
        { id: 'd', text: 'None of the above' },
      ],
  },
  '3': {
    title: '🎼 Final Puzzle – Unlocking ordo_files and Stage Completion',
    story: 'Corbin pores over the cryptic file, the musical terms resonating with the staff roles...',
    clue: 'The "Aria II" file hints at a riddle involving staff positions. The riddle is: "The four tones of the Ordo sing secrets. Only together do they unlock the truth."',
    queries: [
      { text: "SELECT name, position FROM staff_profiles WHERE position IN ('Music Theorist', 'Archivist', 'Patron Donor', 'Janitorial Lead');" },
      { text: "SELECT * FROM staff_profiles WHERE related_to IS NOT NULL;" },
      { text: "SELECT name FROM staff_profiles ORDER BY name DESC;" },
    ],
    riddle: "Based on your investigation in Stage 2, who do you believe is the most likely culprit behind the theft of the symphony? Choose one:",
    options: [
        "Amelia Grant",
        "Victor Crane",
        "Leo Voss",
        "Sylvia Markov",
        "Aiden Crane"
    ]
  },
};
