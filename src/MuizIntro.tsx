import { useState, useEffect } from 'react';
import face from './assets/myface.png';
import Toronto from './assets/Toronto.png';
import githublogo from './assets/githublogo.png';
import linkedinlogo from './assets/linkedinlogo.png';

const letters = [
  { char: 'M', img: face },
  { char: 'U', img: Toronto },
  { char: 'I', img: githublogo },
  { char: 'Z', img: linkedinlogo },
];

// How long each letter takes to appear (ms)
const LETTER_DELAY = 350;
// After last letter appears, how long before M zooms
const PAUSE_BEFORE_ZOOM = 500;
// How long the zoom animation takes
const ZOOM_DURATION = 800;

export default function MuizIntro({ onComplete }: { onComplete: () => void }) {
  // visibleCount: how many letters are currently shown (0 to 4)
  const [visibleCount, setVisibleCount] = useState(0);
  // zoom: whether the M is currently zooming
  const [zoom, setZoom] = useState(false);
  // done: unmount the whole intro
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Reveal each letter one by one
    letters.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), (i + 1) * LETTER_DELAY));
    });

    // After all letters shown, pause then zoom M
    const zoomStart = letters.length * LETTER_DELAY + PAUSE_BEFORE_ZOOM;
    timers.push(setTimeout(() => setZoom(true), zoomStart));

    // After zoom completes, unmount and show portfolio
    timers.push(setTimeout(() => setDone(true), zoomStart + ZOOM_DURATION));
    timers.push(setTimeout(() => onComplete(), zoomStart + ZOOM_DURATION));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {letters.map((l, i) => {
          const isVisible = visibleCount > i;
          const isM = i === 0;

          // M zooms toward screen when zoom === true
          const scale = isM && zoom ? 30 : 1;
          const opacity = isM && zoom ? 0 : isVisible ? 1 : 0;
          const translateY = isVisible ? '0px' : '20px';

          return (
            <div
              key={l.char}
              style={{
                position: 'relative',
                width: '100px',
                height: '130px',
                opacity,
                transform: `translateY(${translateY}) scale(${scale})`,
                transition: isM && zoom
                  ? `transform ${ZOOM_DURATION}ms cubic-bezier(0.4, 0, 1, 1), opacity ${ZOOM_DURATION * 0.75}ms ease`
                  : 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <svg
                width="100"
                height="130"
                viewBox="0 0 100 130"
                style={{ position: 'absolute', inset: 0 }}
              >
                <defs>
                  <clipPath id={`clip-${l.char}-${i}`}>
                    <text
                      x="50%"
                      y="82%"
                      textAnchor="middle"
                      fontSize="120"
                      fontWeight="900"
                      fontFamily="'Arial Black', sans-serif"
                    >
                      {l.char}
                    </text>
                  </clipPath>
                </defs>
                <image
                  href={l.img}
                  x="0" y="0"
                  width="100" height="130"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#clip-${l.char}-${i})`}
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}