import { colorLabels, formatPrice, getProductByCode, products } from "@/data/products";
import type { OrderRecord } from "@/lib/store";
import {
  adjustStockQty,
  appendExpense,
  appendOrder,
  computeStats,
  getAdminChatIds,
  loadFinanceStore,
  rememberAdminChatId,
  resolveStockQty,
  setStockQty,
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

  const method = order.paymentMethod ?? "full";
  const paymentLines =
    method === "nasiya" && order.nasiyaPlan
      ? [
          "",
          `<b>To‘lov — Nasiya (${order.nasiyaPlan.months} oy, +${Math.round((order.nasiyaPlan.markupPercent ?? order.nasiyaPlan.months * 0.1) * 100)}%)</b>`,
          `• Bosh to‘lov (50%): ${escapeHtml(formatPrice(order.nasiyaPlan.downPayment))}`,
          ...(order.nasiyaPlan.monthPayments?.length
            ? order.nasiyaPlan.monthPayments.map(
                (amount, i) =>
                  `• ${i + 1}-oy: ${escapeHtml(formatPrice(amount))}`,
              )
            : [
                `• Oyiga: ${escapeHtml(formatPrice(order.nasiyaPlan.monthlyWithFee))} × ${order.nasiyaPlan.months} oy`,
              ]),
          `• <b>Jami (nasiya):</b> ${escapeHtml(formatPrice(order.nasiyaPlan.totalPayable))}`,
        ]
      : ["", `<b>To‘lov:</b> To‘liq to‘lov — ${escapeHtml(formatPrice(order.total))}`];

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
    `<b>Mahsulotlar jami:</b> ${escapeHtml(formatPrice(order.total))}`,
    ...paymentLines,
    order.needsInstall
      ? `<b>O‘rnatish:</b> ✅ Kerak (narx kelishuv asosida)`
      : `<b>O‘rnatish:</b> ❌ Kerak emas`,
    `<b>Yetkazish:</b> Toshkent shahar bo‘ylab bepul`,
    "",
    "<i>/statistika · /oylik · /sklad · /balans</i>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendTelegramMessage(
  text: string,
  chatId?: string,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN sozlanmagan");
  }

  const candidates: string[] = [];
  if (chatId) candidates.push(chatId);
  for (const id of envAdminIds()) {
    if (!candidates.includes(id)) candidates.push(id);
  }
  for (const id of await getAdminChatIds()) {
    if (!candidates.includes(id)) candidates.push(id);
  }

  if (candidates.length === 0) {
    throw new Error("TELEGRAM_CHAT_ID sozlanmagan va admin chat hali yo‘q");
  }

  let lastError = "";
  for (const target of candidates) {
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

    if (response.ok) return;
    lastError = await response.text();
    // Explicit chatId (webhook reply) — don't silently try others
    if (chatId) break;
  }

  throw new Error(`Telegram API xatoligi: ${lastError}`);
}

