import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoyalFairytaleStory() {
  const triggerCelebrate = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#121214', '#E8A598', '#F5F2EB', '#fbbf24']
    });
  };

  return (
    <section id="story" className="py-16 px-4 max-w-4xl mx-auto relative text-[#121214]">
      
      {/* Section Tag Header */}
      <div className="text-center mb-10">
        <span className="font-mono text-xs uppercase px-3.5 py-1.5 bg-[#121214] text-[#F5F2EB] font-bold rounded-sm border border-[#121214] shadow-sm">
          02. SPECIAL GAZETTE EDITORIAL 📜
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#121214] mt-4 tracking-tight">
          The Legend of Queen Nishmitha 👑
        </h2>
      </div>

      {/* Aesthetic Single Story Card (No AI Image, Clean & Cool) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="newspaper-card rounded-2xl md:rounded-3xl p-6 sm:p-10 bg-[#FAF8F3] border-2 border-[#121214] shadow-[8px_8px_0px_#121214] relative"
      >
        
        {/* Postmark Header */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#121214] pb-4 mb-6 gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#121214]">
            <Feather className="w-4 h-4 text-[#121214]" />
            <span className="font-bold uppercase tracking-wider">Birthday Times Chronicles • Oct 02</span>
          </div>
          <div className="postmark-stamp text-[10px] bg-white text-[#121214] font-bold">
            OFFICIAL ROYAL GAZETTE
          </div>
        </div>

        {/* Story Body */}
        <div className="space-y-6 text-center sm:text-left">
          
          <div className="p-6 sm:p-8 rounded-xl bg-white border-2 border-dashed border-[#121214] relative">
            <p className="text-slate-800 text-base sm:text-xl font-serif leading-relaxed italic">
              "From spontaneous store selfies and campus adventures to radiating pure grace in traditional silk, Nishmitha brings endless joy, genuine warmth, and unyielding laughter wherever she goes. Here's to a queen who lights up every room and makes everyday life an unforgettable fairytale!"
            </p>
          </div>

          {/* Signature & Interactive Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#121214] text-[#F5F2EB] flex items-center justify-center font-bold font-mono text-sm border border-[#121214]">
                👑
              </div>
              <div className="text-left font-mono">
                <span className="block text-xs text-slate-600">CHRONICLED BY BESTIES</span>
                <span className="text-sm font-bold text-[#121214] font-serif">Queen Nishmitha V G</span>
              </div>
            </div>

            <button
              onClick={triggerCelebrate}
              className="px-6 py-3 rounded-full bg-[#121214] hover:bg-[#2a2a2e] text-[#F5F2EB] font-mono text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#121214] shadow-[4px_4px_0px_#121214] flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Celebrate Her Legend 🎉</span>
            </button>
          </div>

        </div>

      </motion.div>

    </section>
  );
}


