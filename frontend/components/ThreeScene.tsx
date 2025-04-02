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

const generateParallelLines = (offset: number) => {
    const parallelPoints = curvePoints.map((point, i) => {
        if (i === curvePoints.length - 1) return null;
        const current = point;
        const next = curvePoints[i + 1];
        const direction = new THREE.Vector3().subVectors(next, current).normalize();
        const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
        return new THREE.Vector3().copy(current).addScaledVector(perpendicular, offset);
    }).filter((point): point is THREE.Vector3 => point !== null);
    return new THREE.BufferGeometry().setFromPoints(parallelPoints);
};

const CameraController = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const targetProgress = useRef(0);
    const directionRef = useRef(1);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            const delta = event.deltaY * 0.00008;
            targetProgress.current = (targetProgress.current - delta + 1) % 1;
            directionRef.current = delta > 0 ? 1 : -1;
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    useFrame(({ camera }) => {
        if (!curve) return;

        setScrollProgress(prev =>
            directionRef.current > 0
                ? (prev + ((targetProgress.current - prev + 1) % 1 - 1) * 0.1) % 1
                : (prev + (targetProgress.current - prev + 1) % 1 * 0.1) % 1
        );

        const position = curve.getPoint(scrollProgress);
        const lookAtPosition = curve.getPoint((scrollProgress + 0.01) % 1);
        lookAtPosition.y += 1;

        camera.position.set(position.x, position.y + 1, position.z);
        camera.lookAt(lookAtPosition);
    });

    return null;
};

const MovingSpheres = () => {
    const [time, setTime] = useState(0);
    const colorRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

    useFrame(() => {
        setTime((prev) => prev - 0.03);

        colorRefs.current.forEach((material: THREE.MeshStandardMaterial | null, index) => {
            if (material) {
                const t = (Math.sin(time + index * 0.2) + 1) / 2; // Normaliser entre 0 et 1
                material.color.lerpColors(new THREE.Color("grey"), new THREE.Color("white"), t);
            }
        });
    });

    return (
        <>
            {curvePoints.map((point, index) => (
                <mesh key={index} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.02, 32, 32]} />
                    <meshStandardMaterial ref={(el) => (colorRefs.current[index] = el as THREE.MeshStandardMaterial | null)} />                </mesh>
            ))}
        </>
    );
};

const ThreeScene = () => {
    return (
        <Canvas camera={{ position: [0, 10, 20], far: 1000 }}>
            <CameraController />
            <ambientLight intensity={0.5} />
            {[trackWidth, -trackWidth, trackWidth * 2, -trackWidth * 2].map((offset, index) => (
                <line key={index}  width={10}>
                    <bufferGeometry attach="geometry" {...generateParallelLines(offset)} />
                    <lineBasicMaterial
                        attach="material"
                        color="white"
                        linewidth={10}
                        onUpdate={self => self.needsUpdate = true}
                    />
                </line>
            ))}
            <MovingSpheres />
        </Canvas>
    );
};

export default ThreeScene;
