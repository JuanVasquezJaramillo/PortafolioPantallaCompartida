import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, BookOpen } from 'lucide-react';
import type { Cartridge } from '../../../types';

interface AcademicSheetProps {
  selectedCartridge: Cartridge | null;
  powerOn: boolean;
}

export default function AcademicSheet({ selectedCartridge, powerOn }: AcademicSheetProps) {
  return (
    <div id="project-academic-sheet" className="bg-gradient-to-br from-zinc-900/90 to-[#14151a] p-5 rounded-2xl border border-zinc-800 shadow-xl relative flex-grow">
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
  );
}
