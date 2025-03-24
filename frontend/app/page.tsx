"use client";
import { useState, useRef, useEffect } from "react";
import Loader from "@/components/Loader";
import Links from "@/components/Links";

export default function Home() {
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);
    const [loaderClass, setLoaderClass] = useState("");
    const [isButtonClicked, setIsButtonClicked] = useState(false);

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

            if (loaderRef.current) {
                loaderRef.current.style.transform = "scale(1, 0.001)";
                loaderRef.current.style.backgroundColor = "white";
            }
        }, 1000); // Duration of the compression animation
    };

    const handleButtonClick = () => {
        setIsButtonClicked(true);
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            //chech size of screen
            if (buttonRef.current && window.innerWidth > 768) {
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
            <div ref={loaderRef} style={{backgroundColor: '#000'}} className={`loader-bg overflow-hidden w-screen h-screen absolute duration-1000 ${loaderClass} ${isButtonClicked ? 'hide' : ''}`}><Loader onComplete={handleLoaderComplete} /></div>
            <div className={`flex flex-col items-center justify-center h-screen w-screen gap-8 transition-opacity duration-2000 ${isLoaderVisible ? 'opacity-0' : 'opacity-100'}`}>
                <h1 ref={titleRef} className={`lg:text-9xl md:text-9xl text-7xl font-title ${isButtonClicked ? 'hide' : ''}`}>ELSSILA</h1>
                <div className={`flex flex-col items-center justify-center ${isButtonClicked ? 'hide' : ''}`}>
                    <p className={`masked text-4xl font-extrabold font-body`}>Vidéaste</p>
                    <p className={`masked text-2xl font-body`}>Portfolio</p>

                </div>
                <div ref={buttonRef} onClick={handleButtonClick} className={`border hover:border-white border-gray-400 p-4 rounded-full flex justify-center items-center absolute bottom-30 cursor-pointer border-animation hover:text-white text-gray-400 ${isButtonClicked ? 'hide-slow' : ''}`} style={{width: '125px', aspectRatio: '1/1'}}>
                    <p className={`text-xl duration-500 font-semibold font-body `}>Entrer
                    </p>
                </div>
                <div className={`absolute bottom-10 right-8`}><Links/></div>
            </div>
            <style jsx type={"scss"}>{`
                
                @keyframes grain {
                    0%, 100% { transform:translate(0, 0) }
                    10% { transform:translate(-5%, -10%) }
                    20% { transform:translate(-15%, 5%) }
                    30% { transform:translate(5%, -25%) }
                    40% { transform:translate(-5%, 25%) }
                    50% { transform:translate(-15%, 10%) }
                    60% { transform:translate(15%, 0%) }
                    70% { transform:translate(0%, 15%) }
                    80% { transform:translate(5%, 35%) }
                    90% { transform:translate(-10%, 10%) }
                }
                
                .transition-transform {
                    transition: all 0.5s;
                }

                .compress {
                    animation: compress 1s forwards;
                }
                
                .masked {
                    mask: element(#mask);
                    mask-size: 100%;
                }
                

                .border-animation::before {
                    content: '';
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    width: calc(100% + 20px);
                    height: calc(100% + 20px);
                    border: 1px solid darkgrey;
                    border-radius: 50%;
                    opacity: 0;
                    transition: opacity 0.5s, transform 0.5s;
                    transform: scale(0.8);
                    animation: sonarEffect 2s infinite;
                }

                .border-animation:hover::before {
                    border-color: white;
                }
                
                .expand::before {
                    animation: expandEffect 3s forwards;
                }
                
                .hide {
                    animation: disappearEffect 1s forwards;
                }

                .hide-slow {
                    animation: disappearEffect 2s cubic-bezier(1,.01,.76,1) forwards;
                }
                
                @keyframes sonarEffect {
                    0% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.1);
                    }
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

                @keyframes expandEffect {
                    100% {
                        opacity: 0.5;
                        transform: scale(7);
                    }
                }

                @keyframes disappearEffect {
                    0% {
                        opacity: 1;
                    }
                    99%
                    {
                        opacity: 0;
                    }
                    100% {
                        opacity: 0;
                        display: none ;
                    }
                }
            `}</style>
        </div>
    );
}