import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, Pause, Volume2, SkipForward, Tv, Radio, Compass, Activity, SkipBack } from 'lucide-react';
import type { Cartridge, SoundElement } from '../types';
import { 
  playPowerToggle, 
  startElementDrone, 
  stopElementDrone, 
  stopAllDrones 
} from '../utils/audioEffects';

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
  
  const [tvPower, setTvPower] = useState(true); // TV set power itself
  const [volume, setVolume] = useState(70);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(40); // Percentage
  const [elementStates, setElementStates] = useState<SoundElement[]>([]);
  const [videoPlayhead, setVideoPlayhead] = useState(15); // Simulated secs
  const [videoSubtitleIdx, setVideoSubtitleIdx] = useState(0);

  // Video subtitles simulated loop
  const videoSubtitles = [
    { es: "[Motor de fusión zumbando] Iniciando descenso en la Carrera Séptima.", en: "[Fusion engines humming] Initiating descent over Seventh Avenue." },
    { es: "La lluvia sintética limpia el polvo del holograma publicitario.", en: "Synthetic rain clears the neon dust off the hovering billboard." },
    { es: "Los reactores de fusión térmica mantienen un pulso constante a 2.4 Terahercios.", en: "Thermal fusion thrusters maintain a stable pulse at 2.4 Terahertz." },
    { es: "Buscando puertos de acoplamiento estudiantiles en zona centro.", en: "Scanning for student docking nodes in the historical sector." },
  ];

  // Reset local states when cartridge changes
  useEffect(() => {
    setIsPlaying(false);
    setActiveTrackIdx(0);
    setPodcastProgress(0);
    setVideoPlayhead(0);
    setVideoSubtitleIdx(0);
    
    // Cleanup any active drones
    stopAllDrones();

    if (insertedCartridge && insertedCartridge.interactiveElements) {
      setElementStates(insertedCartridge.interactiveElements);
      // Trigger default active soundscape drones if power is ON and TV is load-ready
      if (powerOn && !isBooting) {
        insertedCartridge.interactiveElements.forEach(el => {
          if (el.audioActive) {
            startElementDrone(el.id, el.intensity);
          }
        });
      }
    } else {
      setElementStates([]);
    }

    return () => {
      stopAllDrones();
    };
  }, [insertedCartridge, powerOn, isBooting]);

  // Podcast / Music Interval simulator
  useEffect(() => {
    let timer: any;
    if (isPlaying && insertedCartridge?.mediaType === 'podcast') {
      timer = setInterval(() => {
        setPodcastProgress(prev => {
          if (prev >= 100) {
            // Next track
            if (insertedCartridge.tracks && activeTrackIdx < insertedCartridge.tracks.length - 1) {
              setActiveTrackIdx(curr => curr + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 0;
            }
          }
          return prev + 1.2;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeTrackIdx, insertedCartridge]);

  // Cyberpunk Video Playhead simulator
  useEffect(() => {
    let timer: any;
    if (powerOn && !isBooting && insertedCartridge?.mediaType === 'video') {
      timer = setInterval(() => {
        setVideoPlayhead(prev => {
          const nextVal = (prev + 1) % 180;
          // Progress subtitle index based on time
          if (nextVal % 6 === 0) {
            setVideoSubtitleIdx(sub => (sub + 1) % videoSubtitles.length);
          }
          return nextVal;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [powerOn, isBooting, insertedCartridge]);

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

  // Helper seconds formatter
  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Switch physical TV toggle switch (sound click)
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
          <span className="text-[7px] font-retro text-neutral-800 tracking-wider">STANBY</span>
        </div>
      );
    }

    if (!insertedCartridge) {
      // Console on but empty slot: show heavy analog signal static noise
      return (
        <div id="tv-screen-static" className="w-full h-full bg-zinc-900 relative overflow-hidden flex flex-col justify-between p-4 font-retro select-none text-red-500">
          <div className="absolute inset-0 tv-static pointer-events-none z-10" />
          
          <div className="flex justify-between items-center text-[9px] text-[#3dfa3d] z-20 font-mono">
            <span>CANAL-03 AV</span>
            <span className="animate-pulse">● SIN SEÑAL</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-3 z-20 flex-grow">
            <Radio size={28} className="text-zinc-400 animate-bounce" />
            <p className="text-[11px] font-retro text-zinc-100 tracking-tight leading-relaxed">
              VACÍO
            </p>
            <p className="text-[8px] font-mono text-zinc-400 animate-blink">
              INTRODUCE UN CARTUCHO DEL ESTANTE EN LA CONSOLA...
            </p>
          </div>

          <div className="text-[7.5px] text-zinc-500 z-20 text-center uppercase">
            N64 PORTAFOLIO MULTIMEDIA
          </div>
        </div>
      );
    }

    if (isBooting) {
      // Show incredible N64 spinning logos & chimes
      return (
        <div id="tv-screen-boot" className="w-full h-full bg-gradient-to-b from-[#01010c] to-[#04081c] relative flex flex-col items-center justify-center overflow-hidden font-retro text-white">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,100,240,0.1),rgba(0,0,0,0.3))] pointer-events-none" />
          
          {/* Galactic particles field */}
          <div className="absolute inset-0 flex flex-wrap justify-around items-center opacity-30">
            <div className="w-1 h-1 bg-white rounded-full animate-ping" />
            <div className="w-0.5 h-0.5 bg-sky-200 rounded-full" />
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
            <div className="w-0.5 h-0.5 b-white rounded-full" />
          </div>

          {/* Glowing 3D Rotating Logo Box */}
          <motion.div
            initial={{ scale: 0.1, rotateY: 0 }}
            animate={{ scale: 1, rotateY: 360 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="w-16 h-16 flex items-center justify-center relative mb-4 z-20"
          >
            {/* Spinning Polygonal Cube */}
            <div className="relative w-12 h-12 transform preserve-3d rotate-12">
              <div className="absolute inset-0 bg-[#e11d48] border border-white opacity-80 rounded-md shadow-2xl flex items-center justify-center font-bold text-2xl font-retro select-none">
                U
              </div>
              <div className="absolute inset-0 bg-[#2563eb] border border-white opacity-50 rounded-md transform translate-z-4 flex items-center justify-center font-bold text-lg select-none">
                64
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[12px] font-retro text-[#ffe135] tracking-widest text-shadow"
          >
            UNIVERSIDAD 64
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.1 }}
            className="text-[7.5px] font-mono uppercase text-sky-400 tracking-wider mt-1.5"
          >
            Licenciado por el Consejo Estudiantil
          </motion.p>

          <div className="absolute bottom-3 text-[6.5px] font-mono text-zinc-500">
            © 2026 RE-PLAY SYSTEM. ALL RIGHTS RESERVED.
          </div>
        </div>
      );
    }

    // CARTRIDGE VIEWPORTS
    switch (insertedCartridge.mediaType) {
      
      // PODCASTS LAYOUT
      case 'podcast':
        const activeTrack = insertedCartridge.tracks?.[activeTrackIdx] || { title: 'Unknown Track', duration: '0:00' };
        
        return (
          <div id="screen-podcast-deck" className="w-full h-full bg-[#121319] text-white p-3 flex flex-col justify-between font-sans relative overflow-hidden select-none">
            {/* Soft Ambient glowing colors based on cover */}
            <div className={`absolute -top-12 -left-12 w-32 h-32 bg-${insertedCartridge.accentColor}-600/10 rounded-full filter blur-2xl`} />
            
            {/* TOP BAR / TITLE */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center space-x-2">
                <Radio className={`text-${insertedCartridge.accentColor}-400 active:animate-ping`} size={13} />
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  PODCAST REPRODUCCIÓN
                </span>
              </div>
              <span className={`text-[8px] font-retro text-${insertedCartridge.accentColor}-400 bg-black/40 px-1.5 py-0.5 rounded-sm`}>
                {insertedCartridge.year}
              </span>
            </div>

            {/* MAIN CORE: Spinning cassette hubs & active track metadata */}
            <div className="grid grid-cols-12 gap-2 my-1.5 items-center flex-grow z-10">
              
              {/* Left Column: cassette illustration */}
              <div className="col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[120px] aspect-video bg-zinc-800 rounded-lg border-2 border-zinc-900 shadow-xl relative p-1 overflow-hidden flex flex-col justify-between">
                  {/* Tape label details */}
                  <div className={`h-4 rounded bg-gradient-to-r ${insertedCartridge.coverBg} py-0.5 px-1.5 flex items-center justify-between overflow-hidden shadow-inner`}>
                    <span className="text-[6px] font-retro scale-90 origin-left uppercase text-white font-bold truncate">
                      {insertedCartridge.title}
                    </span>
                  </div>

                  {/* Tape reel sprocket hubs */}
                  <div className="flex justify-around items-center bg-zinc-950 rounded-md h-5 border border-zinc-900 relative my-0.5">
                    {/* Sprocket 1 */}
                    <motion.div
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                      className="w-4 h-4 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center text-[5px] text-zinc-600"
                    >
                      ☉
                    </motion.div>
                    {/* Center window showing tape bundle */}
                    <div className="w-10 h-2 bg-amber-900/40 rounded border border-black flex items-center justify-center opacity-60">
                      <div className="w-6 h-1.5 bg-amber-500/80 rounded-full" />
                    </div>
                    {/* Sprocket 2 */}
                    <motion.div
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                      className="w-4 h-4 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center text-[5px] text-zinc-600"
                    >
                      ☉
                    </motion.div>
                  </div>

                  <div className="flex justify-between items-center text-[5px] text-zinc-500 font-mono">
                    <span>NR Noise</span>
                    <span>TAPE SIDE A</span>
                  </div>
                </div>

                {/* Oscillating mini graphic bar */}
                <div className="w-full max-w-[110px] h-3 mt-2 flex items-end justify-center space-x-0.5 overflow-hidden">
                  {[...Array(11)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying ? [3, Math.floor(Math.random() * 11) + 4, 3] : 3,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.3 + (i * 0.05),
                        ease: 'easeInOut'
                      }}
                      className={`w-1.5 bg-gradient-to-t from-${insertedCartridge.accentColor}-600 to-${insertedCartridge.accentColor}-400 rounded-t-sm`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Title and Tracks control */}
              <div className="col-span-7 flex flex-col space-y-1.5 justify-center h-full pl-1">
                <div className="bg-black/30 p-1.5 rounded border border-zinc-800/40">
                  <h4 className="text-[11px] font-medium text-white truncate font-sans">
                    {activeTrack.title}
                  </h4>
                  <p className="text-[9px] text-zinc-400 font-mono truncate">
                    {insertedCartridge.category} - {insertedCartridge.author}
                  </p>
                </div>

                {/* Mini track selector */}
                <div className="space-y-1 max-h-[85px] overflow-y-auto pr-0.5 custom-scrollbar">
                  {insertedCartridge.tracks?.map((tr, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTrackIdx(index);
                        setPodcastProgress(0);
                      }}
                      className={`w-full text-left p-1 rounded text-[10px] flex justify-between items-center transition-colors ${
                        activeTrackIdx === index 
                          ? `bg-${insertedCartridge.accentColor}-600/20 text-${insertedCartridge.accentColor}-300 hover:brightness-110 border border-${insertedCartridge.accentColor}-500/20` 
                          : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/60'
                      }`}
                    >
                      <span className="truncate max-w-[85%]">{index + 1}. {tr.title}</span>
                      <span className="font-mono text-[8px] opacity-75">{tr.duration}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* PLAYER CONTROL TIMELINE */}
            <div className="z-10 bg-black/40 rounded-xl p-2 border border-zinc-800/50 flex flex-col space-y-2">
              
              {/* Play progress bar */}
              <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-400">
                <span>{formatTime(Math.round((podcastProgress / 100) * 180))}</span>
                <div className="flex-grow h-1.5 bg-zinc-850 rounded-full relative cursor-pointer overflow-hidden"
                     onClick={(e) => {
                       const rect = e.currentTarget.getBoundingClientRect();
                       const x = e.clientX - rect.left;
                       setPodcastProgress(Math.min(100, Math.max(0, (x / rect.width) * 100)));
                     }}
                >
                  <div 
                    className={`h-full bg-gradient-to-r ${insertedCartridge.coverBg} rounded-full`}
                    style={{ width: `${podcastProgress}%` }}
                  />
                </div>
                <span>{activeTrack.duration}</span>
              </div>

              {/* Physical action button tray */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {/* Prev track button */}
                  <button 
                    disabled={activeTrackIdx === 0}
                    onClick={() => {
                      setActiveTrackIdx(p => Math.max(0, p - 1));
                      setPodcastProgress(0);
                    }}
                    className={`p-1 text-zinc-400 rounded hover:text-white transition active:scale-95 ${activeTrackIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <SkipBack size={12} />
                  </button>

                  {/* Play main controller */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition hover:scale-105 active:scale-95 cursor-pointer text-zinc-950 ${
                      isPlaying 
                        ? `bg-${insertedCartridge.accentColor}-400 led-glow-green` 
                        : 'bg-white'
                    }`}
                  >
                    {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} className="ml-0.5" fill="currentColor" />}
                  </button>

                  {/* Next track button */}
                  <button 
                    disabled={activeTrackIdx >= (insertedCartridge.tracks?.length || 0) - 1}
                    onClick={() => {
                      setActiveTrackIdx(p => Math.min((insertedCartridge.tracks?.length || 1) - 1, p + 1));
                      setPodcastProgress(0);
                    }}
                    className={`p-1 text-zinc-400 rounded hover:text-white transition active:scale-95 ${activeTrackIdx >= (insertedCartridge.tracks?.length || 1) - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <SkipForward size={12} />
                  </button>
                </div>

                {/* Simulated metadata banner */}
                <div className="text-[7.5px] font-mono tracking-widest text-[#ffe135] bg-yellow-950/40 border border-yellow-800/30 px-1 rounded">
                  {isPlaying ? 'TAPE RUNNING ■ Stereo' : 'TAPE HOLD'}
                </div>
              </div>

            </div>

          </div>
        );

      // VIDEO INTERFACE (Storyboards / Subtitles simulation)
      case 'video':
        return (
          <div id="screen-video" className="w-full h-full bg-black text-white p-2.5 flex flex-col justify-between font-mono relative overflow-hidden select-none">
            {/* Outer scanline grid & video record framework overlay */}
            <div className="absolute inset-0 border border-red-500/20 pointer-events-none z-10" />
            <div className="absolute top-2 left-2 flex items-center space-x-1.5 text-[8px] tracking-wide text-red-500 font-extrabold z-10 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-650" />
              <span>REC [CR-64]</span>
            </div>
            
            <div className="absolute top-2 right-2 text-[8px] text-zinc-400 z-10">
              STBY F_024
            </div>

            {/* Simulated 3D Cyberpunk wireframe scene rendering */}
            <div className="my-auto self-center flex-grow flex flex-col justify-center items-center relative w-full h-[60%]">
              
              {/* Virtual vector vector-grid */}
              <div className="absolute inset-x-4 top-2 bottom-2 bg-neutral-950 border border-zinc-800/60 rounded flex flex-col justify-around p-1 overflow-hidden">
                
                {/* Simulated landscape grid mesh line effects */}
                <div className="w-full h-0.5 bg-[#ff007f]/5 absolute top-1/4" />
                <div className="w-full h-0.5 bg-[#ff007f]/10 absolute top-2/4" />
                <div className="w-full h-0.5 bg-[#ff007f]/20 absolute top-3/4" />

                {/* Subtitle window overlay right in the storyboard */}
                <div className="absolute bottom-2 inset-x-2 text-center bg-black/80 px-2 py-1.5 rounded-md border border-zinc-800/50 z-20">
                  <p className="text-[9.5px] font-sans text-yellow-300 font-medium leading-tight">
                    {videoSubtitles[videoSubtitleIdx].es}
                  </p>
                  <p className="text-[7px] text-gray-400 font-sans italic tracking-wide mt-0.5 leading-none">
                    {videoSubtitles[videoSubtitleIdx].en}
                  </p>
                </div>

                {/* Virtual camera scope elements */}
                <div className="absolute top-1/2 left-2 w-1.5 h-6 border-l border-y border-white/20" />
                <div className="absolute top-1/2 right-2 w-1.5 h-6 border-r border-y border-white/20" />

                {/* Decorative retro graphic objects based on active cartridge */}
                {insertedCartridge.id === 'neon-bogota' ? (
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pt-2">
                    {/* Retro Cyberpunk neon car wireframe representation */}
                    <div className="w-24 h-5 border border-fuchsia-500/70 bg-fuchsia-950/20 rounded-md relative flex items-center justify-between px-1 animate-pulse">
                      <div className="w-3 h-3 rounded-full bg-cyan-400/30 border border-cyan-400" />
                      <div className="text-[6.5px] text-fuchsia-300 font-bold tracking-widest uppercase">SKYLINE CAR</div>
                      <div className="w-3 h-3 rounded-full bg-cyan-400/30 border border-cyan-400" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pt-2">
                    {/* Galactic satellite orbital simulation */}
                    <div className="relative animate-spin duration-3000 w-12 h-12 border border-dashed border-indigo-500/50 rounded-full flex items-center justify-center">
                      <div className="absolute top-0 w-2 h-2 rounded-full bg-yellow-400 shadow-md" />
                      <div className="w-4 h-4 bg-indigo-500 rounded-full" />
                    </div>
                  </div>
                )}

                {/* Display tag */}
                <div className="absolute top-1 left-2 text-[6.5px] text-teal-400 font-mono tracking-widest">
                  RENDER_ENGINE_64 // {insertedCartridge.year}
                </div>
              </div>

            </div>

            {/* VIDEO FEED CONTROLLER TRAY */}
            <div className="z-10 bg-zinc-950/90 rounded-lg p-2 border border-zinc-800/80 flex flex-col space-y-1">
              {/* Play timeline bar */}
              <div className="flex justify-between items-center text-[8.5px] text-zinc-400 font-mono">
                <span>{formatTime(videoPlayhead)}</span>
                <div className="flex-grow mx-3 h-1 bg-zinc-900 rounded-full relative overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${insertedCartridge.coverBg}`}
                    style={{ width: `${(videoPlayhead / 180) * 100}%` }}
                  />
                </div>
                <span>03:00</span>
              </div>

              {/* Info text box */}
              <div className="flex justify-between items-center text-[7.5px] font-mono select-none mt-1">
                <span className="text-zinc-500 font-bold uppercase truncate max-w-[70%]">
                  PROY: {insertedCartridge.title}
                </span>
                <span className="text-zinc-400 border border-zinc-800 bg-zinc-900 px-1 rounded">
                  {insertedCartridge.category}
                </span>
              </div>
            </div>

          </div>
        );

      // INTERACTIVE SOUNDSCAPE MIXER
      case 'interactive':
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
                          : 'bg-zinc-900 text-zinc-550 border-zinc-800 hover:bg-zinc-800/80 hover:text-zinc-300'
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
                      className="w-1 bg-amber-500 rounded-t-sm"
                      style={{
                        height: `${Math.floor(Math.random() * 11) + 4}px`,
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
      <div className="flex-grow bg-black p-3 rounded-[30px] border-4 border-[#222226] relative crt-screen crt-glow overflow-hidden shadow-inner flex flex-col">
        {/* Bezel inner highlight */}
        <div className="absolute inset-0 border border-white/5 rounded-[22px] pointer-events-none z-30" />
        
        {/* Actual Video/Screen Panel with 4:3 aspect ratio */}
        <div className="w-full aspect-[4/3] bg-black rounded-xl overflow-hidden border border-zinc-950 relative shadow-2xl flex flex-col">
          
          {/* Render Active/On screen layout */}
          {renderScreenContent()}

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
            {tvPower ? 'OP_ON' : 'STBY'}
          </span>
        </div>

      </div>

    </div>
  );
}
