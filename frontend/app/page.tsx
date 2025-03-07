"use client";
import {useEffect, useState} from "react";
import localFont from "next/font/local";
import Loader from "@/components/Loader";

const neima = localFont({
    src: [{path: "../public/fonts/Neima.ttf"}], display: "swap",
});

const cabinet = localFont({
    src: [{path: "../public/fonts/Cabinet.ttf", weight: "800",},
        {path: "../public/fonts/Cabinet.ttf", weight: "400"},
    ],
    display: "swap",
});

export default function Home() {
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [loaderClass, setLoaderClass] = useState("");

    const handleLoaderComplete = () => {
        setLoaderClass("anim");

    };

    return (
        <div className={'w-screen h-screen'}>
            {isLoaderVisible && <div style={{ '--i': 1 }} className={loaderClass} ><Loader onComplete={handleLoaderComplete} /></div>}
            <div className={`flex flex-col items-center justify-center h-screen w-screen gap-8 transition-opacity duration-1000`} style={{ '--i': 0 }}>
                <h1 className={`text-9xl ${neima.className}`}>ELSSILA</h1>
                <div className={`flex flex-col items-center justify-center`}>
                    <p className={`text-4xl font-extrabold ${cabinet.className}`}>Vidéaste</p>
                    <p className={`text-2xl ${cabinet.className}`}>Portfolio</p>
                </div>
            </div>
            <style jsx type={"scss"}>{`
                $t: 1s;
                $s: 2em;

                @property --r {
                    syntax: '<percentage>';
                    initial-value: 0%;
                    inherits: false
                }

                @keyframes lyr { 50% { z-index: 1 } }
                @keyframes opacityAndDisplay { 
                    0% { opacity: 1; display: block }
                    99% { opacity: 0; display: block }
                    100% { opacity: 0; display: none }
                }

                .anim {
                    animation: opacityAndDisplay 1s forwards;
                    
                    
                }

            `}</style>
        </div>
    );
}



