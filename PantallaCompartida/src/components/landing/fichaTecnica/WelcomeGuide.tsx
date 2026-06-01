import { Sparkles } from 'lucide-react';

interface WelcomeGuideProps {
    onDismiss: () => void;
}

export default function WelcomeGuide({ onDismiss }: WelcomeGuideProps) {
    return (
        <div id="welcome-modal" className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 rounded-2xl border border-amber-500/20 shadow-xl relative overflow-hidden flex-grow">
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
                onClick={onDismiss}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 active:scale-98 rounded-xl text-zinc-950 font-bold text-xs tracking-tight shadow-md cursor-pointer transition-all"
            >
                ENTENDIDO, INICIAR SIMULACIÓN
            </button>
        </div>
    );
}
