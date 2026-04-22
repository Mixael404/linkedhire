import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { generateProfileContent } from "@/lib/generateProfile";

// Allow up to 5 minutes for OpenAI calls
export const maxDuration = 300;

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  const { profileId } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_purchased, is_generated")
    .eq("id", profileId)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  if (!profile.is_purchased) {
    return NextResponse.json({ error: "Profile not purchased" }, { status: 403 });
  }

  if (profile.is_generated) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    await generateProfileContent(profileId, supabase);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[generate-profile-content error]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 502 });
  }
}
