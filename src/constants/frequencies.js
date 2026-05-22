export const COMPOUND_FREQUENCIES = [
  { value: 365, label: 'Daily (365/yr)' },
  { value: 360, label: 'Daily (360/yr)' },
  { value: 52,  label: 'Weekly (52/yr)' },
  { value: 26,  label: 'Bi-Weekly (26/yr)' },
  { value: 24,  label: 'Semi-Monthly (24/yr)' },
  { value: 12,  label: 'Monthly (12/yr)' },
  { value: 6,   label: 'Bi-Monthly (6/yr)' },
  { value: 4,   label: 'Quarterly (4/yr)' },
  { value: 2,   label: 'Half-Yearly (2/yr)' },
  { value: 1,   label: 'Yearly (1/yr)' },
];

export const RATE_FREQUENCIES = [
  { value: 'daily',     label: 'Daily' },
  { value: 'weekly',    label: 'Weekly' },
  { value: 'monthly',   label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual',    label: 'Annual' },
];

export const CONTRIBUTION_FREQUENCIES = [
  { value: 'weekly',     label: 'Weekly',      perYear: 52 },
  { value: 'biweekly',  label: 'Bi-Weekly',   perYear: 26 },
  { value: 'monthly',   label: 'Monthly',     perYear: 12 },
  { value: 'quarterly', label: 'Quarterly',   perYear: 4  },
  { value: 'halfyearly',label: 'Half-Yearly', perYear: 2  },
  { value: 'yearly',    label: 'Yearly',      perYear: 1  },
];

export const WITHDRAWAL_FREQUENCIES = [
  { value: 'monthly',    label: 'Monthly',     perYear: 12 },
  { value: 'quarterly',  label: 'Quarterly',   perYear: 4  },
  { value: 'halfyearly', label: 'Half-Yearly', perYear: 2  },
  { value: 'yearly',     label: 'Yearly',      perYear: 1  },
];

export const CONTRIB_MODES = [
  { value: 'none',        label: 'None' },
  { value: 'deposits',    label: 'Deposits' },
  { value: 'withdrawals', label: 'Withdrawals' },
  { value: 'both',        label: 'Both' },
];