function envAdminIds(): string[] {
  return (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function isAdmin(chatId: number | string): Promise<boolean> {
  const id = String(chatId);
  const envIds = envAdminIds();
  if (envIds.includes(id)) return true;
  const stored = await getAdminChatIds();
  if (stored.includes(id)) return true;
  // No configured admins yet — first interactors are allowed
  if (envIds.length === 0 && stored.length === 0) return true;
  return false;
}

function helpText(): string {
  return [
    "🤖 <b>smart.house777 — boshqaruv boti</b>",
    "",
    "Buyurtmalar saytdan kelganda shu yerga tushadi.",
    "",
    "<b>Sotuv:</b>",
    "/statistika — umumiy sotuv",
    "/oylik — joriy oy hisoboti",
    "/oylik 2026-09 — tanlangan oy",
    "/buyurtmalar — so‘nggi buyurtmalar",
    "/kirim · /chiqim 50 izoh · /chiqimlar · /balans",
    "/mahsulotlar — eng ko‘p sotilganlar",
    "",
    "<b>Sklad (qoldiq):</b>",
    "/sklad — barcha qoldiqlar",
    "/qoldiq VKL-001 — bitta mahsulot (rang + rasm)",
    "/sklad_set VKL-001 white 30 — qoldiqni belgilash",
    "/sklad_plus VKL-001 white 5 — kirim",
    "/sklad_minus VKL-001 white 2 — chiqim",
    "",
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

export async function sendTelegramPhoto(
  photoUrl: string,
  caption: string,
  chatId: string,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendPhoto`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        photo: photoUrl,
        caption,
        parse_mode: "HTML",
      }),
    },
  );
  if (!response.ok) {
    console.error("[telegram photo]", await response.text());
  }
}

function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.smarthouse777.uz"
  );
}

function absoluteProductImage(
  productId: string,
  color: string,
): string | null {
  const p = getProductByCode(productId);
  if (!p) return null;
  const path =
    p.imagesByColor?.[color as keyof typeof p.imagesByColor] ?? p.image;
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${siteOrigin()}${path}`;
}

function formatSkladList(
  stock: Record<string, number> | undefined,
): string {
  const lines: string[] = ["📦 <b>Sklad qoldiqlari</b>", ""];
  let totalUnits = 0;
  for (const p of products) {
    const parts = p.colors.map((c) => {
      const q = resolveStockQty(stock, p.id, c);
      totalUnits += q;
      return `${colorLabels[c]}:${q}`;
    });
    lines.push(
      `• <b>${escapeHtml(p.code)}</b> ${escapeHtml(p.nameUz)} — ${parts.join(" · ")}`,
    );
  }
  lines.push("", `Jami dona: <b>${totalUnits}</b>`);
  lines.push("<i>Batafsil: /qoldiq VKL-001</i>");
  return lines.join("\n");
}

function parseColorToken(raw: string): string | null {
  const map: Record<string, string> = {
    white: "white",
    oq: "white",
    black: "black",
    qora: "black",
    gold: "gold",
    oltin: "gold",
    gray: "gray",
    grey: "gray",
    kulrang: "gray",
    rgb: "rgb",
    yellow: "yellow",
    sariq: "yellow",
    pink: "pink",
    pushti: "pink",
    teal: "teal",
  };
  return map[raw.toLowerCase()] ?? null;
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

  const reply = async (body: string) =>
    sendTelegramMessage(body, String(chatId));

  // Always answer /start and /yordam so the owner never sees silence
  // even if TELEGRAM_CHAT_ID env is missing or wrong.
  if (command === "/start" || command === "/yordam" || command === "/help") {
    const envIds = envAdminIds();
    const id = String(chatId);
    if (envIds.length === 0 || !envIds.includes(id)) {
      await rememberAdminChatId(id);
    }
    await reply(helpText());
    return;
  }

  if (!(await isAdmin(chatId))) {
    await reply("⛔ Bu bot faqat smart.house777 admini uchun.");
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

  if (command === "/sklad" || command === "/qoldiqlar") {
    await reply(formatSkladList(store.stock));
    return;
  }

  if (command === "/qoldiq") {
    const code = arg.trim().split(/\s+/)[0];
    if (!code) {
      await reply("Misol: <code>/qoldiq VKL-001</code>");
      return;
    }
    const product = getProductByCode(code);
    if (!product) {
      await reply(`Mahsulot topilmadi: ${escapeHtml(code)}`);
      return;
    }
    const lines = [
      `📦 <b>${escapeHtml(product.code)}</b> — ${escapeHtml(product.nameUz)}`,
      `💰 ${escapeHtml(formatPrice(product.price))}`,
      "",
    ];
    for (const c of product.colors) {
      const q = resolveStockQty(store.stock, product.id, c);
      lines.push(`• ${colorLabels[c]}: <b>${q}</b> dona`);
    }
    await reply(lines.join("\n"));

    // Send one photo per color (max 5) so admin sees stickers/colors
    for (const c of product.colors.slice(0, 5)) {
      const url = absoluteProductImage(product.id, c);
      if (!url) continue;
      const q = resolveStockQty(store.stock, product.id, c);
      await sendTelegramPhoto(
        url,
        `${product.code} · ${colorLabels[c]} · qoldiq: ${q}`,
        String(chatId),
      );
    }
    return;
  }

  if (
    command === "/sklad_set" ||
    command === "/sklad_plus" ||
    command === "/sklad_minus"
  ) {
    const parts = arg.trim().split(/\s+/);
    if (parts.length < 3) {
      await reply(
        "Misol:\n<code>/sklad_set VKL-001 white 30</code>\n<code>/sklad_plus VKL-001 white 5</code>\n<code>/sklad_minus VKL-001 black 2</code>",
      );
      return;
    }
    const [code, colorRaw, qtyRaw] = parts;
    const product = getProductByCode(code);
    const color = parseColorToken(colorRaw);
    const qty = Number(qtyRaw);
    if (!product) {
      await reply(`Mahsulot topilmadi: ${escapeHtml(code)}`);
      return;
    }
    if (!color || !product.colors.includes(color as (typeof product.colors)[number])) {
      await reply(
        `Rang noto‘g‘ri. Mavjud: ${product.colors.map((c) => colorLabels[c]).join(", ")}`,
      );
      return;
    }
    if (!Number.isFinite(qty) || qty < 0) {
      await reply("Miqdor noto‘g‘ri.");
      return;
    }

    let next = 0;
    if (command === "/sklad_set") {
      next = await setStockQty(product.id, color, qty);
    } else if (command === "/sklad_plus") {
      next = await adjustStockQty(product.id, color, qty);
    } else {
      next = await adjustStockQty(product.id, color, -qty);
    }

    await reply(
      `✅ Sklad yangilandi\n${escapeHtml(product.code)} · ${colorLabels[color as keyof typeof colorLabels]} → <b>${next}</b> dona`,
    );
    return;
  }

  await reply("Noma’lum buyruq. /yordam ni bosing.");
}
