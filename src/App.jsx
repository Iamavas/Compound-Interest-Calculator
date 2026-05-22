import { lazy, Suspense } from 'react';
import { useCalculator } from './hooks/useCalculator.js';
import { useTheme } from './hooks/useTheme.js';
import { buildTimeLabel } from './utils/formatters.js';
import Header from './components/Header/Header.jsx';
import Card from './components/common/Card.jsx';
import CurrencySelector from './components/CurrencySelector/CurrencySelector.jsx';
import InvestmentForm from './components/InvestmentForm/InvestmentForm.jsx';
import ContributionsPanel from './components/ContributionsPanel/ContributionsPanel.jsx';
import ResultsSummary from './components/ResultsSummary/ResultsSummary.jsx';
import BreakdownTable from './components/BreakdownTable/BreakdownTable.jsx';
import styles from './App.module.css';

// Lazy-load Recharts to keep the initial bundle lean
const GrowthChart = lazy(() => import('./components/GrowthChart/GrowthChart.jsx'));

function AvasLabsLogo() {
  return (
    <svg
      viewBox="0 0 160 40"
      className={styles.avasLabsLogo}
      role="img"
      aria-labelledby="avaslabs-logo-title"
    >
      <title id="avaslabs-logo-title">AvasLabs</title>
      <defs>
        <linearGradient id="avasLabsLogoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20c4.444 0 8.584-1.444 11.962-3.962l-2.5-4.33C26.622 33.83 23.446 35 20 35c-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 2.126-.444 4.15-1.246 5.982L38.02 30.02C39.306 27.09 40 23.83 40 20 40 8.954 31.046 0 20 0z"
        fill="url(#avasLabsLogoGradient)"
      />
      <path
        d="M30 20c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10c2.76 0 5.26-1.12 7.07-2.93l-3.54-3.54C22.44 24.58 21.26 25 20 25c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 .59-.1 1.15-.29 1.68l3.54 3.54C29.36 23.48 30 21.8 30 20z"
        fill="#8b5cf6"
      />
      <text
        x="50"
        y="25"
        fontFamily="Outfit, Inter, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="currentColor"
      >
        AvasLabs
      </text>
    </svg>
  );
}

export default function App() {
  const { state, dispatch, results } = useCalculator();
  const { theme, toggleTheme } = useTheme();

  const handleCurrencySelect = (currency) =>
    dispatch({ type: 'SET_CURRENCY', payload: currency });

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className={styles.main}>
        <div className={styles.layout}>
          {/* ── Left: Input Panel ── */}
          <aside className={styles.inputPanel}>
            <Card title="Investment Details">
              <CurrencySelector
                currency={state.currency}
                onSelect={handleCurrencySelect}
              />
              <InvestmentForm state={state} dispatch={dispatch} />
            </Card>

            <Card title="Regular Contributions">
              <ContributionsPanel state={state} dispatch={dispatch} />
            </Card>
          </aside>

          {/* ── Right: Results Panel ── */}
          <section className={styles.resultsPanel}>
            {results ? (
              <>
                <Card
                  title={`Results — ${buildTimeLabel(state.years, state.extraMonths)}`}
                >
                  <ResultsSummary
                    results={results}
                    currency={state.currency}
                    years={state.years}
                    extraMonths={state.extraMonths}
                  />
                </Card>

                <Card title="Growth Over Time">
                  <Suspense
                    fallback={
                      <div className={styles.chartFallback}>Loading chart…</div>
                    }
                  >
                    <GrowthChart
                      yearlyData={results.yearlyData}
                      symbol={state.currency.symbol}
                      theme={theme}
                    />
                  </Suspense>
                </Card>

                <Card title="Detailed Breakdown">
                  <BreakdownTable
                    monthlyData={results.monthlyData}
                    yearlyData={results.yearlyData}
                    symbol={state.currency.symbol}
                  />
                </Card>
              </>
            ) : (
              <Card>
                <div className={styles.emptyState}>
                  <p>Enter a time period (years or months) to see your projection.</p>
                </div>
              </Card>
            )}
          </section>
        </div>

        <footer className={styles.footer}>
          <p className={styles.disclaimer}>
            <strong>Disclaimer:</strong> This calculator is for illustrative purposes only and does
            not constitute financial advice. Actual returns may vary based on market conditions,
            fees, and other factors. Consult a qualified financial advisor for personalised
            guidance.
          </p>

          <a
            href="https://avaslabs.vercel.app/"
            className={styles.attribution}
            target="_blank"
            rel="noreferrer"
            aria-label="Powered by AvasLabs"
          >
            <span className={styles.attributionLabel}>Powered by</span>
            <AvasLabsLogo />
          </a>
        </footer>
      </main>
    </>
  );
}
