const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function maskText(text: string, visibleCount: number): string {
  if (visibleCount >= text.length) return text;

  const masked = text
    .slice(visibleCount)
    .split("")
    .map((char) => {
      if (char === " " || char === "\n") return char;
      return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
    })
    .join("");

  return text.slice(0, visibleCount) + masked;
}
