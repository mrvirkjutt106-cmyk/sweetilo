"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw, Eye } from "lucide-react";

export default function Hero3DCakeCanvas({ className = "" }) {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not supported for 3D Cake Canvas", e);
      return;
    }

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.2);
    camera.lookAt(0, 0.1, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Purple Rim light (Sweetilo Brand signature glow)
    const rimLight = new THREE.DirectionalLight(0x9333ea, 1.8);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Warm Gold Fill Light
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // ── CAKE MASTER GROUP ──
    const cakeGroup = new THREE.Group();
    cakeGroup.position.set(0, -0.4, 0);
    scene.add(cakeGroup);

    // 1. Pedestal / Golden Cake Stand
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xdfa143,
      metalness: 0.75,
      roughness: 0.25,
    });
    const standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.35, 2.2, 0.18, 48),
      standMat
    );
    standBase.position.y = -0.7;
    standBase.receiveShadow = true;
    cakeGroup.add(standBase);

    const standLip = new THREE.Mesh(
      new THREE.TorusGeometry(2.36, 0.05, 16, 48),
      standMat
    );
    standLip.rotation.x = Math.PI / 2;
    standLip.position.y = -0.62;
    cakeGroup.add(standLip);

    // 2. Bottom Tier: Royal Deep Purple Mirror Ganache (#4a196d)
    const tier1Mat = new THREE.MeshPhysicalMaterial({
      color: 0x4a196d,
      roughness: 0.2,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });
    const tier1 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 1.85, 1.15, 52),
      tier1Mat
    );
    tier1.position.y = -0.05;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeGroup.add(tier1);

    // Gold Pearl Border on Tier 1 base
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15,
    });
    const pearlCount = 28;
    const pearlRadius = 1.88;
    for (let i = 0; i < pearlCount; i++) {
      const angle = (i / pearlCount) * Math.PI * 2;
      const pearl = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 16, 16),
        pearlMat
      );
      pearl.position.set(
        Math.cos(angle) * pearlRadius,
        -0.58,
        Math.sin(angle) * pearlRadius
      );
      cakeGroup.add(pearl);
    }

    // 3. Top Tier: Soft Lavender Velvet Cream (#a855f7 / #c084fc)
    const tier2Mat = new THREE.MeshPhysicalMaterial({
      color: 0x9849cf,
      roughness: 0.32,
      metalness: 0.05,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
    });
    const tier2 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 0.95, 48),
      tier2Mat
    );
    tier2.position.y = 0.98;
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    cakeGroup.add(tier2);

    // Drip Accent around Top Tier Base
    const dripRingMat = new THREE.MeshPhysicalMaterial({
      color: 0xfff8ee,
      roughness: 0.2,
      clearcoat: 0.8,
    });
    const dripRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.34, 0.075, 16, 48),
      dripRingMat
    );
    dripRing.rotation.x = Math.PI / 2;
    dripRing.position.y = 0.52;
    cakeGroup.add(dripRing);

    // 4. Cream Rosettes along top edge
    const rosetteMat = new THREE.MeshStandardMaterial({
      color: 0xfffaed,
      roughness: 0.45,
    });
    const rosetteCount = 10;
    const rosetteRadius = 1.18;
    for (let i = 0; i < rosetteCount; i++) {
      const angle = (i / rosetteCount) * Math.PI * 2;
      const rosette = new THREE.Mesh(
        new THREE.TorusGeometry(0.12, 0.07, 12, 20),
        rosetteMat
      );
      rosette.rotation.x = Math.PI / 2;
      rosette.position.set(
        Math.cos(angle) * rosetteRadius,
        1.47,
        Math.sin(angle) * rosetteRadius
      );
      rosette.castShadow = true;
      cakeGroup.add(rosette);

      // Gold bead on each rosette
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        pearlMat
      );
      bead.position.set(
        Math.cos(angle) * rosetteRadius,
        1.55,
        Math.sin(angle) * rosetteRadius
      );
      cakeGroup.add(bead);
    }

    // 5. Centerpiece Crown: Fresh Glossy Cherries & Strawberries
    const cherryMat = new THREE.MeshPhysicalMaterial({
      color: 0xbe123c,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const cherryPositions = [
      [0, 1.62, 0],
      [0.35, 1.58, 0.25],
      [-0.32, 1.58, 0.18],
      [0.05, 1.58, -0.36],
    ];
    cherryPositions.forEach(([cx, cy, cz]) => {
      const cherry = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 20, 20),
        cherryMat
      );
      cherry.position.set(cx, cy, cz);
      cherry.castShadow = true;
      cakeGroup.add(cherry);

      // Tiny golden leaf/stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.18, 8),
        standMat
      );
      stem.position.set(cx + 0.02, cy + 0.16, cz);
      stem.rotation.z = -0.25;
      cakeGroup.add(stem);
    });

    // 6. Floating Parisian Macaron Orbiting Cake
    const macaronGroup = new THREE.Group();
    const macaronMat = new THREE.MeshStandardMaterial({
      color: 0xd8b4fe,
      roughness: 0.35,
    });
    const macaronCream = new THREE.MeshStandardMaterial({
      color: 0xfffaed,
      roughness: 0.5,
    });
    const shell1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.35, 0.12, 24),
      macaronMat
    );
    shell1.position.y = 0.08;
    const shell2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.38, 0.12, 24),
      macaronMat
    );
    shell2.position.y = -0.08;
    const filling = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 0.08, 24),
      macaronCream
    );
    macaronGroup.add(shell1, shell2, filling);
    macaronGroup.scale.set(0.9, 0.9, 0.9);
    cakeGroup.add(macaronGroup);

    // 7. Floating Cloud9 Cream Puff Orbiting on Opposite Side
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      roughness: 0.8,
    });
    const puffGroup = new THREE.Group();
    for (let p = 0; p < 5; p++) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.16 + p * 0.02, 16, 16),
        cloudMat
      );
      sphere.position.set(
        Math.sin(p * 1.5) * 0.18,
        Math.cos(p * 1.2) * 0.1,
        (p - 2) * 0.12
      );
      puffGroup.add(sphere);
    }
    cakeGroup.add(puffGroup);

    // 8. Sparkling 3D Star & Golden Dust Particle Field
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      scales[i] = Math.random() * 0.07 + 0.02;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    // ── INTERACTIVITY & ANIMATION ──
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let dragVelocity = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = normX * 0.45;
      targetY = normY * 0.3;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        dragVelocity = deltaX * 0.015;
        cakeGroup.rotation.y += dragVelocity;
        prevMouseX = e.clientX;
      }
    };

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // Scroll listener for 3D depth and parallax flight
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Inertial spin + subtle idle rotation
      if (!isDragging) {
        dragVelocity *= 0.92;
        cakeGroup.rotation.y += 0.007 + dragVelocity;
      }

      // Floating gentle wobble
      cakeGroup.position.y = -0.35 + Math.sin(elapsedTime * 1.6) * 0.08;
      cakeGroup.rotation.x = 0.22 + mouseY * 0.4;
      cakeGroup.rotation.z = -mouseX * 0.25;

      // Orbiting macaron
      const macaronAngle = elapsedTime * 0.9;
      macaronGroup.position.set(
        Math.cos(macaronAngle) * 2.8,
        0.4 + Math.sin(elapsedTime * 2.1) * 0.25,
        Math.sin(macaronAngle) * 2.8
      );
      macaronGroup.rotation.y += 0.02;
      macaronGroup.rotation.x = Math.sin(elapsedTime) * 0.4;

      // Orbiting cloud puff
      const puffAngle = elapsedTime * 0.7 + Math.PI;
      puffGroup.position.set(
        Math.cos(puffAngle) * 2.5,
        -0.2 + Math.cos(elapsedTime * 1.8) * 0.2,
        Math.sin(puffAngle) * 2.5
      );
      puffGroup.rotation.y -= 0.015;

      // Scroll reactive camera shift
      const scrollFactor = Math.min(scrollY / 800, 1);
      camera.position.y = 1.2 - scrollFactor * 0.6;
      camera.position.z = 7.2 - scrollFactor * 0.8;
      camera.lookAt(0, 0.1 - scrollFactor * 0.2, 0);

      // Shimmering particle rotation
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      // Clean disposal
      renderer.dispose();
      scene.clear();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative w-full aspect-square max-w-[360px] sm:max-w-[440px] lg:max-w-[500px] select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none relative z-10"
        title="Drag horizontally to spin Sweetilo's 3D Signature Cake"
      />

      {/* Floating 3D Interaction Pill badge */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/80 shadow-[0_8px_20px_rgba(74,25,109,0.12)] text-[#4a196d] text-[11px] sm:text-xs font-bold tracking-wide">
          <RotateCw className="w-3.5 h-3.5 text-[#f59e0b] animate-spin" style={{ animationDuration: "6s" }} />
          <span>{isInteracting ? "Spinning 3D Cake..." : "Drag to Spin 3D Cake"}</span>
          <Sparkles className="w-3 h-3 text-[#9333ea]" />
        </div>
      </div>
    </div>
  );
}
