'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Horizontal wave patterns
function WaveParticles() {
  const pointsRef = useRef();
  const waves = 40;
  const particlesPerWave = 100;
  const totalParticles = waves * particlesPerWave;

  const positions = useMemo(() => {
    const pos = new Float32Array(totalParticles * 3);
    const width = 35;
    let idx = 0;
    
    for (let i = 0; i < waves; i++) {
      const z = (i / waves) * 15 - 5;
      for (let j = 0; j < particlesPerWave; j++) {
        const x = (j / particlesPerWave) * width - width / 2;
        pos[idx * 3] = x;
        pos[idx * 3 + 1] = 0;
        pos[idx * 3 + 2] = z;
        idx++;
      }
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array;

    let idx = 0;
    for (let i = 0; i < waves; i++) {
      const wavePhase = i * 0.3 + time * 1.5;
      for (let j = 0; j < particlesPerWave; j++) {
        const x = pos[idx * 3];
        const wave1 = Math.sin(x * 0.5 + wavePhase) * 1.2;
        const wave2 = Math.sin(x * 0.3 + wavePhase * 1.3) * 0.8;
        const ripple = Math.sin(x * 0.8 + i * 0.5 + time * 2) * 0.5;
        pos[idx * 3 + 1] = wave1 + wave2 + ripple - 2;
        idx++;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={totalParticles} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Circular spectrum with radial spikes
function CircularSpectrum() {
  const pointsRef = useRef();
  const rings = 40;
  const particlesPerRing = 100;
  const totalParticles = rings * particlesPerRing;

  const positions = useMemo(() => {
    const pos = new Float32Array(totalParticles * 3);
    let idx = 0;
    
    for (let i = 0; i < rings; i++) {
      const radius = (i / rings) * 12 + 2;
      for (let j = 0; j < particlesPerRing; j++) {
        const angle = (j / particlesPerRing) * Math.PI * 2;
        pos[idx * 3] = Math.cos(angle) * radius;
        pos[idx * 3 + 1] = 0;
        pos[idx * 3 + 2] = Math.sin(angle) * radius - 6;
        idx++;
      }
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array;

    let idx = 0;
    for (let i = 0; i < rings; i++) {
      const baseRadius = (i / rings) * 12 + 2;
      
      for (let j = 0; j < particlesPerRing; j++) {
        const angle = (j / particlesPerRing) * Math.PI * 2;
        
        // Multiple frequency components for each angle (like spectrum bars)
        const freq1 = Math.sin(angle * 8 + time * 3) * 0.5 + 0.5;
        const freq2 = Math.sin(angle * 12 + time * 2.5) * 0.5 + 0.5;
        const freq3 = Math.cos(angle * 6 + time * 4) * 0.5 + 0.5;
        
        // Sharp spikes
        const spike = Math.pow(Math.sin(angle * 16 + time * 2.3), 6);
        
        // Pulse waves
        const pulse = Math.sin(i * 0.3 + time * 1.8) * 0.5 + 0.5;
        
        // Combine for radial spike effect
        const amplitude = (freq1 * 0.3 + freq2 * 0.3 + freq3 * 0.2 + spike * 0.6) * pulse;
        
        // Radial displacement (spikes going outward)
        const spikeDisplacement = amplitude * 4;
        const radiusWithSpike = baseRadius + spikeDisplacement;
        
        // Vertical displacement (height variation)
        const heightDisplacement = amplitude * 1.5;
        
        pos[idx * 3] = Math.cos(angle) * radiusWithSpike;
        pos[idx * 3 + 1] = heightDisplacement - 3;
        pos[idx * 3 + 2] = Math.sin(angle) * radiusWithSpike - 6;
        idx++;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={totalParticles} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function DSPVisualizerScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', height: '50vh', width: '100vw' }}
    >
      <WaveParticles />
      <CircularSpectrum />
    </Canvas>
  );
}

