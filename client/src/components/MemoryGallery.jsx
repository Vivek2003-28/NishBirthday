import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Grid, Flame } from 'lucide-react';

const REAL_PHOTOS = [
  {
    id: 'r1',
    url: '/images/real/nish1.jpg',
    title: 'Spontaneous Store Selfie 🤳',
    caption: 'Always bringing the fun energy — Nishmitha pulling her iconic happy face in the store background!',
    tag: 'Playful Vibe',
    date: 'Daily Joy'
  },
  {
    id: 'r2',
    url: '/images/real/nish2.jpg',
    title: 'Traditional Grace in Maroon Silk 🌸',
    caption: 'Pure elegance in a rich saree next to bestie in ethnic attire. Radiating timeless warmth & beauty!',
    tag: 'Ethnic Grace',
    date: 'Festive Vibes'
  },
  {
    id: 'r3',
    url: '/images/real/nish3.jpg',
    title: 'Pure Heart & Baby Giggles 👶💛',
    caption: 'Her gentle, caring soul shines brightest here — holding the little one with that pure, infectious smile!',
    tag: 'Heartwarming',
    date: 'Precious Moments'
  },
  {
    id: 'r4',
    url: '/images/real/nish4.jpg',
    title: 'MITE Campus Chronicles 🎓',
    caption: 'Campus laughter, squad banter, and leaning on bestie — college memories that last forever!',
    tag: 'Campus Life',
    date: 'Class of 26'
  },
  {
    id: 'r5',
    url: '/images/real/nish5.jpg',
    title: 'Sun-Kissed Vacation Vibes 🌴🕶️',
    caption: 'Sunglasses on hair, palm trees behind, and effortless cool — living her absolute best life!',
    tag: 'Vacation Mode',
    date: 'Sunny Escape'
  }
];

import ScribblePostcard from './ScribblePostcard';

