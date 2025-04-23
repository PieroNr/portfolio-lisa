import { useEffect, useRef, useState } from "react";
import {useFrame, useLoader, useThree} from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, VideoTexture } from "three";

type Props = {
    url: string;
    position: [number, number, number];
    scale?: [number, number, number];
};

export const MediaBillboard = ({ url, position, scale = [1.5, 1, 1], onClick }: Props & { onClick?: () => void }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [hovered, setHovered] = useState(false);
    const [videoTexture, setVideoTexture] = useState<VideoTexture | null>(null);
    const isVideo = url.endsWith(".mp4") || url.includes(".mp4");
    const { camera } = useThree();

    const  placeholderTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    const imageTexture = useLoader(TextureLoader, isVideo ? placeholderTexture : url);

    useEffect(() => {
        if (isVideo) {
            const video = document.createElement("video");
            video.src = url;
            video.crossOrigin = "anonymous";
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.play().catch((err) => console.warn("Video play failed:", err));

            const texture = new VideoTexture(video);
            texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            setVideoTexture(texture);
        }
    }, [url, isVideo]);

    const mediaTexture = isVideo ? videoTexture : imageTexture;
    const scaleVector = new THREE.Vector3(...scale);
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime;
        }
        if (meshRef.current) {
            meshRef.current.lookAt(camera.position);

            const s = hovered ? 1.1 : 1.0;

            // Interpolate current scale toward target
            meshRef.current.scale.lerp(new THREE.Vector3(
                scaleVector.x * s,
                scaleVector.y * s,
                scaleVector.z
            ), 0.1); // 0.1 = douceur (tu peux ajuster)
        }

    });

    if (!mediaTexture) return null;

    return (
        <mesh ref={meshRef} position={position} scale={scaleVector} onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={onClick}>
            <planeGeometry args={[1.5, 1, 32, 32]}/>
            <shaderMaterial
                ref={materialRef}
                uniforms={{
                    time: { value: 0 },
                    uTexture: { value: mediaTexture },
                }}
                vertexShader={`
          varying vec2 vUv;
          uniform float time;

          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.y * 10.0 + time * 2.0) * 0.05;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
                fragmentShader={`
          uniform sampler2D uTexture;
          varying vec2 vUv;

          void main() {
            vec4 texColor = texture2D(uTexture, vUv);
            if (texColor.a < 0.1) discard;
            gl_FragColor = texColor;
          }
        `}
                transparent
            />
        </mesh>
    );
};