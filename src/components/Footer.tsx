export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="brand">
              <div className="brand-mark">D</div>
              <span>DevMentor</span>
            </div>
            <p>
              Менторство по программированию для тех, кто всерьёз хочет сменить карьеру. Frontend,
              Backend, Fullstack.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 4L2 11l6 2 2 6 3-4 5 4 3-15z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7c0-1.5-1-2.5-2.5-2.5h-15C3 4.5 2 5.5 2 7v10c0 1.5 1 2.5 2.5 2.5h15c1.5 0 2.5-1 2.5-2.5V7zM10 16V8l6 4-6 4z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 3v11.5a3 3 0 11-3-3v-3a6 6 0 106 6V9a7 7 0 003 .7V6.5a4 4 0 01-3-3.5z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Продукт</h4>
            <ul>
              <li>
                <a href="#features">Возможности</a>
              </li>
              <li>
                <a href="#how">Как это работает</a>
              </li>
              <li>
                <a href="#pricing">Тарифы</a>
              </li>
              <li>
                <a href="#">Менторы</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Курсы</h4>
            <ul>
              <li>
                <a href="#">Frontend</a>
              </li>
              <li>
                <a href="#">Backend</a>
              </li>
              <li>
                <a href="#">Fullstack</a>
              </li>
              <li>
                <a href="#">DevOps</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Компания</h4>
            <ul>
              <li>
                <a href="#">О нас</a>
              </li>
              <li>
                <a href="#">Блог</a>
              </li>
              <li>
                <a href="#">Карьера</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Поддержка</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Помощь</a>
              </li>
              <li>
                <a href="#">Партнёрам</a>
              </li>
              <li>
                <a href="#">Telegram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 DevMentor · все права защищены</div>
          <div>сделано с ☕ и code reviews</div>
        </div>
      </div>
    </footer>
  );
}
