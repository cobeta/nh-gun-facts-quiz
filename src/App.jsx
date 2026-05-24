import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { buildDeck, tierFor, BOTTOM_LINE } from './quiz-data.js';
import heroBg1 from './assets/hero-bg-1.png';
import heroBg2 from './assets/hero-bg-2.png';

// ─── Palette ───────────────────────────────────────────────────────────
const P = {
  cream: '#F6F6F6',
  paper: '#FFFFFF',
  ink: '#181818',
  rust: '#FC5000',
  rustDeep: '#C85654',
  forest: '#23B09B',
  forestDeep: '#1A8A78',
  forestTint: '#E6F7F4',
  rustTint: '#FFF3EE',
  muted: '#6B6660',
  hair: 'rgba(26,26,26,0.12)',
};

// ─── Shared primitives ─────────────────────────────────────────────────
function Eyebrow({ children, color = P.rust, style }) {
  return (
    <div style={{
      fontFamily: '"Archivo", system-ui, sans-serif',
      fontSize: 12, fontWeight: 600,
      color, ...style,
    }}>{children}</div>
  );
}

function Display({ children, style }) {
  return (
    <h1 style={{
      fontFamily: '"Archivo", system-ui, sans-serif',
      fontWeight: 900,
      letterSpacing: '-0.025em', lineHeight: 0.95,
      color: P.ink, margin: 0, textWrap: 'balance',
      ...style,
    }}>{children}</h1>
  );
}

function Body({ children, style }) {
  return (
    <p style={{
      fontFamily: '"Archivo", system-ui, sans-serif',
      fontSize: 15.5, lineHeight: 1.5, color: P.ink,
      margin: 0, textWrap: 'pretty', ...style,
    }}>{children}</p>
  );
}

function HairLine({ color = P.hair, style }) {
  return <div style={{ height: 1, background: color, ...style }} />;
}

// ─── NH Stamp ──────────────────────────────────────────────────────────
const NH_PATH = "M 62 4 L 112 12 L 108 38 L 104 68 L 99 104 L 93 140 L 86 178 L 78 214 L 70 244 L 62 266 L 54 274 L 48 270 L 44 258 L 42 240 L 41 218 L 40 192 L 38 164 L 36 132 L 35 100 L 36 68 L 40 40 L 48 18 L 58 8 Z";

function NHStamp({ color = '#fff' }) {
  return (
    <div style={{
      position: 'relative', width: 104, height: 200,
      animation: 'stampPress 780ms cubic-bezier(.22,1.4,.36,1) 200ms both',
    }}>
      <svg viewBox="0 0 150 290" width="104" height="200" style={{ display: 'block', overflow: 'visible' }}>
        <path d={NH_PATH}
          fill={color} fillOpacity="0"
          style={{ animation: 'stampFill 520ms ease 880ms forwards' }}
        />
        <path d={NH_PATH}
          fill="none" stroke={color} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
          style={{ animation: 'stampDraw 1100ms cubic-bezier(.55,.2,.2,1) 280ms forwards' }}
        />
      </svg>
    </div>
  );
}

// ─── Welcome ───────────────────────────────────────────────────────────
function WelcomeScreen({ onStart, onAbout, variant = 'illustrated' }) {
  if (variant === 'photo') {
    return <WelcomePhoto onStart={onStart} onAbout={onAbout} />;
  }
  return <WelcomeIllustrated onStart={onStart} onAbout={onAbout} />;
}

// Illustrated variant — clean image hero, title + CTA bottom-anchored
function WelcomeIllustrated({ onStart, onAbout }) {
  return (
    <div style={{
      height: '100%', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroBg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }} />

      {/* Gradient overlay — light at top, darkens toward bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'none',
      }} />

      {/* Title + CTA — anchored at 1/3 from top */}
      <div style={{
        position: 'absolute', top: '33%', left: 0, right: 0,
        padding: '16px 24px', zIndex: 1,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'rgba(0,0,0,0.08)',
      }}>
        <Eyebrow color="#fff" style={{ marginBottom: 10, textAlign: 'center' }}>
          Four questions · Two minutes
        </Eyebrow>
        <Display style={{
          fontSize: 42, color: '#fff', textAlign: 'center',
        }}>
          Think you're{' '}
          <span style={{ color: P.forest }}>SMART</span>{' '}
          about gun safety?
        </Display>
        <div style={{ marginTop: 20 }}>
          <button onClick={onStart}
            style={{
              background: P.rust, color: '#fff', border: 'none',
              borderRadius: 999, padding: '16px 24px', width: '100%',
              fontFamily: '"Archivo", sans-serif', fontSize: 16, fontWeight: 700,
              letterSpacing: '-0.005em', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(252,80,0,0.35)',
            }}>
            <span>Take the quiz</span>
            <span style={{ fontSize: 20, lineHeight: 1 }}>→</span>
          </button>
          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <Eyebrow color="#fff">No login · No data kept</Eyebrow>
          </div>
        </div>
      </div>

      {/* About link — bottom */}
      <div style={{
        position: 'absolute', bottom: 16, left: 0, right: 0,
        textAlign: 'center', zIndex: 1,
      }}>
        <button onClick={onAbout}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: '"Archivo", system-ui, sans-serif',
            fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.65)',
            textDecoration: 'underline', textUnderlineOffset: 3,
          }}>
          About this quiz
        </button>
      </div>
    </div>
  );
}

