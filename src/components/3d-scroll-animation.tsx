"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const ThreeScene = ({ className }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Object
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff9933, // Neon Orange
      metalness: 0.7,
      roughness: 0.3,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x7DF9FF, 10, 100); // Electric Blue
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0x4682B4, 10, 100); // Darker Blue
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Scroll animation variables
    let targetRotation = { x: 0, y: 0 };
    const elasticity = 0.05;

    function onScroll() {
      const scrollY = window.scrollY;
      const rotationFactor = 0.005;
      targetRotation.y = scrollY * rotationFactor;
      targetRotation.x = scrollY * rotationFactor * 0.5;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Elastic rotation
      torusKnot.rotation.x +=
        (targetRotation.x - torusKnot.rotation.x) * elasticity;
      torusKnot.rotation.y +=
        (targetRotation.y - torusKnot.rotation.y) * elasticity;
      
      // Elastic scale
      const scaleFactor = 1 + Math.sin(Date.now() * 0.001) * 0.05;
      torusKnot.scale.set(scaleFactor, scaleFactor, scaleFactor);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={cn("w-full h-full", className)} />;
};

export default ThreeScene;
