import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { GeneratedProfile } from "@/app/api/generate-profile/route";
import type { ResumeExtraData } from "@/components/ui/ResumeDataModal";

Font.register({
   family: "Inter",
   fonts: [
      {
         src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf",
         fontWeight: 400,
      },
      {
         src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
         fontWeight: 600,
      },
      {
         src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf",
         fontWeight: 700,
      },
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
   contacts: { fontSize: 9.5, color: "#64748b" }, // kept for TS compatibility

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
   skillLabel: { fontSize: 10, fontWeight: 600, color: "#0f172a", width: 96 },
   skillValue: { fontSize: 10, color: "#334155", flex: 1, lineHeight: 1.45 },
   contactItem: { fontSize: 9.5, color: "#64748b", marginBottom: 1.5 },

   // ── Experience / Projects ────────────────────────────────
   item: { marginBottom: 13 },
   itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 1,
   },
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

function formatDate(dateStr: string | null): string {
   if (!dateStr) return "";
   const d = new Date(dateStr);
   return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatDateRange(start: string | null, finish: string | null, isCurrent: boolean): string {
   const startStr = formatDate(start);
   const endStr = isCurrent ? "Present" : formatDate(finish);
   if (!startStr && !endStr) return "";
   if (!startStr) return endStr;
   if (!endStr) return startStr;
   return `${startStr} – ${endStr}`;
}

function parseBullets(description: string): string[] {
   if (!description?.trim()) return [];
   return description
      .split("\n")
      .map((l) => l.replace(/^[\s\-–•·*]+/, "").trim())
      .filter((l) => l.length > 0);
}

const TRANSLIT_MAP: Record<string, string> = {
   а: "a",
   б: "b",
   в: "v",
   г: "g",
   д: "d",
   е: "e",
   ё: "yo",
   ж: "zh",
   з: "z",
   и: "i",
   й: "y",
   к: "k",
   л: "l",
   м: "m",
   н: "n",
   о: "o",
   п: "p",
   р: "r",
   с: "s",
   т: "t",
   у: "u",
   ф: "f",
   х: "kh",
   ц: "ts",
   ч: "ch",
   ш: "sh",
   щ: "shch",
   ъ: "",
   ы: "y",
   ь: "",
   э: "e",
   ю: "yu",
   я: "ya",
   А: "A",
   Б: "B",
   В: "V",
   Г: "G",
   Д: "D",
   Е: "E",
   Ё: "Yo",
   Ж: "Zh",
   З: "Z",
   И: "I",
   Й: "Y",
   К: "K",
   Л: "L",
   М: "M",
   Н: "N",
   О: "O",
   П: "P",
   Р: "R",
   С: "S",
   Т: "T",
   У: "U",
   Ф: "F",
   Х: "Kh",
   Ц: "Ts",
   Ч: "Ch",
   Ш: "Sh",
   Щ: "Shch",
   Ъ: "",
   Ы: "Y",
   Ь: "",
   Э: "E",
   Ю: "Yu",
   Я: "Ya",
};

function translitCyrillic(text: string): string {
   return text
      .split("")
      .map((c) => TRANSLIT_MAP[c] ?? c)
      .join("");
}

type ExpItem = GeneratedProfile["workExperiences"][number];

// function ExperienceItem({ exp }: { exp: ExpItem }) {
//    const bullets = parseBullets(exp.description);
//    return (
//       <View style={s.item} wrap={true}>
//          <View style={s.itemHeader}>
//             <Text style={s.company}>{translitCyrillic(exp.company)}</Text>
//             <Text style={s.dates}>
//                {formatDate(exp.start_date, false)} – {formatDate(exp.finish_date, exp.is_current)}
//             </Text>
//          </View>
//          <Text style={s.position}>
//             {translitCyrillic(exp.position)}
//          </Text>
//          {bullets.map((b, i) => (
//             <View key={i} style={s.bulletRow}>
//                <Text style={s.bulletText}>- {b}</Text>
//             </View>
//          ))}
//       </View>
//    );
// }

function ExperienceItem({ exp }: { exp: ExpItem }) {
   const bullets = parseBullets(exp.description);

   return (
      <View
         style={{
            marginBottom: 12,
         }}
         wrap
      >
         <Text
            style={{
               fontSize: 10,
               lineHeight: 1.4,
            }}
         >
            {/* Header */}
            <Text style={{ fontWeight: 700 }}>
               {translitCyrillic(exp.company)}
            </Text>
            {"  "}
            <Text style={{ color: "#555" }}>
               {formatDateRange(exp.start_date, exp.finish_date, exp.is_current)}
            </Text>

            {"\n"}

            {/* Position */}
            <Text style={{ fontWeight: 500 }}>
               {translitCyrillic(exp.position)}
            </Text>

            {"\n"}

            {/* Bullets */}
            {bullets.map((b, i) => (
               <Text key={i}>
                  {"\n"}• {b}
               </Text>
            ))}
         </Text>
      </View>
   );
}

type Props = { profile: GeneratedProfile; extraData: ResumeExtraData };

const SKILL_GROUP_EN: Record<string, string> = {
   "Базы данных": "Databases",
   Тестирование: "Testing",
   Прочее: "Other",
};

function toEnGroup(group: string): string {
   return SKILL_GROUP_EN[group] ?? group;
}

function englishGradeDisplay(grade: string | null | undefined): string | null {
   if (!grade) return null;
   // Strip Russian sublabel: "C1 - Advanced" or "C1 - Продвинутый" → keep as-is if already EN
   // Format stored: "C1 - Advanced" (after our fix) or legacy "C1 - Продвинутый"
   const idx = grade.indexOf(" - ");
   if (idx === -1) return `English: ${grade}`;
   const level = grade.slice(0, idx);
   const sublabel = grade.slice(idx + 3);
   // If sublabel is Cyrillic, strip it; otherwise keep
   const isCyrillic = /[а-яёА-ЯЁ]/.test(sublabel);
   return isCyrillic ? `English: ${level}` : `English: ${level} (${sublabel})`;
}

export default function ResumePdf({ profile, extraData }: Props) {
   const sortedExperiences = [...profile.workExperiences].sort((a, b) => {
      if (!a.start_date && !b.start_date) return 0;
      if (!a.start_date) return 1;
      if (!b.start_date) return -1;
      return b.start_date.localeCompare(a.start_date);
   });

   const role = sortedExperiences[0]?.position ?? null;

   const subheaderParts: string[] = [];
   if (role) subheaderParts.push(role);
   if (profile.target_country) subheaderParts.push(`Open to Remote · ${profile.target_country}`);

   const contactParts: string[] = [];
   if (extraData.phone) contactParts.push(extraData.phone);
   if (profile.email) contactParts.push(profile.email);
   if (extraData.linkedin) contactParts.push(extraData.linkedin);
   if (extraData.github) contactParts.push(extraData.github);
   const englishLine = englishGradeDisplay(profile.english_grade);
   if (englishLine) contactParts.push(englishLine);

   const hasEducation = !!extraData.university;

   return (
      <Document title="Resume - LinkedHire" author="LinkedHire" creator="LinkedHire">
         <Page size="A4" style={s.page}>
            {/* ── Header ── */}
            <Text style={s.name}>{extraData.name || "Your Name"}</Text>
            {subheaderParts.length > 0 && (
               <Text style={s.subheader}>{subheaderParts.join(" · ")}</Text>
            )}
            {contactParts.length > 0 && (
               <View>
                  {contactParts.map((c, i) => (
                     <Text key={i} style={s.contactItem}>
                        {c}
                     </Text>
                  ))}
               </View>
            )}

            {/* ── Summary ── */}
            {profile.resume_summary || profile.about ? (
               <>
                  <Text style={s.sectionTitle} minPresenceAhead={40}>
                     Summary
                  </Text>
                  <Text style={s.bodyText}>{profile.resume_summary || profile.about}</Text>
               </>
            ) : null}

            {/* ── Core Skills ── */}
            {profile.skills_json && Object.keys(profile.skills_json).length > 0 ? (
               <>
                  <Text style={s.sectionTitle} minPresenceAhead={40}>
                     Core Skills
                  </Text>
                  {Object.entries(profile.skills_json).map(([group, items]) => (
                     <View key={group} style={s.skillRow}>
                        <Text style={s.skillLabel}>{toEnGroup(group)}:</Text>
                        <Text style={s.skillValue}>{items.join(", ")}</Text>
                     </View>
                  ))}
               </>
            ) : profile.skills.length > 0 ? (
               <>
                  <Text style={s.sectionTitle} minPresenceAhead={40}>
                     Core Skills
                  </Text>
                  <View style={s.skillRow}>
                     <Text style={s.skillValue}>{profile.skills.join(", ")}</Text>
                  </View>
               </>
            ) : null}

            {/* ── Experience ── */}
            {sortedExperiences.length > 0 && (
               <>
                  <Text style={s.sectionTitle} minPresenceAhead={60}>
                     Experience
                  </Text>
                  {sortedExperiences.map((exp) => (
                     <ExperienceItem key={exp.id} exp={exp} />
                  ))}
               </>
            )}

            {/* ── Education ── */}
            {hasEducation && (
               <>
                  <Text style={s.sectionTitle} minPresenceAhead={40}>
                     Education
                  </Text>
                  <View style={s.eduRow}>
                     <Text style={s.eduUniversity}>{extraData.university}</Text>
                     {extraData.gradYear ? (
                        <Text style={s.eduYear}>{extraData.gradYear}</Text>
                     ) : null}
                  </View>
                  {extraData.degree ? <Text style={s.eduDegree}>{extraData.degree} degree</Text> : null}
               </>
            )}
         </Page>
      </Document>
   );
}
