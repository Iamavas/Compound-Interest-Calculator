import { useReducer, useMemo } from 'react';
import { simulate } from '../utils/calculator.js';
import { parseMoneyString } from '../utils/formatters.js';
import { CONTRIBUTION_FREQUENCIES, WITHDRAWAL_FREQUENCIES } from '../constants/frequencies.js';

const INITIAL_STATE = {
  currency:           { symbol: '₦', code: 'NGN' },
  principalStr:       '1,000,000',
  rate:               15,
  rateFreq:           'annual',
  compoundFreq:       12,
  years:              5,
  extraMonths:        0,
  contribMode:        'none',    // 'none' | 'deposits' | 'withdrawals' | 'both'
  depositAmountStr:   '50,000',
  depositFreq:        'monthly',
  depositIncrease:    0,
  depositTiming:      'end',     // 'beginning' | 'end'
  withdrawalAmountStr:'20,000',
  withdrawalFreq:     'monthly',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENCY':          return { ...state, currency:            action.payload };
    case 'SET_PRINCIPAL':         return { ...state, principalStr:        action.payload };
    case 'SET_RATE':              return { ...state, rate:                 action.payload };
    case 'SET_RATE_FREQ':         return { ...state, rateFreq:            action.payload };
    case 'SET_COMPOUND_FREQ':     return { ...state, compoundFreq:        action.payload };
    case 'SET_YEARS':             return { ...state, years:               action.payload };
    case 'SET_EXTRA_MONTHS':      return { ...state, extraMonths:         action.payload };
    case 'SET_CONTRIB_MODE':      return { ...state, contribMode:         action.payload };
    case 'SET_DEPOSIT_AMOUNT':    return { ...state, depositAmountStr:    action.payload };
    case 'SET_DEPOSIT_FREQ':      return { ...state, depositFreq:         action.payload };
    case 'SET_DEPOSIT_INCREASE':  return { ...state, depositIncrease:     action.payload };
    case 'SET_DEPOSIT_TIMING':    return { ...state, depositTiming:       action.payload };
    case 'SET_WITHDRAWAL_AMOUNT': return { ...state, withdrawalAmountStr: action.payload };
    case 'SET_WITHDRAWAL_FREQ':   return { ...state, withdrawalFreq:      action.payload };
    default: return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const results = useMemo(() => {
    const principal      = parseMoneyString(state.principalStr);
    const hasDeposits    = state.contribMode === 'deposits'    || state.contribMode === 'both';
    const hasWithdrawals = state.contribMode === 'withdrawals' || state.contribMode === 'both';

    const depositAmount    = hasDeposits    ? parseMoneyString(state.depositAmountStr)    : 0;
    const withdrawalAmount = hasWithdrawals ? parseMoneyString(state.withdrawalAmountStr) : 0;

    const depositFreqEntry    = CONTRIBUTION_FREQUENCIES.find((f) => f.value === state.depositFreq);
    const withdrawalFreqEntry = WITHDRAWAL_FREQUENCIES.find((f) => f.value === state.withdrawalFreq);

    return simulate({
      principal,
      rate:                  state.rate,
      rateFreq:              state.rateFreq,
      compoundFreq:          state.compoundFreq,
      years:                 state.years,
      extraMonths:           state.extraMonths,
      depositAmount,
      depositFreqPerYear:    depositFreqEntry?.perYear ?? 12,
      depositIncrease:       state.depositIncrease,
      depositTiming:         state.depositTiming,
      withdrawalAmount,
      withdrawalFreqPerYear: withdrawalFreqEntry?.perYear ?? 12,
    });
  }, [state]);

  return { state, dispatch, results };
}
