import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import BirthdayTimesLogin from './components/BirthdayTimesLogin';
import CountdownTimer from './components/CountdownTimer';
import RoyalFairytaleStory from './components/RoyalFairytaleStory';
import GameSection from './components/GameSection';
import MemoryGallery from './components/MemoryGallery';
import DigitalCake from './components/DigitalCake';
import { synthPlayer } from './utils/audioSynth';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  // Multi-Stage Birthday Quest State
  const [activeStage, setActiveStage] = useState('intro'); // 'intro' | 'story' | 'games' | 'gallery' | 'cake'
  const [unlockedStages, setUnlockedStages] = useState({
    intro: true,
    story: true,
    games: true,
    gallery: false,
    cake: false
  });
  const [devUnlocked, setDevUnlocked] = useState(false);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      synthPlayer.stopMelody();
      setIsAudioPlaying(false);
    } else {
      synthPlayer.startMelody();
      setIsAudioPlaying(true);
    }
  };

  const handleGlobalCelebrate = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#121214', '#E8A598', '#F5F2EB', '#38bdf8', '#fbbf24']
    });
  };

  const unlockStage = (stageName) => {
    setUnlockedStages(prev => ({ ...prev, [stageName]: true }));
  };

  const navigateToStage = (stageName) => {
    if (unlockedStages[stageName] || devUnlocked) {
      setActiveStage(stageName);
      const el = document.getElementById(stageName);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleDevUnlock = () => {
    setDevUnlocked(prev => !prev);
    if (!devUnlocked) {
      setUnlockedStages({
        intro: true,
        story: true,
        games: true,
        gallery: true,
        cake: true
      });
    }
  };

  // If user hasn't entered the birthday passcode, show the Newspaper Login Gate!
  if (!isLoggedIn) {
    return <BirthdayTimesLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="relative min-h-screen text-[#121214] bg-[#F5F2EB] font-sans selection:bg-[#121214] selection:text-[#F5F2EB]">
      
      {/* Dynamic Background Paper Grain & Ambient Particles */}
      <ParticlesBackground />

      {/* Floating Music Control Button */}
      <Navbar
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
      />

      {/* Main Page Sections */}
      <main className="relative z-10 space-y-16 pb-20 pt-16">
        
        {/* 1. Landing & Intro Hero Section */}
        <section id="intro" className="scroll-mt-24">
          <CountdownTimer
            onCelebrate={handleGlobalCelebrate}
            onStartQuest={() => {
              unlockStage('story');
              navigateToStage('story');
            }}
          />
        </section>

        {/* 2. Queen Nishmitha's Fairytale Storybook Section */}
        <section id="story" className="scroll-mt-24">
          <RoyalFairytaleStory />
        </section>

        {/* 3. Interactive Game Quests Section */}
        <section id="games" className="scroll-mt-24">
          <GameSection
            isUnlocked={unlockedStages.gallery || devUnlocked}
            onGameWon={() => {
              unlockStage('gallery');
              handleGlobalCelebrate();
            }}
            onProceedToGallery={() => {
              unlockStage('gallery');
              navigateToStage('gallery');
            }}
          />
        </section>

        {/* 4. Memory Gallery & Real Photo Anthology */}
        <section id="gallery" className="scroll-mt-24">
          <MemoryGallery
            isLocked={!unlockedStages.gallery && !devUnlocked}
            onUnlockCake={() => {
              unlockStage('cake');
              navigateToStage('cake');
            }}
          />
        </section>

        {/* 5. Candle Cake & Secret Letter */}
        <section id="cake" className="scroll-mt-24">
          <DigitalCake
            isAudioPlaying={isAudioPlaying}
            toggleAudio={toggleAudio}
            isLocked={!unlockedStages.cake && !devUnlocked}
          />
        </section>

      </main>

      {/* Footer - The Birthday Times Gazette Footer */}
      <footer className="relative z-10 border-t-2 border-[#121214] py-12 px-4 text-center bg-[#FAF8F3] font-mono">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[#121214] font-bold font-serif-title text-xl tracking-wider uppercase">
            <Sparkles className="w-5 h-5 text-amber-500" /> THE BIRTHDAY TIMES GAZETTE 📰
          </div>
          <p className="text-slate-700 text-xs font-semibold">
            Special Gazette Edition in honor of Queen Nishmitha V G's Royal Birthday Celebration 👑
          </p>
          <div className="postmark-stamp text-[10px] bg-white font-bold">
            PRICE: 1 SMILE • ISSUE #0210
          </div>
        </div>
      </footer>

    </div>
  );
}



