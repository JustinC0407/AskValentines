import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function YesPage() {
  const navigate = useNavigate();
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.2}s`,
        duration: `${4 + Math.random() * 3}s`,
        size: `${16 + Math.random() * 18}px`,
      })),
    []
  );

  return (
    <main className="page page-success">
      <div className="falling-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="falling-heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <section className="card success-card">
        {/* Replace with your success GIF in public/assets */}
        <img
          className="hero-gif"
          src="/assets/success-gif-placeholder.gif"
          alt="Happy celebration animation"
        />

        <h1 className="headline success-headline">YAYYYY!! Happy Valentine&apos;s Day 💖</h1>

        {/* Replace with your photo in public/assets */}
        <img
          className="us-photo"
          src="/assets/photo-placeholder.jpg"
          alt="A cute photo of us"
        />

        <button type="button" className="btn btn-back" onClick={() => navigate('/')}>
          Back
        </button>
      </section>
    </main>
  );
}