export default function MemoryGallery({ isLocked, onUnlockCake }) {
  const [photos, setPhotos] = useState(REAL_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Scratch Book state
  const [revealedIds, setRevealedIds] = useState([]);

  const handleRevealed = (id) => {
    setRevealedIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  if (isLocked) {
    return (
      <section id="gallery" className="py-20 px-4 max-w-5xl mx-auto text-center">
        <div className="newspaper-card rounded-xl p-10 relative flex flex-col items-center text-[#121214]">
          <div className="w-16 h-16 rounded-full bg-[#121214] text-[#F5F2EB] flex items-center justify-center text-3xl mb-4 border-2 border-[#121214]">
            🔒
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#121214] mb-2">
            Stage 04: Scribble Postcard Gallery Locked
          </h3>
          <p className="text-slate-600 text-sm max-w-md mb-6 font-mono">
            Complete the Birthday Quests in Stage 03 above to unlock Nishmitha's B&W Postcard Gallery & Reflections!
          </p>
          <a
            href="#games"
            className="px-6 py-3 rounded-full bg-[#121214] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#2a2a2e] transition-all border-2 border-[#121214] shadow-[4px_4px_0px_#121214]"
          >
            Go to Quests Stage ↑
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 px-4 max-w-7xl mx-auto relative">
      
      {/* Title Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="font-mono text-xs uppercase px-3 py-1 bg-[#121214] text-[#F5F2EB] font-bold rounded-sm border border-[#121214]">
            04. REFLECTIONS & GALLERY
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#121214] tracking-tight leading-tight">
          Reflections of Nishmitha
        </h2>
        <p className="text-slate-700 mt-4 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed">
          Black & white line art postcards, charcoal scratch-off reveals, and handwritten stories.
        </p>

        {/* View Mode Switcher */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121214] ${
              viewMode === 'grid'
                ? 'bg-[#121214] text-white shadow-[4px_4px_0px_#121214]'
                : 'bg-[#FAF8F3] text-[#121214] hover:bg-[#EAE5D9]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Postcard Grid
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121214] ${
              viewMode === 'carousel'
                ? 'bg-[#121214] text-white shadow-[4px_4px_0px_#121214]'
                : 'bg-[#FAF8F3] text-[#121214] hover:bg-[#EAE5D9]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 3D Gallery
          </button>
        </div>
      </div>

      {/* PHOTO GALLERY GRID WITH B&W SCRIBBLE POSTCARDS */}
      {viewMode === 'grid' ? (
        <div className="space-y-8 mb-16 max-w-5xl mx-auto">
          {photos.map((photo) => (
            <ScribblePostcard
              key={photo.id}
              photo={photo}
              onRevealed={handleRevealed}
              onClickCard={(p) => setSelectedPhoto(p)}
            />
          ))}
        </div>
      ) : (
        /* 3D CAROUSEL MODE */
        <div className="mb-16 py-8 flex flex-col items-center">
          <div className="relative w-full max-w-xl h-[420px] flex items-center justify-center">
            {photos.map((photo, index) => {
              const offset = index - carouselIndex;
              const isActive = index === carouselIndex;

              return (
                <motion.div
                  key={photo.id}
                  animate={{
                    x: offset * 130,
                    scale: isActive ? 1 : 0.82,
                    rotateY: offset * -15,
                    zIndex: photos.length - Math.abs(offset),
                    opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-80 h-[400px] newspaper-card rounded-xl p-4 cursor-pointer flex flex-col justify-between bg-[#FAF8F3] text-[#121214]"
                  onClick={() => {
                    if (isActive) setSelectedPhoto(photo);
                    else setCarouselIndex(index);
                  }}
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-3/4 object-cover rounded-lg border-2 border-[#121214] bw-sketch" />
                  <div className="p-3 bg-[#EAE5D9] h-1/4 flex flex-col justify-center rounded-b-lg border-t-2 border-[#121214]">
                    <h4 className="font-serif font-bold text-sm text-[#121214] truncate">{photo.title}</h4>
                    <p className="text-xs text-slate-700 font-sans truncate mt-1">{photo.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setCarouselIndex(prev => (prev > 0 ? prev - 1 : photos.length - 1))}
              className="px-5 py-2.5 rounded-full bg-[#121214] text-white text-xs font-mono border-2 border-[#121214] cursor-pointer shadow-[3px_3px_0px_#121214] hover:bg-[#2a2a2e]"
            >
              ← Previous Photo
            </button>
            <button
              onClick={() => setCarouselIndex(prev => (prev < photos.length - 1 ? prev + 1 : 0))}
              className="px-5 py-2.5 rounded-full bg-[#121214] text-white text-xs font-mono border-2 border-[#121214] cursor-pointer shadow-[3px_3px_0px_#121214] hover:bg-[#2a2a2e]"
            >
              Next Photo →
            </button>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-3xl w-full newspaper-card rounded-2xl overflow-hidden p-6 relative text-[#121214] bg-[#FAF8F3]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#121214] text-white hover:bg-[#2a2a2e] transition-all cursor-pointer border-2 border-[#121214]"
              >
                <X className="w-5 h-5" />
              </button>

              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full max-h-[60vh] object-contain rounded-xl mb-4 border-2 border-[#121214]" />

              <div className="px-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#121214]">
                    {selectedPhoto.title}
                  </h3>
                  <span className="font-mono text-xs bg-[#121214] text-[#F5F2EB] px-3 py-1 rounded-full font-bold">
                    {selectedPhoto.tag}
                  </span>
                </div>
                <p className="text-slate-800 text-sm sm:text-base mt-2 font-sans leading-relaxed">{selectedPhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proceed to Stage 5 CTA */}
      <div className="mt-16 flex flex-col items-center">
        <button
          onClick={onUnlockCake}
          className="px-8 py-4 rounded-full bg-[#121214] text-[#F5F2EB] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#2a2a2e] transition-all border-2 border-[#121214] shadow-[6px_6px_0px_#121214] flex items-center gap-3 cursor-pointer"
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>PROCEED TO STAGE 05: CANDLE CEREMONY 🕯️</span>
        </button>
      </div>

    </section>
  );
}


