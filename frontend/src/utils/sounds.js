// We synthesize tiny beeps with the Web Audio API instead of loading sound files.
// This keeps the whole "sound system" to one small file with zero assets.

let audioCtx;

function getContext() {
  // Browsers require audio to start after a user interaction, which is fine here
  // since these only ever get called from button clicks.
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq, startTime, duration) {
  const ctx = getContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  gain.gain.setValueAtTime(0.15, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

// Bright ascending fanfare — used when adding a new application
export function playSubmitSound() {
  const ctx = getContext();
  playTone(523, ctx.currentTime, 0.1); // C5
  playTone(659, ctx.currentTime + 0.08, 0.1); // E5
  playTone(784, ctx.currentTime + 0.16, 0.25); // G5
}

// Two ascending notes — used when advancing a stage
export function playLevelUpSound() {
  const ctx = getContext();
  playTone(523, ctx.currentTime, 0.12); // C5
  playTone(784, ctx.currentTime + 0.1, 0.2); // G5
}

// Three ascending notes — bigger celebration for landing an offer
export function playOfferSound() {
  const ctx = getContext();
  playTone(523, ctx.currentTime, 0.12); // C5
  playTone(659, ctx.currentTime + 0.1, 0.12); // E5
  playTone(784, ctx.currentTime + 0.2, 0.25); // G5
}
