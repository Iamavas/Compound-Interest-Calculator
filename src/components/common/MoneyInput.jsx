import { useRef, useEffect, useCallback } from 'react';
import { formatWithCommas } from '../../utils/formatters.js';
import styles from './MoneyInput.module.css';

/**
 * A controlled text input that auto-formats the value with thousands-commas
 * and correctly restores the cursor position after each character typed.
 */
export default function MoneyInput({ id, value, onChange, symbol, placeholder }) {
  const inputRef  = useRef(null);
  const cursorRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      const el  = e.target;
      const pos = el.selectionStart;
      const old = el.value;

      const oldCommasBefore = (old.substring(0, pos).match(/,/g) || []).length;
      const formatted       = formatWithCommas(old);
      const newLen          = formatted.length;
      const approxPos       = pos + (newLen - old.length);
      const newCommasBefore = (formatted.substring(0, approxPos).match(/,/g) || []).length;

      cursorRef.current = pos + (newCommasBefore - oldCommasBefore);
      onChange(formatted);
    },
    [onChange],
  );

  // Restore cursor after React re-renders the controlled input value
  useEffect(() => {
    if (cursorRef.current !== null && inputRef.current) {
      const c = cursorRef.current;
      cursorRef.current = null;
      inputRef.current.setSelectionRange(c, c);
    }
  });

  return (
    <div className={styles.wrap}>
      <span className={styles.symbol} aria-hidden="true">
        {symbol}
      </span>
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
        autoComplete="off"
      />
    </div>
  );
}
