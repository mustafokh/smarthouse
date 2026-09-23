/** Uzum-style colorful category stickers with custom SVG icons */

const GRADIENTS: Record<string, string> = {
  viklyuchatellar: "from-[#FF6B6B] to-[#FF8E53]",
  rele: "from-[#4FACFE] to-[#00F2FE]",
  sensorlar: "from-[#43E97B] to-[#38F9D7]",
  shlyuzlar: "from-[#FA709A] to-[#FEE140]",
  karnizlar: "from-[#A18CD1] to-[#FBC2EB]",
  iqlim: "from-[#F6D365] to-[#FDA085]",
  yoritish: "from-[#667EEA] to-[#764BA2]",
  kolonkalar: "from-[#F093FB] to-[#F5576C]",
};

export function CategorySticker({
  categoryId,
  className = "",
}: {
  categoryId: string;
  className?: string;
}) {
  const gradient = GRADIENTS[categoryId] ?? "from-[#3b82f6] to-[#60a5fa]";

  return (
    <span
      className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.35rem] bg-gradient-to-br ${gradient} shadow-[0_12px_28px_-10px_rgba(15,23,42,0.35)] ring-1 ring-white/40 ${className}`}
    >
      <span className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-white/20" />
      <span className="absolute -bottom-4 -left-2 h-12 w-12 rounded-full bg-black/10" />
      <span className="relative z-[1] text-white drop-shadow-sm">
        <CategoryGlyph id={categoryId} />
      </span>
    </span>
  );
}

function CategoryGlyph({ id }: { id: string }) {
  switch (id) {
    case "viklyuchatellar":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="8" y="4" width="16" height="24" rx="3" fill="white" fillOpacity="0.95" />
          <circle cx="16" cy="14" r="3.2" stroke="#FF6B6B" strokeWidth="2" />
          <rect x="14.5" y="20" width="3" height="4" rx="1" fill="#FF6B6B" />
        </svg>
      );
    case "rele":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="5" y="8" width="22" height="16" rx="3" fill="white" fillOpacity="0.95" />
          <path d="M9 20v3M13 20v3M17 20v3M23 20v3" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <rect x="9" y="11" width="10" height="5" rx="1" fill="#38bdf8" />
        </svg>
      );
    case "sensorlar":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <circle cx="12" cy="16" r="5" fill="white" fillOpacity="0.95" />
          <rect x="17" y="12" width="5" height="8" rx="1.5" fill="white" fillOpacity="0.95" />
          <path d="M22 10c3 2 3 10 0 12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M25 7c5 3.5 5 14.5 0 18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        </svg>
      );
    case "shlyuzlar":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M6 14L16 6l10 8v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V14z" fill="white" fillOpacity="0.95" />
          <circle cx="16" cy="17" r="3" fill="#ec4899" />
          <path d="M16 14.5v5M13.5 17h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "karnizlar":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M4 10h24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M6 10c2 6 4 12 4 16M12 10c1.5 5 2.5 11 2.5 16M18 10c1.5 5 2.5 11 2.5 16M24 10c1 5 2 11 2 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
          <circle cx="6" cy="10" r="2" fill="#c4b5fd" />
          <circle cx="26" cy="10" r="2" fill="#c4b5fd" />
        </svg>
      );
    case "iqlim":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="12" y="4" width="8" height="16" rx="4" fill="white" fillOpacity="0.95" />
          <circle cx="16" cy="24" r="5" fill="white" fillOpacity="0.95" />
          <path d="M16 10v10" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="24" r="2" fill="#f97316" />
        </svg>
      );
    case "yoritish":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M16 4c-4.4 0-8 3.4-8 7.6 0 2.8 1.5 5.2 3.8 6.5V22h8.4v-3.9c2.3-1.3 3.8-3.7 3.8-6.5C24 7.4 20.4 4 16 4z" fill="white" fillOpacity="0.95" />
          <rect x="13" y="22" width="6" height="3" rx="1" fill="#a78bfa" />
          <path d="M13 26h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "kolonkalar":
      return (
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="8" y="5" width="16" height="22" rx="4" fill="white" fillOpacity="0.95" />
          <circle cx="16" cy="14" r="4.5" fill="#f43f5e" />
          <circle cx="16" cy="14" r="2" fill="white" />
          <rect x="12" y="22" width="8" height="2" rx="1" fill="#fda4af" />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="7" y="7" width="18" height="18" rx="4" fill="white" fillOpacity="0.95" />
        </svg>
      );
  }
}
