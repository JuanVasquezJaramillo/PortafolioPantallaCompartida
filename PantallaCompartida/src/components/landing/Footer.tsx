import { MessageCircle, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="max-w-6xl w-full mx-auto border-t border-zinc-850/60 mt-12 pt-6 pb-6 flex flex-col space-y-4 font-mono z-10">

            {/* Touch Targets & Micro-actions Panel */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/40 gap-4">

                {/* Contact/WhatsApp Section */}
                <div className="flex flex-col items-center md:items-start space-y-1.5">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest">¿Preguntas?</span>
                    <a
                        href="https://wa.me/573005660574?text=Hola!%20Me%20interesa%20conocer%20más%20sobre%20PantallaCompartida!%20¿Podrías%20darme%20más%20información?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg text-[11px] font-bold tracking-tight hover:border-emerald-500/40 transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
                    >
                        <MessageCircle size={14} className="animate-pulse" />
                        <span>CONTACTAR EN WHATSAPP</span>
                    </a>
                </div>

                {/* Social Media Horizontal List */}
                <div className="flex flex-col items-center md:items-end space-y-1.5">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest">¡Síguenos en nuestras redes sociales!</span>
                    <div className="flex flex-wrap items-center justify-center gap-2">

                        {/* TikTok */}
                        <a
                            href="https://www.tiktok.com/@dacashadow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-lg text-[10px] font-bold text-zinc-300 flex items-center space-x-1.5 tracking-tight transition-all duration-150 active:scale-95 cursor-pointer"
                        >
                            <span className="font-black text-[9px]">
                                <span className="text-[#25f4ee]">T</span>
                                <span className="text-[#fe0979]">T</span>
                            </span>
                            <span>TIK TOK</span>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/pc_pantallacompartida/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-lg text-[10px] font-bold text-zinc-300 flex items-center space-x-1.5 tracking-tight transition-all duration-150 active:scale-95 cursor-pointer"
                        >
                            <Instagram size={12} className="text-pink-400" />
                            <span>INSTAGRAM</span>
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@pantallacompartida-w3l"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-lg text-[10px] font-bold text-zinc-300 flex items-center space-x-1.5 tracking-tight transition-all duration-150 active:scale-95 cursor-pointer"
                        >
                            {/**CAMBIAR EL ICONO DE YOUTUBE */}
                            <Youtube size={12} className="text-[#FF0000]" />
                            <span>YOUTUBE</span>
                        </a>

                    </div>
                </div>

            </div>

            {/* Classic university status banner info */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-zinc-600 text-[10px] space-y-2 sm:space-y-0 pt-2">
                <div className="flex items-center space-x-1.5">
                    <span>CREADO PARA LA UNIVERSIDAD DEL CAUCA 2026-I</span>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="w-full max-w-2xl rounded-3xl  py-5 text-center">
                        <div className="mb-3">
                            <span className="text-[9px] uppercase tracking-[0.45em] text-zinc-500">AUTORES:</span>
                        </div>
                        <div className="grid gap-3 text-[10px] font-mono text-zinc-300 leading-tight">
                            <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-6 text-zinc-600">
                                <div className="space-y-1">
                                    <p>[CRÓNICA] Evelyn Catalina Villota Zutta.</p>
                                    <p>[PODCAST] Laura Daniela Gasca Trujillo.</p>
                                    <p>[PODCAST] Luis Ángel Alegría Garzón.</p>
                                    <p>[DOCUMENTAL] Camilo Medina Linares.</p>
                                </div>
                                <div className="space-y-1">
                                    <p>[DOCUMENTAL] Juan Camilo Sandoval.</p>
                                    <p>[REDES] Juliana Muñoz Cuchimba.</p>
                                    <p>[REDES] David Alejandro Ordóñez Sánchez.</p>
                                </div>
                            </div>
                            <div className="border-t pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600">
                                <span>[DEV] Juan Pablo Vásquez Jaramillo.</span>
                                <span>[DEV] Jorge Eduardo Rivera López.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span>SISTEMA EMULADO 64 (STDL-VOLT)</span>
                    <span className="text-[#3dfa3d]">● ONLINE</span>
                </div>
            </div>

        </footer>
    );
}
