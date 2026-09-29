// Web Audio API Synthesizer for background birthday music
class BirthdaySynth {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.currentTrack = 'lofi';
    this.timer = null;
    this.volume = 0.3;
    this.gainNode = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.volume;
      this.gainNode.connect(this.audioCtx.destination);
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(val, this.audioCtx ? this.audioCtx.currentTime : 0);
    }
  }

  playNote(freq, duration, type = 'sine') {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') {
      this.audioCtx?.resume();
    }
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      noteGain.gain.setValueAtTime(this.volume * 0.4, this.audioCtx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Synth playNote error:', e);
    }
  }

  startMelody() {
    this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.isPlaying = true;

    // Happy Birthday note frequencies in Hz (C4 major)
    const notes = [
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 1.2 },
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.2 },
      { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 523.25, d: 0.8 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 0.8 }, { f: 293.66, d: 1.2 },
      { f: 466.16, d: 0.4 }, { f: 466.16, d: 0.4 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.5 }
    ];

    let index = 0;
    const loop = () => {
      if (!this.isPlaying) return;
      const note = notes[index];
      this.playNote(note.f, note.d, 'triangle');
      
      // Add soft warm harmonic backing chord note
      this.playNote(note.f * 0.5, note.d * 1.5, 'sine');

      index = (index + 1) % notes.length;
      this.timer = setTimeout(loop, note.d * 750);
    };

    loop();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
  }
}

export const synthPlayer = new BirthdaySynth();
