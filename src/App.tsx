import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroProxyForm } from './components/HeroProxyForm';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { EmbeddedViewer } from './components/EmbeddedViewer';
import { SecurityNoticeModal } from './components/SecurityNoticeModal';
import { PROXFREE_DEFAULT_URL } from './types/proxy';
import { openInBlankWindow } from './utils/windowLauncher';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(PROXFREE_DEFAULT_URL);
  const [viewMode, setViewMode] = useState<'home' | 'embedded'>('home');
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'warning';
    message: string;
  } | null>(null);

  const handleNavigate = (url: string, mode: 'blank' | 'embedded') => {
    setCurrentUrl(url);

    if (mode === 'blank') {
      const result = openInBlankWindow(url);
      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Se ha abierto la ventana about:blank con la interfaz del visor y el marco de navegación.',
        });
        setTimeout(() => setNotification(null), 6000);
      } else {
        // Fallback for sandboxed environments or blocked popups
        setViewMode('embedded');
        setNotification({
          type: 'warning',
          message: 'Tu navegador o entorno bloqueó la ventana emergente. Hemos activado el visor integrado automáticamente.',
        });
        setTimeout(() => setNotification(null), 7000);
      }
    } else {
      setViewMode('embedded');
    }
  };

  const handleSelectUrl = (url: string) => {
    setCurrentUrl(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Active notification toast */}
      {notification && (
        <div className="fixed top-18 right-6 z-50 max-w-md animate-in slide-in-from-top-4 fade-in duration-200">
          <div
            className={`p-3.5 rounded-xl border shadow-xl flex items-start gap-3 text-xs ${
              notification.type === 'success'
                ? 'bg-[#0f231e] border-emerald-700/60 text-emerald-200'
                : 'bg-[#291b10] border-amber-700/60 text-amber-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 leading-relaxed">{notification.message}</div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white shrink-0 ml-1 text-sm font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Mode Switching */}
      {viewMode === 'embedded' ? (
        <EmbeddedViewer
          initialUrl={currentUrl}
          onBackToHome={() => setViewMode('home')}
          onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        />
      ) : (
        <>
          <Navbar
            onSelectUrl={handleSelectUrl}
            onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
          />

          <main className="flex-1">
            <HeroProxyForm
              currentUrl={currentUrl}
              onUrlChange={setCurrentUrl}
              onNavigate={handleNavigate}
              onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
            />
            <FeaturesSection onOpenSecurityModal={() => setIsSecurityModalOpen(true)} />
          </main>

          <Footer onOpenSecurityModal={() => setIsSecurityModalOpen(true)} />
        </>
      )}

      {/* Global Security & CSP Modal */}
      <SecurityNoticeModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        targetUrl={currentUrl}
      />
    </div>
  );
}
