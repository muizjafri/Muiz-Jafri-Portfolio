// MuizIntro.tsx - Morphing play button intro (circle -> capsule -> progress bar -> content)

import { useState, useEffect, type ReactNode } from 'react';
import logo from './assets/favicon1.png';

const RECT_W = 640;
const RECT_H = 360;

const AUTO_START_DELAY = 0;
const MORPH_DURATION = 400;
const NARROW_DURATION = 290;
const FILL_DURATION = 370;
const OPEN_DURATION = 500;
const EXIT_DURATION = 550;

type Phase = 'idle' | 'morphing' | 'narrowing' | 'filling' | 'opening' | 'done';

function wrapperStyle(phase: Phase): React.CSSProperties {
  switch (phase) {
    case 'idle':
      return {
        width: 110,
        height: 110,
        borderRadius: 45,
        background: 'transparent',
        paddingLeft: 0,
        justifyContent: 'center',
      };
    case 'morphing':
      return {
        width: 260,
        height: 56,
        borderRadius: 28,
        background: 'rgba(255,80,110,0.92)',
        paddingLeft: 20,
        justifyContent: 'flex-start',
      };
    default:
      return {
        width: 260,
        height: 40,
        borderRadius: 20,
        background: 'rgba(255,80,110,0)',
        paddingLeft: 20,
        justifyContent: 'flex-start',
      };
  }
}

export default function MuizIntro({
  children,
  onComplete,
}: {
  children: ReactNode;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isExiting, setIsExiting] = useState(false);

  const opening = phase === 'opening' || phase === 'done';
  const showOverlay = phase !== 'done' || isExiting;
  const showMorph = phase === 'idle' || phase === 'morphing' || phase === 'narrowing' || phase === 'filling';
  const showTrack = phase === 'narrowing' || phase === 'filling';

  useEffect(() => {
    document.body.style.overflow = showOverlay ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showOverlay]);

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => setPhase('morphing'), AUTO_START_DELAY);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'morphing') {
      const timer = setTimeout(() => setPhase('narrowing'), MORPH_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'narrowing') {
      const timer = setTimeout(() => setPhase('filling'), NARROW_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'filling') {
      const timer = setTimeout(() => setPhase('opening'), FILL_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'opening') {
      const timer = setTimeout(() => {
        setIsExiting(true);

        setTimeout(() => {
          setPhase('done');
          setIsExiting(false);
          onComplete();
        }, EXIT_DURATION);
      }, OPEN_DURATION);

      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const logoSize = phase === 'idle' ? 90 : phase === 'morphing' ? 34 : 28;
  const logoOpacity = opening ? 0 : 1;

  return (
    <>
      {children}

      {(showOverlay || isExiting) && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            background: '#000',
            overflow: 'hidden',
            opacity: isExiting ? 0 : 1,
            transition: 'opacity 500ms ease-in-out',
            pointerEvents: isExiting ? 'none' : 'auto',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: opening ? '100vw' : RECT_W,
              height: opening ? '100vh' : RECT_H,
              transform: 'translate(-50%, -50%)',
              borderRadius: opening ? 0 : 10,
              backdropFilter: opening ? 'blur(0px)' : 'blur(20px)',
              WebkitBackdropFilter: opening ? 'blur(0px)' : 'blur(20px)',
              boxShadow: '0 0 0 9999px #000',
              transition: opening
                ? `
                width ${OPEN_DURATION}ms cubic-bezier(0.4,0,0.2,1),
                height ${OPEN_DURATION}ms cubic-bezier(0.4,0,0.2,1),
                border-radius ${OPEN_DURATION}ms ease,
                backdrop-filter ${OPEN_DURATION}ms ease
              `
                : 'none',
            }}
          />

          {showMorph && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                zIndex: 20,
                transition: `
                  width ${phase === 'idle' ? 300 : MORPH_DURATION}ms cubic-bezier(0.4,0,0.2,1),
                  height ${phase === 'idle' ? 300 : MORPH_DURATION}ms cubic-bezier(0.4,0,0.2,1),
                  border-radius ${MORPH_DURATION}ms ease,
                  background ${MORPH_DURATION}ms ease,
                  padding-left ${MORPH_DURATION}ms ease
                `,
                animation: phase === 'idle' ? 'pulse 2s ease-in-out infinite' : 'none',
                ...wrapperStyle(phase),
              }}
            >
              <img
                src={logo}
                alt="logo"
                draggable={false}
                style={{
                  width: logoSize,
                  height: logoSize,
                  flexShrink: 0,
                  opacity: logoOpacity,
                  objectFit: 'contain',
                  filter: phase === 'idle' ? 'drop-shadow(0 0 14px rgba(255,255,255,0.35))' : 'none',
                  transition: 'width 220ms ease, height 220ms ease, opacity 220ms ease, filter 220ms ease',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  marginLeft: showTrack ? 12 : 0,
                  width: showTrack ? 190 : 0,
                  height: 4,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.3)',
                  opacity: showTrack ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'width 220ms ease, margin-left 220ms ease, opacity 220ms ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: phase === 'filling' ? '100%' : '0%',
                    background: '#ff0000',
                    borderRadius: 2,
                    transition: `width ${FILL_DURATION}ms ease`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.05);
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}
      </style>
    </>
  );
}