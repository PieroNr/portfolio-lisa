import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  uniform float time;
  uniform vec3 baseColor;
  uniform vec3 shadowColor;
  uniform vec3 lightDirection;

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  float grain(vec2 st) {
    return rand(floor(st * 100.0));
  }

  void main() {
    vec3 lightDir = normalize(lightDirection);
    float lightIntensity = clamp(dot(vNormal, lightDir), 0.0, 1.0);

    float g = grain(vUv + time * 0.1);

    vec3 color = mix(shadowColor, baseColor, lightIntensity);
    color += g * 0.1;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const RisingCylinders = ({
                                    cameraPosition,
                                    triggerPosition,
                                    radius = 0.1,
                                    count = 7,
                                }: {
    cameraPosition: THREE.Vector3;
    triggerPosition: THREE.Vector3;
    radius?: number;
    count?: number;
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const [visible, setVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const [cylinderData] = useState(() =>
        Array(count)
            .fill(0)
            .map(() => ({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 4,
                    0,
                    (Math.random() - 0.5) * 4
                ),
                height: Math.random() * 1.5 + 0.5,
            }))
    );

    const hoverableIndex = useMemo(() => Math.floor(Math.random() * count), [count]);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0 },
                baseColor: { value: new THREE.Color("#f10404") },
                shadowColor: { value: new THREE.Color("#a60000") },
                lightDirection: { value: new THREE.Vector3(1, 1, -1).normalize() },
            },
        });
    }, []);

    useFrame((_, delta) => {
        const distance = cameraPosition.distanceTo(triggerPosition);
        setVisible(distance < 5 ? true : distance > 7 ? false : visible);
        material.uniforms.time.value += delta;

        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const mesh = child as THREE.Mesh;
                const { height } = cylinderData[i];

                let targetScaleY = visible ? height : 0.001;

                // Si c’est le cylindre survolé, scale.y = 0 temporairement
                if (i === hoverableIndex && hoveredIndex === i) {
                    targetScaleY = height/2;
                }

                const newY = THREE.MathUtils.lerp(mesh.scale.y, targetScaleY, 0.1);
                mesh.scale.y = newY;
                mesh.position.y = newY / 2;
            });
        }
    });

    return (
        <group ref={groupRef} position={triggerPosition}>
            {cylinderData.map(({ position }, i) => (
                <mesh
                    key={i}
                    position={position}
                    material={material}
                    scale={[1, 0.001, 1]}
                    onPointerOver={() => {
                        if (i === hoverableIndex) setHoveredIndex(i);
                    }}
                    onPointerOut={() => {
                        if (i === hoverableIndex) setHoveredIndex(null);
                    }}
                >
                    <cylinderGeometry args={[radius, radius, 1, 16]} />
                </mesh>
            ))}
        </group>
    );
};