// Photo variant — editorial layout, title left-aligned mid-screen, heavier vignette
function WelcomePhoto({ onStart, onAbout }) {
  return (
    <div style={{
      height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroBg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }} />

      {/* Stronger vignette for the busy photo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 25%, rgba(5,20,10,0.55) 55%, rgba(5,20,10,0.93) 100%)',
      }} />

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Title — left-aligned, editorial feel */}
      <div style={{ padding: '0 24px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <Eyebrow color="#fff" style={{ marginBottom: 12 }}>
          Four questions · Two minutes
        </Eyebrow>
        <Display style={{ fontSize: 36, color: '#fff', textAlign: 'left', lineHeight: 0.95 }}>
          Think you're{' '}
          <span style={{ color: '#2aa892' }}>SMART</span>{' '}
          about gun safety?
        </Display>
        {/* Decorative rule */}
        <div style={{
          width: 40, height: 3, background: P.rust,
          borderRadius: 2, marginTop: 20,
        }} />
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 24px 28px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <button onClick={onStart}
          style={{
            background: 'transparent', color: '#fff',
            border: '2px solid rgba(255,255,255,0.9)',
            borderRadius: 999, padding: '16px 24px', width: '100%',
            fontFamily: '"Archivo", sans-serif', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.005em', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}>
          <span>Take the quiz</span>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: P.rust, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 16, lineHeight: 1,
          }}>→</span>
        </button>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Eyebrow color="#fff">No login · No data kept</Eyebrow>
        </div>
      </div>
      {/* About link */}
      <div style={{
        flexShrink: 0, textAlign: 'center', paddingBottom: 16,
        position: 'relative', zIndex: 1,
      }}>
        <button onClick={onAbout}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: '"Archivo", system-ui, sans-serif',
            fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.65)',
            textDecoration: 'underline', textUnderlineOffset: 3,
          }}>
          About this quiz
        </button>
      </div>

    </div>
  );
}

// ─── Answer button ─────────────────────────────────────────────────────
function AnswerButton({ answer, index, state, onClick }) {
  const disabled = state !== 'idle';

  let bg = P.paper;
  let border = P.hair;
  let color = P.ink;
  let badgeBg = 'transparent';
  let badgeColor = P.muted;

  if (state === 'correct' || state === 'picked-correct') {
    bg = P.forestTint; border = 'rgba(46,107,78,0.45)'; color = '#1E4A36';
    badgeBg = P.forest; badgeColor = '#fff';
  } else if (state === 'picked-wrong') {
    bg = P.rustTint; border = 'rgba(154,53,21,0.4)'; color = P.rustDeep;
    badgeBg = P.rustDeep; badgeColor = '#fff';
  } else if (state === 'dim') {
    color = 'rgba(28,23,19,0.4)';
    badgeColor = 'rgba(28,23,19,0.35)';
  }

  const letter = String.fromCharCode(65 + index);
  const mark = (state === 'correct' || state === 'picked-correct') ? '✓'
    : state === 'picked-wrong' ? '✕' : letter;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex', alignItems: 'stretch', width: '100%',
        background: bg, border: `1px solid ${border}`, borderRadius: 10,
        padding: 0, textAlign: 'left', cursor: disabled ? 'default' : 'pointer',
        transition: 'background 180ms ease, border-color 180ms ease, color 180ms ease',
        overflow: 'hidden', minHeight: 52,
      }}
    >
      <div style={{
        width: 44, flexShrink: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        borderRight: `1px solid ${border}`,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontWeight: 700, fontSize: 13,
        background: badgeBg, color: badgeColor,
        transition: 'all 180ms ease',
      }}>
        {mark}
      </div>
      <div style={{
        flex: 1, padding: '13px 14px',
        fontFamily: '"Archivo", sans-serif', fontSize: 14.5, lineHeight: 1.35,
        color, fontWeight: 500, textWrap: 'pretty',
      }}>
        {answer.text}
      </div>
    </button>
  );
}

