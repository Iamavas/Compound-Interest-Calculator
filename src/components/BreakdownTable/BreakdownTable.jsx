import { useState } from 'react';
import { formatCurrency } from '../../utils/formatters.js';
import styles from './BreakdownTable.module.css';

const TABS = [
  { key: 'monthly', label: 'Monthly Breakdown' },
  { key: 'yearly',  label: 'Yearly Breakdown'  },
];

export default function BreakdownTable({ monthlyData, yearlyData, symbol }) {
  const [activeTab, setActiveTab] = useState('monthly');
  const fmt = (v) => formatCurrency(v, symbol);

  return (
    <div>
      {/* Tab bar */}
      <div className={styles.tabs} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.key}
            className={`${styles.tab}${activeTab === tab.key ? ` ${styles.active}` : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tableWrap} role="tabpanel">
        {activeTab === 'monthly' ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.center}>Month</th>
                <th>Deposits</th>
                <th>Withdrawals</th>
                <th>Interest</th>
                <th>Total Invested</th>
                <th>Accrued Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((d) => (
                <tr
                  key={d.month}
                  className={d.month > 0 && d.month % 12 === 1 ? styles.yearStart : ''}
                >
                  <td className={styles.center}>{d.month}</td>
                  <td>
                    {d.month === 0
                      ? fmt(d.deposit)
                      : d.deposit > 0
                      ? fmt(d.deposit)
                      : <span className={styles.dash}>—</span>}
                  </td>
                  <td>
                    {d.withdrawal > 0
                      ? fmt(d.withdrawal)
                      : <span className={styles.dash}>—</span>}
                  </td>
                  <td>
                    {d.month === 0
                      ? <span className={styles.dash}>—</span>
                      : fmt(d.interest)}
                  </td>
                  <td>{fmt(d.totalInvested)}</td>
                  <td>
                    {d.month === 0
                      ? <span className={styles.dash}>—</span>
                      : fmt(d.accruedInterest)}
                  </td>
                  <td className={styles.balanceCell}>{fmt(d.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.center}>Year</th>
                <th>Deposits</th>
                <th>Withdrawals</th>
                <th>Interest</th>
                <th>Total Invested</th>
                <th>Accrued Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((d) => (
                <tr key={d.year}>
                  <td className={styles.center}>{d.year}</td>
                  <td>
                    {d.deposits > 0
                      ? fmt(d.deposits)
                      : <span className={styles.dash}>—</span>}
                  </td>
                  <td>
                    {d.withdrawals > 0
                      ? fmt(d.withdrawals)
                      : <span className={styles.dash}>—</span>}
                  </td>
                  <td>
                    {d.year === 0
                      ? <span className={styles.dash}>—</span>
                      : fmt(d.interest)}
                  </td>
                  <td>{fmt(d.totalInvested)}</td>
                  <td>
                    {d.year === 0
                      ? <span className={styles.dash}>—</span>
                      : fmt(d.accruedInterest)}
                  </td>
                  <td className={styles.balanceCell}>{fmt(d.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
