import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const pathPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 0, -5),
    new THREE.Vector3(10, 0, -10),
    new THREE.Vector3(15, 0, -10),
    new THREE.Vector3(20, 0, -15),
    new THREE.Vector3(20, 0, -20),
    new THREE.Vector3(15, 0, -25),
    new THREE.Vector3(5, 0, -20),
    new THREE.Vector3(0, 0, -10),
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(-10, 0, 5),
    new THREE.Vector3(-5, 0, 5),
    new THREE.Vector3(0, 0, 0),
];

const curve = new THREE.CatmullRomCurve3(pathPoints, false, "centripetal");
const numPoints = 300;
const curvePoints = curve.getPoints(numPoints);
const trackWidth = 1; // Distance entre les lignes

// Générer des lignes parallèles
const generateParallelLines = (offset: number) => {
    const parallelPoints = [];
    for (let i = 0; i < curvePoints.length - 1; i++) {
        const current = curvePoints[i];
        const next = curvePoints[i + 1];
        const direction = new THREE.Vector3().subVectors(next, current).normalize();
        const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
        const newPoint = new THREE.Vector3().copy(current).addScaledVector(perpendicular, offset);
        parallelPoints.push(newPoint);
    }
    return new THREE.BufferGeometry().setFromPoints(parallelPoints);
};

const CameraController = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const targetProgress = useRef(0);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            targetProgress.current = Math.min(1, Math.max(0, targetProgress.current - event.deltaY * 0.0005));
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    useFrame(({ camera }) => {
        if (!curve) return;

        // Interpolation pour un mouvement smooth
        setScrollProgress(prev => THREE.MathUtils.lerp(prev, targetProgress.current, 0.1));

        const position = curve.getPoint(scrollProgress);
        const lookAtPosition = curve.getPoint(Math.min(1, scrollProgress + 0.05));

        camera.position.set(position.x, position.y + 1, position.z);
        camera.lookAt(lookAtPosition);
    });

    return null;
};

const ThreeScene = () => {
    return (
        <Canvas>
            <CameraController />
            <ambientLight intensity={0.5} />
            {[0, trackWidth, -trackWidth, trackWidth * 2, -trackWidth * 2].map((offset, index) => (
                <line key={index}>
                    <bufferGeometry attach="geometry" {...generateParallelLines(offset)} />
                    <lineBasicMaterial attach="material" color="white" linewidth={10} />
                </line>
            ))}
        </Canvas>
    );
};

export default ThreeScene;