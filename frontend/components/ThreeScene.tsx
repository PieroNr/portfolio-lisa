import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const pathPoints = [
    new THREE.Vector3(-20, 0, 0),
    new THREE.Vector3(-15, 0, -10),
    new THREE.Vector3(-10, 0, -20),
    new THREE.Vector3(0, 0, -25),
    new THREE.Vector3(10, 0, -20),
    new THREE.Vector3(15, 0, -10),
    new THREE.Vector3(20, 0, 0),
    new THREE.Vector3(15, 0, 10),
    new THREE.Vector3(10, 0, 20),
    new THREE.Vector3(0, 0, 25),
    new THREE.Vector3(-10, 0, 20),
    new THREE.Vector3(-15, 0, 10),
];

const curve = new THREE.CatmullRomCurve3(pathPoints, true, "centripetal");
const numPoints = 300;
const curvePoints = curve.getPoints(numPoints);
const trackWidth = 1;

const generateParallelLines = (offset) => {
    const parallelPoints = curvePoints.map((point, i) => {
        if (i === curvePoints.length - 1) return null;
        const current = point;
        const next = curvePoints[i + 1];
        const direction = new THREE.Vector3().subVectors(next, current).normalize();
        const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
        return new THREE.Vector3().copy(current).addScaledVector(perpendicular, offset);
    }).filter(Boolean);
    return new THREE.BufferGeometry().setFromPoints(parallelPoints);
};

const CameraController = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const targetProgress = useRef(0);
    const directionRef = useRef(1); // 1 = avant, -1 = arrière

    useEffect(() => {
        const handleWheel = (event) => {
            const delta = event.deltaY * 0.00008;
            targetProgress.current = (targetProgress.current - delta + 1) % 1;

            // Détection du sens du déplacement
            directionRef.current = delta > 0 ? 1 : -1;
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    useFrame(({ camera }) => {
        if (!curve) return;

        // Interpolation conditionnelle
        setScrollProgress(prev =>
            directionRef.current > 0
                ? (prev + ((targetProgress.current - prev + 1) % 1 - 1) * 0.1) % 1
                : (prev + (targetProgress.current - prev + 1) % 1 * 0.1) % 1
        );

        const position = curve.getPoint(scrollProgress);
        const lookAtPosition = curve.getPoint((scrollProgress + 0.01) % 1);
        lookAtPosition.y += 1; // Lève la caméra

        camera.position.set(position.x, position.y + 1, position.z);
        camera.lookAt(lookAtPosition);
    });

    return null;
};

const ThreeScene = () => {
    return (
        <Canvas camera={{ position: [0, 10, 20], far: 1000 }}>
            <CameraController />
            <ambientLight intensity={0.5} />
            {[0, trackWidth, -trackWidth, trackWidth * 2, -trackWidth * 2].map((offset, index) => (
                <line key={index} frustumCulled={false}>
                    <bufferGeometry attach="geometry" {...generateParallelLines(offset)} />
                    <lineBasicMaterial
                        attach="material"
                        color="white"
                        linewidth={10}
                        onUpdate={self => self.needsUpdate = true}
                    />
                </line>
            ))}
        </Canvas>
    );
};

export default ThreeScene;