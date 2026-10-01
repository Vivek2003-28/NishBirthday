import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Mic, Sparkles, Heart, Flame, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DigitalCake({ isAudioPlaying, toggleAudio, isLocked }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [blowStrength, setBlowStrength] = useState(0);
  const [letterRevealed, setLetterRevealed] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const extinguishCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setLetterRevealed(true);
    stopMicListening();

    confetti({
      particleCount: 220,
      spread: 110,
      origin: { y: 0.55 },
      colors: ['#121214', '#E8A598', '#F5F2EB', '#FFFFFF', '#38bdf8']
    });
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setBlowStrength(0);
  };

  const startMicListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      micStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalized = Math.min(100, Math.round((average / 128) * 100));

        setBlowStrength(normalized);

        if (normalized > 50) {
          extinguishCandles();
        } else {
          animationFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();

    } catch (err) {
      console.warn('Microphone permission or audio error:', err);
      alert('Microphone activated or click the Tap to Blow Candles button below!');
      setIsListeningMic(false);
    }
  };

  const stopMicListening = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (micStreamRef.current) micStreamRef.current.getTracks().forEach(track => track.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    setIsListeningMic(false);
    setBlowStrength(0);
  };

  useEffect(() => {
    return () => stopMicListening();
  }, []);

  if (isLocked) {
    return (
      <section id="cake" className="py-20 px-4 max-w-5xl mx-auto text-center">
        <div className="newspaper-card rounded-xl p-10 relative flex flex-col items-center text-[#121214] bg-[#FAF8F3]">
          <div className="w-16 h-16 rounded-full bg-[#121214] text-[#F5F2EB] flex items-center justify-center text-3xl mb-4 border-2 border-[#121214]">
            🔒
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#121214] mb-2">
            Stage 05: Candle Ceremony Locked
          </h3>
          <p className="text-slate-700 text-sm max-w-md mb-6 font-mono">
            Explore Nishmitha's Real Photo Postcards in Stage 04 to unlock the Candle Ceremony & Secret Gazette Letter!
          </p>
          <a
            href="#gallery"
            className="px-6 py-3 rounded-full bg-[#121214] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#2a2a2e] border-2 border-[#121214] shadow-[4px_4px_0px_#121214]"
          >
            Go to Memory Gallery Stage ↑
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="cake" className="py-20 px-4 max-w-5xl mx-auto relative">

      {/* Title Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="font-mono text-xs uppercase px-3 py-1 bg-[#121214] text-[#F5F2EB] font-bold rounded-sm border border-[#121214]">
            05. CANDLE CEREMONY & PARCHMENT
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#121214] tracking-tight leading-tight">
          Make a Wish & Blow
        </h2>
        <p className="text-slate-700 mt-4 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed">
          Blow into your microphone or click the candles to extinguish them and unseal the royal parchment letter.
        </p>
      </div>

      {/* Main Container */}
      <div className="newspaper-card rounded-2xl p-6 sm:p-12 relative flex flex-col items-center text-[#121214] bg-[#FAF8F3]">

        {/* DIGITAL CAKE & CANDLES */}
        <div className="relative py-12 flex flex-col items-center justify-center select-none">

          {/* CANDLES ROW */}
          <div className="flex items-center gap-6 mb-2 z-10">
            {[1, 2, 3, 4, 5].map((cNum) => (
              <div key={cNum} className="relative flex flex-col items-center cursor-pointer" onClick={extinguishCandles}>

                {/* Flame */}
                {candlesLit && (
                  <div className="w-4 h-8 rounded-full bg-gradient-to-t from-amber-500 via-yellow-200 to-white animate-gold-flame mb-1 shadow-[0_0_12px_#f59e0b]" />
                )}

                {/* Wick */}
                <div className="w-1 h-2 bg-[#121214]" />

                {/* Stick */}
                <div className="w-4 h-16 rounded-t-md bg-[#121214] text-white flex items-center justify-center text-[10px] font-bold border-2 border-[#121214]">
                  🕯️
                </div>
              </div>
            ))}
          </div>

          {/* CAKE TIER 1 (TOP) */}
          <div className="w-56 sm:w-64 h-20 rounded-t-3xl bg-[#EAE5D9] border-2 border-[#121214] shadow-md relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-4 bg-[#D4CEBF] rounded-b-full border-b-2 border-[#121214]" />
            <span className="font-mono font-bold text-[#121214] text-xs tracking-widest uppercase">
              Happy Birthday Nishmitha
            </span>
          </div>

          {/* CAKE TIER 2 (BASE) */}
          <div className="w-72 sm:w-80 h-24 rounded-t-2xl bg-[#F5F2EB] border-2 border-[#121214] shadow-lg relative flex items-center justify-center overflow-hidden">
            <div className="flex gap-4 text-xl text-[#121214]">
              <span>✨</span>
              <span>👑</span>
              <span>🥂</span>
              <span>💖</span>
              <span>✨</span>
            </div>
          </div>

          {/* CAKE BASE STAND */}
          <div className="w-88 sm:w-96 h-6 rounded-full bg-[#121214] border-2 border-[#121214]" />
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {candlesLit ? (
            <>
              <button
                onClick={isListeningMic ? stopMicListening : startMicListening}
                className={`px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-2 border-[#121214] cursor-pointer shadow-[4px_4px_0px_#121214] ${isListeningMic
                    ? 'bg-rose-600 text-white border-rose-900 animate-pulse'
                    : 'bg-[#121214] hover:bg-[#2a2a2e] text-white'
                  }`}
              >
                <Mic className="w-4 h-4 text-white" />
                {isListeningMic ? `Listening... (${blowStrength}%)` : 'Blow into Mic 🎤'}
              </button>

              <button
                onClick={extinguishCandles}
                className="px-8 py-3.5 rounded-full bg-[#121214] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[4px_4px_0px_#121214] hover:bg-[#2a2a2e] transition-all flex items-center gap-2 cursor-pointer border-2 border-[#121214]"
              >
                <Flame className="w-4 h-4 text-amber-400" /> Tap to Blow Out Candles 🕯️
              </button>
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-5 py-2.5 rounded-full bg-[#121214] text-white border-2 border-[#121214] text-xs font-mono font-bold flex items-center gap-2 shadow-[3px_3px_0px_#121214]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Candles Extinguished & Parchment Unsealed!
              </span>
              <button
                onClick={relightCandles}
                className="px-5 py-2.5 rounded-full bg-[#FAF8F3] text-[#121214] text-xs font-mono font-bold border-2 border-[#121214] hover:bg-[#EAE5D9] cursor-pointer"
              >
                Relight Candles 🕯️
              </button>
            </div>
          )}
        </div>

        {/* SECRET PARCHMENT LETTER */}
        <AnimatePresence>
          {letterRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12 w-full max-w-3xl rounded-2xl p-6 sm:p-12 border-2 border-[#121214] relative overflow-hidden bg-[#F5F2EB] shadow-[8px_8px_0px_#121214]"
            >
              <div className="text-center mb-8">
                <span className="font-mono text-xs bg-[#121214] text-white px-3 py-1 rounded-sm tracking-widest uppercase font-bold">
                  WAX-SEALED GAZETTE EDITION PARCHMENT
                </span>
                <h3 className="text-3xl sm:text-5xl font-serif text-[#121214] mt-6 font-bold">
                  Dearest Nishmitha V G,
                </h3>
              </div>

              <div className="space-y-6 text-slate-800 font-sans leading-relaxed text-base sm:text-lg">
                <p>
                  Happy Birthday to one of the most genuine, radiant, and loyal souls to ever step into my life! 🌟
                </p>
                <p>
                  From unforgettable campus memories and shared laughter to standing tall as a true best friend through every milestone — having you in my corner makes me journey brighter and more meaningful.
                </p>
                <p>
                  May this year open doors to extraordinary accomplishments, peaceful days, unending happiness, and memories that last a lifetime! Keep shining with that contagious smile that brightens up every room.
                </p>
                <div className="border-t-2 border-[#121214] pt-6 mt-8">
                  <p className="font-serif text-xl sm:text-2xl text-[#121214] text-right font-bold">
                    With all my love & admiration, <br />
                    <span className="text-slate-700 text-base font-sans mt-2 block font-mono uppercase tracking-widest font-bold">Your Best Friend Vivek</span>
                  </p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}


