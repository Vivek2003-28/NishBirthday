import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Trophy, Sparkles, CheckCircle2, RotateCcw, HelpCircle, Star, Unlock, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

const MEMORY_CARDS = [
  { id: 1, img: '/images/real/nish1.jpg', label: 'Maroon Silk Grace' },
  { id: 2, img: '/images/real/nish2.jpg', label: 'Gala & Squad' },
  { id: 3, img: '/images/real/nish3.jpg', label: 'Farewell Class of 26' },
  { id: 4, img: '/images/real/nish4.jpg', label: 'Pure Warmth' },
  { id: 5, img: '/images/real/nish5.jpg', label: 'Campus Vibe' },
  { id: 6, img: '/images/portrait1.jpg', label: 'Birthday Queen' }
];

const TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: "What makes Nishmitha's presence truly unforgettable in any room?",
    options: [
      "Her genuine, radiant smile and uplifting positive energy ✨",
      "Her stealth ninjutsu moves in class 🥷",
      "Binging 10 episodes without breaking eye contact 📺",
      "Always being suspiciously quiet 🤐"
    ],
    correctIndex: 0,
    explanation: "Spot on! Her contagious smile and radiant warmth brighten everyone's day!"
  },
  {
    id: 2,
    question: "What is the defining memory from the MITE Campus & Farewell Class of '26?",
    options: [
      "Unforgettable laughter, squad celebrations, and memories that last forever 🎓",
      "Complaining about homework 24/7 📝",
      "Sleeping through every lecture 😴",
      "Only attending for the canteen samosas 🥟"
    ],
    correctIndex: 0,
    explanation: "Correct! The 'Memories Last 4Ever' farewell frame captures the unbreakable bond!"
  },
  {
    id: 3,
    question: "What is the official rule for Nishmitha's Birthday Gala?",
    options: [
      "Royal treatment, unlimited happiness, and zero stress! 👑🎂",
      "No birthday wishes allowed 🚫",
      "Strict study session all day 📚",
      "Waking up at 5:00 AM for math ⏰"
    ],
    correctIndex: 0,
    explanation: "Queen Nishmitha's rules apply: Maximum joy and celebration!"
  }
];

