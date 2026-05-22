import styles from './Header.module.css';

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"    x2="12" y2="6" />
      <line x1="12" y1="18"   x2="12" y2="22" />
      <line x1="4.93" y1="4.93"  x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2"  y1="12" x2="6"  y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76"  x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Header({ theme, toggleTheme }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoWrap} aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="10" fill="rgba(255,255,255,0.1)" />
            <rect width="36" height="36" rx="10" fill="url(#logoGrad)" fillOpacity="0.15" />
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            {/* Bar chart columns */}
            <rect x="6"  y="20" width="5" height="10" rx="1.5" fill="rgba(255,255,255,0.5)"  />
            <rect x="13" y="14" width="5" height="16" rx="1.5" fill="rgba(255,255,255,0.7)"  />
            <rect x="20" y="9"  width="5" height="21" rx="1.5" fill="rgba(255,255,255,0.9)"  />
            <rect x="27" y="16" width="5" height="14" rx="1.5" fill="rgba(255,255,255,0.65)" />
            {/* Trend line */}
            <polyline
              points="8.5,18 15.5,12 22.5,7 29.5,14"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="29.5" cy="14" r="2.5" fill="#fbbf24" />
          </svg>
        </div>
        <div>
          <h1 className={styles.title}>Compound Interest Calculator</h1>
          <p className={styles.subtitle}>
            Real-time growth visualisation &mdash; results update as you type
          </p>
        </div>
        <div className={styles.liveBadge} aria-label="Live results">
          <span className={styles.liveDot} />
          Live
        </div>

        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          type="button"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
