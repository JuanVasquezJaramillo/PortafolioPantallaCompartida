export default function Footer() {
    return (
        <footer className="max-w-6xl w-full mx-auto border-t border-zinc-850/60 mt-10 pt-4 pb-2 flex flex-col sm:flex-row justify-between items-center text-zinc-600 text-[10px] font-mono z-10 space-y-2.5 sm:space-y-0">
            <div className="flex items-center space-x-1.5">
                <span>CREADO PARA LA UNIVERSIDAD DEL CAUCA 2026-I</span>
            </div>
            <div className="flex list space-x-1.5">
                <ul>
                    <li>AUTORES:</li>
                    <li>DESARROLLADOR WEB Juan Pablo Vásquez Jaramillo</li>
                    <li>Michin Ordoñez</li>
                    <li>Laura, ¿me rascas?</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4">
                <span>SISTEMA EMULADO 64 (STDL-VOLT)</span>
                <span className="text-[#3dfa3d]">● ONLINE</span>
            </div>
        </footer>
    );
}