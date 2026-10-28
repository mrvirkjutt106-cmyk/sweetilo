"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw, Check, MessageCircle, ShieldCheck, Heart } from "lucide-react";

// Security: WhatsApp Number from env
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923008457933";

const GLAZE_PRESETS = [
  { id: "royal-purple", name: "Royal Sweetilo Ganache", color: 0x4a196d, hex: "#4a196d", desc: "COTHM Signature Belgian Couverture infused with lavender bloom" },
  { id: "cloud-lavender", name: "Cloud9 Lavender Dream", color: 0x9333ea, hex: "#9333ea", desc: "Velvety French buttercream with natural violet syrup" },
  { id: "noir-chocolate", name: "Belgian Noir Truffle", color: 0x22102e, hex: "#22102e", desc: "70% Dark Callebaut ganache with silk mirror gloss" },
  { id: "rose-raspberry", name: "Rose Quartz Berry", color: 0xdb2777, hex: "#db2777", desc: "Tart raspberry coulis reduction with edible rose petal notes" },
  { id: "gold-honeycomb", name: "Honeycomb Amber Gold", color: 0xd97706, hex: "#d97706", desc: "Raw wild honeycomb caramel and Madagascar vanilla" },
];

const TIERS = [
  { id: "1", label: "1 Tier (1.5 lbs)", desc: "Serves 6–8 people", basePrice: 3200 },
  { id: "2", label: "2 Tiers (3 lbs)", desc: "Celebration • Serves 12–16", basePrice: 5800 },
  { id: "3", label: "3 Tiers (5 lbs)", desc: "Grand Gala • Serves 24+", basePrice: 8900 },
];

