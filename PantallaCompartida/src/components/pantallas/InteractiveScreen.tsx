import { useState, useEffect } from 'react';
import { Compass, Activity } from 'lucide-react';
import type { Cartridge, SoundElement } from '../../types';
import { 
  startElementDrone, 
  stopElementDrone, 
  stopAllDrones 
} from '../../utils/audioEffects';

interface InteractiveScreenProps {
  insertedCartridge: Cartridge;
  powerOn: boolean;
  isBooting: boolean;
}

export default function InteractiveScreen({
  insertedCartridge,
  powerOn,
  isBooting
}: InteractiveScreenProps) {
  const [elementStates, setElementStates] = useState<SoundElement[]>([]);

  useEffect(() => {
    const elements = insertedCartridge.interactiveElements || [];
    setElementStates(elements);

    if (powerOn && !isBooting) {
      elements.forEach(el => {
        if (el.audioActive) {
          startElementDrone(el.id, el.intensity);
        }
      });
    }

    return () => {
      stopAllDrones();
    };
  }, [insertedCartridge.id, powerOn, isBooting]);

  // Sync drone sound synthesis with interactive elements toggling
  const handleToggleElement = (id: string) => {
    if (!powerOn || isBooting) return;
    
    const updated = elementStates.map(el => {
      if (el.id === id) {
        const nextActive = !el.audioActive;
        if (nextActive) {
          startElementDrone(id, el.intensity);
        } else {
          stopElementDrone(id);
        }
        return { ...el, audioActive: nextActive };
      }
      return el;
    });
    setElementStates(updated);
  };

  const handleIntensityChange = (id: string, value: number) => {
    if (!powerOn || isBooting) return;

    const updated = elementStates.map(el => {
      if (el.id === id) {
        if (el.audioActive) {
          startElementDrone(id, value);
        }
        return { ...el, intensity: value };
      }
      return el;
    });
    setElementStates(updated);
  };

  return (
    <div id="screen-interactive-synth" className="w-full h-full bg-[#1b1712] text-[#f5dbb5] p-3 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      {/* Top Bar */}
      <div className="flex justify-between items-center z-10 border-b border-amber-900/30 pb-1">
        <div className="flex items-center space-x-1.5">
          <Compass className="text-amber-500 animate-spin" size={13} style={{ animationDuration: '6s' }} />
          <span className="text-[9px] font-mono tracking-widest text-[#ffe135] font-bold">
            CONSOLA DE SÍNTESIS NATURAL
          </span>
        </div>
        <span className="text-[7.5px] font-retro text-amber-500 border border-amber-900/40 px-1 rounded">
          LIVE MIX
        </span>
      </div>

      <div className="text-[8px] text-zinc-400 font-mono text-center my-0.5 leading-snug">
        Haz clic en cada elemento para sintetizar su paisaje sonoro sagrado. Eleva el nivel para modificar osciladores.
      </div>

      {/* SINTETIZADOR GRID (Controls with toggles and sliders) */}
      <div className="grid grid-cols-4 gap-1.5 my-1 tracking-tight z-10">
        {elementStates.map((el) => {
          return (
            <div 
              key={el.id}
              className={`rounded p-1.5 flex flex-col items-center justify-between border text-center transition-all ${
                el.audioActive 
                  ? 'bg-[#ffe8ca]/10 border-amber-500 shadow-lg shadow-amber-950/20' 
                  : 'bg-black/35 border-zinc-800/80 grayscale'
              }`}
            >
              {/* Emoji + Active point */}
              <div className="relative">
                <span className="text-lg">{el.emoji}</span>
                {el.audioActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping border border-amber-950" />
                )}
              </div>

              {/* Name */}
              <span className="text-[7.5px] font-bold font-mono tracking-wide mt-1 h-5 overflow-hidden line-clamp-2 leading-none">
                {el.name}
              </span>

              {/* Mechanical slider control */}
              <input 
                type="range"
                min="1"
                max="100"
                disabled={!el.audioActive}
                value={el.intensity}
                onChange={(e) => handleIntensityChange(el.id, parseInt(e.target.value))}
                className="w-full cursor-col-resize h-1 bg-zinc-800 rounded-lg appearance-none accent-amber-500 my-1 disabled:opacity-20"
              />

              {/* Active toggle button */}
              <button
                onClick={() => handleToggleElement(el.id)}
                className={`w-full py-0.5 rounded text-[8px] font-retro font-bold transition-all border outline-none cursor-pointer ${
                  el.audioActive
                    ? 'bg-amber-500 text-zinc-950 border-amber-400'
                    : 'bg-zinc-900 text-zinc-500 border-zinc-900 hover:bg-zinc-850 hover:text-zinc-300'
                }`}
              >
                {el.audioActive ? 'ACTVO' : 'MUTE'}
              </button>
            </div>
          );
        })}
      </div>

      {/* EQ Analyzer bar */}
      <div className="z-10 bg-black/40 rounded p-1.5 border border-amber-900/30 flex justify-between items-center">
        <div className="flex items-center space-x-1.5">
          <Activity size={12} className="text-amber-500 animate-pulse" />
          <span className="text-[8.5px] font-mono text-zinc-400">FRECUENCIA DE ONDA SAGRADA:</span>
        </div>
        
        {/* Dynamic waveform simulation ticker */}
        <div className="h-4 flex items-end space-x-0.5 font-mono overflow-hidden">
          {elementStates.some(e => e.audioActive) ? (
            [...Array(14)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-amber-500 rounded-t-sm animate-pulse"
                style={{
                  height: `${Math.floor(Math.random() * 11) + 4}px`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))
          ) : (
            <div className="w-16 h-[1.5px] bg-amber-900/40 rounded-full" />
          )}
        </div>
      </div>

    </div>
  );
}
