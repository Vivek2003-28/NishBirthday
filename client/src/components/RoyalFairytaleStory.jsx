import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, BookOpen, ChevronRight, ChevronLeft, Heart, Star, Wand2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORY_CHAPTERS = [
  {
    chapterNum: 1,
    title: 'The Coronation of Queen Nishmitha 👑',
    subtitle: 'Chapter I: The Crown of Pure Joy',
    image: 'https://image.pollinations.ai/prompt/cute%203D%20Pixar%20Disney%20style%20cartoon%20illustration%20of%20beautiful%20young%20Indian%20queen%20Nishmitha%20wearing%20a%20sparkling%20golden%20tiara%20and%20royal%20gown%20sitting%20on%20a%20glowing%20throne%20with%20fairy%20lights?width=800&height=600&nologo=true',
    fallbackEmoji: '👑',
    text: "Once upon a time in a magical realm, Princess Nishmitha V G was crowned Queen of the Radiant Realm! Known throughout the land for her infectious smile, genuine kindness, and radiant warmth, her ascension brought joy to every corner of the kingdom."
  },
  {
    chapterNum: 2,
    title: 'The Bestie Squad & Campus Quests 📜',
    subtitle: 'Chapter II: Adventures in the Realm of MITE',
    image: 'https://image.pollinations.ai/prompt/cute%20cartoon%20storybook%20illustration%20of%20queen%20Nishmitha%20laughing%20with%20her%20besties%20in%20a%20magical%20campus%20courtyard%20Ghibli%20style?width=800&height=600&nologo=true',
    fallbackEmoji: '🎓',
    text: "Joined by her fiercely loyal squad of besties, Queen Nishmitha traversed the halls of the MITE Kingdom. From spontaneous store selfies to late-night laughter and shared secrets, no challenge could withstand their unbreakable bond!"
  },
  {
    chapterNum: 3,
    title: 'The Grand Silk Saree Royal Gala 💃',
    subtitle: 'Chapter III: Tradition, Elegance & Charm',
    image: 'https://image.pollinations.ai/prompt/gorgeous%20cartoon%20illustration%20of%20Indian%20queen%20Nishmitha%20in%20maroon%20silk%20saree%20with%20gold%20jhumkas%20dancing%20in%20a%20royal%20fairytale%20ballroom?width=800&height=600&nologo=true',
    fallbackEmoji: '🌸',
    text: "Dressed in a rich maroon silk saree with shimmering silver jhumkas, Queen Nishmitha graced the Royal Gala. All subjects cheered in admiration as the Queen radiated elegance and timeless Indian tradition."
  },
  {
    chapterNum: 4,
    title: 'The Eternal Birthday Blessing 🎂✨',
    subtitle: 'Chapter IV: Long Live Queen Nishmitha!',
    image: 'https://image.pollinations.ai/prompt/fairytale%203D%20cartoon%20illustration%20queen%20Nishmitha%20blowing%20out%20glowing%20birthday%20candles%20on%20a%20giant%20cake%20surrounded%20by%20fireworks%20and%20confetti?width=800&height=600&nologo=true',
    fallbackEmoji: '🎉',
    text: "Today, the entire kingdom unites to celebrate Queen Nishmitha's Birthday! May her reign be blessed with eternal happiness, endless laughter, and boundless dreams come true. Happy Birthday, Queen Nishmitha!"
  }
];

export default function RoyalFairytaleStory() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const chapter = STORY_CHAPTERS[currentIdx];

  const handleNext = () => {
    if (currentIdx < STORY_CHAPTERS.length - 1) {
      setCurrentIdx(c => c + 1);
    } else {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#121214', '#E8A598', '#F5F2EB', '#fbbf24']
      });
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(c => c - 1);
    }
  };

  return (
    <section id="story" className="py-20 px-4 max-w-6xl mx-auto relative text-[#121214]">
      
      {/* Section Header */}
      <div className="text-left mb-12 border-b-2 border-dashed border-[#121214] pb-6">
        <div className="postmark-stamp text-[10px] bg-white inline-block mb-3 font-bold">
          STAGE 02 • STORY STRIP
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-title text-[#121214] uppercase">
          02. The Legend of Queen Nishmitha 👑
        </h2>
        <p className="text-slate-800 mt-2 text-sm sm:text-base font-handwriting text-2xl max-w-xl font-bold">
          An illustrated fairytale story strip published in honor of Queen Nishmitha!
        </p>
      </div>

      {/* Storybook Container */}
      <div className="newspaper-card rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-white border-2 border-[#121214] shadow-[10px_10px_0px_#121214]">
        
        {/* Chapter Stepper Indicators */}
        <div className="flex justify-start gap-2 sm:gap-3 mb-8 font-mono">
          {STORY_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.chapterNum}
              onClick={() => setCurrentIdx(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border-2 border-[#121214] cursor-pointer ${
                idx === currentIdx
                  ? 'bg-[#121214] text-[#F5F2EB] shadow-md'
                  : 'bg-[#FAF8F3] hover:bg-slate-100 text-[#121214]'
              }`}
            >
              Ch. 0{ch.chapterNum}
            </button>
          ))}
        </div>

        {/* Animated Story Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.chapterNum}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            
            {/* Left Cartoon Illustration Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#121214] shadow-md group bg-[#FAF8F3]">
                
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bw-sketch"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />

                {/* Fallback cartoon vector card */}
                <div className="hidden w-full h-full bg-[#FAF8F3] flex-col items-center justify-center p-6 text-center border-2 border-[#121214]">
                  <span className="text-6xl mb-3 animate-bounce">{chapter.fallbackEmoji}</span>
                  <h4 className="font-serif-title font-bold text-lg text-[#121214]">{chapter.title}</h4>
                  <span className="text-xs text-slate-700 font-mono font-bold">Queen Nishmitha V G</span>
                </div>

                {/* Shimmer Badge */}
                <span className="absolute top-3 left-3 postmark-stamp bg-white text-[10px] text-[#121214] font-bold">
                  ILLUSTRATION NO. 0{chapter.chapterNum}
                </span>

              </div>
            </div>

            {/* Right Story Text Column */}
            <div className="lg:col-span-6 space-y-4 font-mono">
              <span className="postmark-stamp text-[10px] text-[#121214] bg-[#FAF8F3] font-bold">
                {chapter.subtitle}
              </span>

              <h3 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#121214] leading-tight">
                {chapter.title}
              </h3>

              <div className="p-6 rounded-2xl bg-[#FAF8F3] border-2 border-dashed border-[#121214] relative">
                <p className="text-slate-900 text-sm sm:text-base font-handwriting text-2xl font-bold leading-relaxed">
                  "{chapter.text}"
                </p>
                <div className="mt-4 text-right">
                  <span className="font-handwriting text-2xl text-[#121214] font-bold">
                    — Queen Nishmitha Chronicles 👑
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 disabled:opacity-30 text-[#121214] text-xs font-mono font-bold border-2 border-[#121214] flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-[#121214] hover:bg-slate-900 text-[#F5F2EB] text-xs font-mono font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-1 cursor-pointer border-2 border-[#121214]"
                >
                  {currentIdx < STORY_CHAPTERS.length - 1 ? (
                    <>Next Chapter <ChevronRight className="w-4 h-4" /></>
                  ) : (
                    <>Celebrate Queen Nishmitha! 🎉</>
                  )}
                </button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