export default function Interactive3DCakeStudio() {
  const mountRef = useRef(null);
  const [selectedGlaze, setSelectedGlaze] = useState(GLAZE_PRESETS[0]);
  const [tierCount, setTierCount] = useState("2");
  const [hasGoldPearls, setHasGoldPearls] = useState(true);
  const [hasBerries, setHasBerries] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  // References to 3D objects for dynamic updating without re-instantiating the WebGL context
  const objectsRef = useRef({
    tier1Mesh: null,
    tier2Mesh: null,
    tier3Mesh: null,
    pearlGroup: null,
    berryGroup: null,
    cakeGroup: null,
  });

  // Calculate dynamic price
  const totalPrice = useMemo(() => {
    const tier = TIERS.find((t) => t.id === tierCount) || TIERS[1];
    let price = tier.basePrice;
    if (hasGoldPearls) price += 350;
    if (hasBerries) price += 450;
    return price;
  }, [tierCount, hasGoldPearls, hasBerries]);

  // Construct WhatsApp order link
  const whatsappUrl = useMemo(() => {
    const tier = TIERS.find((t) => t.id === tierCount) || TIERS[1];
    const toppings = [
      hasGoldPearls ? "24k Gold Pearls" : null,
      hasBerries ? "Fresh Berries" : null,
      "Buttercream Rosettes",
    ].filter(Boolean).join(", ");

    const message = `Hi Sweetilo! 🎂 I designed a custom cake in your 3D Studio:
• Tier: ${tier.label}
• Glaze: ${selectedGlaze.name}
• Toppings: ${toppings}
• Estimated Total: ₨${totalPrice.toLocaleString()}

Could you confirm availability for delivery?`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [selectedGlaze, tierCount, hasGoldPearls, hasBerries, totalPrice]);

  // Update 3D materials and visibility when state changes
  useEffect(() => {
    const { tier1Mesh, tier2Mesh, tier3Mesh, pearlGroup, berryGroup } = objectsRef.current;
    if (!tier1Mesh) return;

    // Update glaze color
    tier1Mesh.material.color.setHex(selectedGlaze.color);
    if (tier2Mesh) {
      tier2Mesh.material.color.setHex(selectedGlaze.color);
      tier2Mesh.visible = tierCount === "2" || tierCount === "3";
    }
    if (tier3Mesh) {
      tier3Mesh.material.color.setHex(selectedGlaze.color);
      tier3Mesh.visible = tierCount === "3";
    }

    if (pearlGroup) pearlGroup.visible = hasGoldPearls;
    if (berryGroup) berryGroup.visible = hasBerries;
  }, [selectedGlaze, tierCount, hasGoldPearls, hasBerries]);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not available for 3D Studio", e);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 7.5);
    camera.lookAt(0, 0.2, 0);

    // Warm Bakery Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(6, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x9333ea, 2.0);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.4);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // ── MASTER CAKE GROUP ──
    const cakeGroup = new THREE.Group();
    cakeGroup.position.set(0, -0.5, 0);
    scene.add(cakeGroup);
    objectsRef.current.cakeGroup = cakeGroup;

    // Stand
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xdfa143,
      metalness: 0.8,
      roughness: 0.22,
    });
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 2.3, 0.2, 48),
      standMat
    );
    stand.position.y = -0.75;
    stand.receiveShadow = true;
    cakeGroup.add(stand);

    // Shared Glaze Material
    const glazeMat = new THREE.MeshPhysicalMaterial({
      color: selectedGlaze.color,
      roughness: 0.18,
      metalness: 0.08,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
    });

    // Tier 1 (Base Tier)
    const tier1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2.0, 2.0, 1.1, 48),
      glazeMat
    );
    tier1.position.y = -0.1;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeGroup.add(tier1);
    objectsRef.current.tier1Mesh = tier1;

    // Tier 2 (Middle Tier)
    const tier2Mat = glazeMat.clone();
    const tier2 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 0.95, 48),
      tier2Mat
    );
    tier2.position.y = 0.92;
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    tier2.visible = tierCount === "2" || tierCount === "3";
    cakeGroup.add(tier2);
    objectsRef.current.tier2Mesh = tier2;

    // Tier 3 (Top Tier for Grand Celebration)
    const tier3Mat = glazeMat.clone();
    const tier3 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 0.8, 48),
      tier3Mat
    );
    tier3.position.y = 1.78;
    tier3.castShadow = true;
    tier3.receiveShadow = true;
    tier3.visible = tierCount === "3";
    cakeGroup.add(tier3);
    objectsRef.current.tier3Mesh = tier3;

    // Buttercream Rosettes on Top Edge
    const rosetteMat = new THREE.MeshStandardMaterial({
      color: 0xfffaed,
      roughness: 0.45,
    });
    const rosetteGroup = new THREE.Group();
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const rosette = new THREE.Mesh(
        new THREE.TorusGeometry(0.12, 0.07, 12, 20),
        rosetteMat
      );
      rosette.rotation.x = Math.PI / 2;
      rosette.position.set(Math.cos(angle) * 1.25, 1.4, Math.sin(angle) * 1.25);
      rosetteGroup.add(rosette);
    }
    cakeGroup.add(rosetteGroup);

    // Gold Pearls Group
    const pearlGroup = new THREE.Group();
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15,
    });
    const pearlCount = 30;
    for (let i = 0; i < pearlCount; i++) {
      const angle = (i / pearlCount) * Math.PI * 2;
      const pearl = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 16, 16),
        pearlMat
      );
      pearl.position.set(Math.cos(angle) * 2.04, -0.62, Math.sin(angle) * 2.04);
      pearlGroup.add(pearl);
    }
    cakeGroup.add(pearlGroup);
    objectsRef.current.pearlGroup = pearlGroup;

    // Berries Group
    const berryGroup = new THREE.Group();
    const cherryMat = new THREE.MeshPhysicalMaterial({
      color: 0xbe123c,
      roughness: 0.15,
      clearcoat: 1.0,
    });
    const berryCoords = [
      [0, 1.55, 0],
      [0.35, 1.5, 0.22],
      [-0.32, 1.5, 0.18],
      [0.05, 1.5, -0.32],
    ];
    berryCoords.forEach(([bx, by, bz]) => {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 18), cherryMat);
      b.position.set(bx, by, bz);
      b.castShadow = true;
      berryGroup.add(b);
    });
    cakeGroup.add(berryGroup);
    objectsRef.current.berryGroup = berryGroup;

    // Golden Particles
    const particleCount = 100;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 8;
      pPos[i + 1] = (Math.random() - 0.5) * 5 + 0.5;
      pPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Pointer Interaction (Drag-to-spin)
    let isDragging = false;
    let prevX = 0;
    let velocity = 0;

    const onDown = (e) => {
      isDragging = true;
      setIsRotating(true);
      prevX = e.clientX;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      velocity = deltaX * 0.015;
      cakeGroup.rotation.y += velocity;
      prevX = e.clientX;
    };

    const onUp = () => {
      isDragging = false;
      setTimeout(() => setIsRotating(false), 500);
    };

    container.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Loop
    let clock = new THREE.Clock();
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        velocity *= 0.94;
        cakeGroup.rotation.y += 0.006 + velocity;
      }

      cakeGroup.position.y = -0.45 + Math.sin(elapsed * 1.4) * 0.06;
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);

      renderer.dispose();
      scene.clear();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative py-14 sm:py-24 bg-gradient-to-b from-white via-[#FAF7F2] to-white overflow-hidden border-t border-purple-100/60">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (Centralized) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EFFC] border border-purple-200/80 mb-3 text-[#4a196d] text-xs font-black uppercase tracking-[0.16em]">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Interactive 3D Studio</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-5xl font-extrabold text-[#1B0D24] tracking-tight leading-tight">
            Design Your Dream Cake in{" "}
            <span className="text-[#4a196d] font-script font-normal text-3xl sm:text-6xl">Real 3D</span>
          </h2>
          <p className="mt-2.5 text-stone-600 text-xs sm:text-base leading-relaxed max-w-lg mx-auto">
            Customize our signature gateau live: switch artisan glazes, choose tier heights, add 24k gold pearls, and order directly on WhatsApp with your exact specs.
          </p>
        </div>

        {/* Studio Workspace: Left 3D Viewport, Right Customization Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-white/80 backdrop-blur-xl rounded-[28px] sm:rounded-[40px] border border-purple-200/80 shadow-[0_20px_50px_rgba(74,25,109,0.08)] p-3.5 sm:p-8 lg:p-10">

          {/* 3D Viewport Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[480px] rounded-[28px] overflow-hidden bg-gradient-to-b from-[#F6EFFC]/60 to-[#FFF8F0]/80 border border-purple-100 flex items-center justify-center shadow-inner">

              {/* 3D WebGL Canvas */}
              <div
                ref={mountRef}
                className="w-full h-full cursor-grab active:cursor-grabbing touch-none relative z-10"
                title="Drag horizontally to spin 3D Cake"
              />

              {/* Interaction Hint Overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-purple-200/70 shadow-md text-[#4a196d] text-xs font-bold">
                  <RotateCw className="w-3.5 h-3.5 text-[#f59e0b] animate-spin" style={{ animationDuration: "5s" }} />
                  <span>{isRotating ? "Inspecting 360°" : "Drag cake to spin in 360°"}</span>
                </div>
              </div>

              {/* COTHM Certification badge */}
              <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-100 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4a196d]" />
                <span>COTHM Certified Recipe</span>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-stone-400 text-center flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#ec4899] fill-[#ec4899]" />
              Rendered in real-time WebGL with physical mirror glaze shading
            </p>
          </div>

          {/* Controls Console Column (Centralized on mobile) */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">

            {/* 1. Glaze Flavor Picker */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a196d] mb-2.5">
                1. Select Signature Mirror Glaze
              </label>
              <div className="grid grid-cols-5 gap-2">
                {GLAZE_PRESETS.map((g) => {
                  const isSelected = selectedGlaze.id === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGlaze(g)}
                      className={`relative aspect-square rounded-2xl p-1 flex items-center justify-center transition-all ${
                        isSelected
                          ? "ring-3 ring-[#4a196d] ring-offset-2 scale-105 shadow-md"
                          : "hover:scale-102 opacity-85 hover:opacity-100"
                      }`}
                      title={g.name}
                    >
                      <span
                        className="w-full h-full rounded-xl shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: g.hex }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs font-semibold text-stone-800 text-center lg:text-left">
                {selectedGlaze.name}:{" "}
                <span className="text-stone-500 font-normal">{selectedGlaze.desc}</span>
              </p>
            </div>

            {/* 2. Tier Size */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a196d] mb-2.5">
                2. Choose Tier Scale
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIERS.map((tier) => {
                  const isSelected = tierCount === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setTierCount(tier.id)}
                      className={`py-2 px-2.5 rounded-2xl text-center sm:text-left border transition-all text-xs ${
                        isSelected
                          ? "bg-[#F6EFFC] border-[#4a196d] text-[#4a196d] font-bold shadow-xs"
                          : "bg-white border-purple-100 text-stone-600 hover:border-purple-200"
                      }`}
                    >
                      <p className="font-bold leading-tight">{tier.label}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-tight">{tier.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Luxury Toppings */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#4a196d] mb-2.5">
                3. Confectionery Accents
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setHasGoldPearls(!hasGoldPearls)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                    hasGoldPearls
                      ? "bg-[#FEF3C7] border-[#d97706] text-[#92400e]"
                      : "bg-white border-purple-100 text-stone-500"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-xs" />
                    24k Gold Pearls
                  </span>
                  <span>+₨350</span>
                </button>

                <button
                  onClick={() => setHasBerries(!hasBerries)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                    hasBerries
                      ? "bg-[#FFE4E6] border-[#e11d48] text-[#9f1239]"
                      : "bg-white border-purple-100 text-stone-500"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#be123c] shadow-xs" />
                    Fresh Berries
                  </span>
                  <span>+₨450</span>
                </button>
              </div>
            </div>

            {/* Price Summary & WhatsApp Order CTA */}
            <div className="pt-4 border-t border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-[11px] text-stone-400 font-bold uppercase tracking-wider block">
                  Estimated Total (PKR)
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#4a196d]">
                  ₨{totalPrice.toLocaleString()}
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-full font-extrabold text-sm shadow-[0_8px_20px_rgba(37,211,102,0.30)] transition-all hover:scale-102 active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
