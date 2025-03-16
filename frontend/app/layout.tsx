"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Layout from '@/components/dom/Layout';
import {ShaderGradient} from "@shadergradient/react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true });

export default function RootLayout({ children }: { children: any}) {
    const ref = useRef(null);

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout ref={ref}>

            <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
                <ShaderGradient
                    control='query'
                    urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=5.2&cPolarAngle=80&cameraZoom=9.1&color1=%23df1009&color2=%23560000&color3=%23E7541C&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=3&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-120&shader=defaults&type=plane&uAmplitude=0&uDensity=1.8&uFrequency=0&uSpeed=0.4&uStrength=0.7&uTime=8&wireframe=false'
                />
            </Scene>
            {children}


        </Layout>
        </body>
        </html>
    );
}