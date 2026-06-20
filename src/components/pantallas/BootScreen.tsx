import { motion } from 'motion/react';

export default function BootScreen() {
  return (
    <div id="tv-screen-boot" className="w-full h-full bg-gradient-to-b from-[#01010c] to-[#04081c] relative flex flex-col items-center justify-center overflow-hidden font-retro text-white">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,100,240,0.1),rgba(0,0,0,0.3))] pointer-events-none" />
      
      {/* Galactic particles field */}
      <div className="absolute inset-0 flex flex-wrap justify-around items-center opacity-30">
        <div className="w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="w-0.5 h-0.5 bg-sky-200 rounded-full" />
        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" />
        <div className="w-0.5 h-0.5 bg-white rounded-full" />
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
        UNIVERSIDAD DEL CAUCA
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.1 }}
        className="text-[7.5px] font-mono uppercase text-sky-400 tracking-wider mt-1.5"
      >
        Licenciado por Pantalla Compartida - UNICAUCA 2026
      </motion.p>

      <div className="absolute bottom-3 text-[6.5px] font-mono text-zinc-500">
        © 2026 RE-PLAY SYSTEM. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}
