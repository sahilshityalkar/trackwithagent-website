"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  Float,
  Instance,
  Instances,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  RoundedBox,
} from "@react-three/drei";
import type { MotionValue } from "motion/react";
import { makeCardTexture, makeGlowTexture, pageFontFamily, palettes, type ScenePalette } from "./scene-textures";

export type HeroSceneProps = {
  active: boolean;
  theme: "light" | "dark";
  /** 0 when the hero is fully on screen, 1 when it has scrolled away. */
  scroll: MotionValue<number>;
  /** Pointer position in -1..1, or null on touch devices (no tilt). */
  pointer: RefObject<{ x: number; y: number } | null>;
  onReady: () => void;
  onDecline: () => void;
  /** Freeze on one frame with a card mid-flight, for the poster capture. */
  posterMode?: boolean;
};

const LABELS = ["चाय ₹50", "Uber ₹120", "Rent ₹18,000", "Swiggy ₹340", "Goa trip ₹25,000", "Priya owes you ₹450", "Salary ₹62,000"];
const AGENT = new THREE.Vector3(0.8, 0.05, 0);
// Two staggered columns so no two cards overlap at rest.
const SLOTS: [number, number, number][] = [
  [-2.05, 1.5, -0.2],
  [-0.9, 1.0, 0.3],
  [-2.1, 0.48, 0.1],
  [-0.95, -0.02, -0.3],
  [-2.0, -0.55, -0.4],
  [-0.85, -1.05, 0.25],
  [-2.1, -1.58, 0.05],
];
const CYCLE = 2.5;
const FLIGHT = 1.4;
const FADE_IN = 0.3;
const BEADS = 24;
const RING_RADIUS = 2.2;
const DEG = Math.PI / 180;
const POSTER_TIME = CYCLE * 3 + 0.2;

const easeOut = (p: number) => 1 - Math.pow(1 - p, 4);

/** Shared animation clock: the poster freezes it, otherwise it follows real time. */
function sceneTime(elapsed: number, posterMode?: boolean) {
  return posterMode ? POSTER_TIME : elapsed;
}

type Arrivals = { count: number; flashAt: number };

