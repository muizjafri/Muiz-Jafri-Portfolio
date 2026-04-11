import { useState, useEffect } from 'react';

const letters = [
  { char: 'M' },
  { char: 'U' },
  { char: 'I' },
  { char: 'Z' },

];

const LETTER_DELAY = 350;
const PAUSE_BEFORE_EXIT = 500;
const EXIT_DURATION = 900;

export default function MuizIntro({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    letters.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), (i + 1) * LETTER_DELAY));
    });

    const exitStart = letters.length * LETTER_DELAY + PAUSE_BEFORE_EXIT;
    timers.push(setTimeout(() => setExiting(true), exitStart));
    timers.push(setTimeout(() => setDone(true), exitStart + EXIT_DURATION));
    timers.push(setTimeout(() => onComplete(), exitStart + EXIT_DURATION));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: exiting ? 'transparent' : '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
        transition: `background ${EXIT_DURATION}ms ease`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: exiting ? 0 : 1,
          filter: exiting ? 'blur(24px)' : 'blur(0px)',
          transform: exiting ? 'scale(1.08)' : 'scale(1)',
          transition: exiting
            ? `opacity ${EXIT_DURATION}ms ease, filter ${EXIT_DURATION}ms ease, transform ${EXIT_DURATION}ms ease`
            : 'none',
        }}
      >
        {letters.map((l, i) => {
          const isVisible = visibleCount > i;
          const opacity = isVisible ? 1 : 0;
          const translateY = isVisible ? '0px' : '20px';

          return (
            <div
              key={l.char}
              style={{
                position: 'relative',
                opacity,
                transform: `translateY(${translateY})`,
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '120px',
                  fontWeight: 900,
                  fontFamily: "'Arial Black', sans-serif",
                  lineHeight: 1,
                }}
              >
                {l.char}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}