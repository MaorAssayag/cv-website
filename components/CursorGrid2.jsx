'use client';

import { useEffect, useRef } from 'react';
import { useDSP } from '@/context/DSPContext';

export default function CursorGrid2() {
    const { isDSPMode, titleRect } = useDSP();
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const ripplesRef = useRef([]);
    const gridRef = useRef({ points: [], cols: 0, rows: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const spacing = 40;
        const mouseRadius = 300;
        const mouseStrength = 0.5; // 0 to 1, how much it warps
        const rippleSpeed = 8;
        const rippleDecay = 0.02;
        const rippleStrength = 50; // Pixel displacement

        const initGrid = () => {
            const cols = Math.ceil(window.innerWidth / spacing) + 2;
            const rows = Math.ceil(window.innerHeight / spacing) + 2;
            const points = [];

            for (let i = 0; i < cols; i++) {
                points[i] = [];
                for (let j = 0; j < rows; j++) {
                    points[i][j] = {
                        baseX: i * spacing,
                        baseY: j * spacing,
                        x: i * spacing,
                        y: j * spacing,
                    };
                }
            }
            gridRef.current = { points, cols, rows };
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initGrid();
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleClick = (e) => {
            ripplesRef.current.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                strength: rippleStrength,
                opacity: 1,
            });
        };

        const updatePoints = () => {
            const { points, cols, rows } = gridRef.current;

            // Update ripples
            ripplesRef.current = ripplesRef.current.filter(ripple => {
                ripple.radius += rippleSpeed;
                ripple.opacity -= rippleDecay;
                return ripple.opacity > 0;
            });

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const point = points[i][j];
                    let targetX = point.baseX;
                    let targetY = point.baseY;

                    // Mouse influence (Mesh Warp / Lens effect)
                    const dx = mouseRef.current.x - point.baseX;
                    const dy = mouseRef.current.y - point.baseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouseRadius) {
                        const force = Math.pow((mouseRadius - dist) / mouseRadius, 2);
                        const angle = Math.atan2(dy, dx);
                        // Move points away from mouse for a magnifying/bulge effect
                        // Or towards for a pinch. Let's do a slight bulge (away).
                        const displacement = force * 40 * mouseStrength;
                        targetX -= Math.cos(angle) * displacement;
                        targetY -= Math.sin(angle) * displacement;
                    }

                    // Ripple influence
                    ripplesRef.current.forEach(ripple => {
                        const rdx = point.baseX - ripple.x;
                        const rdy = point.baseY - ripple.y;
                        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);

                        // Ripple band width
                        const width = 60;

                        if (Math.abs(rdist - ripple.radius) < width) {
                            // Gaussian-like profile for the ripple wave
                            const diff = (rdist - ripple.radius) / width;
                            const force = Math.exp(-(diff * diff) * 4) * ripple.opacity;
                            const angle = Math.atan2(rdy, rdx);

                            // Displace perpendicular to wave front (radial)
                            const displacement = force * ripple.strength;
                            targetX += Math.cos(angle) * displacement;
                            targetY += Math.sin(angle) * displacement;
                        }
                    });

                    // Proximity Influence (DSP Focus Mode Hint)
                    if (titleRect && !isDSPMode) {
                        const titleCenterX = titleRect.left + titleRect.width / 2;
                        const titleCenterY = titleRect.top + titleRect.height / 2;

                        // Calculate distance from mouse to title
                        const mouseToTitleDist = Math.sqrt(
                            Math.pow(mouseRef.current.x - titleCenterX, 2) +
                            Math.pow(mouseRef.current.y - titleCenterY, 2)
                        );

                        // If mouse is close to title (e.g., within 300px)
                        if (mouseToTitleDist < 300) {
                            const proximityFactor = 1 - (mouseToTitleDist / 300); // 0 to 1

                            // Apply effect to points near the title
                            const pdx = point.baseX - titleCenterX;
                            const pdy = point.baseY - titleCenterY;
                            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

                            if (pdist < 200) {
                                const pForce = (200 - pdist) / 200;
                                // Darkening ripple distortion
                                const distortion = Math.sin(pdist * 0.1 - Date.now() * 0.01) * 5 * proximityFactor * pForce;
                                targetX += distortion;
                                targetY += distortion;
                            }
                        }
                    }

                    // Simple elasticity/easing to target
                    point.x += (targetX - point.x) * 0.15;
                    point.y += (targetY - point.y) * 0.15;
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            updatePoints();

            const { points, cols, rows } = gridRef.current;

            const baseOpacity = 0.04;
            let proximityStrength = 0;
            let darkeningCenterX = 0;
            let darkeningCenterY = 0;

            // Check distance from mouse to title for smooth decay
            if (titleRect && !isDSPMode) {
                const titleCenterX = titleRect.left + titleRect.width / 2;
                const titleCenterY = titleRect.top + titleRect.height / 2;
                const mouseToTitleDist = Math.sqrt(
                    Math.pow(mouseRef.current.x - titleCenterX, 2) +
                    Math.pow(mouseRef.current.y - titleCenterY, 2)
                );
                
                // Smooth decay: active within 400px, with smooth falloff
                const maxProximityDist = 200;
                if (mouseToTitleDist < maxProximityDist) {
                    // Smooth easing function (ease-out-cubic)
                    const normalizedDist = mouseToTitleDist / maxProximityDist;
                    proximityStrength = 1 - Math.pow(normalizedDist, 3);
                    
                    darkeningCenterX = mouseRef.current.x;
                    darkeningCenterY = mouseRef.current.y;
                }
            }

            // Draw horizontal lines with smooth darkening decay
            for (let j = 0; j < rows; j++) {
                if (points[0] && points[0][j]) {
                    for (let i = 1; i < cols; i++) {
                        const p1 = points[i - 1][j];
                        const p2 = points[i][j];
                        
                        let opacity = baseOpacity;
                        
                        if (proximityStrength > 0) {
                            const lineCenterX = (p1.x + p2.x) / 2;
                            const lineCenterY = (p1.y + p2.y) / 2;
                            const distToCursor = Math.sqrt(
                                Math.pow(lineCenterX - darkeningCenterX, 2) +
                                Math.pow(lineCenterY - darkeningCenterY, 2)
                            );
                            
                            // Multi-level smooth decay around cursor
                            const darkeningRadius = 350;
                            if (distToCursor < darkeningRadius) {
                                const normalizedDist = distToCursor / darkeningRadius;
                                // Smooth easing with exponential decay
                                const localIntensity = Math.pow(1 - normalizedDist, 2.5);
                                // Apply both proximity to title and local darkening
                                const finalIntensity = localIntensity * proximityStrength;
                                opacity = baseOpacity + finalIntensity * 0.96;
                            }
                        }
                        
                        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw vertical lines with smooth darkening decay
            for (let i = 0; i < cols; i++) {
                if (points[i] && points[i][0]) {
                    for (let j = 1; j < rows; j++) {
                        const p1 = points[i][j - 1];
                        const p2 = points[i][j];
                        
                        let opacity = baseOpacity;
                        
                        if (proximityStrength > 0) {
                            const lineCenterX = (p1.x + p2.x) / 2;
                            const lineCenterY = (p1.y + p2.y) / 2;
                            const distToCursor = Math.sqrt(
                                Math.pow(lineCenterX - darkeningCenterX, 2) +
                                Math.pow(lineCenterY - darkeningCenterY, 2)
                            );
                            
                            // Multi-level smooth decay around cursor
                            const darkeningRadius = 350;
                            if (distToCursor < darkeningRadius) {
                                const normalizedDist = distToCursor / darkeningRadius;
                                // Smooth easing with exponential decay
                                const localIntensity = Math.pow(1 - normalizedDist, 2.5);
                                // Apply both proximity to title and local darkening
                                const finalIntensity = localIntensity * proximityStrength;
                                opacity = baseOpacity + finalIntensity * 0.96;
                            }
                        }
                        
                        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDSPMode, titleRect]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDSPMode ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: 'transparent' }}
        />
    );
}
