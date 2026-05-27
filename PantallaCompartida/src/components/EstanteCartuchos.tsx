import { motion } from 'motion/react';
import { 
  Play, Maximize2, Mic, Film, Compass, Rocket, Music, CheckCircle
} from 'lucide-react';
import type { Cartridge } from '../types';

interface CartridgesShelfProps {
  cartridges: Cartridge[];
  activeCartridgeId: string | null;
  onSelectCartridge: (cart: Cartridge) => void;
}

export default function CartridgesShelf({
  cartridges,
  activeCartridgeId,
  onSelectCartridge,
}: CartridgesShelfProps) {

  // Map icon strings to Lucide components
  const getIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'mic': return <Mic className={className} />;
      case 'video': return <Film className={className} />;
      case 'compass': return <Compass className={className} />;
      case 'rocket': return <Rocket className={className} />;
      case 'music': return <Music className={className} />;
      default: return <Compass className={className} />;
    }
  };

  return (
    <div id="cartridges-shelf-root" className="w-full mt-8">
      {/* Decorative shelf header */}
      <div className="flex justify-between items-end mb-4 border-b-2 border-zinc-800 pb-1 ml-1">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <h3 className="font-retro text-[10px] tracking-tight text-zinc-300 uppercase">
            Estante de Proyectos Académicos (Cartuchos)
          </h3>
        </div>
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          Sinfonías / Podcasts / Videos
        </span>
      </div>

      {/* Grid of cartridge bays with a simulated wooden shelf background layout */}
      <div className="bg-[#241e15] p-4 rounded-2xl border-4 border-[#332617] shadow-xl relative overflow-hidden plastic-texture">
        
        {/* Subtle wood-grain gradient lines on back wall of the rack */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b150c] via-[#2d251a] to-[#120d06] pointer-events-none" />
        
        {/* Grid elements */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          
          {cartridges.map((cart) => {
            const isInserted = activeCartridgeId === cart.id;

            return (
              <div key={cart.id} className="relative group">
                {isInserted ? (
                  /* EMPTY SHELF SLOT (Shows as a dark outline space when cart is in use!) */
                  <div className="w-full aspect-[4/5] bg-black/60 rounded-xl border-2 border-dashed border-zinc-700/45 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 shadow-inner">
                    <CheckCircle className="text-emerald-500/30 animate-pulse mb-2" size={18} />
                    <span className="text-[7.5px] font-retro text-zinc-650 uppercase">
                      EN CONSOLA
                    </span>
                    <span className="text-[6.5px] font-mono text-zinc-700 mt-1 block">
                      Slot Activo
                    </span>
                  </div>
                ) : (
                  /* PHYSICAL PLAYABLE CARTRIDGE CARD */
                  <motion.div
                    whileHover={{ 
                      y: -12, 
                      scale: 1.03,
                      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.6), 0 10px 10px -5px rgba(0,0,0,0.6)'
                    }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onSelectCartridge(cart)}
                    className="w-full aspect-[4/5] bg-[#c4c9cc] rounded-xl border border-zinc-300 shadow-lg p-1.5 flex flex-col justify-between relative cursor-pointer group transition-shadow plastic-texture select-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    {/* Retro angled plastic corner bevel lines */}
                    <div className="absolute top-1 right-2 left-2 flex justify-between opacity-50">
                      <div className="w-4 h-1.5 bg-zinc-400 rounded-sm" />
                      <div className="w-4 h-1.5 bg-zinc-400 rounded-sm" />
                    </div>

                    {/* Left and Right vertical ribs simulating physical grip handles */}
                    <div className="absolute top-4 bottom-14 left-1 w-1 bg-zinc-400 rounded-r opacity-60" />
                    <div className="absolute top-4 bottom-14 right-1 w-1 bg-zinc-400 rounded-l opacity-60" />

                    {/* Rich glossy high-contrast sticker label on front */}
                    <div className={`flex-grow rounded-lg bg-gradient-to-br ${cart.coverBg} p-2 border-t border-x border-zinc-900 flex flex-col justify-between text-white relative shadow-md overflow-hidden h-[75%]`}>
                      
                      {/* Decorative shiny glow filter on cartridge stickers */}
                      <div className="absolute -inset-1/2 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform rotate-45 pointer-events-none group-hover:animate-pulse" />

                      {/* Top Header: Tag name */}
                      <div className="flex justify-between items-start">
                        <span className="text-[6.5px] font-retro uppercase tracking-tighter opacity-80 max-w-[70%] truncate">
                          {cart.category}
                        </span>
                        <div className="p-0.5 rounded bg-black/40 text-yellow-300">
                          {getIcon(cart.iconName, "w-2.5 h-2.5")}
                        </div>
                      </div>

                      {/* Core Title (styled with high quality retro typography) */}
                      <div className="my-auto pt-1">
                        <h4 className="text-[10px] sm:text-[11px] font-retro uppercase font-extrabold tracking-tight leading-snug line-clamp-3 text-shadow">
                          {cart.title}
                        </h4>
                      </div>

                      {/* Sticker stamp feet */}
                      <div className="flex justify-between items-center text-[6px] font-mono border-t border-white/20 pt-1 mt-1 opacity-70">
                        <span>{cart.author.split(' y ')[0].substring(0, 15)}..</span>
                        <span>{cart.year}</span>
                      </div>
                    </div>

                    {/* Bottom Plastic Bevel Notch and Logo stamp */}
                    <div className="h-6 mt-1 flex justify-between items-end px-1 select-none">
                      <div className="text-[6.5px] font-retro text-zinc-500 font-bold">
                        NUS 64
                      </div>
                      
                      {/* Physical grip teeth details on back cartridge rim */}
                      <div className="flex space-x-[2px] mb-1">
                        <div className="w-[3px] h-3 bg-zinc-400/80 rounded-sm" />
                        <div className="w-[3px] h-3 bg-zinc-400/80 rounded-sm" />
                        <div className="w-[3px] h-3 bg-zinc-400/80 rounded-sm" />
                        <div className="w-[3px] h-3 bg-zinc-400/80 rounded-sm" />
                      </div>
                    </div>

                    {/* Interactive hover instruction overlay bubble */}
                    <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent rounded-xl transition-all duration-200" />
                  </motion.div>
                )}
              </div>
            );
          })}

        </div>

        {/* Shelf bottom wooden board lip (gives 3D desk aesthetic) */}
        <div className="h-2 bg-[#1b150c] rounded-b-lg border-t border-[#46321c] mt-4 -mx-4 -mb-4 shadow-2xl relative">
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/45" />
        </div>
      </div>
    </div>
  );
}
