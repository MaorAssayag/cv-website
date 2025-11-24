'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useDSP } from '@/context/DSPContext';

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
  const { triggerFrameReassign, reassignTrigger } = useDSP();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    triggerFrameReassign();
  };

  if (!isActive || !isMounted) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-30 pointer-events-auto cursor-pointer" 
      style={{ height: '50vh' }}
      onClick={handleClick}
    >
      <Suspense fallback={null}>
        <ThreeScene triggerReassign={reassignTrigger} />
      </Suspense>
    </div>
  );
}

