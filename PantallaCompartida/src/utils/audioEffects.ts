// Web Audio Synth for retro console sound effects

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Mechanical Clack of the cartridge slotting/ejecting
export function playCartridgeClack() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // First click (higher pitch, spring impact)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(150, now);
    osc1.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Second click (deeper pitch, heavy latch)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(80, now + 0.03);
    osc2.frequency.exponentialRampToValueAtTime(20, now + 0.12);
    
    gain2.gain.setValueAtTime(0.3, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.start(now + 0.03);
    osc2.stop(now + 0.12);
  } catch (e) {
    console.warn('Audio contextual initialization error:', e);
  }
}

// 2. Heavy physical toggle switch (Power on/off)
export function playPowerToggle() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);
    
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    // Silence fallback
  }
}

// 3. Luxurious N64 style retro boot chime
export function playBootSplash() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Arpeggio notes representing nineties boot screen
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C, E, G, C, E, G, C
    
    notes.forEach((freq, idx) => {
      const timeOffset = idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Warm, lush square wave for vintage video game synth vibe
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + timeOffset);
      
      // Pitch wobble / vibrato
      osc.frequency.linearRampToValueAtTime(freq + (idx * 3), now + timeOffset + 0.4);
      
      gain.gain.setValueAtTime(0.18, now + timeOffset);
      // Long tail-off
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.8);
    });

    // Sub rumble chord for depth
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130.81, now); // C3
    subGain.gain.setValueAtTime(0.25, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.2);

  } catch (e) {
    // Fail silently
  }
}

// 4. Custom key drone for elements soundboard
let activeOscillators: { [key: string]: { osc: OscillatorNode; gain: GainNode } } = {};

export function startElementDrone(id: string, intensity: number) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (activeOscillators[id]) {
      // Already running, update volume level based on intensity
      const targetGain = (intensity / 100) * 0.15;
      activeOscillators[id].gain.gain.exponentialRampToValueAtTime(targetGain + 0.001, now + 0.2);
      return;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Map elements to soothing frequencies
    let baseFreq = 220; // Default A3
    if (id === 'viento') {
      baseFreq = 293.66; // D4 (airy, pleasant)
      osc.type = 'sine';
    } else if (id === 'agua') {
      baseFreq = 349.23; // F4 (glowing river)
      osc.type = 'triangle';
    } else if (id === 'fuego') {
      baseFreq = 196.00; // G3 (warm fire crackle rumble)
      osc.type = 'sawtooth'; // Rougher
    } else if (id === 'tierra') {
      baseFreq = 110.00; // A2 (deep earthy rhythmic beat)
      osc.type = 'triangle';
    }

    osc.frequency.setValueAtTime(baseFreq, now);

    // Apply soft LFO to emulate breathing/nature variation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.5; // Slow sway (0.5Hz)
    lfoGain.gain.value = 8; // frequency sway of 8Hz
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(now);

    const initialGain = (intensity / 100) * 0.15;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(initialGain, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);

    activeOscillators[id] = { osc, gain };
  } catch (e) {
    // Fail silently
  }
}

export function stopElementDrone(id: string) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const oscObj = activeOscillators[id];
    if (oscObj) {
      oscObj.gain.gain.setValueAtTime(oscObj.gain.gain.value, now);
      oscObj.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      setTimeout(() => {
        try {
          oscObj.osc.stop();
        } catch(e){}
        delete activeOscillators[id];
      }, 350);
    }
  } catch (e) {}
}

export function stopAllDrones() {
  Object.keys(activeOscillators).forEach(id => {
    stopElementDrone(id);
  });
}
