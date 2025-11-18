'use client';

import { useEffect, useRef } from 'react';

export default function CursorGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e) => {
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 500, // Increased for more noticeable effect
        opacity: 1
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    resize();

    const gridSize = 60;
    const influenceRadius = 400; // Extended from 300
    const vectorLength = 30;

    const drawArrow = (fromX, fromY, toX, toY, strength) => {
      const headLength = 6 * strength;
      const angle = Math.atan2(toY - fromY, toX - fromX);

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.lineTo(toX, toY);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rows = Math.ceil(canvas.height / gridSize);
      const cols = Math.ceil(canvas.width / gridSize);

      // Update and draw ripples
      ripples.current = ripples.current.filter(ripple => {
        ripple.radius += 4; // Faster - was 2
        ripple.opacity -= 0.015; // Faster fade - was 0.008
        return ripple.opacity > 0;
      });

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          let totalForceX = 0;
          let totalForceY = 0;
          let maxForce = 0;

          // Calculate force from mouse
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius && dist > 0) {
            const force = (influenceRadius - dist) / influenceRadius;
            const angle = Math.atan2(dy, dx);
            totalForceX += Math.cos(angle) * force;
            totalForceY += Math.sin(angle) * force;
            maxForce = Math.max(maxForce, force);
          }

          // Calculate force from ripples
          ripples.current.forEach(ripple => {
            const rdx = x - ripple.x;
            const rdy = y - ripple.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const rippleThickness = 30;

            if (Math.abs(rdist - ripple.radius) < rippleThickness) {
              const rippleForce = ripple.opacity * 0.5;
              const rangle = Math.atan2(rdy, rdx);
              totalForceX += Math.cos(rangle) * rippleForce;
              totalForceY += Math.sin(rangle) * rippleForce;
              maxForce = Math.max(maxForce, rippleForce);
            }
          });

          if (maxForce > 0) {
            const length = maxForce * vectorLength;
            const endX = x + totalForceX * vectorLength;
            const endY = y + totalForceY * vectorLength;

            const opacity = 0.05 + maxForce * 0.07;
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 1.5;

            drawArrow(x, y, endX, endY, maxForce);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
