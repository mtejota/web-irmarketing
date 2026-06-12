"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const BURST_COUNT = 80;

// ---------- Burst de partículas (dispara no hover) ----------
function Burst({
  trigger,
  color,
  sw = 2.0,
  sh = 1.0,
}: {
  trigger: number;
  color: string;
  sw?: number;
  sh?: number;
}) {
  const points = useRef<THREE.Points>(null);

  const state = useMemo(() => {
    const positions = new Float32Array(BURST_COUNT * 3);
    const velocities = new Float32Array(BURST_COUNT * 3);
    const lives = new Float32Array(BURST_COUNT);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { positions, velocities, lives, geo };
  }, []);

  useEffect(() => {
    if (trigger === 0) return;
    const { positions, velocities, lives, geo } = state;
    for (let i = 0; i < BURST_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.025 + Math.random() * 0.055;
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i * 3 + 2] = Math.cos(phi) * speed * 0.4;
      positions[i * 3] = (Math.random() - 0.5) * sw;
      positions[i * 3 + 1] = (Math.random() - 0.5) * sh;
      positions[i * 3 + 2] = 0.05;
      lives[i] = 1;
    }
    geo.attributes.position.needsUpdate = true;
  }, [trigger, sw, sh, state]);

  useFrame(() => {
    if (!points.current) return;
    const { positions, velocities, lives, geo } = state;
    let totalLife = 0;
    for (let i = 0; i < BURST_COUNT; i++) {
      if (lives[i] > 0) {
        lives[i] -= 0.015;
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        totalLife += lives[i];
      }
    }
    geo.attributes.position.needsUpdate = true;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, (totalLife / BURST_COUNT) * 2.2);
  });

  return (
    <points ref={points} geometry={state.geo}>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ---------- Logo com efeitos 3D ----------
function LogoScene() {
  const texture = useTexture("/logo-irneon.PNG");
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Dimensões proporcionais à imagem
  const aspect: number = texture.image
    ? (texture.image as { width: number; height: number }).width /
      (texture.image as { width: number; height: number }).height
    : 1;
  const W = 3.2;
  const H = W / aspect;

  useFrame(({ pointer }) => {
    if (group.current) {
      group.current.rotation.y +=
        (pointer.x * 0.45 - group.current.rotation.y) * 0.05;
      group.current.rotation.x +=
        (-pointer.y * 0.3 - group.current.rotation.x) * 0.05;
    }
    if (mesh.current) {
      const target = hovered ? 1.06 : 1.0;
      mesh.current.scale.x += (target - mesh.current.scale.x) * 0.08;
      mesh.current.scale.y += (target - mesh.current.scale.y) * 0.08;
    }
  });

  const handleEnter = useCallback(() => {
    setHovered(true);
    setBurstTrigger((t) => t + 1);
    document.body.style.cursor = "pointer";
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = "";
  }, []);

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.9}>
        {/* Aura externa — blending aditivo faz o preto da imagem sumir */}
        <mesh scale={2.4}>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial
            map={texture}
            blending={THREE.AdditiveBlending}
            transparent
            opacity={0.035}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={1.55}>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial
            map={texture}
            blending={THREE.AdditiveBlending}
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>

        {/* Logo principal */}
        <mesh
          ref={mesh}
          onPointerEnter={handleEnter}
          onPointerLeave={handleLeave}
        >
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial
            map={texture}
            blending={THREE.AdditiveBlending}
            transparent
            depthWrite={false}
          />
        </mesh>

        {/* Burst de partículas ao passar o mouse */}
        <Burst trigger={burstTrigger} color="#02FA8B" sw={W * 0.7} sh={H * 0.7} />
        <Burst trigger={burstTrigger} color="#BA1BFA" sw={W * 0.5} sh={H * 0.5} />
      </Float>

      {/* Sparkles ambiente — verde e roxo */}
      <Sparkles count={55} size={1.8} scale={[6, 5, 3]} speed={0.3} color="#02FA8B" opacity={0.5} />
      <Sparkles count={28} size={1.5} scale={[5, 4, 2]} speed={0.2} color="#BA1BFA" opacity={0.4} />
    </group>
  );
}

// ---------- Canvas ----------
export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 4]} intensity={28} color="#02FA8B" />
      <pointLight position={[-3, -2, 3]} intensity={20} color="#BA1BFA" />
      <Suspense fallback={null}>
        <LogoScene />
      </Suspense>
    </Canvas>
  );
}
