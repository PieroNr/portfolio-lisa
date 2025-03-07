import React, { useState, useEffect } from 'react';
import localFont from "next/font/local";

const cabinet = localFont({
    src: [{ path: "../public/fonts/Cabinet.ttf", weight: "800" },],
    display: "swap",
});

interface LoaderProps {
    onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete, style }) => {
    const [counter, setCounter] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const incrementCounter = () => {
            if (!isPaused) {
                setCounter(prevCounter => {
                    if (prevCounter < 100) {
                        return prevCounter + 1;
                    } else {
                        setIsPaused(true);
                        setTimeout(() => onComplete(), 1000);
                        return prevCounter;
                    }
                });
            }
        };

        const interval = setInterval(incrementCounter, 20); // Approximately 30 increments per second

        const randomPause = () => {
            if (Math.random() < 0.1) { // 10% chance to pause
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), Math.random() * 1000); // Pause for a random duration up to 1 second
            }
        };

        const pauseInterval = setInterval(randomPause, 100); // Check for pause every 100ms

        return () => {
            clearInterval(interval);
            clearInterval(pauseInterval);
        };
    }, [isPaused]);

    const svgWidth = 3387.65;
    const startCx = 63.83;
    const endCx = svgWidth - 63.83;
    const cx = startCx + (endCx - startCx) * (counter / 100);
    const formattedCounter = `${Math.floor(counter / 100)}:${(counter % 100).toString().padStart(2, '0')}`;

    return (
        <div className={`bg-black absolute top-0 left-0 h-screen w-screen flex items-center justify-center transition-opacity duration-1000`} style={style}>
<svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3387.65 1084.66" className={'w-1/3'}>
    <defs>
        <mask id="timeline-mask">
            <g id="Layer_1" data-name="Layer 1" fill={"#fff"}>
                <g>
                    <g>
                        <path className="cls-1"
                              d="M130.05,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M206.46,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M282.88,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M359.29,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M435.71,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M512.13,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M588.53,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M664.95,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M741.37,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M817.78,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M894.2,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M970.61,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1047.02,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1123.44,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1199.86,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1276.27,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1352.68,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1429.1,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1505.51,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1581.93,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1658.34,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1734.75,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1811.17,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1887.58,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1964,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2040.42,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2116.83,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2193.24,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2269.66,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2346.07,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2422.48,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2498.9,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2575.31,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2651.73,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2728.15,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2804.56,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2880.97,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2957.39,315.64c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3033.8,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3110.22,315.64c-10.18,0-18.43-8.25-18.43-18.43v-81.5c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.5c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3186.63,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3263.04,315.64c-10.18,0-18.43-8.25-18.43-18.43v-40.75c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.75c0,10.18-8.25,18.43-18.43,18.43Z"/>
                    </g>
                    <g>
                        <path className="cls-1"
                              d="M130.05,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M206.46,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M282.88,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M359.29,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M435.71,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M512.13,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M588.53,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M664.95,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M741.37,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M817.78,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M894.2,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M970.61,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1047.02,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1123.44,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1199.86,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1276.27,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1352.68,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1429.1,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1505.51,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1581.93,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1658.34,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1734.75,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1811.17,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1887.58,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M1964,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2040.42,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2116.83,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2193.24,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2269.66,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2346.07,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2422.48,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2498.9,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2575.31,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2651.73,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2728.15,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2804.56,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2880.97,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M2957.39,447.22c-10.18,0-18.43-8.25-18.43-18.43v-131.58c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v131.58c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3033.8,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3110.22,397.14c-10.18,0-18.43-8.25-18.43-18.43v-81.51c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v81.51c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3186.63,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                        <path className="cls-1"
                              d="M3263.04,356.39c-10.18,0-18.43-8.25-18.43-18.43v-40.76c0-10.18,8.25-18.43,18.43-18.43s18.43,8.25,18.43,18.43v40.76c0,10.18-8.25,18.43-18.43,18.43Z"/>
                    </g>

                    </g>
            </g>
        </mask>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#E7541C", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "red", stopOpacity: 1 }} />
        </linearGradient>
    </defs>
    <g fill={'#fff'}>
        <path
              d="M3351.02,591.26H42.15c-20.24,0-36.71-16.43-36.71-36.63,0-9.76,3.83-18.97,10.78-25.92,6.96-6.95,16.17-10.78,25.93-10.78h3308.87c20.2,0,36.64,16.46,36.64,36.7,0,9.57-3.89,19.01-10.67,25.89-6.94,6.94-16.14,10.74-25.96,10.74ZM42.15,532.67c-5.82,0-11.33,2.3-15.5,6.47-4.17,4.17-6.46,9.67-6.46,15.5,0,12.07,9.85,21.89,21.97,21.89h3308.87c5.88,0,11.39-2.27,15.5-6.39,4.05-4.11,6.39-9.77,6.39-15.5,0-12.11-9.82-21.96-21.89-21.96H42.15Z"/>
        <circle cx={cx} cy="554.62" r="63.83" />
        <text x="150" y="800" fill="white" fontSize="125" textAnchor="middle" fontFamily={cabinet}>{formattedCounter}</text>
    </g>

    <rect width="100%" height="100%" fill="#102526" mask="url(#timeline-mask)" />
    <rect width="100%" height="100%" fill="url(#grad1)" mask="url(#timeline-mask)" className="red-fill" style={{ width: `${counter}%`}}/>


</svg>

        </div>
    );
};

export default Loader;