function Agent({ palette, arrivals, posterMode }: { palette: ScenePalette; arrivals: RefObject<Arrivals>; posterMode?: boolean }) {
  const core = useRef<THREE.Mesh>(null);
  const coreMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const glow = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => glow.dispose(), [glow]);

  useFrame(({ clock }) => {
    const t = sceneTime(clock.elapsedTime, posterMode);
    const pulse = 1 + 0.03 * (1 + Math.sin((t / 3) * Math.PI * 2));
    const sinceFlash = t - (arrivals.current?.flashAt ?? -10);
    const flash = sinceFlash >= 0 && sinceFlash < 0.2 ? 1 - sinceFlash / 0.2 : 0;
    core.current?.scale.setScalar(pulse * (1 + flash * 0.25));
    if (coreMaterial.current) coreMaterial.current.emissiveIntensity = 2.2 + flash * 5;
  });

  const lights: [string, [number, number, number]][] = [
    ["#6a30de", [-1.1, 0.9, -1.6]],
    ["#c0008a", [1.1, -0.2, -1.6]],
    ["#c64100", [0.2, -1.2, -1.3]],
  ];

  return (
    <group position={AGENT}>
      <mesh position={[0, 0, -1.2]}>
        <planeGeometry args={[4.4, 4.4]} />
        <meshBasicMaterial
          map={glow}
          transparent
          opacity={palette.light === 1 ? 1 : 0.85}
          blending={palette.light === 1 ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {lights.map(([color, position]) => (
        <pointLight key={color} color={color} position={position} intensity={40 * palette.light} distance={8} decay={2} />
      ))}
      <Float speed={posterMode ? 0 : 1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.15}
            chromaticAberration={0.04}
            ior={1.3}
            transmission={1}
            distortion={0}
            temporalDistortion={0}
            samples={8}
            resolution={512}
            backside={false}
            color="#fff5fb"
            attenuationColor="#ffd9ef"
            attenuationDistance={2.5}
            envMapIntensity={1.2}
          />
        </mesh>
        <mesh ref={core}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial ref={coreMaterial} color="#ffe3f3" emissive="#ffc2e6" emissiveIntensity={2.2} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

function LedgerRing({ palette, arrivals, posterMode }: { palette: ScenePalette; arrivals: RefObject<Arrivals>; posterMode?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const beads = useRef<(THREE.Object3D & { color: THREE.Color } | null)[]>([]);
  // In the poster, a few beads are already glowing from earlier arrivals.
  const lit = useRef<number[]>(
    Array.from({ length: BEADS }, (_, i) => (posterMode && i % 7 === 0 && i < 21 ? POSTER_TIME - 0.6 - i * 0.25 : -10)),
  );
  const lastCount = useRef(0);
  const base = useMemo(() => new THREE.Color(palette.primary), [palette.primary]);
  const accent = useMemo(() => new THREE.Color(palette.accent), [palette.accent]);

  useFrame(({ clock }, delta) => {
    const t = sceneTime(clock.elapsedTime, posterMode);
    if (group.current && !posterMode) group.current.rotation.z += 0.05 * delta;
    const count = arrivals.current?.count ?? 0;
    if (count !== lastCount.current) {
      lastCount.current = count;
      lit.current[(count * 7) % BEADS] = t;
    }
    beads.current.forEach((bead, i) => {
      if (!bead) return;
      const age = t - lit.current[i];
      const k = age >= 0 && age < 6 ? 1 - age / 6 : 0;
      bead.color.copy(base).lerp(accent, k);
      bead.scale.setScalar(1 + k * 0.8);
    });
  });

  const positions = useMemo(
    () =>
      Array.from({ length: BEADS }, (_, i) => {
        const a = (i / BEADS) * Math.PI * 2;
        return [Math.cos(a) * RING_RADIUS, Math.sin(a) * RING_RADIUS, 0] as [number, number, number];
      }),
    [],
  );

  return (
    <group position={AGENT} rotation={[70 * DEG, 0, -12 * DEG]}>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[RING_RADIUS, 0.01, 8, 160]} />
          <meshBasicMaterial color={palette.primary} transparent opacity={0.4} toneMapped={false} />
        </mesh>
        <Instances limit={BEADS}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial toneMapped={false} />
          {positions.map((position, i) => (
            <Instance
              key={i}
              position={position}
              color={palette.primary}
              ref={(node) => {
                beads.current[i] = node as unknown as THREE.Object3D & { color: THREE.Color };
              }}
            />
          ))}
        </Instances>
      </group>
    </group>
  );
}

function Card({
  index,
  palette,
  texture,
  arrivals,
  posterMode,
}: {
  index: number;
  palette: ScenePalette;
  texture: THREE.Texture | null;
  arrivals: RefObject<Arrivals>;
  posterMode?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const boxMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const faceMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const slot = useMemo(() => new THREE.Vector3(...SLOTS[index]), [index]);
  const restRotation = useMemo(() => new THREE.Euler(0, 0.28 - index * 0.02, (index % 2 ? -1 : 1) * 3 * DEG), [index]);
  const curve = useMemo(() => {
    const lift = new THREE.Vector3(0.7, 0.9 - index * 0.12, 0.7);
    const mid = slot.clone().lerp(AGENT, 0.62).add(new THREE.Vector3(0, 0.55, 0.6));
    return new THREE.CatmullRomCurve3([slot.clone(), slot.clone().add(lift), mid, AGENT.clone()]);
  }, [index, slot]);
  const lastArrivalCycle = useRef(-1);

  useFrame(({ clock }) => {
    const node = group.current;
    if (!node) return;
    const t = sceneTime(clock.elapsedTime, posterMode);
    const cycle = Math.floor(t / CYCLE);
    const phase = t - cycle * CYCLE;
    const flying = cycle % LABELS.length === index;
    const bob = Math.sin(t * 0.9 + index * 1.7) * 0.06;

    let opacity = 1;
    if (flying && phase < FLIGHT) {
      const p = easeOut(phase / FLIGHT);
      node.position.copy(curve.getPoint(p));
      node.scale.setScalar(1 - 0.75 * p);
      node.rotation.set(restRotation.x * (1 - p), restRotation.y * (1 - p), restRotation.z * (1 - p) + p * 0.6);
      opacity = 1 - 0.8 * p;
    } else {
      if (flying && lastArrivalCycle.current !== cycle && arrivals.current) {
        lastArrivalCycle.current = cycle;
        arrivals.current.count += 1;
        arrivals.current.flashAt = cycle * CYCLE + FLIGHT;
      }
      node.position.set(slot.x, slot.y + bob, slot.z);
      node.scale.setScalar(1);
      node.rotation.copy(restRotation);
      if (flying) opacity = Math.min(1, (phase - FLIGHT) / FADE_IN);
    }
    if (boxMaterial.current) boxMaterial.current.opacity = 0.85 * opacity;
    if (faceMaterial.current) faceMaterial.current.opacity = opacity;
  });

  return (
    <group ref={group} position={slot}>
      <RoundedBox args={[1.2, 0.5, 0.04]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          ref={boxMaterial}
          color={palette.surface}
          emissive={palette.surface}
          emissiveIntensity={palette.cardGlow}
          roughness={0.55}
          metalness={0.05}
          transparent
          opacity={0.85}
        />
      </RoundedBox>
      {texture && (
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[1.2, 0.5]} />
          <meshBasicMaterial ref={faceMaterial} map={texture} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function Cards({ palette, arrivals, posterMode }: { palette: ScenePalette; arrivals: RefObject<Arrivals>; posterMode?: boolean }) {
  const textures = useCardTextures(palette);
  return (
    <>
      {LABELS.map((label, i) => (
        <Card key={label} index={i} palette={palette} texture={textures?.[i] ?? null} arrivals={arrivals} posterMode={posterMode} />
      ))}
    </>
  );
}

function useCardTextures(palette: ScenePalette) {
  const [textures, setTextures] = useState<THREE.Texture[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    let made: THREE.Texture[] = [];
    const family = pageFontFamily();
    // Make sure the Devanagari face is loaded before drawing "चाय".
    Promise.all([
      document.fonts.load(`600 48px ${family}`, "चाय ₹50"),
      document.fonts.load(`600 48px ${family}`, "Salary ₹62,000"),
    ])
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return;
        made = LABELS.map((label) => makeCardTexture(label, palette, family));
        setTextures(made);
      });
    return () => {
      cancelled = true;
      made.forEach((texture) => texture.dispose());
    };
  }, [palette]);

  return textures;
}

/** Pointer tilt (max 6°), scroll dolly (+1.5 units) and aspect-aware framing. */
function Rig({ children, scroll, pointer, posterMode }: { children: ReactNode } & Pick<HeroSceneProps, "scroll" | "pointer" | "posterMode">) {
  const group = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  useFrame((_, delta) => {
    const aspect = size.width / Math.max(size.height, 1);
    // Narrower than 4:3: pull back a little and centre on the cards and agent.
    const narrow = Math.max(0, 1.34 / aspect - 1);
    const baseZ = 7 * (1 + narrow * 0.85);
    camera.position.x = -0.3 * Math.min(1, narrow * 3);
    camera.position.z = baseZ + 1.5 * (posterMode ? 0 : scroll.get());
    const target = pointer.current;
    if (group.current) {
      const tx = target && !posterMode ? -target.y * 6 * DEG : 0;
      const ty = target && !posterMode ? target.x * 6 * DEG : 0;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, tx, 4, delta);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ty, 4, delta);
    }
  });

  return <group ref={group}>{children}</group>;
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(onReady);
  });
  return null;
}

