import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScratchOffCard({ photo, onRevealed, onClickCard }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.offsetWidth || 320;
    const height = canvas.offsetHeight || 380;
    canvas.width = width;
    canvas.height = height;

    // Draw Gold Foil Metallic Cover Coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D4AF37');
    grad.addColorStop(0.3, '#FFF1D0');
    grad.addColorStop(0.6, '#E6C687');
    grad.addColorStop(1, '#99782C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add Scratch Off Pattern / Text
    ctx.fillStyle = '#08080A';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE WITH CURSOR ✨', width / 2, height / 2 - 10);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#1A1A24';
    ctx.fillText('Scratch to reveal Nishmitha\'s photo!', width / 2, height / 2 + 15);
  }, []);

  const scratch = (x, y) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const mouseX = x - rect.left;
    const mouseY = y - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 28, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentCount++;
    }

    const totalSampled = pixels.length / 16;
    const percent = Math.round((transparentCount / totalSampled) * 100);
    setScratchPercent(percent);

    if (percent > 35) {
      revealFully();
    }
  };

  const revealFully = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setScratchPercent(100);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    if (onRevealed) onRevealed(photo.id);
  };

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDrawingRef.current) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e) => {
    isDrawingRef.current = true;
    if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (isDrawingRef.current && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="relative group select-none">
      
      {/* SCOTCH TAPE STRIP TOP LEFT */}
      <div className="absolute -top-3 left-6 z-20 w-16 h-6 scotch-tape transform -rotate-12 rounded-sm" />
      {/* SCOTCH TAPE STRIP TOP RIGHT */}
      <div className="absolute -top-3 right-6 z-20 w-16 h-6 scotch-tape transform rotate-12 rounded-sm" />

      {/* POLAROID SCRAPBOOK CONTAINER */}
      <div
        onClick={() => {
          if (isRevealed && onClickCard) onClickCard(photo);
        }}
        className="polaroid-scrapbook rounded-xl p-3 relative cursor-pointer overflow-hidden transition-all"
      >
        
        {/* REVEALED PHOTO CONTENT */}
        <div className="aspect-[4/5] rounded-lg overflow-hidden relative mb-3 bg-[#08080A]">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-[#08080A]/80 backdrop-blur-md text-[9px] font-bold text-[#E6C687] border border-[#D4AF37]/30">
            {photo.tag}
          </span>
          {isRevealed && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#08080A] flex items-center justify-center shadow-lg">
                <Eye className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>

        {/* SCRAPBOOK CAPTION */}
        <div className="px-1 pt-1 text-center">
          <h3 className="font-handwriting text-2xl text-[#E6C687] leading-tight font-bold">
            {photo.title}
          </h3>
          <p className="text-[11px] text-slate-300 font-light mt-1 line-clamp-2">
            "{photo.caption}"
          </p>
        </div>

        {/* INTERACTIVE CANVAS FOIL COATING (OVERLAY) */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="absolute inset-0 w-full h-full z-10 cursor-pointer rounded-xl touch-none"
          />
        )}

        {/* SCRATCH STATUS PILL */}
        {!isRevealed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              revealFully();
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#08080A]/90 text-[#E6C687] border border-[#D4AF37]/50 text-[10px] font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#08080A] transition-all shadow-xl"
          >
            Scratch ({scratchPercent}%) • Instant Scratch ✨
          </button>
        )}

      </div>
    </div>
  );
}
