"use client";

import "./globals.css";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Layout from '@/components/dom/Layout';
import {ShaderGradient} from "@shadergradient/react";
import { Analytics } from "@vercel/analytics/react"

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);

    return (
        <html lang="en">
        <body>
        <Layout ref={ref}>

            <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
                <ShaderGradient
                    control='query'
                    urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.9&cAzimuthAngle=180&cDistance=4&cPolarAngle=80&cameraZoom=9.1&color1=%23ff0000&color2=%23000000&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=0.9&positionX=-1&positionY=-1&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-120&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=2.2&uFrequency=0&uSpeed=0.4&uStrength=0.5&uTime=8&wireframe=false'
                />
            </Scene>
            {children}
            <Analytics />

        </Layout>
        </body>
        </html>
    );
}