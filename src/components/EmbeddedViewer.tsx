import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Globe,
  ExternalLink,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Maximize,
  HelpCircle,
  X
} from 'lucide-react';
import { sanitizeAndFormatUrl, extractHostname } from '../utils/urlHelper';
import { openInBlankWindow } from '../utils/windowLauncher';

interface EmbeddedViewerProps {
  initialUrl: string;
  onBackToHome: () => void;
  onOpenSecurityModal: () => void;
}

export const EmbeddedViewer: React.FC<EmbeddedViewerProps> = ({
  initialUrl,
  onBackToHome,
  onOpenSecurityModal,
}) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showCspNotice, setShowCspNotice] = useState(true);
  const [iframeKey, setIframeKey] = useState(1);

  const timerRef = useRef<number | null>(null);

  // Sync when initialUrl changes
  useEffect(() => {
    setCurrentUrl(initialUrl);
    setInputUrl(initialUrl);
    startLoading();
  }, [initialUrl]);

  // Elapsed time tracker for honest load feedback
  const startLoading = () => {
    setIsLoading(true);
    setHasLoaded(false);
    setLoadError(false);
    setElapsedTime(0);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleIframeLoad = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsLoading(false);
    setHasLoaded(true);
  };

  const handleIframeError = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsLoading(false);
    setLoadError(true);
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = sanitizeAndFormatUrl(inputUrl);
    if (!formatted) return;
    setCurrentUrl(formatted);
    setInputUrl(formatted);
    setIframeKey((k) => k + 1);
    startLoading();
  };

  const handleReload = () => {
    setIframeKey((k) => k + 1);
    startLoading();
  };

  const handleOpenInBlank = () => {
    openInBlankWindow(currentUrl);
  };

  const hostname = extractHostname(currentUrl);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0b0f17] text-slate-100">
      {/* Top Bar (Requirement 6) */}
      <header className="h-14 bg-[#111827] border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-md">
        {/* Left: Back & Reload buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
            title="Volver a la página inicial"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver</span>
          </button>

          <button
            onClick={handleReload}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Recargar marco actual"
          >
            <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>

        {/* Center: Editable URL input */}
        <form onSubmit={handleNavigate} className="flex-1 flex items-center gap-2 max-w-2xl min-w-0">
          <div className="relative flex-1 flex items-center min-w-0">
            <Globe className="w-3.5 h-3.5 absolute left-3 text-slate-400 shrink-0 pointer-events-none" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://ejemplo.com"
              className="w-full h-9 bg-[#0b0f17] border border-slate-700 rounded-lg pl-9 pr-3 text-xs sm:text-sm font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="h-9 px-3 sm:px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-medium transition-colors shrink-0"
          >
            Ir
          </button>
        </form>

        {/* Right: Load Status & External Navigation */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-slate-900 border border-slate-800">
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span className="text-slate-400">Cargando ({elapsedTime}s)</span>
              </>
            ) : loadError ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-rose-300">Error de carga</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300">Marco respondido</span>
              </>
            )}
          </div>

          {/* Open in about:blank button */}
          <button
            onClick={handleOpenInBlank}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            title="Abrir en ventana limpia about:blank"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">about:blank</span>
          </button>

          {/* Open directly in normal tab */}
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm shadow-emerald-900/30 whitespace-nowrap"
            title="Abrir sitio directamente en pestaña normal para evitar bloqueos de iframe"
          >
            <span>Abrir en pestaña normal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Security & CSP diagnostic notice bar (Requirement 9 & 10) */}
      {showCspNotice && (
        <div className="bg-[#101b2b] border-b border-cyan-900/40 px-4 py-2 flex items-center justify-between gap-3 text-xs text-cyan-200">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
            <p className="truncate">
              <strong className="text-white">Aviso de seguridad del navegador:</strong> Si el sitio{' '}
              <span className="font-mono text-cyan-300">{hostname}</span> rechaza la conexión o muestra pantalla gris, es debido a políticas de servidor (<code>X-Frame-Options</code> o <code>CSP</code>).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSecurityModal}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Ver explicación</span>
            </button>
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 rounded bg-cyan-900/80 hover:bg-cyan-800 text-white font-medium"
            >
              Abrir directo
            </a>
            <button
              onClick={() => setShowCspNotice(false)}
              className="p-1 hover:text-white text-cyan-400 transition-colors"
              title="Cerrar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Full-space Iframe Container (Requirement 4 & 5) */}
      <main className="flex-1 relative w-full h-full bg-[#0a0e17] overflow-hidden">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#0b0f17]/80 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300">
            <div className="bg-[#121927] border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col items-center max-w-sm text-center">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
              <div className="text-sm font-medium text-slate-200 mb-1">
                Conectando con el servidor...
              </div>
              <div className="text-xs text-slate-500 font-mono mb-3 truncate max-w-[260px]">
                {currentUrl}
              </div>
              <div className="text-[11px] text-slate-400">
                Tiempo transcurrido: <span className="text-cyan-400 font-mono">{elapsedTime}s</span>
              </div>
            </div>
          </div>
        )}

        {/* Actual Iframe */}
        <iframe
          key={iframeKey}
          src={currentUrl}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          className="w-full h-full border-0 bg-white"
          title="Visor de navegación web"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </main>
    </div>
  );
};
