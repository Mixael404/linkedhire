import type { Metadata } from "next";
import { Geologica, Manrope } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import PostHogProvider from "@/components/PostHogProvider";

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
    "Работа в IT за рубежом | Удалёнка в USD/EUR для программистов | LinkedHire",
  description:
    "Не можешь найти работу программистом в России? Выход - удалённая работа в IT за рубежом. Оптимизируем LinkedIn под вакансии IT из США, Германии и Европы. Работа в IT, работа программистом, удалённая работа, вакансии IT.",
  keywords:
    "работа в it, работа программистом, удаленная работа, вакансии it, LinkedIn для программиста, как найти работу за границей программисту, валютная удалёнка, работа за рубежом разработчик, удалённая работа программист, вакансии программист, работа frontend разработчик, работа backend разработчик, remote работа разработчик",
  openGraph: {
    title: "Работа в IT за рубежом - LinkedHire | Удалёнка в USD/EUR",
    description:
      "Не можешь найти работу программистом? Выходи на международный рынок. Оптимизируем LinkedIn для получения офферов из США, Германии, Нидерландов. Для разработчиков из России, Беларуси, Казахстана.",
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
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          {children}
          <ToastProvider />
        </PostHogProvider>
      </body>
    </html>
  );
}
