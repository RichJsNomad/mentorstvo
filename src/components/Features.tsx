const Icon = {
  mentor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="6" r="2.2" />
      <path d="M17 10c2.5 0 4 1.6 4 4" />
    </svg>
  ),
  live: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M10 10l4 2.5L10 15z" fill="currentColor" />
      <path d="M9 21h6" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4c4 0 6 2 6 6-3 0-5 1-6 3l-4-4c2-1 3-3 4-5z" />
      <path d="M10 13l-3 3" />
      <path d="M5 19l2-2" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="9" r="2.5" />
      <circle cx="17" cy="9" r="2.5" />
      <circle cx="12" cy="16" r="2.5" />
      <path d="M9 9h6" />
      <path d="M8.5 11l3 3.5" />
      <path d="M15.5 11l-3 3.5" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
      <path d="M3 13h18" />
    </svg>
  ),
};

export default function Features() {
  const items = [
    { icon: Icon.mentor, tag: "01", title: "Персональное менторство", desc: "1-on-1 сессии с senior-разработчиками. Реальный код-ревью, разбор твоих ошибок, индивидуальная траектория." },
    { icon: Icon.live, tag: "02", title: "Live coding, не записи", desc: "Уроки в прямом эфире. Задаёшь вопросы голосом, ментор пишет код вместе с тобой — как на работе." },
    { icon: Icon.rocket, tag: "03", title: "Реальные проекты", desc: "Не туториалы про «todo list». Делаешь сервисы с продакшен-стеком — то, что не стыдно показать на собесе." },
    { icon: Icon.stack, tag: "04", title: "Frontend и Backend", desc: "HTML, CSS, JS, React, Node.js, Python, базы данных. Полный путь от первой строки до фуллстек-разработчика." },
    { icon: Icon.community, tag: "05", title: "Сильное сообщество", desc: "Закрытый Discord, peer-review, парное программирование, поддержка 24/7. Ты не один в этом." },
    { icon: Icon.briefcase, tag: "06", title: "Карьерная поддержка", desc: "Резюме, mock-интервью, подготовка к алгоритмам, рекомендации в компании-партнёры." },
  ];

  return (
    <section id="features">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">Что внутри</div>
          <h2>Менторство, которое <span className="gradient">работает</span></h2>
          <p>Шесть вещей, которых нет на YouTube-курсах. Они и делают разницу между «прошёл туториал» и «получил оффер».</p>
        </div>
        <div className="features">
          {items.map((it) => (
            <div className="feature" key={it.title}>
              <div className="tag">{it.tag}</div>
              <div className="feature-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
