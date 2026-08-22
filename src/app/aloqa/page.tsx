"use client";

import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/ProductCard";
import { DELIVERY, OWNER_PHONE, TELEGRAM_URL } from "@/data/contact";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const key = "sh777_inquiries";
    const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
    prev.unshift({
      id: `INQ-${Date.now()}`,
      name,
      phone,
      message,
      at: new Date().toISOString(),
    });
    localStorage.setItem(key, JSON.stringify(prev));
    setSent(true);
    setName("");
    setPhone("");
    setMessage("");
  }

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Aloqa"
          title="Konsultatsiya so‘rash"
          subtitle="Loyiha, o‘rnatish yoki tanlash bo‘yicha yozing — yoki to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qiling."
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={OWNER_PHONE.telHref}
            className="rounded-xl bg-cyan px-5 py-3 text-sm font-bold text-brand"
          >
            {OWNER_PHONE.display}
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-brand"
          >
            Telegram
          </a>
        </div>
        <p className="mt-3 text-sm text-muted">{DELIVERY.tashkentFree}</p>

        {sent ? (
          <div className="mt-8 rounded-2xl border border-cyan/40 bg-cyan/10 p-8 text-center">
            <p className="font-display text-xl font-bold text-brand">
              So‘rov yuborildi
            </p>
            <p className="mt-2 text-sm text-muted">
              Tez orada {OWNER_PHONE.display} orqali bog‘lanamiz.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-sm font-semibold text-cyan"
            >
              Yana yuborish
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-line bg-white p-6"
          >
            <label className="block">
              <span className="text-sm font-medium">Ism *</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Telefoningiz *</span>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Xabar</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan py-3.5 text-sm font-bold text-brand hover:bg-cyan-soft"
            >
              Yuborish
            </button>
            <p className="text-center text-xs text-muted">
              Yoki qo‘ng‘iroq:{" "}
              <a href={OWNER_PHONE.telHref} className="font-semibold text-brand">
                {OWNER_PHONE.display}
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
