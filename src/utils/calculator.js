/**
 * Convert an entered interest rate to an annualised decimal rate.
 * @param {number} rate - Rate as a percentage value (e.g. 15 for 15%)
 * @param {'daily'|'weekly'|'monthly'|'quarterly'|'annual'} rateFreq
 * @returns {number} Annual rate as a decimal (e.g. 0.15)
 */
function toAnnualRate(rate, rateFreq) {
  const multipliers = { daily: 365, weekly: 52, monthly: 12, quarterly: 4, annual: 1 };
  return (rate * (multipliers[rateFreq] ?? 1)) / 100;
}

/**
 * Run a month-by-month compound interest simulation.
 *
 * @param {{
 *   principal: number;
 *   rate: number;
 *   rateFreq: string;
 *   compoundFreq: number;
 *   years: number;
 *   extraMonths: number;
 *   depositAmount: number;
 *   depositFreqPerYear: number;
 *   depositIncrease: number;
 *   depositTiming: 'beginning' | 'end';
 *   withdrawalAmount: number;
 *   withdrawalFreqPerYear: number;
 * }} params
 * @returns {{ monthlyData: object[], yearlyData: object[], summary: object } | null}
 */
export function simulate({
  principal,
  rate,
  rateFreq,
  compoundFreq,
  years,
  extraMonths,
  depositAmount,
  depositFreqPerYear,
  depositIncrease,
  depositTiming,
  withdrawalAmount,
  withdrawalFreqPerYear,
}) {
  const totalMonths = years * 12 + extraMonths;
  if (totalMonths === 0 || principal < 0) return null;

  const annualRate     = toAnnualRate(rate, rateFreq);
  const ratePerPeriod  = annualRate / compoundFreq;
  // Equivalent monthly growth factor derived from the chosen compound frequency
  const monthlyFactor  = Math.pow(1 + ratePerPeriod, compoundFreq / 12) - 1;

  let balance              = principal;
  let totalInterestAccrued = 0;
  let totalDeposited       = 0;
  let totalWithdrawn       = 0;
  let currentDepositAmt    = depositAmount;

  const monthlyData = [
    {
      month: 0,
      deposit: principal,
      withdrawal: 0,
      interest: 0,
      totalInvested: principal,
      accruedInterest: 0,
      balance: principal,
    },
  ];

  for (let m = 1; m <= totalMonths; m++) {
    // Escalate deposit amount at the start of each subsequent year
    if (m > 1 && (m - 1) % 12 === 0 && depositIncrease > 0) {
      currentDepositAmt *= 1 + depositIncrease / 100;
    }

    // Convert periodic deposit/withdrawal to monthly-equivalent amounts
    const depThisMonth = depositAmount    > 0 ? (currentDepositAmt   * depositFreqPerYear)    / 12 : 0;
    const wdThisMonth  = withdrawalAmount > 0 ? (withdrawalAmount     * withdrawalFreqPerYear) / 12 : 0;

    if (depositTiming === 'beginning') {
      balance += depThisMonth;
    }

    const interestThisMonth  = balance * monthlyFactor;
    balance                 += interestThisMonth;
    totalInterestAccrued    += interestThisMonth;

    if (depositTiming === 'end') {
      balance += depThisMonth;
    }

    balance        = Math.max(0, balance - wdThisMonth);
    totalDeposited += depThisMonth;
    totalWithdrawn += wdThisMonth;

    monthlyData.push({
      month:          m,
      deposit:        depThisMonth,
      withdrawal:     wdThisMonth,
      interest:       interestThisMonth,
      totalInvested:  principal + totalDeposited,
      accruedInterest: totalInterestAccrued,
      balance,
    });
  }

  // ── Yearly snapshots ─────────────────────────────────────────────────────
  const yearlyData = [];
  const numYears   = Math.ceil(totalMonths / 12);

  for (let y = 0; y <= numYears; y++) {
    const mIdx = Math.min(y * 12, totalMonths);
    const snap = monthlyData[mIdx];
    if (!snap) break;

    let yearInterest = 0, yearDeposits = 0, yearWithdrawals = 0;

    if (y > 0) {
      const rangeStart = (y - 1) * 12 + 1;
      for (let i = rangeStart; i <= mIdx; i++) {
        yearInterest    += monthlyData[i].interest;
        yearDeposits    += monthlyData[i].deposit;
        yearWithdrawals += monthlyData[i].withdrawal;
      }
    }

    yearlyData.push({
      year:           y,
      label:          y === 0 ? 'Start' : `Year ${y}`,
      deposits:       y === 0 ? principal : yearDeposits,
      withdrawals:    yearWithdrawals,
      interest:       yearInterest,
      totalInvested:  snap.totalInvested,
      accruedInterest: snap.accruedInterest,
      balance:        snap.balance,
    });
  }

  // ── Summary metrics ───────────────────────────────────────────────────────
  const nominalRate   = annualRate * 100;
  const effectiveRate = (Math.pow(1 + annualRate / compoundFreq, compoundFreq) - 1) * 100;
  const ror =
    principal > 0
      ? ((balance - principal - totalDeposited + totalWithdrawn) / principal) * 100
      : 0;

  let doublingTime = null;
  if (annualRate > 0) {
    const doublingYears = Math.log(2) / (compoundFreq * Math.log(1 + annualRate / compoundFreq));
    doublingTime = {
      years:  Math.floor(doublingYears),
      months: Math.round((doublingYears % 1) * 12),
    };
  }

  return {
    monthlyData,
    yearlyData,
    summary: {
      futureValue:    balance,
      totalInterest:  totalInterestAccrued,
      initialBalance: principal,
      totalDeposited,
      totalWithdrawn,
      nominalRate,
      effectiveRate,
      ror,
      doublingTime,
    },
  };
}
