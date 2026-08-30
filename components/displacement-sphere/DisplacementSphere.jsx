'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  DirectionalLight,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  Vector2,
  WebGLRenderer,
} from 'three';
import { vertexShader, fragmentShader } from './shaders';
import { cleanRenderer, cleanScene, removeLights, throttle } from './three-utils';

const BREAKPOINTS = {
  mobile: 696,
  tablet: 1040,
  desktop: 2080,
};

export default function DisplacementSphere({ className = '', style = {}, isDark = false, ...props }) {
  const canvasRef = useRef(null);
  const start = useRef(Date.now());
  const mouse = useRef(new Vector2(0.8, 0.5));
  const renderer = useRef(null);
  const camera = useRef(null);
  const scene = useRef(null);
  const lights = useRef([]);
  const uniforms = useRef(null);
  const material = useRef(null);
  const geometry = useRef(null);
  const sphere = useRef(null);

  // Smooth rotation state (spring/lerp)
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const [isInViewport, setIsInViewport] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Three.js Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { innerWidth, innerHeight } = window;

    renderer.current = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false,
    });
    renderer.current.setSize(innerWidth, innerHeight);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.current.outputColorSpace = LinearSRGBColorSpace;
    renderer.current.setClearColor(0x000000, 0);

    const adjustedHeight = innerHeight + innerHeight * 0.3;
    camera.current = new PerspectiveCamera(54, innerWidth / adjustedHeight, 0.1, 100);
    camera.current.position.z = 75;

    scene.current = new Scene();

    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = shader => {
      uniforms.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { type: 'f', value: 0 } },
      ]);

      shader.uniforms = uniforms.current;
      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    };

    geometry.current = new SphereGeometry(40, 128, 128);
    sphere.current = new Mesh(geometry.current, material.current);
    sphere.current.position.z = 0;
    sphere.current.modifier = Math.random();
    scene.current.add(sphere.current);

    // Initial position based on screen width
    if (innerWidth <= BREAKPOINTS.mobile) {
      sphere.current.position.x = 14;
      sphere.current.position.y = 10;
    } else if (innerWidth <= BREAKPOINTS.tablet) {
      sphere.current.position.x = 24;
      sphere.current.position.y = 16;
    } else {
      sphere.current.position.x = 40;
      sphere.current.position.y = 20;
    }

    setIsLoaded(true);

    return () => {
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);

  // Update Lights when theme changes
  useEffect(() => {
    if (!scene.current) return;

    if (lights.current.length) {
      removeLights(lights.current);
    }

    const dirLight = new DirectionalLight(0xffffff, isDark ? 2.0 : 1.8);
    const ambientLight = new AmbientLight(0xffffff, isDark ? 0.4 : 2.7);

    dirLight.position.set(100, 100, 200);

    lights.current = [dirLight, ambientLight];
    lights.current.forEach(light => scene.current.add(light));

    return () => {
      removeLights(lights.current);
    };
  }, [isDark]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (!renderer.current || !camera.current || !sphere.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const adjustedHeight = height + height * 0.3;

      renderer.current.setSize(width, adjustedHeight);
      camera.current.aspect = width / adjustedHeight;
      camera.current.updateProjectionMatrix();

      if (width <= BREAKPOINTS.mobile) {
        sphere.current.position.x = 14;
        sphere.current.position.y = 10;
      } else if (width <= BREAKPOINTS.tablet) {
        sphere.current.position.x = 24;
        sphere.current.position.y = 16;
      } else {
        sphere.current.position.x = 45;
        sphere.current.position.y = 20;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Viewport visibility detection
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle Mouse Movement
  useEffect(() => {
    const onMouseMove = throttle(event => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };

      targetRotation.current = {
        x: position.y / 2,
        y: position.x / 2,
      };
    }, 50);

    if (isInViewport) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isInViewport]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth lerp rotation toward target
      const lerpSpeed = 0.05;
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpSpeed;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpSpeed;

      if (uniforms.current?.time) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
      }

      if (sphere.current) {
        sphere.current.rotation.z += 0.001;
        sphere.current.rotation.x = currentRotation.current.x;
        sphere.current.rotation.y = currentRotation.current.y;
      }

      if (renderer.current && scene.current && camera.current) {
        renderer.current.render(scene.current, camera.current);
      }
    };

    if (isInViewport) {
      animate();
    } else if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInViewport]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute top-0 left-0 pointer-events-none transition-opacity duration-700 ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        ...style,
      }}
      {...props}
    />
  );
}
