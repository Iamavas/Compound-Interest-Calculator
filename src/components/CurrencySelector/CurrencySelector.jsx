import { CURRENCIES } from '../../constants/currencies.js';
import styles from './CurrencySelector.module.css';

export default function CurrencySelector({ currency, onSelect }) {
  return (
    <div className={styles.selector} role="group" aria-label="Select currency">
      {CURRENCIES.map((c) => (
        <button
          key={c.code}
          className={`${styles.btn}${currency.code === c.code ? ` ${styles.active}` : ''}`}
          onClick={() => onSelect(c)}
          aria-pressed={currency.code === c.code}
          type="button"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
