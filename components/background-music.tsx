'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic({ isPasses }: { isPasses: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Autoplay setelah user gesture atau langsung di load
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1; // atur volume
      audio.play().catch(() => {
        console.log('Autoplay gagal, butuh gesture user');
      });
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source
        src={isPasses ? '/bg-music.mp3' : '/bg-music-2.mp3'}
        type='audio/mpeg'
      />
      Your browser does not support the audio element.
    </audio>
  );
}
