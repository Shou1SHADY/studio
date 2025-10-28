"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type ThreeSceneProps = {
  className?: string;
  modelUrl?: string; // e.g. "/my-model.glb" in public
};

const ACCENT_COLOR = new THREE.Color(0x8A3FFC);

const ThreeScene = ({ className, modelUrl = "/mystic_inquisitor.glb" }: ThreeSceneProps) => {
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const keyLight = new THREE.PointLight(0xffffff, 60, 200);
    keyLight.position.set(5, 5, 8);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(ACCENT_COLOR, 80, 200);
    fillLight.position.set(-8, -6, -6);
    scene.add(fillLight);

    camera.position.set(0, -2, 5);

    let modelRoot: THREE.Object3D | null = null;

    // Lazy-load GLTFLoader to avoid SSR issues
    const loadModel = async () => {
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const loader = new GLTFLoader();

      return new Promise<void>((resolve, reject) => {
        loader.load(
          modelUrl,
          (gltf) => {
            if (!isMounted) return resolve();
            modelRoot = gltf.scene;
            modelRoot.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (Array.isArray((mesh.material as any))) {
                  (mesh.material as any).forEach((m: THREE.Material) => {
                    const std = m as THREE.MeshStandardMaterial;
                    if (std && "emissive" in std) {
                      std.emissive = ACCENT_COLOR.clone();
                      std.emissiveIntensity = 0.15;
                    }
                  });
                } else {
                  const std = mesh.material as THREE.MeshStandardMaterial;
                  if (std && "emissive" in std) {
                    std.emissive = ACCENT_COLOR.clone();
                    std.emissiveIntensity = 0.15;
                  }
                }
              }
            });

            // Center and scale model to 70% of page size
            const box = new THREE.Box3().setFromObject(modelRoot);
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const scale = 4.0 / maxDim; // Increased from 2.2 to 7.0 for 70% page size
            modelRoot.scale.setScalar(scale);
            
            // Position model in 3rd quarter (near bottom) of the page
            const center = box.getCenter(new THREE.Vector3());
            modelRoot.position.sub(center.multiplyScalar(scale));
            modelRoot.position.y = -2.5; // Move model further down to appear in 3rd quarter

            scene.add(modelRoot);
            resolve();
          },
          undefined,
          (err) => reject(err)
        );
      });
    };

    loadModel().catch(() => {
      // keep the scene empty on error
    });

    const targetRotation = { x: 0, y: 0 };
    const elasticity = 0.05;
    const targetColor = ACCENT_COLOR.clone();

    function onScroll() {
      if (!isMounted) return;
      const scrollY = window.scrollY;
      targetRotation.y = scrollY * 0.002;
      targetRotation.x = scrollY * 0.001;
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
      const continuousRotationY = elapsedTime * 0.3; // Increased from 0.1 to 0.3 for faster rotation
      
      if (modelRoot) {
        modelRoot.rotation.x += (targetRotation.x + continuousRotationX - modelRoot.rotation.x) * elasticity;
        modelRoot.rotation.y += (targetRotation.y + continuousRotationY - modelRoot.rotation.y) * elasticity;
      }
      
      fillLight.color.lerp(targetColor, elasticity);
      
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

      if (modelRoot) {
        scene.remove(modelRoot);
      }

      renderer.dispose();
    };
  }, [modelUrl]);

  return <div ref={mountRef} className={cn("w-full h-full", className)} />;
};

export default ThreeScene;