export default function HeroScene({ active, theme, scroll, pointer, onReady, onDecline, posterMode }: HeroSceneProps) {
  const palette = palettes[theme];
  const arrivals = useRef<Arrivals>({ count: 0, flashAt: -10 });

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: Boolean(posterMode) }}
      camera={{ fov: 35, position: [0, 0, 7] }}
      frameloop={active ? "always" : "never"}
      style={{ background: "transparent" }}
    >
      <PerformanceMonitor onDecline={onDecline} />
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.55 * palette.light} />
      <directionalLight position={[-3, 4, 5]} intensity={1.1 * palette.light} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2} position={[0, 3, 2]} scale={[6, 1.5, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.5} position={[-4, 0, 1]} scale={[2, 4, 1]} color="#8a5cff" />
        <Lightformer form="rect" intensity={1.5} position={[4, -1, 1]} scale={[2, 4, 1]} color="#ff7a3d" />
      </Environment>
      <Rig scroll={scroll} pointer={pointer} posterMode={posterMode}>
        <Agent palette={palette} arrivals={arrivals} posterMode={posterMode} />
        <LedgerRing palette={palette} arrivals={arrivals} posterMode={posterMode} />
        <Cards palette={palette} arrivals={arrivals} posterMode={posterMode} />
      </Rig>
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
