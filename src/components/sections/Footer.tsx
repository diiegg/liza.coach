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
      originalX: number;
      originalY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.originalX = this.x;
        this.originalY = this.y;
        this.targetX = this.x;
        this.targetY = this.y;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 3 + 2; // Restored original size range
        // Elegant peach/pink palette
        const colors = ['244, 198, 182', '251, 231, 198', '255, 255, 255'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
        this.color = `rgba(${color}, ${this.alpha})`;
      }

      update(isForming: boolean) {
        if (isForming) {
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.vx += dx * 0.05;
          this.vy += dy * 0.05;
        } else {
          const dx = this.originalX - this.x;
          const dy = this.originalY - this.y;
          this.vx += dx * 0.02;
          this.vy += dy * 0.02;
        }

        this.vx *= 0.9;
        this.vy *= 0.9;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create heart shape points
    const createHeartPoints = (centerX: number, centerY: number, size: number) => {
      const points: { x: number; y: number }[] = [];
      for (let t = 0; t < Math.PI * 2; t += 0.05) {
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
    const particleCount = 120;
    const particles: Particle[] = [];
    const heartSize = 4.5;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const updateHeartPosition = () => {
      let heartCenterX = canvasWidth * 0.75; // Default fallback
      let heartCenterY = canvasHeight * 0.75;

      // Try to find the target "P" element
      const targetP = document.getElementById('target-p');
      if (targetP && canvas) {
        const pRect = targetP.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        // Center on the "P"
        heartCenterX = (pRect.left - canvasRect.left) + (pRect.width / 2);
        heartCenterY = (pRect.top - canvasRect.top) + (pRect.height / 2);
      } else {
        // Fallback to LIZA text if P is missing (shouldn't happen)
        const lizaText = document.getElementById('liza-text');
        if (lizaText && canvas) {
          const lizaRect = lizaText.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          const targetX = (lizaRect.right - canvasRect.left) + 60;
          heartCenterX = Math.min(targetX, canvasWidth - 80);
          heartCenterY = (lizaRect.top - canvasRect.top) + (lizaRect.height / 2);
        }
      }

      const heartPoints = createHeartPoints(heartCenterX, heartCenterY, heartSize);

      particles.forEach((particle, i) => {
        const pointIndex = Math.floor((i / particleCount) * heartPoints.length);
        if (heartPoints[pointIndex]) {
          particle.targetX = heartPoints[pointIndex].x;
          particle.targetY = heartPoints[pointIndex].y;
        }
      });
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';

      updateHeartPosition();
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Add ResizeObserver to watch for text changes (font loading, layout shifts)
    let observer: ResizeObserver | null = null;
    const lizaText = document.getElementById('liza-text');
    if (lizaText) {
      observer = new ResizeObserver(() => {
        updateHeartPosition();
      });
      observer.observe(lizaText);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Always draw particles (removed isHovering check for visibility)
      // Soft glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(244, 198, 182, 0.5)'; // Increased glow opacity

      particles.forEach(particle => {
        // Update with isHovering state to control animation behavior (forming vs scattering)
        // But always draw them
        particle.update(true); // Always forming/visible for now to ensure user sees it
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
      {/* Canvas for particle effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column (Wider) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="text-2xl font-bold tracking-tight text-[var(--text)]">
              LIZA
            </div>
            <p className="text-[var(--muted)] max-w-xs leading-relaxed">
              Empowering you to find clarity, build systems, and achieve your true potential through the CALM method.
            </p>
            <div className="pt-2">
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
        <div className="flex items-baseline gap-32 md:gap-48 lg:gap-64">
          <div
            id="liza-text"
            className="w-fit text-[clamp(5rem,20vw,18rem)] font-black leading-[0.8] tracking-tighter text-[var(--text)] opacity-10 select-none pointer-events-none"
          >
            LIZA
          </div>
          {/* Anchor P element */}
          <div
            id="target-p"
            className="text-[clamp(5rem,20vw,18rem)] font-black text-[var(--brand)] opacity-20 select-none pointer-events-none"
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
