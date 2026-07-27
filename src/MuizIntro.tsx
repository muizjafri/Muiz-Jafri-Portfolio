// MuizIntro.tsx - Updated version with smooth fade out

import { useState, useEffect, type ReactNode } from 'react';

const RECT_W = 640;
const RECT_H = 360;

const OPEN_DURATION = 750;
const LOADING_DURATION = 1000;

type Phase = 'idle' | 'loading' | 'opening' | 'done';

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

  useEffect(() => {
    document.body.style.overflow = showOverlay ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showOverlay]);

  useEffect(() => {
    if (phase === 'loading') {
      const timer = setTimeout(() => {
        setPhase('opening');
      }, LOADING_DURATION);

      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'opening') {
      const timer = setTimeout(() => {
        // Start exit animation before completing
        setIsExiting(true);
        
        // Wait for fade out animation to complete before calling onComplete
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 500); // Match the fade out duration
      }, OPEN_DURATION);

      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

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
              WebkitBackdropFilter: opening
                ? 'blur(0px)'
                : 'blur(20px)',
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

          {phase === 'idle' && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 50,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  textAlign: 'center',
                  fontFamily: 'inherit',
                  animation: 'fadeInUp 0.8s ease-out',
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  Welcome to My Portfolio!
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: 'white',
                    letterSpacing: '1px',
                    background: 'linear-gradient(135deg, #fff 0%, #ff6b6b 50%, #ffd93d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Click Play to Begin
                </div>
                <div
                  style={{
                    width: 60,
                    height: 2,
                    margin: '16px auto 0',
                    background: 'linear-gradient(90deg, transparent, #ff6b6b, transparent)',
                    borderRadius: 1,
                  }}
                />
              </div>

              <div
                onClick={() => setPhase('loading')}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 0 30px rgba(255,255,255,0.1)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translate(-50%, -50%) scale(1.12)';
                  e.currentTarget.style.boxShadow =
                    '0 0 50px rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    'translate(-50%, -50%) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 0 30px rgba(255,255,255,0.1)';
                }}
              >
                <svg width="42" height="42" viewBox="0 0 42 42">
                  <polygon
                    points="15,9 34,21 15,33"
                    fill="#000"
                  />
                </svg>
              </div>
            </>
          )}

          {phase === 'loading' && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 55,
                height: 55,
                borderRadius: '50%',
                border: '5px solid rgba(255,255,255,0.3)',
                borderTop: '5px solid white',
                animation: 'youtubeSpin 1s linear infinite',
                zIndex: 20,
              }}
            />
          )}
          
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              opacity: opening ? 0 : 1,
              transition: 'opacity 250ms ease',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: 3,
                background: 'rgba(255,255,255,0.2)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  background: '#ff0000',
                  borderRadius: '50%',
                  transform: 'translateX(-2px)',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '10px 16px',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <polygon
                  points="3,1 18,10 3,19"
                  fill="#fff"
                />
              </svg>

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="2"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.5 8.5a5 5 0 010 7" />
              </svg>

              <span
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'inherit',
                }}
              >
                0:00 / 29:53
              </span>

              <div style={{ flex: 1 }} />

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.8"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M7 9h4M7 13h6" />
              </svg>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009.6 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 8.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.8"
              >
                <path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes youtubeSpin {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(1);
              box-shadow: 0 0 30px rgba(255,255,255,0.1);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.05);
              box-shadow: 0 0 50px rgba(255,255,255,0.2);
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
              box-shadow: 0 0 30px rgba(255,255,255,0.1);
            }
          }
        `}
      </style>
    </>
  );
}