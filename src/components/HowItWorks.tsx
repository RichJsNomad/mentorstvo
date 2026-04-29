export default function HowItWorks() {
  return (
    <section id="how" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.015), transparent)" }}>
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">Три шага</div>
          <h2>От первой строки до оффера</h2>
          <p>Понятный путь без размытых обещаний. Ты всегда знаешь, что делаешь сегодня и зачем.</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">STEP_01<span className="bar" /></div>
            <h3>Выбери трек</h3>
            <p>Frontend, Backend или Fullstack — стартуем с теста уровня и собираем твой план.</p>
            <div className="step-visual">
              <div className="track-pills">
                <span className="track-pill active"><span className="dot" />Frontend</span>
                <span className="track-pill"><span className="dot" style={{ background: "var(--accent-2)" }} />Backend</span>
                <span className="track-pill"><span className="dot" style={{ background: "#06B6D4" }} />Fullstack</span>
              </div>
              <div style={{ marginTop: 14, color: "var(--fg-dim)", fontSize: 11.5 }}>
                → 24 недели · 6 проектов · 32 live-сессии
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">STEP_02<span className="bar" /></div>
            <h3>Учись с ментором</h3>
            <p>Live-сессии 2 раза в неделю, ежедневная практика, код-ревью каждого коммита.</p>
            <div className="step-visual">
              <div className="session-row"><div className="left"><span className="session-dot" />pair_programming.tsx</div><div>Пн · 19:00</div></div>
              <div className="session-row"><div className="left"><span className="session-dot" style={{ background: "var(--accent-2)" }} />code_review.md</div><div>Ср · 20:00</div></div>
              <div className="session-row"><div className="left"><span className="session-dot" style={{ background: "#06B6D4" }} />demo_day.live</div><div>Пт · 18:00</div></div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">STEP_03<span className="bar" /></div>
            <h3>Получи работу</h3>
            <p>Готовое портфолио, прокачанное резюме, mock-интервью и связи с компаниями.</p>
            <div className="step-visual">
              <div className="bar-row"><span className="label">Портфолио</span><div className="bar-bg"><div className="bar-fill" style={{ width: "92%" }} /></div></div>
              <div className="bar-row"><span className="label">Резюме</span><div className="bar-bg"><div className="bar-fill" style={{ width: "85%" }} /></div></div>
              <div className="bar-row"><span className="label">Алгоритмы</span><div className="bar-bg"><div className="bar-fill" style={{ width: "74%" }} /></div></div>
              <div className="bar-row"><span className="label">Soft skills</span><div className="bar-bg"><div className="bar-fill" style={{ width: "88%" }} /></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
