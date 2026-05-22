import { useState } from 'react';
import {
  ComposedChart,
  AreaChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency, formatAxisValue } from '../../utils/formatters.js';
import styles from './GrowthChart.module.css';

const COLORS_LIGHT = {
  invested: '#6366f1',  // brand indigo
  interest: '#10b981',  // success emerald
  balance:  '#0f172a',  // slate-900 — visible on light card
};

const COLORS_DARK = {
  invested: '#818cf8',  // lighter indigo for dark surfaces
  interest: '#34d399',  // lighter emerald for dark surfaces
  balance:  '#94a3b8',  // slate-400 — visible on dark card
};

function CustomTooltip({ active, payload, label, symbol }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTitle}>{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className={styles.tooltipRow}>
          <span className={styles.tooltipSwatch} style={{ background: entry.color }} />
          <span className={styles.tooltipName}>{entry.name}</span>
          <span className={styles.tooltipVal}>{formatCurrency(entry.value, symbol)}</span>
        </div>
      ))}
    </div>
  );
}

export default function GrowthChart({ yearlyData, symbol, theme }) {
  const [chartType, setChartType] = useState('bar');
  const COLORS = theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;

  const data = yearlyData.map((d) => ({
    name:             d.label,
    'Total Invested': Math.round(d.totalInvested),
    'Interest Earned':Math.round(d.accruedInterest),
    'Balance':        Math.round(d.balance),
  }));

  const tickFormatter = (v) => formatAxisValue(v, symbol);
  const tooltipProps  = { content: <CustomTooltip symbol={symbol} /> };
  const gridProps     = { strokeDasharray: '3 3', stroke: 'var(--color-border)', vertical: false };
  const xProps        = { dataKey: 'name', tick: { fontSize: 11 }, tickLine: false };
  const yProps        = { tickFormatter, tick: { fontSize: 11 }, width: 72, tickLine: false };
  const margin        = { top: 8, right: 8, left: 0, bottom: 0 };

  return (
    <div>
      {/* Chart type toggle */}
      <div className={styles.controls}>
        <div className={styles.typeToggle} role="group" aria-label="Chart type">
          {['bar', 'area'].map((type) => (
            <button
              key={type}
              type="button"
              className={`${styles.typeBtn}${chartType === type ? ` ${styles.active}` : ''}`}
              onClick={() => setChartType(type)}
              aria-pressed={chartType === type}
            >
              {type === 'bar' ? 'Stacked Bar' : 'Area'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={340}>
          {chartType === 'bar' ? (
            <ComposedChart data={data} margin={margin}>
              <CartesianGrid {...gridProps} />
              <XAxis {...xProps} />
              <YAxis {...yProps} />
              <Tooltip {...tooltipProps} />
              <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px' }} />
              <Bar
                dataKey="Total Invested"
                stackId="a"
                fill={COLORS.invested}
                maxBarSize={48}
              />
              <Bar
                dataKey="Interest Earned"
                stackId="a"
                fill={COLORS.interest}
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              />
              <Line
                dataKey="Balance"
                type="monotone"
                stroke={COLORS.balance}
                strokeWidth={2.5}
                dot={{ r: 3, fill: COLORS.balance, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          ) : (
            <AreaChart data={data} margin={margin}>
              <defs>
                <linearGradient id="gradInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={COLORS.invested} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={COLORS.invested} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={COLORS.interest} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={COLORS.interest} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={COLORS.balance} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={COLORS.balance} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis {...xProps} />
              <YAxis {...yProps} />
              <Tooltip {...tooltipProps} />
              <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px' }} />
              <Area
                dataKey="Total Invested"
                type="monotone"
                stroke={COLORS.invested}
                fill="url(#gradInvested)"
                strokeWidth={2}
              />
              <Area
                dataKey="Interest Earned"
                type="monotone"
                stroke={COLORS.interest}
                fill="url(#gradInterest)"
                strokeWidth={2}
              />
              <Area
                dataKey="Balance"
                type="monotone"
                stroke={COLORS.balance}
                fill="url(#gradBalance)"
                strokeWidth={2.5}
                strokeDasharray="5 3"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
