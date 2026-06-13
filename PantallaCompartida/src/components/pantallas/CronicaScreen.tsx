import type { Cartridge } from '../../types';

interface CronicaScreenProps {
  insertedCartridge: Cartridge;
  isFullscreen: boolean;
}

export default function CronicaScreen({ insertedCartridge, isFullscreen }: CronicaScreenProps) {
  return (
    <div id="screen-podcast-deck" className="w-full h-full bg-[#121319] text-white p-3 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      {/* Soft Ambient glowing colors based on cover (kept to preserve TV look) */}
      <div className={`absolute -top-12 -left-12 w-32 h-32 bg-${insertedCartridge.accentColor}-600/10 rounded-full filter blur-2xl`} />

      {/* ENCABEZADO DE LA PANTALLA */}
      <div className="z-10">
        <div className="flex items-start">
          <h3 className="text-[11px] font-mono text-cyan-300/90 font-semibold">
            Battle Arena - Creando comunidad entre partidas y pantallas
          </h3>
        </div>
        <div className="mt-2 border-b border-white/6" />
      </div>

      {/* TEXTO DEL LEAD (CUERPO) */}
      <div className={`z-10 flex-grow overflow-auto p-4 ${isFullscreen ? 'flex flex-col justify-center' : ''}`}>
        <p className={`font-mono leading-relaxed text-cyan-300/85 tracking-wide ${isFullscreen ? 'text-center text-lg sm:text-xl md:text-2xl' : 'text-[12px] sm:text-[13px] md:text-[14px] lg:text-base text-left text-justify'}`} style={{ textShadow: '0 1px 6px rgba(0,255,200,0.03)' }}>
          Battle Arena en Popayán transforma el ocio en tejido social. Augusto y Cristina, sus directores, han convertido un Hobby Center en un refugio de comunidad donde, emulando la cooperación de 'It Takes Two', los gamers locales tejen vínculos, comparten aprendizajes y disfrutan del juego cooperativo en un entorno seguro y sano. Más que partidas, se consolida la identidad gamer del Cauca.
        </p>
      </div>

      {/* BOTÓN DE ACCIÓN (CTA) EN LA PARTE INFERIOR */}
      <div className="z-10 mt-2">
        <div className="flex justify-center">
          <a
            href="https://proclamadelpacifico.com/battle-arena-creando-comunidad-entre-partidas-y-pantallas/?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 font-mono text-[11px] text-${insertedCartridge.accentColor}-200 bg-black/30 px-3 py-1 rounded border border-${insertedCartridge.accentColor}-500/20 hover:bg-${insertedCartridge.accentColor}-900/10`}
          >
            <span>[VER CRÓNICA COMPLETA EN PROCLAMA]</span>
            <span className="text-sm">↗</span>
          </a>
        </div>
      </div>

    </div>
  );
}
