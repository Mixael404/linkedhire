import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const profileId = searchParams.get("profileId");

  const urlError = searchParams.get("error");
  if (urlError === "access_denied") {
    return NextResponse.redirect(`${origin}/?error=link_expired`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/?error=profile_not_found`);
  }

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

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/?error=profile_not_found`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(`${origin}/?error=profile_not_found`);
  }

  const admin = createAdminClient();

  // Registration flow: profileId passed — save email to that profile
  if (profileId) {
    await admin
      .from("profiles")
      .update({ email: user.email })
      .eq("id", profileId)
      .is("email", null); // only update if email not already set
    return NextResponse.redirect(`${origin}/profile/${profileId}`);
  }

  // Login flow: find profile by email
  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("id")
    .eq("email", user.email)
    .single();

  if (profileError || !profile) {
    console.error("[auth/callback] profile lookup failed", { email: user.email, profileError });
    return NextResponse.redirect(`${origin}/?error=profile_not_found`);
  }

  return NextResponse.redirect(`${origin}/profile/${profile.id}`);
}