// ─── Progress bar ──────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <Eyebrow>Question {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</Eyebrow>
        <Eyebrow color={P.muted}>Safe Storage Quiz</Eyebrow>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < current ? P.forest : i === current ? P.rust : P.hair,
            transition: 'background 300ms ease',
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── Question screen ───────────────────────────────────────────────────
function QuestionScreen({ question, index, total, selectedIdx, revealed, onPick, onNext, isLast }) {
  const correctIdx = question.answers.findIndex(a => a.correct);
  const picked = selectedIdx != null ? question.answers[selectedIdx] : null;

  function stateFor(i) {
    if (!revealed) return 'idle';
    if (i === selectedIdx && picked?.correct) return 'picked-correct';
    if (i === selectedIdx && !picked?.correct) return 'picked-wrong';
    if (i === correctIdx) return 'correct';
    return 'dim';
  }

  return (
    <div style={{
      minHeight: '100%', background: P.cream, color: P.ink,
      display: 'flex', flexDirection: 'column',
      padding: '64px 22px 28px', boxSizing: 'border-box',
    }}>
      <ProgressBar current={index} total={total} />

      <div style={{ marginTop: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Display style={{ fontSize: 26, lineHeight: 1.1 }}>
          {question.promptIntro && (
            <>
              <span style={{ fontWeight: 400, opacity: 0.55, fontSize: 20 }}>{question.promptIntro}</span>
              <br /><br />
            </>
          )}
          {question.prompt}
        </Display>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
          {question.answers.map((a, i) => (
            <AnswerButton
              key={i}
              answer={a}
              index={i}
              state={stateFor(i)}
              onClick={() => !revealed && onPick(i)}
            />
          ))}
        </div>

        <div style={{
          marginTop: 16,
          maxHeight: revealed ? 400 : 0,
          opacity: revealed ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 350ms ease, opacity 300ms ease 80ms',
        }}>
          {picked && (
            <div style={{
              background: P.paper,
              borderLeft: `3px solid ${picked.correct ? P.forest : P.rust}`,
              padding: '14px 16px 16px',
              borderRadius: '0 8px 8px 0',
            }}>
              <Eyebrow color={picked.correct ? P.forest : P.rust}>
                {picked.correct ? 'Correct' : 'Here are the facts'}
              </Eyebrow>
              <Body style={{ marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>
                {Array.isArray(picked.feedback)
                  ? picked.feedback.map((seg, i) =>
                      seg.bold ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>
                    )
                  : picked.feedback}
              </Body>
              {picked.source && (
                <div style={{
                  marginTop: 8,
                  fontFamily: '"Archivo", system-ui, sans-serif',
                  fontSize: 11, color: P.muted, lineHeight: 1.4,
                }}>
                  {picked.source.url ? (
                    <>
                      *{' '}
                      <a
                        href={picked.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: P.muted, textDecoration: 'underline', textUnderlineOffset: 2 }}
                      >
                        {picked.source.label}
                      </a>
                    </>
                  ) : (
                    picked.source.label
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{
        marginTop: 20,
        opacity: revealed ? 1 : 0.25,
        pointerEvents: revealed ? 'auto' : 'none',
        transition: 'opacity 220ms ease',
      }}>
        <button onClick={onNext}
          style={{
            background: P.forest, color: '#fff', border: 'none',
            borderRadius: 999, padding: '16px 22px', width: '100%',
            fontFamily: '"Archivo", sans-serif', fontSize: 15, fontWeight: 700,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
          <span>{isLast ? 'See your results' : 'Next question'}</span>
          <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
        </button>
      </div>
    </div>
  );
}

// ─── Results screen ────────────────────────────────────────────────────
const SMART_ITEMS = [
  { letter: 'S', word: 'Secure',    desc: 'Secure all guns in your home and vehicles.' },
  { letter: 'M', word: 'Model',     desc: 'Model responsible behavior around firearms.' },
  { letter: 'A', word: 'Ask',       desc: 'Ask about unsecured guns in homes your children visit.' },
  { letter: 'R', word: 'Recognize', desc: 'Recognize the risks of teen suicide and depression.' },
  { letter: 'T', word: 'Tell',      desc: 'Tell your peers to be SMART.' },
];

const FEATURED_PDFS = [
  { label: 'Asking About Secure Gun Storage', url: 'https://bs1980402754.wpenginepowered.com/wp-content/uploads/2023/10/Asking-About-Secure-Gun-Storage_09.2023.pdf' },
  { label: 'Talking to Your Children About Guns', url: 'https://bs1980402754.wpenginepowered.com/wp-content/uploads/2023/02/Talking-to-your-kids-about-guns-06.2024.pdf' },
  { label: 'Guide to Secure Gun Storage Devices', url: 'https://bs1980402754.wpenginepowered.com/wp-content/uploads/2025/05/Be-SMART-Guide-to-Secure-Gun-Storage-Devices-051925A.pdf' },
];

const resultStyles = `
  .results-page {
    position: fixed;
    inset: 0;
    z-index: 999;
    overflow-y: auto;
    background: ${P.cream};
    color: ${P.ink};
    display: flex;
    flex-direction: column;
    font-family: "Archivo", system-ui, sans-serif;
  }

  .results-hero {
    padding: 48px 24px 36px;
  }

  .results-eyebrow {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: ${P.rust};
    margin-bottom: 20px;
  }

  .results-score-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
  }

  .results-score-number {
    font-size: clamp(72px, 16vw, 120px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.05em;
    color: ${P.rust};
    flex-shrink: 0;
  }

  .results-score-denom {
    color: rgba(26,26,26,0.2);
    font-size: 0.48em;
    vertical-align: super;
  }

  .results-tier {
    flex: 1;
  }

  .results-tier-heading {
    font-size: clamp(16px, 3vw, 22px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: ${P.ink};
    margin: 0 0 8px;
  }

  .results-tier-body {
    font-size: clamp(13px, 1.8vw, 15px);
    line-height: 1.5;
    color: ${P.muted};
    margin: 0;
    max-width: 480px;
  }

  .results-section-label {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: ${P.forest};
    margin-bottom: 20px;
  }



  .results-verdict {
    margin: 32px 24px 0;
    background: ${P.forestDeep};
    border-radius: 10px;
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
  }

  .results-verdict::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.025) 0 1px,
      transparent 1px 8px
    );
    pointer-events: none;
  }

  .results-verdict-eyebrow {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    margin-bottom: 12px;
  }

  .results-verdict-stat {
    display: none;
  }

  .results-verdict-headline {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: clamp(20px, 4.5vw, 28px);
    font-weight: 900;
    letter-spacing: -0.025em;
    line-height: 1.1;
    color: #fff;
    margin-bottom: 12px;
    text-wrap: balance;
  }

  .results-verdict-text {
    font-size: clamp(13px, 2vw, 15px);
    line-height: 1.55;
    color: rgba(255,255,255,0.65);
    max-width: 560px;
  }

  .results-verdict-text strong {
    color: #fff;
    font-weight: 700;
  }

  .results-convo-starters {
    margin: 20px 24px 0;
    padding: 24px;
    background: ${P.forestTint};
    border: 2px solid ${P.forest};
    border-radius: 10px;
    display: block;
    text-decoration: none;
    cursor: pointer;
    transition: background 150ms ease, border-color 150ms ease;
  }

  .results-convo-starters:hover {
    background: #d5e8df;
    border-color: ${P.forestDeep};
  }

  .results-convo-eyebrow {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: ${P.forest};
    margin-bottom: 10px;
  }

  .results-convo-link {
    display: block;
    font-family: "Archivo", sans-serif;
    font-size: clamp(22px, 5vw, 28px);
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: ${P.forestDeep};
    margin-bottom: 12px;
  }

  .results-convo-sub {
    font-family: "Archivo", sans-serif;
    font-size: 13px;
    color: ${P.forest};
    line-height: 1.5;
  }

  .results-actions {
    display: flex;
    gap: 10px;
    padding: 28px 24px;
  }

  .results-btn-share {
    background: ${P.rust};
    color: #fff;
    border: none;
    border-radius: 999px;
    padding: 15px 28px;
    font-family: "Archivo", sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 150ms ease;
  }

  .results-btn-share:hover { background: ${P.rustDeep}; }

  .results-btn-retake {
    background: transparent;
    color: ${P.muted};
    border: none;
    border-radius: 0;
    padding: 4px 0;
    font-family: "Archivo", sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    white-space: nowrap;
    transition: color 150ms ease;
  }

  .results-btn-retake:hover {
    color: ${P.ink};
  }

  details[open] summary span {
    transform: rotate(90deg);
  }

  .results-credit {
    padding: 12px 24px 28px;
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 11px;
    color: rgba(26,26,26,0.3);
    text-align: center;
  }

  /* Desktop: portal renders into body, cover viewport */
  @media (min-width: 500px) {
    .results-page {
      position: fixed;
      inset: 0;
      z-index: 999;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .results-inner {
      flex: 1;
      min-height: 0;
      max-width: 720px;
      margin: 0 auto;
      width: 100%;
      padding: 0 48px;
      display: flex;
      flex-direction: column;
    }

    /* Top row: single column on desktop too */
    .results-top-row {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 32px 0 20px;
      border-bottom: 1px solid rgba(26,26,26,0.12);
      flex-shrink: 0;
    }

    .results-hero   { padding: 0; border-bottom: none; }

    /* Bottom row: verdict full width */
    .results-bottom-row {
      display: block;
      flex-shrink: 0;
      padding: 16px 0 12px;
    }

    .results-verdict {
      margin: 0;
      padding: 14px 18px;
      height: auto;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .results-convo-starters {
      margin: 16px 0 0;
    }

    .results-credit {
      padding: 12px 0 28px;
    }

    /* Desktop typography */
    .results-score-number  { font-size: 88px; }
    .results-tier-heading  { font-size: 20px; }
    .results-tier-body     { font-size: 14px; }
    .results-verdict-headline { font-size: 22px; margin-bottom: 10px; }
    .results-verdict-text  { font-size: 14px; }
    .results-verdict-eyebrow { margin-bottom: 8px; }

    .results-score-row     { margin-bottom: 12px; }
    .results-eyebrow       { margin-bottom: 12px; }
    .results-section-label { margin-bottom: 12px; }

    .results-besmart-section {
      padding: 24px 0 40px;
    }

    .results-besmart-intro {
      margin-bottom: 20px;
    }

    .results-besmart-heading {
      font-size: 36px;
    }

    .results-smart-row {
      padding: 14px 18px;
    }

    .results-smart-letter {
      font-size: 30px;
      min-width: 40px;
    }

    .results-smart-word { font-size: 15px; }
    .results-smart-desc { font-size: 13px; }

    .results-resources-block { margin-bottom: 14px; }

    .results-pdf-cards { gap: 5px; }

    .results-pdf-card { padding: 10px 14px; }

    .results-pdf-card-label { font-size: 13px; }

    .results-besmart-cta {
      flex-direction: row;
      align-items: center;
      gap: 20px;
      padding: 18px 22px;
    }

    .results-besmart-cta-text { flex: 1; }

    .results-share-row {
      flex-direction: row;
      justify-content: center;
      gap: 20px;
      padding: 28px 0 8px;
    }
  }
`;

const beSmartStyles = `
  .results-share-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 28px 0 8px;
    border-top: 1px solid rgba(26,26,26,0.08);
    margin-top: 24px;
  }

  .results-besmart-section {
    padding: 28px 24px 36px;
    border-top: 1px solid rgba(26,26,26,0.1);
  }

  .results-besmart-intro {
    margin-bottom: 20px;
  }

  .results-besmart-heading {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: clamp(28px, 7vw, 40px);
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1;
    color: ${P.ink};
    margin: 8px 0 0;
  }

  .results-besmart-highlight {
    color: ${P.forest};
  }

  .results-smart-list {
    border: 1px solid ${P.hair};
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .results-smart-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 18px;
    border-left: 3px solid ${P.forest};
    background: ${P.paper};
    border-bottom: 1px solid ${P.hair};
    transition: background 150ms ease;
  }

  .results-smart-row:last-child {
    border-bottom: none;
  }

  .results-smart-row:hover {
    background: ${P.forestTint};
  }

  .results-smart-letter {
    font-family: "JetBrains Mono", monospace;
    font-size: clamp(24px, 5vw, 32px);
    font-weight: 700;
    color: ${P.forest};
    min-width: 40px;
    line-height: 1;
  }

  .results-smart-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .results-smart-word {
    font-family: "Archivo", sans-serif;
    font-size: clamp(14px, 2.5vw, 16px);
    font-weight: 700;
    color: ${P.ink};
    letter-spacing: -0.01em;
  }

  .results-smart-desc {
    font-family: "Archivo", sans-serif;
    font-size: clamp(12px, 1.8vw, 13.5px);
    color: ${P.muted};
    line-height: 1.4;
  }

  .results-resources-block {
    margin-bottom: 16px;
  }

  .results-resources-label {
    font-family: "Archivo", system-ui, sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: ${P.forest};
    margin-bottom: 12px;
  }

  .results-pdf-cards {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .results-pdf-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    background: ${P.paper};
    border: 1px solid ${P.hair};
    border-radius: 8px;
    text-decoration: none;
    transition: background 150ms ease, border-color 150ms ease;
  }

  .results-pdf-card:hover {
    background: ${P.forestTint};
    border-color: ${P.forest};
  }

  .results-pdf-card-icon {
    font-size: 13px;
    color: ${P.forest};
    font-weight: 700;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
  }

  .results-pdf-card-label {
    font-family: "Archivo", sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: ${P.ink};
    line-height: 1.3;
  }

  .results-besmart-cta {
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: ${P.forestDeep};
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
  }

  .results-besmart-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.03) 0 1px,
      transparent 1px 8px
    );
    pointer-events: none;
  }

  .results-besmart-cta-heading {
    font-family: "Archivo", sans-serif;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #fff;
    margin-bottom: 4px;
  }

  .results-besmart-cta-sub {
    font-family: "Archivo", sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(255,255,255,0.65);
  }

  .results-besmart-cta-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .results-besmart-cta-primary {
    display: inline-flex;
    align-items: center;
    background: #fff;
    color: ${P.forestDeep};
    text-decoration: none;
    border-radius: 999px;
    padding: 9px 16px;
    font-family: "Archivo", sans-serif;
    font-size: 13px;
    font-weight: 700;
    transition: opacity 150ms ease;
  }

  .results-besmart-cta-primary:hover { opacity: 0.88; }

  .results-besmart-cta-secondary {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    border-radius: 999px;
    padding: 9px 16px;
    border: 1px solid rgba(255,255,255,0.3);
    font-family: "Archivo", sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: border-color 150ms ease, color 150ms ease;
  }

  .results-besmart-cta-secondary:hover {
    border-color: rgba(255,255,255,0.7);
    color: #fff;
  }
`;

function ResultsScreen({ score, total, onRetake }) {
  const tier = tierFor(score);
  const [toast, setToast] = useState(null);

  const pct = Math.round((score / total) * 100);
  const verdict = BOTTOM_LINE[6];

  async function share() {
    const msg = `I scored ${score}/${total} on the Safe Storage quiz. 75% of kids know where the gun is, even when parents think it's hidden. Try it yourself.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'NH Gun Facts Quiz', text: msg });
        return;
      }
    } catch { /* fall through */ }
    try {
      await navigator.clipboard.writeText(msg);
      setToast('Copied. Paste it anywhere.');
    } catch {
      setToast("Couldn't copy — try again");
    }
    setTimeout(() => setToast(null), 2200);
  }

  const jsx = (
    <>
      <style>{resultStyles}</style>
      <style>{beSmartStyles}</style>
      <div className="results-page">
        <div className="results-inner">

          <div className="results-top-row">
            <div className="results-hero">
              <div className="results-eyebrow">Your Results</div>
              <div className="results-score-row">
                <div className="results-score-number">
                  {score}<span className="results-score-denom">/{total}</span>
                </div>
                <div className="results-tier">
                  <h2 className="results-tier-heading">{tier.heading}</h2>
                  <p className="results-tier-body">{tier.body}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="results-bottom-row">
            <div className="results-verdict">
              <div className="results-verdict-eyebrow">What might surprise you most</div>
              <div className="results-verdict-headline">
                Most gun-owning parents wouldn't mind being asked.
              </div>
              <div className="results-verdict-text">
                <strong>The barrier isn't hostility. It's that the question doesn't occur to people.</strong>
              </div>
              <div className="results-verdict-text" style={{ marginTop: 10 }}>
                "Do you have guns at home, and how are they stored?" is a normal safety question, like asking about a pool or allergies.
              </div>
            </div>

            <a
              className="results-convo-starters"
              href="https://besmartforkids.org/secure-gun-storage/resources/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="results-convo-eyebrow">Not sure how to bring it up?</div>
              <div className="results-convo-link">Get conversation starters ↗</div>
              <div className="results-convo-sub">
                Be SMART has ready-to-use scripts for asking other parents about gun storage, so you don't have to figure out the words yourself.
              </div>
            </a>
          </div>

          <div className="results-besmart-section">
            <div className="results-besmart-intro">
              <div className="results-section-label">What you can do</div>
              <h2 className="results-besmart-heading">
                Be <span className="results-besmart-highlight">SMART</span>.
              </h2>
            </div>
            <div className="results-smart-list">
              {SMART_ITEMS.map(({ letter, word, desc }) => (
                <div className="results-smart-row" key={letter}>
                  <div className="results-smart-letter">{letter}</div>
                  <div className="results-smart-content">
                    <div className="results-smart-word">{word}</div>
                    <div className="results-smart-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="results-resources-block">
              <div className="results-resources-label">Useful resources</div>
              <div className="results-pdf-cards">
                {FEATURED_PDFS.map(({ label, url }) => (
                  <a
                    key={label}
                    className="results-pdf-card"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="results-pdf-card-icon">↓</span>
                    <span className="results-pdf-card-label">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="results-besmart-cta">
              <div className="results-besmart-cta-text">
                <div className="results-besmart-cta-heading">More from Be SMART</div>
                <div className="results-besmart-cta-sub">
                  A national program helping parents and caregivers reduce child gun deaths through secure storage.
                </div>
              </div>
              <div className="results-besmart-cta-links">
                <a
                  className="results-besmart-cta-primary"
                  href="https://besmartforkids.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  besmartforkids.org ↗
                </a>
                <a
                  className="results-besmart-cta-secondary"
                  href="https://besmartforkids.org/share/in-your-community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Community resources ↗
                </a>
              </div>
            </div>
            <div className="results-share-row" style={{ marginTop: 16 }}>
              <button className="results-btn-share" onClick={share}>
                Share this quiz ↗
              </button>
              <button className="results-btn-retake" onClick={onRetake}>
                Retake
              </button>
            </div>
            <details style={{ marginTop: 20, borderTop: `1px solid ${P.hair}`, paddingTop: 16 }}>
              <summary style={{
                fontFamily: '"Archivo", system-ui, sans-serif', fontSize: 12,
                fontWeight: 600,
                color: P.muted, cursor: 'pointer', listStyle: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                userSelect: 'none',
              }}>
                <span style={{
                  display: 'inline-block', fontSize: 9, transition: 'transform 200ms ease',
                }}>▶</span>
                Sources
              </summary>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  {
                    label: 'Q1: Safe storage rates (35% locked and unloaded)',
                    cite: 'Miller et al., JAMA Network Open, 2026',
                    url: 'https://jamanetwork.com/journals/jamanetworkopen',
                  },
                  {
                    label: 'Q1: NH gun ownership rate (~41% of adults)',
                    cite: 'CBS News / state gun ownership survey',
                    url: 'https://www.cbsnews.com/pictures/gun-ownership-rates-by-state/',
                  },
                  {
                    label: 'Q2: 75% of kids know where the gun is stored',
                    cite: 'Baxley & Miller (2006), Pediatrics; via UConn ARMS Center (2024)',
                    url: 'https://today.uconn.edu/2024/03/storing-firearms-at-home-what-uconn-experts-say/',
                  },
                  {
                    label: 'Q3: 60%+ of parents have never asked before a playdate',
                    cite: 'Garbutt et al., Pediatrics, 2024 (Lurie Children\'s Hospital)',
                    url: 'https://publications.aap.org/pediatrics/article-abstract/154/6/e2024068061',
                  },
                  {
                    label: 'Q3: ~20% of unintentional child gun deaths at a friend\'s home',
                    cite: 'Seattle Children\'s Hospital',
                    url: 'https://www.seattlechildrens.org/healthy-tides/guns-stored-safely/',
                  },
                  {
                    label: '4.6M children live with a loaded, unlocked gun',
                    cite: 'National Firearm Survey (2021) via Agree to Agree',
                    url: 'https://agreetoagree.org/conversation-guides/guns-in-the-home',
                  },
                  {
                    label: '8 children per day unintentionally injured or killed',
                    cite: 'Seattle Children\'s Hospital',
                    url: 'https://www.seattlechildrens.org/healthy-tides/guns-stored-safely/',
                  },
                ].map(({ label, cite, url }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{
                      fontFamily: '"Archivo", sans-serif', fontSize: 12,
                      fontWeight: 600, color: P.ink, lineHeight: 1.4,
                    }}>{label}</div>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: '"Archivo", sans-serif', fontSize: 11.5,
                      color: P.forest, textDecoration: 'none', lineHeight: 1.4,
                    }}>{cite} ↗</a>
                  </div>
                ))}
              </div>
            </details>
          </div>

        </div>

        {toast && (
          <div style={{
            position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            background: P.forestDeep, color: '#fff',
            padding: '10px 18px', borderRadius: 999,
            fontFamily: '"Archivo", sans-serif', fontSize: 13, fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            whiteSpace: 'nowrap', zIndex: 200,
          }}>{toast}</div>
        )}
      </div>
    </>
  );

  return createPortal(jsx, document.body);
}

// ─── About screen ──────────────────────────────────────────────────────
function AboutScreen({ onBack }) {
  return (
    <div style={{
      height: '100%', overflowY: 'auto', boxSizing: 'border-box',
      padding: '48px 28px 40px',
      background: P.cream,
      display: 'flex', flexDirection: 'column',
    }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: '"Archivo", system-ui, sans-serif',
        fontSize: 12, fontWeight: 600, color: P.muted,
        padding: 0, marginBottom: 32, alignSelf: 'flex-start',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>← Back</button>

      <Eyebrow color={P.rust} style={{ marginBottom: 12 }}>About this quiz</Eyebrow>
      <h2 style={{
        fontFamily: '"Archivo", system-ui, sans-serif',
        fontWeight: 900, fontSize: 28, lineHeight: 1.05,
        letterSpacing: '-0.02em', color: P.ink, margin: '0 0 24px',
      }}>
        Made by local Be <span style={{ color: P.forest }}>SMART</span> chapters
      </h2>

      <Body style={{ marginBottom: 16 }}>
        This quiz was created by local chapters of the{' '}
        <strong>Be SMART</strong> organization active in the{' '}
        <strong>Upper Valley, New Hampshire</strong>.
      </Body>
      <Body style={{ marginBottom: 16 }}>
        Be SMART is a program that empowers parents and adults to take
        responsible action to prevent gun violence by promoting the safe
        storage of firearms. SMART stands for:
      </Body>

      {[
        ['S', 'Secure', 'Secure all guns in your home and vehicles.'],
        ['M', 'Model', 'Model responsible behavior around firearms.'],
        ['A', 'Ask', 'Ask about unsecured guns in other homes.'],
        ['R', 'Recognize', 'Recognize the risks of teen suicide and unintentional shootings.'],
        ['T', 'Tell', 'Tell your peers to be SMART.'],
      ].map(([letter, word, desc]) => (
        <div key={letter} style={{
          display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6, flexShrink: 0,
            background: P.forest, color: '#fff',
            fontFamily: '"Archivo", sans-serif', fontWeight: 900, fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{letter}</div>
          <div>
            <div style={{
              fontFamily: '"Archivo", sans-serif', fontWeight: 700,
              fontSize: 14, color: P.ink, marginBottom: 2,
            }}>{word}</div>
            <Body style={{ fontSize: 14, color: P.muted }}>{desc}</Body>
          </div>
        </div>
      ))}

      <HairLine style={{ margin: '24px 0' }} />
      <Body style={{ fontSize: 14, color: P.muted }}>
        Learn more at{' '}
        <a href="https://besmartforkids.org" target="_blank" rel="noopener noreferrer"
          style={{ color: P.forest, fontWeight: 600 }}>
          besmartforkids.org
        </a>
      </Body>
    </div>
  );
}

// ─── App root ──────────────────────────────────────────────────────────
export default function App() {
  const [deck, setDeck] = useState(() => buildDeck());
  const [screen, setScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);

  function pick(i) {
    if (revealed) return;
    setSelectedIdx(i);
    setRevealed(true);
    if (deck[currentQuestion].answers[i].correct) setScore(s => s + 1);
  }

  function next() {
    const isLast = currentQuestion === deck.length - 1;
    if (isLast) {
      setScreen('results');
      setTransitionKey(k => k + 1);
      return;
    }
    setCurrentQuestion(i => i + 1);
    setSelectedIdx(null);
    setRevealed(false);
    setTransitionKey(k => k + 1);
  }

  function retake() {
    setDeck(buildDeck());
    setScreen('welcome');
    setCurrentQuestion(0);
    setSelectedIdx(null);
    setRevealed(false);
    setScore(0);
    setTransitionKey(k => k + 1);
  }

  const variant = new URLSearchParams(window.location.search).get('v') === 'illustrated'
    ? 'illustrated'
    : 'photo';

  let content;
  if (screen === 'about') {
    content = <AboutScreen onBack={() => { setScreen('welcome'); setTransitionKey(k => k + 1); }} />;
  } else if (screen === 'welcome') {
    content = (
      <WelcomeScreen
        onStart={() => { setScreen('question'); setTransitionKey(k => k + 1); }}
        onAbout={() => { setScreen('about'); setTransitionKey(k => k + 1); }}
        variant={variant}
      />
    );
  } else if (screen === 'question') {
    content = (
      <QuestionScreen
        key={currentQuestion}
        question={deck[currentQuestion]}
        index={currentQuestion}
        total={deck.length}
        selectedIdx={selectedIdx}
        revealed={revealed}
        onPick={pick}
        onNext={next}
        isLast={currentQuestion === deck.length - 1}
      />
    );
  } else {
    content = <ResultsScreen score={score} total={deck.length} onRetake={retake} />;
  }

  return (
    <div key={transitionKey} style={{ height: '100%', animation: 'fadeSlide 320ms ease' }}>
      {content}
    </div>
  );
}
