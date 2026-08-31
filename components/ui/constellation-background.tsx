'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme/themeProvider';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    radius: number;
    label: string;
    pulse: number;
}

export default function ConstellationBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { theme } = useTheme();
    const isDarkRef = useRef(theme === 'dark');
    // Set by the animation effect below. Under prefers-reduced-motion there is no
    // rAF loop, so a theme change would otherwise never repaint the canvas.
    const repaintRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        isDarkRef.current = theme === 'dark';
        repaintRef.current?.();
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId = 0;
        let width = 0;
        let height = 0;
        let cols = 0;
        let rows = 0;
        let nodes: Node[] = [];
        let lastTime = performance.now();
        let running = false;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const mouse = {
            x: -1000,
            y: -1000,
            prevX: -1000,
            prevY: -1000,
            vx: 0,
            vy: 0,
            radius: 220,
        };

        const initNodes = () => {
            nodes = [];
            const spacing = 70;
            cols = Math.ceil(width / spacing) + 1;
            rows = Math.ceil(height / spacing) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    nodes.push({
                        x,
                        y,
                        vx: 0,
                        vy: 0,
                        baseX: x,
                        baseY: y,
                        radius: Math.random() * 1.2 + 1.2,
                        label: `${(i * 7).toString(16).toUpperCase()}:${(j * 11).toString(16).toUpperCase()}`,
                        pulse: Math.random() * Math.PI * 2,
                    });
                }
            }
        };

        const drawConnections = () => {
            const isDarkMode = isDarkRef.current;
            const nodeColor = isDarkMode ? '255, 255, 255' : '15, 23, 42';
            const MAX_CONN_DIST = 100;
            const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

            for (let idx = 0; idx < nodes.length; idx++) {
                const n = nodes[idx];
                const i = Math.floor(idx / rows);
                const j = idx % rows;

                const neighbors = [
                    i + 1 < cols ? idx + rows : -1,
                    j + 1 < rows ? idx + 1 : -1,
                    i + 1 < cols && j + 1 < rows ? idx + rows + 1 : -1,
                    i + 1 < cols && j - 1 >= 0 ? idx + rows - 1 : -1,
                ];

                for (let k = 0; k < neighbors.length; k++) {
                    const ni = neighbors[k];
                    if (ni < 0) continue;

                    const n2 = nodes[ni];
                    const ndx = n.x - n2.x;
                    const ndy = n.y - n2.y;
                    const distSq = ndx * ndx + ndy * ndy;

                    if (distSq < MAX_CONN_DIST_SQ) {
                        const nDist = Math.sqrt(distSq);
                        const alpha = (1 - nDist / MAX_CONN_DIST) * (isDarkMode ? 0.18 : 0.08);

                        ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const drawNodes = () => {
            const isDarkMode = isDarkRef.current;
            const nodeColor = isDarkMode ? '255, 255, 255' : '15, 23, 42';
            const accentColor = isDarkMode ? '56, 189, 248' : '2, 132, 199';

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const isNear = dist < mouse.radius;

                const baseAlpha = isNear ? 0.95 : 0.25 + Math.sin(n.pulse) * 0.1;

                ctx.fillStyle = isNear
                    ? `rgba(${accentColor}, ${baseAlpha})`
                    : `rgba(${nodeColor}, ${baseAlpha})`;

                const currentRadius = isNear
                    ? n.radius * 2.2
                    : n.radius + Math.sin(n.pulse) * 0.3;

                ctx.beginPath();
                ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
                ctx.fill();

                if (dist < 90) {
                    const pulseRing = ((n.pulse * 20) % 30) + 4;
                    const ringAlpha = (1 - pulseRing / 34) * 0.4;

                    ctx.strokeStyle = `rgba(${accentColor}, ${ringAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, pulseRing, 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.font = '8px ui-monospace, SFMono-Regular, Consolas, monospace';
                    ctx.fillStyle = `rgba(${accentColor}, 0.85)`;
                    ctx.fillText(n.label, n.x + 10, n.y - 10);
                }
            }
        };

        const drawStatic = () => {
            const isDarkMode = isDarkRef.current;
            const bgColor = isDarkMode ? '#030407' : '#f8fafc';
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);
            drawConnections();
            drawNodes();
        };

        const renderFrame = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
            mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

            const isDarkMode = isDarkRef.current;
            const bgColor = isDarkMode ? '#030407' : '#f8fafc';

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            const SPRING_K = 18;
            const DAMPING = 0.82;

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.pulse += dt * 3;

                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius && dist > 0) {
                    const power = 1 - dist / mouse.radius;
                    const force = power * (1500 + speed * 150);
                    const angle = Math.atan2(dy, dx);

                    n.vx -= Math.cos(angle) * force * dt;
                    n.vy -= Math.sin(angle) * force * dt;
                }

                const homeDx = n.baseX - n.x;
                const homeDy = n.baseY - n.y;

                n.vx += homeDx * SPRING_K * dt;
                n.vy += homeDy * SPRING_K * dt;

                n.vx *= DAMPING;
                n.vy *= DAMPING;

                n.x += n.vx * dt * 60;
                n.y += n.vy * dt * 60;
            }

            drawConnections();
            drawNodes();

            animationFrameId = requestAnimationFrame(renderFrame);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleResize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initNodes();
            if (reducedMotion) drawStatic();
        };

        const start = () => {
            if (running) return;
            running = true;
            if (reducedMotion) {
                drawStatic();
            } else {
                lastTime = performance.now();
                animationFrameId = requestAnimationFrame(renderFrame);
            }
        };

        const stop = () => {
            if (!running) return;
            running = false;
            cancelAnimationFrame(animationFrameId);
        };

        const handleVisibility = () => {
            if (reducedMotion) return;
            if (document.visibilityState === 'hidden') {
                stop();
            } else {
                start();
            }
        };

        const handlePageHide = () => {
            stop();
        };

        handleResize();
        start();

        // Only needed in the reduced-motion path; the rAF loop repaints on its own.
        if (reducedMotion) repaintRef.current = drawStatic;

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('pagehide', handlePageHide);

        return () => {
            stop();
            repaintRef.current = null;
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 -z-10 block h-full w-full"
        />
    );
}
