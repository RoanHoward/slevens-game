import React, { useState } from "react";
import DiceRoller from "./DiceRoller"; // Import the dice roller component
import "./styles.css"; // Import the CSS file

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="container">
      {showIntro ? (
        <div className="intro-screen">
          <h1>🎲 Welcome to Sevens, Elevens, and Doubles! 🎲</h1>
          <p>Click play to start the game.</p>
          <button className="button" onClick={() => setShowIntro(false)}>
            Play ▶
          </button>
        </div>
      ) : (
        <DiceRoller />
      )}
    </div>
  );
}