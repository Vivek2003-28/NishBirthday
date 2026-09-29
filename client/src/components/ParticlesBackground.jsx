import React, { useMemo } from 'react';

export default function ParticlesBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 16 + 14}s`,
      delay: `${Math.random() * 8}s`,
      opacity: Math.random() * 0.25 + 0.08
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F5F2EB]">
      {/* Newsprint Paper Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#121214 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-amber-500/[0.04] rounded-full blur-[140px]" />
      <div className="absolute top-1/2 -right-40 w-[40rem] h-[40rem] bg-rose-500/[0.03] rounded-full blur-[160px]" />

      {/* Floating Confetti / Ink Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle bg-[#121214] rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity
          }}
        />
      ))}
    </div>
  );
}

