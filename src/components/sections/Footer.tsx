'use client';

import { Translations } from '@/lib/i18n';
import { useEffect, useRef, useState } from 'react';

interface FooterProps {
  t: Translations;
}

export function Footer({ t }: FooterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    let canvasWidth = 0;
    let canvasHeight = 0;
    // resizeCanvas definition moved below to access updateHeartPosition

    // Particle class
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      randomX: number;
      randomY: number;

      constructor(startX: number, startY: number) {
        // Start AT the heart position
        this.x = startX;
        this.y = startY;
        this.randomX = startX + (Math.random() - 0.5) * 100;
        this.randomY = startY + (Math.random() - 0.5) * 100;

        this.targetX = startX;
        this.targetY = startY;
        this.vx = 0;
        this.vy = 0;

        this.size = Math.random() * 2 + 4; // 4-6px
        // Bright pink/red for visibility
        const colors = ['255, 105, 180', '255, 20, 147', '220, 20, 60'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.2 + 0.8;
        this.color = `rgba(${color}, ${this.alpha})`;
      }

      update(isHovering: boolean) {
        // Determine target based on hover state
        const destX = isHovering ? this.targetX : this.randomX;
        const destY = isHovering ? this.targetY : this.randomY;

        const dx = destX - this.x;
        const dy = destY - this.y;

        // Physics for smooth movement
        if (isHovering) {
          // Faster convergence when forming
          this.vx += dx * 0.05; // Increased speed
          this.vy += dy * 0.05;
          this.vx *= 0.9; // Dampening
          this.vy *= 0.9;
        } else {
          // Slower, floaty movement when scattered
          this.vx += dx * 0.01;
          this.vy += dy * 0.01;
          this.vx *= 0.95;
          this.vy *= 0.95;

          // Add slight random drift when scattered
          this.x += (Math.random() - 0.5) * 0.5;
          this.y += (Math.random() - 0.5) * 0.5;
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Create heart shape points
    const createHeartPoints = (centerX: number, centerY: number, size: number) => {
      const points: { x: number; y: number }[] = [];
      for (let t = 0; t < Math.PI * 2; t += 0.1) { // Optimized step
        const x = size * 16 * Math.pow(Math.sin(t), 3);
        const y = -size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        points.push({
          x: centerX + x,
          y: centerY + y
        });
      }
      return points;
    };

    // Initialize particles
    const particleCount = 150; // More particles
    const particles: Particle[] = [];
    const heartSize = 4.5;

    // Helper to get target position
    const getTargetPosition = () => {
      const targetP = document.getElementById('target-p');
      if (targetP && canvas) {
        const pRect = targetP.getBoundingClientRect();
        // Use parent for canvas rect to be safe
        const parent = canvas.parentElement;
        const canvasRect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();

        return {
          x: (pRect.left - canvasRect.left) + (pRect.width / 2),
          y: (pRect.top - canvasRect.top) + (pRect.height / 2)
        };
      }
      return { x: canvasWidth / 2, y: canvasHeight / 2 };
    };

    // Will initialize particles after first resize
    const initParticles = () => {
      if (particles.length > 0) return; // Already initialized

      const pos = getTargetPosition();
      const initialHeartPoints = createHeartPoints(pos.x, pos.y, heartSize);

      for (let i = 0; i < particleCount; i++) {
        const pointIndex = Math.floor((i / particleCount) * initialHeartPoints.length);
        const pt = initialHeartPoints[pointIndex] || { x: pos.x, y: pos.y };
        particles.push(new Particle(pt.x, pt.y));
      }

      updateHeartPosition();
    };

    const updateHeartPosition = () => {
      const pos = getTargetPosition();
      const heartPoints = createHeartPoints(pos.x, pos.y, heartSize);

      particles.forEach((particle, i) => {
        const pointIndex = Math.floor((i / particleCount) * heartPoints.length);
        if (heartPoints[pointIndex]) {
          particle.targetX = heartPoints[pointIndex].x;
          particle.targetY = heartPoints[pointIndex].y;
        }
      });
    };

    const resizeCanvas = () => {
      // Use parent element (footer) dimensions to ensure full coverage
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();

      canvasWidth = rect.width;
      canvasHeight = rect.height;

      // Set canvas rendering size (NO DPR scaling - keeps coordinates simple)
      canvas.width = rect.width;
      canvas.height = rect.height;

      updateHeartPosition();
    };

    // Initial resize and particle creation
    resizeCanvas();
    // Wait a tick for layout to settle
    requestAnimationFrame(() => {
      initParticles();
    });
    window.addEventListener('resize', resizeCanvas);

    // Add ResizeObserver to watch for layout changes
    let observer: ResizeObserver | null = null;
    const targetP = document.getElementById('target-p');
    if (targetP) {
      observer = new ResizeObserver(() => {
        updateHeartPosition();
      });
      observer.observe(targetP);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (particles.length === 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach(particle => {
        particle.update(isHovering);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      // Cleanup observer if it exists (not strictly necessary in useEffect return but good practice)
      if (observer) {
        observer.disconnect();
      }
    };
  }, []); // Removed isHovering dependency to run once

  return (
    <footer
      className="bg-[var(--surface)] border-t border-[var(--border)] relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Canvas for particle effect - High Z-index */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50"
      />

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-8">

          {/* Brand Column (Wider) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-2xl font-bold tracking-tight text-[var(--text)]">
              LIZA
            </div>
            <p className="text-[var(--muted)] max-w-xs leading-relaxed">
              Empowering you to find clarity, build systems, and achieve your true potential through the CALM method.
            </p>
            <div>
              <a href="mailto:hello@liza.coach" className="text-[var(--text)] font-medium hover:text-[var(--brand)] transition-colors">
                hello@liza.coach
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Resources */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-6">
                {t.footer.resources}
              </h3>
              <nav className="flex flex-col space-y-4">
                <a href="#services" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.nav.services}
                </a>
                <a href="#method" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.nav.method}
                </a>
                <a href="#results" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.nav.results}
                </a>
                <a href="#about" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.nav.about}
                </a>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-6">
                {t.footer.legal}
              </h3>
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.footer.acceptableUse}
                </a>
                <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.footer.cookiePolicy}
                </a>
                <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.footer.privacy}
                </a>
                <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.footer.terms}
                </a>
              </nav>
            </div>

            {/* Connect (New) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-6">
                Connect
              </h3>
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors flex items-center gap-2">
                  <span>Instagram</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors flex items-center gap-2">
                  <span>LinkedIn</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#contact" className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors">
                  {t.footer.contact}
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Giant LIZA Text Below with P anchor */}
        <div className="flex items-baseline gap-32 md:gap-48 lg:gap-64 -mt-12 lg:-mt-20">
          <div
            id="liza-text"
            className="w-fit text-[clamp(5rem,20vw,18rem)] font-black leading-[0.8] tracking-tighter text-[var(--text)] opacity-10 select-none pointer-events-none"
          >
            LIZA
          </div>
          {/* Anchor P element (Visible for verification) */}
          <div
            id="target-p"
            className="text-[clamp(5rem,20vw,18rem)] font-black text-[var(--brand)] opacity-30 select-none pointer-events-none"
          >
            P
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--muted)]">
            {t.footer.rights(new Date().getFullYear())}
          </p>
          <p className="text-xs text-[var(--muted)]">
            Designed with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
