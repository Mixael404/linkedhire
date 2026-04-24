import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  const { profileId } = await params;

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  if (existing && existing.id !== profileId) {
    return NextResponse.json(
      { error: "Этот email уже привязан к другому профилю" },
      { status: 409 },
    );
  }

  const { error } = await admin
    .from("profiles")
    .update({ email: user.email })
    .eq("id", profileId);

  if (error) {
    return NextResponse.json(
      { error: "Не удалось сохранить email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
