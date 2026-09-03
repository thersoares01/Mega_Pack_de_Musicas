// Web Audio API generator for previewing music styles and bitrate comparison

class AudioDemoEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentGenre = 'electro';
  private isLowQuality = false;
  private timerId: number | null = null;
  private lowpassFilter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private step = 0;
  private tempo = 126;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setGenre(genre: string, tempo: number = 126) {
    this.currentGenre = genre;
    this.tempo = tempo;
    if (this.isPlaying) {
      // restart timer with updated tempo
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      const interval = (60 / this.tempo / 4) * 1000;
      this.timerId = window.setInterval(() => {
        if (!this.isPlaying || !this.ctx) return;
        this.playBeat(this.step);
        if (this.onStepCallback) this.onStepCallback(this.step);
        this.step = (this.step + 1) % 16;
      }, interval);
    }
  }

  public setLowQualityMode(lowQuality: boolean) {
    this.isLowQuality = lowQuality;
    if (this.lowpassFilter && this.ctx) {
      if (lowQuality) {
        // Muffle high frequencies and add slight compression distortion
        this.lowpassFilter.frequency.setTargetAtTime(2800, this.ctx.currentTime, 0.05);
        this.lowpassFilter.Q.setTargetAtTime(2, this.ctx.currentTime, 0.05);
      } else {
        // Full spectrum crystal clear 320kbps
        this.lowpassFilter.frequency.setTargetAtTime(20000, this.ctx.currentTime, 0.05);
        this.lowpassFilter.Q.setTargetAtTime(0.7, this.ctx.currentTime, 0.05);
      }
    }
  }

  private onStepCallback?: (step: number) => void;

  public start(onStep?: (step: number) => void) {
    this.initContext();
    if (!this.ctx) return;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = true;
    this.step = 0;
    this.onStepCallback = onStep;

    const interval = (60 / this.tempo / 4) * 1000; // 16th note interval

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.playBeat(this.step);
      if (this.onStepCallback) this.onStepCallback(this.step);
      this.step = (this.step + 1) % 16;
    }, interval);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.3) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (!this.lowpassFilter) {
      this.lowpassFilter = this.ctx.createBiquadFilter();
      this.lowpassFilter.type = 'lowpass';
      this.lowpassFilter.frequency.value = this.isLowQuality ? 2800 : 20000;
      this.lowpassFilter.connect(this.ctx.destination);
    }

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.lowpassFilter);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  private playKick() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (!this.lowpassFilter) {
      this.lowpassFilter = this.ctx.createBiquadFilter();
      this.lowpassFilter.type = 'lowpass';
      this.lowpassFilter.frequency.value = this.isLowQuality ? 2800 : 20000;
      this.lowpassFilter.connect(this.ctx.destination);
    }

    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(this.isLowQuality ? 0.4 : 0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.lowpassFilter);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.22);
  }

  private playSnare() {
    if (!this.ctx) return;
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.isLowQuality ? 0.15 : 0.28, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    noise.connect(filter);
    filter.connect(gain);

    if (!this.lowpassFilter) {
      this.lowpassFilter = this.ctx.createBiquadFilter();
      this.lowpassFilter.type = 'lowpass';
      this.lowpassFilter.frequency.value = this.isLowQuality ? 2800 : 20000;
      this.lowpassFilter.connect(this.ctx.destination);
    }

    gain.connect(this.lowpassFilter);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.12);
  }

  private playHiHat(open = false) {
    if (!this.ctx) return;
    const dur = open ? 0.12 : 0.04;
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);

    noise.connect(filter);
    filter.connect(gain);

    if (!this.lowpassFilter) {
      this.lowpassFilter = this.ctx.createBiquadFilter();
      this.lowpassFilter.type = 'lowpass';
      this.lowpassFilter.frequency.value = this.isLowQuality ? 2800 : 20000;
      this.lowpassFilter.connect(this.ctx.destination);
    }

    gain.connect(this.lowpassFilter);

    noise.start();
    noise.stop(this.ctx.currentTime + dur);
  }

  private playBeat(step: number) {
    if (this.currentGenre === 'electro') {
      // 4 on the floor
      if (step % 4 === 0) this.playKick();
      if (step === 4 || step === 12) this.playSnare();
      if (step % 2 === 0) this.playHiHat(step % 4 === 2);

      // Bass synth note
      if (step === 0) this.playTone(110, 0.15, 'sawtooth', 0.2);
      if (step === 3) this.playTone(130.81, 0.12, 'sawtooth', 0.18);
      if (step === 6) this.playTone(146.83, 0.15, 'sawtooth', 0.2);
      if (step === 10) this.playTone(164.81, 0.18, 'sawtooth', 0.22);
    } else if (this.currentGenre === 'funk') {
      // Brazilian funk beat (Tamborzão syncopation)
      if (step === 0 || step === 6 || step === 10) this.playKick();
      if (step === 4 || step === 12 || step === 14) this.playSnare();
      if (step % 2 === 1) this.playHiHat();
      if (step === 2 || step === 8) this.playTone(220, 0.08, 'square', 0.15);
    } else if (this.currentGenre === 'sertanejo') {
      // Sertanejo Club / Eletro-Funk Remix cadence (e.g. Canudinho Remix Club - 130 BPM)
      if (step === 0 || step === 4 || step === 8 || step === 12) this.playKick();
      if (step === 4 || step === 12 || step === 14) this.playSnare();
      if (step % 2 === 1) this.playHiHat(step % 4 === 3);

      // Club remix bassline & melody stabs
      if (step === 0) this.playTone(87.31, 0.14, 'sawtooth', 0.28); // F2 sub
      if (step === 2) this.playTone(87.31, 0.08, 'sawtooth', 0.22);
      if (step === 6) this.playTone(103.83, 0.12, 'sawtooth', 0.25); // Ab2
      if (step === 8) this.playTone(116.54, 0.14, 'sawtooth', 0.28); // Bb2
      if (step === 10) this.playTone(130.81, 0.1, 'sawtooth', 0.24); // C3
      if (step === 13) this.playTone(116.54, 0.08, 'sawtooth', 0.2); // Bb2
    } else if (this.currentGenre === 'pagode') {
      // Pagode / Samba syncopation
      if (step === 0 || step === 6 || step === 10) this.playKick();
      if (step === 4 || step === 12) this.playSnare();
      if (step % 2 === 1) this.playHiHat(true);
      // Cavaco strum simulation
      if (step % 2 === 0) this.playTone(523.25, 0.06, 'triangle', 0.18);
    } else {
      // Flashback / Retro 80s/90s
      if (step === 0 || step === 8) this.playKick();
      if (step === 4 || step === 12) this.playSnare();
      if (step % 2 === 0) this.playHiHat();
      if (step === 0) this.playTone(130.81, 0.15, 'sawtooth', 0.2);
      if (step === 4) this.playTone(146.83, 0.15, 'sawtooth', 0.2);
      if (step === 8) this.playTone(164.81, 0.15, 'sawtooth', 0.2);
      if (step === 12) this.playTone(174.61, 0.15, 'sawtooth', 0.2);
    }
  }
}

export const audioDemo = new AudioDemoEngine();
