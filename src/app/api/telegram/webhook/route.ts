import { NextResponse } from "next/server";
import { handleTelegramUpdate } from "@/lib/telegram";

export const runtime = "nodejs";

/** Health check — Telegram only uses POST */
export async function GET() {
  return NextResponse.json({ ok: true, service: "telegram-webhook" });
}

export async function POST(request: Request) {
  try {
    const update = await request.json();
    await handleTelegramUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[telegram/webhook]", error);
    // Always 200 so Telegram doesn't retry forever on logic errors
    return NextResponse.json({ ok: true });
  }
}
