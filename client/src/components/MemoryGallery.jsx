import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Grid, Sparkles, Flame, Feather } from 'lucide-react';
import ScribblePostcard from './ScribblePostcard';

const COLUMN_1 = [
  {
    id: 'c1_1',
    url: '/images/real/nish14.jpg',
    title: 'Spontaneous Store Selfie ',
    caption: 'Always bringing the fun energy — Nishmitha pulling her iconic happy face in the store background!',
    tag: 'Playful Vibe',
    date: 'Daily Joy',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'c1_2',
    url: '/images/real/nish6.jpg',
    title: 'Red Kurta Power Pose ',
    caption: 'Flexing bicep confidence in red ethnic attire at college campus!',
    tag: 'Boss Energy',
    date: 'Campus Life',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'c1_3',
    url: '/images/real/nish13.jpg',
    title: 'Festive Green Glamour ',
    caption: 'Stunning in green ethnic attire, capturing candid photo moments!',
    tag: 'Festive Vibe',
    date: 'Golden Moments',
    aspect: 'aspect-[4/3]'
  }
];

const COLUMN_2 = [
  {
    id: 'c2_1',
    url: '/images/real/nish4.jpg',
    title: 'MITE Campus Chronicles ',
    caption: 'Campus laughter, squad banter, and leaning on bestie — college memories that last forever!',
    tag: 'Campus Life',
    date: 'Class of 26',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'c2_2',
    url: '/images/real/nish7.jpg',
    title: 'River Rafting Thrills ',
    caption: 'Helmets on, lifejackets strapped, paddling through wild waters with pure excitement!',
    tag: 'Adventure Vibe',
    date: 'River Rafting',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'c2_3',
    url: '/images/real/nish11.jpg',
    title: 'Cosmic Starry Night Horizon ',
    caption: 'Gazing up at billions of shining stars in the midnight sky.',
    tag: 'Starry Sky',
    date: 'Midnight Magic',
    aspect: 'aspect-[16/9]'
  }
];

const COLUMN_3 = [
  {
    id: 'c3_1',
    url: '/images/real/nish9.jpg',
    title: 'Poolside Palm Tree Chill ',
    caption: 'Sunglasses on, tropical palm trees behind, soaking up summer poolside warmth with bestie!',
    tag: 'Vacation Mode',
    date: 'Sunny Escape',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'c3_2',
    url: '/images/real/nish3.jpg',
    title: 'Pure Heart & Baby Giggles ',
    caption: 'Her gentle, caring soul shines brightest here holding the little one with that pure smile!',
    tag: 'Heartwarming',
    date: 'Precious Moments',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'c3_3',
    url: '/images/real/nish10.jpg',
    title: 'Auditorium Candid Glance ',
    caption: 'Turning around with that bright, curious look during college seminar sessions.',
    tag: 'Candid Shot',
    date: 'Seminar Hall',
    aspect: 'aspect-[4/3]'
  }
];

const COLUMN_4 = [
  {
    id: 'c4_1',
    url: '/images/real/nish1.jpg',
    title: 'Traditional Grace in Maroon Silk ',
    caption: 'Pure elegance in a rich saree next to bestie in ethnic attire. Radiating timeless warmth!',
    tag: 'Ethnic Grace',
    date: 'Festive Vibes',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'c4_2',
    url: '/images/real/nish8.jpg',
    title: 'Golden Hour Photo Pose ',
    caption: 'Posing gracefully while bestie captures the perfect picture in green ethnic outfit.',
    tag: 'Behind The Scenes',
    date: 'Photo Moment',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'c4_3',
    url: '/images/real/nish9.jpg ',
    title: 'Cliffside Golden Hour Peak ',
    caption: 'Standing at the peak watching the golden sunset glow.',
    tag: 'Golden Hour',
    date: 'Sunset Vista',
    aspect: 'aspect-[4/3]'
  }
];

const ALL_PHOTOS = [...COLUMN_1, ...COLUMN_2, ...COLUMN_3, ...COLUMN_4];

