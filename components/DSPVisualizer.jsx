'use client';

import { useEffect, useRef } from 'react';
import { useDSP } from '@/context/DSPContext';

export default function DSPVisualizer() {
    const { isDSPMode } = useDSP();
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            // Normalize mouse coordinates (-1 to 1)
            mouseRef.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            };
        };

        // 3D Grid Configuration
        const gridSize = 50; // Increased density
        const fov = 350;
        const viewDistance = 300;
        const gridWidth = 2500;
        const gridHeight = 2500;
        const speed = 0.5; // Much slower

        const project = (x, y, z) => {
            const scale = fov / (fov + z);
            const x2d = x * scale + canvas.width / 2;
            const y2d = y * scale + canvas.height / 2;
            return { x: x2d, y: y2d, scale };
        };

        // Complex wave function to simulate audio spectrum
        const getWaveHeight = (x, z, t) => {
            const dist = Math.sqrt(x * x + z * z);

            // Base rolling wave
            let y = Math.sin(z * 0.005 + t * 0.02) * 20;

            // "Audio" frequencies
            y += Math.sin(x * 0.01 + t * 0.05) * 15; // Low freq
            y += Math.sin(x * 0.03 + z * 0.02 + t * 0.1) * 10; // Mid freq
            y += Math.sin(Math.sqrt(x * x + z * z) * 0.02 - t * 0.08) * 15; // Radial

            // Mouse interaction (Amplitude modulation)
            const mouseAmp = Math.abs(mouseRef.current.y) * 2;
            y += Math.sin(x * 0.05 + t * 0.2) * 20 * mouseAmp; // High freq noise

            return y + 150; // Height offset
        };

        const draw = () => {
            if (isDSPMode) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Stronger trail for smoothness
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            time += speed;

            ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)'; // Greyscale
            ctx.lineWidth = 1;
            ctx.beginPath();

            // Draw vertical lines
            for (let i = 0; i <= gridSize; i++) {
                const x = (i / gridSize) * gridWidth - gridWidth / 2;

                for (let j = 0; j < gridSize; j++) {
                    const z1 = (j / gridSize) * gridHeight - gridHeight / 2 + (time % (gridHeight / gridSize));
                    const z2 = ((j + 1) / gridSize) * gridHeight - gridHeight / 2 + (time % (gridHeight / gridSize));

                    const y1 = getWaveHeight(x, z1, time);
                    const y2 = getWaveHeight(x, z2, time);

                    const p1 = project(x, y1, z1 + viewDistance);
                    const p2 = project(x, y2, z2 + viewDistance);

                    if (p1.scale > 0 && p2.scale > 0) {
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                    }
                }
            }

            // Draw horizontal lines
            for (let j = 0; j <= gridSize; j++) {
                const z = (j / gridSize) * gridHeight - gridHeight / 2 + (time % (gridHeight / gridSize));

                for (let i = 0; i < gridSize; i++) {
                    const x1 = (i / gridSize) * gridWidth - gridWidth / 2;
                    const x2 = ((i + 1) / gridSize) * gridWidth - gridWidth / 2;

                    const y1 = getWaveHeight(x1, z, time);
                    const y2 = getWaveHeight(x2, z, time);

                    const p1 = project(x1, y1, z + viewDistance);
                    const p2 = project(x2, y2, z + viewDistance);

                    if (p1.scale > 0 && p2.scale > 0) {
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                    }
                }
            }

            ctx.stroke();

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();

        if (isDSPMode) {
            draw();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDSPMode]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${isDSPMode ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: isDSPMode ? 'black' : 'transparent' }}
        />
    );
}
