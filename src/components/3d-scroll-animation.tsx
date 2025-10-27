"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const geometries = [
  new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32), // Increased size
  new THREE.TorusGeometry(1.8, 0.5, 32, 100), // Increased size
];

const colors = [
  new THREE.Color(0x87CEFA), // LightSkyBlue
  new THREE.Color(0xADD8E6), // LightBlue
];

const ThreeScene = ({ className }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const targetRotation = useRef({ x: 0, y: 0 }).current;
  const targetColor = useRef(new THREE.Color(0x87CEFA)).current;

  useEffect(() => {
    if (!mountRef.current) return;
    
    let animationFrameId: number;
    let isMounted = true;

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

    const pointLight2 = new THREE.PointLight(0x87CEFA, 100, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    const elasticity = 0.05;

    function onScroll() {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const totalFrames = 5; 
      
      const chapterIndex = (scrollY / scrollHeight) > (2.5 / totalFrames) ? 1 : 0;

      targetRotation.y = scrollY * 0.002;
      targetRotation.x = scrollY * 0.001;
      
      if (meshRef.current && meshRef.current.geometry !== geometries[chapterIndex]) {
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = geometries[chapterIndex];
      }
      targetColor.copy(colors[chapterIndex]);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    
    setTimeout(onScroll, 100);

    const clock = new THREE.Clock();
    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      if (meshRef.current) {
        const elapsedTime = clock.getElapsedTime();

        const continuousRotationX = Math.sin(elapsedTime * 0.2) * 0.25;
        const continuousRotationY = elapsedTime * 0.1;
        
        meshRef.current.rotation.x +=
          (targetRotation.x + continuousRotationX - meshRef.current.rotation.x) * elasticity;
        meshRef.current.rotation.y +=
          (targetRotation.y + continuousRotationY - meshRef.current.rotation.y) * elasticity;
        
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

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      
      if (rendererRef.current) {
        if (mountRef.current) {
            mountRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }

      if (meshRef.current) {
        (meshRef.current.material as THREE.Material).dispose();
      }
      geometries.forEach(g => g.dispose());

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      meshRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className={cn("w-full h-full", className)} />;
};

export default ThreeScene;
