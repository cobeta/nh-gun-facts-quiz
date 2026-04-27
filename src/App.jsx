import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { buildDeck, tierFor, BOTTOM_LINE } from './quiz-data.js';

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
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
      textTransform: 'uppercase', color, ...style,
    }}>{children}</div>
  );
}

function Display({ children, style }) {
  return (
    <h1 style={{
      fontFamily: '"Archivo", system-ui, sans-serif',
      fontWeight: 900, fontStretch: '125%',
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
function WelcomeScreen({ onStart }) {
  return (
    <div style={{
      height: '100%', background: P.forest, color: '#fff',
      display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0 2px, transparent 2px 6px)',
      }} />

      {/* header — fixed size */}
      <div style={{
        padding: '32px 24px 0', flexShrink: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, background: P.rust, borderRadius: 2 }} />
          <Eyebrow color="#fff">Gun Facts</Eyebrow>
        </div>
        <Eyebrow color="rgba(255,255,255,0.7)">New Hampshire</Eyebrow>
      </div>

      {/* stamp — grows to fill available space, shrinks on short screens */}
      <div style={{
        flex: 1, minHeight: 0,
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            transform: 'translate(6px, 6px)',
            opacity: 0, animation: 'stampShadow 400ms ease 1050ms forwards',
          }}>
            <svg viewBox="0 0 150 290" width="104" height="200" style={{ display: 'block', overflow: 'visible' }}>
              <path d={NH_PATH} fill={P.rust} fillOpacity="0.7" />
            </svg>
          </div>
          <NHStamp color="#fff" />
        </div>
      </div>

      {/* title — fixed size */}
      <div style={{ padding: '0 24px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <Eyebrow color="rgba(255,255,255,0.8)" style={{ marginBottom: 10, textAlign: 'center' }}>
          Six questions · Two minutes
        </Eyebrow>
        <Display style={{ fontSize: 34, color: '#fff', textAlign: 'center' }}>
          What do you{' '}
          <span style={{ color: '#FFCF2D' }}>actually</span>{' '}
          know about guns in&nbsp;NH?
        </Display>
      </div>

      {/* CTA — fixed size */}
      <div style={{ padding: '20px 24px 28px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <button onClick={onStart}
          style={{
            background: P.rust, color: '#fff', border: 'none',
            borderRadius: 999, padding: '16px 24px', width: '100%',
            fontFamily: '"Archivo", sans-serif', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.005em', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
          }}>
          <span>Take the quiz</span>
          <span style={{ fontSize: 20, lineHeight: 1 }}>→</span>
        </button>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Eyebrow color="rgba(255,255,255,0.55)">No login · No data kept</Eyebrow>
        </div>
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
        <Eyebrow color={P.muted}>NH Gun Facts</Eyebrow>
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
        <Display style={{ fontSize: 26, lineHeight: 1.1, fontStretch: '100%' }}>
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
                {picked.feedback}
              </Body>
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
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${P.rust};
    margin-bottom: 20px;
  }

  .results-score-row {
    display: flex;
    align-items: flex-end;
    gap: 24px;
    margin-bottom: 24px;
  }

  .results-score-number {
    font-size: clamp(80px, 18vw, 140px);
    font-weight: 900;
    font-stretch: 125%;
    line-height: 0.85;
    letter-spacing: -0.05em;
    color: ${P.rust};
  }

  .results-score-denom {
    color: rgba(26,26,26,0.2);
    font-size: 0.48em;
    vertical-align: super;
  }

  .results-tier {
    flex: 1;
    padding-bottom: 4px;
  }

  .results-tier-heading {
    font-size: clamp(16px, 3vw, 22px);
    font-weight: 900;
    font-stretch: 125%;
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

  .results-facts-section {
    padding: 36px 24px 0;
  }

  .results-section-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${P.forest};
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .results-section-label::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: ${P.forest};
    border-radius: 2px;
    flex-shrink: 0;
  }

  .results-facts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: rgba(26,26,26,0.1);
    border: 1px solid rgba(26,26,26,0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .results-fact-cell {
    background: ${P.cream};
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .results-fact-stat {
    font-size: clamp(20px, 4vw, 28px);
    font-weight: 900;
    font-stretch: 125%;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .results-fact-label {
    font-size: clamp(11px, 1.4vw, 13px);
    line-height: 1.35;
    color: ${P.muted};
    text-wrap: pretty;
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
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${P.rust};
    margin-bottom: 12px;
  }

  .results-verdict-stat {
    font-size: clamp(52px, 12vw, 88px);
    font-weight: 900;
    font-stretch: 125%;
    letter-spacing: -0.04em;
    line-height: 0.9;
    color: #fff;
    margin-bottom: 14px;
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

  .results-credit {
    padding: 12px 24px 28px;
    font-family: "JetBrains Mono", monospace;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
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
    .results-facts-section { padding: 0; }

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

    .results-credit {
      padding: 12px 0 28px;
    }

    /* Desktop typography */
    .results-score-number  { font-size: 88px; }
    .results-tier-heading  { font-size: 20px; font-stretch: 100%; }
    .results-tier-body     { font-size: 14px; }
    .results-fact-stat     { font-size: 22px; font-stretch: 100%; }
    .results-fact-label    { font-size: 12px; }
    .results-verdict-stat  { font-size: 52px; margin-bottom: 8px; }
    .results-verdict-text  { font-size: 14px; }
    .results-verdict-eyebrow { margin-bottom: 8px; }

    .results-score-row     { margin-bottom: 12px; }
    .results-eyebrow       { margin-bottom: 12px; }
    .results-section-label { margin-bottom: 12px; }
    .results-fact-cell     { padding: 14px 16px; gap: 6px; }

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
    font-stretch: 125%;
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
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${P.forest};
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .results-resources-label::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: ${P.forest};
    border-radius: 2px;
    flex-shrink: 0;
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
    font-stretch: 125%;
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
  const facts = BOTTOM_LINE.slice(0, 6);
  const verdict = BOTTOM_LINE[6];

  async function share() {
    const msg = `I scored ${score}/${total} on the NH Gun Facts quiz. Most Granite Staters support background checks, protective orders, and waiting periods. Try it yourself.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'NH Gun Facts Quiz', text: msg });
        return;
      }
    } catch { /* fall through */ }
    try {
      await navigator.clipboard.writeText(msg);
      setToast('Copied — paste it anywhere');
    } catch {
      setToast("Couldn't copy — try again");
    }
    setTimeout(() => setToast(null), 2200);
  }

  const statColors = [P.rust, P.forest, P.rust, P.forest, P.rust, P.forest];

  const jsx = (
    <>
      <style>{resultStyles}</style>
      <style>{beSmartStyles}</style>
      <div className="results-page">
        <div className="results-inner">

          <div className="results-top-row">
            <div className="results-hero">
              <div className="results-eyebrow">NH Gun Facts · Your Results</div>
              <div className="results-score-row">
                <div className="results-score-number">
                  {score}<span className="results-score-denom">/{total}</span>
                </div>
              </div>
              <div className="results-tier">
                <h2 className="results-tier-heading">{tier.heading}</h2>
                <p className="results-tier-body">{tier.body}</p>
              </div>
            </div>

            <div className="results-facts-section">
              <div className="results-section-label">What the data says</div>
              <div className="results-facts-grid">
                {facts.map((item, i) => (
                  <div className="results-fact-cell" key={i}>
                    <div className="results-fact-stat" style={{ color: statColors[i] }}>
                      {item.stat}
                    </div>
                    <div className="results-fact-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="results-bottom-row">
            <div className="results-verdict">
              <div className="results-verdict-eyebrow">What lawmakers did about it</div>
              <div className="results-verdict-stat">{verdict.stat}</div>
              <div className="results-verdict-text">
                <strong>NH lawmakers voted down the background check bill anyway.</strong>{' '}
                84% of residents support it. Gun owners and non-gun owners agree.
                The votes didn't reflect the people.
              </div>
            </div>
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
                  Be SMART is a national program helping parents and caregivers
                  reduce child gun deaths through secure storage.
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
            <div className="results-credit">
              Facts compiled by 603 GVP · NH DHHS · UNH Survey Center · EFSGV
            </div>
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

  let content;
  if (screen === 'welcome') {
    content = (
      <WelcomeScreen
        onStart={() => { setScreen('question'); setTransitionKey(k => k + 1); }}
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
