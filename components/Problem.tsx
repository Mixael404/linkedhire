import {
  HiArrowTrendingDown,
  HiUserGroup,
  HiBanknotes,
  HiXCircle,
  HiAcademicCap,
  HiLockClosed,
  HiArrowRight,
} from "react-icons/hi2";
import { ReactNode } from "react";

const marketProblems: {
  icon: ReactNode;
  title: string;
  desc: string;
  tag: string;
}[] = [
  {
    icon: <HiArrowTrendingDown size={22} />,
    title: "Рынок IT в России сужается",
    desc: "После 2022 года многие зарубежные компании ушли с российского рынка. Оставшиеся замораживают найм или оптимизируют штат. Качественных вакансий для опытных разработчиков становится меньше с каждым кварталом.",
    tag: "Меньше вакансий",
  },
  {
    icon: <HiUserGroup size={22} />,
    title: "300–500 конкурентов на одну позицию",
    desc: "На типичную мидл-вакансию на hh.ru приходят сотни откликов. Рекрутеры физически не могут рассмотреть каждое резюме — твоя заявка уходит в корзину после пяти секунд просмотра.",
    tag: "Огромная конкуренция",
  },
  {
    icon: <HiBanknotes size={22} />,
    title: "Зарплаты в рублях не растут",
    desc: "Инфляция съедает реальную покупательную способность. Компании держат зарплатный уровень на месте, а рост расходов делает любые прибавки незаметными. Работать больше — получать столько же.",
    tag: "Падение доходов",
  },
  {
    icon: <HiXCircle size={22} />,
    title: "Сотни однотипных отказов",
    desc: "Откликаешься на десятки вакансий — получаешь автоматические отказы или просто тишину. На собеседование попасть всё сложнее даже с реальным опытом в 5+ лет и сильным стеком.",
    tag: "Нет ответов",
  },
  {
    icon: <HiAcademicCap size={22} />,
    title: "Рынок затопили выпускники курсов",
    desc: "Десятки тысяч выпускников IT-курсов ежегодно выходят на рынок с минимальным опытом и готовы работать дёшево. Компании выбирают самых дешёвых — опытные разработчики проигрывают по цене.",
    tag: "Демпинг",
  },
  {
    icon: <HiLockClosed size={22} />,
    title: "Карьерный рост заблокирован",
    desc: "Позиций для роста меньше, команды не расширяются, интересных задач всё меньше. Многие Senior-разработчики годами стоят на одном месте без перспектив — ни новых задач, ни повышения, ни смысла.",
    tag: "Потолок карьеры",
  },
];

const keyFacts = [
  { value: "−40%", label: "открытых вакансий в IT за последние 2 года" },
  { value: "300+", label: "откликов в среднем на одну мидл-позицию" },
  {
    value: "80%",
    label: "откликов остаются без ответа или приходит авто-отказ",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 relative">
      <hr className="divider mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex">Проблема</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-6"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Почему найти работу в IT
            <br />
            <span className="text-gradient">стало так сложно?</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
            Российский IT-рынок переживает структурный кризис. Если ты
            отправляешь резюме на hh.ru и не получаешь ответов — это не твоя
            вина. Это системная проблема рынка, с которой столкнулись тысячи
            разработчиков.
          </p>
        </div>

        {/* Problem cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {marketProblems.map((p, i) => (
            <div key={i} className="card p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="icon-box text-[#3B82F6]">{p.icon}</div>
                <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest bg-[#2563EB]/10 border border-[#2563EB]/20 px-2 py-0.5 rounded-full">
                  {p.tag}
                </span>
              </div>
              <h3
                className="text-white font-bold text-base mb-3"
                style={{ fontFamily: "var(--font-geologica)" }}
              >
                {p.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed flex-1">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Key facts strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {keyFacts.map((f) => (
            <div
              key={f.value}
              className="p-5 rounded-xl border border-[#1B2847] bg-[#0D1426] text-center"
            >
              <div
                className="text-3xl font-black text-white mb-1"
                style={{ fontFamily: "var(--font-geologica)" }}
              >
                {f.value}
              </div>
              <div className="text-[#64748B] text-sm">{f.label}</div>
            </div>
          ))}
        </div>

        {/* Long-form context block */}
        <div className="card p-8 mb-10">
          <h3
            className="text-white font-black text-xl mb-4"
            style={{ fontFamily: "var(--font-geologica)" }}
          >
            Это не вопрос твоей квалификации
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 text-[#94A3B8] text-sm leading-relaxed">
            <p>
              Если ты разработчик с реальным опытом — React, Python, Java, Go,
              DevOps — и всё равно не можешь найти нормальную работу в IT, это
              не потому что ты недостаточно хорош. Российский рынок IT
              объективно стал тесным: меньше вакансий, больше кандидатов, ниже
              бюджеты на найм.
            </p>
            <p>
              Компании массово срезают расходы. Многие оффшорные центры
              закрылись. Стартапы не растут — они выживают. Крупные корпорации
              не расширяют разработку — они автоматизируют. В этой ситуации
              продолжать бесконечно откликаться на hh.ru — это стратегия без
              выхода.
            </p>
          </div>
        </div>

        {/* Transition block */}
        <div className="p-8 rounded-2xl border border-[#2563EB]/30 bg-linear-to-br from-[#2563EB]/8 to-[#06B6D4]/5 text-center">
          <p className="text-[#94A3B8] text-base mb-2">
            Что делают те, кто всё же нашёл выход?
          </p>
          <p className="text-white font-bold text-xl mb-1">
            Перестают конкурировать на закрытом рынке и выходят на международный
          </p>
          <p className="text-[#64748B] text-sm mt-3 max-w-xl mx-auto">
            Удалённая работа в IT за рубежом — это не мечта о переезде. Это
            рабочая альтернатива, которую выбирают тысячи разработчиков из
            России, Беларуси и Казахстана прямо сейчас.
          </p>
          <a
            href="#market"
            className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-white font-semibold text-sm mt-5 transition-colors"
          >
            Посмотреть, что даёт международный рынок
            <HiArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
