import {
  CONTRIB_MODES,
  CONTRIBUTION_FREQUENCIES,
  WITHDRAWAL_FREQUENCIES,
} from '../../constants/frequencies.js';
import MoneyInput from '../common/MoneyInput.jsx';
import styles from './ContributionsPanel.module.css';

export default function ContributionsPanel({ state, dispatch }) {
  const showDeposits    = state.contribMode === 'deposits'    || state.contribMode === 'both';
  const showWithdrawals = state.contribMode === 'withdrawals' || state.contribMode === 'both';

  return (
    <div>
      {/* Mode toggle */}
      <div className={styles.toggle} role="group" aria-label="Contribution mode">
        {CONTRIB_MODES.map((mode) => (
          <button
            key={mode.value}
            type="button"
            className={`${styles.toggleBtn}${state.contribMode === mode.value ? ` ${styles.active}` : ''}`}
            onClick={() => dispatch({ type: 'SET_CONTRIB_MODE', payload: mode.value })}
            aria-pressed={state.contribMode === mode.value}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Deposit fields */}
      {showDeposits && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Deposit Settings</h3>
          <div className={styles.grid}>
            <div className={styles.group}>
              <label htmlFor="depositAmount" className={styles.label}>
                Deposit Amount
              </label>
              <MoneyInput
                id="depositAmount"
                value={state.depositAmountStr}
                symbol={state.currency.symbol}
                onChange={(v) => dispatch({ type: 'SET_DEPOSIT_AMOUNT', payload: v })}
              />
            </div>

            <div className={styles.group}>
              <label htmlFor="depositFreq" className={styles.label}>
                Frequency
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="depositFreq"
                  value={state.depositFreq}
                  onChange={(e) =>
                    dispatch({ type: 'SET_DEPOSIT_FREQ', payload: e.target.value })
                  }
                  className={styles.select}
                >
                  {CONTRIBUTION_FREQUENCIES.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.group}>
              <label htmlFor="depositIncrease" className={styles.label}>
                Annual Increase
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="depositIncrease"
                  type="number"
                  inputMode="decimal"
                  value={state.depositIncrease}
                  min="0"
                  step="0.5"
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_DEPOSIT_INCREASE',
                      payload: parseFloat(e.target.value) || 0,
                    })
                  }
                  className={styles.input}
                />
                <span className={styles.suffix}>%</span>
              </div>
            </div>

            <div className={styles.group}>
              <span id="depositTimingLabel" className={styles.label}>Deposit Timing</span>
              <div className={styles.radioGroup} role="group" aria-labelledby="depositTimingLabel">
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="depositTiming"
                    value="beginning"
                    checked={state.depositTiming === 'beginning'}
                    onChange={() =>
                      dispatch({ type: 'SET_DEPOSIT_TIMING', payload: 'beginning' })
                    }
                    className={styles.radio}
                  />
                  Beginning of period
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="depositTiming"
                    value="end"
                    checked={state.depositTiming === 'end'}
                    onChange={() =>
                      dispatch({ type: 'SET_DEPOSIT_TIMING', payload: 'end' })
                    }
                    className={styles.radio}
                  />
                  End of period
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal fields */}
      {showWithdrawals && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Withdrawal Settings</h3>
          <div className={styles.grid}>
            <div className={styles.group}>
              <label htmlFor="withdrawalAmount" className={styles.label}>
                Withdrawal Amount
              </label>
              <MoneyInput
                id="withdrawalAmount"
                value={state.withdrawalAmountStr}
                symbol={state.currency.symbol}
                onChange={(v) => dispatch({ type: 'SET_WITHDRAWAL_AMOUNT', payload: v })}
              />
            </div>

            <div className={styles.group}>
              <label htmlFor="withdrawalFreq" className={styles.label}>
                Frequency
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="withdrawalFreq"
                  value={state.withdrawalFreq}
                  onChange={(e) =>
                    dispatch({ type: 'SET_WITHDRAWAL_FREQ', payload: e.target.value })
                  }
                  className={styles.select}
                >
                  {WITHDRAWAL_FREQUENCIES.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showDeposits && !showWithdrawals && (
        <p className={styles.emptyHint}>
          Select a contribution mode above to configure regular deposits or withdrawals.
        </p>
      )}
    </div>
  );
}
