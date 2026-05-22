import {
  formatCurrency,
  formatPercent,
  formatDoublingTime,
  buildTimeLabel,
} from '../../utils/formatters.js';
import styles from './ResultsSummary.module.css';

/** Stat row with a coloured left-border accent */
function StatItem({ label, value, accent }) {
  return (
    <div className={styles.statItem} data-accent={accent}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}

export default function ResultsSummary({ results, currency, years, extraMonths }) {
  const { summary } = results;
  const sym       = currency.symbol;
  const timeLabel = buildTimeLabel(years, extraMonths);

  // Gain percentage relative to total capital deployed
  const totalDeployed = summary.initialBalance + summary.totalDeposited - summary.totalWithdrawn;
  const gainPct = totalDeployed > 0
    ? ((summary.totalInterest / totalDeployed) * 100).toFixed(1)
    : '0.0';

  return (
    <div>
      {/* ── Primary hero metric ─────────────────────────── */}
      <div className={styles.primaryHero}>
        <div className={styles.heroTopRow}>
          <span className={styles.heroLabel}>Future Value</span>
          <span className={styles.gainBadge}>
            <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
              <path d="M4 1L7.5 7H0.5L4 1Z" fill="currentColor" />
            </svg>
            +{gainPct}%
          </span>
        </div>
        <p className={styles.heroValue}>{formatCurrency(summary.futureValue, sym)}</p>
        <p className={styles.heroPeriod}>over {timeLabel}</p>
      </div>

      {/* ── Secondary metrics ────────────────────────────── */}
      <div className={styles.secondaryRow}>
        <div className={styles.secondaryCard} data-variant="interest">
          <span className={styles.secondaryLabel}>Interest Earned</span>
          <span className={styles.secondaryValue}>
            {formatCurrency(summary.totalInterest, sym)}
          </span>
        </div>
        <div className={styles.secondaryCard} data-variant="invested">
          <span className={styles.secondaryLabel}>Amount Invested</span>
          <span className={styles.secondaryValue}>
            {formatCurrency(summary.initialBalance, sym)}
          </span>
        </div>
      </div>

      {/* ── Stats grid ───────────────────────────────────── */}
      <div className={styles.statsGrid}>
        <StatItem label="Nominal Rate"            value={formatPercent(summary.nominalRate)}                       accent="brand"   />
        <StatItem label="Eff. Annual Rate (APY)"  value={formatPercent(summary.effectiveRate)}                     accent="brand"   />
        <StatItem label="Total Contributions"     value={formatCurrency(summary.totalDeposited, sym)}              accent="neutral" />
        <StatItem label="Total Withdrawals"       value={formatCurrency(summary.totalWithdrawn, sym)}              accent="neutral" />
        <StatItem label="Rate of Return"          value={formatPercent(summary.ror)}  accent={summary.ror >= 0 ? 'success' : 'danger'} />
        <StatItem label="Time to Double"          value={formatDoublingTime(summary.doublingTime)}                 accent="warning" />
      </div>
    </div>
  );
}
