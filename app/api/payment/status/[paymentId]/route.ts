import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

// function getSupabaseAdmin() {
//   const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
//   const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
//   return createClient(url, key);
// }

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> },
) {
  const { paymentId } = await params;
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;

  if (!shopId || !secretKey) {
    return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
  }

  const ykResponse = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    headers: {
      Authorization: "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64"),
    },
  });

  if (!ykResponse.ok) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const payment = await ykResponse.json();
  if (payment.status === "succeeded" && payment.paid) {
    const profileId = payment.metadata?.profile_id;
    if (profileId) {
      await supabase
        .from("profiles")
        .update({ is_purchased: true })
        .eq("id", profileId)
        .eq("is_purchased", false);
    }
  }

  return NextResponse.json({ status: payment.status, paid: payment.paid });
}
