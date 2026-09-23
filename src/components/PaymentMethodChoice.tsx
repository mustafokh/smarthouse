"use client";

import { formatPrice } from "@/data/products";
import {
  calcNasiya,
  isNasiyaEligible,
  NASIYA_MIN_AMOUNT,
  NASIYA_MONTH_OPTIONS,
  type NasiyaMonths,
  type PaymentMethod,
} from "@/lib/nasiya";

export function PaymentMethodChoice({
  total,
  value,
  onChange,
  nasiyaMonths,
  onNasiyaMonthsChange,
  variant = "light",
}: {
  total: number;
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  nasiyaMonths: NasiyaMonths;
  onNasiyaMonthsChange: (months: NasiyaMonths) => void;
  variant?: "light" | "dark";
}) {
  const eligible = isNasiyaEligible(total);
  const plan = calcNasiya(total, nasiyaMonths);
  const dark = variant === "dark";

  if (!eligible) {
    return (
      <div
        className={`rounded-xl px-3 py-2.5 text-xs ${
          dark
            ? "bg-white/10 text-white/75"
            : "border border-line bg-fog text-muted"
        }`}
      >
        To‘lov: to‘liq. Nasiya (bo‘lib to‘lash){" "}
        <span className={dark ? "text-cyan" : "font-semibold text-brand"}>
          {formatPrice(NASIYA_MIN_AMOUNT)}
        </span>{" "}
        dan boshlab.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p
        className={`text-sm font-semibold ${dark ? "text-white" : "text-brand"}`}
      >
        To‘lov usuli
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <MethodButton
          selected={value === "full"}
          onClick={() => onChange("full")}
          dark={dark}
          title="To‘liq to‘lov"
          subtitle={formatPrice(total)}
        />
        <MethodButton
          selected={value === "nasiya"}
          onClick={() => onChange("nasiya")}
          dark={dark}
          title="Nasiya (bo‘lib to‘lash)"
          subtitle={`Bosh to‘lov ${formatPrice(plan.downPayment)}`}
        />
      </div>

      {value === "nasiya" && (
        <>
          <div>
            <p
              className={`mb-2 text-xs font-semibold ${
                dark ? "text-white/80" : "text-muted"
              }`}
            >
              Nasiya muddati
            </p>
            <div className="grid grid-cols-3 gap-2">
              {NASIYA_MONTH_OPTIONS.map((m) => {
                const preview = calcNasiya(total, m);
                const selected = nasiyaMonths === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onNasiyaMonthsChange(m)}
                    className={`rounded-xl border px-2 py-2.5 text-center transition ${
                      selected
                        ? dark
                          ? "border-cyan bg-cyan/20 text-white"
                          : "border-accent bg-accent-tint text-accent shadow-sm"
                        : dark
                          ? "border-white/20 bg-white/5 text-white/75"
                          : "border-line bg-white text-slate-600"
                    }`}
                  >
                    <span className="block text-sm font-bold">{m} oy</span>
                    <span className="mt-0.5 block text-[10px] opacity-80">
                      jami {formatPrice(preview.totalPayable)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <dl
            className={`space-y-1.5 rounded-xl px-3 py-3 text-sm ${
              dark
                ? "bg-white/10 text-white/90"
                : "border border-cyan/30 bg-cyan/10 text-brand"
            }`}
          >
            <Row
              label="Bosh to‘lov (50%)"
              value={formatPrice(plan.downPayment)}
              dark={dark}
            />
            {plan.monthPayments.map((amount, i) => (
              <Row
                key={i}
                label={`${i + 1}-oy (+10%)`}
                value={formatPrice(amount)}
                dark={dark}
              />
            ))}
            <div
              className={`flex justify-between border-t pt-2 font-display font-bold ${
                dark ? "border-white/15 text-cyan" : "border-cyan/25 text-brand"
              }`}
            >
              <dt>Jami (nasiya)</dt>
              <dd>{formatPrice(plan.totalPayable)}</dd>
            </div>
          </dl>
        </>
      )}
    </div>
  );
}

function MethodButton({
  selected,
  onClick,
  dark,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  dark: boolean;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-3 text-left transition ${
        selected
          ? dark
            ? "border-cyan bg-cyan/20 text-white"
            : "border-cyan bg-cyan/15 text-brand shadow-sm"
          : dark
            ? "border-white/20 bg-white/5 text-white/80 hover:border-cyan/50"
            : "border-line bg-white text-muted hover:border-cyan/40"
      }`}
    >
      <span className="block text-sm font-semibold">{title}</span>
      <span
        className={`mt-0.5 block text-xs ${
          selected
            ? dark
              ? "text-cyan"
              : "text-brand/80"
            : dark
              ? "text-white/55"
              : "text-muted"
        }`}
      >
        {subtitle}
      </span>
    </button>
  );
}

function Row({
  label,
  value,
  dark,
}: {
  label: string;
  value: string;
  dark: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className={dark ? "text-white/70" : "text-muted"}>{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
