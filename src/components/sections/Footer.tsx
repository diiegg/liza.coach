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
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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

      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.originalX = this.x;
        this.originalY = this.y;
        this.targetX = this.x;
        this.targetY = this.y;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 3 + 2;
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
        ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
        ctx.fill();
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
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
    const heartSize = 3.5;
    // Position heart in the space to the right of LIZA text
    const heartCenterX = canvasWidth * 0.65; // Right side area
    const heartCenterY = canvasHeight * 0.65; // Vertically centered with LIZA
    const heartPoints = createHeartPoints(heartCenterX, heartCenterY, heartSize);

    for (let i = 0; i < particleCount; i++) {
      const particle = new Particle();
      const pointIndex = Math.floor((i / particleCount) * heartPoints.length);
      particle.targetX = heartPoints[pointIndex].x;
      particle.targetY = heartPoints[pointIndex].y;
      particles.push(particle);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Only draw particles when hovering
      if (isHovering) {
        ctx.shadowBlur = 0;
        particles.forEach(particle => {
          particle.update(true);
          particle.draw(ctx);
        });
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isHovering]);

  return (
    <footer 
      className="bg-[var(--surface)] border-t border-[var(--border)] relative"
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
        {/* Top Row: Columns spread across */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Resources Column */}
          <div>
            <h3 className="text-base font-semibold text-[var(--text)] mb-4">
              {t.footer.resources}
            </h3>
            <nav className="flex flex-col space-y-3">
              <a 
                href="#services" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.nav.services}
              </a>
              <a 
                href="#method" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.nav.method}
              </a>
              <a 
                href="#results" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.nav.results}
              </a>
              <a 
                href="#about" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.nav.about}
              </a>
            </nav>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-base font-semibold text-[var(--text)] mb-4">
              {t.footer.legal}
            </h3>
            <nav className="flex flex-col space-y-3">
              <a 
                href="#" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.footer.acceptableUse}
              </a>
              <a 
                href="#" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.footer.cookiePolicy}
              </a>
              <a 
                href="#" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.footer.privacy}
              </a>
              <a 
                href="#" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.footer.terms}
              </a>
            </nav>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="text-base font-semibold text-[var(--text)] mb-4">
              {t.footer.help}
            </h3>
            <nav className="flex flex-col space-y-3">
              <a 
                href="#contact" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.footer.contact}
              </a>
              <a 
                href="#" 
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {t.footer.support}
              </a>
            </nav>
          </div>
        </div>

        {/* Giant LIZA Text Below */}
        <div className="text-[clamp(5rem,20vw,16rem)] font-black leading-[0.85] tracking-tighter text-[var(--text)] select-none">
          LIZA
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-[var(--muted)] text-center md:text-left">
            {t.footer.rights(new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
}
