/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {Sparkles, HelpCircle, BookOpen } from 'lucide-react';
import { UNIVERSITY_PROJECTS } from './data/projects';
import type { Cartridge } from './types';
import { 
  playCartridgeClack, 
  playPowerToggle, 
  playBootSplash, 
  stopAllDrones 
} from './utils/audioEffects';

import Console64 from './components/Consola64';
import CRT_TV from './components/CRT_TV';
import CartridgesShelf from './components/estanteCartuchos';

export default function App() {
  const [selectedCartridge, setSelectedCartridge] = useState<Cartridge | null>(null);
  const [powerOn, setPowerOn] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Trigger boot animation when cartridge is inserted while console is ALREADY on
  const handleSelectCartridge = (cartridge: Cartridge) => {
    setSelectedCartridge(cartridge);
    playCartridgeClack();
    
    if (powerOn) {
      // Trigger boot up immediately
      setIsBooting(true);
      playBootSplash();
      const timer = setTimeout(() => {
        setIsBooting(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  };

  // Toggle Power slider switch
  const handleTogglePower = () => {
    const nextPower = !powerOn;
    setPowerOn(nextPower);
    
    if (nextPower) {
      // If a cartridge is already inside the console when powered on, trigger the boot chiming sequence!
      if (selectedCartridge) {
        setIsBooting(true);
        playBootSplash();
        setTimeout(() => {
          setIsBooting(false);
        }, 2200);
      }
    } else {
      // Power off actions: instantly kill screen signals and stop soundscape oscillators
      setIsBooting(false);
      stopAllDrones();
    }
  };

  // Eject mechanical cartridge button click
  const handleEject = () => {
    setSelectedCartridge(null);
    setIsBooting(false);
    stopAllDrones();
  };

  // Reset console button triggers boot chimes again
  const handleReset = () => {
    if (powerOn && selectedCartridge) {
      setIsBooting(true);
      playBootSplash();
      setTimeout(() => {
        setIsBooting(false);
      }, 2200);
    }
  };

  // Click on instructions dismiss
  const dismissWelcome = () => {
    playPowerToggle();
    setShowWelcome(false);
  };

  return (
    <div 
      id="app-container" 
      className="min-h-screen text-zinc-100 flex flex-col justify-between relative overflow-x-hidden p-3 md:p-6 selection:bg-blue-500/30 selection:text-white artistic-ambient-bg font-sans"
    >
      {/* Background radial atmosphere glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none -z-10" />

      {/* HEADER BAR */}
      <header className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-4 mb-6 z-10">
        <div className="flex flex-col mb-3 sm:mb-0">
          <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold mb-1">
            Portfolio Multimedia
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase">
            Pantalla Compartida <span className="text-blue-500 underline decoration-4">V.64</span>
          </h1>
        </div>

        {/* Current Time / Status ticker */}
        <div className="flex items-center space-x-3 bg-zinc-900/80 border border-white/10 rounded-xl py-1.5 px-3">
          <div className={`w-2 h-2 rounded-full ${powerOn ? 'bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-ping' : 'bg-red-600 shadow-[0_0_10px_#dc2626]'}`} />
          <span className="text-[11px] font-mono uppercase text-zinc-300">
            {powerOn 
              ? selectedCartridge 
                ? `PLAYING: ${selectedCartridge.title.substring(0, 15)}..`
                : 'CONSOLE_ON_EMPTY_SLOT'
              : 'CONSOLE_STBY'}
          </span>
        </div>
      </header>

      {/* CORE CONTENT LAYOUT */}
      <main className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10 flex-grow">
        
        {/* LEFT COLUMN (12-col: 7 width) - The retro desk workspace (TV & Console) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. CRT TELEVISION SCREEN */}
          <CRT_TV 
            insertedCartridge={selectedCartridge}
            powerOn={powerOn}
            isBooting={isBooting}
            onReset={handleReset}
          />

          {/* 2. N64 CLASSIC REPRODUCTION CONSOLE */}
          <Console64 
            insertedCartridge={selectedCartridge}
            powerOn={powerOn}
            onTogglePower={handleTogglePower}
            onEject={handleEject}
            onReset={handleReset}
          />

        </div>

        {/* RIGHT COLUMN (12-col: 5 width) - Proyect Cartridges & Descriptive panel */}
        <div className="lg:col-span-5 space-y-6 flex flex-col h-full justify-between">
          
          {/* Welcome / How to play interactive guidelines modal card */}
          {showWelcome ? (
            <div id="welcome-modal" className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 rounded-2xl border border-amber-500/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2 text-amber-500">
                  <Sparkles size={16} />
                  <h3 className="font-retro text-[10px] tracking-tight uppercase">Guía de Operación Retro</h3>
                </div>
              </div>
              
              <p className="text-zinc-300 text-xs leading-relaxed mb-4">
                ¡Bienvenido al portafolio multimedia de Pantalla Compartida! Hemos emulado el funcionamiento físico de una consola clásica de videojuegos al más estilo de la mitiquísima Nintendo 64 para que explores proyectos audiovisuales de una forma lúdica y táctil.
              </p>

              <div className="space-y-2.5 text-xs text-zinc-400 mb-5">
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center font-bold text-[10px] mr-2.5 flex-shrink-0">
                    1
                  </div>
                  <p className="pt-0.5">
                    <strong>Selecciona un cartucho</strong> del estante inferior para insertarlo en la ranura de la consola.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center font-bold text-[10px] mr-2.5 flex-shrink-0">
                    2
                  </div>
                  <p className="pt-0.5">
                    Enciende el interruptor mecánico de <strong>Power</strong> (Verde) en la consola para activar la señal del TV.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center font-bold text-[10px] mr-2.5 flex-shrink-0">
                    3
                  </div>
                  <p className="pt-0.5">
                    <strong>Interactúa</strong> con la pantalla del TV reproduciendo pistas, cambiando frecuencias de sonido o manejando el cortometraje.
                  </p>
                </div>
              </div>

              <button
                onClick={dismissWelcome}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 active:scale-98 rounded-xl text-zinc-950 font-bold text-xs tracking-tight shadow-md cursor-pointer transition-all"
              >
                ENTENDIDO, INICIAR SIMULACIÓN
              </button>
            </div>
          ) : (
            /* DETAILED ACADEMIC SHEET OF ACTIVE PROJECT */
            <div id="project-academic-sheet" className="bg-gradient-to-br from-zinc-900/90 to-[#14151a] p-5 rounded-2xl border border-zinc-800 shadow-xl relative">
              <div className="absolute top-2 right-3 text-zinc-650 font-mono text-[7px] tracking-widest uppercase">
                Ficha Técnica
              </div>

              {selectedCartridge ? (
                /* Cartridge loaded info */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCartridge.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Badge and Title */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[8.5px] font-retro text-white px-2 py-0.5 rounded bg-gradient-to-r ${selectedCartridge.coverBg}`}>
                          {selectedCartridge.category}
                        </span>
                        <span className="text-zinc-500 text-xs font-mono">
                          Año {selectedCartridge.year}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold font-sans tracking-tight text-white mt-1.5 leading-snug">
                        {selectedCartridge.title}
                      </h3>
                      
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                        {selectedCartridge.subtitle}
                      </p>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-zinc-300 text-xs leading-relaxed border-t border-zinc-800/80 pt-3">
                      {selectedCartridge.description}
                    </p>

                    {/* Academic Credits Info block */}
                    <div className="bg-black/35 rounded-xl p-3 border border-zinc-800/60 divide-y divide-zinc-800/40 text-xs space-y-2 mt-2">
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Autores Académicos</span>
                        <span className="text-white text-[11px] font-medium text-right max-w-[65%] truncate">
                          {selectedCartridge.author}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 pb-2">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Formato de Obra</span>
                        <span className="text-[#3dfa3d] text-[11px] font-mono uppercase">
                          {selectedCartridge.mediaType === 'podcast' ? '📻 Podcast Estéreo' : selectedCartridge.mediaType === 'video' ? '🎬 Cortometraje 3D' : '💻 Docu-web Interactivo'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Estado de Ejecución</span>
                        <span className="text-white text-[11px] flex items-center space-x-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${powerOn ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                          <span>{powerOn ? 'Reproduciendo en TV' : 'Necesita Power ON'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Help notice if not power on */}
                    {!powerOn && (
                      <div className="text-[9px] text-amber-500 bg-amber-950/20 border border-amber-900/30 p-2 rounded-lg flex items-center space-x-1.5 animate-pulse">
                        <HelpCircle size={12} fill="currentColor" className="text-zinc-950" />
                        <span>¡El cartucho está insertado! Recuerda <strong>subir el interruptor de POWER</strong> en la consola para ver el contenido.</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                /* No cartridge selected info state */
                <div className="py-12 text-center h-full flex flex-col justify-center items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-650">
                    <BookOpen size={20} />
                  </div>
                  <h4 className="text-zinc-350 text-xs font-bold uppercase tracking-wide">
                    Consola Vacía / Esperando Obra
                  </h4>
                  <p className="text-zinc-550 text-[11px] max-w-xs leading-relaxed">
                    Selecciona uno de los cartuchos de plástico del estante de abajo para encajarlo en los lectores de cobre de la ranura.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Cartridges Shelving system rack component */}
          <CartridgesShelf 
            cartridges={UNIVERSITY_PROJECTS}
            activeCartridgeId={selectedCartridge ? selectedCartridge.id : null}
            onSelectCartridge={handleSelectCartridge}
          />

        </div>

      </main>

      {/* FOOTER METADATA CREDIT SIGNATURE */}
      <footer className="max-w-6xl w-full mx-auto border-t border-zinc-850/60 mt-10 pt-4 pb-2 flex flex-col sm:flex-row justify-between items-center text-zinc-600 text-[10px] font-mono z-10 space-y-2.5 sm:space-y-0">
        <div className="flex items-center space-x-1.5">
          <span>CREADO PARA UNIVERSIDAD DEL CAUCA 2026-I</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>SISTEMA EMULADO 64 (STDL-VOLT)</span>
          <span className="text-[#3dfa3d]">● ONLINE</span>
        </div>
      </footer>
    </div>
  );
}
