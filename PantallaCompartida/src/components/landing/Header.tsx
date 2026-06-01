import type { Cartridge } from '../../types';

interface HeaderProps {
    powerOn: boolean;
    selectedCartridge: Cartridge | null;
}
export default function Header({ powerOn, selectedCartridge }: HeaderProps) {
    return (
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
                            ? `REPRODUCIENDO: ${selectedCartridge.title.substring(0, 15)}..`
                            : 'CONSOLA ENCENDIDA - SIN CARTUCHO'
                        : 'CONSOLA APAGADA - INSERTE CARTUCHO'}
                </span>
            </div>
        </header>
    );
}