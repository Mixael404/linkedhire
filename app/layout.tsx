import type { Metadata } from "next";
import { Geologica, Manrope } from "next/font/google";
import "./globals.css";

const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geologica",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "LinkedHire - LinkedIn-профиль для работы за границей | Удалённая работа разработчик",
  description:
    "Оптимизируем LinkedIn-профиль русскоязычных разработчиков под международный рынок. Работа за границей, удалённая работа в USD/EUR. Как найти работу за рубежом через LinkedIn.",
  keywords:
    "LinkedIn профиль, работа за границей, удалённая работа разработчик, как найти работу за рубежом, LinkedIn для программиста, международная работа разработчик, оптимизация LinkedIn",
  openGraph: {
    title: "LinkedHire - Твой LinkedIn для работы за границей",
    description:
      "Превращаем LinkedIn-профиль разработчика в инструмент получения офферов из США и Европы.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geologica.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
