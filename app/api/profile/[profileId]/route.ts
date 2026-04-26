import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_PROFILE_PRICE } from "@/lib/constants";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  const { profileId } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const [
    { data: workExperiences },
    { data: projects },
    { data: educations },
    { data: good },
  ] = await Promise.all([
    supabase
      .from("work_experiences")
      .select("*")
      .eq("profile_id", profileId)
      .order("start_date", { ascending: false }),
    supabase
      .from("projects")
      .select("*")
      .eq("profile_id", profileId)
      .order("start_date", { ascending: false }),
    supabase
      .from("educations")
      .select("*")
      .eq("profile_id", profileId)
      .order("start_date", { ascending: false }),
    supabase.from("goods").select("price").eq("name", "profile").single(),
  ]);

  const basePrice: number = good?.price ?? DEFAULT_PROFILE_PRICE;
  const price: number = profile.profile_price ?? basePrice;

  return NextResponse.json({
    ...profile,
    price,
    workExperiences: workExperiences ?? [],
    projects: projects ?? [],
    educations: educations ?? [],
  });
}
