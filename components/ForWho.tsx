const groups = [
   {
      emoji: "💻",
      title: "Разработчики, которые хотят найти работу за рубежом",
      desc: "Вакансии IT в США и Европе открыты для удалённых специалистов - но попасть в поиск рекрутеров без правильного профиля почти невозможно.",
   },
   {
      emoji: "🌍",
      title: "Те, кто ищет работу на удалёнке в валюте",
      desc: "Работа на удалёнке - уже не привилегия, а стандарт для международных IT-компаний. LinkedHire настраивает профиль именно под remote-позиции.",
   },
   {
      emoji: "📄",
      title: "Те, кому нужно готовое резюме под международный рынок",
      desc: "Не конструктор резюме с пустыми шаблонами - а полноценный профессиональный профиль, сгенерированный на основе вашего реального опыта.",
   },
   {
      emoji: "🚀",
      title: "Специалисты, которые хотят получать отклики, а не рассылать их",
      desc: "Оптимизированный LinkedIn превращает пассивный поиск в активный входящий поток: рекрутеры сами находят вас по релевантным запросам.",
   },
];

export default function ForWho() {
   return (
      <section className="py-20 bg-[#0A0D1F]">
         <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
               <span className="section-label mb-4 inline-flex">Для кого</span>
               <h2
                  className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4"
                  style={{ fontFamily: "var(--font-geologica)" }}
               >
                  Кому подходит LinkedHire
               </h2>
               <p className="text-[#64748B] text-lg max-w-xl mx-auto">
                  Если вы IT-специалист из России, Беларуси или Казахстана и хотите
                  выйти на международный рынок - этот инструмент для вас.
               </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
               {groups.map((g) => (
                  <div key={g.title} className="card p-6 flex gap-4 items-start">
                     <div className="text-3xl shrink-0">{g.emoji}</div>
                     <div>
                        <h3
                           className="text-white font-bold text-base mb-2 leading-snug"
                           style={{ fontFamily: "var(--font-geologica)" }}
                        >
                           {g.title}
                        </h3>
                        <p className="text-[#64748B] text-sm leading-relaxed">{g.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
