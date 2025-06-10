const { Sequelize } = require('sequelize');
const db = require('../config/dbGame'); // your Sequelize instance
const User = require('../models/User'); // Adjust the path to your User model

const queryController = {
    executeQuery: async (req, res) => {
        const { query, currentPuzzle, currentBranch, queryId, userId } = req.body; // Expect userId

        let notebookUpdate;
        let nextPuzzle;
        let branchPath;
        let timePenalty = 0;
        let isCorrect = false;
        let isMisleading = false;
        let suspectQuestion = null;
        let suspectOptions = null;
        console.log("Full Query:", query);
        try {
            //  Execute the query from frontend
            const [results, metadata] = await db.query(query);
            console.log('Query Results:', results);
            console.log(currentBranch);
            console.log(currentPuzzle);

            // Default penalty.  This will be added to timePenalty
            let coinChange = -5;
            if (isCorrect) {
                coinChange = 5;
            }

            if (currentPuzzle === 1) {
                if (currentPuzzle === 1 && currentBranch === 'forgery') {
                    if (
                        query.includes("SELECT vl.person_id, p.name, vl.access_time FROM vault_access_logs vl") &&
                        query.includes("JOIN personnel p ON vl.person_id = p.person_id") &&
                        query.includes("WHERE vl.access_time BETWEEN '2025-04-29 12:00:00' AND '2025-04-29 14:00:00'") &&
                        query.includes("ORDER BY vl.access_time")
                    ) {
                        const graceEntry = results.find(row => row.name === 'Grace Tanaka' && row.access_time === '2025-04-29 13:55:00');
                        if (graceEntry) {
                            notebookUpdate = "Look at Grace's entry right before the incident! And her unrestricted access... Something's not right. This feels like our lead.";
                            nextPuzzle = 2;
                            isCorrect = true;
                            suspectQuestion = "Who accessed the vault suspiciously close to the incident, given their access level?";
                            suspectOptions = [
                                { name: 'Grace Tanaka, due to her entry just before the alarm.', value: 'graceTanaka' },
                                { name: 'Lydia Crane, with her unusual double entry.', value: 'lydiaCrane' },
                                { name: 'Axel Borne, despite no direct evidence in this timeframe.', value: 'axelBorne' },
                            ];
                        } else {
                            timePenalty += 30;
                            notebookUpdate = "We're on the right track looking at the timeline, but let's focus on who had access right around when things went down.";
                        }
                    } else if (query.includes("SELECT * FROM vault_access_logs ORDER BY access_time DESC LIMIT 2")) {
                        timePenalty += 30;
                        notebookUpdate = "That shows the latest entries, but we need to look at a specific window of time related to the incident.";
                    } else if (query.includes("SELECT p.name, COUNT(vl.access_id) AS access_count FROM vault_access_logs vl JOIN personnel p ON vl.person_id = p.person_id GROUP BY p.name ORDER BY access_count DESC")) {
                        timePenalty += 30;
                        notebookUpdate = "While access counts are interesting, the forgery clue is about a specific moment in time. Let's look at the logs around the time of the incident.";
                    }
                }
                else if (query.includes("vault_access_logs") && query.includes("COUNT(*)")) {
                    const lydia = results.find(row => row.person_id === 'P1002' && row.access_count === 2);
                    if (lydia) {
                        notebookUpdate = 'Suspect: Lydia Crane (P1002). Note: Re-entered vault within minutes.   Okay, so Lydia went into the vault twice, right around when things got weird. That second time is super sus. Maybe check her out?';
                        nextPuzzle = 2;
                        isCorrect = true;
                        suspectQuestion = "Who accessed the vault with unusual timing?";
                        suspectOptions = [
                            { name: 'Lydia Crane, due to her unusual re-entry.', value: 'lydiaCrane' },
                            { name: 'P1100, based on the later, unrecorded access.', value: 'p1100_phantom' },
                            { name: 'Axel Borne, as he accessed the vault biometrically.', value: 'axelBorne' },
                            { name: 'Grace Tanaka, given her unrestricted access.', value: 'graceTanaka' },
                        ];
                    }
                } else if (query.includes("biometric")) {
                    timePenalty += 30;
                    notebookUpdate = "   Hmm, that's an interesting angle, but let's refocus a bit. What's the clue really asking us to count or consider about the vault entries?";

                } else if (query.includes("access_time > '2025-04-29 14:00:00'")) {
                    const match = results.find(row => row.person_id === 'P1100');
                    if (match) {
                        branchPath = '/puzzle/1/forgery';
                        isMisleading = true;
                        notebookUpdate = "   Wait, who's this 'P1100'? They showed up late, after the timeline we're focused on. That's really odd...and maybe connected to the camera issues?";
                    }
                } else {
                    timePenalty += 30; // default penalty
                    notebookUpdate = "   Let's make sure we're looking at all the relevant activity. Does the clue prioritize recent entries, or something else?";
                }
            }
            else if (currentPuzzle === 2) {
                if (currentPuzzle === 2 && currentBranch === 'stage-left') {
                    console.log("Inside Puzzle 2, stage-left branch");
                    if (query.includes("TIME(sl.timestamp)") && query.includes("'P1067'") && query.includes("'footage corrupted'")) {
                        const marcusAtTime = results.find(row => row.name === 'Marcus Bell' && row.corruption_time === '14:03:00');
                        if (marcusAtTime) {
                            notebookUpdate = "You found the moment the footage was corrupted. Marcus being near the security console at that exact time is highly suspicious, especially given his nervous behavior earlier.";
                            nextPuzzle = 3;
                            isCorrect = true;
                            suspectQuestion = "Who was present when the security footage was corrupted?";
                            suspectOptions = [
                                { name: 'Marcus Bell, seen near the security console.', value: 'marcusBell' },
                                { name: 'Axel Borne, who has technical knowledge of the system.', value: 'axelBorne' },
                                { name: 'Lydia Crane, whose motives are still unclear.', value: 'lydiaCrane' },
                            ];
                        }
                    } else if (query.includes("ORDER BY timestamp DESC") && query.includes("security_logs")) { // Use cleanedQuery
                        timePenalty += 30;
                        notebookUpdate = "   That shows the latest activity, but we need to find the *specific* event related to the camera malfunction. Think about the keywords in the clue.";
                    } else if (query.includes("GROUP BY dr.location")) {  // Use cleanedQuery
                        timePenalty += 30;
                        notebookUpdate = "   Focusing on locations is good, but the clue is about a specific *event* that occurred. What kind of event are we looking for in the security logs?";
                    } else {
                        timePenalty += 30;
                        notebookUpdate = "   There's a lot going on there... but can we isolate the specific record we need? What's the key verb or phrase in the clue?";
                    }
                }

                else if (
                    query.includes("SELECT p.name, sl.event_type, dr.location") &&
                    query.includes("FROM security_logs sl") &&
                    query.includes("JOIN device_registry dr ON sl.terminal_id = dr.terminal_id") &&
                    query.includes("JOIN personnel p ON p.person_id = 'P1033'") &&
                    query.includes("WHERE sl.event_type = 'footage corrupted'")
                ) {
                    const axel = results.find(row => row.name === 'Axel Borne' && row.event_type === 'footage corrupted' && row.location && row.location.includes('Vault Entrance'));
                    if (axel) {
                        notebookUpdate = 'Suspect: Axel Borne. Note: As the audio technician, he has access and knowledge of the security systems. His presence near the console during the corruption is highly suspicious.   Axel was at the security computer when the cameras went down. That\'s very suspicious, given his job. Remember the riddle about someone \'near the console\'?';
                        nextPuzzle = 3;
                        isCorrect = true;
                        suspectQuestion = "Who was on duty during the CCTV malfunction?";
                        suspectOptions = [
                            { name: 'Axel Borne, the audio technician assigned to the CCTV console.', value: 'axelBorne' },
                            { name: 'Marcus Bell, the anxious stage manager seen near the Main Lobby.', value: 'marcusBell' },
                            { name: 'Lydia Crane, perhaps trying to hide her movements.', value: 'lydiaCrane' },
                            { name: 'P1100, if they somehow manipulated the system remotely.', value: 'p1100_phantom' },
                        ];
                    } else {
                        timePenalty += 30;
                        notebookUpdate = "   That might not be the most direct path. Instead of who was there, can we narrow down what happened to the footage itself?";
                    }
                } else if (query.includes("SELECT * FROM security_logs WHERE event_type = 'login'")) {
                    timePenalty += 30; // Incorrect query
                    notebookUpdate = "   That might not be the most direct path. Instead of who was there, can we narrow down what happened to the footage itself?";
                } else if (
                    query.includes("SELECT * FROM device_registry dr") &&
                    query.includes("JOIN security_logs sl ON dr.terminal_id = sl.terminal_id") &&
                    query.includes("WHERE dr.location = 'Main Lobby'") &&
                    query.includes("AND sl.event_type = 'footage corrupted'")
                ) {
                    // Misleading query for Puzzle 2 - Redirect irrespective of results
                    branchPath = '/puzzle/2/stage-left';
                    isMisleading = true;
                    notebookUpdate = "   Okay, the video wasn't messed up from the lobby, but Marcus was acting really jumpy nearby when it happened... Worth keeping an eye on him, even if he wasn't at the controls.";
                } else {
                    timePenalty += 30; // Default penalty for other incorrect queries in Puzzle 2
                    notebookUpdate = "   There's a lot going on there... but can we isolate the specific record we need? What's the key verb or phrase in the clue?";
                }
            }
            else if (currentPuzzle === 3) {
                if (currentBranch === 'archivist') {
                    if (query.includes("SELECT p.name, bm.room_id, bm.time_in FROM backstage_movements bm JOIN personnel p ON bm.person_id = p.person_id WHERE bm.time_in > '2025-04-29 13:00:00' ORDER BY bm.time_in ASC LIMIT 1")) {
                        const grace = results.find(row => row.name === 'Grace Tanaka');
                        if (grace) {
                            notebookUpdate = "Grace Tanaka knows about hidden symbols!   And she entered R-03 after P1100.   This is very suspicious!";
                            nextPuzzle = 4;
                            isCorrect = true;
                            suspectQuestion = "Given her expertise, is Grace Tanaka connected to P1100?";
                            suspectOptions = [
                                { name: "Yes, Grace's knowledge of symbols and presence in R-03 is suspicious", value: "grace_and_p1100" },
                                { name: "No, there is no evidence directly linking Grace and P1100", value: "no_link" },
                            ];
                        } else {
                            timePenalty += 30;
                            notebookUpdate = "We're looking for someone with knowledge of hidden symbols. Who in the personnel records has that expertise?";
                        }

                    } else {
                        timePenalty += 30;
                        notebookUpdate = "This branch is about someone with special knowledge.   Who might that be?";
                    }
                } else if (currentBranch === 'technician') {
                    if (query.includes("SELECT sl.event_type, sl.timestamp FROM security_logs sl JOIN device_registry dr ON sl.terminal_id = dr.terminal_id WHERE dr.location LIKE '%Backstage%' AND sl.timestamp BETWEEN '2025-04-29 13:00:00' AND '2025-04-29 14:00:00'")) {
                        const axelOverride = results.find(row => row.event_type === 'motion detected');
                        if (axelOverride) {
                            notebookUpdate = "Axel performed a system override around the time P1100 entered R-03.   Was he trying to cover their tracks?";
                            nextPuzzle = 4;
                            isCorrect = true;
                            suspectQuestion = "Did Axel Borne use his system access to aid P1100?";
                            suspectOptions = [
                                { name: "Yes, the timing of the override suggests a connection.", value: "axel_and_p1100" },
                                { name: "No, Axel's actions were likely part of his regular duties.", value: "axel_no_link" },
                            ];
                        } else {
                            timePenalty += 30;
                            notebookUpdate = "We need to focus on a specific event in the security logs.   What happened with the system?";
                        }
                    } else {
                        timePenalty += 30;
                        notebookUpdate = "Let's investigate the security logs.   What was Axel doing with the system?";
                    }
                } else {
                    if (
                        query.includes("SELECT bm.*, p.name FROM backstage_movements bm LEFT JOIN personnel p ON bm.person_id = p.person_id WHERE bm.person_id = 'P1100'")
                    ) {
                        const unknownEntity = results.find(row => row.person_id === 'P1100');
                        if (unknownEntity) {
                            notebookUpdate = 'Entity "P1100" identified as an anomaly with no personnel record. Likely using a cloned ID or has found a way to remain unrecorded.   \'P1100\' went into Room R-03 and...just stayed there? That\'s super weird. We need to know who that is and what they\'re doing. \'Ghost\' leaving \'footprints,\' remember?';
                            nextPuzzle = 4;
                            isCorrect = true;
                            suspectQuestion = "Who is this 'P1100' entity, based on their unusual record?";
                            suspectOptions = [
                                { name: 'A phantom operative', value: 'p1100' },
                                { name: 'A known employee using a false identity', value: 'false_identity' },
                            ];
                        } else {
                            timePenalty += 30;
                            notebookUpdate = "   That gives us some context, but... let's tighten the focus. Where are we looking for \'P1100\' specifically, and who might have been with them there?";
                        }
                    } else if (query.includes("SELECT * FROM backstage_movements WHERE room_id = 'R-01'")) {
                        timePenalty += 30;
                        notebookUpdate = "   That gives us some context, but... let's tighten the focus. Where are we looking for \'P1100\' specifically, and who might have been with them there?";
                    } else if (query.includes("SELECT p.name, bm.room_id, bm.time_in FROM backstage_movements bm JOIN personnel p ON bm.person_id = p.person_id WHERE bm.room_id = 'R-03' ORDER BY bm.time_in DESC")) {
                        branchPath = '/puzzle/3/archivist';
                        isMisleading = true;
                        nextPuzzle = null;
                        notebookUpdate = "   Grace went into that room, but after \'P1100\' was already there. Did she see something? Is she connected somehow?";
                    } else if (query.includes("SELECT p.name, dr.location FROM personnel p JOIN device_registry dr ON p.person_id = SUBSTR(dr.assigned_to, 1, 5) WHERE dr.location LIKE '%Backstage%'")) {
                        branchPath = '/puzzle/3/technician';
                        isMisleading = true;
                        nextPuzzle = null;
                        notebookUpdate = "   Axel was in the hallway near R-03, and he knows the security system... Could he be involved with \'P1100\' somehow? Is he \'P1100\'?";
                    } else {
                        timePenalty += 30; // Default for other incorrect queries in Puzzle 3
                        notebookUpdate = "   That gives us some context, but... let's tighten the focus. Where are we looking for \'P1100\' specifically specifically, and who might have been with them there?";
                    }
                }
            } else {
                timePenalty += 30; // Default penalty for incorrect puzzle context
                notebookUpdate = "   Incorrect puzzle context";
                console.log('Incorrect Puzzle Context'); // Add this line
            }
            let newCoins = null;
            // Update user coins
            if (userId) {
                const user = await User.findByPk(userId);
                if (user) {
                    newCoins = Math.max(0, user.coins + coinChange); // Ensure coins don't go below 0
                    await user.update({ coins: newCoins });
                    console.log(`User ${userId} coins updated by ${coinChange}. New balance: ${newCoins}`);
                    // Optionally, you could also send the updated coin balance back in the response


                } else {
                    console.error(`User not found with ID: ${userId}`);
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

module.exports = queryController;
