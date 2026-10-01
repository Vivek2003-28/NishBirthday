import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Award, ChevronLeft, ChevronRight, Layers, Newspaper } from 'lucide-react';
import confetti from 'canvas-confetti';

const COVER_STACK_PHOTOS = [
  {
    id: 2,
    url: '/images/real/nish3.jpg',
    title: 'Spontaneous Store Selfie 🤳',
    subtitle: 'Pure joyful energy & playful vibes',
    tag: 'EDITION #01'
  },
  {
    id: 1,
    url: '/images/real/nish1.jpg',
    title: 'Traditional Grace in Maroon Silk 🌸',
    subtitle: 'Timeless ethnic elegance & radiant smile',
    tag: 'EDITION #02'
  },
  {
    id: 3,
    url: '/images/real/nish4.jpg',
    title: 'Pure Heart & Baby Giggles 👶',
    subtitle: 'Gentle soul & infectious laughter',
    tag: 'EDITION #03'
  },
  {
    id: 4,
    url: '/images/real/nish2.jpg',
    title: 'MITE Campus Chronicles 🎓',
    subtitle: 'Squad banter & college memories',
    tag: 'EDITION #04'
  },
  {
    id: 5,
    url: '/images/real/nish9.jpg',
    title: 'Sun-Kissed Vacation Vibes 🌴',
    subtitle: 'Effortless cool & palm tree escapes',
    tag: 'EDITION #05'
  }
];

