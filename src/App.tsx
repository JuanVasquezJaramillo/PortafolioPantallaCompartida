import { useState } from 'react';
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
import CartridgesShelf from './components/EstanteCartuchos.tsx';
import Footer from './components/landing/Footer.tsx';
import Header from './components/landing/Header.tsx';
import AcademicSheet from './components/landing/fichaTecnica/AcademicSheet.tsx';
import WelcomeGuide from './components/landing/fichaTecnica/WelcomeGuide.tsx';

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
      <Header powerOn={powerOn} selectedCartridge={selectedCartridge} />

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
            <WelcomeGuide onDismiss={dismissWelcome} />
          ) : (
            <AcademicSheet selectedCartridge={selectedCartridge} powerOn={powerOn} />
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
      <Footer />
    </div>
  );
}
