import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Envelope from '../components/Envelope';
import { getRandomPosition } from '../utils/getRandomPosition';

const NO_MESSAGES = [
  'Are you sure?',
  'Pookie do you not love me?',
  'Think again...',
  'You hate meeee',
  'Last chance 😭',
];

const YES_SCALES = [1.0, 1.3, 1.7, 2.2, 3.0, 6.0];

export default function ProposalPage() {
  const navigate = useNavigate();
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);

  const [noClickCount, setNoClickCount] = useState(0);
  const [noPosition, setNoPosition] = useState(null);

  const clampToViewport = (x, y, elementWidth, elementHeight, margin = 12) => {
    const maxX = Math.max(margin, window.innerWidth - elementWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - elementHeight - margin);
    return {
      x: Math.min(Math.max(x, margin), maxX),
      y: Math.min(Math.max(y, margin), maxY),
    };
  };

  const placeNoNextToYes = () => {
    const noRect = noButtonRef.current?.getBoundingClientRect();
    const yesRect = yesButtonRef.current?.getBoundingClientRect();
    if (!noRect || !yesRect) return;

    const gap = 14;
    const targetX = yesRect.right + gap;
    const targetY = yesRect.top + yesRect.height / 2 - noRect.height / 2;
    setNoPosition(clampToViewport(targetX, targetY, noRect.width, noRect.height));
  };

  const updateNoPosition = () => {
    const buttonRect = noButtonRef.current?.getBoundingClientRect();
    if (!buttonRect) return;

    const nextPos = getRandomPosition({
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      elementWidth: buttonRect.width,
      elementHeight: buttonRect.height,
      margin: 12,
    });

    setNoPosition(nextPos);
  };

  useEffect(() => {
    if (noClickCount === 0) {
      placeNoNextToYes();
    }
    const onResize = () => {
      if (noClickCount === 0) {
        placeNoNextToYes();
      } else {
        updateNoPosition();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [noClickCount]);

  const handleNoClick = () => {
    setNoClickCount((prev) => {
      const next = Math.min(prev + 1, 5);
      return next;
    });
    updateNoPosition();
  };

  const message = noClickCount > 0 ? NO_MESSAGES[Math.min(noClickCount - 1, 4)] : '';
  const yesScale = YES_SCALES[Math.min(noClickCount, YES_SCALES.length - 1)];
  const isDominating = noClickCount >= 5;

  return (
    <main className="page page-proposal">
      <section className="card proposal-card">
        {/* Replace with your proposal GIF in public/assets */}
        <img
          className="hero-gif"
          src="/assets/proposal-gif-placeholder.gif"
          alt="Cute proposal animation"
        />

        <Envelope />

        <h1 className="headline">Will you be my Valentine?</h1>
        <p className="message" aria-live="polite">
          {message}
        </p>

        <div className="buttons-row">
          <button
            ref={yesButtonRef}
            type="button"
            className={`btn btn-yes ${isDominating ? 'yes-dominating' : ''}`}
            style={isDominating ? undefined : { transform: `scale(${yesScale})` }}
            onClick={() => navigate('/yes')}
          >
            {isDominating ? 'YES.' : 'Yes'}
          </button>
        </div>
      </section>

      <button
        ref={noButtonRef}
        type="button"
        className="btn btn-no"
        style={
          noPosition
            ? { left: `${noPosition.x}px`, top: `${noPosition.y}px` }
            : { visibility: 'hidden' }
        }
        disabled={noClickCount >= 5}
        aria-hidden={noClickCount >= 5}
        onClick={handleNoClick}
      >
        No
      </button>
    </main>
  );
}
