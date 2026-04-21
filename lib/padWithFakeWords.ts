const CHARS = "abcdefghijklmnopqrstuvwxyz";

function randomWord(): string {
   const len = Math.floor(Math.random() * 10) + 3; // 3–12 chars
   return Array.from({ length: len }, () =>
      CHARS[Math.floor(Math.random() * CHARS.length)]
   ).join("");
}

/**
 * Pads `text` with random fake words (3–12 chars each) up to `targetLength`.
 * Returns the original text unchanged if it already meets or exceeds the target.
 */
export function padWithFakeWords(text: string, targetLength: number): string {
   if (text.length >= targetLength) return text;

   let result = text;

   while (result.length < targetLength) {
      const word = randomWord();
      const candidate = result + " " + word;
      if (candidate.length > targetLength) {
         // Fit remaining space exactly with truncated filler
         const remaining = targetLength - result.length - 1; // -1 for space
         if (remaining >= 3) {
            result += " " + word.slice(0, remaining);
         }
         break;
      }
      result = candidate;
   }

   return result;
}
