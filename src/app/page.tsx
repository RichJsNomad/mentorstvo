import Nav from '@/components/Nav';
import AnimatedIDE from '@/components/AnimatedIDE';
import SocialProof from '@/components/SocialProof';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <div className="eyebrow">
                  <span className="pulse"></span>
                  Live cohort стартует в мае · −20% до пятницы
                </div>
                <h1>
                  Стань разработчиком<br />
                  с <span className="gradient">личным ментором</span>,<br />
                  а не очередным курсом.
                </h1>
                <p className="lede">
                  DevMentor — это live-обучение с senior-разработчиками. Frontend, Backend и Fullstack через реальные проекты, код-ревью и сильное сообщество. Без записанных лекций, которые ты бросишь на третьей неделе.
                </p>
                <div className="hero-ctas">
                  <button className="btn btn-primary btn-lg">
                    Начать бесплатно
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="btn btn-ghost btn-lg">Посмотреть курсы</button>
                </div>
                <div className="hero-meta">
                  <div className="hero-meta-item">
                    <span className="check">✓</span>
                    Первая неделя бесплатно
                  </div>
                  <div className="hero-meta-item">
                    <span className="check">✓</span>
                    Без кредитной карты
                  </div>
                  <div className="hero-meta-item">
                    <span className="check">✓</span>
                    Отмена в один клик
                  </div>
                </div>
              </div>
              <div>
                <AnimatedIDE />
              </div>
            </div>
          </div>
        </section>

        <SocialProof />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
