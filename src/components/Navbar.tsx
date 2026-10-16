import React from 'react';
import { ExternalLink, Shield } from 'lucide-react';
import { PROXFREE_DEFAULT_URL } from '../types/proxy';

interface NavbarProps {
  onSelectUrl: (url: string) => void;
  onOpenSecurityModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectUrl, onOpenSecurityModal }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800/80 bg-[#0d121c]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Brand wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-lg font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors"
      >
        <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/20">
          <Shield className="w-4 h-4" />
        </span>
        <span>ProxFlow</span>
      </a>

      {/* Zone 2: Concise navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <a
          href="#inicio"
          className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0"
        >
          Inicio
        </a>
        <button
          onClick={() => onSelectUrl(PROXFREE_DEFAULT_URL)}
          className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 text-left"
        >
          Enlace ProxFree
        </button>
        <button
          onClick={onOpenSecurityModal}
          className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 text-left"
        >
          Seguridad y CSP
        </button>
        <a
          href="#atajos"
          className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0"
        >
          Accesos Rápidos
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href={PROXFREE_DEFAULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 rounded-lg hover:bg-cyan-900/60 hover:border-cyan-700 transition-colors whitespace-nowrap shrink-0"
          title="Abrir enlace original de ProxFree en nueva pestaña"
        >
          <span>ProxFree Directo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
