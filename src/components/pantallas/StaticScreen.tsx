import { Radio } from 'lucide-react';

export default function StaticScreen() {
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
        Pantalla Compartida portafolio multimedia - UNICAUCA 2026
      </div>
    </div>
  );
}
