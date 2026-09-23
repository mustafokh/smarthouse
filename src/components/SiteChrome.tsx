"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DELIVERY, OWNER_PHONE, TELEGRAM_URL } from "@/data/contact";
import { useStore } from "@/lib/store";
import { useI18n, type Lang } from "@/lib/i18n";

const linkDefs = [
  { href: "/", key: "nav_home" },
  { href: "/katalog", key: "nav_catalog" },
  { href: "/haqida", key: "nav_company" },
  { href: "/yetkazib-berish", key: "nav_delivery" },
  { href: "/aloqa", key: "nav_contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist } = useStore();
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-accent-tint shadow-sm">
            <Image
              src="/logo-mark.png"
              alt="smart.house777"
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
              priority
            />
          </span>
          <span className="font-display text-[1.05rem] font-bold tracking-tight text-slate-900">
            smart.house<span className="text-accent">777</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {linkDefs.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-accent-tint text-accent"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LangSwitch lang={lang} setLang={setLang} t={t} />
          <a
            href={OWNER_PHONE.telHref}
            className="hidden rounded-full bg-accent-tint px-3 py-2 text-xs font-semibold text-accent md:inline"
          >
            {OWNER_PHONE.display}
          </a>
          <Link
            href="/sevimlilar"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Sevimlilar"
          >
            <HeartIcon />
            {wishlist.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/savat"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-blue-500/25"
            aria-label="Savat"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menyu"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {linkDefs.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-accent-tint"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              href="/buyurtmalar"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-accent-tint"
            >
              {t("nav_orders")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 5h2l1.5 11h11L20 8H7"
        stroke="currentColor"
        strokeWidth="1.8"
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
  const { t } = useI18n();
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-accent-tint">
              <Image
                src="/logo-mark.png"
                alt=""
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
              />
            </span>
            <span className="font-display text-xl font-bold text-slate-900">
              smart.house<span className="text-accent">777</span>
            </span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {t("footer_tag")}
          </p>
          <p className="mt-3 text-sm font-medium text-accent">
            {DELIVERY.tashkentFree}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t("pages")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/katalog" className="hover:text-accent">
                {t("nav_catalog")}
              </Link>
            </li>
            <li>
              <Link href="/haqida" className="hover:text-accent">
                {t("company")}
              </Link>
            </li>
            <li>
              <Link href="/yetkazib-berish" className="hover:text-accent">
                {t("delivery")}
              </Link>
            </li>
            <li>
              <Link href="/savol-javob" className="hover:text-accent">
                {t("faq")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t("contact")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={OWNER_PHONE.telHref} className="hover:text-accent">
                {OWNER_PHONE.display}
              </a>
            </li>
            <li>
              <Link href="/aloqa" className="hover:text-accent">
                {t("consult")}
              </Link>
            </li>
            <li>
              <a
                href={TELEGRAM_URL}
                className="hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} smart.house777
      </div>
    </footer>
  );
}

function LangSwitch({
  lang,
  setLang,
  t,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
}) {
  return (
    <div className="flex items-center rounded-full bg-slate-100 p-0.5 text-xs font-bold">
      <button
        type="button"
        onClick={() => setLang("uz")}
        className={`rounded-full px-2.5 py-1.5 transition ${
          lang === "uz" ? "bg-white text-accent shadow-sm" : "text-slate-500"
        }`}
      >
        {t("lang_uz")}
      </button>
      <button
        type="button"
        onClick={() => setLang("ru")}
        className={`rounded-full px-2.5 py-1.5 transition ${
          lang === "ru" ? "bg-white text-accent shadow-sm" : "text-slate-500"
        }`}
      >
        {t("lang_ru")}
      </button>
    </div>
  );
}
