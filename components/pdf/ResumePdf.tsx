import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { GeneratedProfile } from "@/app/api/generate-profile/route";
import type { ResumeExtraData } from "@/components/ui/ResumeDataModal";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf", fontWeight: 700 },
  ],
});

const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    color: "#1e293b",
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 54,
    backgroundColor: "#ffffff",
  },

  // ── Header ──────────────────────────────────────────────
  name: { fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.2, marginBottom: 3 },
  subheader: { fontSize: 10.5, color: "#475569", marginBottom: 4 },
  contacts: { fontSize: 9.5, color: "#64748b" },

  // ── Section heading ──────────────────────────────────────
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.9,
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
  },

  // ── Body text ────────────────────────────────────────────
  bodyText: { fontSize: 10, color: "#334155", lineHeight: 1.55 },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillLabel: { fontSize: 10, fontWeight: 600, color: "#0f172a", width: 72 },
  skillValue: { fontSize: 10, color: "#334155", flex: 1, lineHeight: 1.45 },

  // ── Experience / Projects ────────────────────────────────
  item: { marginBottom: 13 },
  itemHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 1 },
  company: { fontSize: 10.5, fontWeight: 600, color: "#0f172a" },
  dates: { fontSize: 9, color: "#94a3b8" },
  position: { fontSize: 10, color: "#475569", marginBottom: 4 },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { fontSize: 10, color: "#94a3b8", width: 12, lineHeight: 1.5 },
  bulletText: { fontSize: 10, color: "#334155", lineHeight: 1.5, flex: 1 },

  // ── Education ────────────────────────────────────────────
  eduRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  eduUniversity: { fontSize: 10.5, fontWeight: 600, color: "#0f172a" },
  eduYear: { fontSize: 9, color: "#94a3b8" },
  eduDegree: { fontSize: 10, color: "#475569", marginTop: 1 },
});

function formatDate(dateStr: string | null, isCurrent: boolean): string {
  if (isCurrent) return "Present";
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function parseBullets(description: string): string[] {
  if (!description?.trim()) return [];
  return description
    .split("\n")
    .map((l) => l.replace(/^[\s\-–•·*]+/, "").trim())
    .filter((l) => l.length > 0);
}

type ExpItem = GeneratedProfile["workExperiences"][number];

function ExperienceItem({ exp }: { exp: ExpItem }) {
  const bullets = parseBullets(exp.description);
  return (
    <View style={s.item}>
      <View style={s.itemHeader}>
        <Text style={s.company}>{exp.company}</Text>
        <Text style={s.dates}>
          {formatDate(exp.start_date, false)} – {formatDate(exp.finish_date, exp.is_current)}
        </Text>
      </View>
      <Text style={s.position}>{exp.position}</Text>
      {bullets.map((b, i) => (
        <View key={i} style={s.bulletRow}>
          <Text style={s.bulletDot}>–</Text>
          <Text style={s.bulletText}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

type Props = { profile: GeneratedProfile; extraData: ResumeExtraData };

export default function ResumePdf({ profile, extraData }: Props) {
  const role = profile.workExperiences[0]?.position ?? null;

  const subheaderParts: string[] = [];
  if (role) subheaderParts.push(role);
  if (extraData.city) subheaderParts.push(extraData.city);
  if (profile.target_country) subheaderParts.push(`Open to Remote opportunities · ${profile.target_country}`);

  const contactParts: string[] = [];
  if (extraData.phone) contactParts.push(extraData.phone);
  if (profile.email) contactParts.push(profile.email);
  if (extraData.linkedin) contactParts.push(extraData.linkedin);
  if (extraData.github) contactParts.push(extraData.github);
  if (profile.english_grade) contactParts.push(`English: ${profile.english_grade}`);

  const hasEducation = !!extraData.university;

  return (
    <Document title="Resume — LinkedHire" author="LinkedHire" creator="LinkedHire">
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <Text style={s.name}>{extraData.name || "Your Name"}</Text>
        {subheaderParts.length > 0 && (
          <Text style={s.subheader}>{subheaderParts.join(" · ")}</Text>
        )}
        {contactParts.length > 0 && (
          <Text style={s.contacts}>{contactParts.join(" · ")}</Text>
        )}

        {/* ── Summary ── */}
        {(profile.resume_summary || profile.about) ? (
          <>
            <Text style={s.sectionTitle}>Summary</Text>
            <Text style={s.bodyText}>{profile.resume_summary || profile.about}</Text>
          </>
        ) : null}

        {/* ── Core Skills ── */}
        {profile.skills_json && Object.keys(profile.skills_json).length > 0 ? (
          <>
            <Text style={s.sectionTitle}>Core Skills</Text>
            {Object.entries(profile.skills_json).map(([group, items]) => (
              <View key={group} style={s.skillRow}>
                <Text style={s.skillLabel}>{group}:</Text>
                <Text style={s.skillValue}>{items.join(", ")}</Text>
              </View>
            ))}
          </>
        ) : profile.skills.length > 0 ? (
          <>
            <Text style={s.sectionTitle}>Core Skills</Text>
            <View style={s.skillRow}>
              <Text style={s.skillValue}>{profile.skills.join(", ")}</Text>
            </View>
          </>
        ) : null}

        {/* ── Experience ── */}
        {profile.workExperiences.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Experience</Text>
            {profile.workExperiences.map((exp) => (
              <ExperienceItem key={exp.id} exp={exp} />
            ))}
          </>
        )}


        {/* ── Education ── */}
        {hasEducation && (
          <>
            <Text style={s.sectionTitle}>Education</Text>
            <View style={s.eduRow}>
              <Text style={s.eduUniversity}>{extraData.university}</Text>
              {extraData.gradYear ? (
                <Text style={s.eduYear}>{extraData.gradYear}</Text>
              ) : null}
            </View>
            {extraData.degree ? (
              <Text style={s.eduDegree}>{extraData.degree}</Text>
            ) : null}
          </>
        )}

      </Page>
    </Document>
  );
}
