"use client";
import { useState, useRef, useEffect } from "react";
import localFont from "next/font/local";
import Loader from "@/components/Loader";

const neima = localFont({
    src: [{ path: "../public/fonts/Neima.ttf" }], display: "swap",
});

const cabinet = localFont({
    src: [{ path: "../public/fonts/Cabinet.ttf", weight: "800" },
        { path: "../public/fonts/Cabinet.ttf", weight: "400" }],
    display: "swap",
});

export default function Home() {
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [loaderClass, setLoaderClass] = useState("");
    const titleRef = useRef<HTMLHeadingElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleLoaderComplete = () => {
        setLoaderClass("compress");
        setTimeout(() => {
            if (titleRef.current && loaderRef.current) {
                const titleWidth = titleRef.current.offsetWidth;
                loaderRef.current.style.width = `${titleWidth}px`;
            }
        }, 500); // Duration of the compression animation

        setTimeout(() => {
            setIsLoaderVisible(false);
        }, 1000); // Duration of the compression animation
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (buttonRef.current) {
                const button = buttonRef.current;
                const rect = button.getBoundingClientRect();
                const distanceX = event.clientX - (rect.left + rect.width / 2);
                const distanceY = event.clientY - (rect.top + rect.height / 2);
                const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

                if (distance < 150) { // Adjust the distance threshold as needed

                    button.style.transform = `translate(${distanceX * 0.5}px, ${distanceY * 0.5}px)`;
                    button.style.width = `135px`;
                    button.classList.remove("transition-transform");
                } else {
                    button.style.transform = `translate(0, 0)`;
                    button.style.width = `125px`;
                    button.classList.add("transition-transform");
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className={'w-screen h-screen flex justify-center'}>
            <div ref={loaderRef} style={{backgroundColor: '#0b1111'}} className={`overflow-hidden w-screen h-screen absolute duration-1000 ${loaderClass}`}><Loader onComplete={handleLoaderComplete} /></div>
            <div className={`flex flex-col items-center justify-center h-screen w-screen gap-8 transition-opacity duration-1000 ${isLoaderVisible ? 'opacity-0' : 'opacity-100'}`}>
                <h1 ref={titleRef} className={`text-9xl ${neima.className}`}>ELSSILA</h1>
                <div className={`flex flex-col items-center justify-center`}>
                    <p className={`text-4xl font-extrabold ${cabinet.className}`}>Vidéaste</p>
                    <p className={`text-2xl ${cabinet.className}`}>Portfolio</p>
                </div>
                <div ref={buttonRef} className={`border border-white p-4 rounded-full flex justify-center items-center absolute bottom-30 cursor-pointer`} style={{width: '125px', aspectRatio: '1/1'}}>
                    <p className={`text-xl  ${cabinet.className} `}>Entrer
                    </p>
                </div>
            </div>
            <style jsx type={"scss"}>{`
                .transition-transform {
                    transition: all 0.5s;
                }

                .compress {
                    animation: compress 1s forwards;
                }

                @keyframes compress {
                    50% {
                        transform: scale(1, 0.003);
                        background-color: #0b1111;
                        width: 100%;
                    }
                    100% {
                        transform: scale(1, 0.001);
                        background-color: white;
                    }
                }
            `}</style>
        </div>
    );
}