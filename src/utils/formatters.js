/**
 * Format a numeric value as a currency string.
 * @param {number} value
 * @param {string} symbol - Currency symbol (e.g. '₦')
 * @returns {string}
 */
export function formatCurrency(value, symbol) {
  return (
    symbol +
    Number(value).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Format a raw string input with thousands commas, preserving a single decimal point.
 * @param {string} raw
 * @returns {string}
 */
export function formatWithCommas(raw) {
  const cleaned = String(raw).replace(/[^0-9.]/g, '');
  const dotIdx  = cleaned.indexOf('.');
  const integer = dotIdx >= 0 ? cleaned.slice(0, dotIdx) : cleaned;
  const decimal = dotIdx >= 0 ? cleaned.slice(dotIdx)    : '';
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatted + decimal;
}

/**
 * Parse a comma-formatted money string to a float.
 * @param {string} str
 * @returns {number}
 */
export function parseMoneyString(str) {
  return parseFloat(String(str).replace(/,/g, '')) || 0;
}

/**
 * Format a number as a percentage string.
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatPercent(value, decimals = 2) {
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Format a doubling-time object into a readable string.
 * @param {{ years: number; months: number } | null} doublingTime
 * @returns {string}
 */
export function formatDoublingTime(doublingTime) {
  if (!doublingTime) return 'N/A';
  const { years, months } = doublingTime;
  const y = `${years} yr${years !== 1 ? 's' : ''}`;
  const m = `${months} mo${months !== 1 ? 's' : ''}`;
  return `${y}, ${m}`;
}

/**
 * Build a human-readable time-period label from years and extra months.
 * @param {number} years
 * @param {number} months
 * @returns {string}
 */
export function buildTimeLabel(years, months) {
  if (years > 0 && months > 0) {
    return `${years} year${years > 1 ? 's' : ''} & ${months} month${months > 1 ? 's' : ''}`;
  }
  if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${months} month${months > 1 ? 's' : ''}`;
}

/**
 * Format a large number for compact axis tick labels.
 * @param {number} value
 * @param {string} symbol
 * @returns {string}
 */
export function formatAxisValue(value, symbol) {
  if (value >= 1_000_000_000) return `${symbol}${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000)     return `${symbol}${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)         return `${symbol}${(value / 1_000).toFixed(0)}K`;
  return `${symbol}${value}`;
}
