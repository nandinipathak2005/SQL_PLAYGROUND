// const { Sequelize } = require('sequelize');
// const db = require('../config/dbGame');

// const queryControllerStage2 = {
//     executeQuery: async (req, res) => {
//         const { query, currentPuzzle, currentBranch, queryId } = req.body;

//         let notebookUpdate;
//         let nextPuzzle;
//         let branchPath;
//         let timePenalty = 0;
//         let isCorrect = false;
//         let isMisleading = false;
//         let suspectQuestion = null;
//         let suspectOptions = null;

//         try {
//             const [results, metadata] = await db.query(query);
//             console.log('Query Results:', results);

//             // Stage 2 Logic
//             if (currentPuzzle === 1) {
//                 if (query.includes("FROM staff_profiles sp1") && query.includes("JOIN staff_profiles sp2") && query.includes("WHERE sp1.related_to IS NOT NULL")) {
//                     const victorAiden = results.find(row =>
//                         (row.Staff_Member === 'Victor Crane' && row.Related_To === 'Aiden Crane') ||
//                         (row.Staff_Member === 'Aiden Crane' && row.Related_To === 'Victor Crane')
//                     );
//                     if (victorAiden) {
//                         notebookUpdate = "Corbin jots down the connection: Victor Crane (S002) is related to Aiden Crane (S005). This familial tie warrants a closer look at their communications.";
//                         nextPuzzle = 2;
//                         isCorrect = true;
//                     }
//                 } else if (query.includes("SELECT name, position FROM staff_profiles ORDER BY position")) {
//                     timePenalty = 30;
//                     notebookUpdate = "The ordered list of staff positions offers no immediate insight into hidden relationships, wasting precious time.";
//                 } else if (query.includes("WHERE note LIKE '%Ordo%'")) {
//                     branchPath = '/puzzle/1/archivist/stage2';
//                     isMisleading = true;
//                     notebookUpdate = "The results highlight Amelia Grant's intense interest in the Ordo Cantus, a potential rabbit hole for the investigation.";
//                 } else if (query.includes("UPDATE staff_profiles") && query.includes("SET note") && query.includes("WHERE name = 'Amelia Grant'")) {
//                     notebookUpdate = "Corbin makes a mental note of Amelia's amplified interest, a thread to potentially unravel later, even if it deviates from the initial lead.";
//                 }
//                  else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 1. Please try again.";
//                 }
//             } else if (currentPuzzle === 1 && currentBranch === 'archivist') {
//                 if (query.includes("UPDATE staff_profiles") && query.includes("SET note") && query.includes("WHERE name = 'Amelia Grant'") && query.includes("'and their symbols'")) {
//                     notebookUpdate = "Corbin makes a mental note of Amelia's amplified interest, a thread to potentially unravel later, even if it deviates from the initial lead.";

//                 } else if (query.includes("ORDER BY name DESC LIMIT 1")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Focusing on the last name alphabetically provides no immediate connection to the Ordo Cantus.";
//                 } else if (query.includes("ALTER TABLE staff_profiles")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Corbin realizes altering the database structure isn't the immediate goal, a detour that consumes valuable time.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 1 (Archivist Branch). Please try again.";
//                 }

//             } else if (currentPuzzle === 2) {
//                 if (query.includes("FROM communication_logs") && query.includes("WHERE message LIKE") && (query.includes("'%aria%'") || query.includes("'%code%'") || query.includes("'%ledger%'"))) {
//                     const ariaMatch = results.find(row =>
//                         row.message.includes('aria') || row.message.includes('code') || row.message.includes('ledger')
//                     );
//                     if(ariaMatch){
//                         notebookUpdate = "Corbin highlights the cryptic message: Leo Voss and Amelia Grant discuss a 'ledger' and a 'code' related to an 'aria.' Their roles and access become critical.";
//                         nextPuzzle = 3;
//                         isCorrect = true;
//                     }

