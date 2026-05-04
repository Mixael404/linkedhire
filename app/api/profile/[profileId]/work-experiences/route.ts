import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

interface WorkExperienceInput {
  company: string;
  position: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  tasks: string[];
  technologies: string[];
  achievements: string[];
  needsAchievementHelp: boolean;
  projectType?: string;
  projectRole?: string;
  projectUrl?: string;
}

function toDate(month: string, year: string): string | null {
  if (!month || !year) return null;
  return `${year}-${month}-01`;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  const { profileId } = await params;

  let body: { workExperiences: WorkExperienceInput[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { workExperiences } = body;
  if (!Array.isArray(workExperiences) || workExperiences.length === 0) {
    return NextResponse.json({ error: "workExperiences required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", profileId)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Save raw input if input_resume exists for this profile
  const { data: resume } = await supabase
    .from("input_resumes")
    .select("id")
    .eq("profile_id", profileId)
    .single();

  if (resume) {
    const inputRows = workExperiences.map((exp) => ({
      input_resume_id: resume.id,
      company: exp.company,
      position: exp.position,
      start_date: toDate(exp.startMonth, exp.startYear),
      end_date: exp.isCurrent ? null : toDate(exp.endMonth, exp.endYear),
      is_current: exp.isCurrent,
      tasks: exp.tasks,
      technologies: exp.technologies,
      achievements: exp.achievements,
      project_type: exp.projectType || null,
      project_role: exp.projectRole || null,
      project_url: exp.projectUrl || null,
    }));

    await supabase.from("input_work_experiences").insert(inputRows);
  }

  const sharedRows = workExperiences.map((exp) => ({
    profile_id: profileId,
    company: exp.company,
    position: exp.position,
    start_date: toDate(exp.startMonth, exp.startYear),
    finish_date: exp.isCurrent ? null : toDate(exp.endMonth, exp.endYear),
    is_current: exp.isCurrent,
    description: "",
  }));

  const { error: workExpError } = await supabase
    .from("work_experiences")
    .insert(sharedRows);

  if (workExpError) {
    console.error("[work-experiences insert error]", workExpError);
    return NextResponse.json({ error: "Failed to save work experiences" }, { status: 500 });
  }

  await supabase.from("projects").insert(sharedRows);

  // Reset is_generated so the page re-triggers AI generation on reload
  await supabase
    .from("profiles")
    .update({ is_generated: false })
    .eq("id", profileId);

  return NextResponse.json({ ok: true });
}
