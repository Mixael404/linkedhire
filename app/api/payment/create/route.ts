import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { profileId } = await req.json();

  if (!profileId) {
    return NextResponse.json({ error: "profileId required" }, { status: 400 });
  }

  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!shopId || !secretKey || !appUrl) {
    return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
  }

  const idempotenceKey = crypto.randomUUID();

  const ykResponse = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": idempotenceKey,
      Authorization: "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: { value: "899.00", currency: "RUB" },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `${appUrl}/payment/waiting?profileId=${profileId}`,
      },
      description: `LinkedHire — профиль ${profileId}`,
      metadata: { profile_id: profileId },
    }),
  });

  if (!ykResponse.ok) {
    const err = await ykResponse.json();
    console.error("[YooKassa create error]", err);
    return NextResponse.json({ error: "Failed to create payment" }, { status: 502 });
  }

  const payment = await ykResponse.json();

  return NextResponse.json({
    paymentId: payment.id,
    confirmationUrl: payment.confirmation.confirmation_url,
  });
}
