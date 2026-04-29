export default function SocialProof() {
  const logos = [
    { name: "NORTHWIND", glyph: "◆" },
    { name: "ACME", glyph: "▲" },
    { name: "OCTANT", glyph: "●" },
    { name: "PARALLAX", glyph: "❖" },
    { name: "VOLTA", glyph: "▰" },
    { name: "QUANTA", glyph: "✦" },
  ];

  return (
    <section className="proof">
      <div className="container">
        <div className="stats">
          <div className="stat">
            <div className="stat-num">
              88<span className="accent">%</span>
            </div>
            <div className="stat-label">выпускников находят работу за 6 месяцев</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              +178<span className="accent">%</span>
            </div>
            <div className="stat-label">средний рост зарплаты после обучения</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              1000<span className="accent">+</span>
            </div>
            <div className="stat-label">студентов учатся прямо сейчас</div>
          </div>
        </div>

        <div className="logos-label">Наши выпускники работают в</div>
        <div className="logos">
          {logos.map((l) => (
            <div className="logo" key={l.name}>
              <span style={{ marginRight: 8, color: "var(--accent)" }}>{l.glyph}</span>
              {l.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
