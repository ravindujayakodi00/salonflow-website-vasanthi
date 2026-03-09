'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/utils/gsapConfig';
import { themeContent } from '@/themes';

const { cta } = themeContent;

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 32, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book"
      className="relative py-24 lg:py-40 overflow-hidden z-10"
      style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #fffefc 50%, #f5ebe0 100%)' }}
    >
      {/* Decorative large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="t-display font-light whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 15vw, 14rem)',
            letterSpacing: '0.05em',
            color: 'rgba(205, 155, 119, 0.08)',
          }}
        >
          Book
        </span>
      </div>

      <div className="cta-content relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
        <p className="t-label text-[var(--t-accent-2)] mb-6 tracking-[0.45em]">
          {cta.label}
        </p>
        <h2
          className="t-display font-light text-[var(--t-text)] mb-8 max-w-3xl mx-auto leading-[1.1]"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
        >
          {cta.heading}
        </h2>
        <p className="text-[var(--t-text-2)] text-sm max-w-md mx-auto mb-12 leading-relaxed">
          {cta.subtext}
        </p>
        <Link href="/booking" className="t-btn t-btn-accent">
          {cta.buttonText}
        </Link>
        <p className="t-label text-[var(--t-text-3)] mt-8 text-[0.58rem] tracking-[0.3em]">
          {cta.footnote}
        </p>
      </div>
    </section>
  );
}
