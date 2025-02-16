import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
    transports: ["websocket"],
});

export default function DrinkingTimer({ startTimer, stopTimer, drinkingTime , setMessage}) {
    useEffect(() => {
        const handleCupEvent = (data) => {
            console.log("🔔 Cup event received in frontend:", data);
            if (data === "cup_placed") {
                console.log("🛑 Calling stopTimer() from DrinkingTimer.js...");
                setMessage("Safe!! Next person's turn.");
                stopTimer();
            }
        };

        socket.on("cupEvent", handleCupEvent);
        return () => socket.off("cupEvent", handleCupEvent);
    }, [stopTimer, setMessage]);

    return (
        <div className="timer-section">
            <h2>Drinking Time: {drinkingTime} seconds</h2> {/* ✅ Updates in real-time */}
            <button className="lift-button" onClick={startTimer}>Start Timer</button>
        </div>
    );
}