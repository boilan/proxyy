/**
 * Utility functions for URL validation and normalization
 */

export function sanitizeAndFormatUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // If it already has http:// or https://
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // If it looks like a domain with dot (e.g. example.com or sub.domain.org/path)
  if (/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  // If it's a single word or search phrase without dot, direct to DuckDuckGo search
  return `https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}`;
}

export function extractHostname(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return url;
  }
}

export function isSecureHttps(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