export default function MemoryGallery({ isLocked, onUnlockCake }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState('darkGrid'); // 'darkGrid' | 'postcards' | 'carousel'
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isModalBW, setIsModalBW] = useState(false);

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
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <span className="font-mono text-xs uppercase px-3.5 py-1.5 bg-[#121214] text-[#F5F2EB] font-bold rounded-sm border border-[#121214] shadow-sm">
            04. REFLECTIONS & SCRIBBLE GALLERY
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#121214] tracking-tight leading-tight">
          Reflections of Nishmitha 📸
        </h2>
        <p className="text-slate-700 mt-4 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          Explore the aesthetic photo anthology of Queen Nishmitha — featuring dark portfolio grid, charcoal scratch-off postcards, and handwritten reflections.
        </p>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            onClick={() => setViewMode('darkGrid')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121214] ${viewMode === 'darkGrid'
              ? 'bg-[#121214] text-white shadow-[4px_4px_0px_#121214]'
              : 'bg-[#FAF8F3] text-[#121214] hover:bg-[#EAE5D9]'
              }`}
          >
            <Grid className="w-3.5 h-3.5" /> Dark Photo Grid
          </button>
          <button
            onClick={() => setViewMode('postcards')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121214] ${viewMode === 'postcards'
              ? 'bg-[#121214] text-white shadow-[4px_4px_0px_#121214]'
              : 'bg-[#FAF8F3] text-[#121214] hover:bg-[#EAE5D9]'
              }`}
          >
            <Feather className="w-3.5 h-3.5" /> Scratch Postcards
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-2 border-[#121214] ${viewMode === 'carousel'
              ? 'bg-[#121214] text-white shadow-[4px_4px_0px_#121214]'
              : 'bg-[#FAF8F3] text-[#121214] hover:bg-[#EAE5D9]'
              }`}
          >
            <Layers className="w-3.5 h-3.5" /> 3D Gallery Stack
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: DARK MASONRY PHOTO GRID (EXACT MATCH TO REFERENCE PHOTO) */}
      {viewMode === 'darkGrid' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black p-3 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl border border-zinc-900 shadow-2xl mb-16"
        >
          {/* Header Inside Dark Grid */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3.5 mb-5 text-zinc-400 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white font-bold uppercase tracking-wider">Anthology Photo Vault ({ALL_PHOTOS.length} Memories)</span>
            </div>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-[11px]">
              Click photo to view 🔍
            </span>
          </div>

          {/* Pixel-Perfect 4-Column Flex Layout Matching Reference Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[COLUMN_1, COLUMN_2, COLUMN_3, COLUMN_4].map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-3 sm:gap-4">
                {col.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setSelectedPhoto(photo);
                      setIsModalBW(false);
                    }}
                    className="relative group rounded-lg sm:rounded-xl overflow-hidden cursor-pointer bg-zinc-950 border border-zinc-800/60 shadow-md hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`w-full ${photo.aspect} overflow-hidden relative bg-black`}>
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Dark Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                        <span className="font-mono text-[9px] uppercase tracking-wider bg-amber-400 text-black px-2 py-0.5 rounded-sm font-bold w-fit mb-1 shadow-sm">
                          {photo.tag}
                        </span>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-1">
                          {photo.title}
                        </h4>
                        <p className="text-[10px] text-zinc-300 line-clamp-2 mt-0.5 font-sans leading-tight">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* VIEW MODE 2: SCRIBBLE CHARCOAL POSTCARDS */}
      {viewMode === 'postcards' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 mb-16 max-w-5xl mx-auto"
        >
          {ALL_PHOTOS.map((photo) => (
            <ScribblePostcard
              key={photo.id}
              photo={photo}
              onRevealed={handleRevealed}
              onClickCard={(p) => {
                setSelectedPhoto(p);
                setIsModalBW(false);
              }}
            />
          ))}
        </motion.div>
      )}

      {/* VIEW MODE 3: 3D CAROUSEL STACK MODE */}
      {viewMode === 'carousel' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16 py-8 flex flex-col items-center"
        >
          <div className="relative w-full max-w-xl h-[440px] flex items-center justify-center">
            {ALL_PHOTOS.map((photo, index) => {
              const offset = index - carouselIndex;
              const isActive = index === carouselIndex;

              return (
                <motion.div
                  key={photo.id}
                  animate={{
                    x: offset * 140,
                    scale: isActive ? 1 : 0.82,
                    rotateY: offset * -15,
                    zIndex: ALL_PHOTOS.length - Math.abs(offset),
                    opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-80 h-[420px] newspaper-card rounded-xl p-4 cursor-pointer flex flex-col justify-between bg-[#FAF8F3] text-[#121214] border-2 border-[#121214] shadow-xl"
                  onClick={() => {
                    if (isActive) {
                      setSelectedPhoto(photo);
                      setIsModalBW(false);
                    } else {
                      setCarouselIndex(index);
                    }
                  }}
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-3/4 object-cover rounded-lg border-2 border-[#121214]" />
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
              onClick={() => setCarouselIndex(prev => (prev > 0 ? prev - 1 : ALL_PHOTOS.length - 1))}
              className="px-5 py-2.5 rounded-full bg-[#121214] text-white text-xs font-mono border-2 border-[#121214] cursor-pointer shadow-[3px_3px_0px_#121214] hover:bg-[#2a2a2e]"
            >
              ← Previous Photo
            </button>
            <button
              onClick={() => setCarouselIndex(prev => (prev < ALL_PHOTOS.length - 1 ? prev + 1 : 0))}
              className="px-5 py-2.5 rounded-full bg-[#121214] text-white text-xs font-mono border-2 border-[#121214] cursor-pointer shadow-[3px_3px_0px_#121214] hover:bg-[#2a2a2e]"
            >
              Next Photo →
            </button>
          </div>
        </motion.div>
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-3xl w-full newspaper-card rounded-2xl overflow-hidden p-6 sm:p-8 relative text-[#121214] bg-[#FAF8F3] border-4 border-[#121214] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-[#121214] text-white hover:bg-[#2a2a2e] transition-all cursor-pointer border-2 border-[#121214] shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative mb-5 rounded-xl overflow-hidden border-2 border-[#121214] bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className={`w-full max-h-[60vh] object-contain transition-all duration-500 ${isModalBW ? 'bw-sketch' : 'filter-none'
                    }`}
                />

                {/* Photo Filter Switcher */}
                <button
                  onClick={() => setIsModalBW(!isModalBW)}
                  className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-[#121214] text-white font-mono text-[11px] font-bold border border-white/20 hover:bg-[#2a2a2e] transition-all cursor-pointer shadow-md"
                >
                  {isModalBW ? '🎨 Show Original Color' : '🖤 B&W Sketch Filter'}
                </button>
              </div>

              <div className="px-1">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#121214] pb-3 mb-3">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#121214]">
                    {selectedPhoto.title}
                  </h3>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs bg-[#121214] text-[#F5F2EB] px-3 py-1 rounded-full font-bold">
                      {selectedPhoto.tag}
                    </span>
                    <span className="text-xs bg-[#EAE5D9] text-[#121214] px-3 py-1 rounded-full font-bold border border-[#121214]">
                      {selectedPhoto.date}
                    </span>
                  </div>
                </div>
                <p className="text-slate-800 text-sm sm:text-base font-sans leading-relaxed italic bg-[#EAE5D9] p-4 rounded-xl border border-[#121214]">
                  "{selectedPhoto.caption}"
                </p>
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




