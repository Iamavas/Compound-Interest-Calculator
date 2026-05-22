import { COMPOUND_FREQUENCIES, RATE_FREQUENCIES } from '../../constants/frequencies.js';
import MoneyInput from '../common/MoneyInput.jsx';
import styles from './InvestmentForm.module.css';

export default function InvestmentForm({ state, dispatch }) {
  return (
    <div className={styles.grid}>
      {/* Initial Investment */}
      <div className={styles.group}>
        <label htmlFor="principal" className={styles.label}>
          Initial Investment
        </label>
        <MoneyInput
          id="principal"
          value={state.principalStr}
          symbol={state.currency.symbol}
          onChange={(v) => dispatch({ type: 'SET_PRINCIPAL', payload: v })}
        />
      </div>

      {/* Annual Interest Rate */}
      <div className={styles.group}>
        <label htmlFor="rate" className={styles.label}>
          Interest Rate
        </label>
        <div className={styles.inputWrap}>
          <input
            id="rate"
            type="number"
            inputMode="decimal"
            value={state.rate}
            min="0"
            max="10000"
            step="0.1"
            onChange={(e) =>
              dispatch({ type: 'SET_RATE', payload: parseFloat(e.target.value) || 0 })
            }
            className={styles.input}
          />
          <span className={styles.suffix}>%</span>
        </div>
      </div>

      {/* Rate Frequency */}
      <div className={styles.group}>
        <label htmlFor="rateFreq" className={styles.label}>
          Rate Frequency
        </label>
        <div className={styles.selectWrap}>
          <select
            id="rateFreq"
            value={state.rateFreq}
            onChange={(e) => dispatch({ type: 'SET_RATE_FREQ', payload: e.target.value })}
            className={styles.select}
          >
            {RATE_FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Compound Frequency */}
      <div className={styles.group}>
        <label htmlFor="compoundFreq" className={styles.label}>
          Compounding
        </label>
        <div className={styles.selectWrap}>
          <select
            id="compoundFreq"
            value={state.compoundFreq}
            onChange={(e) =>
              dispatch({ type: 'SET_COMPOUND_FREQ', payload: parseInt(e.target.value) })
            }
            className={styles.select}
          >
            {COMPOUND_FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Years */}
      <div className={styles.group}>
        <label htmlFor="years" className={styles.label}>
          Years
        </label>
        <div className={styles.inputWrap}>
          <input
            id="years"
            type="number"
            inputMode="numeric"
            value={state.years}
            min="0"
            max="100"
            step="1"
            onChange={(e) =>
              dispatch({ type: 'SET_YEARS', payload: parseInt(e.target.value) || 0 })
            }
            className={styles.input}
          />
          <span className={styles.suffix}>yr</span>
        </div>
      </div>

      {/* Additional Months */}
      <div className={styles.group}>
        <label htmlFor="extraMonths" className={styles.label}>
          Additional Months
        </label>
        <div className={styles.inputWrap}>
          <input
            id="extraMonths"
            type="number"
            inputMode="numeric"
            value={state.extraMonths}
            min="0"
            max="11"
            step="1"
            onChange={(e) =>
              dispatch({ type: 'SET_EXTRA_MONTHS', payload: parseInt(e.target.value) || 0 })
            }
            className={styles.input}
          />
          <span className={styles.suffix}>mo</span>
        </div>
      </div>
    </div>
  );
}
