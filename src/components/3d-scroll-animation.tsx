"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const geometries = [
  new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32),
  new THREE.TorusGeometry(1.8, 0.5, 32, 100), 
];

const colors = [
  new THREE.Color(0x8A3FFC), // Vibrant Purple
  new THREE.Color(0xFF7F50), // Coral/Orange
];

const ThreeScene = ({ className }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    let isMounted = true;
    let animationFrameId: number;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(
      currentMount.clientWidth,
      currentMount.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Object
    const material = new THREE.MeshStandardMaterial({
      color: colors[0],
      metalness: 0.8,
      roughness: 0.1,
      emissive: colors[0],
      emissiveIntensity: 0.2,
    });
    const mesh = new THREE.Mesh(geometries[0], material);
    scene.add(mesh);
    camera.position.z = 4.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 50, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(colors[0], 100, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    const elasticity = 0.05;
    const targetRotation = { x: 0, y: 0 };
    const targetColor = new THREE.Color(colors[0]);

    function onScroll() {
      if (!isMounted) return;
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const totalFrames = 5; 
      const chapterIndex = (scrollY / scrollHeight) > (2.5 / totalFrames) ? 1 : 0;

      targetRotation.y = scrollY * 0.002;
      targetRotation.x = scrollY * 0.001;
      
      if (mesh.geometry !== geometries[chapterIndex]) {
        mesh.geometry.dispose();
        mesh.geometry = geometries[chapterIndex];
      }
      targetColor.copy(colors[chapterIndex]);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Give browser a moment to restore scroll position on back/forward navigation
    setTimeout(onScroll, 100);

    const clock = new THREE.Clock();
    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      const continuousRotationX = Math.sin(elapsedTime * 0.2) * 0.25;
      const continuousRotationY = elapsedTime * 0.1;
      
      mesh.rotation.x += (targetRotation.x + continuousRotationX - mesh.rotation.x) * elasticity;
      mesh.rotation.y += (targetRotation.y + continuousRotationY - mesh.rotation.y) * elasticity;
      
      material.color.lerp(targetColor, elasticity);
      material.emissive.lerp(targetColor, elasticity);
      pointLight2.color.lerp(targetColor, elasticity);
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!isMounted || !renderer) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      material.dispose();
      geometries.forEach(g => g.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={cn("w-full h-full", className)} />;
};

export default ThreeScene;
