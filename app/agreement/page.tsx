import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | LinkedHire",
};

export default function AgreementPage() {
  return (
    <div className="min-h-screen bg-[#07091A] text-[#CBD5E1]">
      <div className="max-w-3xl mx-auto px-6 py-16">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#3B82F6] text-sm hover:underline mb-10 block"
        >
          ← На главную
        </Link>

        <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-geologica)" }}>
          Пользовательское Соглашение
        </h1>

        <div className="space-y-8 text-sm leading-relaxed">

          <div className="space-y-3">
            <p>
              Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между
              владельцем{" "}
              <a href="https://linkedhire.io" className="text-[#3B82F6] hover:underline">https://linkedhire.io</a>
              {" "}(далее LinkedHire или Администрация) с одной стороны и пользователем сайта с другой.
            </p>
            <p>Сайт LinkedHire не является средством массовой информации.</p>
            <p className="border-l-2 border-[#2563EB] pl-4 text-[#94A3B8]">
              Используя сайт, Вы соглашаетесь с условиями данного соглашения.<br />
              Если Вы не согласны с условиями данного соглашения, не используйте сайт LinkedHire!
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">Предмет соглашения</h2>
            <p className="mb-3">Администрация предоставляет пользователю право на размещение на сайте следующей информации:</p>
            <ul className="space-y-1 pl-4">
              <li>— Текстовой информации</li>
              <li>— Ссылок на материалы, размещенные на других сайтах</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-4">Права и обязанности сторон</h2>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">Пользователь имеет право:</h3>
                <ul className="space-y-1 pl-4">
                  <li>— осуществлять поиск информации на сайте</li>
                  <li>— получать информацию на сайте</li>
                  <li>— создавать информацию для сайта</li>
                  <li>— использовать информацию сайта в личных некоммерческих целях</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">Администрация имеет право:</h3>
                <ul className="space-y-1 pl-4">
                  <li>— по своему усмотрению и необходимости создавать, изменять, отменять правила</li>
                  <li>— ограничивать доступ к любой информации на сайте</li>
                  <li>— создавать, изменять, удалять информацию</li>
                  <li>— удалять учетные записи</li>
                  <li>— отказывать в регистрации без объяснения причин</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">Пользователь обязуется:</h3>
                <ul className="space-y-1 pl-4">
                  <li>— обеспечивать сохранность личных данных от доступа третьих лиц</li>
                  <li>— не нарушать работоспособность сайта</li>
                  <li>— не использовать скрипты (программы) для автоматизированного сбора информации и/или взаимодействия с Сайтом и его Сервисами</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">Администрация обязуется:</h3>
                <ul className="space-y-1 pl-4">
                  <li>— поддерживать работоспособность сайта за исключением случаев, когда это невозможно по независящим от Администрации причинам</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">Ответственность сторон</h2>
            <ul className="space-y-2 pl-4">
              <li>— пользователь лично несет полную ответственность за распространяемую им информацию</li>
              <li>— администрация не несет никакой ответственности за достоверность информации, скопированной из других источников</li>
              <li>— администрация не несёт ответственность за несовпадение ожидаемых Пользователем и реально полученных услуг</li>
              <li>— администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами</li>
              <li>— в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации, размещённой Пользователем, а также бесперебойную работу информационного ресурса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">Условия действия Соглашения</h2>
            <div className="space-y-2">
              <p>Данное Соглашение вступает в силу при любом использовании данного сайта.</p>
              <p>Соглашение перестает действовать при появлении его новой версии.</p>
              <p>Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.</p>
              <p>Администрация не оповещает пользователей об изменении в Соглашении.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
