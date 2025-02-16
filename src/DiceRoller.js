import React, { useState } from "react";

export default function DiceRoller({ stopTimer, isDrinking, startTime, message, setMessage }) { // ✅ Receive setMessage as a prop
    const [dice, setDice] = useState([1, 1]);
    const [lastRoll, setLastRoll] = useState(0);

    const rollDice = () => {
        if (Date.now() < lastRoll + 1000) return;
        setLastRoll(Date.now());
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        setDice([die1, die2]);

        const sum = die1 + die2;

        if (sum === 7 || sum === 11) {
            if (isDrinking && startTime) {
                setMessage("Drink again!!"); // ✅ Now updates globally
            } else {
                setMessage("You rolled a 7 or 11! Pick someone to drink and then start the timer! 🍻"); // ✅ Updates globally
            }
            console.log("🎲 Rolled 7 or 11! Stopping timer...");
            stopTimer();
        } else if (die1 === die2) {
            if (isDrinking && startTime) {
                setMessage("Drink again!!"); // ✅ Now updates globally
            } else {
                setMessage("You rolled doubles! Pick someone to drink and then start the timer! 🍻"); // ✅ Updates globally
            }
            console.log("🎲 Rolled doubles! Stopping timer...");
            stopTimer();
        } else {
            if (isDrinking && startTime) {
              setMessage("Keep rolling!!");
            } else {
              setMessage("Next person's turn to roll!"); // ✅ Updates globally
            }
        }
    };

    return (
        <div className="dice-section">
            <h2 className="dice-title">Sevens, Elevens, and Doubles</h2>
            <div className="dice-display">🎲 {dice[0]} 🎲 {dice[1]}</div>
            <button className="roll-button" onClick={rollDice}>Roll Dice 🎲</button>
        </div>
    );
}