import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const EMOJI_LIST = ['👑', '✨', '💖', '🥳', '🥂', '🌸', '🎂', '🌟'];

export default function WishWall({ isLocked }) {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('👑');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (data.success) {
        setWishes(data.data);
      }
    } catch (err) {
      console.warn('Wishes API load notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          emoji: selectedEmoji
        })
      });

      const data = await res.json();
      if (data.success) {
        setWishes(prev => [data.data, ...prev]);
        setName('');
        setMessage('');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.65 }
        });
      }
    } catch (err) {
      console.error('Wish submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeWish = async (id) => {
    try {
      setWishes(prev =>
        prev.map(w => (w._id === id ? { ...w, likes: w.likes + 1 } : w))
      );
      await fetch(`/api/wishes/${id}/like`, { method: 'POST' });
    } catch (err) {
      console.error('Like wish error:', err);
    }
  };

  if (isLocked) {
    return (
      <section id="wishes" className="py-20 px-4 max-w-5xl mx-auto text-center">
        <div className="luxury-glass rounded-3xl p-10 border border-[#D4AF37]/30 shadow-2xl relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4">
            🔒
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-title font-bold gold-gradient-text mb-2">
            Stage 5: Guestbook Locked
          </h3>
          <p className="text-slate-300 text-sm max-w-md mb-6 font-light">
            Blow out the candles in Stage 4 to unlock the Guestbook & Wish Wall!
          </p>
          <a
            href="#cake"
            className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#08080A] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#FFF1D0]"
          >
            Go to Candle Ceremony Stage ↑
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="wishes" className="py-20 px-4 max-w-6xl mx-auto relative">
      
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#E6C687] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest mb-3">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500/40" /> Stage 5 • The Golden Guestbook
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-title gold-gradient-text">
          Leave a Birthday Blessing for Nishmitha 💌
        </h2>
        <p className="text-slate-300 mt-2 text-sm sm:text-base font-light max-w-xl mx-auto">
          Share your heartfelt messages and birthday prayers on Nishmitha's live wall!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORM */}
        <div className="lg:col-span-5 luxury-glass rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl relative">
          <h3 className="text-xl font-serif-title font-bold text-[#FFF1D0] mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#D4AF37]" /> Sign the Guestbook
          </h3>

          <form onSubmit={handleSubmitWish} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#E6C687] mb-1.5 uppercase tracking-wider">
                Your Name / Nickname
              </label>
              <input
                type="text"
                placeholder="e.g. Bestie Vivek"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#08080A]/60 border border-[#D4AF37]/25 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E6C687] mb-1.5 uppercase tracking-wider">
                Select Crest Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOJI_LIST.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-9 h-9 rounded-xl text-base flex items-center justify-center transition-all ${
                      selectedEmoji === emoji
                        ? 'bg-[#D4AF37]/30 border-2 border-[#D4AF37] scale-110'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E6C687] mb-1.5 uppercase tracking-wider">
                Birthday Message
              </label>
              <textarea
                rows={4}
                placeholder="Write a sweet message, fun memory, or birthday blessing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-[#08080A]/60 border border-[#D4AF37]/25 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C687] to-[#D4AF37] text-[#08080A] font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-[#FFF1D0] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Posting...' : 'Post Blessing 💌'}
            </button>
          </form>
        </div>

        {/* FEED */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif-title font-bold text-lg text-[#FFF1D0]">
              Guestbook Entries ({wishes.length})
            </h3>
            <span className="text-xs text-slate-400">Tap ❤️ to send love!</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <Sparkles className="w-6 h-6 animate-spin text-[#D4AF37] mx-auto mb-2" />
              Loading guestbook entries...
            </div>
          ) : wishes.length === 0 ? (
            <div className="luxury-glass rounded-3xl p-8 text-center text-slate-400">
              Be the first to post a birthday wish for Nishmitha!
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div
                    key={wish._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="luxury-glass rounded-2xl p-5 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-lg">
                          {wish.emoji || '👑'}
                        </div>
                        <div>
                          <h4 className="font-serif-title font-bold text-[#FFF1D0] text-base group-hover:text-[#E6C687] transition-colors">
                            {wish.name}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {new Date(wish.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLikeWish(wish._id)}
                        className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 text-[#E6C687] border border-white/10 text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-125"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
                        <span>{wish.likes || 0}</span>
                      </button>
                    </div>

                    <p className="text-slate-200 text-sm mt-3 font-light leading-relaxed">
                      "{wish.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
