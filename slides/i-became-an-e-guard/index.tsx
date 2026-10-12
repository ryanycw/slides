import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import {
  MorphElement,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import img53L2s from '@assets/53L2s.png';
import imgL2Beat from '@assets/L2Beat.png';
import imgInfiniteGarden from '@assets/Infinite Garden.png';
import imgFromAAToAgentic from '@assets/From AA to Agentic.png';
import imgRpf from './assets/nft-rpf.jpg';
import imgRpfTile from './assets/nft-rpf-tile.jpg';
import imgKatana from './assets/nft-katana.jpg';
import imgMurmur from './assets/nft-murmur.jpg';
import imgMurmurTile from './assets/nft-murmur-tile.jpg';
import imgChangling from './assets/nft-changling.jpg';
import imgChenpu from './assets/nft-chenpu.jpg';
import imgNpm from './assets/nft-npm.jpg';
import imgMintverse from './assets/nft-mintverse.jpg';
import imgMintverseTile from './assets/nft-mintverse-tile.jpg';
import imgAsmeir from './assets/nft-asmeir.jpg';
import imgGlenrothes from './assets/nft-glenrothes.jpg';
import imgHuangdu from './assets/nft-huangdu.jpg';
import imgObjectTheatre from './assets/nft-object-theatre.jpg';

export const design: DesignSystem = {
  palette: { bg: '#f5f0e6', text: '#1f1c18', accent: '#2b59c3' },
  fonts: {
    display: '"Noto Serif TC", "Songti TC", "PMingLiU", serif',
    body: '-apple-system, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 160, body: 40 },
  radius: 6,
};

// Notebook extras beyond the DesignSystem shape.
const hand = '"LXGW WenKai TC", "Kaiti TC", "BiauKai", "STKaiti", serif';
const pencil = '#8a8378';
const marker = 'rgba(247, 214, 74, 0.85)';
const eth = '#6b5bd2';
const stickyYellow = '#f9e58a';
const stickyBlue = '#d6e6f5';
const tape = 'rgba(232, 214, 160, 0.78)';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

/* ------------------------------------------------ Webfonts + keyframes (module-level, injected once) */

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&family=Noto+Serif+TC:wght@700;900&display=swap';
const FONT_LINK_ID = 'osd-webfont-i-became-an-e-guard';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

const STYLE_ID = 'osd-style-i-became-an-e-guard';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
@keyframes eg-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
@keyframes eg-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes eg-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes eg-hl { from { background-size: 0% 100%; } to { background-size: 100% 100%; } }
@keyframes eg-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes eg-stamp {
  0% { opacity: 0; transform: rotate(-8deg) scale(1.7); }
  60% { opacity: 1; transform: rotate(-8deg) scale(0.94); }
  100% { opacity: 1; transform: rotate(-8deg) scale(1); }
}
@keyframes eg-pulse {
  0% { box-shadow: 0 0 0 0 rgba(43, 89, 195, 0.45); }
  100% { box-shadow: 0 0 0 22px rgba(43, 89, 195, 0); }
}
@keyframes eg-drift { from { transform: translateY(0); } to { transform: translateY(-14px); } }
@keyframes eg-pop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
`;
  document.head.appendChild(style);
}

/* ------------------------------------------------ Transitions */

// House transition: PAGE TURN — a 6 px sideways nudge that mirrors on backward navigation.
export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateX(0)' },
      { opacity: 0, transform: 'translateX(calc(-4px * var(--osd-dir, 1)))' },
    ],
  },
  enter: {
    duration: 220,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateX(calc(6px * var(--osd-dir, 1)))' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
  },
};

// Chapter breaks breathe.
const breath: SlideTransition = {
  duration: 460,
  exit: { duration: 180, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: {
    duration: 240,
    delay: 300,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const settle: SlideTransition = {
  duration: 280,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-6px)' },
    ],
  },
  enter: {
    duration: 280,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

const MORPH_MS = 868;
const morphTransition: SlideTransition = {
  duration: 280,
  exit: { duration: 224, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 308, delay: 112, easing: EASE_OUT, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  morph: { duration: MORPH_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
};

/* ------------------------------------------------ Paper + footer */

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
} as const;

const paperBg: CSSProperties = {
  background: 'var(--osd-bg)',
  backgroundImage: [
    'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)',
    'repeating-linear-gradient(to bottom, transparent 0, transparent 71px, rgba(80,110,170,0.12) 71px, rgba(80,110,170,0.12) 72px)',
  ].join(', '),
};

const Hole = ({ top }: { top: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 64,
      top,
      width: 34,
      height: 34,
      borderRadius: 999,
      background: '#e4dccb',
      boxShadow: 'inset 0 3px 6px rgba(60,40,10,0.25)',
    }}
  />
);

const Footer = ({ chapter }: { chapter: string }) => {
  const { current } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 240,
        right: 160,
        bottom: 52,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: hand,
        fontSize: 26,
        color: pencil,
      }}
    >
      <span>{chapter}</span>
      <span>p. {String(current).padStart(2, '0')}</span>
    </div>
  );
};

const Paper = ({
  chapter,
  children,
  overlay,
  center,
}: {
  chapter?: string;
  children?: ReactNode;
  overlay?: ReactNode;
  center?: boolean;
}) => (
  <div style={{ ...fill, ...paperBg, color: 'var(--osd-text)' }}>
    <div
      style={{
        position: 'absolute',
        left: 168,
        top: 0,
        bottom: 0,
        width: 3,
        background: 'var(--osd-accent)',
        opacity: 0.45,
      }}
    />
    <Hole top={180} />
    <Hole top={523} />
    <Hole top={866} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '140px 160px 150px 240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: center ? 'center' : 'flex-start',
      }}
    >
      {children}
    </div>
    {overlay}
    {chapter ? <Footer chapter={chapter} /> : null}
  </div>
);

/* ------------------------------------------------ Motion helpers (all gated on the active page) */

const useActive = () => useIsActivePage();

const Rise = ({ delay = 0, style, children }: { delay?: number; style?: CSSProperties; children: ReactNode }) => {
  const active = useActive();
  return (
    <div style={{ ...style, animation: active ? `eg-rise 0.7s ${EASE_OUT} ${delay}s both` : undefined }}>
      {children}
    </div>
  );
};

const Hl = ({ delay = 0.6, children }: { delay?: number; children: ReactNode }) => {
  const active = useActive();
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(transparent 58%, ${marker} 58%, ${marker} 94%, transparent 94%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        padding: '0 6px',
        WebkitBoxDecorationBreak: 'clone',
        boxDecorationBreak: 'clone',
        animation: active ? `eg-hl 0.9s ${EASE_OUT} ${delay}s both` : undefined,
      }}
    >
      {children}
    </span>
  );
};

const Underline = ({
  delay = 0.6,
  color = 'var(--osd-accent)',
  children,
}: {
  delay?: number;
  color?: string;
  children: ReactNode;
}) => {
  const active = useActive();
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: -6, bottom: -16, width: 'calc(100% + 12px)', height: 24, overflow: 'visible' }}
      >
        <path
          d="M4 16 C 60 6, 120 22, 180 12 S 270 8, 296 14"
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{ animation: active ? `eg-draw 0.8s ${EASE_OUT} ${delay}s both` : undefined }}
        />
      </svg>
    </span>
  );
};

const Circled = ({ delay = 0.6, children }: { delay?: number; children: ReactNode }) => {
  const active = useActive();
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: -36, top: -22, width: 'calc(100% + 72px)', height: 'calc(100% + 44px)', overflow: 'visible' }}
      >
        <path
          d="M160 8 C 262 4, 298 30, 292 52 C 284 82, 182 96, 100 90 C 30 84, 2 64, 8 40 C 14 16, 70 4, 176 12"
          fill="none"
          stroke="var(--osd-accent)"
          strokeWidth={5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{ animation: active ? `eg-draw 1s ${EASE_OUT} ${delay}s both` : undefined }}
        />
      </svg>
    </span>
  );
};

const Strike = ({ delay = 0.8, children }: { delay?: number; children: ReactNode }) => {
  const active = useActive();
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <svg
        viewBox="0 0 300 40"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: -12, top: '38%', width: 'calc(100% + 24px)', height: 40, overflow: 'visible' }}
      >
        <path
          d="M4 26 C 80 16, 160 22, 296 10"
          fill="none"
          stroke="var(--osd-accent)"
          strokeWidth={9}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{ animation: active ? `eg-draw 0.6s ${EASE_OUT} ${delay}s both` : undefined }}
        />
      </svg>
    </span>
  );
};

const CountUp = ({ to, duration = 1400 }: { to: number; duration?: number }) => {
  const active = useActive();
  const [value, setValue] = useState(active ? 0 : to);
  useEffect(() => {
    if (!active) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>;
};

/* ------------------------------------------------ Notebook bits */

const Hand = ({
  size = 40,
  color = pencil,
  weight = 400,
  children,
}: {
  size?: number;
  color?: string;
  weight?: number;
  children: ReactNode;
}) => (
  <div style={{ fontFamily: hand, fontSize: size, color, fontWeight: weight, lineHeight: 1.5 }}>{children}</div>
);

const Heading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 72,
      fontWeight: 900,
      margin: 0,
      lineHeight: 1.2,
      letterSpacing: 1,
    }}
  >
    {children}
  </h2>
);

const E = ({ children }: { children: ReactNode }) => <span style={{ color: eth }}>{children}</span>;
const Accent = ({ children }: { children: ReactNode }) => <span style={{ color: 'var(--osd-accent)' }}>{children}</span>;

const TapeStrip = ({ style }: { style: CSSProperties }) => (
  <div style={{ position: 'absolute', width: 150, height: 40, background: tape, boxShadow: '0 1px 2px rgba(0,0,0,0.08)', ...style }} />
);

const Tag = ({ rotate = -1.5, color = 'var(--osd-text)', children }: { rotate?: number; color?: string; children: ReactNode }) => (
  <span
    style={{
      display: 'inline-block',
      background: tape,
      color,
      fontFamily: hand,
      fontSize: 34,
      fontWeight: 700,
      padding: '10px 28px',
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 2px 4px rgba(60,40,10,0.12)',
    }}
  >
    {children}
  </span>
);

const Sticky = ({
  tone = 'todo',
  rotate = 1.5,
  width = 680,
  children,
}: {
  tone?: 'todo' | 'ref';
  rotate?: number;
  width?: number;
  children: ReactNode;
}) => (
  <div
    style={{
      position: 'relative',
      width,
      background: tone === 'todo' ? stickyYellow : stickyBlue,
      padding: '48px 48px 52px',
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 22px 34px -16px rgba(60,40,10,0.4)',
      fontFamily: hand,
      fontSize: 34,
      lineHeight: 1.6,
      color: 'var(--osd-text)',
    }}
  >
    <TapeStrip style={{ top: -18, left: '50%', marginLeft: -75, transform: 'rotate(-3deg)' }} />
    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--osd-accent)', letterSpacing: 2, marginBottom: 12 }}>
      {tone === 'todo' ? 'TODO · 待補個人故事' : 'REF · 待補參考資料'}
    </div>
    {children}
  </div>
);

const DraftStamp = () => {
  const active = useActive();
  return (
    <div
      style={{
        position: 'absolute',
        right: 150,
        top: 96,
        border: '5px solid var(--osd-accent)',
        borderRadius: 10,
        color: 'var(--osd-accent)',
        fontFamily: hand,
        fontWeight: 700,
        fontSize: 32,
        letterSpacing: 4,
        padding: '10px 26px',
        opacity: 0.85,
        transform: 'rotate(-8deg)',
        animation: active ? `eg-stamp 0.5s ${EASE_OUT} 0.3s both` : undefined,
      }}
    >
      草稿 · DRAFT
    </div>
  );
};

/* ------------------------------------------------ Chapter track (the thread through the talk) */

const STATION_GAP = 180;

const Station = ({ i, label, state }: { i: number; label: string; state: 'past' | 'now' | 'future' }) => {
  const active = useActive();
  const size = state === 'now' ? 34 : 22;
  return (
    <div
      style={{
        position: 'absolute',
        left: i * STATION_GAP,
        top: 24,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          marginTop: -size / 2,
          borderRadius: 999,
          background: state === 'now' ? 'var(--osd-accent)' : state === 'past' ? 'var(--osd-text)' : 'var(--osd-bg)',
          border: state === 'future' ? `3px solid ${pencil}` : 'none',
          boxSizing: 'border-box',
          animation: state === 'now' && active ? 'eg-pulse 1.6s ease-out 0.9s infinite' : undefined,
        }}
      />
      <div
        style={{
          fontFamily: hand,
          fontSize: 26,
          fontWeight: state === 'now' ? 700 : 400,
          color: state === 'now' ? 'var(--osd-accent)' : state === 'past' ? 'var(--osd-text)' : pencil,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const ChapterTrack = ({ current }: { current: number }) => {
  const active = useActive();
  const k = current - 1;
  const st = (i: number) => (i < k ? 'past' : i === k ? 'now' : 'future');
  return (
    <div style={{ position: 'absolute', left: 240, bottom: 150, width: 1440, height: 110 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 23, borderTop: `3px dashed ${pencil}`, opacity: 0.6 }} />
      {k > 1 ? (
        <div style={{ position: 'absolute', left: 0, top: 22, width: (k - 1) * STATION_GAP, height: 5, background: 'var(--osd-text)' }} />
      ) : null}
      {k > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: (k - 1) * STATION_GAP,
            top: 22,
            width: STATION_GAP,
            height: 5,
            background: 'var(--osd-accent)',
            transformOrigin: 'left center',
            animation: active ? `eg-grow 0.9s ${EASE_OUT} 0.4s both` : undefined,
          }}
        />
      ) : null}
      <Station i={0} label="文藝復興" state={st(0)} />
      <Station i={1} label="NFT" state={st(1)} />
      <Station i={2} label="Luna · FTX" state={st(2)} />
      <Station i={3} label="DeFi" state={st(3)} />
      <Station i={4} label="L2" state={st(4)} />
      <Station i={5} label="Privacy" state={st(5)} />
      <Station i={6} label="AA" state={st(6)} />
      <Station i={7} label="Lean" state={st(7)} />
      <Station i={8} label="初心" state={st(8)} />
    </div>
  );
};

/* ------------------------------------------------ Page templates */

const ChapterDivider = ({
  n,
  label,
  title,
  sub,
  year,
}: {
  n: number;
  label: string;
  title: ReactNode;
  sub: string;
  year: string;
}) => {
  const active = useActive();
  return (
    <Paper
      overlay={
        <>
          <div
            style={{
              position: 'absolute',
              right: 150,
              top: 90,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 340,
              fontWeight: 900,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '3px rgba(31,28,24,0.13)',
              animation: active ? `eg-fade 1.2s ${EASE_OUT} 0.2s both, eg-drift 6s ease-in-out 1.4s infinite alternate` : undefined,
            }}
          >
            {year}
          </div>
          <ChapterTrack current={n} />
        </>
      }
    >
      <div style={{ marginTop: 60 }}>
        <Rise>
          <Hand size={44} color="var(--osd-accent)" weight={700}>
            {label}
          </Hand>
        </Rise>
        <Rise delay={0.15}>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 128,
              fontWeight: 900,
              lineHeight: 1.15,
              marginTop: 24,
            }}
          >
            {title}
          </div>
        </Rise>
        <Rise delay={0.35}>
          <div style={{ marginTop: 36 }}>
            <Hand size={44}>{sub}</Hand>
          </div>
        </Rise>
      </div>
    </Paper>
  );
};

const Statement = ({
  chapter,
  kicker,
  note,
  draft,
  children,
}: {
  chapter: string;
  kicker?: string;
  note?: ReactNode;
  draft?: boolean;
  children: ReactNode;
}) => (
  <Paper chapter={chapter} center overlay={draft ? <DraftStamp /> : null}>
    {kicker ? (
      <Rise>
        <Hand size={40} color="var(--osd-accent)" weight={700}>
          {kicker}
        </Hand>
      </Rise>
    ) : null}
    <Rise delay={0.15}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 100,
          fontWeight: 900,
          lineHeight: 1.38,
          marginTop: 28,
        }}
      >
        {children}
      </div>
    </Rise>
    {note ? (
      <Rise delay={0.9}>
        <div style={{ marginTop: 56, maxWidth: 1400 }}>
          <Hand size={38}>{note}</Hand>
        </div>
      </Rise>
    ) : null}
  </Paper>
);

const DraftPage = ({
  title,
  direction,
  refNote,
}: {
  title: ReactNode;
  direction: string;
  refNote: string;
}) => (
  <Paper chapter="第一章 · 文藝復興" overlay={<DraftStamp />}>
    <Rise>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 900, lineHeight: 1.2, marginTop: 40 }}>
        {title}
      </div>
    </Rise>
    <Rise delay={0.2}>
      <div style={{ fontSize: 44, lineHeight: 1.5, marginTop: 48, maxWidth: 1380 }}>{direction}</div>
    </Rise>
    <Rise delay={0.5} style={{ marginTop: 'auto', alignSelf: 'flex-end', marginRight: 40 }}>
      <Sticky tone="ref" rotate={-1.5} width={860}>
        {refNote}
      </Sticky>
    </Rise>
  </Paper>
);

const ImageFigure = ({
  chapter,
  title,
  lead,
  img,
  cap,
}: {
  chapter: string;
  title: ReactNode;
  lead?: string;
  img: string;
  cap: string;
}) => (
  <Paper chapter={chapter}>
    <Heading>{title}</Heading>
    {lead ? (
      <div style={{ marginTop: 12 }}>
        <Hand size={36}>{lead}</Hand>
      </div>
    ) : null}
    <Rise delay={0.2} style={{ flex: 1, minHeight: 0, marginTop: 32, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ffffff',
          padding: 18,
          transform: 'rotate(-0.6deg)',
          boxShadow: '0 24px 40px -22px rgba(60,40,10,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <TapeStrip style={{ top: -16, left: 60, transform: 'rotate(-6deg)' }} />
        <TapeStrip style={{ top: -16, right: 60, transform: 'rotate(5deg)' }} />
      </div>
    </Rise>
    <div style={{ marginTop: 22, textAlign: 'right' }}>
      <Hand size={24}>{cap}</Hand>
    </div>
  </Paper>
);

const BigNumber = ({
  chapter,
  label,
  to,
  unit,
  caption,
  source,
}: {
  chapter: string;
  label: string;
  to: number;
  unit: string;
  caption: string;
  source: string;
}) => (
  <Paper chapter={chapter} center>
    <Rise>
      <Hand size={40} color="var(--osd-accent)" weight={700}>
        {label}
      </Hand>
    </Rise>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 8 }}>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 120, fontWeight: 900, color: pencil }}>≈</span>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 300,
          fontWeight: 900,
          lineHeight: 1.05,
          color: 'var(--osd-accent)',
        }}
      >
        <CountUp to={to} />
      </span>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 96, fontWeight: 900 }}>{unit}</span>
    </div>
    <Rise delay={1.2}>
      <div style={{ fontSize: 44, lineHeight: 1.5, marginTop: 32 }}>{caption}</div>
    </Rise>
    <div style={{ marginTop: 40 }}>
      <Hand size={24}>{source}</Hand>
    </div>
  </Paper>
);

/* ================================================ 開場 */

const Cover: Page = () => (
  <Paper
    center
    overlay={
      <div style={{ position: 'absolute', left: 240, bottom: 110 }}>
        <Rise delay={0.8}>
          <div style={{ width: 80, height: 5, background: 'var(--osd-accent)', marginBottom: 24 }} />
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 900 }}>
            Ryan<span style={{ color: pencil, fontWeight: 700 }}>（ryanycw）</span>
          </div>
          <Hand size={32}>當不了王以太可以來當以太王</Hand>
        </Rise>
      </div>
    }
  >
    <Rise delay={0.15}>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 900,
          lineHeight: 1.18,
          margin: 0,
        }}
      >
        我成為
        <br />
        <Underline delay={0.9}>
          <E>E</E>衛兵
        </Underline>
        的日子
      </h1>
    </Rise>
    <Rise delay={0.5}>
      <div style={{ marginTop: 56 }}>
        <Hand size={44}>從 NFT、崩盤、DeFi，一路走到 Mass Adoption 的前夜</Hand>
      </div>
    </Rise>
  </Paper>
);
Cover.transition = settle;

const OpeningQuestion: Page = () => (
  <Statement
    chapter="開場"
  >
    一趟<Hl delay={0.9}>沒有終點</Hl>的旅程？
  </Statement>
);

const Stop = ({ n, title, sub, delay }: { n: string; title: string; sub: string; delay: number }) => (
  <Rise delay={delay}>
    <div
      style={{
        height: 170,
        borderLeft: '4px solid var(--osd-accent)',
        paddingLeft: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <div style={{ fontFamily: hand, fontSize: 30, color: 'var(--osd-accent)', fontWeight: 700 }}>{n}</div>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 900, lineHeight: 1.25 }}>{title}</div>
      <div style={{ fontFamily: hand, fontSize: 28, color: pencil }}>{sub}</div>
    </div>
  </Rise>
);

const Roadmap: Page = () => (
  <Paper chapter="開場">
    <Heading>今天的路線圖</Heading>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        columnGap: 56,
        rowGap: 40,
        marginTop: 56,
      }}
    >
      <Stop n="第一章" title="文藝復興" sub="為什麼這件事重要" delay={0.1} />
      <Stop n="第二章" title="NFT 夏天" sub="第一次覺得能參與" delay={0.18} />
      <Stop n="第三章" title="Luna、FTX" sub="信仰被測試的一年" delay={0.26} />
      <Stop n="第四章" title="走入 DeFi" sub="從旁觀到寫合約" delay={0.34} />
      <Stop n="第五章" title="L2 Scaling" sub="未來在誰手中？" delay={0.42} />
      <Stop n="第六章" title="Privacy · PSE" sub="另一群人的路" delay={0.5} />
      <Stop n="第七章" title="帳戶抽象 AA" sub="給一般人用的以太坊" delay={0.58} />
      <Stop n="第八章" title="Lean Ethereum" sub="簡單才能長久" delay={0.66} />
      <Stop n="終章" title="找到自己的理由" sub="穩固內核" delay={0.74} />
    </div>
  </Paper>
);

/* ================================================ 第一章 · 文藝復興（DRAFT） */

const Ch1: Page = () => (
  <ChapterDivider n={1} label="第一章" title="文藝復興" sub="區塊鏈、去中心化、抗審查，為什麼重要？" year="2008" />
);
Ch1.transition = breath;

const Renaissance: Page = () => (
  <DraftPage
    title="為什麼叫「文藝復興」？"
    direction="印刷術讓知識不再被少數人壟斷；區塊鏈讓「信任」不再被少數人壟斷。"
    refNote="古騰堡印刷術（1440）→ 宗教改革 → 知識去中心化的類比"
  />
);

const CostOfTrust: Page = () => (
  <DraftPage
    title="信任，是有成本的"
    direction="銀行、政府、平台——人們每天都在付「信任中介費」，只是沒看見帳單。"
    refNote="跨境匯款手續費數據、帳戶被凍結的案例、平台抽成比例"
  />
);

const Genesis: Page = () => (
  <DraftPage
    title="2008：一份九頁的白皮書"
    direction="金融海嘯之後，中本聰在比特幣創世區塊裡，留下一則《泰晤士報》的頭條。"
    refNote="創世區塊訊息：“Chancellor on brink of second bailout for banks”"
  />
);

const WhatIsDecentralization: Page = () => (
  <DraftPage
    title="什麼是去中心化？"
    direction="不是沒有人負責，而是沒有任何一個人，能說了算。"
    refNote="Vitalik〈The Meaning of Decentralization〉(2017)：架構 / 政治 / 邏輯三個維度"
  />
);

const CensorshipStory: Page = () => (
  <DraftPage
    title="抗審查：一個真實的故事"
    direction="當你的錢、你說的話、你的身分，都可以被別人一鍵關掉。"
    refNote="候選：WikiLeaks 金流封鎖、抗議者帳戶被凍結、高通膨國家的穩定幣使用"
  />
);

const CredibleNeutrality: Page = () => (
  <DraftPage
    title="可信中立 Credible Neutrality"
    direction="規則對每個人都一樣，而且每個人都能自己驗證。"
    refNote="Vitalik〈Credible Neutrality as a Guiding Principle〉(2020)"
  />
);

const WorldComputer: Page = () => (
  <DraftPage
    title={
      <>
        <E>以太坊</E>：一台世界電腦
      </>
    }
    direction="比特幣讓「錢」去中心化；以太坊讓「程式」去中心化。"
    refNote="以太坊白皮書（2013）、智能合約、2015 主網上線、2022 The Merge"
  />
);

const Permissionless: Page = () => (
  <DraftPage
    title="一個人，也可以⋯⋯"
    direction="發行資產、建立市場、組織社群——不需要任何人的許可。"
    refNote="Permissionless 案例：Uniswap、DAO、學生自己發起的鏈上專案"
  />
);

const Ch1Summary: Page = () => (
  <Statement chapter="第一章 · 文藝復興" kicker="小結" draft>
    這不是錢的事，
    <br />
    是「<Underline delay={0.9}>誰說了算</Underline>」的事。
  </Statement>
);

/* ================================================ 第二章 · NFT */

const Ch2: Page = () => (
  <ChapterDivider n={2} label="第二章" title="NFT 夏天" sub="和台灣藝術家、畫廊、品牌一起做 NFT" year="2021" />
);
Ch2.transition = breath;

const NftOneLine: Page = () => (
  <Statement chapter="第二章 · NFT" kicker="NFT">
    不是一張圖，
    <br />
    是一份「誰擁有它」的
    <br />
    <Hl delay={0.9}>公開紀錄</Hl>。
  </Statement>
);

const WallTile = ({ img, name, kind, rotate, delay }: { img: string; name: string; kind: string; rotate: number; delay: number }) => (
  <Rise delay={delay}>
    <div
      style={{
        background: '#ffffff',
        padding: '12px 12px 14px',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 16px 26px -18px rgba(60,40,10,0.5)',
      }}
    >
      <img src={img} style={{ display: 'block', width: '100%', height: 180, objectFit: 'cover' }} />
      <div style={{ fontFamily: hand, fontSize: 26, fontWeight: 700, marginTop: 10, whiteSpace: 'nowrap' }}>{name}</div>
      <div style={{ fontFamily: hand, fontSize: 22, color: pencil }}>{kind}</div>
    </div>
  </Rise>
);

const NftWall: Page = () => (
  <Paper chapter="第二章 · NFT">
    <Heading>那個夏天的作品</Heading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: 32, rowGap: 36, marginTop: 52 }}>
      <WallTile img={imgRpfTile} name="Rug Pull Frens" kind="PFP 社群型" rotate={-1.5} delay={0.1} />
      <WallTile img={imgKatana} name="Katana N' Samurai" kind="PFP 社群型" rotate={1} delay={0.16} />
      <WallTile img={imgMurmurTile} name="呢喃貓" kind="PASS 型" rotate={-0.8} delay={0.22} />
      <WallTile img={imgChangling} name="常陵 × 印象畫廊" kind="實體藝術" rotate={1.4} delay={0.28} />
      <WallTile img={imgChenpu} name="陳普《黑青》" kind="數位藝術" rotate={-1.2} delay={0.34} />
      <WallTile img={imgNpm} name="故宮聯名" kind="文化藝術" rotate={1.2} delay={0.4} />
      <WallTile img={imgMintverseTile} name="第二宇宙辭典" kind="文字型" rotate={-1} delay={0.46} />
      <WallTile img={imgAsmeir} name="ASMeiR" kind="阿妹演唱會紀念" rotate={0.8} delay={0.52} />
      <WallTile img={imgGlenrothes} name="格蘭路思" kind="品牌紀念" rotate={-1.4} delay={0.58} />
      <WallTile img={imgHuangdu} name="皇都電姬" kind="阮劇團" rotate={1} delay={0.64} />
    </div>
  </Paper>
);

const Fact = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, fontSize: 34, lineHeight: 1.5 }}>
    <span style={{ fontFamily: hand, color: 'var(--osd-accent)' }}>✎</span>
    <span>{children}</span>
  </div>
);

const Feature = ({
  kind,
  title,
  img,
  stat,
  statLabel,
  children,
}: {
  kind: string;
  title: ReactNode;
  img: string;
  stat?: ReactNode;
  statLabel?: string;
  children?: ReactNode;
}) => (
  <Paper chapter="第二章 · NFT">
    <div style={{ display: 'flex', gap: 64, flex: 1, minHeight: 0 }}>
      <div style={{ width: 640, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Rise>
          <Hand size={32} color="var(--osd-accent)" weight={700}>
            {kind}
          </Hand>
        </Rise>
        <Rise delay={0.1}>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 84, fontWeight: 900, lineHeight: 1.15, marginTop: 12 }}>
            {title}
          </div>
        </Rise>
        {children ? (
          <Rise delay={0.3}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>{children}</div>
          </Rise>
        ) : null}
        {stat ? (
          <div style={{ marginTop: 48 }}>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 110, fontWeight: 900, lineHeight: 1.05, color: 'var(--osd-accent)' }}>
              {stat}
            </div>
            <Hand size={30}>{statLabel}</Hand>
          </div>
        ) : null}
      </div>
      <Rise delay={0.2} style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#ffffff',
            padding: 16,
            transform: 'rotate(0.8deg)',
            boxShadow: '0 24px 40px -22px rgba(60,40,10,0.45)',
          }}
        >
          <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <TapeStrip style={{ top: -16, left: '50%', marginLeft: -75, transform: 'rotate(-3deg)' }} />
        </div>
      </Rise>
    </div>
  </Paper>
);

const RugPullFrens: Page = () => (
  <Feature
    kind="PFP 社群型 NFT · 與藝術家 Raimochi"
    title="Rug Pull Frens"
    img={imgRpf}
    stat={
      <>
        <CountUp to={1800} /> 萬
      </>
    }
    statLabel="新台幣累積銷售額"
  >
    <Fact>能換膚色、改名字、寫故事的 PFP</Fact>
    <Fact>藏家來自全球十多個國家</Fact>
  </Feature>
);

const MurmurCats: Page = () => (
  <Feature kind="PASS 型 NFT" title="呢喃貓學院" img={imgMurmur} stat="1 億+" statLabel="新台幣累積交易額">
    <Fact>NFT 就是會員卡</Fact>
    <Fact>持有它，才能進入交易研究社群</Fact>
  </Feature>
);

const ArtPiece = ({ img, name, delay }: { img: string; name: string; delay: number }) => (
  <Rise delay={delay} style={{ flex: 1 }}>
    <div style={{ background: '#ffffff', padding: 14, boxShadow: '0 20px 34px -22px rgba(60,40,10,0.45)' }}>
      <img src={img} style={{ display: 'block', width: '100%', height: 440, objectFit: 'cover' }} />
    </div>
    <div style={{ marginTop: 18 }}>
      <Hand size={30} color="var(--osd-text)" weight={700}>
        {name}
      </Hand>
    </div>
  </Rise>
);

const ArtCertificate: Page = () => (
  <Paper chapter="第二章 · NFT">
    <Heading>NFT ＝ 藝術品的數位證書</Heading>
    <div style={{ display: 'flex', gap: 56, marginTop: 56 }}>
      <ArtPiece img={imgChangling} name="常陵 × 印象畫廊 · 實體藝術" delay={0.2} />
      <ArtPiece img={imgChenpu} name="陳普《黑青》× 尊彩畫廊 · 數位藝術" delay={0.4} />
    </div>
  </Paper>
);

const CreatorsPaid: Page = () => (
  <Statement
    chapter="第二章 · NFT"
  >
    創作者第一次，
    <br />
    不經過任何平台，
    <br />
    <Underline delay={0.9}>直接拿到錢</Underline>。
  </Statement>
);

const Mintverse: Page = () => (
  <Feature kind="文字型 NFT" title={<>第二宇宙<br />辭典</>} img={imgMintverse} stat="2100" statLabel="個詞彙，千人共同編寫">
    <Fact>十位台灣作家一起發起</Fact>
  </Feature>
);

const ObjectTheatre: Page = () => (
  <Feature kind="劇場型 NFT · 中國信託新舞台藝術節" title={<>OBJECT @<br />THEATRE</>} img={imgObjectTheatre}>
    <Fact>Code 演算法 ＝ 導演</Fact>
    <Fact>NFT 物件 ＝ 演員</Fact>
    <Fact>800 個物件，每天依心情演出</Fact>
  </Feature>
);

const Bubble: Page = () => (
  <Statement
    chapter="第二章 · NFT"
  >
    賣的是 JPEG，
    <br />
    還是<Hl delay={0.9}>可能性</Hl>？
  </Statement>
);

/* ================================================ 第三章 · Luna、FTX */

const Ch3: Page = () => (
  <ChapterDivider n={3} label="第三章" title="經歷了 Luna、FTX" sub="2022，信仰被測試的一年" year="2022" />
);
Ch3.transition = breath;

const LunaNumber: Page = () => (
  <BigNumber
    chapter="第三章 · Luna、FTX"
    label="2022 年 5 月 · Terra / Luna"
    to={400}
    unit="億美元"
    caption="演算法穩定幣 UST 脫鉤，一週之內，整個生態系幾乎歸零。"
    source="數字為各大媒體報導之估計值，演講前請再核對"
  />
);

const FtxNumber: Page = () => (
  <BigNumber
    chapter="第三章 · Luna、FTX"
    label="2022 年 11 月 · FTX"
    to={80}
    unit="億美元"
    caption="全球前幾大的交易所，挪用客戶資金後留下的缺口。"
    source="數字為破產程序初期之估計值，演講前請再核對"
  />
);

const ThatTime: Page = () => (
  <Paper chapter="第三章 · Luna、FTX">
    <Heading>崩盤的那一刻</Heading>
    <Rise delay={0.2}>
      <div style={{ fontSize: 44, lineHeight: 1.5, marginTop: 48, maxWidth: 1300 }}>
        打開手機，群組裡每個人都在問同一句話：「還好嗎？」
      </div>
    </Rise>
    <Rise delay={0.5} style={{ marginTop: 'auto', alignSelf: 'flex-end', marginRight: 40 }}>
      <Sticky width={860}>Luna / FTX 發生時你在做什麼？自己或身邊朋友有受傷嗎？當下的情緒是什麼？</Sticky>
    </Rise>
  </Paper>
);

const NotDecentralized: Page = () => (
  <Statement
    chapter="第三章 · Luna、FTX"
  >
    它們會出事，
    <br />
    恰恰是因為它們
    <br />
    <Hl delay={0.9}>不夠去中心化</Hl>。
  </Statement>
);

const NotYourKeys: Page = () => (
  <Statement
    chapter="第三章 · Luna、FTX"
  >
    Not your keys,
    <br />
    <Underline delay={0.9}>not your coins.</Underline>
  </Statement>
);

const WhyIStayed: Page = () => (
  <Paper chapter="第三章 · Luna、FTX">
    <Heading>為什麼留下來？</Heading>
    <Rise delay={0.2}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1.45,
          marginTop: 56,
        }}
      >
        市場崩了，
        <br />
        但<E>區塊</E>，還是一個一個地出。
      </div>
    </Rise>
    <Rise delay={0.6} style={{ marginTop: 'auto', alignSelf: 'flex-end', marginRight: 40 }}>
      <Sticky width={860}>身邊很多人離場了，你為什麼留下？哪一個瞬間讓你決定繼續？</Sticky>
    </Rise>
  </Paper>
);

/* ================================================ 第四章 · DeFi */

const Ch4: Page = () => (
  <ChapterDivider n={4} label="第四章" title="走入 DeFi" sub="從旁觀者，變成寫合約的人" year="2022" />
);
Ch4.transition = breath;

const Harvest: Page = () => (
  <Paper chapter="第四章 · DeFi">
    <Hand size={32} color="var(--osd-accent)" weight={700}>
      HARVEST FINANCE · 2022 – 2025
    </Hand>
    <Heading>DeFi 的三年</Heading>
    <div style={{ display: 'flex', gap: 36, marginTop: 48, flexWrap: 'wrap' }}>
      <Rise delay={0.2}>
        <Tag rotate={-2}>Looping vaults</Tag>
      </Rise>
      <Rise delay={0.35}>
        <Tag rotate={1.5}>Universal Liquidation Router</Tag>
      </Rise>
      <Rise delay={0.5}>
        <Tag rotate={-1}>Morpho 最大槓桿策略</Tag>
      </Rise>
    </div>
    <Rise delay={0.7} style={{ marginTop: 'auto', alignSelf: 'flex-end', marginRight: 40 }}>
      <Sticky width={860}>怎麼加入 Harvest 的？第一個上線的合約是什麼？那時候的心情？</Sticky>
    </Rise>
  </Paper>
);

const MoneyLego: Page = () => (
  <Statement
    chapter="第四章 · DeFi"
    kicker="DeFi"
  >
    金融，變成了
    <br />
    任何人都能組裝的
    <Hl delay={0.9}>樂高</Hl>。
  </Statement>
);

const IncidentDay: Page = () => (
  <Paper chapter="第四章 · DeFi">
    <Heading>出事的那一天</Heading>
    <Rise delay={0.2}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1.45,
          marginTop: 56,
        }}
      >
        合約上線的那一刻，
        <br />
        就沒有「下次再改」。
      </div>
    </Rise>
    <Rise delay={0.6} style={{ marginTop: 'auto', alignSelf: 'flex-end', marginRight: 40 }}>
      <Sticky width={860}>印象最深的一次 incident：發生了什麼、怎麼處理、學到什麼？</Sticky>
    </Rise>
  </Paper>
);

const LawCard = ({ tone, title, sub }: { tone: 'old' | 'new'; title: ReactNode; sub: string }) => (
  <div
    style={{
      flex: 1,
      height: 380,
      border: tone === 'old' ? `3px dashed ${pencil}` : '4px solid var(--osd-accent)',
      background: tone === 'old' ? 'transparent' : 'rgba(43,89,195,0.06)',
      borderRadius: 'var(--osd-radius)',
      padding: '48px 52px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 28,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 68,
        fontWeight: 900,
        lineHeight: 1.2,
        color: tone === 'old' ? pencil : 'var(--osd-accent)',
      }}
    >
      {title}
    </div>
    <Hand size={38} color={tone === 'old' ? pencil : 'var(--osd-text)'}>
      {sub}
    </Hand>
  </div>
);

const CodeIsLaw: Page = () => (
  <Paper chapter="第四章 · DeFi">
    <Heading>Code is law？</Heading>
    <div style={{ display: 'flex', gap: 64, marginTop: 72 }}>
      <LawCard tone="old" title={<Strike>Code is law</Strike>} sub="程式寫什麼，就是什麼。" />
      <div style={{ flex: 1 }}>
        <Steps>
          <Step duration={320}>
            <div style={{ display: 'flex' }}>
              <LawCard tone="new" title="Code is responsibility" sub="寫程式的人，要對每一個使用者負責。" />
            </div>
          </Step>
        </Steps>
      </div>
    </div>
  </Paper>
);

const Verifiable: Page = () => (
  <Statement
    chapter="第四章 · DeFi"
  >
    透明，讓信任
    <br />
    <Underline delay={0.9}>可以被檢驗</Underline>。
  </Statement>
);

/* ================================================ 第五章 · L2 Scaling */

const Ch5: Page = () => (
  <ChapterDivider
    n={5}
    label="第五章 · L2 Scaling"
    title={
      <>
        <E>以太坊</E>的未來在誰手中？
      </>
    }
    sub="不自己變快，而是讓更多人一起變快"
    year="2023"
  />
);
Ch5.transition = breath;

const TriLabel = ({ x, y, delay, children }: { x: number; y: number; delay: number; children: ReactNode }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)' }}>
    <Rise delay={delay}>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 900, whiteSpace: 'nowrap' }}>
        {children}
      </div>
    </Rise>
  </div>
);

const Trilemma: Page = () => {
  const active = useActive();
  return (
    <Paper chapter="第五章 · L2 Scaling">
      <Heading>區塊鏈三難</Heading>
      <div style={{ position: 'relative', width: 1000, height: 640, margin: '20px auto 0' }}>
        <svg viewBox="0 0 1000 640" style={{ position: 'absolute', inset: 0, width: 1000, height: 640 }}>
          <path
            d="M500 90 L 860 560 L 140 560 Z"
            fill="none"
            stroke="var(--osd-text)"
            strokeWidth={5}
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ animation: active ? `eg-draw 1.2s ${EASE_OUT} 0.2s both` : undefined }}
          />
        </svg>
        <TriLabel x={500} y={40} delay={0.5}>
          去中心化
        </TriLabel>
        <TriLabel x={140} y={610} delay={0.7}>
          安全
        </TriLabel>
        <TriLabel x={860} y={610} delay={0.9}>
          擴展性
        </TriLabel>
        <div style={{ position: 'absolute', left: 500, top: 400, transform: 'translate(-50%, -50%)' }}>
          <Rise delay={1.3}>
            <Hand size={52} color="var(--osd-accent)" weight={700}>
              只能選兩個？
            </Hand>
          </Rise>
        </div>
      </div>
    </Paper>
  );
};

const RollupCentric: Page = () => (
  <Statement
    chapter="第五章 · L2 Scaling"
    kicker="2020 · Rollup-centric roadmap"
  >
    <E>L1</E> 負責安全，
    <br />
    <Hl delay={0.9}>L2 負責速度</Hl>。
  </Statement>
);

const L2Explosion: Page = () => (
  <ImageFigure
    chapter="第五章 · L2 Scaling"
    title="於是，L2 大爆發"
    img={img53L2s}
    cap="來源：defillama.com/chains/ethereum"
  />
);

const L2BeatPage: Page = () => (
  <ImageFigure
    chapter="第五章 · L2 Scaling"
    title="誰是真的繼承了以太坊的安全？"
    lead="L2Beat 用 Stage 0 / 1 / 2，替每一條 L2 打分數"
    img={imgL2Beat}
    cap="來源：l2beat.com"
  />
);

const CostLine = ({ n, children }: { n: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 36 }}>
    <span style={{ fontFamily: hand, fontSize: 56, fontWeight: 700, color: 'var(--osd-accent)', width: 60 }}>{n}</span>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 900, lineHeight: 1.3 }}>{children}</span>
  </div>
);

const ScalingCost: Page = () => (
  <Paper chapter="第五章 · L2 Scaling">
    <Heading>但是，代價呢？</Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, marginTop: 88 }}>
      <Steps>
        <Step>
          <CostLine n="①">流動性，被切成好幾十份</CostLine>
        </Step>
        <Step>
          <CostLine n="②">每換一條鏈，就要再跨一次橋</CostLine>
        </Step>
        <Step>
          <CostLine n="③">使用者：「現在到底在哪條鏈？」</CostLine>
        </Step>
      </Steps>
    </div>
  </Paper>
);

const InfiniteGarden: Page = () => (
  <ImageFigure
    chapter="第五章 · L2 Scaling"
    title={
      <>
        答案：在<Accent>每一個 builder</Accent> 手中
      </>
    }
    lead="Infinite Garden——以太坊不是一間公司，是一座沒有圍牆的花園"
    img={imgInfiniteGarden}
    cap="來源：Ethereum Foundation"
  />
);

/* ================================================ 第六章 · Privacy / PSE */

const Ch6: Page = () => (
  <ChapterDivider n={6} label="第六章 · Privacy" title="一群人，在研究隱私" sub="順著 Scaling 的路，PSE 走向另一個方向" year="2023" />
);
Ch6.transition = breath;

const PublicDiary: Page = () => (
  <Statement
    chapter="第六章 · Privacy"
  >
    你的錢包地址，
    <br />
    就是一本<Hl delay={0.9}>公開的日記</Hl>。
  </Statement>
);

const ZkOneLine: Page = () => (
  <Statement chapter="第六章 · Privacy" kicker="零知識證明 ZK">
    證明一件事是真的，
    <br />
    卻不透露
    <br />
    <Underline delay={0.9}>任何細節</Underline>。
  </Statement>
);

const PseLine = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, fontSize: 44, lineHeight: 1.5 }}>
    <span style={{ fontFamily: hand, color: 'var(--osd-accent)', fontSize: 44 }}>✎</span>
    <span>{children}</span>
  </div>
);

const WhoIsPse: Page = () => (
  <Paper chapter="第六章 · Privacy">
    <Heading>PSE 是誰？</Heading>
    <div style={{ marginTop: 16 }}>
      <Hand size={34}>以太坊基金會旗下的團隊 · 原名 Privacy &amp; Scaling Explorations</Hand>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44, marginTop: 72 }}>
      <Steps>
        <Step>
          <PseLine>從 Scaling 起家：一起研究 zkEVM</PseLine>
        </Step>
        <Step>
          <PseLine>做出 Semaphore、MACI、Unirep 等隱私工具</PseLine>
        </Step>
        <Step>
          <PseLine>全部開源，是整個生態的公共財</PseLine>
        </Step>
      </Steps>
    </div>
  </Paper>
);

const MyPrivacy: Page = () => (
  <Paper chapter="第六章 · Privacy">
    <Heading>Unirep Social TW 與 PSE</Heading>
    <div style={{ display: 'flex', gap: 32, marginTop: 52, flexWrap: 'wrap', maxWidth: 1400 }}>
      <Rise delay={0.2}>
        <Tag rotate={-2}>Unirep Social TW · 2023–2025</Tag>
      </Rise>
      <Rise delay={0.32}>
        <Tag rotate={1.5}>PSE Grant</Tag>
      </Rise>
      <Rise delay={0.44}>
        <Tag rotate={-1}>ETHTaipei '23 · PSE bounty</Tag>
      </Rise>
      <Rise delay={0.56}>
        <Tag rotate={2}>PSE CORE Program Fellow</Tag>
      </Rise>
    </div>
    <Rise delay={0.8} style={{ marginTop: 'auto', alignSelf: 'flex-end', marginRight: 40 }}>
      <Sticky width={860}>第一次接觸 ZK 的感受？做匿名社群，想解決的是什麼問題？</Sticky>
    </Rise>
  </Paper>
);

const PrivacyFreedom: Page = () => (
  <Statement chapter="第六章 · Privacy">
    隱私，不是因為
    <br />
    有東西要藏，
    <br />
    而是<Hl delay={0.9}>自由的前提</Hl>。
  </Statement>
);

/* ================================================ 第七章 · Account Abstraction */

const Ch7: Page = () => (
  <ChapterDivider n={7} label="第七章" title="Account Abstraction" sub="讓以太坊，終於能給一般人用" year="2024" />
);
Ch7.transition = breath;

const PainLine = ({ children }: { children: ReactNode }) => (
  <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 900, lineHeight: 1.4 }}>
    <span style={{ color: 'var(--osd-accent)', marginRight: 20 }}>✗</span>
    {children}
  </div>
);

const OneKey: Page = () => (
  <Paper
    chapter="第七章 · AA"
    overlay={
      <>
        <MorphElement id="account-box">
          <div
            style={{
              position: 'absolute',
              left: 240,
              top: 340,
              width: 440,
              height: 440,
              borderRadius: 24,
              background: '#1f1c18',
              color: '#f5f0e6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}
          >
            <div style={{ fontSize: 140, lineHeight: 1 }}>🔑</div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 900 }}>一把私鑰</div>
          </div>
        </MorphElement>
        <div
          style={{
            position: 'absolute',
            left: 780,
            top: 380,
            width: 980,
            display: 'flex',
            flexDirection: 'column',
            gap: 56,
          }}
        >
          <Steps>
            <Step>
              <PainLine>先抄下 12 個英文單字</PainLine>
            </Step>
            <Step>
              <PainLine>弄丟了，就全部沒了</PainLine>
            </Step>
            <Step>
              <PainLine>沒有 ETH，連一筆交易都送不出去</PainLine>
            </Step>
          </Steps>
        </div>
      </>
    }
  >
    <Heading>今天的帳戶 ＝ 一把私鑰</Heading>
  </Paper>
);
OneKey.transition = morphTransition;

const AfterMorph = ({ delay, children }: { delay: number; children: ReactNode }) => {
  const active = useActive();
  return (
    <div style={{ animation: active ? `eg-pop 0.5s ${EASE_OUT} ${MORPH_MS / 1000 + delay}s both` : undefined }}>
      {children}
    </div>
  );
};

const SmartAccount: Page = () => (
  <Paper
    chapter="第七章 · AA"
    overlay={
      <>
        <MorphElement id="account-box">
          <div
            style={{
              position: 'absolute',
              left: 240,
              top: 340,
              width: 1440,
              height: 300,
              borderRadius: 24,
              background: 'var(--osd-accent)',
              color: '#f5f0e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
            }}
          >
            <div style={{ fontSize: 120, lineHeight: 1 }}>📜</div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 76, fontWeight: 900 }}>一個可以寫規則的帳戶</div>
          </div>
        </MorphElement>
        <div style={{ position: 'absolute', left: 240, top: 720, display: 'flex', gap: 40 }}>
          <AfterMorph delay={0}>
            <Tag rotate={-2}>passkey 登入</Tag>
          </AfterMorph>
          <AfterMorph delay={0.12}>
            <Tag rotate={1.5}>gas 代付</Tag>
          </AfterMorph>
          <AfterMorph delay={0.24}>
            <Tag rotate={-1}>社交恢復</Tag>
          </AfterMorph>
          <AfterMorph delay={0.36}>
            <Tag rotate={2}>批次交易</Tag>
          </AfterMorph>
        </div>
      </>
    }
  >
    <Heading>AA：帳戶，變成一段程式</Heading>
  </Paper>
);
SmartAccount.transition = morphTransition;

const TimeNode = ({ eip, when, what, highlight }: { eip: string; when: string; what: string; highlight?: boolean }) => (
  <div style={{ width: 440, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 999,
        background: highlight ? 'var(--osd-accent)' : 'var(--osd-text)',
        marginTop: -18,
      }}
    />
    <div style={{ fontFamily: hand, fontSize: 32, color: highlight ? 'var(--osd-accent)' : pencil, fontWeight: 700 }}>{when}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 900 }}>{eip}</div>
    <div style={{ fontSize: 34, lineHeight: 1.5 }}>{what}</div>
  </div>
);

const AATimeline: Page = () => {
  const active = useActive();
  return (
    <Paper chapter="第七章 · AA">
      <Heading>一步一步，把帳戶升級</Heading>
      <div style={{ position: 'relative', marginTop: 120 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: 1480,
            top: 0,
            height: 5,
            background: 'var(--osd-text)',
            transformOrigin: 'left center',
            animation: active ? `eg-grow 1.1s ${EASE_OUT} 0.2s both` : undefined,
          }}
        />
        <div style={{ display: 'flex', gap: 80 }}>
          <Steps>
            <Step>
              <TimeNode eip="ERC-4337" when="2023 · 上線" what="不改協議，用合約先把 AA 做出來" />
            </Step>
            <Step>
              <TimeNode eip="EIP-3074" when="提案" what="讓 EOA 授權給合約——後來被 7702 取代" />
            </Step>
            <Step>
              <TimeNode eip="EIP-7702" when="2025 · Pectra 升級" what="一般錢包地址，直接升級成智能帳戶" highlight />
            </Step>
          </Steps>
        </div>
      </div>
    </Paper>
  );
};

const InvisibleChain: Page = () => (
  <Statement
    chapter="第七章 · AA"
  >
    最好的區塊鏈體驗，
    <br />
    是<Hl delay={0.9}>感覺不到區塊鏈</Hl>。
  </Statement>
);

const AAToAgentic: Page = () => (
  <ImageFigure
    chapter="第七章 · AA"
    title="下一步：從 Account 到 Agentic"
    lead="當使用以太坊的，不只是人，還有 AI agent"
    img={imgFromAAToAgentic}
    cap="來源：@elytro_eth"
  />
);

/* ================================================ 第八章 · Lean Ethereum */

const Ch8: Page = () => (
  <ChapterDivider n={8} label="第八章" title="Lean Ethereum" sub="把以太坊變得更簡單、更長久" year="2025" />
);
Ch8.transition = breath;

const Pillar = ({ en, zh, desc, delay }: { en: string; zh: string; desc: string; delay: number }) => (
  <Rise delay={delay} style={{ flex: 1 }}>
    <div
      style={{
        height: 420,
        borderTop: '6px solid var(--osd-accent)',
        background: 'rgba(255,255,255,0.55)',
        padding: '44px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        boxShadow: '0 18px 30px -22px rgba(60,40,10,0.4)',
      }}
    >
      <div style={{ fontFamily: hand, fontSize: 30, color: 'var(--osd-accent)', fontWeight: 700 }}>{en}</div>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 900 }}>{zh}</div>
      <div style={{ fontSize: 34, lineHeight: 1.55 }}>{desc}</div>
    </div>
  </Rise>
);

const WhatIsLean: Page = () => (
  <Paper chapter="第八章 · Lean">
    <Heading>Lean Ethereum 是什麼？</Heading>
    <div style={{ marginTop: 16 }}>
      <Hand size={34}>Vitalik，2025：把以太坊精簡到「可以被完全理解」的程度</Hand>
    </div>
    <div style={{ display: 'flex', gap: 40, marginTop: 64 }}>
      <Pillar en="Lean Consensus" zh="共識更精簡" desc="更快的最終確定性，並為後量子時代做準備" delay={0.2} />
      <Pillar en="Lean Data" zh="資料更精簡" desc="用資料可用性取樣，撐起更多 L2 的資料" delay={0.35} />
      <Pillar en="Lean Execution" zh="執行更精簡" desc="zkVM 讓驗證變便宜，手機也能驗證整條鏈" delay={0.5} />
    </div>
  </Paper>
);

const WalkawayTest: Page = () => (
  <Statement
    chapter="第八章 · Lean"
    kicker="Walkaway Test"
  >
    如果所有開發者
    <br />
    明天都離開，
    <br />
    它還<Underline delay={0.9}>能運作嗎</Underline>？
  </Statement>
);

const ProtocolNoUs: Page = () => (
  <Statement chapter="第八章 · Lean">
    最好的協議，
    <br />
    是有一天
    <br />
    <Hl delay={0.9}>不再需要維護者</Hl>的協議。
  </Statement>
);

/* ================================================ 終章 · 找到自己的理由 */

const Ch9: Page = () => (
  <ChapterDivider n={9} label="終章" title="找到自己的理由" sub="做這件事的理由" year="2026" />
);
Ch9.transition = breath;

const CoreLine = ({ n, title, sub }: { n: string; title: string; sub: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 40 }}>
    <span style={{ fontFamily: hand, fontSize: 56, fontWeight: 700, color: 'var(--osd-accent)', width: 60 }}>{n}</span>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 900, width: 200 }}>{title}</span>
    <span style={{ fontSize: 44, lineHeight: 1.4 }}>{sub}</span>
  </div>
);

const SolidCore: Page = () => (
  <Paper chapter="終章">
    <Heading>穩固內核</Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 72, marginTop: 96 }}>
      <Steps>
        <Step>
          <CoreLine n="①" title="理由" sub="你為什麼在這裡？不是因為幣價。" />
        </Step>
        <Step>
          <CoreLine n="②" title="價值" sub="市場崩盤時，你還願意為什麼留下？" />
        </Step>
        <Step>
          <CoreLine n="③" title="行動" sub="寫一行 code、辦一場活動、問一個好問題。" />
        </Step>
      </Steps>
    </div>
  </Paper>
);

const NoIdols: Page = () => (
  <Statement
    chapter="終章"
    kicker="不要偶像崇拜"
  >
    連 <Circled delay={0.8}>Vitalik</Circled> 也會錯。
  </Statement>
);

const KeepTheGood: Page = () => (
  <Statement chapter="終章" kicker="但也不用盲目地破舊立新">
    不是推翻一切，
    <br />
    而是讓好的東西
    <br />
    <Hl delay={0.9}>留下來</Hl>。
  </Statement>
);

const Closing: Page = () => (
  <Paper chapter="終章" overlay={<ChapterTrack current={9} />}>
    <div style={{ marginTop: 60 }}>
      <Rise>
        <Hand size={44} color="var(--osd-accent)" weight={700}>
          路線圖走到這裡
        </Hand>
      </Rise>
      <Rise delay={0.2}>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1.25,
            marginTop: 24,
          }}
        >
          你的那一站，
          <br />
          會是<Underline delay={1}>什麼</Underline>？
        </div>
      </Rise>
      <Rise delay={0.6}>
        <div style={{ marginTop: 40 }}>
          <Hand size={40}>謝謝大家 · Ryan Wang</Hand>
        </div>
      </Rise>
    </div>
  </Paper>
);
Closing.transition = breath;

export const meta: SlideMeta = {
  title: '我成為E衛兵的日子',
  createdAt: '2026-10-12T08:04:28.785Z',
};

export default [
  // 開場
  Cover,
  OpeningQuestion,
  Roadmap,
  // 第一章 · 文藝復興（DRAFT）
  Ch1,
  Renaissance,
  CostOfTrust,
  Genesis,
  WhatIsDecentralization,
  CensorshipStory,
  CredibleNeutrality,
  WorldComputer,
  Permissionless,
  Ch1Summary,
  // 第二章 · NFT
  Ch2,
  NftOneLine,
  NftWall,
  RugPullFrens,
  MurmurCats,
  ArtCertificate,
  CreatorsPaid,
  Mintverse,
  ObjectTheatre,
  Bubble,
  // 第三章 · Luna、FTX
  Ch3,
  LunaNumber,
  FtxNumber,
  ThatTime,
  NotDecentralized,
  NotYourKeys,
  WhyIStayed,
  // 第四章 · DeFi
  Ch4,
  Harvest,
  MoneyLego,
  IncidentDay,
  CodeIsLaw,
  Verifiable,
  // 第五章 · L2 Scaling
  Ch5,
  Trilemma,
  RollupCentric,
  L2Explosion,
  L2BeatPage,
  ScalingCost,
  InfiniteGarden,
  // 第六章 · Privacy
  Ch6,
  PublicDiary,
  ZkOneLine,
  WhoIsPse,
  MyPrivacy,
  PrivacyFreedom,
  // 第七章 · AA
  Ch7,
  OneKey,
  SmartAccount,
  AATimeline,
  InvisibleChain,
  AAToAgentic,
  // 第八章 · Lean Ethereum
  Ch8,
  WhatIsLean,
  WalkawayTest,
  ProtocolNoUs,
  // 終章
  Ch9,
  SolidCore,
  NoIdols,
  KeepTheGood,
  Closing,
] satisfies Page[];
