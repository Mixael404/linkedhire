import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

export const CLUSTER = [
   {
      href: "/pochemu-ne-otvechayut-na-rezyume",
      title: "Почему не отвечают на резюме программисту",
      desc: "Главная статья кластера: ATS, первые 6 секунд, ключевые слова",
      tag: "Главная",
   },
   {
      href: "/pochemu-net-otklikov-na-hh",
      title: "Почему нет откликов на hh.ru",
      desc: "Как работает алгоритм hh и почему 300+ конкурентов - это норма",
   },
   {
      href: "/pochemu-rekrutery-ne-otvechayut",
      title: "Почему рекрутеры не отвечают",
      desc: "Как рекрутер выбирает из сотен кандидатов и что заставляет ответить",
   },
   {
      href: "/pochemu-linkedin-ne-pokazyvaet",
      title: "Почему LinkedIn не показывает тебя рекрутерам",
      desc: "Алгоритм поиска LinkedIn и как в него попасть",
   },
   {
      href: "/kak-proyti-ats-filtr",
      title: "Как пройти ATS-фильтр",
      desc: "Что такое ATS, какие ошибки убивают резюме до человека",
   },
   {
      href: "/pochemu-ne-beryut-na-rabotu-programmistom",
      title: "Почему не берут на работу программистом",
      desc: "Квалификация тут ни при чём - дело в упаковке опыта",
   },
   {
      href: "/chto-ne-tak-s-rezyume",
      title: "Что не так с моим резюме",
      desc: "Чек-лист: 6 типичных ошибок которые срезают шансы",
   },
   {
      href: "/pochemu-slozhno-nayti-rabotu",
      title: "Почему сложно найти работу в IT",
      desc: "Системный разбор рынка: статистика, причины, выход",
   },
];

interface ClusterLinksProps {
   currentHref: string;
}

export default function ClusterLinks({ currentHref }: ClusterLinksProps) {
   const others = CLUSTER.filter((a) => a.href !== currentHref);

   return (
      <section className="mt-16 pt-10 border-t border-[#1B2847]">
         <p
            className="text-white font-bold text-lg mb-6"
            style={{ fontFamily: "var(--font-geologica)" }}
         >
            Читать по теме
         </p>
         <div className="grid sm:grid-cols-2 gap-3">
            {others.map((a) => (
               <Link
                  key={a.href}
                  href={a.href}
                  className="card p-4 group hover:border-[#2563EB]/40 transition-colors"
               >
                  <div className="flex items-start justify-between gap-3">
                     <div>
                        {a.tag && (
                           <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
                              {a.tag} ·{" "}
                           </span>
                        )}
                        <p className="text-white text-sm font-semibold group-hover:text-[#3B82F6] transition-colors">
                           {a.title}
                        </p>
                        <p className="text-[#475569] text-xs mt-1 leading-relaxed">{a.desc}</p>
                     </div>
                     <HiArrowRight
                        className="text-[#475569] group-hover:text-[#3B82F6] transition-colors shrink-0 mt-0.5"
                        size={16}
                     />
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
}
