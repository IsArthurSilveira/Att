/**
 * Web Audio API gentle ambient forest soundscape (breeze, soft stream & subtle chime)
 * Purely client-side, zero external bandwidth, instantly responsive.
 */

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let masterGain: GainNode | null = null;
let windNoiseNode: AudioNode | null = null;
let streamInterval: number | null = null;

function createPinkNoise(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
    b6 = white * 0.115926;
  }
  return buffer;
}

export function toggleAmbientSound(onStateChange?: (playing: boolean) => void): boolean {
  try {
    if (isPlaying) {
      stopAmbientSound();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      startAmbientSound();
      if (onStateChange) onStateChange(true);
      return true;
    }
  } catch (err) {
    console.warn('AudioContext not allowed or supported', err);
    return false;
  }
}

export function startAmbientSound() {
  if (isPlaying) return;

  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 3);
  masterGain.connect(audioCtx.destination);

  // 1. Soft wind through trees (filtered pink noise)
  const noiseBuffer = createPinkNoise(audioCtx);
  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, audioCtx.currentTime);
  filter.Q.setValueAtTime(1.8, audioCtx.currentTime);

  noiseSource.connect(filter);
  filter.connect(masterGain);
  noiseSource.start();
  windNoiseNode = noiseSource;

  // 2. Subtle periodic harmonic bell / flute tone (sacred frequency 432Hz / 528Hz)
  const playSacredChime = () => {
    if (!audioCtx || !masterGain || !isPlaying) return;
    const osc = audioCtx.createOscillator();
    const chimeGain = audioCtx.createGain();

    const notes = [432, 540, 648, 864];
    const freq = notes[Math.floor(Math.random() * notes.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    chimeGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    chimeGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 1.2);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 6.0);

    osc.connect(chimeGain);
    chimeGain.connect(masterGain);

    osc.start();
    osc.stop(audioCtx.currentTime + 6.2);
  };

  playSacredChime();
  streamInterval = window.setInterval(playSacredChime, 8000);

  isPlaying = true;
}

export function stopAmbientSound() {
  if (!isPlaying) return;

  if (streamInterval) {
    clearInterval(streamInterval);
    streamInterval = null;
  }

  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      try {
        if (windNoiseNode && 'stop' in windNoiseNode) {
          (windNoiseNode as AudioBufferSourceNode).stop();
        }
      } catch (e) {
        // ignore already stopped
      }
      isPlaying = false;
    }, 1200);
  } else {
    isPlaying = false;
  }
}

export function isAmbientPlaying(): boolean {
  return isPlaying;
}
