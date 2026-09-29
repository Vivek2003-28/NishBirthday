import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ isAudioPlaying, toggleAudio }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-5 right-5 z-50"
    >
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all border-2 border-[#121214] shadow-[4px_4px_0px_#121214] cursor-pointer ${
          isAudioPlaying
            ? 'bg-[#121214] text-[#F5F2EB]'
            : 'bg-[#FAF8F3] text-[#121214] hover:bg-[#EAE5D9]'
        }`}
        title={isAudioPlaying ? 'Mute Background Audio' : 'Play Birthday Soundtrack'}
      >
        {isAudioPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="tracking-wider">Sound On 🎵</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#121214]" />
            <span className="tracking-wider">Sound Off 🔇</span>
          </>
        )}
      </button>
    </motion.div>
  );
}


