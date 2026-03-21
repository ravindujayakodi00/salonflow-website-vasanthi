'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  className?: string;
}

export default function AutoPlayVideo({ src, className }: Props) {
  const ref      = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const play    = () => v.play().catch(() => {});
    const onPlay  = () => setPlaying(true);

    v.addEventListener('loadedmetadata', play);
    v.addEventListener('loadeddata',     play);
    v.addEventListener('canplay',        play);
    v.addEventListener('canplaythrough', play);
    v.addEventListener('playing',        onPlay);

    play();

    return () => {
      v.removeEventListener('loadedmetadata', play);
      v.removeEventListener('loadeddata',     play);
      v.removeEventListener('canplay',        play);
      v.removeEventListener('canplaythrough', play);
      v.removeEventListener('playing',        onPlay);
    };
  }, [src]);

  return (
    <div className="absolute inset-0">
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={className}
      />
      {/* Covers the native play button until the video actually starts playing */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${
          playing ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
