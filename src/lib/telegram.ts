import { colorLabels, formatPrice, getProductByCode } from "@/data/products";
import type { OrderRecord } from "@/lib/store";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatOrderTelegramMessage(order: OrderRecord): string {
  const itemLines = order.items.map((item) => {
    const product = getProductByCode(item.productId);
    const name = product?.nameUz ?? item.productId;
    const lineTotal = (product?.price ?? 0) * item.qty;
    return `• ${escapeHtml(name)} (${escapeHtml(colorLabels[item.color])}) × ${item.qty} — ${escapeHtml(formatPrice(lineTotal))}`;
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
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
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
