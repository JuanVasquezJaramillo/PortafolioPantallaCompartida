import { useState, useEffect } from 'react';
import type { Cartridge } from '../../types';

interface VideoScreenProps {
  insertedCartridge: Cartridge;
  volume: number;
}

export default function VideoScreen({ insertedCartridge, volume }: VideoScreenProps) {
  const [videoPlayhead, setVideoPlayhead] = useState(15); // Simulated seconds
  const [videoSubtitleIdx, setVideoSubtitleIdx] = useState(0);
  const [videoMode, setVideoMode] = useState<'real' | 'simulated'>('real');

  const videoSubtitles = [
    { es: "[Motor de fusión zumbando] Iniciando descenso en la Carrera Séptima.", en: "[Fusion engines humming] Initiating descent over Seventh Avenue." },
    { es: "La lluvia sintética limpia el polvo del holograma publicitario.", en: "Synthetic rain clears the neon dust off the hovering billboard." },
    { es: "Los reactores de fusión térmica mantienen un pulso constante a 2.4 Terahercios.", en: "Thermal fusion thrusters maintain a stable pulse at 2.4 Terahertz." },
    { es: "Buscando puertos de acoplamiento estudiantiles en zona centro.", en: "Scanning for student docking nodes in the historical sector." },
  ];

  // Reset local playhead when cartridge changes
  useEffect(() => {
    setVideoPlayhead(0);
    setVideoSubtitleIdx(0);
  }, [insertedCartridge.id]);

  // Cyberpunk Video Playhead simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setVideoPlayhead(prev => {
        const nextVal = (prev + 1) % 180;
        // Progress subtitle index based on time
        if (nextVal % 6 === 0) {
          setVideoSubtitleIdx(sub => (sub + 1) % videoSubtitles.length);
        }
        return nextVal;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [videoSubtitles.length]);

  // Helper seconds formatter
  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Direct video format rendering helper
  const renderRealVideo = (url: string) => {
    const isDirectVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.includes('.mp4?') || url.includes('.mp4#');
    if (isDirectVideo) {
      return (
        <video
          src={url}
          autoPlay
          loop
          muted={volume === 0}
          playsInline
          className="w-full h-full object-cover"
        />
      );
    }
    
    // Auto play and mute modifiers for generic embeds
    let finalUrl = url;
    if (url.includes('youtube.com/embed') || url.includes('youtube-nocookie.com/embed')) {
      const joinChar = url.includes('?') ? '&' : '?';
      finalUrl = `${url}${joinChar}autoplay=1&mute=${volume === 0 ? 1 : 0}&controls=1&rel=0`;
    }

    return (
      <iframe
        src={finalUrl}
        className="w-full h-full border-0 absolute inset-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  const showReal = videoMode === 'real' && insertedCartridge.videoEmbedUrl;

  return (
    <div id="screen-video" className="w-full h-full bg-black text-white p-2.5 flex flex-col justify-between font-mono relative overflow-hidden select-none">
      {/* Outer scanline grid & video record framework overlay */}
      <div className="absolute inset-0 border border-red-500/15 pointer-events-none z-20" />
      <div className="absolute top-2 left-2 flex items-center space-x-1.5 text-[8px] tracking-wide text-red-500 font-extrabold z-20 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]" />
        <span>REC [CR-64]</span>
      </div>
      
      <div className="absolute top-2 right-2 text-[8px] text-zinc-400 z-20">
        {showReal ? 'SIGNAL: REAL' : 'SIGNAL: STBY_SIM'}
      </div>

      {/* Simulated 3D Cyberpunk wireframe scene rendering OR Core real iframe video */}
      <div className="my-auto self-center flex-grow flex flex-col justify-center items-center relative w-full h-[60%]">
        
        {showReal ? (
          <div className="absolute inset-x-2 top-2 bottom-2 bg-neutral-950 border border-zinc-900 rounded overflow-hidden z-10">
            {renderRealVideo(insertedCartridge.videoEmbedUrl || '')}
            {/* Overlay subtitles on top of native stream for retro cinema mode */}
            <div className="absolute bottom-2 inset-x-2 text-center bg-black/85 px-2 py-1.5 rounded border border-zinc-800/50 z-20 pointer-events-none">
              <p className="text-[9.5px] font-sans text-yellow-350 font-medium leading-tight text-shadow">
                {videoSubtitles[videoSubtitleIdx].es}
              </p>
              <p className="text-[7.5px] text-zinc-400 font-sans italic tracking-wide mt-0.5 leading-none">
                {videoSubtitles[videoSubtitleIdx].en}
              </p>
            </div>
          </div>
        ) : (
          /* Virtual vector vector-grid */
          <div className="absolute inset-x-4 top-2 bottom-2 bg-neutral-950 border border-zinc-800/60 rounded flex flex-col justify-around p-1 overflow-hidden z-10">
            
            {/* Simulated landscape grid mesh line effects */}
            <div className="w-full h-0.5 bg-[#ff007f]/5 absolute top-1/4" />
            <div className="w-full h-0.5 bg-[#ff007f]/10 absolute top-2/4" />
            <div className="w-full h-0.5 bg-[#ff007f]/20 absolute top-3/4" />

            {/* Subtitle window overlay right in the storyboard */}
            <div className="absolute bottom-2 inset-x-2 text-center bg-black/85 px-2 py-1.5 rounded-md border border-zinc-800/50 z-20">
              <p className="text-[9.5px] font-sans text-yellow-350 font-medium leading-tight">
                {videoSubtitles[videoSubtitleIdx].es}
              </p>
              <p className="text-[7.5px] text-zinc-400 font-sans italic tracking-wide mt-0.5 leading-none">
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
        )}

      </div>

      {/* VIDEO FEED CONTROLLER TRAY */}
      <div className="z-20 bg-zinc-950/90 rounded-lg p-2 border border-zinc-800/80 flex flex-col space-y-1">
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

        {/* Info text box and switch mode button */}
        <div className="flex justify-between items-center text-[7.5px] font-mono select-none">
          <div className="flex flex-col">
            <span className="text-zinc-300 font-bold uppercase truncate max-w-[120px]">
              PROY: {insertedCartridge.title}
            </span>
            <span className="text-zinc-500 text-[6.5px]">
              AUTOR: {insertedCartridge.author.substring(0, 15)}...
            </span>
          </div>
          
          {/* Switch view mode interactive action button */}
          {insertedCartridge.videoEmbedUrl && (
            <button 
              onClick={() => setVideoMode(prev => prev === 'real' ? 'simulated' : 'real')}
              className={`px-1.5 py-0.5 rounded text-[7px] font-bold border transition duration-150 cursor-pointer ${
                videoMode === 'real'
                  ? 'bg-blue-600 text-white border-blue-400 hover:bg-blue-500'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              {videoMode === 'real' ? '📡 CAMBIAR RETRO' : '📺 REPRODUCIR'}
            </button>
          )}

          <span className="text-zinc-400 border border-zinc-800 bg-zinc-900 px-1 py-0.5 rounded font-bold uppercase">
            {insertedCartridge.category.split(' ')[0]}
          </span>
        </div>
      </div>

    </div>
  );
}