export default function GameSection({ isUnlocked, onGameWon, onProceedToGallery }) {
  const [activeTab, setActiveTab] = useState('memory');

  // Memory match state
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [memoryWon, setMemoryWon] = useState(false);

  // Trivia state
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaCompleted, setTriviaCompleted] = useState(false);

  const resetMemoryGame = () => {
    const deck = [...MEMORY_CARDS, ...MEMORY_CARDS]
      .map((card, idx) => ({ ...card, instanceId: idx }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setMemoryWon(false);
  };

  useEffect(() => {
    resetMemoryGame();
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(cards[index].id)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const idx1 = newFlipped[0];
      const idx2 = newFlipped[1];

      if (cards[idx1].id === cards[idx2].id) {
        setMatchedPairs(prev => {
          const updated = [...prev, cards[idx1].id];
          if (updated.length === MEMORY_CARDS.length) {
            setMemoryWon(true);
            triggerCelebration();
          }
          return updated;
        });
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 900);
      }
    }
  };

  const handleAnswerSelect = (optionIdx) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    if (optionIdx === TRIVIA_QUESTIONS[triviaIndex].correctIndex) {
      setTriviaScore(prev => prev + 100);
    }
  };

  const handleNextQuestion = () => {
    if (triviaIndex < TRIVIA_QUESTIONS.length - 1) {
      setTriviaIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setTriviaCompleted(true);
      triggerCelebration();
    }
  };

  const resetTrivia = () => {
    setTriviaIndex(0);
    setSelectedOption(null);
    setTriviaScore(0);
    setTriviaCompleted(false);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#121214', '#E8A598', '#F5F2EB', '#fbbf24']
    });
    if (onGameWon) onGameWon();
  };

  return (
    <section id="games" className="py-20 px-4 max-w-6xl mx-auto relative text-[#121214] font-mono">
      
      {/* Title */}
      <div className="text-left mb-12 border-b-2 border-dashed border-[#121214] pb-6">
        <div className="postmark-stamp text-[10px] bg-white inline-block mb-3 font-bold">
          STAGE 03 • PUZZLES & ARCADE
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-title text-[#121214] uppercase">
          03. Nishmitha's Birthday Quests 🎯
        </h2>
        <p className="text-slate-800 mt-2 text-sm sm:text-base font-handwriting text-2xl font-bold">
          Win either quest to unlock Stage 04: The Reflections & Postcard Vault!
        </p>

        {/* Tab Toggle */}
        <div className="flex justify-start gap-3 mt-6">
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-2 border-[#121214] cursor-pointer ${
              activeTab === 'memory'
                ? 'bg-[#121214] text-[#F5F2EB] shadow-md'
                : 'bg-white hover:bg-slate-100 text-[#121214]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Quest 01: Memory Match
          </button>
          <button
            onClick={() => setActiveTab('trivia')}
            className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-2 border-[#121214] cursor-pointer ${
              activeTab === 'trivia'
                ? 'bg-[#121214] text-[#F5F2EB] shadow-md'
                : 'bg-white hover:bg-slate-100 text-[#121214]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Quest 02: Friendship Trivia
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="newspaper-card rounded-3xl p-6 sm:p-10 relative bg-white border-2 border-[#121214] shadow-[10px_10px_0px_#121214]">
        
        {/* Unlocked Banner */}
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 sm:p-6 rounded-2xl bg-[#FAF8F3] border-2 border-[#121214] text-[#121214] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm font-mono"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#121214] text-[#F5F2EB] flex items-center justify-center font-bold text-xl shadow-sm">
                <Unlock className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-serif-title font-bold text-lg text-[#121214]">Quest Victory! Stage 04 Unlocked 🎉</h4>
                <p className="text-xs text-slate-700 font-bold">Nishmitha's Postcard Gallery & Reflection Vault are now open!</p>
              </div>
            </div>
            <button
              onClick={onProceedToGallery}
              className="px-6 py-3 rounded-full bg-[#121214] text-[#F5F2EB] font-mono font-bold text-xs uppercase tracking-wider shadow-md hover:bg-slate-900 transition-transform flex items-center gap-2 cursor-pointer border-2 border-[#121214]"
            >
              Enter Postcard Vault 📸 →
            </button>
          </motion.div>
        )}

        {/* TAB 1: MEMORY MATCH */}
        {activeTab === 'memory' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-dashed border-[#121214]">
              <div>
                <h3 className="text-xl font-bold font-serif-title text-[#121214]">
                  Match Nishmitha's 6 Memory Pairs
                </h3>
                <p className="text-xs text-slate-700 font-mono font-bold">Click cards to reveal real photos and match identical pairs.</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono font-bold">
                <span className="postmark-stamp bg-[#FAF8F3]">
                  Moves: <b>{moves}</b>
                </span>
                <span className="postmark-stamp bg-[#FAF8F3]">
                  Matched: <b>{matchedPairs.length} / 6</b>
                </span>
                <button onClick={resetMemoryGame} className="p-2 rounded-full bg-white hover:bg-slate-100 text-[#121214] border-2 border-[#121214] shadow-sm cursor-pointer" title="Reset">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {memoryWon ? (
              <div className="py-10 text-center flex flex-col items-center font-mono">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border-2 border-[#121214] flex items-center justify-center mb-3 text-3xl animate-bounce shadow-md">
                  🏆
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#121214]">
                  Matched All Pairs in {moves} Moves!
                </h3>
                <p className="text-slate-800 text-sm mt-2 max-w-md font-medium">
                  Fantastic job! You matched all of Nishmitha's real photos! Stage 04 is unlocked below.
                </p>
                <div className="flex gap-4 mt-6">
                  <button onClick={resetMemoryGame} className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#121214] text-xs font-mono font-bold border-2 border-[#121214] shadow-sm cursor-pointer">
                    Play Again
                  </button>
                  <button onClick={onProceedToGallery} className="px-6 py-2.5 rounded-full bg-[#121214] text-[#F5F2EB] font-mono font-bold text-xs shadow-md hover:bg-slate-900 border-2 border-[#121214] cursor-pointer">
                    Explore Gallery ↓
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto font-mono">
                {cards.map((card, idx) => {
                  const isFlipped = flippedCards.includes(idx) || matchedPairs.includes(card.id);
                  const isMatched = matchedPairs.includes(card.id);

                  return (
                    <div
                      key={card.instanceId}
                      onClick={() => handleCardClick(idx)}
                      className={`h-28 sm:h-36 rounded-2xl cursor-pointer select-none border-2 transition-all duration-300 overflow-hidden relative ${
                        isMatched
                          ? 'border-[#121214] bg-[#FAF8F3] shadow-md ring-2 ring-emerald-500'
                          : isFlipped
                          ? 'border-[#121214] bg-white'
                          : 'bg-[#FAF8F3] hover:bg-slate-100 border-[#121214] shadow-sm'
                      } flex flex-col items-center justify-center p-1 text-center`}
                    >
                      {isFlipped ? (
                        <div className="w-full h-full flex flex-col items-center justify-between p-1">
                          <img src={card.img} alt={card.label} className="w-full h-20 sm:h-26 object-cover rounded-xl border border-[#121214]" />
                          <span className="text-[10px] font-bold text-[#121214] truncate w-full mt-0.5 font-mono">
                            {card.label}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Sparkles className="w-5 h-5 text-amber-500 mb-1 animate-pulse" />
                          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-700 font-bold">
                            Card #{idx + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FRIENDSHIP TRIVIA */}
        {activeTab === 'trivia' && (
          <div className="max-w-2xl mx-auto font-mono">
            {!triviaCompleted ? (
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-dashed border-[#121214]">
                  <span className="postmark-stamp text-[10px] bg-[#FAF8F3] font-bold">
                    Question 0{triviaIndex + 1} of 0{TRIVIA_QUESTIONS.length}
                  </span>
                  <span className="text-xs font-bold text-[#121214] flex items-center gap-1 font-mono">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" /> Score: {triviaScore} pts
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold font-serif-title text-[#121214] mb-6 leading-snug">
                  {TRIVIA_QUESTIONS[triviaIndex].question}
                </h3>

                <div className="space-y-3 mb-6 font-mono">
                  {TRIVIA_QUESTIONS[triviaIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === TRIVIA_QUESTIONS[triviaIndex].correctIndex;
                    
                    let btnStyle = 'bg-white hover:bg-slate-100 border-2 border-[#121214] text-[#121214]';
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-100 border-2 border-emerald-600 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-100 border-2 border-rose-600 text-rose-900 font-bold';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerSelect(oIdx)}
                        disabled={selectedOption !== null}
                        className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border-2 border-dashed border-[#121214] text-[#121214] text-xs mb-6 font-bold">
                    💡 {TRIVIA_QUESTIONS[triviaIndex].explanation}
                  </div>
                )}

                {selectedOption !== null && (
                  <div className="flex justify-end font-mono">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-full bg-[#121214] text-[#F5F2EB] font-bold text-xs tracking-wider uppercase shadow-md hover:bg-slate-900 transition-all cursor-pointer border-2 border-[#121214]"
                    >
                      {triviaIndex < TRIVIA_QUESTIONS.length - 1 ? 'Next Question →' : 'See Results 🏆'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center flex flex-col items-center font-mono">
                <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#121214] mb-2">
                  Trivia Completed! Scored {triviaScore} Points!
                </h3>
                <p className="text-slate-800 text-sm max-w-md mb-6 font-medium">
                  You know Nishmitha inside out! Stage 04 is now completely unlocked!
                </p>
                <div className="flex gap-4">
                  <button onClick={resetTrivia} className="px-5 py-2.5 rounded-full bg-white text-[#121214] text-xs font-mono font-bold border-2 border-[#121214] hover:bg-slate-100 cursor-pointer">
                    Retake Quiz
                  </button>
                  <button onClick={onProceedToGallery} className="px-6 py-2.5 rounded-full bg-[#121214] text-[#F5F2EB] text-xs font-mono font-bold shadow-md hover:bg-slate-900 border-2 border-[#121214] cursor-pointer">
                    View Real Vault ↓
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

