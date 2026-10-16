import React from 'react';
import { Shield, Layout, ExternalLink, Zap } from 'lucide-react';

interface FeaturesSectionProps {
  onOpenSecurityModal: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenSecurityModal }) => {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-800/80">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          Arquitectura de la Interfaz
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Diseñada para proporcionar una experiencia de acceso limpia y directa respetando las normas de navegación web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-4">
            <Layout className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            01. Entorno de Ventana Limpia
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Inicia sesiones en un documento independiente <code>about:blank</code> generado en respuesta directa a tu clic, evitando bloqueos de ventanas emergentes y aislando la vista.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400 mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            02. Transparencia de Seguridad
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Detección honesta de estados de carga y políticas <code>X-Frame-Options</code> sin simular cargas falsas. Enlace directo disponible en todo momento.
          </p>
          <button
            type="button"
            onClick={onOpenSecurityModal}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
          >
            <span>Ver detalles técnicos</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            03. Control y Atajos Rápidos
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Barra superior con navegación editable, botón de recarga rápida y accesos a Wikipedia, buscadores respetuosos con la privacidad y repositorios digitales.
          </p>
        </div>
      </div>
    </section>
  );
};
