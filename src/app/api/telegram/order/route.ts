import { NextResponse } from "next/server";
import type { OrderRecord } from "@/lib/store";
import { formatOrderTelegramMessage, sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as OrderRecord;

    if (
      !order?.id ||
      !order?.name?.trim() ||
      !order?.phone?.trim() ||
      !Array.isArray(order.items) ||
      order.items.length === 0
    ) {
      return NextResponse.json(
        { error: "Buyurtma ma’lumotlari noto‘g‘ri" },
        { status: 400 },
      );
    }

    const message = formatOrderTelegramMessage(order);
    await sendTelegramMessage(message);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[telegram/order]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Telegramga yuborishda xatolik",
      },
      { status: 500 },
    );
  }
}
