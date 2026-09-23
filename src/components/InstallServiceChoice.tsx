"use client";

type Props = {
  value: boolean | null;
  onChange: (needsInstall: boolean) => void;
  variant?: "dark" | "light";
};

export function InstallServiceChoice({
  value,
  onChange,
  variant = "light",
}: Props) {
  const dark = variant === "dark";
  const card = dark
    ? "border-white/20 bg-white/5 text-white"
    : "border-line bg-fog text-brand";
  const selected = dark
    ? "border-cyan bg-cyan/20 ring-2 ring-cyan/40"
    : "border-cyan bg-cyan/10 ring-2 ring-cyan/30";
  const muted = dark ? "text-white/70" : "text-muted";

  return (
    <div className="space-y-2">
      <p className={`text-sm font-semibold ${dark ? "text-white" : "text-brand"}`}>
        O‘rnatib berish xizmati kerakmi?
      </p>
      <p className={`text-xs ${muted}`}>
        Narxi kelishuv asosida. Majburiy emas — kerak bo‘lmasa «Kerak emas» ni
        tanlang.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
            value === true ? selected : card
          }`}
        >
          <span className="block font-bold">Ha, kerak</span>
          <span className={`mt-0.5 block text-xs ${muted}`}>
            O‘rnatish — kelishiladi
          </span>
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
            value === false ? selected : card
          }`}
        >
          <span className="block font-bold">Kerak emas</span>
          <span className={`mt-0.5 block text-xs ${muted}`}>
            O‘zim o‘rnataman
          </span>
        </button>
      </div>
    </div>
  );
}
