"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/data/products";
import { DELIVERY, OWNER_PHONE } from "@/data/contact";
import { createOrderRecord } from "@/lib/order";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ProductCard";

export default function CheckoutPage() {
  const { cart, cartTotal, commitOrder } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-muted">Savat bo‘sh — avval mahsulot tanlang.</p>
        <Link
          href="/katalog"
          className="mt-6 inline-block rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-brand"
        >
          Katalog
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Ism va telefon majburiy.");
      return;
    }

    setError("");
    setSubmitting(true);

    const order = createOrderRecord(cart, { name, phone, address, note });

    try {
      const response = await fetch("/api/telegram/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "Buyurtmani yuborishda xatolik. Qayta urinib ko‘ring.");
        setSubmitting(false);
        return;
      }

      commitOrder(order);
      router.push(`/buyurtmalar?ok=${order.id}`);
    } catch {
      setError("Tarmoq xatoligi — internetni tekshirib, qayta urinib ko‘ring.");
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Buyurtma"
          title="Rasmiylashtirish"
          subtitle={`Jami ${formatPrice(cartTotal)} · ${DELIVERY.shortCheckout}`}
        />

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm"
        >
          <Field label="Ism familiya *" value={name} onChange={setName} />
          <Field
            label="Telefon *"
            value={phone}
            onChange={setPhone}
          />
          <Field
            label="Manzil"
            value={address}
            onChange={setAddress}
            placeholder="Toshkent, …"
          />
          <label className="block">
            <span className="text-sm font-medium text-brand">Izoh</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
            />
          </label>
          <p className="rounded-xl bg-cyan/10 px-3 py-2 text-xs text-brand">
            {DELIVERY.tashkentFree}
          </p>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-cyan py-3.5 text-sm font-bold text-brand hover:bg-cyan-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Yuborilmoqda…" : "Buyurtmani yuborish"}
          </button>
          <p className="text-center text-xs text-muted">
            Savol bo‘lsa:{" "}
            <a href={OWNER_PHONE.telHref} className="font-semibold text-brand">
              {OWNER_PHONE.display}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-brand">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan/40"
      />
    </label>
  );
}
