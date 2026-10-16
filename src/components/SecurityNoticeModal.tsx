import React from 'react';
import { X, ShieldAlert, CheckCircle, ExternalLink, Lock, AlertOctagon } from 'lucide-react';

interface SecurityNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
}

export const SecurityNoticeModal: React.FC<SecurityNoticeModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#111827] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Seguridad Web, Cabeceras HTTP y Marcos (iFrames)
            </h3>
            <p className="text-xs text-slate-400">
              Estándares de seguridad del navegador (RFC 7034 / W3C CSP)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-cyan-300 text-xs uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>¿Por qué algunos sitios no cargan dentro de un marco?</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Los sitios web modernos y servicios de proxy utilizan cabeceras de respuesta HTTP para proteger a los usuarios de ataques de <em>Clickjacking</em> (secuestro de clics). Si el servidor envía cualquiera de estas directivas, el navegador bloquea la renderización dentro de un <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">&lt;iframe&gt;</code>:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-400 list-disc list-inside">
              <li>
                <strong className="text-slate-200">X-Frame-Options: DENY</strong> o{' '}
                <strong className="text-slate-200">SAMEORIGIN</strong>: Prohíbe que cualquier página externa incruste su contenido.
              </li>
              <li>
                <strong className="text-slate-200">Content-Security-Policy (frame-ancestors)</strong>: Especifica qué dominios tienen permiso para anidar la página.
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 text-xs uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Transparencia y Políticas de Navegación</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Esta interfaz respeta plenamente las normas de seguridad de los navegadores y de los sitios web externos. No intentamos saltarnos las políticas de seguridad ni simulamos cargas falsas. Si un sitio bloquea la incrustación, te facilitamos abrirlo directamente en una pestaña estándar limpia sin restricciones.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-cyan-300 font-medium">URL objetivo actual</div>
              <div className="text-[11px] text-slate-400 font-mono truncate">{targetUrl}</div>
            </div>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <span>Abrir en pestaña normal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
