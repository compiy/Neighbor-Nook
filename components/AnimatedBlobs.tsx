"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './BackgroundBlobs.css';

const DEFAULTS = {
  count: 9,
  colors: ['#ffffff', '#e8f4ff', '#f3e8ff', '#ffe8f4'],
  minSize: 120,
  maxSize: 380,
};

export default function AnimatedBlobs() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const { count, colors, minSize, maxSize } = DEFAULTS;

    // initialize random positions/sizes/colors
    blobsRef.current.forEach((b, i) => {
      if (!b) return;
      const size = gsap.utils.random(minSize, maxSize);
      b.style.width = `${size}px`;
      b.style.height = `${size * gsap.utils.random(0.6, 1)}px`;
      b.style.left = `${gsap.utils.random(5, 95)}%`;
      b.style.top = `${gsap.utils.random(10, 75)}%`;
      b.style.opacity = `${gsap.utils.random(0.35, 0.9)}`;
      const color = colors[i % colors.length];
      const inner = b.querySelector('.bg-blob-inner') as HTMLElement | null;
      if (inner) inner.style.background = color;
    });

    // create floating + morph animations per blob
    const timelines = blobsRef.current.map((b, i) => {
      if (!b) return null;
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(b, {
        duration: gsap.utils.random(3, 8),
        x: gsap.utils.random(-240, 240),
        y: gsap.utils.random(-120, 120),
        ease: 'sine.inOut',
      }, 0);

      tl.to(b, {
        duration: gsap.utils.random(3, 6),
        width: () => `${gsap.utils.random(minSize * 0.5, maxSize * 1.05)}px`,
        height: () => `${gsap.utils.random(minSize * 0.45, maxSize * 0.9)}px`,
        borderRadius: () => (gsap.utils.random(0, 1) > 0.5 ? '50%' : '35%'),
        ease: 'power1.inOut',
      }, 0);

      const inner = b.querySelector('.bg-blob-inner') as HTMLElement | null;
      if (inner) {
        tl.to(inner, {
          duration: gsap.utils.random(2, 6),
          backgroundColor: colors[(i + 1) % colors.length],
          ease: 'sine.inOut',
        }, 0);
      }

      return tl;
    });

    // subtle group-level pulsing
    const groupPulse = gsap.to(el, {
      duration: 3,
      opacity: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      timelines.forEach(t => t?.kill && t.kill());
      groupPulse.kill();
    };
  }, []);
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <div ref={containerRef} className="bg-blobs-container">
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </svg>

            <div className="bg-blobs-wrap" style={{ filter: 'url(#goo)' }}>
              {Array.from({ length: DEFAULTS.count }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { blobsRef.current[i] = el; }}
                  className="bg-blob"
                  style={{ transformOrigin: 'center' }}
                >
                  <div className="bg-blob-inner" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

}
