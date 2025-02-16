import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DiceRoller from "./DiceRoller";
import DrinkingTimer from "./DrinkingTimer";
import "./styles.css";

export default function App() {
    const [showIntro, setShowIntro] = useState(true);
    const titleRef = useRef(null);
    const screenRef = useRef(null);
    const [drinkingTime, setDrinkingTime] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isDrinking, setIsDrinking] = useState(false);
    const [message, setMessage] = useState(""); // ✅ Move message state to App.js

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { scale: 0, opacity: 0, rotateX: -90 },
            { scale: 1, opacity: 1, rotateX: 0, duration: 2, ease: "elastic.out(1, 0.3)" }
        );

        gsap.fromTo(
            titleRef.current,
            { backgroundPosition: "-200px 0" },
            { backgroundPosition: "200px 0", duration: 2, repeat: -1, ease: "linear" }
        );

        gsap.to(titleRef.current, {
            y: -10,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut",
        });

        gsap.to(screenRef.current, {
            opacity: 0,
            duration: 1,
            delay: 3,
            onComplete: () => setShowIntro(false),
        });
    }, []);

    const startTimer = () => {
        if (isDrinking) return;
        setIsDrinking(true);
        setStartTime(Date.now());
        setDrinkingTime(0);
        setMessage(""); // ✅ Reset message when timer starts
    };

    const stopTimer = () => {
        console.log("🛑 stopTimer() called in App.js!");

        setIsDrinking((prevIsDrinking) => {
            setStartTime((prevStartTime) => {
                if (prevIsDrinking && prevStartTime) {
                    const timeTaken = (Date.now() - prevStartTime) / 1000;
                    console.log(`🛑 Stopping Timer! Time Recorded: ${timeTaken.toFixed(2)} seconds`);
                    setDrinkingTime(timeTaken.toFixed(2));
                    return null;
                }
                return prevStartTime;
            });

            return false;
        });
    };

    useEffect(() => {
        let interval;
        if (isDrinking && startTime) {
            interval = setInterval(() => {
                setDrinkingTime(((Date.now() - startTime) / 1000).toFixed(2));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isDrinking, startTime]);

    return (
        <div>
            {showIntro && (
                <div ref={screenRef} className="transition-screen">
                    <h1 ref={titleRef}>SHLEVENS</h1>
                </div>
            )}

            {!showIntro && (
                <div className="game-container">
                    <DiceRoller 
                        stopTimer={stopTimer} 
                        isDrinking={isDrinking} 
                        startTime={startTime} 
                        message={message} // ✅ Pass message as a prop
                        setMessage={setMessage} // ✅ Pass setMessage as a prop
                    />

                    <p className="dice-message">{message}</p> {/* ✅ Display message here */}

                    <DrinkingTimer 
                        startTimer={startTimer}
                        stopTimer={stopTimer}
                        isDrinking={isDrinking}
                        startTime={startTime}
                        drinkingTime={drinkingTime}
                        setMessage={setMessage} // ✅ Pass setMessage as a prop
                    />
                </div>
            )}
        </div>
    );
}