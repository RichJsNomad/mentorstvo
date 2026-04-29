export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <h2>
            Начни свой путь в программировании <span className="gradient">сегодня</span>
          </h2>
          <p>Первая неделя бесплатно. Без кредитной карты. Без обязательств.</p>
          <button className="btn btn-primary btn-lg">
            Начать обучение бесплатно
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10" />
              <path d="M9 4l4 4-4 4" />
            </svg>
          </button>
          <div className="cta-fine">→ присоединяйся к 1000+ студентам</div>
        </div>
      </div>
    </section>
  );
}
