import { colorLabels, formatPrice, getProductByCode } from "@/data/products";
import type { OrderRecord } from "@/lib/store";
import {
  appendExpense,
  appendOrder,
  computeStats,
  loadFinanceStore,
  type ExpenseRecord,
} from "@/lib/finance-store";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function money(n: number): string {
  return `${n.toFixed(n % 1 === 0 ? 0 : 2)}$`;
}

function monthName(year: number, month: number): string {
  return new Date(year, month - 1, 1).toLocaleDateString("uz-UZ", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tashkent",
  });
}

export function formatOrderTelegramMessage(order: OrderRecord): string {
  const itemLines = order.items.map((item) => {
    const product = getProductByCode(item.productId);
    const name = product?.nameUz ?? item.productId;
    const unit = product?.price ?? 0;
    const lineTotal = unit * item.qty;
    return `• ${escapeHtml(name)} (${escapeHtml(colorLabels[item.color] ?? item.color)}) × ${item.qty} — ${escapeHtml(formatPrice(lineTotal))}`;
  });

  const created = new Date(order.createdAt).toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
  });

  return [
    "🛒 <b>Yangi buyurtma — smart.house777</b>",
    "",
    `<b>ID:</b> ${escapeHtml(order.id)}`,
    `<b>Sana:</b> ${escapeHtml(created)}`,
    "",
    "<b>Mijoz</b>",
    `👤 ${escapeHtml(order.name)}`,
    `📞 ${escapeHtml(order.phone)}`,
    order.address ? `📍 ${escapeHtml(order.address)}` : null,
    order.note ? `💬 ${escapeHtml(order.note)}` : null,
    "",
    "<b>Mahsulotlar</b>",
    ...itemLines,
    "",
    `<b>Jami:</b> ${escapeHtml(formatPrice(order.total))}`,
    `<b>Yetkazish:</b> Toshkent shahar bo‘ylab bepul`,
    "",
    "<i>/statistika · /oylik · /balans</i>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendTelegramMessage(
  text: string,
  chatId?: string,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const target = chatId ?? process.env.TELEGRAM_CHAT_ID;

  if (!token || !target) {
    throw new Error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: target,
        text,
        parse_mode: "HTML",
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API xatoligi: ${response.status} ${body}`);
  }
}

function isAdmin(chatId: number | string): boolean {
  const allowed = (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true;
  return allowed.includes(String(chatId));
}

function helpText(): string {
  return [
    "🤖 <b>smart.house777 — boshqaruv boti</b>",
    "",
    "Buyurtmalar saytdan kelganda shu yerga tushadi.",
    "",
    "<b>Buyruqlar:</b>",
    "/statistika — umumiy sotuv",
    "/oylik — joriy oy hisoboti",
    "/oylik 2026-09 — tanlangan oy",
    "/buyurtmalar — so‘nggi buyurtmalar",
    "/kirim — jami kirim (sotuv)",
    "/chiqim 50 yetkazish — chiqim qo‘shish",
    "/chiqimlar — so‘nggi chiqimlar",
    "/balans — kirim − chiqim",
    "/mahsulotlar — eng ko‘p sotilganlar",
    "/yordam — shu menyu",
  ].join("\n");
}

function formatOverallStats(storeAwait: Awaited<ReturnType<typeof loadFinanceStore>>): string {
  const s = computeStats(storeAwait);
  return [
    "📊 <b>Umumiy statistika</b>",
    "",
    `🛒 Buyurtmalar: <b>${s.totalOrders}</b>`,
    `💰 Kirim (sotuv): <b>${money(s.totalIncome)}</b>`,
    `💸 Chiqim: <b>${money(s.totalExpense)}</b>`,
    `📈 Balans: <b>${money(s.balance)}</b>`,
    "",
    `<b>${escapeHtml(monthName(s.year, s.month))}</b>`,
    `• Buyurtmalar: ${s.monthOrders}`,
    `• Kirim: ${money(s.monthIncome)}`,
    `• Chiqim: ${money(s.monthExpense)}`,
    `• Oy balansi: ${money(s.monthBalance)}`,
  ].join("\n");
}

function formatMonthly(
  store: Awaited<ReturnType<typeof loadFinanceStore>>,
  year: number,
  month: number,
): string {
  const s = computeStats(store, year, month);
  const lines = s.monthOrderList.slice(0, 15).map((o) => {
    const when = new Date(o.createdAt).toLocaleDateString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });
    return `• ${escapeHtml(o.id)} — ${escapeHtml(o.name)} — ${money(o.total)} (${when})`;
  });

  const expLines = s.monthExpenseList.slice(0, 10).map((e) => {
    const when = new Date(e.createdAt).toLocaleDateString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });
    return `• −${money(e.amount)} — ${escapeHtml(e.note)} (${when})`;
  });

  return [
    `📅 <b>Oylik hisobot — ${escapeHtml(monthName(year, month))}</b>`,
    "",
    `🛒 Buyurtmalar: <b>${s.monthOrders}</b>`,
    `💰 Kirim: <b>${money(s.monthIncome)}</b>`,
    `💸 Chiqim: <b>${money(s.monthExpense)}</b>`,
    `📈 Balans: <b>${money(s.monthBalance)}</b>`,
    "",
    "<b>Buyurtmalar</b>",
    lines.length ? lines.join("\n") : "• Bu oyda buyurtma yo‘q",
    "",
    "<b>Chiqimlar</b>",
    expLines.length ? expLines.join("\n") : "• Bu oyda chiqim yo‘q",
  ].join("\n");
}

function formatOrdersList(orders: OrderRecord[]): string {
  if (!orders.length) return "Hali buyurtma yo‘q.";
  const lines = orders.slice(0, 12).map((o) => {
    const when = new Date(o.createdAt).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });
    const items = o.items
      .map((i) => {
        const p = getProductByCode(i.productId);
        return `${p?.nameUz ?? i.productId}×${i.qty}`;
      })
      .join(", ");
    return [
      `🧾 <b>${escapeHtml(o.id)}</b> — ${money(o.total)}`,
      `👤 ${escapeHtml(o.name)} · ${escapeHtml(o.phone)}`,
      `📦 ${escapeHtml(items)}`,
      `🕒 ${escapeHtml(when)}`,
      "",
    ].join("\n");
  });
  return ["📋 <b>So‘nggi buyurtmalar</b>", "", ...lines].join("\n");
}

function formatExpenses(expenses: ExpenseRecord[]): string {
  if (!expenses.length) return "Chiqimlar yo‘q. Qo‘shish: /chiqim 50 izoh";
  const lines = expenses.slice(0, 15).map((e) => {
    const when = new Date(e.createdAt).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });
    return `• −${money(e.amount)} — ${escapeHtml(e.note)} (${escapeHtml(when)})`;
  });
  return ["💸 <b>So‘nggi chiqimlar</b>", "", ...lines].join("\n");
}

function formatTopProducts(
  store: Awaited<ReturnType<typeof loadFinanceStore>>,
): string {
  const map = new Map<string, { qty: number; revenue: number; name: string }>();
  for (const order of store.orders) {
    for (const item of order.items) {
      const p = getProductByCode(item.productId);
      const unit = p?.price ?? 0;
      const prev = map.get(item.productId) ?? {
        qty: 0,
        revenue: 0,
        name: p?.nameUz ?? item.productId,
      };
      prev.qty += item.qty;
      prev.revenue += unit * item.qty;
      map.set(item.productId, prev);
    }
  }
  const top = [...map.values()].sort((a, b) => b.qty - a.qty).slice(0, 15);
  if (!top.length) return "Hali sotuv yo‘q.";
  return [
    "🏆 <b>Eng ko‘p sotilgan mahsulotlar</b>",
    "",
    ...top.map(
      (t, i) =>
        `${i + 1}. ${escapeHtml(t.name)} — <b>${t.qty}</b> dona · ${money(t.revenue)}`,
    ),
  ].join("\n");
}

function parseMonthArg(arg?: string): { year: number; month: number } | null {
  if (!arg) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  const m = arg.match(/^(\d{4})-(\d{1,2})$/);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  if (month < 1 || month > 12) return null;
  return { year, month };
}

export async function notifyNewOrder(order: OrderRecord): Promise<void> {
  await appendOrder(order);
  await sendTelegramMessage(formatOrderTelegramMessage(order));
}

export async function handleTelegramUpdate(update: {
  message?: {
    chat: { id: number };
    text?: string;
    from?: { id: number; first_name?: string };
  };
}): Promise<void> {
  const message = update.message;
  if (!message?.text) return;

  const chatId = message.chat.id;
  const text = message.text.trim();
  const [commandRaw, ...rest] = text.split(/\s+/);
  const command = commandRaw.split("@")[0].toLowerCase();
  const arg = rest.join(" ").trim();

  if (!isAdmin(chatId)) {
    await sendTelegramMessage(
      "⛔ Bu bot faqat smart.house777 admini uchun.",
      String(chatId),
    );
    return;
  }

  const reply = async (body: string) =>
    sendTelegramMessage(body, String(chatId));

  if (command === "/start" || command === "/yordam" || command === "/help") {
    await reply(helpText());
    return;
  }

  const store = await loadFinanceStore();

  if (command === "/statistika" || command === "/stats") {
    await reply(formatOverallStats(store));
    return;
  }

  if (command === "/oylik" || command === "/hisobot") {
    const parsed = parseMonthArg(arg || undefined);
    if (!parsed) {
      await reply("Format: /oylik yoki /oylik 2026-09");
      return;
    }
    await reply(formatMonthly(store, parsed.year, parsed.month));
    return;
  }

  if (command === "/buyurtmalar" || command === "/orders") {
    await reply(formatOrdersList(store.orders));
    return;
  }

  if (command === "/kirim" || command === "/income") {
    const s = computeStats(store);
    await reply(
      [
        "💰 <b>Kirim (sotuv)</b>",
        "",
        `Umumiy: <b>${money(s.totalIncome)}</b>`,
        `Bu oy: <b>${money(s.monthIncome)}</b>`,
        `Buyurtmalar: ${s.totalOrders}`,
      ].join("\n"),
    );
    return;
  }

  if (command === "/chiqim" || command === "/expense") {
    const match = arg.match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/);
    if (!match) {
      await reply("Misol: <code>/chiqim 50 yetkazib berish</code>");
      return;
    }
    const amount = Number(match[1].replace(",", "."));
    const note = match[2].trim() || "Chiqim";
    if (!(amount > 0)) {
      await reply("Summa 0 dan katta bo‘lishi kerak.");
      return;
    }
    const expense = await appendExpense(amount, note);
    const s = computeStats(await loadFinanceStore());
    await reply(
      [
        "✅ Chiqim qo‘shildi",
        `💸 −${money(expense.amount)} — ${escapeHtml(expense.note)}`,
        "",
        `Jami chiqim: <b>${money(s.totalExpense)}</b>`,
        `Balans: <b>${money(s.balance)}</b>`,
      ].join("\n"),
    );
    return;
  }

  if (command === "/chiqimlar" || command === "/expenses") {
    await reply(formatExpenses(store.expenses));
    return;
  }

  if (command === "/balans" || command === "/balance") {
    const s = computeStats(store);
    await reply(
      [
        "📈 <b>Balans</b>",
        "",
        `💰 Kirim: <b>${money(s.totalIncome)}</b>`,
        `💸 Chiqim: <b>${money(s.totalExpense)}</b>`,
        `📊 Sof: <b>${money(s.balance)}</b>`,
        "",
        `<b>${escapeHtml(monthName(s.year, s.month))}</b>: ${money(s.monthBalance)}`,
      ].join("\n"),
    );
    return;
  }

  if (command === "/mahsulotlar" || command === "/products") {
    await reply(formatTopProducts(store));
    return;
  }

  await reply("Noma’lum buyruq. /yordam ni bosing.");
}
