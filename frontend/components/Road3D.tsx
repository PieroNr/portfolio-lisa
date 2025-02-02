"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Road3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 🎯 Initialisation de la scène, de la caméra et du renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        // 🔹 Définition du chemin de la route
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(-2, 0, -3),
            new THREE.Vector3(2, 0, -6),
            new THREE.Vector3(5, 0, -9),
            new THREE.Vector3(5, 3, -12),
            new THREE.Vector3(8, 3, -15),
            new THREE.Vector3(6, -2, -22),
            new THREE.Vector3(2, 0, -30),
        ]);

        // 🔹 Génération de la géométrie de la route
        const roadWidth = 3;
        const segments = 300;
        const roadPoints: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const center = path.getPointAt(t);
            const tangent = path.getTangentAt(t).normalize();
            const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize(); // Perpendiculaire à la tangente

            const left = center.clone().addScaledVector(normal, roadWidth / 2);
            const right = center.clone().addScaledVector(normal, -roadWidth / 2);

            roadPoints.push(left, right);
        }

        const indices: number[] = [];
        for (let i = 0; i < segments; i++) {
            const a = i * 2;
            const b = i * 2 + 1;
            const c = (i + 1) * 2;
            const d = (i + 1) * 2 + 1;

            indices.push(a, b, c);
            indices.push(b, d, c);
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(roadPoints);
        geometry.setIndex(indices);
        geometry.computeVertexNormals();

        // 🔹 Matériel de la route (sans couleur, juste la géométrie)
        const material = new THREE.MeshStandardMaterial({ color: '#ff6f6f', side: THREE.DoubleSide });

        // 🔹 Création du mesh de la route
        const road = new THREE.Mesh(geometry, material);
        scene.add(road);

        // 🔹 Lumières
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // 🔹 Variables pour le smooth scroll
        const scrollState = { scrollY: 0 }; // On crée un objet pour stocker `scrollY`

        // 🔹 Fonction pour la gestion du scroll lissé
        function handleScroll() {
            const targetScrollY = window.scrollY / window.innerHeight;

            gsap.to(scrollState, {
                duration: 1, // La durée du mouvement lissé
                ease: "power2.out",
                scrollY: targetScrollY,
                onUpdate: () => {
                    const t = Math.min(scrollState.scrollY, 1);

                    const position = path.getPointAt(t);
                    const lookAtPosition = path.getPointAt(Math.min(t + 0.06, 1));
                    lookAtPosition.y += 1;

                    camera.position.copy(position.clone().add(new THREE.Vector3(0, 1.5, 0))); // Caméra au-dessus de la route
                    camera.lookAt(lookAtPosition);
                }
            });
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Position initiale

        // 🔹 Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // 🛑 Nettoyage lors du démontage du composant
        return () => {
            window.removeEventListener("scroll", handleScroll);
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }} />;
}