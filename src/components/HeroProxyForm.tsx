import React, { useState } from 'react';
import {
  Globe,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  BookOpen,
  Search,
  Archive,
  Terminal,
  AlertTriangle,
  Info,
  Maximize2
} from 'lucide-react';
import { PROXFREE_DEFAULT_URL, QUICK_SHORTCUTS, ShortcutItem } from '../types/proxy';
import { sanitizeAndFormatUrl } from '../utils/urlHelper';

interface HeroProxyFormProps {
  currentUrl: string;
  onUrlChange: (url: string) => void;
  onNavigate: (url: string, mode: 'blank' | 'embedded') => void;
  onOpenSecurityModal: () => void;
}

export const HeroProxyForm: React.FC<HeroProxyFormProps> = ({
  currentUrl,
  onUrlChange,
  onNavigate,
  onOpenSecurityModal,
}) => {
  const [targetUrl, setTargetUrl] = useState(currentUrl || PROXFREE_DEFAULT_URL);
  const [navMode, setNavMode] = useState<'blank' | 'embedded'>('blank');
  const [inputError, setInputError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = sanitizeAndFormatUrl(targetUrl);
    if (!formatted) {
      setInputError('Por favor introduce una dirección URL válida');
      return;
    }
    setInputError(null);
    onUrlChange(formatted);
    onNavigate(formatted, navMode);
  };

  const handleShortcutClick = (shortcut: ShortcutItem) => {
    setTargetUrl(shortcut.url);
    onUrlChange(shortcut.url);
    onNavigate(shortcut.url, navMode);
  };

  const handleResetToProxFree = () => {
    setTargetUrl(PROXFREE_DEFAULT_URL);
    onUrlChange(PROXFREE_DEFAULT_URL);
    setInputError(null);
  };

  const renderShortcutIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <ShieldCheck className="w-4 h-4 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case 'Search':
        return <Search className="w-4 h-4 text-emerald-400" />;
      case 'Archive':
        return <Archive className="w-4 h-4 text-purple-400" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-rose-400" />;
      default:
        return <Globe className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="inicio" className="relative pt-12 pb-20 px-6 max-w-5xl mx-auto">
      {/* Background glow subtlety */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
          Navegación Web con ProxFree
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Interfaz moderna y oscura para interactuar con el servicio de ProxFree. Introduce cualquier dirección web o utiliza el enlace seguro predeterminado.
        </p>
      </div>

      {/* Main Search & Navigation Card */}
      <div className="bg-[#101726] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => {
                  setTargetUrl(e.target.value);
                  if (inputError) setInputError(null);
                }}
                placeholder="https://ejemplo.com o introduce una dirección"
                className="w-full h-12 bg-[#0b0f17] border border-slate-700/80 rounded-xl pl-11 pr-24 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
              {targetUrl !== PROXFREE_DEFAULT_URL && (
                <button
                  type="button"
                  onClick={handleResetToProxFree}
                  className="absolute right-3 text-xs text-slate-400 hover:text-cyan-400 px-2 py-1 rounded bg-slate-800/80 transition-colors flex items-center gap-1"
                  title="Restablecer al enlace seguro de ProxFree"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">ProxFree</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              className="h-12 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] whitespace-nowrap shrink-0"
            >
              <span>Navegar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {inputError && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{inputError}</span>
            </p>
          )}

          {/* Mode Selector & Status Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Modo de visualización:</span>
              <div className="inline-flex p-0.5 bg-[#0b0f17] border border-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setNavMode('blank')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    navMode === 'blank'
                      ? 'bg-cyan-950 text-cyan-300 font-medium border border-cyan-800/60'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Abre una ventana emergente limpia en about:blank con barra superior de navegación e iframe"
                >
                  Ventana limpia (about:blank)
                </button>
                <button
                  type="button"
                  onClick={() => setNavMode('embedded')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    navMode === 'embedded'
                      ? 'bg-cyan-950 text-cyan-300 font-medium border border-cyan-800/60'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Muestra el visor con barra superior directamente en esta pestaña"
                >
                  Visor integrado
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenSecurityModal}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Restricciones de seguridad y CSP</span>
            </button>
          </div>
        </form>
      </div>

      {/* Target service details indicator */}
      <div className="mb-10 bg-[#0d131f] border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-slate-200">Servicio de enlace ProxFree activo</div>
            <div className="text-slate-500 truncate max-w-xs sm:max-w-md font-mono text-[11px]">
              ks.proxfree.com/secure-link/...
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setTargetUrl(PROXFREE_DEFAULT_URL);
              onNavigate(PROXFREE_DEFAULT_URL, 'embedded');
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Probar en visor integrado</span>
          </button>
          <a
            href={PROXFREE_DEFAULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <span>Abrir en pestaña normal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Quick Access Shortcuts (Inspired by CroxyProxy) */}
      <div id="atajos" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Accesos directos sugeridos
          </h2>
          <span className="text-xs text-slate-500">Un clic para navegar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_SHORTCUTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleShortcutClick(item)}
              className="flex items-start gap-3 p-3.5 bg-[#0e1422] hover:bg-[#131b2e] border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#161f36] flex items-center justify-center shrink-0 border border-slate-700/50 group-hover:border-cyan-500/40 transition-colors">
                {renderShortcutIcon(item.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span className="truncate">{item.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
