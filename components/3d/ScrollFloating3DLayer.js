"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ScrollFloating3DLayer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 10;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x9333ea, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Floating Treat 1: Gold Star 3D Geometry
    const starGeo = new THREE.OctahedronGeometry(0.28, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
    });

    const floatingStars = [];
    const starCount = 14;
    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 6
      );
      star.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      star.scale.setScalar(Math.random() * 0.6 + 0.4);
      scene.add(star);
      floatingStars.push({
        mesh: star,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        initialY: star.position.y,
        speed: Math.random() * 0.005 + 0.002,
      });
    }

    // Floating Treat 2: Lavender Confection Pearls
    const pearlGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xd8b4fe,
      roughness: 0.3,
      metalness: 0.2,
    });
    const floatingPearls = [];
    const pearlCount = 12;
    for (let i = 0; i < pearlCount; i++) {
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8
      );
      pearl.scale.setScalar(Math.random() * 0.7 + 0.4);
      scene.add(pearl);
      floatingPearls.push({
        mesh: pearl,
        initialY: pearl.position.y,
        speed: Math.random() * 0.006 + 0.003,
      });
    }

    // Scroll & Mouse Tracking
    let scrollY = 0;
    let targetScroll = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      scrollY += (targetScroll - scrollY) * 0.08;

      // Parallax shift based on scroll
      camera.position.y = -scrollY * 0.0035;
      camera.position.x = mouseX * 0.3;

      // Floating Stars animation
      floatingStars.forEach((item, index) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.position.y =
          item.initialY + Math.sin(elapsed * 1.5 + index) * 0.35;
      });

      // Floating Pearls animation
      floatingPearls.forEach((item, index) => {
        item.mesh.position.y =
          item.initialY + Math.cos(elapsed * 1.2 + index) * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      renderer.dispose();
      scene.clear();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-75"
    />
  );
}
