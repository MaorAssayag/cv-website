'use client';

import { useRef, useMemo, forwardRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Horizontal wave patterns
const WaveParticles = forwardRef((props, ref) => {
  const pointsRef = ref || useRef();
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
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
});

// Circular spectrum with radial spikes
const CircularSpectrum = forwardRef((props, ref) => {
  const pointsRef = ref || useRef();
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
});

// Particle tracking frames
function ParticleTrackingFrames({ waveParticlesRef, circularSpectrumRef, triggerReassign }) {
  const framesRef = useRef([]);
  const connectionsRef = useRef();
  const lastConnectionUpdate = useRef(0);
  const lastParticleUpdate = useRef(0);
  const connections = useRef([]);
  const numFrames = 10;
  const waveParticleCount = 40 * 100; // waves * particlesPerWave
  const circularParticleCount = 40 * 100; // rings * particlesPerRing
  
  // Initialize frame data
  const frameData = useMemo(() => {
    const frames = [];
    
    for (let i = 0; i < numFrames; i++) {
      const useWaveParticles = Math.random() > 0.5;
      const particleCount = useWaveParticles ? waveParticleCount : circularParticleCount;
      const randomParticleIndex = Math.floor(Math.random() * particleCount);
      
      // Varying frame sizes
      const size = 0.5 + Math.random() * 0.8;
      
      frames.push({
        source: useWaveParticles ? 'wave' : 'circular',
        particleIndex: randomParticleIndex,
        size,
        currentPos: new THREE.Vector3(),
        targetPos: new THREE.Vector3(),
        amplitude: 1.0,
      });
    }
    return frames;
  }, []);
  
  const [amplitudes, setAmplitudes] = useState(frameData.map(() => 1.0));
  
  // Reassign particles to frames
  const reassignParticles = () => {
    frameData.forEach((frame) => {
      const useWaveParticles = Math.random() > 0.5;
      const particleCount = useWaveParticles ? waveParticleCount : circularParticleCount;
      const randomParticleIndex = Math.floor(Math.random() * particleCount);
      
      frame.source = useWaveParticles ? 'wave' : 'circular';
      frame.particleIndex = randomParticleIndex;
    });
  };
  
  // Trigger reassignment on external trigger
  useEffect(() => {
    if (triggerReassign > 0) {
      reassignParticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReassign]);
  
  // Generate random connections between frame centers
  const generateConnections = () => {
    const newConnections = [];
    
    // Each frame gets exactly one connection to another random frame
    for (let i = 0; i < numFrames; i++) {
      let targetFrame = Math.floor(Math.random() * numFrames);
      // Ensure we don't connect a frame to itself
      while (targetFrame === i) {
        targetFrame = Math.floor(Math.random() * numFrames);
      }
      
      newConnections.push({
        frame1: i,
        frame2: targetFrame,
      });
    }
    
    connections.current = newConnections;
  };
  
  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    
    // Reassign particles every 2 seconds
    if (time - lastParticleUpdate.current >= 1.5) {
      reassignParticles();
      lastParticleUpdate.current = time;
    }
    
    // Update connections 4 times per second (every 0.25 seconds)
    if (time - lastConnectionUpdate.current >= 0.25) {
      generateConnections();
      lastConnectionUpdate.current = time;
    }
    
    // Setup frustum for culling
    const frustum = new THREE.Frustum();
    const projScreenMatrix = new THREE.Matrix4();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(projScreenMatrix);
    
    const newAmplitudes = [];
    
    frameData.forEach((frame, index) => {
      if (!framesRef.current[index]) return;
      
      // Get particle position based on source
      let particlePos;
      if (frame.source === 'wave' && waveParticlesRef.current) {
        const pos = waveParticlesRef.current.geometry.attributes.position.array;
        const idx = frame.particleIndex * 3;
        particlePos = new THREE.Vector3(pos[idx], pos[idx + 1], pos[idx + 2]);
      } else if (frame.source === 'circular' && circularSpectrumRef.current) {
        const pos = circularSpectrumRef.current.geometry.attributes.position.array;
        const idx = frame.particleIndex * 3;
        particlePos = new THREE.Vector3(pos[idx], pos[idx + 1], pos[idx + 2]);
      }
      
      if (particlePos) {
        // Smooth interpolation
        frame.targetPos.copy(particlePos);
        frame.currentPos.lerp(frame.targetPos, 0.1);
        
        // Update frame position
        framesRef.current[index].position.copy(frame.currentPos);
        
        // Calculate amplitude based on scale
        const scale = frame.size + Math.sin(time * 2 + index) * 0.1;
        framesRef.current[index].scale.setScalar(scale);
        
        // Check if frame is within camera frustum
        const frameWorldPos = new THREE.Vector3();
        framesRef.current[index].getWorldPosition(frameWorldPos);
        const isVisible = frustum.containsPoint(frameWorldPos);
        framesRef.current[index].visible = isVisible;
        
        // Calculate amplitude from y-position and scale (scaled 1-5)
        const yAmplitude = Math.abs(particlePos.y + 2.5) / 3;
        const scaleAmplitude = (scale - 0.5) / 1.3;
        const combinedAmplitude = 1 + (yAmplitude + scaleAmplitude) * 2;
        frame.amplitude = Math.max(1, Math.min(5, combinedAmplitude));
        newAmplitudes.push(frame.amplitude);
      } else {
        newAmplitudes.push(frame.amplitude);
      }
    });
    
    setAmplitudes(newAmplitudes);
    
    // Update connection lines
    if (connectionsRef.current && connections.current.length > 0) {
      const positions = [];
      
      connections.current.forEach((conn) => {
        const frame1 = framesRef.current[conn.frame1];
        const frame2 = framesRef.current[conn.frame2];
        
        // Only draw connection if both frames are visible
        if (frame1 && frame2 && frame1.visible && frame2.visible) {
          // Get center positions (world space)
          const center1 = new THREE.Vector3();
          const center2 = new THREE.Vector3();
          
          frame1.getWorldPosition(center1);
          frame2.getWorldPosition(center2);
          
          positions.push(center1.x, center1.y, center1.z);
          positions.push(center2.x, center2.y, center2.z);
        }
      });
      
      if (positions.length > 0) {
        const posArray = new Float32Array(positions);
        connectionsRef.current.geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(posArray, 3)
        );
        connectionsRef.current.geometry.attributes.position.needsUpdate = true;
      } else {
        // Clear connections if no visible frames
        connectionsRef.current.geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(0), 3)
        );
        connectionsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });
  
  return (
    <>
      {frameData.map((frame, index) => (
        <group key={index}>
          <group
            ref={(el) => {
              if (el) framesRef.current[index] = el;
            }}
          >
            {/* Background fill */}
            <mesh>
              <planeGeometry args={[2, 2]} />
              <meshBasicMaterial
                color="#1a1a1a"
                transparent={false}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Frame border */}
            <lineLoop>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={4}
                  array={new Float32Array([
                    -1, -1, 0,
                    1, -1, 0,
                    1, 1, 0,
                    -1, 1, 0,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.8}
                depthWrite={false}
                dithering={true}
              />
            </lineLoop>
          </group>
          {framesRef.current[index] && framesRef.current[index].visible && (
            <Html
              position={[
                framesRef.current[index].position.x,
                framesRef.current[index].position.y,
                framesRef.current[index].position.z,
              ]}
              center
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                color: 'white',
                fontSize: '8px',
                fontFamily: 'monospace',
                textShadow: '0 0 4px rgba(0,0,0,0.8)',
                filter: 'contrast(1.2) brightness(1.1)',
              }}
            >
              {amplitudes[index]?.toFixed(3) || '1.000'}
            </Html>
          )}
        </group>
      ))}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={0}
            array={new Float32Array(0)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          depthWrite={false}
          dithering={true}
        />
      </lineSegments>
    </>
  );
}

export default function DSPVisualizerScene({ triggerReassign }) {
  const waveParticlesRef = useRef();
  const circularSpectrumRef = useRef();
  
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', height: '50vh', width: '100vw' }}
    >
      <WaveParticles ref={waveParticlesRef} />
      <CircularSpectrum ref={circularSpectrumRef} />
      <ParticleTrackingFrames 
        waveParticlesRef={waveParticlesRef}
        circularSpectrumRef={circularSpectrumRef}
        triggerReassign={triggerReassign}
      />
    </Canvas>
  );
}

