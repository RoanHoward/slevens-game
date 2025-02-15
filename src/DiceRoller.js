// Import React and useState hook (to manage dice values and messages)
import React, { useState } from "react";

const DiceRoller = () => {
  // State to store dice values (initially set to [1,1])
  const [dice, setDice] = useState([1, 1]);

  // State to store the message (what happens after rolling)
  const [message, setMessage] = useState("");

  // Function to roll the dice
  const rollDice = () => {
    // Generate two random numbers between 1 and 6 (inclusive)
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    // Update the state with new dice values
    setDice([die1, die2]);

    // Calculate the sum of the two dice
    const sum = die1 + die2;

    // Determine the message based on the roll outcome
    if (sum === 7 || sum === 11) {
      setMessage("You rolled a 7 or 11! Pick someone to drink! 🍻");
    } else if (die1 === die2) {
      setMessage("Doubles! Pick someone to drink twice! 🍹");
    } else {
      setMessage("Roll again!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Title */}
      <h2>Sevens, Elevens, and Doubles mother fuckas</h2>

      {/* Display the dice values */}
      <div style={{ fontSize: "24px", margin: "10px" }}>
        🎲 {dice[0]} 🎲 {dice[1]}
      </div>

      {/* Button to roll the dice */}
      <button
        onClick={rollDice}
        style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}
      >
        Roll Dice 🎲
      </button>

      {/* Display message based on roll outcome */}
      <p style={{ fontSize: "18px", marginTop: "10px" }}>{message}</p>
    </div>
  );
};

// Export the component so it can be used in other files
export default DiceRoller;