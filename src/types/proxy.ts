export interface ProxySession {
  url: string;
  timestamp: number;
  title?: string;
}

export const PROXFREE_DEFAULT_URL =
  'https://ks.proxfree.com/secure-link/AmJpdAABMQAxbG9jAAChZAtW4wXhR6sqlW6Z8bjJL7nhWTBuLXssoawOqQxGEf1cnjzGeUfY4QIspluGYTdnKVyv65Z6B8yycmRECOVZyJMbI_O8fEIjp-0EH7-TMw';

export interface ShortcutItem {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
}

export const QUICK_SHORTCUTS: ShortcutItem[] = [
  {
    id: 'proxfree-official',
    name: 'Enlace ProxFree Oficial',
    url: PROXFREE_DEFAULT_URL,
    icon: 'Shield',
    description: 'Enlace seguro preconfigurado de ProxFree',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    url: 'https://es.wikipedia.org',
    icon: 'BookOpen',
    description: 'Enciclopedia libre y abierta',
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com',
    icon: 'Search',
    description: 'Buscador enfocado en privacidad',
  },
  {
    id: 'archive-org',
    name: 'Internet Archive',
    url: 'https://archive.org',
    icon: 'Archive',
    description: 'Biblioteca digital de sitios web',
  },
  {
    id: 'hackernews',
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
    icon: 'Terminal',
    description: 'Noticias de tecnología y desarrollo',
  },
];
