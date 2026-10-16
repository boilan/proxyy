import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onOpenSecurityModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSecurityModal }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#0a0e16] py-10 px-6 text-slate-500 text-xs">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Shield className="w-4 h-4 text-cyan-500" />
          <span>ProxFlow UI</span>
          <span className="text-slate-600 font-normal">·</span>
          <span className="text-slate-400 font-normal">Interfaz Web de Navegación</span>
        </div>

        <div className="flex items-center gap-5 text-slate-400">
          <button
            onClick={onOpenSecurityModal}
            className="hover:text-slate-200 transition-colors"
          >
            Políticas de Seguridad y CSP
          </button>
          <span>·</span>
          <a
            href="https://ks.proxfree.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            Sitio ProxFree
          </a>
        </div>

        <div className="text-slate-500 text-center sm:text-right text-[11px] max-w-xs leading-normal">
          Esta aplicación funciona exclusivamente como interfaz gráfica de usuario. No opera servidores proxy propios.
        </div>
      </div>
    </footer>
  );
};
