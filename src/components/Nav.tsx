'use client';

import { useState } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('nav-open');
    }
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-inner">
          <a href="/" className="brand">
            <img
              src="/logo/devmentor-lockup-dark.svg"
              alt="DevMentor"
              className="brand-logo"
            />
          </a>

          <div className="nav-links">
            <a href="#features">Возможности</a>
            <a href="#how">Как это работает</a>
            <a href="#pricing">Тарифы</a>
            <a href="#testimonials">Отзывы</a>
            <a href="#mentors">Менторы</a>
          </div>

          <div className="nav-cta">
            <button className="btn btn-ghost btn-sm nav-login">Войти</button>
            <button className="btn btn-primary btn-sm">Начать бесплатно</button>
          </div>

          <button className="nav-burger" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className="nav-mobile">
        <a href="#features" onClick={toggleMenu}>Возможности</a>
        <a href="#how" onClick={toggleMenu}>Как это работает</a>
        <a href="#pricing" onClick={toggleMenu}>Тарифы</a>
        <a href="#testimonials" onClick={toggleMenu}>Отзывы</a>
        <a href="#mentors" onClick={toggleMenu}>Менторы</a>
        <a href="#" onClick={toggleMenu}>Войти</a>
      </div>
    </nav>
  );
}
