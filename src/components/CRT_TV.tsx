import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, Tv, Maximize2, Minimize2 } from 'lucide-react';
import type { Cartridge } from '../types';
import { playPowerToggle } from '../utils/audioEffects';

import BootScreen from './pantallas/BootScreen';
import StaticScreen from './pantallas/StaticScreen';
import PodcastScreen from './pantallas/PodcastScreen';
import VideoScreen from './pantallas/VideoScreen';
import InteractiveScreen from './pantallas/InteractiveScreen';

interface CRT_TVProps {
  insertedCartridge: Cartridge | null;
  powerOn: boolean;
  isBooting: boolean;
  onReset: () => void;
}

export default function CRT_TV({
  insertedCartridge,
  powerOn,
  isBooting,
}: CRT_TVProps) {
  const [tvPower, setTvPower] = useState(true);
  const [volume, setVolume] = useState(70);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      screenRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const toggleTvDial = () => {
    playPowerToggle();
    setTvPower(prev => !prev);
  };

  // Render active project view
  const renderScreenContent = () => {
    if (!tvPower) return null; // CRT screen physically off
    if (!powerOn) {
      // Console is off, screen shows reflection only (black glass)
      return (
        <div id="tv-screen-off" className="w-full h-full bg-[#0a0a0c] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-radial from-transparent to-black pointer-events-none opacity-80" />
          <span className="text-[7px] font-retro text-neutral-800 tracking-wider">SIN SEÑAL</span>
        </div>
      );
    }

    if (!insertedCartridge) {
      // Console on but empty slot: show heavy analog signal static noise
      return <StaticScreen />;
    }

    if (isBooting) {
      // Show incredible N64 spinning logos & chimes
      return <BootScreen />;
    }

    // CARTRIDGE VIEWPORTS
    switch (insertedCartridge.mediaType) {
      case 'podcast':
        return <PodcastScreen insertedCartridge={insertedCartridge} />;
      case 'video':
        return <VideoScreen insertedCartridge={insertedCartridge} volume={volume} />;
      case 'interactive':
        return (
          <InteractiveScreen 
            insertedCartridge={insertedCartridge} 
            powerOn={powerOn} 
            isBooting={isBooting} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="retro-crt-tv" className="w-full max-w-xl mx-auto flex flex-col md:flex-row bg-[#2a2a2e] p-3 sm:p-4 rounded-[40px] border-[10px] border-[#1f1f23] shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_0_25px_rgba(0,0,0,0.9)] relative plastic-texture">
      
      {/* Wooden/Charcoal Case Top/Sides 3D depth borders */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-white/5 rounded-t-2xl pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/40 rounded-b-2xl pointer-events-none" />

      {/* LEFT CHASSIS: Screen Bezel */}
      <div
        ref={screenRef}
        className={`flex-grow bg-black p-3 rounded-[30px] border-4 border-[#222226] relative crt-screen crt-glow overflow-hidden shadow-inner flex flex-col ${isFullscreen ? '!rounded-none !border-0' : ''}`}
      >
        {/* Bezel inner highlight */}
        <div className="absolute inset-0 border border-white/5 rounded-[22px] pointer-events-none z-30" />
        
        {/* Actual Video/Screen Panel with 4:3 aspect ratio */}
        <div className="w-full aspect-[4/3] bg-black rounded-xl overflow-hidden border border-zinc-950 relative shadow-2xl flex flex-col">
          
          {/* Render Active/On screen layout */}
          {renderScreenContent()}

          {/* Fullscreen hint overlay */}
          {isFullscreen && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-[8px] font-mono text-white/50 bg-black/60 px-2 py-1 rounded-full">
                ESC para salir de pantalla completa
              </span>
            </div>
          )}

          {/* CRT scanline glare & physical static flare elements */}
          {tvPower && (
            <>
              {/* Glass glare overlay */}
              <div className="absolute inset-0 crt-flare pointer-events-none z-30" />
              {/* Rolling horizontal lines */}
              <div className="absolute inset-0 crt-roll pointer-events-none" />
              {/* Static flickers */}
              {isBooting && (
                <div className="absolute inset-0 bg-white/5 opacity-30 animate-pulse pointer-events-none z-30" />
              )}
            </>
          )}

          {/* Physical TV scanlines mask overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none z-40 bg-[length:100%_3px,3px_100%]" />
        </div>
      </div>

      {/* RIGHT CHASSIS: Controls Grid (Dials, Speaker, retro badging) */}
      <div className="w-full md:w-36 mt-3 md:mt-0 md:ml-3 flex flex-row md:flex-col justify-between items-center md:items-stretch bg-[#222222] p-3 rounded-2xl border border-zinc-800">
        
        {/* TV Badge brand logo */}
        <div className="hidden md:flex flex-col items-center mb-2">
          <span className="text-[10px] font-retro tracking-tighter text-[#3dfa3d] font-bold">TRINITRON</span>
          <span className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">ESTÉREO HI-FI</span>
        </div>

        {/* Rotative mechanical tuning dialers */}
        <div className="flex md:flex-col items-center justify-center space-x-2.5 md:space-x-0 md:space-y-4 py-1 flex-grow">
          
          {/* Dial 1: Tuner Channel */}
          <div className="flex flex-col items-center">
            <span className="text-[7.5px] font-mono text-zinc-500 uppercase tracking-wide">CANAL</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border-2 border-zinc-950 shadow-md flex items-center justify-center relative cursor-pointer active:rotate-45 transition-transform duration-150">
              <div className="w-1.5 h-4 bg-zinc-950 rounded-sm absolute top-0.5" />
              <span className="text-[8.5px] font-mono text-zinc-300 font-bold z-10 bg-zinc-900 px-1 rounded-sm border border-zinc-800/40 mt-3 scale-85">
                03
              </span>
            </div>
          </div>

          {/* Dial 2: Analog Volume Knob */}
          <div className="flex flex-col items-center">
            <span className="text-[7.5px] font-mono text-zinc-500 uppercase tracking-wide">VOLUMEN</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border-2 border-zinc-950 shadow-md flex items-center justify-center relative select-none">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 w-full h-full cursor-ns-resize"
              />
              {/* Rotating pointer marker */}
              <div 
                className="w-1.5 h-4 bg-[#ef4444] rounded-sm absolute top-0.5"
                style={{ transform: `rotate(${(volume / 100) * 270 - 135}deg)`, transformOrigin: 'bottom center' }}
              />
              <Volume2 size={10} className="text-zinc-400 mt-3" />
            </div>
          </div>

          {/* Push physical TV power button */}
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={toggleTvDial}
              className={`w-7 h-7 rounded-md border-b-2 flex items-center justify-center transition-all cursor-pointer ${
                tvPower 
                  ? 'bg-rose-600 hover:brightness-105 active:scale-95 border-rose-800 text-white' 
                  : 'bg-zinc-800 border-zinc-950 text-zinc-550'
              }`}
            >
              <Tv size={11} />
            </button>
            <span className="text-[7.5px] font-mono text-zinc-500 mt-1 uppercase">TV SW</span>
          </div>

          {/* Fullscreen toggle button */}
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={toggleFullscreen}
              className={`w-7 h-7 rounded-md border-b-2 flex items-center justify-center transition-all cursor-pointer ${
                isFullscreen
                  ? 'bg-emerald-600 hover:brightness-105 active:scale-95 border-emerald-800 text-white'
                  : 'bg-zinc-800 border-zinc-950 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {isFullscreen ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
            </button>
            <span className="text-[7.5px] font-mono text-zinc-500 mt-1 uppercase">ZOOM</span>
          </div>

        </div>

        {/* Speaker Acoustic matrix (mesh grille rows) */}
        <div className="flex flex-col space-y-1 w-20 md:w-full mt-1.5 opacity-50">
          <div className="h-0.5 bg-black rounded" />
          <div className="h-0.5 bg-black rounded" />
          <div className="h-0.5 bg-black rounded" />
          <div className="h-0.5 bg-black rounded" />
          <div className="h-0.5 bg-black rounded" />
          <div className="h-0.5 bg-black rounded" />
          <div className="h-0.5 bg-black rounded" />
          <div className="h-0.5 bg-black rounded" />
        </div>

        {/* TV virtual indicator LED */}
        <div className="flex items-center space-x-1 justify-center mt-3 md:mt-2">
          <div className={`w-1.5 h-1.5 rounded-full ${tvPower ? 'bg-emerald-500 led-glow-green animate-pulse' : 'bg-red-950/40'}`} />
          <span className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest">
            {tvPower ? 'ENCENDIDO' : 'APAGADO'}
          </span>
        </div>

      </div>

    </div>
  );
}
