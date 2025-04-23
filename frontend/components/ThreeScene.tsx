import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MediaBillboard } from "./MediaBillboard";

const mediaUrls = [
    "test-img.jpg",
    "mel.mp4",
    "test-img.jpg",
    "mel.mp4",
    "test-img.jpg",
    "mel.mp4",
];

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

const CameraController = ({ selectedPosition }: { selectedPosition: THREE.Vector3 | null }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const targetProgress = useRef(0);
    const directionRef = useRef(1);
    const lookAtRef = useRef(new THREE.Vector3());
    const cameraTargetPosition = useRef<THREE.Vector3 | null>(null);
    const lookTargetPosition = useRef<THREE.Vector3 | null>(null);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (selectedPosition) return;
            const delta = event.deltaY * 0.00008;
            targetProgress.current = (targetProgress.current - delta + 1) % 1;
            directionRef.current = delta > 0 ? 1 : -1;
        };
        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, [selectedPosition]);

    useEffect(() => {
        if (selectedPosition) {
            // Direction du média → caméra (recul)
            const direction = new THREE.Vector3().subVectors(selectedPosition, new THREE.Vector3()).normalize();

            // Position finale de la caméra (5 unités en arrière)
            const offset = direction.clone().multiplyScalar(5);
            cameraTargetPosition.current = selectedPosition.clone().sub(offset);
            cameraTargetPosition.current.y = selectedPosition.y;

            // Point à regarder → un peu à droite du média
            const right = new THREE.Vector3(1, 0, 0); // direction droite globale
            const lookOffset = right.clone().multiplyScalar(2); // ajuste ici la "quantité de décalage"
            lookTargetPosition.current = selectedPosition.clone().add(lookOffset);
        }
    }, [selectedPosition]);

    useFrame(({ camera }) => {
        if (selectedPosition && cameraTargetPosition.current && lookTargetPosition.current) {
            // Caméra se déplace
            camera.position.lerp(cameraTargetPosition.current, 0.1);

            // Elle regarde vers une position légèrement à droite du média
            lookAtRef.current.lerp(lookTargetPosition.current, 0.1);
            camera.lookAt(lookAtRef.current);
            return;
        }

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
        lookAtRef.current.copy(lookAtPosition); // reset lerp target
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

const MediaAlongTrack = ({ onMediaClick }: { onMediaClick: (pos: THREE.Vector3) => void }) => {
    const spacing = Math.floor(curvePoints.length / mediaUrls.length);

    return (
        <>
            {mediaUrls.map((url, index) => {
                const point = curvePoints[index * spacing];
                const next = curvePoints[(index * spacing + 1) % curvePoints.length];
                const direction = new THREE.Vector3().subVectors(next, point).normalize();
                const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize();

                const offset = 4;
                const offsetDir = -2;
                const offsetPos = new THREE.Vector3().copy(point).addScaledVector(perpendicular, offset * offsetDir);
                offsetPos.y += 2;

                return (
                    <MediaBillboard
                        key={index}
                        url={url}
                        position={[offsetPos.x, offsetPos.y, offsetPos.z]}
                        scale={[4, 4, 3]}
                        onClick={() => onMediaClick(offsetPos.clone())}
                    />
                );
            })}
        </>
    );
};

const ThreeScene = () => {
    const [selectedMediaPosition, setSelectedMediaPosition] = useState<THREE.Vector3 | null>(null);

    return (
        <Canvas camera={{ position: [0, 10, 20], far: 1000 }}>
            <CameraController selectedPosition={selectedMediaPosition}/>
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
            <MediaAlongTrack onMediaClick={setSelectedMediaPosition} />
        </Canvas>
    );
};

export default ThreeScene;
