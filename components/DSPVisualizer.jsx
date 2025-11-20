'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the entire Three.js scene to avoid SSR issues
const ThreeScene = dynamic(
  () => import('./DSPVisualizerScene'),
  { 
    ssr: false,
    loading: () => null
  }
);

export default function DSPVisualizer({ isActive }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isActive || !isMounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none" style={{ height: '50vh' }}>
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>
    </div>
  );
}

