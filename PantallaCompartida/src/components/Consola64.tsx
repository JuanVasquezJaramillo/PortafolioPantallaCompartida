import { motion } from 'motion/react';
import { Power, RotateCcw, ArrowUpFromLine, Sparkles } from 'lucide-react';
import type { Cartridge } from '../types';
import { playPowerToggle, playCartridgeClack } from '../utils/audioEffects';

interface Console64Props {
  insertedCartridge: Cartridge | null;
  powerOn: boolean;
  onTogglePower: () => void;
  onEject: () => void;
  onReset: () => void;
}

export default function Console64({
  insertedCartridge,
  powerOn,
  onTogglePower,
  onEject,
  onReset,
}: Console64Props) {

  const handlePowerClick = () => {
    playPowerToggle();
    onTogglePower();
  };

  const handleEjectClick = () => {
    if (insertedCartridge) {
      playCartridgeClack();
      onEject();
    }
  };

  const handleResetClick = () => {
    if (powerOn && insertedCartridge) {
      playPowerToggle(); // Retro buzz
      onReset();
    }
  };

  return (
    <div id="n64-console-root" className="w-full max-w-xl mx-auto my-6 relative filter drop-shadow-2xl">
      {/* Console Top View Shell */}
      <div className="bg-gradient-to-b from-[#2a2b30] via-[#1f2024] to-[#141517] rounded-3xl p-6 sm:p-8 n64-shadow border border-zinc-700/30 relative plastic-texture overflow-visible">
        
        {/* Subtle physical air vents on the sides */}
        <div className="absolute top-4 left-6 flex space-x-1 opacity-40">
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
        </div>
        <div className="absolute top-4 right-6 flex space-x-1 opacity-40">
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
          <div className="w-1.5 h-12 bg-black rounded-full shadow-inner" />
        </div>

        {/* Outer Circular Dome detail on back */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-10 bg-[#1e2023] rounded-b-full shadow-inner border-b border-zinc-700/20" />

        {/* CARTRIDGE SLOT AREA */}
        <div className="relative z-10 flex flex-col items-center mt-4">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold mb-1.5">
            UNICAUCA 64 HIGH LEVEL ENTERTAINMENT SYSTEM
          </span>

          {/* Real simulated cartridge slot */}
          <div className="w-64 sm:w-80 h-16 bg-gradient-to-b from-zinc-950 to-zinc-900 rounded-2xl border-2 border-zinc-700/50 flex items-center justify-center relative shadow-inner overflow-visible">
            
            {/* If no cartridge is inserted, show spring dust flaps */}
            {!insertedCartridge ? (
              <div className="absolute inset-0 flex flex-col justify-between p-1 ready-slot">
                {/* Dust flap 1 (Top flap) */}
                <div className="h-[46%] w-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-t-lg border-b border-zinc-950 transition-all duration-300 shadow-md flex items-center justify-center">
                  <div className="w-24 h-1 bg-zinc-700/30 rounded-full" />
                </div>
                {/* Dust flap 2 (Bottom flap) */}
                <div className="h-[46%] w-full bg-gradient-to-b from-[#1c1d21] to-[#121316] rounded-b-lg border-t border-zinc-950 transition-all duration-300 shadow-md flex items-center justify-center">
                  <div className="w-24 h-1 bg-zinc-800/30 rounded-full" />
                </div>
              </div>
            ) : (
              /* If cartridge is inserted, show the cartridge sticking out in 3D! */
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="absolute -bottom-1 w-[90%] h-36 bg-[#c4c9cc] rounded-t-xl border-x-4 border-t-4 border-zinc-400 shadow-2xl flex flex-col justify-end overflow-hidden z-20 plastic-texture"
              >
                {/* Cartridge plastic notch details */}
                <div className="absolute top-1 left-2 right-2 flex justify-between">
                  <div className="w-5 h-2 bg-gradient-to-b from-zinc-500 to-transparent rounded-sm" />
                  <div className="w-5 h-2 bg-gradient-to-b from-zinc-500 to-transparent rounded-sm" />
                </div>

                {/* Vertical groove indentations */}
                <div className="absolute inset-x-0 top-3 bottom-0 flex justify-around pointer-events-none opacity-20">
                  <div className="w-1 bg-black h-full" />
                  <div className="w-1 bg-black h-full" />
                  <div className="w-1 bg-black h-full" />
                  <div className="w-1 bg-black h-full" />
                </div>

                {/* Embedded Mini sticker inside the slot */}
                <div className={`mx-3 mb-1 mt-6 rounded-t-sm bg-gradient-to-br ${insertedCartridge.coverBg} border-t-2 border-x border-zinc-800 p-2 flex flex-col items-center justify-between text-white text-center h-[90%] relative shadow-md`}>
                  
                  {/* Glowing dust sparkles for vintage magic */}
                  <div className="absolute top-1 right-2 animate-pulse text-yellow-300">
                    <Sparkles size={11} />
                  </div>

                  <span className="text-[7px] font-retro uppercase tracking-tight text-white/90 truncate w-full">
                    {insertedCartridge.category}
                  </span>
                  
                  <span className="text-[10px] sm:text-xs font-bold font-sans uppercase tracking-tight line-clamp-2 leading-none my-1 font-retro">
                    {insertedCartridge.title}
                  </span>

                  <div className="flex items-center space-x-1 opacity-70">
                    <span className="text-[7.5px] font-mono">{insertedCartridge.author}</span>
                  </div>
                </div>

                {/* Mechanical ridge shade at connection point */}
                <div className="w-full h-1 bg-zinc-950 opacity-40 absolute bottom-0" />
              </motion.div>
            )}

            {/* Glowing pin lights inside when connected and on */}
            {insertedCartridge && powerOn && (
              <div className="absolute bottom-1 inset-x-0 h-1 bg-red-500/80 blur-[2px] animate-pulse z-10" />
            )}
          </div>
          
          <span className="text-[8.5px] font-retro text-zinc-600 mt-2 tracking-wide font-bold">
            ▲ INSERTA EL CARTUCHO DE MANERA VERTICAL ▲
          </span>
        </div>

        {/* BUTTONS & LED BAR CONTROLS */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-4 border-t border-zinc-800/60 relative z-10">
          
          {/* 1. POWER SWITCH (Mechanical Slider) */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-sans font-extrabold text-zinc-400 tracking-wider mb-2">POWER</span>
            
            <button
              id="power-switch"
              onClick={handlePowerClick}
              className={`w-12 h-16 rounded-xl border border-zinc-950 p-1 flex flex-col justify-between transition-all relative ${
                powerOn 
                  ? 'bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-inner' 
                  : 'bg-gradient-to-b from-[#18191c] to-[#0f1012] shadow-inner'
              }`}
            >
              {/* Backing indicators showing retro red/green track */}
              <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-1.5 rounded-full flex flex-col justify-between overflow-hidden bg-zinc-950">
                <div className="h-1/2 bg-emerald-500 opacity-60" />
                <div className="h-1/2 bg-rose-500 opacity-30" />
              </div>

              {/* Slider thumb */}
              <motion.div
                animate={{ y: powerOn ? 0 : 25 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`w-full h-7 rounded-lg border border-black/80 flex items-center justify-center cursor-pointer relative z-10 ${
                  powerOn 
                    ? 'bg-gradient-to-b from-emerald-500 to-green-700 shadow-md text-white' 
                    : 'bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-md text-zinc-400'
                }`}
              >
                <Power size={11} className={`${powerOn ? 'animate-pulse' : ''}`} />
              </motion.div>
            </button>
            
            <span className="text-[8px] font-mono text-zinc-500 mt-1 uppercase font-semibold">
              {powerOn ? '● On' : '○ Off'}
            </span>
          </div>

          {/* 2. CENTER LED & BRAND SIGNATURE */}
          <div className="flex flex-col items-center justify-center relative">
            {/* LED cluster */}
            <div className="flex flex-col items-center mt-2">
              <div className="text-[7.5px] font-mono tracking-widest text-zinc-400 font-bold mb-1">POWER LED</div>
              
              <div className="relative">
                {/* Physical LED casing */}
                <div className="w-5 h-5 bg-zinc-950 rounded-full flex items-center justify-center shadow-inner border border-zinc-800">
                  {/* Virtual LED Core */}
                  <div
                    id="console-power-led"
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      powerOn 
                        ? insertedCartridge 
                          ? 'bg-red-500 led-glow-red animate-pulse shadow-[0_0_12px_#3b82f6,0_0_4px_#3b82f6]' // Active cart with blue neon flare glow
                          : 'bg-amber-400 led-glow-amber animate-blink shadow-[0_0_10px_#f59e0b]' // Power on but empty cartridge alert
                        : 'bg-red-950/40 opacity-80' // Off
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Retro N-Shaped University 3D Badge */}
            <div className="mt-4 flex items-center justify-center">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl n64-groove flex items-center justify-center p-1 border border-zinc-800">
                <div className="grid grid-cols-2 grid-rows-2 gap-[2px] w-full h-full rotate-45 transform p-1">
                  <div className="bg-red-500 rounded-sm" />
                  <div className="bg-blue-500 rounded-sm" />
                  <div className="bg-yellow-400 rounded-sm" />
                  <div className="bg-green-500 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. RESET & EJECT MECH CONTROLS */}
          <div className="flex flex-col justify-between items-center h-full">
            
            {/* Reset mechanics */}
            <div className="flex flex-col items-center">
              <button
                id="reset-button"
                disabled={!powerOn || !insertedCartridge}
                onClick={handleResetClick}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all text-white/90 active:scale-95 ${
                  powerOn && insertedCartridge
                    ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 border-indigo-950 hover:brightness-110 shadow-lg cursor-pointer'
                    : 'bg-gradient-to-b from-zinc-700 to-zinc-800 border-zinc-950 opacity-40 cursor-not-allowed'
                }`}
              >
                <RotateCcw size={12} />
              </button>
              <span className="text-[8px] font-sans font-bold text-zinc-500 tracking-wider mt-0.5">REINICIAR</span>
            </div>

            {/* Heavy Eject Mech bar */}
            <div className="flex flex-col items-center mt-3">
              <button
                id="eject-button"
                disabled={!insertedCartridge}
                onClick={handleEjectClick}
                className={`w-20 h-7 rounded-md border-b-4 flex items-center justify-center font-sans text-[10px] font-bold uppercase transition-all duration-100 ${
                  insertedCartridge 
                    ? 'bg-gradient-to-b from-zinc-300 to-zinc-400 hover:brightness-105 active:border-b-0 active:translate-y-[4px] text-zinc-800 border-zinc-500 shadow-md cursor-pointer' 
                    : 'bg-zinc-800 border-zinc-950 text-zinc-600 opacity-20 cursor-not-allowed'
                }`}
              >
                <ArrowUpFromLine size={10} className="mr-1" />
                QUITAR
              </button>
            </div>

          </div>
        </div>

        {/* FRONT PIECE - Multi-player Controller Deck Slots */}
        <div className="mt-8 pt-6 border-t-2 border-black/50 flex justify-center space-x-3 sm:space-x-4 relative">
          
          {/* Controller Port 1 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 p-1 shadow-inner flex items-center justify-center relative">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-900 grid grid-cols-3 p-1 text-[5px]">
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
              </div>
              {/* Blue player node light */}
              <div className={`absolute bottom-0 w-1 h-1 rounded-full ${powerOn && insertedCartridge ? 'bg-blue-400 led-glow-green shadow-sm' : 'bg-transparent'}`} />
            </div>
            <span className="text-[7.5px] font-retro text-zinc-650 mt-1 uppercase">P1</span>
          </div>

          {/* Controller Port 2 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 p-1 shadow-inner flex items-center justify-center relative">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-900 grid grid-cols-3 p-1 text-[5px]">
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
              </div>
              <div className={`absolute bottom-0 w-1 h-1 rounded-full ${powerOn && insertedCartridge ? 'bg-zinc-700' : 'bg-transparent'}`} />
            </div>
            <span className="text-[7.5px] font-retro text-zinc-650 mt-1 uppercase">P2</span>
          </div>

          {/* Controller Port 3 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 p-1 shadow-inner flex items-center justify-center relative">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-900 grid grid-cols-3 p-1 text-[5px]">
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
              </div>
            </div>
            <span className="text-[7.5px] font-retro text-zinc-650 mt-1 uppercase">P3</span>
          </div>

          {/* Controller Port 4 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 p-1 shadow-inner flex items-center justify-center relative">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-900 grid grid-cols-3 p-1 text-[5px]">
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-black mx-auto mt-0.5" />
              </div>
            </div>
            <span className="text-[7.5px] font-retro text-zinc-650 mt-1 uppercase">P4</span>
          </div>

        </div>

      </div>

      {/* Decorative Plastic Feet Base Shadows */}
      <div className="absolute -bottom-2 inset-x-8 h-4 bg-zinc-950 rounded-full filter blur-sm opacity-60 pointer-events-none -z-10" />
    </div>
  );
}
