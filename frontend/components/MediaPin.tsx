// components/MediaPin.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type MediaPinProps = {
    position: THREE.Vector3;
    height?: number; // Hauteur du trait, par défaut 2
};

export const MediaPin = ({ position, height = 2 }: MediaPinProps) => {
    const wave1 = useRef<THREE.Mesh>(null!);
    const wave2 = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const waves = [wave1.current, wave2.current];

        waves.forEach((wave, i) => {
            const delay = i * 1.2;
            const time = (t - delay) % 2;
            const scale = THREE.MathUtils.clamp(time, 0, 1) * 2;
            const opacity = 1 - scale / 2;

            wave.scale.setScalar(scale);
            (wave.material as THREE.MeshBasicMaterial).opacity = opacity;
        });
    });

    return (
        <group position={position}>
            {/* Line */}
            <mesh>
                <cylinderGeometry args={[0.002, 0.002, height, 8]} />
                <meshBasicMaterial color="white" />
            </mesh>

            {/* Sphere at bottom */}
            <mesh position={[0, height / 2, 0]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="white" />
            </mesh>

            {/* Waves */}
            <group position={[0, height / 2 + 0.01, 0]}>
                {[wave1, wave2].map((ref, i) => (
                    <mesh key={i} ref={ref}>
                        <ringGeometry args={[0.06, 0.07, 32]} />
                        <meshBasicMaterial
                            color="white"
                            transparent
                            opacity={0}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};