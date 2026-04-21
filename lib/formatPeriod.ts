const MONTHS = [
   "jan.", "feb.", "mar.", "apr.", "may", "jun.",
   "jul.", "aug.", "sep.", "oct.", "nov.", "dec.",
];

function fmt(date: Date): string {
   return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatPeriod(
   start_date: string | null,
   finish_date: string | null,
   is_current: boolean,
): string {
   if (!start_date) return "";

   const start = new Date(start_date);
   const end = is_current ? new Date() : finish_date ? new Date(finish_date) : null;

   const startStr = fmt(start);
   const endStr = is_current ? "present" : end ? fmt(end) : "";

   let duration = "";
   if (end) {
      const totalMonths =
         (end.getFullYear() - start.getFullYear()) * 12 +
         (end.getMonth() - start.getMonth());
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;

      if (years > 0 && months > 0) duration = `${years}y. ${months}m.`;
      else if (years > 0) duration = `${years}y.`;
      else if (months > 0) duration = `${months}m.`;
   }

   return `${startStr} – ${endStr}${duration ? ` · ${duration}` : ""}`;
}
