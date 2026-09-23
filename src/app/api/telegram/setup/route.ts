import { NextResponse } from "next/server";

const COMMANDS = [
  { command: "start", description: "Bot menyusi" },
  { command: "statistika", description: "Umumiy sotuv statistikasi" },
  { command: "oylik", description: "Oylik hisobot" },
  { command: "buyurtmalar", description: "So‘nggi buyurtmalar" },
  { command: "kirim", description: "Jami kirim (sotuv)" },
  { command: "chiqim", description: "Chiqim qo‘shish: /chiqim 50 izoh" },
  { command: "chiqimlar", description: "Chiqimlar ro‘yxati" },
  { command: "balans", description: "Kirim − chiqim" },
  { command: "mahsulotlar", description: "Eng ko‘p sotilganlar" },
  { command: "yordam", description: "Yordam" },
];

export async function GET(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "TELEGRAM_BOT_TOKEN yo‘q" },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const expected = process.env.TELEGRAM_SETUP_SECRET ?? "smarthouse777";
  if (secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://smarthouse777.uz");

  const webhookUrl = `${origin.replace(/\/$/, "")}/api/telegram/webhook`;

  const setWebhook = await fetch(
    `https://api.telegram.org/bot${token}/setWebhook`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ["message"],
        drop_pending_updates: true,
      }),
    },
  ).then((r) => r.json());

  const setCommands = await fetch(
    `https://api.telegram.org/bot${token}/setMyCommands`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commands: COMMANDS }),
    },
  ).then((r) => r.json());

  const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then(
    (r) => r.json(),
  );

  return NextResponse.json({
    ok: true,
    webhookUrl,
    setWebhook,
    setCommands,
    bot: me,
  });
}