//                 } else if (query.includes("ORDER BY timestamp ASC LIMIT 3")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Reviewing the earliest messages yields no apparent connection to the 'Aria II' or the Ordo Cantus.";
//                 } else if (query.includes("WHERE rb.room = 'Archive Vault'")) {
//                     branchPath = '/puzzle/2/vault-secrets';
//                     isMisleading = true;
//                     notebookUpdate = "The query confirms Amelia Grant's frequent bookings of the Archive Vault, strengthening the suspicion around her.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 2. Please try again.";
//                 }
//             } else if (currentPuzzle === 2 && currentBranch === 'vault-secrets') {
//                  if (query.includes("SELECT sp.name, DATE(rb.start_time)")) {
//                     notebookUpdate = "Corbin notes the specific dates of Amelia's vault access, further solidifying the archive as a key location.";
//                 } else if (query.includes("WHERE staff_id = 'S002'")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Focusing on Victor Crane's bookings leads nowhere in the immediate search for the 'Aria II' clue.";
//                 } else if (query.includes("AVG(JULIANDAY(end_time) - JULIANDAY(start_time))")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Calculating average booking duration offers no insight into the current mystery.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 2 (Vault Branch). Please try again.";
//                 }

//             } else if (currentPuzzle === 3) {
//                 if (query.includes("WHERE position IN ('Music Theorist', 'Archivist', 'Patron Donor', 'Janitorial Lead')")) {
//                     const correctStaff = results.every(row =>
//                         ['Leo Voss', 'Amelia Grant', 'Victor Crane', 'Sylvia Markov'].includes(row.name)
//                     );
//                     if (correctStaff && results.length === 4) {
//                         notebookUpdate = "Corbin deciphers the riddle, the four staff members granting access to the hidden ordo_files.";
//                         nextPuzzle = 4;
//                         isCorrect = true;
//                     }
//                 } else if (query.includes("WHERE related_to IS NOT NULL")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Focusing on familial relationships doesn't align with the 'four tones' riddle.";
//                 } else if (query.includes("ORDER BY name DESC")) {
//                     branchPath = '/puzzle/3/order-of-names';
//                     isMisleading = true;
//                     notebookUpdate = "The alphabetical order of names seems arbitrary, a potential red herring.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 3. Please try again.";
//                 }
//             } else if (currentPuzzle === 3 && currentBranch === 'order-of-names') {
//                  if (query.includes("SELECT note FROM ordo_files")) {
//                     notebookUpdate = "Corbin gains access to the notes within ordo_files, but their meaning remains elusive without the correct key.";
//                 } else if (query.includes("UPDATE ordo_files")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Attempting to alter the locked database proves futile.";
//                 } else if (query.includes("DELETE FROM ordo_files")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Corbin realizes deletion is not the way forward.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 3 (Order of Names Branch). Please try again.";
//                 }
//             }  else if (currentPuzzle === 4) {
//                  if (query.includes("SELECT note FROM ordo_files WHERE code_name = 'aria_ii'")) {
//                         notebookUpdate = "The note reveals: 'Fibonacci notes control the lock. Start with 0, unlock in threes.' Corbin understands – a musical sequence holds the key.";
//                         isCorrect = true;
//                  }
//             }
//              else {
//                 timePenalty = 30;
//                 notebookUpdate = "Incorrect puzzle context. Please try again.";
//             }

//             res.json({
//                 resultText: 'Query executed successfully.',
//                 table: results,
//                 notebookUpdate,
//                 next: nextPuzzle,
//                 branch: branchPath,
//                 timePenalty,
//                 isCorrect,
//                 isMisleading,
//                 suspectQuestion,
//                 suspectOptions,
//             });
//         } catch (err) {
//             console.error('Query error:', err);
//             res.status(400).json({ error: 'Query execution failed. Please check your SQL syntax.', timePenalty: 30 });
//         }
//     }
// };

// module.exports = queryControllerStage2;
// const { Sequelize } = require('sequelize');
// const db = require('../config/dbGame');
// const User = require('../models/User');

