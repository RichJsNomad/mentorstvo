export default function Testimonials() {
  const items = [
    {
      quote: "Прошла Pro за 7 месяцев. До этого год пыталась учить React по ютубу — застревала на каждом шаге. Здесь ментор просто разобрал со мной живой код, и всё встало на места.",
      name: "Марина Кузнецова",
      role: "Frontend Developer · Acme",
      av: "",
    },
    {
      quote: "После менторства устроился джуниор-бэкендером в первый же месяц поиска. Главное — мне дали понимание системы, а не набор костылей с курса.",
      name: "Артём Соколов",
      role: "Node.js Engineer · Northwind",
      av: "v2",
    },
    {
      quote: "Сменила профессию в 32. Думала, поздно, но сообщество и ментор не дали бросить. Сейчас работаю в продуктовой команде и не верю, что это случилось со мной.",
      name: "Екатерина Орлова",
      role: "Fullstack Developer · Volta",
      av: "v3",
    },
  ];

  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">Истории студентов</div>
          <h2>Реальные люди, реальные офферы</h2>
          <p>Не «успешный успех». Те, кто начинал с нуля или менял карьеру — и дошёл.</p>
        </div>
        <div className="testimonials">
          {items.map((t) => (
            <div key={t.name} className="testimonial">
              <div className="stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.85 5L8 12.3 3.55 14.7l.85-5L.8 6.2l5-.7z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-quote">«{t.quote}»</p>
              <div className="testimonial-author">
                <div className={`av-placeholder ${t.av}`} />
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
