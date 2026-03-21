'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/utils/gsapConfig';
import Image from 'next/image';
import { themeContent } from '@/themes';

const { gallery } = themeContent;

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef   = useRef<HTMLDivElement | null>(null);
  const [activeId,      setActiveId]      = useState<number | null>(null);
  const [videoVisible,  setVideoVisible]  = useState(false);

  const handleTap = (id: number) => {
    setActiveId(prev => prev === id ? null : id);
  };

  // Load gallery video only when section scrolls into view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVideoVisible(true); },
      { rootMargin: '200px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(titleRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
        gsap.fromTo('.gallery-item', { opacity: 0 }, {
          opacity: 1, stagger: 0.07, duration: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        });
      }, sectionRef);
      return () => ctx.revert();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-14 lg:py-20 bg-[var(--t-bg-2)] relative z-10"
    >
      {/* Header */}
      <div ref={titleRef} className="max-w-screen-xl mx-auto px-6 lg:px-12 mb-8 lg:mb-10">
        <p className="t-script text-[var(--t-accent-2)] mb-4" style={{ fontSize: '1.2rem' }}>{gallery.label}</p>
        <h2
          className="t-display font-light text-[var(--t-text)]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
        >
          {gallery.heading}
        </h2>
      </div>

      {/* Full-width tight grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 px-2 md:px-0">
        {gallery.images.map((item) => {
          const isWide        = item.wide;
          const isPortrait    = item.orientation === 'portrait';
          const aspectClass   = isWide ? 'aspect-video' : (isPortrait ? 'aspect-[3/4]' : 'aspect-square');

          return (
            <div
              key={item.id}
              className={`gallery-item relative overflow-hidden group cursor-pointer ${isWide ? 'col-span-2' : ''}`}
              style={{ opacity: 1 }}
              onClick={() => handleTap(item.id)}
            >
              <div className={`relative w-full ${aspectClass}`}>
                {item.type === 'video' ? (
                  <video
                    src={videoVisible ? item.src : undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={isWide ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                    loading="lazy"
                    quality={80}
                  />
                )}
              </div>
              {/* Overlay — hover on desktop, tap-toggle on touch */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center group-hover:opacity-100 ${activeId === item.id ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'rgba(192,159,79,0.55)' }}
              >
                <span className="t-label text-white tracking-widest text-center px-4">
                  {item.alt}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
