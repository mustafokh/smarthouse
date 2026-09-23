/** Nasiya (bo‘lib to‘lash) — installment terms */

export const NASIYA_MIN_AMOUNT = 100;
export const NASIYA_DOWN_PAYMENT_PERCENT = 0.5;
/** Har oy uchun +10% (1 oy → +10%, 2 oy → +20%, 3 oy → +30%) */
export const NASIYA_MARKUP_PER_MONTH = 0.1;
export const NASIYA_MONTH_OPTIONS = [1, 2, 3] as const;

export type NasiyaMonths = (typeof NASIYA_MONTH_OPTIONS)[number];
export type PaymentMethod = "full" | "nasiya";

export interface NasiyaPlan {
  downPayment: number;
  monthlyBase: number;
  monthlyWithFee: number;
  /** Qolgan summa teng bo‘lib oylarga */
  monthPayments: number[];
  months: NasiyaMonths;
  /** Jami: asosiy × (1 + oy × 10%) */
  totalPayable: number;
  remainingBase: number;
  /** Masalan 0.3 = +30% (eski buyurtmalarda bo‘lmasligi mumkin) */
  markupPercent?: number;
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

export function nasiyaMarkupRate(months: NasiyaMonths): number {
  return months * NASIYA_MARKUP_PER_MONTH;
}

/**
 * 50% bosh to‘lov (tovar narxidan) + jami narxga oy × 10% ustama.
 *
 * $100, 1 oy → jami 110$
 * $100, 2 oy → jami 120$
 * $100, 3 oy → jami 130$
 */
export function calcNasiya(
  total: number,
  monthsInput: number = 3,
): NasiyaCalc {
  const months = normalizeNasiyaMonths(monthsInput);
  const markupPercent = nasiyaMarkupRate(months);

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
      markupPercent,
    };
  }

  const totalPayable = moneyRound(total * (1 + markupPercent));
  const downPayment = moneyRound(total * NASIYA_DOWN_PAYMENT_PERCENT);
  const remaining = moneyRound(totalPayable - downPayment);
  const rawMonthly = remaining / months;

  const monthPayments: number[] = [];
  let paid = 0;
  for (let i = 0; i < months - 1; i++) {
    const m = moneyRound(rawMonthly);
    monthPayments.push(m);
    paid += m;
  }
  monthPayments.push(moneyRound(remaining - paid));

  const monthlyWithFee = monthPayments[0] ?? moneyRound(rawMonthly);

  return {
    eligible: true,
    downPayment,
    monthlyBase: moneyRound(rawMonthly),
    monthlyWithFee,
    monthPayments,
    months,
    totalPayable,
    remainingBase: remaining,
    markupPercent,
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
    markupPercent: calc.markupPercent,
  };
}
