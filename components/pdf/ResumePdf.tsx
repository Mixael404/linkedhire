import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { GeneratedProfile } from "@/app/api/generate-profile/route";

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
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 48,
    backgroundColor: "#ffffff",
  },

  // ── Header ────────────────────────────────────────────
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  name: { fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.3 },
  country: { fontSize: 9, color: "#64748b", marginTop: 2 },
  headline: { fontSize: 11, color: "#334155", marginTop: 6, lineHeight: 1.5 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#e2e8f0", marginVertical: 14 },

  // ── Section ───────────────────────────────────────────
  sectionTitle: { fontSize: 9, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 },

  // ── About ─────────────────────────────────────────────
  bodyText: { fontSize: 10, color: "#334155", lineHeight: 1.65 },

  // ── Experience ────────────────────────────────────────
  expItem: { marginBottom: 14 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 },
  expCompany: { fontSize: 11, fontWeight: 600, color: "#0f172a" },
  expDates: { fontSize: 9, color: "#94a3b8" },
  expPosition: { fontSize: 10, color: "#475569", marginBottom: 4 },
  expDesc: { fontSize: 10, color: "#334155", lineHeight: 1.65 },

  // ── Skills ────────────────────────────────────────────
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillPill: { backgroundColor: "#f1f5f9", borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, fontSize: 9, color: "#334155" },
});

function formatDate(dateStr: string | null, isCurrent: boolean): string {
  if (isCurrent) return "по н.в.";
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", { month: "short", year: "numeric" });
}

type Props = { profile: GeneratedProfile };

export default function ResumePdf({ profile }: Props) {
  return (
    <Document
      title="Resume — LinkedHire"
      author="LinkedHire"
      creator="LinkedHire"
    >
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.headerRow}>
          <View>
            <Text style={s.name}>LinkedIn Profile</Text>
            {profile.target_country && (
              <Text style={s.country}>{profile.target_country}</Text>
            )}
          </View>
        </View>

        {profile.headline ? (
          <Text style={s.headline}>{profile.headline}</Text>
        ) : null}

        <View style={s.divider} />

        {/* ── About ── */}
        {profile.about ? (
          <View style={{ marginBottom: 16 }}>
            <Text style={s.sectionTitle}>О себе</Text>
            <Text style={s.bodyText}>{profile.about}</Text>
          </View>
        ) : null}

        {/* ── Experience ── */}
        {profile.workExperiences.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={s.sectionTitle}>Опыт работы</Text>
            {profile.workExperiences.map((exp) => (
              <View key={exp.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.expCompany}>{exp.company}</Text>
                  <Text style={s.expDates}>
                    {formatDate(exp.start_date, false)} – {formatDate(exp.finish_date, exp.is_current)}
                  </Text>
                </View>
                <Text style={s.expPosition}>{exp.position}</Text>
                {exp.description ? (
                  <Text style={s.expDesc}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* ── Projects ── */}
        {profile.projects.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={s.sectionTitle}>Проекты</Text>
            {profile.projects.map((proj) => (
              <View key={proj.id} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.expCompany}>{proj.company}</Text>
                  <Text style={s.expDates}>
                    {formatDate(proj.start_date, false)} – {formatDate(proj.finish_date, proj.is_current)}
                  </Text>
                </View>
                <Text style={s.expPosition}>{proj.position}</Text>
                {proj.description ? (
                  <Text style={s.expDesc}>{proj.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* ── Skills ── */}
        {profile.skills.length > 0 && (
          <View>
            <Text style={s.sectionTitle}>Навыки</Text>
            <View style={s.skillsWrap}>
              {profile.skills.map((skill, i) => (
                <Text key={i} style={s.skillPill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
}
