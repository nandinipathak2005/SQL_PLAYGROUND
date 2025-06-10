// module.exports = {
//   '1-archivist': {
//     outcome: "The results highlight Amelia Grant's intense interest in the Ordo Cantus, a potential rabbit hole for the investigation.",
//     branchEnding: "Amelia's deep fascination with the Ordo Cantus now casts a long shadow, making her a prime suspect in Corbin's mind. The investigation pivots towards the secrets held within the archives.",
//     riddle: "Which SQL clause would you use to modify Amelia Grant's note to add 'and their symbols'?",
//     options: [
//       { id: 'a', text: 'SELECT' },
//       { id: 'b', text: 'WHERE' },
//       { id: 'c', text: 'UPDATE', correct: true, resultText: 'Correct! UPDATE modifies existing data.' },
//       { id: 'd', text: 'ALTER TABLE' },
//     ],
//     branchQueries: [
//       { text: "UPDATE staff_profiles SET note = 'Deep interest in Ordo Cantus and their symbols' WHERE name = 'Amelia Grant'; SELECT name, note FROM staff_profiles WHERE name = 'Amelia Grant';" },
//       { text: "SELECT * FROM staff_profiles ORDER BY name DESC LIMIT 1;" },
//       { text: "ALTER TABLE staff_profiles ADD COLUMN ordo_interest BOOLEAN; SELECT name, ordo_interest FROM staff_profiles WHERE name = 'Amelia Grant';" },
//     ],
//   },
//   '2-vault-secrets': {
//     outcome: "The query confirms Amelia Grant's frequent bookings of the Archive Vault, strengthening the suspicion around her.",
//     branchEnding: "The Archive Vault, and Amelia Grant's connection to it, becomes the central point of investigation. The 'code' and 'ledger' are now believed to be hidden within its depths.",
//     riddle: "Which SQL function would you use to extract the date part from the start_time column in room_bookings?",
//     options: [
//       { id: 'a', text: 'TIME()' },
//       { id: 'b', text: 'SUBSTR()' },
//       { id: 'c', text: 'DATE()', correct: true, resultText: 'Correct! DATE() extracts the date part.' },
//       { id: 'd', text: 'YEAR()' },
//     ],
//     branchQueries: [
//       { text: "SELECT sp.name, DATE(rb.start_time) AS booking_date FROM room_bookings rb JOIN staff_profiles sp ON rb.staff_id = sp.staff_id WHERE rb.room = 'Archive Vault';" },
//       { text: "SELECT * FROM room_bookings WHERE staff_id = 'S002';" },
//       { text: " SELECT AVG(TIMESTAMPDIFF(SECOND, start_time, end_time) / (60 * 60 * 24)) FROM room_bookings;" },
//     ],
//   },
//   '3-order-of-names': {
//     outcome: "The alphabetical order of names seems arbitrary, a potential red herring.",
//     branchEnding: "The seemingly random order of names becomes the focus, a potential hidden code that Corbin struggles to decipher.",
//     riddle: "Which of the following datatype is most appropriate for storing a string of up to 255 characters?",
//     options: [
//       { id: 'a', text: 'TEXT' },
//       { id: 'b', text: 'BLOB' },
//       { id: 'c', text: 'TINY TEXT', correct: true, resultText: 'Correct! TINY TEXT can contain a string of up to 255 characters or 255 bytes.' },
//       { id: 'd', text: 'BINARY' },
//     ],
//     branchQueries: [
//       { text: "SELECT note FROM ordo_files;" },
//       { text: "UPDATE ordo_files SET note = 'Deciphered';" },
//       { text: "DELETE FROM ordo_files WHERE code_name = 'aria_ii';" },
//     ],
//   },
// };
module.exports = {
  '1-archivist': {
    outcome: "The results highlight Amelia Grant's intense interest in the Ordo Cantus, a potential rabbit hole for the investigation.",
    branchEnding: "Amelia's deep fascination with the Ordo Cantus now casts a long shadow, making her a prime suspect in Corbin's mind. The investigation pivots towards the secrets held within the archives.",
    riddle: "Which SQL clause would you use to modify Amelia Grant's note to add 'and their symbols'?",
    options: [
      { id: 'a', text: 'SELECT' },
      { id: 'b', text: 'WHERE' },
      { id: 'c', text: 'UPDATE', correct: true, resultText: 'Correct! UPDATE modifies existing data.' },
      { id: 'd', text: 'ALTER TABLE' },
    ],
    branchQueries: [
      { text: "SELECT sp1.name AS StaffMemberName, sp2.name AS RelatedToName FROM staff_profiles sp1 JOIN staff_profiles sp2 ON sp1.related_to = sp2.staff_id WHERE sp1.staff_id = 'S002';" },
      { text: "SELECT * FROM staff_profiles ORDER BY name DESC LIMIT 1;" },
      { text: "SELECT name, note FROM staff_profiles WHERE staff_id LIKE 'S00%' LIMIT 1;" },
    ],
  },
  '2-vault-secrets': {
    outcome: "The query confirms Amelia Grant's frequent bookings of the Archive Vault, strengthening the suspicion around her.",
    branchEnding: "The Archive Vault, and Amelia Grant's connection to it, becomes the central point of investigation. The 'code' and 'ledger' are now believed to be hidden within its depths.",
    riddle: "Which SQL function would you use to extract the date part from the start_time column in room_bookings?",
    options: [
      { id: 'a', text: 'TIME()' },
      { id: 'b', text: 'SUBSTR()' },
      { id: 'c', text: 'DATE()', correct: true, resultText: 'Correct! DATE() extracts the date part.' },
      { id: 'd', text: 'YEAR()' },
    ],
    branchQueries: [
      { text: "SELECT sp.name, DATE(rb.start_time) AS booking_date FROM room_bookings rb JOIN staff_profiles sp ON rb.staff_id = sp.staff_id WHERE rb.room = 'Archive Vault';" },
      { text: "SELECT * FROM room_bookings WHERE staff_id = 'S002';" },
      { text: " SELECT AVG(TIMESTAMPDIFF(SECOND, start_time, end_time) / (60 * 60 * 24)) FROM room_bookings;" },
    ],
  },
  '3-order-of-names': {
    outcome: "The alphabetical order of names seems arbitrary, a potential red herring.",
    branchEnding: "The seemingly random order of names becomes the focus, a potential hidden code that Corbin struggles to decipher.",
    riddle: "Which of the following datatype is most appropriate for storing a string of up to 255 characters?",
    options: [
      { id: 'a', text: 'TEXT' },
      { id: 'b', text: 'BLOB' },
      { id: 'c', text: 'TINY TEXT', correct: true, resultText: 'Correct! TINY TEXT can contain a string of up to 255 characters or 255 bytes.' },
      { id: 'd', text: 'BINARY' },
    ],
    branchQueries: [
      { text: "SELECT note FROM ordo_files;" },
      { text: "UPDATE ordo_files SET note = 'Deciphered';" },
      { text: "DELETE FROM ordo_files WHERE code_name = 'aria_ii';" },
    ],
  },
};