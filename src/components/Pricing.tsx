'use client';

import { useState } from 'react';

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  const plans = [
    {
      name: "Basic",
      price: { m: 0, y: 0 },
      tagline: "Попробуй платформу. Посмотри, как мы учим.",
      features: ["Вводные курсы и mini-проекты", "Открытые секции сообщества", "Еженедельные Q&A с менторами", "Базовый трекинг прогресса"],
      cta: "Начать бесплатно",
    },
    {
      name: "Pro",
      price: { m: 24, y: 19 },
      tagline: "Полная программа с код-ревью и сертификатом.",
      featured: true,
      features: [
        "Все курсы Frontend и Backend",
        "Персональный learning path",
        "Код-ревью каждого проекта",
        "Сертификат об окончании",
        "Приоритетная поддержка ментора",
        "Закрытый Discord-канал",
      ],
      cta: "Выбрать Pro",
    },
    {
      name: "Premium",
      price: { m: 79, y: 65 },
      tagline: "Личный ментор и помощь до первого оффера.",
      features: [
        "Всё из Pro",
        "1-on-1 сессии с senior-ментором",
        "Карьерные консультации каждую неделю",
        "Помощь с трудоустройством",
        "Mock-интервью и подготовка к алгоритмам",
        "Закрытые workshops",
      ],
      cta: "Записаться",
    },
  ];

  return (
    <section id="pricing">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">Тарифы</div>
          <h2>Цена меньше курса по Excel.<br />Результат — новая профессия.</h2>
          <p>Никаких скрытых платежей. Отмена в один клик. Первая неделя — бесплатно на любом тарифе.</p>
        </div>

        <div className="pricing-toggle-wrap">
          <div className="pricing-toggle">
            <div
              className="slider"
              style={{
                transform: yearly ? "translateX(100%)" : "translateX(0)",
                width: "calc(50% - 4px)",
              }}
            />
            <button className={!yearly ? "active" : ""} onClick={() => setYearly(false)}>
              Помесячно
            </button>
            <button className={yearly ? "active" : ""} onClick={() => setYearly(true)}>
              Годовая <span className="save-badge">−20%</span>
            </button>
          </div>
        </div>

        <div className="plans">
          {plans.map((p) => {
            const price = yearly ? p.price.y : p.price.m;
            return (
              <div key={p.name} className={`plan ${p.featured ? "featured" : ""}`}>
                {p.featured && <div className="plan-badge">★ Популярный</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{price}</span>
                  <span className="period">/{yearly ? "мес, оплата за год" : "месяц"}</span>
                </div>
                <p className="plan-tagline">{p.tagline}</p>
                <ul className="plan-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="check-ic">
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5l2.5 2.5 4.5-5" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}>
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
