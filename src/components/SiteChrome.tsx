"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DELIVERY, OWNER_PHONE, TELEGRAM_URL } from "@/data/contact";
import { useStore } from "@/lib/store";

const links = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/katalog", label: "Katalog" },
  { href: "/haqida", label: "Kompaniya" },
  { href: "/yetkazib-berish", label: "Yetkazish" },
  { href: "/savol-javob", label: "FAQ" },
  { href: "/aloqa", label: "Aloqa" },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm">
            <Image
              src="/logo-mark.png"
              alt="smart.house777"
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
              priority
            />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            smart.house<span className="text-cyan">777</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-cyan-soft"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={OWNER_PHONE.telHref}
            className="hidden rounded-md px-2.5 py-2 text-sm font-semibold text-cyan hover:bg-white/10 sm:inline"
            aria-label={`Qo‘ng‘iroq: ${OWNER_PHONE.display}`}
          >
            {OWNER_PHONE.display}
          </a>
          <Link
            href="/sevimlilar"
            className="relative rounded-md p-2 text-white/85 hover:bg-white/10"
            aria-label="Sevimlilar"
          >
            <HeartIcon />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan px-1 text-[10px] font-bold text-brand">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/savat"
            className="relative rounded-md p-2 text-white/85 hover:bg-white/10"
            aria-label="Savat"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan px-1 text-[10px] font-bold text-brand">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/buyurtmalar"
            className="hidden rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 sm:inline"
          >
            Buyurtmalar
          </Link>
          <button
            type="button"
            className="rounded-md p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menyu"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-deep px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-white/90 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/buyurtmalar"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-white/90 hover:bg-white/10"
            >
              Buyurtmalarim
            </Link>
            <Link
              href="/qollab-quvvatlash"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-cyan"
            >
              Qo‘llab-quvvatlash
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 5h2l1.5 11h11L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19.5" r="1.3" fill="currentColor" />
      <circle cx="16.5" cy="19.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white">
              <Image
                src="/logo-mark.png"
                alt=""
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
              />
            </span>
            <span className="font-display text-xl font-semibold">
              smart.house<span className="text-cyan">777</span>
            </span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            O‘zbekiston uchun smart uy, xavfsizlik va IoT qurilmalari.
            Karnizlar, rele, Zigbee shlyuzlar, sensorlar va sensorni
            viklyuchatellar — bitta katalogda.
          </p>
          <p className="mt-3 text-sm text-cyan">{DELIVERY.tashkentFree}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-cyan">Sahifalar</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>
              <Link href="/katalog" className="hover:text-white">
                Katalog
              </Link>
            </li>
            <li>
              <Link href="/haqida" className="hover:text-white">
                Kompaniya haqida
              </Link>
            </li>
            <li>
              <Link href="/yetkazib-berish" className="hover:text-white">
                Yetkazib berish
              </Link>
            </li>
            <li>
              <Link href="/savol-javob" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cyan">Aloqa</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>
              <a href={OWNER_PHONE.telHref} className="hover:text-white">
                {OWNER_PHONE.display}
              </a>
            </li>
            <li>
              <Link href="/aloqa" className="hover:text-white">
                Konsultatsiya
              </Link>
            </li>
            <li>
              <Link href="/qollab-quvvatlash" className="hover:text-white">
                Qo‘llab-quvvatlash
              </Link>
            </li>
            <li>
              <a
                href={TELEGRAM_URL}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} smart.house777 — Smart uy katalogi
      </div>
    </footer>
  );
}