// const queryControllerStage2 = {
//     executeQuery: async (req, res) => {
//         const { query, currentPuzzle, currentBranch, queryId, userId } = req.body;

//         let notebookUpdate;
//         let nextPuzzle;
//         let branchPath;
//         let timePenalty = 0;
//         let isCorrect = false;
//         let isMisleading = false;
//         let suspectQuestion = null;
//         let suspectOptions = null;

//         try {
//             const [results, metadata] = await db.query(query);
//             console.log('Query Results:', results);

//             // Stage 2 Logic
//             if (currentPuzzle === 1 && currentBranch === '1-archivist') {
//                 if (query.includes("UPDATE staff_profiles") && query.includes("SET note") && query.includes("WHERE name = 'Amelia Grant'") && query.includes("'and their symbols'")) {
//                     notebookUpdate = "Corbin makes a mental note of Amelia's amplified interest, a thread to potentially unravel later, even if it deviates from the initial lead.";
//                     branchPath = "/puzzle/2/stage2";
//                 } else if (query.includes("ORDER BY name DESC LIMIT 1")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Focusing on the last name alphabetically provides no immediate connection to the Ordo Cantus.";
//                     branchPath = "/puzzle/2/stage2";
//                 } else if (query.includes("ALTER TABLE staff_profiles")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Corbin realizes altering the database structure isn't the immediate goal, a detour that consumes valuable time.";
//                     branchPath = "/puzzle/2/stage2";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 1 (Archivist Branch). Please try again.";
//                     branchPath = "/puzzle/2/stage2";
//                 }

//             }
//             else if (currentPuzzle === 1) {
//                 if (query.includes("FROM staff_profiles sp1") && query.includes("JOIN staff_profiles sp2") && query.includes("WHERE sp1.related_to IS NOT NULL")) {
//                     const victorAiden = results.find(row =>
//                         (row.Staff_Member === 'Victor Crane' && row.Related_To === 'Aiden Crane') ||
//                         (row.Staff_Member === 'Aiden Crane' && row.Related_To === 'Victor Crane')
//                     );
//                     if (victorAiden) {
//                         notebookUpdate = "Corbin jots down the connection: Victor Crane (S002) is related to Aiden Crane (S005). This familial tie warrants a closer look at their communications.";
//                         nextPuzzle = 2;
//                         isCorrect = true;
//                     }
//                 } else if (query.includes("SELECT name, position FROM staff_profiles ORDER BY position")) {
//                     timePenalty = 30;
//                     notebookUpdate = "The ordered list of staff positions offers no immediate insight into hidden relationships, wasting precious time.";
//                     branchPath = "/puzzle/2/stage2";
//                 } else if (query.includes("UPDATE staff_profiles") && query.includes("SET note") && query.includes("WHERE name = 'Amelia Grant'")) {
//                     notebookUpdate = "Corbin makes a mental note of Amelia's amplified interest, a thread to potentially unravel later, even if it deviates from the initial lead.";
//                     isMisleading = true; //missing from original code
//                     branchPath = '/puzzle/1/archivist/stage2';
//                 } else if (query.includes("WHERE note LIKE '%Ordo%'")) { // Added this condition
//                     branchPath = '/puzzle/1/archivist/stage2';
//                     isMisleading = true;
//                     notebookUpdate = "The results highlight Amelia Grant's intense interest in the Ordo Cantus, a potential rabbit hole for the investigation.";
//                 }

//                 else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 1. Please try again.";
//                 }
//             }
//             else if (currentPuzzle === 2 && currentBranch === '2-vault-secrets') {
//                 if (query.includes("SELECT sp.name, DATE(rb.start_time)")) {
//                     notebookUpdate = "Corbin notes the specific dates of Amelia's vault access, further solidifying the archive as a key location.";
//                 } else if (query.includes("SELECT * from room_bookings")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Focusing on Victor Crane's bookings leads nowhere in the immediate search for the 'Aria II' clue.";
//                 } else if (query.includes("AVG(TIMESTAMPDIFF(SECOND, start_time, end_time)")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Calculating average booking duration offers no insight into the current mystery.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Focusing on Victor Crane's bookings leads nowhere in the immediate search for the 'Aria II' clue.";
//                 }