export default function CountdownTimer({ onCelebrate, onStartQuest }) {
  const [activeCoverIndex, setActiveCoverIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false
  });

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveCoverIndex((prev) => (prev + 1) % COVER_STACK_PHOTOS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      let bdayDate = new Date(currentYear, 9, 2, 0, 0, 0); // Oct 2nd

      if (now.getTime() > bdayDate.getTime() + 86400000) {
        bdayDate = new Date(currentYear + 1, 9, 2, 0, 0, 0);
      }

      const diff = bdayDate.getTime() - now.getTime();
      const isTodayOct2 = now.getMonth() === 9 && now.getDate() === 2;

      if (diff <= 0 || isTodayOct2) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isBirthday: false });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#121214', '#E8A598', '#F5F2EB', '#fbbf24']
    });
    if (onCelebrate) onCelebrate();
  };

  const handleNextCover = () => {
    setIsAutoPlaying(false);
    setActiveCoverIndex((prev) => (prev + 1) % COVER_STACK_PHOTOS.length);
  };

  const handlePrevCover = () => {
    setIsAutoPlaying(false);
    setActiveCoverIndex((prev) => (prev - 1 + COVER_STACK_PHOTOS.length) % COVER_STACK_PHOTOS.length);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto text-[#121214]">

      {/* 1. NEWSPAPER TOP BAR (Birthday Times Style) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-dashed border-[#121214] pb-4 mb-10 font-mono text-xs text-[#121214] font-bold">
        <div className="flex items-center gap-3">
          <span className="postmark-stamp bg-white">SPECIAL EDITION • ISSUE #0210</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">VOL. 2026</span>
        </div>
        <div className="uppercase tracking-widest text-[11px] text-slate-700">
          The Birthday Times Gazette • Published by Besties
        </div>
      </div>

      {/* 2. NEWSPAPER FRONT-PAGE HEADLINE */}
      <div className="text-center mb-14 border-b-4 border-[#121214] pb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-700 font-bold mb-2 inline-block bg-[#FAF8F3] px-3 py-1 border border-[#121214] rounded-full">
          📰 FRONT PAGE EXCLUSIVE
        </span>
        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold font-serif-title tracking-tight leading-none text-[#121214] uppercase">
          THE BIRTHDAY TIMES
        </h1>
        <p className="font-handwriting text-3xl sm:text-4xl text-[#121214] mt-3 font-bold">
          "Celebrating 23 Years of Queen Nishmitha V G!"
        </p>
      </div>

      {/* 3. NEWSPAPER MAIN GRID (COLUMNS + CAROUSEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 border-b-2 border-dashed border-[#121214] pb-14">

        {/* Left Column: Gazette Story & Countdown */}
        <div className="lg:col-span-7 space-y-6">

          <div className="newspaper-card rounded-2xl p-6 sm:p-8 bg-white relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#121214] mb-3">
              Extra! Extra! Read All About Queen Nishmitha
            </h2>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium mb-4">
              The world has changed immeasurably, yet we still see a lot of her radiant joy in our everyday lives — from campus laughter and spontaneous adventures to unwavering friendship and pure warmth.
            </p>
            <p className="text-slate-700 text-xs sm:text-sm font-handwriting text-2xl font-bold text-slate-900">
              "We're her best friends & squad. We thought, what can we do to celebrate Nishmitha's special day in the most iconic way? We built this custom Birthday Times Gazette!"
            </p>
          </div>

          {/* Countdown Card */}
          <div className="newspaper-card rounded-2xl p-6 bg-[#FAF8F3] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-[#121214] pb-3 font-mono">
              <span className="text-xs uppercase tracking-widest text-[#121214] font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#121214]" /> Birthday Gala Countdown • Oct 2nd
              </span>
              <span className="postmark-stamp text-[10px] bg-white">OCT 02</span>
            </div>

            {timeLeft.isBirthday ? (
              <div className="py-4 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#121214] mb-2">
                  IT'S QUEEN NISHMITHA'S BIRTHDAY TODAY!
                </h2>
                <p className="text-slate-800 text-xs mb-4 font-mono font-bold">All hail Queen Nishmitha! Raise a glass!</p>
                <button
                  onClick={triggerConfetti}
                  className="px-6 py-3 rounded-full bg-[#121214] text-[#F5F2EB] font-bold text-xs uppercase shadow-md hover:bg-slate-900 border-2 border-[#121214] cursor-pointer"
                >
                  Pop Birthday Confetti
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono">
                {[
                  { label: 'Days', val: timeLeft.days },
                  { label: 'Hours', val: timeLeft.hours },
                  { label: 'Mins', val: timeLeft.minutes },
                  { label: 'Secs', val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center p-3 rounded-xl bg-white border-2 border-[#121214] shadow-sm">
                    <span className="text-2xl sm:text-4xl font-extrabold font-mono text-[#121214]">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-700 font-bold mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartQuest}
              className="px-8 py-4 rounded-full bg-[#121214] text-[#F5F2EB] font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-slate-900 hover:scale-105 transition-all flex items-center gap-2 border-2 border-[#121214] cursor-pointer"
            >
              Start Gazette Quest  →
            </button>
            <button
              onClick={triggerConfetti}
              className="px-6 py-4 rounded-full bg-white text-[#121214] font-bold text-xs uppercase tracking-wider border-2 border-[#121214] hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Send Birthday Sparkles
            </button>
          </div>

        </div>

        {/* Right Column: Cartoonistic B&W Photo Stack Carousel */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center cursor-pointer select-none"
            onClick={handleNextCover}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="popLayout">
              {COVER_STACK_PHOTOS.map((cover, idx) => {
                const total = COVER_STACK_PHOTOS.length;
                const offset = (idx - activeCoverIndex + total) % total;

                if (offset > 2) return null;

                const isTop = offset === 0;

                return (
                  <motion.div
                    key={cover.id}
                    initial={{ opacity: 0, scale: 0.8, y: -20, rotate: 10 }}
                    animate={{
                      opacity: isTop ? 1 : 1 - offset * 0.25,
                      scale: 1 - offset * 0.05,
                      y: offset * 16,
                      x: offset * 6,
                      rotate: offset * 4 - 2,
                      zIndex: total - offset
                    }}
                    exit={{ opacity: 0, scale: 0.7, y: 50, rotate: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 newspaper-card p-4 rounded-2xl border-2 border-[#121214] bg-white shadow-[8px_8px_0px_#121214] flex flex-col justify-between overflow-hidden"
                  >
                    {/* B&W Photo */}
                    <div className="aspect-[3/3.8] overflow-hidden rounded-xl relative border-2 border-[#121214] bg-[#FAF8F3]">
                      <img
                        src={cover.url}
                        alt={cover.title}
                        className="w-full h-full object-cover bw-sketch"
                      />

                      <span className="absolute bottom-3 left-3 postmark-stamp text-[10px] bg-white font-bold text-[#121214]">
                        {cover.tag}
                      </span>
                    </div>

                    {/* Editorial Caption */}
                    <div className="text-left font-mono mt-3">
                      <h3 className="font-serif-title text-xl text-[#121214] leading-tight font-bold truncate">
                        {cover.title}
                      </h3>
                      <p className="text-xs text-slate-700 font-bold tracking-wider uppercase mt-1 truncate">
                        {cover.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between w-full max-w-sm mt-6 pt-4 border-t-2 border-dashed border-[#121214] font-mono text-xs font-bold text-[#121214]">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#121214]" />
              <span>POSTCARD {activeCoverIndex + 1} OF {COVER_STACK_PHOTOS.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCover}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#121214] border-2 border-[#121214] transition-all cursor-pointer shadow-sm"
                title="Previous Cover"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextCover}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#121214] border-2 border-[#121214] transition-all cursor-pointer shadow-sm"
                title="Next Cover"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}



