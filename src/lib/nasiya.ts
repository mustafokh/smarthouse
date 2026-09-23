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

/**
 * Example ($120):
 * - downPayment 50% = $60
 * - remaining $60 / 3 = $20/mo base
 * - with 10% fee: $22/mo
 * - totalPayable = $60 + 3×$22 = $126
 */
export function calcNasiya(total: number): NasiyaCalc {
  const months = NASIYA_MONTHS;

  if (!isNasiyaEligible(total)) {
    return {
      eligible: false,
      downPayment: 0,
      monthlyBase: 0,
      monthlyWithFee: 0,
      months,
      totalPayable: total,
      remainingBase: 0,
    };
  }

  const downPayment = total * NASIYA_DOWN_PAYMENT_PERCENT;
  const remainingBase = total - downPayment;
  const monthlyBase = remainingBase / months;
  const monthlyWithFee = monthlyBase * (1 + NASIYA_MONTHLY_MARKUP);
  const totalPayable = downPayment + monthlyWithFee * months;

  return {
    eligible: true,
    downPayment,
    monthlyBase,
    monthlyWithFee,
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
    months: calc.months,
    totalPayable: calc.totalPayable,
    remainingBase: calc.remainingBase,
  };
}
