/**
 * Window Launcher utility to open an 'about:blank' window directly via user gesture
 * and inject a complete, self-contained viewer with top navigation bar and full-screen iframe.
 */

export interface OpenWindowResult {
  success: boolean;
  blocked?: boolean;
}

export function openInBlankWindow(targetUrl: string, homeUrl: string = window.location.href): OpenWindowResult {
  let newWin: Window | null = null;
  try {
    // Direct user action invocation to prevent popup blockers
    newWin = window.open('about:blank', '_blank');
  } catch (err) {
    console.error('Failed to open window:', err);
    return { success: false, blocked: true };
  }

  if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
    return { success: false, blocked: true };
  }

  try {
    const doc = newWin.document;
    doc.open();
    doc.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visor Web - ProxFlow</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #0b0f17;
      color: #e2e8f0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    /* Top Bar */
    .topbar {
      height: 54px;
      background: #111827;
      border-bottom: 1px solid #1f2937;
      display: flex;
      align-items: center;
      padding: 0 12px;
      gap: 10px;
      z-index: 100;
      flex-shrink: 0;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      font-size: 13px;
      font-weight: 500;
      color: #f3f4f6;
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      transition: background 0.15s, border-color 0.15s;
    }
    .btn:hover {
      background: #374151;
      border-color: #4b5563;
    }
    .btn-primary {
      background: #0284c7;
      border-color: #0369a1;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #0369a1;
    }
    .btn-external {
      background: #059669;
      border-color: #047857;
      color: #ffffff;
    }
    .btn-external:hover {
      background: #047857;
    }
    .url-form {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .url-input-wrap {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
    }
    .url-input {
      width: 100%;
      height: 36px;
      background: #0b0f17;
      border: 1px solid #374151;
      border-radius: 6px;
      padding: 0 12px 0 34px;
      color: #f9fafb;
      font-size: 13px;
      font-family: monospace, sans-serif;
      outline: none;
      transition: border-color 0.15s;
    }
    .url-input:focus {
      border-color: #0ea5e9;
    }
    .url-icon {
      position: absolute;
      left: 10px;
      width: 15px;
      height: 15px;
      fill: none;
      stroke: #9ca3af;
      stroke-width: 2;
    }
    /* Status Badge */
    .status-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #94a3b8;
      padding: 0 8px;
      white-space: nowrap;
    }
    .spinner {
      width: 12px;
      height: 12px;
      border: 2px solid #38bdf8;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .dot-loaded {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
    }
    /* Notice bar for CSP / X-Frame-Options */
    .csp-alert {
      background: #182234;
      border-bottom: 1px solid #1e3a5f;
      color: #93c5fd;
      padding: 8px 16px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-shrink: 0;
    }
    .csp-alert strong {
      color: #e0f2fe;
    }
    .csp-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 14px;
      padding: 2px 6px;
    }
    .csp-close:hover {
      color: #f8fafc;
    }
    /* Iframe */
    .iframe-container {
      flex: 1;
      width: 100%;
      position: relative;
      background: #0f172a;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <!-- Top Bar -->
  <header class="topbar">
    <button id="btnBackHome" class="btn" title="Volver a la interfaz principal">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
      <span>Volver</span>
    </button>

    <button id="btnReload" class="btn" title="Recargar página">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
    </button>

    <form id="urlForm" class="url-form">
      <div class="url-input-wrap">
        <svg class="url-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <input id="urlInput" type="text" class="url-input" value="${targetUrl.replace(/"/g, '&quot;')}" placeholder="https://ejemplo.com">
      </div>
      <button type="submit" class="btn btn-primary">Ir</button>
    </form>

    <div class="status-wrap">
      <span id="statusIndicator" class="spinner"></span>
      <span id="statusText">Cargando...</span>
    </div>

    <a id="btnExternal" href="${targetUrl.replace(/"/g, '&quot;')}" target="_blank" rel="noopener noreferrer" class="btn btn-external" title="Abrir enlace directamente sin iframe">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      <span>Abrir pestaña</span>
    </a>
  </header>

  <!-- Security Notice Banner -->
  <div id="cspAlert" class="csp-alert">
    <div>
      <strong>Nota sobre seguridad web:</strong> Si el sitio no carga o muestra pantalla en blanco, es debido a políticas del servidor externo (<code>X-Frame-Options</code> o <code>CSP</code>) que impiden su incrustación en marcos. Pulsa <strong>«Abrir pestaña»</strong> para navegar normalmente.
    </div>
    <button id="closeAlert" class="csp-close" title="Ocultar aviso">&times;</button>
  </div>

  <!-- Full-size Iframe -->
  <main class="iframe-container">
    <iframe id="proxyFrame" src="${targetUrl.replace(/"/g, '&quot;')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </main>

  <script>
    (function() {
      var iframe = document.getElementById('proxyFrame');
      var statusIndicator = document.getElementById('statusIndicator');
      var statusText = document.getElementById('statusText');
      var urlInput = document.getElementById('urlInput');
      var urlForm = document.getElementById('urlForm');
      var btnReload = document.getElementById('btnReload');
      var btnBackHome = document.getElementById('btnBackHome');
      var btnExternal = document.getElementById('btnExternal');
      var cspAlert = document.getElementById('cspAlert');
      var closeAlert = document.getElementById('closeAlert');
      var homeUrl = ${JSON.stringify(homeUrl)};

      function setStatus(loading, text) {
        if (loading) {
          statusIndicator.className = 'spinner';
          statusText.textContent = text || 'Cargando marco...';
        } else {
          statusIndicator.className = 'dot-loaded';
          statusText.textContent = text || 'Carga recibida';
        }
      }

      function navigateTo(url) {
        var cleanUrl = url.trim();
        if (!cleanUrl) return;
        if (!/^https?:\\/\\//i.test(cleanUrl)) {
          cleanUrl = 'https://' + cleanUrl;
        }
        urlInput.value = cleanUrl;
        btnExternal.href = cleanUrl;
        setStatus(true, 'Conectando...');
        iframe.src = cleanUrl;
      }

      iframe.addEventListener('load', function() {
        // Iframe fired load event
        setStatus(false, 'Marco completado');
      });

      iframe.addEventListener('error', function() {
        setStatus(false, 'Error de conexión');
      });

      urlForm.addEventListener('submit', function(e) {
        e.preventDefault();
        navigateTo(urlInput.value);
      });

      btnReload.addEventListener('click', function() {
        setStatus(true, 'Recargando...');
        iframe.src = iframe.src;
      });

      btnBackHome.addEventListener('click', function() {
        if (window.opener && !window.opener.closed) {
          window.opener.focus();
        } else {
          window.location.href = homeUrl;
        }
      });

      closeAlert.addEventListener('click', function() {
        cspAlert.style.display = 'none';
      });

      // Initial state
      setStatus(true, 'Cargando...');
    })();
  </script>
</body>
</html>`);
    doc.close();
    return { success: true };
  } catch (writeErr) {
    console.error('Error writing to about:blank window:', writeErr);
    return { success: false, blocked: true };
  }
}