//             }
//             else if (currentPuzzle === 2) {
//                 if (query.includes("FROM communication_logs") && query.includes("WHERE message LIKE") && (query.includes("'%aria%'") || query.includes("'%code%'") || query.includes("'%ledger%'"))) {
//                     const ariaMatch = results.find(row =>
//                         row.message.includes('aria') || row.message.includes('code') || row.message.includes('ledger')
//                     );
//                     if (ariaMatch) {
//                         notebookUpdate = "Corbin highlights the cryptic message: Leo Voss and Amelia Grant discuss a 'ledger' and a 'code' related to an 'aria.' Their roles and access become critical.";
//                         nextPuzzle = 3;
//                         isCorrect = true;
//                         //branchPath="/puzzle/3/stage2";
//                     }

//                 } else if (query.includes("ORDER BY timestamp ASC LIMIT 3")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Reviewing the earliest messages yields no apparent connection to the 'Aria II' or the Ordo Cantus.";
//                     branchPath = "/puzzle/3/stage2";
//                 } else if (query.includes("UPDATE room_bookings") && query.includes("SET end_time") && query.includes("WHERE staff_id = 'S005' AND room_id = 'RB03'")) {
//                     branchPath = '/puzzle/2/vault-secrets';
//                     isMisleading = true;
//                     notebookUpdate = "Aiden Crane's Secret Meeting";
//                 }
//                 else if (query.includes("WHERE rb.room = 'Archive Vault'")) { // Added this condition.
//                     branchPath = '/puzzle/2/vault-secrets/stage2';
//                     isMisleading = true;
//                     notebookUpdate = "The query confirms Amelia Grant's frequent bookings of the Archive Vault, strengthening the suspicion around her.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 2. Please try again.";
//                 }
//             }
//             else if (currentPuzzle === 3 && currentBranch === '3-order-of-names') {
//                 if (query.includes("SELECT note FROM ordo_files")) {
//                     notebookUpdate = "Corbin gains access to the notes within ordo_files, but their meaning remains elusive without the correct key.";
//                 } else if (query.includes("UPDATE ordo_files")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Attempting to alter the locked database proves futile.";
//                 } else if (query.includes("DELETE FROM ordo_files")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Corbin realizes deletion is not the way forward.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 3 (Order of Names Branch). Please try again.";
//                 }
//             }
//             else if (currentPuzzle === 3) {
//                 if (query.includes("WHERE position IN ('Music Theorist', 'Archivist', 'Patron Donor', 'Janitorial Lead')")) {
//                     const correctStaff = results.every(row =>
//                         ['Leo Voss', 'Amelia Grant', 'Victor Crane', 'Sylvia Markov'].includes(row.name)
//                     );
//                     if (correctStaff && results.length === 4) {
//                         notebookUpdate = "Corbin deciphers the riddle, the four staff members granting access to the hidden ordo_files.";
//                         nextPuzzle = 4;
//                         isCorrect = true;
//                     }
//                 } else if (query.includes("WHERE related_to IS NOT NULL")) {
//                     timePenalty = 30;
//                     notebookUpdate = "Focusing on familial relationships doesn't align with the 'four tones' riddle.";
//                 } else if (query.includes("ORDER BY name DESC")) {
//                     branchPath = '/puzzle/3/order-of-names/stage2';
//                     isMisleading = true;
//                     notebookUpdate = "The alphabetical order of names seems arbitrary, a potential red herring.";
//                 } else {
//                     timePenalty = 30;
//                     notebookUpdate = "Incorrect query for Puzzle 3. Please try again.";
//                 }
//             } else if (currentPuzzle === 4) {
//                 if (query.includes("SELECT note FROM ordo_files WHERE code_name = 'aria_ii'")) {
//                     notebookUpdate = "The note reveals: 'Fibonacci notes control the lock. Start with 0, unlock in threes.' Corbin understands – a musical sequence holds the key.";
//                     isCorrect = true;
//                 }
//             } else {
//                 timePenalty = 30;
//                 notebookUpdate = "Incorrect puzzle context. Please try again.";
//             }
//             let newCoins = null;
//             let coinChange = -5;
//             if (isCorrect) {
//                 coinChange = 5;
//             }
//             // Update user coins
//             if (userId) {
//                 const user = await User.findByPk(userId);
//                 if (user) {
//                     newCoins = Math.max(0, user.coins + coinChange); // Ensure coins don't go below 0
//                     await user.update({ coins: newCoins });
//                     console.log(`User ${userId} coins updated by ${coinChange}. New balance: ${newCoins}`);
//                     // Optionally, you could also send the updated coin balance back in the response


