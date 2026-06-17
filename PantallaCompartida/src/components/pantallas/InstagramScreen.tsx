import post1 from '../../assets/imagenesPantallaCompartida/post1.png';
import post2 from '../../assets/imagenesPantallaCompartida/post7.png';
import post3 from '../../assets/imagenesPantallaCompartida/post2.png';
import post4 from '../../assets/imagenesPantallaCompartida/post10.png';
import post5 from '../../assets/imagenesPantallaCompartida/post3.png';
import post6 from '../../assets/imagenesPantallaCompartida/post4.png';
import logo from '../../assets/PantallaCompartidaLogo.png';

export default function InstagramScreen({}: { insertedCartridge: any }) {
    const posts = [post1, post2, post3, post4, post5, post6];

    return (
        <a
            href="https://www.instagram.com/pc_pantallacompartida/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver perfil de Instagram de Pantalla Compartida"
            className="block w-full h-full"
        >
            {/* 1. Cambiamos flex flex-col para controlar el espacio vertical de manera exacta */}
            <div className="relative h-full w-full flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800/50 p-4">
                
                {/* CRT top-right status */}
                <div className="absolute top-1 right-3 font-mono text-[11px] text-green-400 uppercase tracking-wider animate-pulse z-10">
                    • EN VIVO
                </div>

                {/* Header inside screen - 2. Quitamos posicionamiento absoluto */}
                <div className="flex items-center justify-between mb-4">
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

                {/* Grid of posts - 3. Usamos flex-1 para que ocupe TODO el espacio restante disponible */}
                <div className="flex-1 min-h-0 mb-6 w-full max-w-5xl mx-auto">
                    {/* 4. Cambiamos grid-rows-2 para asegurar que las filas se estiren equitativamente */}
                    <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full content-center">
                        {posts.map((src, idx) => (
                            <div key={idx} className="group relative bg-zinc-800 rounded-md overflow-hidden">
                                <img src={src} alt={`post-${idx}`} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                                {/* Play overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-200">
                                    <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subtle bottom bar - 5. Corregido el cierre para que quede DENTRO de la pantalla */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span>Instagram • Perfil simulado</span>
                    <span className="text-zinc-400">Última actualización • hace 2h</span>
                </div>
            </div>
        </a>
    );
}