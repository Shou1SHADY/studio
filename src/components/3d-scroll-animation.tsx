"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const geometries = [
  new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32), // Increased size
  new THREE.IcosahedronGeometry(2.2), // Increased size
  new THREE.TorusGeometry(1.8, 0.5, 32, 100), // Increased size
  new THREE.ConeGeometry(1.9, 2.5, 64), // Increased size
];

const colors = [
  new THREE.Color(0x8A2BE2), // BlueViolet (matches new primary)
  new THREE.Color(0x00BFFF), // DeepSkyBlue
  new THREE.Color(0xFF00FF), // Magenta
  new THREE.Color(0x39FF14), // Neon Green
];

const ThreeScene = ({ className }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const targetRotation = useRef({ x: 0, y: 0 }).current;
  const targetColor = useRef(new THREE.Color(0x8A2BE2)).current;

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Object
    const material = new THREE.MeshStandardMaterial({
      color: colors[0],
      metalness: 0.8,
      roughness: 0.1,
      emissive: colors[0],
      emissiveIntensity: 0.2,
    });
    const mesh = new THREE.Mesh(geometries[0], material);
    meshRef.current = mesh;
    scene.add(mesh);
    camera.position.z = 4.5; // Moved camera closer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 50, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x8A2BE2, 100, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    // Scroll animation
    const elasticity = 0.05;

    function onScroll() {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollY / scrollHeight;

      // Update rotation based on scroll
      const rotationFactor = 6;
      targetRotation.y = scrollY * 0.002;
      targetRotation.x = scrollY * 0.001;

      // Update geometry and color
      const chapterCount = geometries.length;
      const chapterIndex = Math.min(Math.floor(scrollFraction * (chapterCount * 1.5)), chapterCount - 1);
      
      if (meshRef.current && meshRef.current.geometry !== geometries[chapterIndex]) {
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = geometries[chapterIndex];
      }
      targetColor.copy(colors[chapterIndex]);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial call
    
    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current) {
        const elapsedTime = clock.getElapsedTime();

        // Continuous rotation
        const continuousRotationX = Math.sin(elapsedTime * 0.2) * 0.25;
        const continuousRotationY = elapsedTime * 0.1;
        
        // Elastic rotation towards scroll target
        meshRef.current.rotation.x +=
          (targetRotation.x + continuousRotationX - meshRef.current.rotation.x) * elasticity;
        meshRef.current.rotation.y +=
          (targetRotation.y + continuousRotationY - meshRef.current.rotation.y) * elasticity;
        
        // Elastic color transition
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        material.color.lerp(targetColor, elasticity);
        material.emissive.lerp(targetColor, elasticity);

        pointLight2.color.lerp(targetColor, elasticity);
      }
      
      if(rendererRef.current && sceneRef.current && cameraRef.current) {
         rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      cameraRef.current.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      geometries.forEach(g => g.dispose());
      if(meshRef.current) {
        (meshRef.current.material as THREE.MeshStandardMaterial).dispose();
      }
      if(rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className={cn("w-full h-full", className)} />;
};

export default ThreeScene;
