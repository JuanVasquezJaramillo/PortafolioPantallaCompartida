import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Radio, SkipBack, Play, Pause, SkipForward } from 'lucide-react';
import type { Cartridge } from '../../types';

interface PodcastScreenProps {
  insertedCartridge: Cartridge;
}

export default function PodcastScreen({ insertedCartridge }: PodcastScreenProps) {
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(40); // Initial 40%

  // Reset local state when cartridge changes
  useEffect(() => {
    setIsPlaying(false);
    setActiveTrackIdx(0);
    setPodcastProgress(0);
  }, [insertedCartridge.id]);

  // Podcast / Music Interval simulator
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
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
  }, [isPlaying, activeTrackIdx, insertedCartridge.tracks]);

  // Helper seconds formatter
  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const activeTrack = insertedCartridge.tracks?.[activeTrackIdx] || { title: insertedCartridge.title, duration: '0:00' };

  return (
    <div id="screen-podcast-deck" className="w-full h-full bg-[#121319] text-white p-3 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      {/* Soft Ambient glowing colors based on cover */}
      <div className={`absolute -top-12 -left-12 w-32 h-32 bg-${insertedCartridge.accentColor}-600/10 rounded-full filter blur-2xl`} />
      
      {/* TOP BAR / TITLE */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <Radio className={`text-${insertedCartridge.accentColor}-400 ${isPlaying ? 'animate-pulse' : ''}`} size={13} />
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
                    ? `bg-${insertedCartridge.accentColor}-600/20 text-${insertedCartridge.accentColor}-300 border border-${insertedCartridge.accentColor}-500/20` 
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
}
