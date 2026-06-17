import hero from '../../assets/hero.png';
import logo from '../../assets/PantallaCompartidaLogo.png';
import reactSvg from '../../assets/react.svg';
import viteSvg from '../../assets/vite.svg';

export default function InstagramScreen({ insertedCartridge }: { insertedCartridge: any }) {
    const posts = [hero, reactSvg, viteSvg, hero, reactSvg, viteSvg];

    return (
        <a
            href="https://www.instagram.com/pc_pantallacompartida/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver perfil de Instagram de Pantalla Compartida"
            className="block w-full"
        >
            <div className="relative w-full aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800/50">
                {/* CRT top-right status */}
                <div className="absolute top-3 right-3 font-mono text-[11px] text-green-400 uppercase tracking-wider animate-pulse">
                    • EN VIVO
                </div>

                {/* Header inside screen */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-800">
                            <img src={logo} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white">@Pantalla_Compartida</span>
                            <span className="text-[11px] text-zinc-400 font-mono">1.2k followers • 86 posts</span>
                        </div>
                    </div>

                    <button className="ml-4 px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md hover:brightness-105">Seguir</button>
                </div>

                {/* Grid of posts */}
                <div className="absolute inset-0 top-20 p-4">
                    <div className="grid grid-cols-3 gap-3 h-full">
                        {posts.map((src, idx) => (
                            <div key={idx} className="group relative bg-zinc-800 rounded-md overflow-hidden">
                                <img src={src} alt={`post-${idx}`} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                                {/* Play overlay (hidden for images but visible on hover to indicate video) */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-200">
                                    <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subtle bottom bar */}
            </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span>Instagram • Perfil simulado</span>
                    <span className="text-zinc-400">Última actualización • hace 2h</span>
                </div>
        </a>
    );
}
