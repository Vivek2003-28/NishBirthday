import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-Memory Fallback Stores for smooth offline/unconnected MongoDB runs
let wishesFallback = [
  {
    _id: 'w1',
    name: 'Bestie Vivek',
    message: 'Happy Birthday Nishmitha! 🌟 May this year bring you endless laughter, unforgettable adventures, and every bit of happiness you deserve!',
    emoji: '💖',
    likes: 12,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    _id: 'w2',
    name: 'Ananya & Squad',
    message: 'To the absolute life of every party! Happy Birthday Nishmitha! Keep shining bright ✨🎉',
    emoji: '👑',
    likes: 8,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: 'w3',
    name: 'Rohan',
    message: 'Wishing you the happiest birthday Nish! May all your wildest dreams come true this year! 🎂🥂',
    emoji: '🥳',
    likes: 5,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

let gameScoresFallback = [
  { _id: 's1', game: 'memory', playerName: 'Nishmitha', score: 100, moves: 8, timeSeconds: 24, createdAt: new Date().toISOString() },
  { _id: 's2', game: 'trivia', playerName: 'Bestie', score: 300, moves: 3, timeSeconds: 15, createdAt: new Date().toISOString() }
];

// MongoDB Connection with seamless fallback
let isMongoConnected = false;

const WishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  emoji: { type: String, default: '💖' },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const ScoreSchema = new mongoose.Schema({
  game: { type: String, required: true },
  playerName: { type: String, default: 'Anonymous' },
  score: { type: Number, required: true },
  moves: { type: Number, default: 0 },
  timeSeconds: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const WishModel = mongoose.model('Wish', WishSchema);
const ScoreModel = mongoose.model('Score', ScoreSchema);

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nish_birthday';
  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 2000 });
    isMongoConnected = true;
    console.log('✅ MongoDB Connected successfully!');
  } catch (err) {
    isMongoConnected = false;
    console.log('ℹ️ Local MongoDB not detected. Running seamlessly with in-memory REST store!');
  }
};

connectDB();

// --- API ROUTES --- //

// 1. Get Birthday Wishes
app.get('/api/wishes', async (req, res) => {
  try {
    if (isMongoConnected) {
      const wishes = await WishModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, db: 'mongodb', data: wishes });
    } else {
      return res.json({ success: true, db: 'memory', data: wishesFallback });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Post a Birthday Wish
app.post('/api/wishes', async (req, res) => {
  try {
    const { name, message, emoji } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required' });
    }

    if (isMongoConnected) {
      const newWish = await WishModel.create({ name, message, emoji: emoji || '💖' });
      return res.status(201).json({ success: true, data: newWish });
    } else {
      const newWish = {
        _id: 'w_' + Date.now(),
        name,
        message,
        emoji: emoji || '💖',
        likes: 0,
        createdAt: new Date().toISOString()
      };
      wishesFallback.unshift(newWish);
      return res.status(201).json({ success: true, data: newWish });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Like a Wish
app.post('/api/wishes/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const updatedWish = await WishModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
      return res.json({ success: true, data: updatedWish });
    } else {
      const wish = wishesFallback.find(w => w._id === id);
      if (wish) {
        wish.likes += 1;
        return res.json({ success: true, data: wish });
      }
      return res.status(404).json({ success: false, message: 'Wish not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Submit Game Score
app.post('/api/scores', async (req, res) => {
  try {
    const { game, playerName, score, moves, timeSeconds } = req.body;
    if (isMongoConnected) {
      const newScore = await ScoreModel.create({ game, playerName, score, moves, timeSeconds });
      return res.status(201).json({ success: true, data: newScore });
    } else {
      const newScore = {
        _id: 's_' + Date.now(),
        game,
        playerName: playerName || 'Nishmitha',
        score,
        moves,
        timeSeconds,
        createdAt: new Date().toISOString()
      };
      gameScoresFallback.unshift(newScore);
      return res.status(201).json({ success: true, data: newScore });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Get Top High Scores
app.get('/api/scores', async (req, res) => {
  try {
    if (isMongoConnected) {
      const scores = await ScoreModel.find().sort({ score: -1 }).limit(10);
      return res.json({ success: true, data: scores });
    } else {
      return res.json({ success: true, data: gameScoresFallback });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. AI Avatar Generation Endpoint
app.post('/api/generate-avatar', async (req, res) => {
  try {
    const { prompt, style = 'Anime Princess' } = req.body;
    
    // Style presets maps
    const stylePrompts = {
      'Anime Princess': 'aesthetic anime princess portrait of beautiful Indian woman, glowing hair, detailed eyes, pastel background, soft lighting, masterpiece, 8k',
      'Cyberpunk Queen': 'cyberpunk queen portrait of stylish Indian woman with futuristic glowing neon highlights, cyberpunk city background, synthwave palette, high detail',
      'Royal Goddess': 'royal Indian goddess portrait with gold jewelry, elegant traditional saree, celestial starlight background, majestic glow, royal aesthetics',
      'Disney 3D': 'cute Disney Pixar 3D animated character portrait of a cheerful young Indian girl, bright sparkling eyes, expressive, high quality render',
      'Dreamy Oil Painting': 'dreamy impasto oil painting of gorgeous Indian woman, pastel flowers in hair, soft impressionist brushstrokes, golden hour lighting',
      'Space Explorer': 'epic space explorer astronaut portrait of stylish woman with cosmic nebula and twinkling stars background, holographic helmet, futuristic'
    };

    const finalPrompt = (prompt || stylePrompts[style] || stylePrompts['Anime Princess']) + ', Nishmitha birthday theme, masterpiece';
    
    // Use Pollinations AI image generator API (100% free, fast, no key needed)
    const encodedPrompt = encodeURIComponent(finalPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&seed=${Math.floor(Math.random() * 1000000)}&nologo=true`;

    return res.json({
      success: true,
      imageUrl: imageUrl,
      prompt: finalPrompt,
      style: style
    });

  } catch (error) {
    console.error('Avatar generation error:', error);
    res.status(500).json({ success: false, message: 'Avatar generation failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongoConnected: isMongoConnected, time: new Date() });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Nishmitha Birthday API Server running on port ${PORT}`);
  });
}

export default app;
