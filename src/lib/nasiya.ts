/** Nasiya (bo‘lib to‘lash) — installment terms */

export const NASIYA_MIN_AMOUNT = 100;
export const NASIYA_DOWN_PAYMENT_PERCENT = 0.5;
export const NASIYA_MONTHS = 3;
export const NASIYA_MONTHLY_MARKUP = 0.1;

export type PaymentMethod = "full" | "nasiya";

export interface NasiyaPlan {
  downPayment: number;
  monthlyBase: number;
  monthlyWithFee: number;
  /** 1-oy, 2-oy, 3-oy to‘lovlari (yakuniy oy qoldiq bilan tekislangan) */
  monthPayments: number[];
  months: number;
  totalPayable: number;
  remainingBase: number;
}

export interface NasiyaCalc extends NasiyaPlan {
  eligible: boolean;
}

export function isNasiyaEligible(total: number): boolean {
  return total >= NASIYA_MIN_AMOUNT;
}

/** 2 xona kasr — pullik format uchun */
export function moneyRound(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Example ($120):
 * - downPayment 50% = $60
 * - remaining $60 / 3 = $20/mo base
 * - with 10% fee: $22/mo × 3
 * - totalPayable = $60 + 3×$22 = $126
 *
 * Display: bosh to‘lov + 1-oy / 2-oy / 3-oy alohida.
 */
export function calcNasiya(total: number): NasiyaCalc {
  const months = NASIYA_MONTHS;

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

  // First N-1 months rounded; last month absorbs remainder so sum is exact
  const monthPayments: number[] = [];
  let paid = 0;
  for (let i = 0; i < months - 1; i++) {
    const m = moneyRound(rawMonthly);
    monthPayments.push(m);
    paid += m;
  }
  const monthsTotalTarget = moneyRound(rawMonthly * months);
  const last = moneyRound(monthsTotalTarget - paid);
  monthPayments.push(last);

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
