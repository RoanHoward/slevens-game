import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DiceRoller from "./DiceRoller"; // Keep your dice roller function
import "./styles.css"; // Import styles

export default function App() {
    const [showIntro, setShowIntro] = useState(true);
    const titleRef = useRef(null);
    const screenRef = useRef(null);

    useEffect(() => {
        // 3D Bounce-In Effect for SHLEVENS
        gsap.fromTo(
            titleRef.current,
            { scale: 0, opacity: 0, rotateX: -90 },
            { scale: 1, opacity: 1, rotateX: 0, duration: 2, ease: "elastic.out(1, 0.3)" }
        );

        // Golden Shine Effect (Moving Gold Texture)
        gsap.fromTo(
            titleRef.current,
            { backgroundPosition: "-200px 0" },
            { backgroundPosition: "200px 0", duration: 2, repeat: -1, ease: "linear" }
        );

        // Floating Effect (Soft Movement)
        gsap.to(titleRef.current, {
            y: -10,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut",
        });

        // Fade-Out Screen After 3 Seconds, then show DiceRoller
        gsap.to(screenRef.current, {
            opacity: 0,
            duration: 1,
            delay: 3,
            onComplete: () => setShowIntro(false),
        });
    }, []);

    return (
        <div>
            {/* Transition Screen (SHLEVENS Animation) */}
            {showIntro && (
                <div ref={screenRef} className="transition-screen">
                    <h1 ref={titleRef}>SHLEVENS</h1>
                </div>
            )}

            {/* Dice Roller Appears After Transition */}
            {!showIntro && <DiceRoller />}
        </div>
    );
}