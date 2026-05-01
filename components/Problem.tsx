import { HiArrowRight } from "react-icons/hi2";

const POINTS = [
   {
      stat: "300+",
      title: "Конкурентов на одну вакансию",
      desc: "На типичную мидл-позицию приходят сотни заявок. Рекрутер тратит 5 секунд на резюме - и идёт дальше.",
   },
   {
      stat: "80%",
      title: "Откликов без ответа",
      desc: "Большинство заявок уходит в пустоту: автоматический отказ или полная тишина.",
   },
   {
      stat: null,
      title: "Опытные теряются среди сотен похожих",
      desc: "Даже Senior с 5+ годами опыта не попадает на собеседование - профиль ничем не выделяется.",
   },
   {
      stat: null,
      title: "hh.ru больше не даёт прежний результат",
      desc: "Российский рынок объективно сжался. Бесконечные отклики на hh - стратегия без выхода.",
   },
];

export default function Problem() {
   return (
      <section id="problem" className="py-10 relative">
         <hr className="divider mb-24" />
         <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="section-label mb-4 inline-flex">Какую проблему решаем?</span>
               <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-5"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Почему найти работу в IT
                  <br />
                  <span className="text-gradient">стало так сложно?</span>
               </h2>
               <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
                  Если отправляешь резюме на hh.ru и не получаешь ответов - это не твоя вина. Это
                  системная проблема рынка.{" "}
                  <a
                     href="/pochemu-slozhno-nayti-rabotu"
                     className="text-[#3B82F6] hover:underline font-medium"
                  >
                     Подробнее →
                  </a>
               </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
               {POINTS.map((p, i) => (
                  <div key={i} className="card p-6 flex gap-5 items-start">
                     {p.stat && (
                        <div
                           className="text-4xl font-black text-white shrink-0 leading-none"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           <span className="text-gradient">{p.stat}</span>
                        </div>
                     )}
                     <div>
                        <h3
                           className="text-white font-bold text-base mb-1.5"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           {p.title}
                        </h3>
                        <p className="text-[#64748B] text-sm leading-relaxed">{p.desc}</p>
                     </div>
                  </div>
               ))}
            </div>

            {/* <div className="mt-10 p-8 rounded-2xl border border-[#2563EB]/30 bg-linear-to-br from-[#2563EB]/8 to-[#06B6D4]/5 text-center">
               <p className="text-white font-bold text-xl mb-1">
                  Что делают те, кто всё же нашёл выход?
               </p>
               <p className="text-[#64748B] text-sm mt-2 max-w-xl mx-auto">
                  Перестают конкурировать на закрытом рынке и выходят на международный - без
                  переезда, в USD/EUR, с удалёнкой.
               </p>
               <a
                  href="#market"
                  className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-white font-semibold text-sm mt-5 transition-colors"
               >
                  Посмотреть, что даёт международный рынок
                  <HiArrowRight size={15} />
               </a>
            </div> */}
         </div>
      </section>
   );
}
