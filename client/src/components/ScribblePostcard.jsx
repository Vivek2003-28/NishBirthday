import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Sparkles, Stamp, Send, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScribblePostcard({ photo, onRevealed, onClickCard }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isColorMode, setIsColorMode] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.offsetWidth || 300;
    const height = canvas.offsetHeight || 320;
    canvas.width = width;
    canvas.height = height;

    // Draw Charcoal Scratch Texture in Vintage Dark Palette
    ctx.fillStyle = '#1c1b18';
    ctx.fillRect(0, 0, width, height);

    // Draw Hand-Scribbled Lines
    ctx.strokeStyle = '#2d2b27';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < height; i += 8) {
      ctx.beginPath();
      ctx.moveTo(0, i + (Math.random() * 4 - 2));
      ctx.lineTo(width, i + (Math.random() * 4 - 2));
      ctx.stroke();
    }

    // Scribble Text
    ctx.fillStyle = '#FAF8F3';
    ctx.font = 'bold 16px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.fillText('CHARCOAL SCRATCH COVER', width / 2, height / 2 - 12);
    ctx.font = '12px "Space Mono", monospace';
    ctx.fillStyle = '#D4CEBF';
    ctx.fillText('Scratch cursor to reveal B&W Postcard Art', width / 2, height / 2 + 15);
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
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#121214', '#E8A598', '#F5F2EB', '#FFFFFF']
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

  return (
    <div className="newspaper-card rounded-xl p-5 sm:p-6 relative select-none bg-[#FAF8F3] text-[#121214]">
      
      {/* POSTMARK STAMP BAR */}
      <div className="flex items-center justify-between border-b-2 border-[#121214] pb-3 mb-4 text-xs">
        <div className="flex items-center gap-2 font-mono text-slate-700 text-xs">
          <Feather className="w-3.5 h-3.5 text-[#121214]" />
          <span className="uppercase tracking-widest font-bold">Postcard Issue • Oct 02 Gazette</span>
        </div>
        <div className="font-mono text-[10px] text-white font-bold bg-[#121214] px-2.5 py-1 rounded-sm border border-[#121214]">
          AIR MAIL ♒ OCT 02
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* LEFT PHOTO COLUMN (SCRATCHABLE B&W SKETCH PHOTO) */}
        <div className="md:col-span-6 relative">
          <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-[#EAE5D9] border-2 border-[#121214] shadow-[4px_4px_0px_#121214]">
            
            <img
              src={photo.url}
              alt={photo.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isColorMode ? 'filter-none' : 'bw-sketch'
              }`}
            />

            {/* Color / B&W Toggle */}
            {isRevealed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsColorMode(!isColorMode);
                }}
                className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-[#121214] text-white font-mono text-[10px] font-bold border border-[#121214] hover:bg-[#2a2a2e] transition-all cursor-pointer shadow-md"
              >
                {isColorMode ? '🖤 B&W Sketch' : '🎨 Color Photo'}
              </button>
            )}

            <span className="absolute top-3 right-3 font-mono bg-[#121214] text-[10px] font-bold text-white px-2.5 py-1 rounded-full">
              {photo.tag}
            </span>

            {/* SCRATCH CANVAS OVERLAY */}
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={(e) => {
                  isDrawingRef.current = true;
                  if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
                }}
                onTouchMove={(e) => {
                  if (isDrawingRef.current && e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
                }}
                onTouchEnd={handleMouseUp}
                className="absolute inset-0 w-full h-full z-10 cursor-pointer rounded-xl touch-none"
              />
            )}
          </div>

          {!isRevealed && (
            <button
              onClick={revealFully}
              className="mt-3 w-full py-2.5 rounded-full bg-[#121214] hover:bg-[#2a2a2e] text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all border-2 border-[#121214] cursor-pointer shadow-[3px_3px_0px_#121214]"
            >
              Scratch ({scratchPercent}%) • Instant Reveal ✨
            </button>
          )}
        </div>

        {/* RIGHT POSTCARD HANDWRITTEN NOTE & POSTAGE STAMP */}
        <div className="md:col-span-6 flex flex-col justify-between h-full space-y-4">
          
          <div className="flex items-start justify-between border-b-2 border-[#121214] pb-3">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#121214] leading-tight">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-600 font-mono mt-1">Reflect ID: #{photo.id}</p>
            </div>

            {/* POSTAGE STAMP BOX */}
            <div className="w-14 h-16 border-2 border-dashed border-[#121214] rounded-md flex flex-col items-center justify-center p-1 text-center bg-[#F5F2EB] shadow-sm">
              <span className="text-base">👑</span>
              <span className="text-[8px] uppercase tracking-tighter text-[#121214] font-mono font-bold">NVG STAMP</span>
            </div>
          </div>

          {/* HANDWRITTEN MEMORY STORY */}
          <div className="p-4 rounded-xl bg-[#EAE5D9] border-2 border-[#121214]">
            <p className="font-sans text-sm sm:text-base text-slate-800 leading-relaxed italic">
              "{photo.caption}"
            </p>
          </div>

          {/* ADDRESS LINES */}
          <div className="space-y-1.5 pt-2 font-mono text-xs text-slate-700">
            <div className="border-b border-dashed border-[#121214] pb-1 font-bold">
              To: Queen Nishmitha V G 👑
            </div>
            <div className="border-b border-dashed border-[#121214] pb-1">
              MITE Realm • Oct 2nd Birthday Gazette
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

