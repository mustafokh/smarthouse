/** Nasiya (bo‘lib to‘lash) — installment terms */

export const NASIYA_MIN_AMOUNT = 100;
export const NASIYA_DOWN_PAYMENT_PERCENT = 0.5;
export const NASIYA_MONTHLY_MARKUP = 0.1;
export const NASIYA_MONTH_OPTIONS = [1, 2, 3] as const;

export type NasiyaMonths = (typeof NASIYA_MONTH_OPTIONS)[number];
export type PaymentMethod = "full" | "nasiya";

export interface NasiyaPlan {
  downPayment: number;
  monthlyBase: number;
  monthlyWithFee: number;
  /** Har oy to‘lovi (+10%), oy soniga qarab */
  monthPayments: number[];
  months: NasiyaMonths;
  totalPayable: number;
  remainingBase: number;
}

export interface NasiyaCalc extends NasiyaPlan {
  eligible: boolean;
}

export function isNasiyaEligible(total: number): boolean {
  return total >= NASIYA_MIN_AMOUNT;
}

export function moneyRound(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function normalizeNasiyaMonths(months?: number): NasiyaMonths {
  if (months === 1 || months === 2 || months === 3) return months;
  return 3;
}

/**
 * 50% bosh to‘lov + qolgan summa N oyga bo‘linadi, har oyga +10% nasiya.
 * months: 1 | 2 | 3
 *
 * $120, 3 oy: bosh 60$; oyiga 22$ × 3 → jami 126$
 * $120, 1 oy: bosh 60$; 1-oy 66$ → jami 126$
 */
export function calcNasiya(
  total: number,
  monthsInput: number = 3,
): NasiyaCalc {
  const months = normalizeNasiyaMonths(monthsInput);

  if (!isNasiyaEligible(total)) {
    return {
      eligible: false,
      downPayment: 0,
      monthlyBase: 0,
      monthlyWithFee: 0,
      monthPayments: [],
      months,
      totalPayable: moneyRound(total),
      remainingBase: 0,
    };
  }

  const downPayment = moneyRound(total * NASIYA_DOWN_PAYMENT_PERCENT);
  const remainingBase = moneyRound(total - downPayment);
  const monthlyBase = remainingBase / months;
  const rawMonthly = monthlyBase * (1 + NASIYA_MONTHLY_MARKUP);

  const monthPayments: number[] = [];
  let paid = 0;
  for (let i = 0; i < months - 1; i++) {
    const m = moneyRound(rawMonthly);
    monthPayments.push(m);
    paid += m;
  }
  const monthsTotalTarget = moneyRound(rawMonthly * months);
  monthPayments.push(moneyRound(monthsTotalTarget - paid));

  const monthlyWithFee = monthPayments[0] ?? moneyRound(rawMonthly);
  const totalPayable = moneyRound(
    downPayment + monthPayments.reduce((a, b) => a + b, 0),
  );

  return {
    eligible: true,
    downPayment,
    monthlyBase: moneyRound(monthlyBase),
    monthlyWithFee,
    monthPayments,
    months,
    totalPayable,
    remainingBase,
  };
}

export function toNasiyaPlan(calc: NasiyaCalc): NasiyaPlan | undefined {
  if (!calc.eligible) return undefined;
  return {
    downPayment: calc.downPayment,
    monthlyBase: calc.monthlyBase,
    monthlyWithFee: calc.monthlyWithFee,
    monthPayments: calc.monthPayments,
    months: calc.months,
    totalPayable: calc.totalPayable,
    remainingBase: calc.remainingBase,
  };
}
