import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

const About = () => {

    const [showPopup, setShowPopup] = useState(false);

    const headingRef = useRef(null);
    const textRef = useRef(null);
    const popupRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setShowPopup(true);
        }, 500);

        // Animate heading
        animate(
            headingRef.current,
            { opacity: [0, 1], y: [-20, 0] },
            { duration: 0.8 }
        );

        // Animate text
        animate(
            textRef.current,
            { opacity: [0, 1], y: [20, 0] },
            { duration: 1, delay: 0.3 }
        );


        if (buttonRef.current) {
            const button = buttonRef.current;

            const handleMouseOver = () => {
                animate(button, { scale: 1.05 });
            };

            const handleMouseLeave = () => {
                animate(button, { scale: 1 });
            };

            button.addEventListener("mouseover", handleMouseOver);
            button.addEventListener("mouseleave", handleMouseLeave);

            // Cleanup function
            return () => {
                if (button) {
                    button.removeEventListener("mouseover", handleMouseOver);
                    button.removeEventListener("mouseleave", handleMouseLeave);
                }
            };
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            {/* Heading */}
            <div
                ref={headingRef}
                className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center opacity-0"
            >
                <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
                    We love
                </h1>
                <div className="stats bg-primary shadow px-4 py-2 rounded-lg">
                    <div className="stat">
                        <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
                            comfy
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p ref={textRef} className="mt-6 text-lg leading-8 max-w-2xl opacity-0">
                Welcome to our furnished store! We offer the **coziest and most
                stylish** furniture for your home. From **luxurious sofas** to **modern
                decor,** every piece is designed for comfort and elegance.
            </p>

            {/* Pop-up animation (on page load) */}
            {showPopup && (
                <div
                    ref={popupRef}
                    className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-lg rounded-lg opacity-0"
                >
                    <p className="text-lg font-semibold">
                        ✨ Discover the best furniture deals today! ✨
                    </p>
                </div>
            )}

            {/* Hover effect on button */}
            <button
                ref={buttonRef}
                className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
            >
                Explore Now
            </button>
        </div>
    );
};

export default About;