//                 } else {
//                     console.error(`User not found with ID: ${userId}`);
//                     // Handle the case where the user isn't found (shouldn't happen if you're managing sessions correctly)
//                 }
//             } else {
//                 console.error('User ID not provided in the request.');
//                 // Handle the case where userId is missing
//             }
//             res.json({
//                 resultText: 'Query executed successfully.',
//                 table: results,
//                 notebookUpdate,
//                 next: nextPuzzle,
//                 branch: branchPath,
//                 timePenalty,
//                 isCorrect,
//                 isMisleading,
//                 suspectQuestion,
//                 suspectOptions,
//                 updatedCoins: newCoins
//             });
//         } catch (err) {
//             console.error('Query error:', err);
//             res.status(400).json({ error: 'Query execution failed. Please check your SQL syntax.', timePenalty: 30 });
//         }
//     }
// };

// module.exports = queryControllerStage2;
const { Sequelize } = require('sequelize');
const db = require('../config/dbGame');
const User = require('../models/User');

const queryControllerStage2 = {
    executeQuery: async (req, res) => {
        const { query, currentPuzzle, currentBranch, queryId, userId } = req.body;

        let notebookUpdate;
        let nextPuzzle;
        let branchPath;
        let timePenalty = 0;
        let isCorrect = false;
        let isMisleading = false;
        let suspectQuestion = null;
        let suspectOptions = null;

        try {
            const [results, metadata] = await db.query(query);
            console.log('Query Results:', results);

            // Stage 2 Logic
            if (currentPuzzle === 1 && currentBranch === '1-archivist') {
                if (query.includes("SELECT sp1.name AS StaffMemberName") && query.includes("sp2.name AS RelatedToName") ) {
                    notebookUpdate = "Corbin makes a mental note of the relation between Victor Crane and Aiden Crane.";
                    branchPath = "/puzzle/2/stage2";
                } else if (query.includes("ORDER BY name DESC LIMIT 1")) {
                    timePenalty = 30;
                    notebookUpdate = "Focusing on the last name alphabetically provides no immediate connection to the Ordo Cantus.";
                    branchPath = "/puzzle/2/stage2";
                } else if (query.includes("SELECT name, note FROM staff_profiles")) {
                    timePenalty = 30;
                    notebookUpdate = "Corbin realizes that finding the characteristics of only one person did not prove of much use to the case.";
                    branchPath = "/puzzle/2/stage2";
                } else {
                    timePenalty = 30;
                    notebookUpdate = "Incorrect query for Puzzle 1 (Archivist Branch). Please try again.";
                    branchPath = "/puzzle/2/stage2";
                }

            }
            else if (currentPuzzle === 1) {
                if (query.includes("FROM staff_profiles sp1") && query.includes("JOIN staff_profiles sp2") && query.includes("WHERE sp1.related_to IS NOT NULL")) {
                    const victorAiden = results.find(row =>
                        (row.Staff_Member === 'Victor Crane' && row.Related_To === 'Aiden Crane') ||
                        (row.Staff_Member === 'Aiden Crane' && row.Related_To === 'Victor Crane')
                    );
                    if (victorAiden) {
                        notebookUpdate = "Corbin jots down the connection: Victor Crane (S002) is related to Aiden Crane (S005). This familial tie warrants a closer look at their communications.";
                        nextPuzzle = 2;
                        isCorrect = true;
                    }
                } else if (query.includes("SELECT name, position FROM staff_profiles ORDER BY position")) {
                    timePenalty = 30;
                    notebookUpdate = "The ordered list of staff positions offers no immediate insight into hidden relationships, wasting precious time.";
                    branchPath = "/puzzle/2/stage2";
                } else if (query.includes("UPDATE staff_profiles") && query.includes("SET note") && query.includes("WHERE name = 'Amelia Grant'")) {
                    notebookUpdate = "Corbin makes a mental note of Amelia's amplified interest, a thread to potentially unravel later, even if it deviates from the initial lead.";
                    isMisleading = true; //missing from original code
                    branchPath = '/puzzle/1/archivist/stage2';
                } else if (query.includes("WHERE note LIKE '%Ordo%'")) { // Added this condition
                    branchPath = '/puzzle/1/archivist/stage2';
                    isMisleading = true;
                    notebookUpdate = "The results highlight Amelia Grant's intense interest in the Ordo Cantus, a potential rabbit hole for the investigation.";
                }

                else {
                    timePenalty = 30;
                    notebookUpdate = "Incorrect query for Puzzle 1. Please try again.";
                }
            }
            else if (currentPuzzle === 2 && currentBranch === '2-vault-secrets') {
                if (query.includes("SELECT sp.name, DATE(rb.start_time)")) {
                    notebookUpdate = "Corbin notes the specific dates of Amelia's vault access, further solidifying the archive as a key location.";
                } else if (query.includes("SELECT * from room_bookings")) {
                    timePenalty = 30;
                    notebookUpdate = "Focusing on Victor Crane's bookings leads nowhere in the immediate search for the 'Aria II' clue.";
                } else if (query.includes("AVG(TIMESTAMPDIFF(SECOND, start_time, end_time)")) {
                    timePenalty = 30;
                    notebookUpdate = "Calculating average booking duration offers no insight into the current mystery.";
                } else {
                    timePenalty = 30;
                    notebookUpdate = "Focusing on Victor Crane's bookings leads nowhere in the immediate search for the 'Aria II' clue.";
                }

            }
            else if (currentPuzzle === 2) {
                if (query.includes("FROM communication_logs") && query.includes("WHERE message LIKE") && (query.includes("'%aria%'") || query.includes("'%code%'") || query.includes("'%ledger%'"))) {
                    const ariaMatch = results.find(row =>
                        row.message.includes('aria') || row.message.includes('code') || row.message.includes('ledger')
                    );
                    if (ariaMatch) {
                        notebookUpdate = "Corbin highlights the cryptic message: Leo Voss and Amelia Grant discuss a 'ledger' and a 'code' related to an 'aria.' Their roles and access become critical.";
                        nextPuzzle = 3;
                        isCorrect = true;
                        //branchPath="/puzzle/3/stage2";
                    }

                } else if (query.includes("ORDER BY timestamp ASC LIMIT 3")) {
                    timePenalty = 30;
                    notebookUpdate = "Reviewing the earliest messages yields no apparent connection to the 'Aria II' or the Ordo Cantus.";
                    branchPath = "/puzzle/3/stage2";
                } else if (query.includes("UPDATE room_bookings") && query.includes("SET end_time") && query.includes("WHERE staff_id = 'S005' AND room_id = 'RB03'")) {
                    branchPath = '/puzzle/2/vault-secrets';
                    isMisleading = true;
                    notebookUpdate = "Aiden Crane's Secret Meeting";
                }
                else if (query.includes("WHERE rb.room = 'Archive Vault'")) { // Added this condition.
                    branchPath = '/puzzle/2/vault-secrets/stage2';
                    isMisleading = true;
                    notebookUpdate = "The query confirms Amelia Grant's frequent bookings of the Archive Vault, strengthening the suspicion around her.";
                } else {
                    timePenalty = 30;
                    notebookUpdate = "Incorrect query for Puzzle 2. Please try again.";
                }
            }
            else if (currentPuzzle === 3 && currentBranch === '3-order-of-names') {
                if (query.includes("SELECT note FROM ordo_files")) {
                    notebookUpdate = "Corbin gains access to the notes within ordo_files, but their meaning remains elusive without the correct key.";
                } else if (query.includes("UPDATE ordo_files")) {
                    timePenalty = 30;
                    notebookUpdate = "Attempting to alter the locked database proves futile.";
                } else if (query.includes("DELETE FROM ordo_files")) {
                    timePenalty = 30;
                    notebookUpdate = "Corbin realizes deletion is not the way forward.";
                } else {
                    timePenalty = 30;
                    notebookUpdate = "Incorrect query for Puzzle 3 (Order of Names Branch). Please try again.";
                }
            }
            else if (currentPuzzle === 3) {
                if (query.includes("WHERE position IN ('Music Theorist', 'Archivist', 'Patron Donor', 'Janitorial Lead')")) {
                    const correctStaff = results.every(row =>
                        ['Leo Voss', 'Amelia Grant', 'Victor Crane', 'Sylvia Markov'].includes(row.name)
                    );
                    if (correctStaff && results.length === 4) {
                        notebookUpdate = "Corbin deciphers the riddle, the four staff members granting access to the hidden ordo_files.";
                        nextPuzzle = 4;
                        isCorrect = true;
                    }
                } else if (query.includes("WHERE related_to IS NOT NULL")) {
                    timePenalty = 30;
                    notebookUpdate = "Focusing on familial relationships doesn't align with the 'four tones' riddle.";
                } else if (query.includes("ORDER BY name DESC")) {
                    branchPath = '/puzzle/3/order-of-names/stage2';
                    isMisleading = true;
                    notebookUpdate = "The alphabetical order of names seems arbitrary, a potential red herring.";
                } else {
                    timePenalty = 30;
                    notebookUpdate = "Incorrect query for Puzzle 3. Please try again.";
                }
            } else if (currentPuzzle === 4) {
                if (query.includes("SELECT note FROM ordo_files WHERE code_name = 'aria_ii'")) {
                    notebookUpdate = "The note reveals: 'Fibonacci notes control the lock. Start with 0, unlock in threes.' Corbin understands – a musical sequence holds the key.";
                    isCorrect = true;
                }
            } else {
                timePenalty = 30;
                notebookUpdate = "Incorrect puzzle context. Please try again.";
            }
            let newCoins = null;
            let coinChange = -5;
            if (isCorrect) {
                coinChange = 5;
            }
            // Update user coins
            if (userId) {
                const user = await User.findByPk(userId);
                if (user) {
                    newCoins = Math.max(0, user.coins + coinChange); // Ensure coins don't go below 0
                    await user.update({ coins: newCoins });
                    //console.log(User ${userId} coins updated by ${coinChange}. New balance: ${newCoins});
                    // Optionally, you could also send the updated coin balance back in the response


                } else {
                   /// console.error(User not found with ID: ${userId});
                    // Handle the case where the user isn't found (shouldn't happen if you're managing sessions correctly)
                }
            } else {
                console.error('User ID not provided in the request.');
                // Handle the case where userId is missing
            }
            res.json({
                resultText: 'Query executed successfully.',
                table: results,
                notebookUpdate,
                next: nextPuzzle,
                branch: branchPath,
                timePenalty,
                isCorrect,
                isMisleading,
                suspectQuestion,
                suspectOptions,
                updatedCoins: newCoins
            });
        } catch (err) {
            console.error('Query error:', err);
            res.status(400).json({ error: 'Query execution failed. Please check your SQL syntax.', timePenalty: 30 });
        }
    }
};

module.exports = queryControllerStage2;