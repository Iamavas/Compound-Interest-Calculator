import { useState, useEffect } from 'react';

const STORAGE_KEY = 'alto-theme';

/**
 * Reads localStorage first; falls back to the OS-level prefers-color-scheme
 * media query. Returns 'light' when neither source has a preference.
 */
function resolveInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch { /* localStorage blocked by browser policy */ }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Theme management hook.
 *
 * - Applies `data-theme` attribute to <html> on every change.
 * - Persists the user's choice in localStorage.
 * - Follows the OS preference in real-time when the user has not yet
 *   made an explicit choice.
 *
 * Usage:
 *   const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme);

  // Sync theme → DOM attribute + localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch { /* noop */ }
  }, [theme]);

  // Follow OS preference changes when the user has not set an explicit choice
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const onSystemChange = (e) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
