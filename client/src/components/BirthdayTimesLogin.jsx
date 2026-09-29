import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Unlock, Crown, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BirthdayTimesLogin({ onLoginSuccess }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  // Accepted passcode formats for Oct 2nd
  const VALID_PASSCODES = ['0210', '02/10', '02-10', '210', '02102026', '02102002', '2', '02', 'october 2', 'oct 2', '2nd october'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = passcode.trim().toLowerCase();

    if (VALID_PASSCODES.includes(cleaned)) {
      setError(false);
      triggerSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  const triggerSuccess = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#121214', '#E8A598', '#F5F2EB', '#fbbf24']
    });
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#121214] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      
      {/* Background Paper Grain */}
      <div className="newsprint-grain inset-0 absolute pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full newspaper-card rounded-3xl overflow-hidden relative border-2 border-[#121214] shadow-[12px_12px_0px_#121214] bg-white"
      >
        
        {/* NEWSPAPER FRONT-PAGE HEADER */}
        <div className="bg-[#FAF8F3] border-b-2 border-[#121214] p-6 sm:p-8 text-center relative">
          
          {/* Top Gazette Bar */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#121214] pb-3 mb-6 text-xs text-[#121214] font-mono font-bold uppercase">
            <span>SPECIAL EDITION • NO. 0210</span>
            <span className="postmark-stamp text-[10px] bg-[#F5F2EB]">PRICE: 1 SMILE</span>
            <span>OCTOBER 02</span>
          </div>

          <p className="text-xs uppercase tracking-widest font-mono text-slate-700 font-bold mb-2">
            The Official Birthday Gazette
          </p>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif-title text-[#121214] tracking-tight uppercase leading-none">
            THE BIRTHDAY TIMES
          </h1>
          
          <p className="font-handwriting text-2xl text-[#121214] mt-2 font-bold">
            "Queen Nishmitha V G's Royal Birthday Celebration Issue!"
          </p>
        </div>

        {/* PASSCODE FORM CONTENT */}
        <div className="p-8 sm:p-10 flex flex-col items-center text-center bg-white">
          
          <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border-2 border-[#121214] flex items-center justify-center text-3xl mb-4 text-[#121214] shadow-md">
            👑
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#121214]">
            Enter Passcode Key
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm mt-1 max-w-md font-medium">
            Enter Nishmitha's birthday date (DDMM) to unseal the Birthday Times Gazette!
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6 space-y-4">
            
            <div className="relative">
              <input
                type="password"
                placeholder="Enter Passcode (e.g. 0210)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`w-full px-5 py-3.5 rounded-2xl bg-[#FAF8F3] border-2 text-center text-lg font-mono font-bold tracking-widest text-[#121214] focus:outline-none transition-all placeholder:text-slate-500 placeholder:text-xs placeholder:font-normal ${
                  error
                    ? 'border-rose-500 ring-2 ring-rose-500/40 animate-shake'
                    : 'border-[#121214] focus:bg-white'
                }`}
              />
              <Key className="w-5 h-5 text-[#121214] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Error or Hint Message */}
            <AnimatePresence>
              {error ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-700 bg-rose-100 p-2.5 rounded-xl border-2 border-rose-500 font-bold"
                >
                  ❌ Incorrect key! Hint: October 2nd is <b>0210</b> 👑
                </motion.div>
              ) : (
                <div className="text-xs text-slate-700 font-mono flex items-center justify-center gap-1 font-bold">
                  <HelpCircle className="w-3.5 h-3.5 text-[#121214]" />
                  <span>Hint: Format <b>DDMM</b> (e.g. <b>0210</b> for Oct 2nd)</span>
                </div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#121214] hover:bg-slate-900 text-[#F5F2EB] font-bold text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 border-2 border-[#121214] cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-amber-400" /> Enter Gazette Edition →
            </button>
          </form>

          {/* Quick Dev Override */}
          <button
            onClick={triggerSuccess}
            className="mt-6 text-xs text-slate-700 hover:text-[#121214] font-mono underline transition-colors cursor-pointer font-bold"
          >
            Quick Enter (Skip Passcode) →
          </button>

        </div>

        {/* FOOTER STRIP */}
        <div className="bg-[#FAF8F3] border-t-2 border-[#121214] px-6 py-3 text-center text-xs text-slate-700 font-mono font-bold flex justify-between items-center">
          <span>Publishing Team: Bestie Squad</span>
          <span>© 2026 Queen Nishmitha V G</span>
        </div>

      </motion.div>
    </div>
  );
}

