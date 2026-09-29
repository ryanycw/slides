import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import avatar from './assets/avatar.jpg';
import imgEthTaipei from '@assets/ETHTaipei_Group.png';
import imgTelegram from '@assets/Telegram.jpeg';

export const design: DesignSystem = {
  palette: { bg: '#fff6e5', text: '#111111', accent: '#ffd400' },
  fonts: {
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "'Space Grotesk', system-ui, sans-serif",
  },
  typeScale: { hero: 190, body: 34 },
  radius: 20,
};

// ── Webfont (loaded once, slide-scoped) ───────────────────────────────
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@700&display=swap';
const FONT_LINK_ID = 'osd-webfont-ryan-intro';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

// ── Extra palette (sticker colors) ────────────────────────────────────
const ink = '#111111';
const pink = '#ff7ab6';
const blue = '#6b9bff';
const green = '#3ee08f';
const orange = '#ff8a3d';
const paper = '#ffffff';
const mono = "'Space Mono', ui-monospace, monospace";

const border = `5px solid ${ink}`;
const shadow = `10px 10px 0 ${ink}`;

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  overflow: 'hidden',
};

// Subtle dot grid behind content pages
const dots: CSSProperties = {
  backgroundImage: `radial-gradient(${ink}22 2px, transparent 2px)`,
  backgroundSize: '36px 36px',
};

// ── Motion: quiet house "rise" ────────────────────────────────────────
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

// ── Shared components ─────────────────────────────────────────────────
const Sticker = ({
  children,
  bg = paper,
  rotate = 0,
  style,
}: {
  children: ReactNode;
  bg?: string;
  rotate?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: bg,
      border,
      boxShadow: shadow,
      borderRadius: 'var(--osd-radius)',
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}
  >
    {children}
  </div>
);

const Chip = ({ children, bg = 'var(--osd-accent)', rotate = 0, size = 24 }: {
  children: ReactNode;
  bg?: string;
  rotate?: number;
  size?: number;
}) => (
  <span
    style={{
      display: 'inline-block',
      alignSelf: 'flex-start',
      width: 'fit-content',
      background: bg,
      border: `4px solid ${ink}`,
      borderRadius: 999,
      padding: '8px 22px',
      fontFamily: mono,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.2,
      transform: `rotate(${rotate}deg)`,
      boxShadow: `5px 5px 0 ${ink}`,
    }}
  >
    {children}
  </span>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 40,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: mono,
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      <span>RYAN WANG · @ryanycwEth</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Header = ({ eyebrow, title, chipBg }: { eyebrow: string; title: string; chipBg?: string }) => (
  <div>
    <Chip bg={chipBg} rotate={-2}>
      {eyebrow}
    </Chip>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 88,
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: -2,
        margin: '28px 0 0',
      }}
    >
      {title}
    </h2>
  </div>
);

const Shell = ({ children }: { children: ReactNode }) => (
  <div style={{ ...fill, ...dots, padding: '80px 100px 0' }}>
    {children}
    <Footer />
  </div>
);

// ── 01 Cover ──────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-accent)', padding: '0 120px' }}>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 0,
        bottom: 0,
        width: 1100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Chip bg={paper} rotate={-3} size={28}>
        gm, nice to meet you 👋
      </Chip>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: -6,
          margin: '48px 0 40px',
        }}
      >
        Hi, I'm
        <br />
        Ryan.
      </h1>
      <p style={{ fontSize: 40, lineHeight: 1.4, margin: 0, fontWeight: 500, maxWidth: 1000 }}>
        Yu-Chih Wang — engineer building privacy-first
        <br />
        and DeFi systems, and a community host in Taipei.
      </p>
    </div>

    {/* Avatar sticker */}
    <div
      style={{
        position: 'absolute',
        right: 190,
        top: 230,
        width: 520,
        height: 520,
        borderRadius: '50%',
        border: `8px solid ${ink}`,
        boxShadow: `16px 16px 0 ${ink}`,
        overflow: 'hidden',
        background: paper,
        transform: 'rotate(4deg)',
      }}
    >
      <img src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>

    {/* Scattered stickers */}
    <div style={{ position: 'absolute', right: 620, top: 170 }}>
      <Chip bg={pink} rotate={-8} size={30}>
        ZK + privacy
      </Chip>
    </div>
    <div style={{ position: 'absolute', right: 110, top: 150 }}>
      <Chip bg={green} rotate={6} size={30}>
        Rust 🦀
      </Chip>
    </div>
    <div style={{ position: 'absolute', right: 560, top: 880 }}>
      <Chip bg={blue} rotate={-4} size={30}>
        Solidity · DeFi
      </Chip>
    </div>
    <div style={{ position: 'absolute', right: 130, top: 810 }}>
      <Chip bg={orange} rotate={5} size={30}>
        ETHTaipei cohost
      </Chip>
    </div>
  </div>
);

// ── 02 At a glance ────────────────────────────────────────────────────
const Stat = ({ value, label, bg, rotate }: { value: string; label: string; bg: string; rotate: number }) => (
  <Sticker bg={bg} rotate={rotate} style={{ padding: '44px 40px', height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 132, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
      {value}
    </div>
    <div style={{ fontSize: 32, lineHeight: 1.35, fontWeight: 500 }}>{label}</div>
  </Sticker>
);

const Glance: Page = () => (
  <Shell>
    <Header eyebrow="TL;DR" title="Ryan, in four numbers" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 44, marginTop: 80 }}>
      <Stat value="4+" label="years shipping on Ethereum" bg="var(--osd-accent)" rotate={-2} />
      <Stat value="$3M" label="peak TVL, zero security incidents" bg={pink} rotate={1.5} />
      <Stat value="6" label="talks & write-ups for the community" bg={blue} rotate={-1} />
      <Stat value="3" label="hackathon awards + 3 fellowships" bg={green} rotate={2} />
    </div>
  </Shell>
);

// ── 03 Engineering path ───────────────────────────────────────────────
const Stop = ({
  years,
  org,
  role,
  what,
  bg,
  rotate,
}: {
  years: string;
  org: string;
  role: string;
  what: string;
  bg: string;
  rotate: number;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Chip bg={bg} rotate={rotate}>
      {years}
    </Chip>
    <Sticker rotate={rotate / 2} style={{ marginTop: 36, padding: '36px 34px', height: 360, width: '100%', boxSizing: 'border-box' }}>
      <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15 }}>{org}</div>
      <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, marginTop: 14, lineHeight: 1.3 }}>{role}</div>
      <div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 28 }}>{what}</div>
    </Sticker>
  </div>
);

const Path: Page = () => (
  <Shell>
    <Header eyebrow="01 · ENGINEERING" title="From CS student to tech lead" chipBg={blue} />
    <div style={{ position: 'relative', marginTop: 80 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 26, height: 6, background: ink }} />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 44 }}>
        <Stop years="2021" org="NCTU" role="B.Sc. graduate" what="CS × Logistics double major" bg={paper} rotate={-2} />
        <Stop years="2022 – 2025" org="Harvest Finance" role="Core Contributor" what="DeFi vaults & liquidation routing" bg="var(--osd-accent)" rotate={2} />
        <Stop years="2023 – 2025" org="Unirep Social TW" role="Core Contributor" what="Anonymous social on Unirep, PSE grant" bg={pink} rotate={-2} />
        <Stop years="2025 – now" org="Onflow · Sundial" role="Project Tech Lead" what="Client-side encrypted identity storage" bg={green} rotate={2} />
      </div>
    </div>
  </Shell>
);

// ── 04 DeFi ───────────────────────────────────────────────────────────
const Point = ({ n, children }: { n: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
    <div
      style={{
        flex: 'none',
        width: 76,
        height: 76,
        borderRadius: '50%',
        border,
        background: paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: mono,
        fontSize: 28,
        fontWeight: 700,
      }}
    >
      {n}
    </div>
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.4 }}>{children}</div>
  </div>
);

const DeFi: Page = () => (
  <Shell>
    <Header eyebrow="HARVEST FINANCE · 2022 – 2025" title="DeFi: vaults that don't break" chipBg="var(--osd-accent)" />
    <div style={{ display: 'flex', gap: 100, marginTop: 90, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 56 }}>
        <Point n="01">
          <b>Looping vaults</b> on Morpho Blue — up to 5.8x,
          <br />
          guarded by oracle price checks
        </Point>
        <Point n="02">
          <b>Universal Liquidation Router</b> across
          <br />
          Uniswap, Balancer, 1inch, Camelot
        </Point>
        <Point n="03">
          <b>Aura Finance strategies</b>, audited by Halborn
        </Point>
      </div>
      <div style={{ width: 520, display: 'flex', flexDirection: 'column', gap: 44, paddingTop: 10 }}>
        <Sticker bg={pink} rotate={3} style={{ padding: '34px 40px' }}>
          <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>5.8x</div>
          <div style={{ fontSize: 30, marginTop: 12 }}>max leverage on Morpho</div>
        </Sticker>
        <Sticker bg={green} rotate={-2} style={{ padding: '34px 40px' }}>
          <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>0</div>
          <div style={{ fontSize: 30, marginTop: 12 }}>incidents · ~$3M peak TVL</div>
        </Sticker>
      </div>
    </div>
  </Shell>
);

// ── 05 Privacy & identity ─────────────────────────────────────────────
const KeyBox = ({ step, label, sub, bg, rotate }: { step: string; label: string; sub: string; bg: string; rotate: number }) => (
  <Sticker bg={bg} rotate={rotate} style={{ width: 440, padding: '32px 36px' }}>
    <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700 }}>{step}</div>
    <div style={{ fontSize: 44, fontWeight: 700, marginTop: 10, lineHeight: 1.1 }}>{label}</div>
    <div style={{ fontSize: 28, marginTop: 12 }}>{sub}</div>
  </Sticker>
);

const Arrow = () => (
  <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1 }}>→</div>
);

const Privacy: Page = () => (
  <Shell>
    <Header eyebrow="ONFLOW · SUNDIAL · 2025 – NOW" title="Privacy: users hold the keys" chipBg={green} />
    <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, margin: '40px 0 0', maxWidth: 1500 }}>
      I designed end-to-end encryption for identity documents — the server never sees plaintext or key material.
    </p>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 70 }}>
      <KeyBox step="TIER 1" label="Passkey PRF" sub="WebAuthn, one prompt" bg="var(--osd-accent)" rotate={-2} />
      <Arrow />
      <KeyBox step="TIER 2" label="Account KEK" sub="wraps every file key" bg={pink} rotate={1.5} />
      <Arrow />
      <KeyBox step="TIER 3" label="Per-file keys" sub="AES-256-GCM" bg={blue} rotate={-1.5} />
    </div>
    <div style={{ display: 'flex', gap: 24, marginTop: 80, flexWrap: 'wrap' }}>
      <Chip bg={paper}>Swift 6 client</Chip>
      <Chip bg={paper}>Keychain + memory wiping</Chip>
      <Chip bg={paper}>Node / MongoDB gateway</Chip>
      <Chip bg={paper}>Rust auth · Axum + Tokio</Chip>
    </div>
  </Shell>
);

// ── 06 Open source & research ─────────────────────────────────────────
const Column = ({ label, bg, rotate, children }: { label: string; bg: string; rotate: number; children: ReactNode }) => (
  <Sticker rotate={rotate} style={{ padding: '40px 40px 44px', height: 520, boxSizing: 'border-box' }}>
    <Chip bg={bg} rotate={-rotate * 2} size={26}>
      {label}
    </Chip>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 40 }}>{children}</div>
  </Sticker>
);

const Item = ({ title, sub }: { title: string; sub: string }) => (
  <div>
    <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 6 }}>{sub}</div>
  </div>
);

const OpenSource: Page = () => (
  <Shell>
    <Header eyebrow="02 · OPEN SOURCE" title="Build, learn, hack — in public" chipBg={pink} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 50, marginTop: 70 }}>
      <Column label="BUILD" bg="var(--osd-accent)" rotate={-1.5}>
        <Item title="ZKP2P" sub="TLSNotary → React Native" />
        <Item title="Privacy Residency '25" sub="zkEmail · VOPRF · TEE" />
      </Column>
      <Column label="LEARN" bg={blue} rotate={1}>
        <Item title="PSE CORE Program" sub="Fellow, Ethereum Foundation" />
        <Item title="Axiom ZK Intensive" sub="Cohort 2 fellow" />
      </Column>
      <Column label="HACK" bg={green} rotate={-1}>
        <Item title="ETHGlobal Sydney '24" sub="Finalist · Habit Builder" />
        <Item title="ETHGlobal Istanbul '23" sub="Domain Expansion" />
        <Item title="ETHTaipei '23" sub="ZauKtion · PSE bounty" />
      </Column>
    </div>
  </Shell>
);

// ── 07 Community ──────────────────────────────────────────────────────
const Talk = ({ venue, title }: { venue: string; title: string }) => (
  <div>
    <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700 }}>{venue}</div>
    <div style={{ fontSize: 30, lineHeight: 1.3, marginTop: 4 }}>{title}</div>
  </div>
);

const Community: Page = () => (
  <Shell>
    <Header eyebrow="03 · COMMUNITY" title="Growing Taipei's builder scene" chipBg={orange} />
    <div style={{ display: 'flex', gap: 80, marginTop: 60, alignItems: 'flex-start' }}>
      <div style={{ position: 'relative', flex: 'none' }}>
        <div
          style={{
            width: 860,
            height: 574,
            border: `8px solid ${ink}`,
            boxShadow: `14px 14px 0 ${ink}`,
            borderRadius: 'var(--osd-radius)',
            overflow: 'hidden',
            transform: 'rotate(-1.5deg)',
          }}
        >
          <img src={imgEthTaipei} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', left: 30, bottom: -30 }}>
          <Chip bg="var(--osd-accent)" rotate={-4} size={28}>
            Cohost · ETHTaipei & ZKTaipei
          </Chip>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Talk venue="COSCUP" title="Privacy-Preserving Identity Pipeline in KYC" />
        <Talk venue="COSCUP" title=".eth 2.0: Dissecting ENS v2" />
        <Talk venue="TAIPEI ETHEREUM MEETUP" title="Wallet Landscape in 2026" />
        <Talk venue="TAIPEI ETHEREUM MEETUP" title="ZK Email · ZK in Real World" />
        <Talk venue="ETHTAIPEI 2025" title="Tools for anon communal actions" />
      </div>
    </div>
  </Shell>
);

// ── 08 Network ────────────────────────────────────────────────────────
const NetworkCard = ({ tag, orgs, line, bg, rotate }: { tag: string; orgs: string; line: string; bg: string; rotate: number }) => (
  <Sticker bg={bg} rotate={rotate} style={{ height: 176, boxSizing: 'border-box', padding: '0 40px', display: 'flex', alignItems: 'center', gap: 40 }}>
    <div style={{ width: 460, flex: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Chip bg={paper} size={22}>
        {tag}
      </Chip>
      <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15 }}>{orgs}</div>
    </div>
    <div style={{ fontSize: 30, lineHeight: 1.35 }}>{line}</div>
  </Sticker>
);

const Network: Page = () => (
  <Shell>
    <Header eyebrow="03 · NETWORK" title="Community built my network" chipBg={orange} />
    <div style={{ position: 'relative', height: 592, marginTop: 56 }}>
      {/* Connectors: avatar edge → middle of each card */}
      <svg width={560} height={592} style={{ position: 'absolute', left: 0, top: 0 }}>
        <line x1={420} y1={296} x2={560} y2={88} stroke={ink} strokeWidth={6} strokeLinecap="round" />
        <line x1={420} y1={296} x2={560} y2={296} stroke={ink} strokeWidth={6} strokeLinecap="round" />
        <line x1={420} y1={296} x2={560} y2={504} stroke={ink} strokeWidth={6} strokeLinecap="round" />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 106,
          width: 380,
          height: 380,
          boxSizing: 'border-box',
          borderRadius: '50%',
          border: `8px solid ${ink}`,
          boxShadow: `12px 12px 0 ${ink}`,
          overflow: 'hidden',
          background: paper,
        }}
      >
        <img src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', left: 60, top: 510 }}>
        <Chip bg="var(--osd-accent)" rotate={-4} size={24}>
          Taipei hub
        </Chip>
      </div>
      <div style={{ position: 'absolute', left: 540, right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <NetworkCard
          tag="PROTOCOLS"
          orgs="Morpho · Canton"
          line="Close friends with their solution engineers and ecosystem managers"
          bg={blue}
          rotate={-1}
        />
        <NetworkCard
          tag="BANKING"
          orgs="BSOS · Taiwan banks"
          line="Friends with the blockchain advisors at BSOS and Taiwan's leading banks"
          bg={green}
          rotate={0.8}
        />
        <NetworkCard
          tag="ASIA COMMUNITIES"
          orgs="ETHTokyo · ETH Korea"
          line="Collaborating with fellow cohosts across the region"
          bg={pink}
          rotate={-0.8}
        />
      </div>
    </div>
  </Shell>
);

// ── 09 Personality ────────────────────────────────────────────
const Trait = ({ emoji, title, line, bg, rotate }: { emoji: string; title: string; line: string; bg: string; rotate: number }) => (
  <Sticker bg={bg} rotate={rotate} style={{ padding: '36px 40px', display: 'flex', gap: 32, alignItems: 'center', height: 220, boxSizing: 'border-box' }}>
    <div style={{ fontSize: 96, lineHeight: 1 }}>{emoji}</div>
    <div>
      <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
      <div style={{ fontSize: 30, lineHeight: 1.4, marginTop: 10 }}>{line}</div>
    </div>
  </Sticker>
);

const Personality: Page = () => (
  <Shell>
    <Header eyebrow="04 · BEYOND THE CODE" title="What I'm like to work with" chipBg={blue} />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 80 }}>
      <Trait emoji="⚡" title="Fast execution" line="Hackathon pace: new stack to shipped" bg="var(--osd-accent)" rotate={-1.5} />
      <Trait emoji="🌊" title="High adaptability" line="Thrive where priorities shift fast" bg={pink} rotate={1.5} />
      <Trait emoji="🌏" title="Global collaborator" line="Bridging APAC and EMEA time zones" bg={green} rotate={1} />
      <Trait emoji="🎤" title="Client-facing presence" line="Complex tech into clear workshops" bg={blue} rotate={-1} />
    </div>
  </Shell>
);

// ── 10 Interests (draft) ──────────────────────────────────────────────
const Hobby = ({ emoji, title, line, bg, rotate }: { emoji: string; title: string; line: string; bg: string; rotate: number }) => (
  <Sticker bg={bg} rotate={rotate} style={{ padding: '44px 36px', height: 440, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontSize: 130, lineHeight: 1 }}>{emoji}</div>
    <div style={{ fontSize: 44, fontWeight: 700, marginTop: 'auto', lineHeight: 1.15 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 10 }}>{line}</div>
  </Sticker>
);

const Interests: Page = () => (
  <Shell>
    <Header eyebrow="05 · OFF THE KEYBOARD" title="When I'm not shipping" chipBg={green} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56, marginTop: 80 }}>
      <Hobby emoji="🎾" title="Tennis" line="Always up for a rally" bg={green} rotate={-2} />
      <Hobby emoji="🏊" title="Triathlon" line="Swim, bike, run, repeat" bg={blue} rotate={1.5} />
      <Hobby emoji="🍜" title="Foodie" line="Ask me where to eat in Taipei" bg={orange} rotate={-1} />
    </div>
  </Shell>
);

// ── 11 Closing ────────────────────────────────────────────────────────
const Contact = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
    <span style={{ width: 170, fontFamily: mono, fontSize: 24, fontWeight: 700 }}>{label}</span>
    <span style={{ fontSize: 38, fontWeight: 500 }}>{value}</span>
  </div>
);

const Closing: Page = () => (
  <div style={{ ...fill, background: pink }}>
    <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0, width: 1080, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Chip bg={paper} rotate={-3} size={28}>
        thanks for listening
      </Chip>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 150,
          fontWeight: 700,
          lineHeight: 0.98,
          letterSpacing: -5,
          margin: '44px 0 64px',
        }}
      >
        Let's build
        <br />
        together.
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Contact label="EMAIL" value="ryan@ryanycw.dev" />
        <Contact label="GITHUB" value="ryanycw" />
        <Contact label="X / TG" value="@ryanycwEth" />
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        right: 170,
        top: 150,
        width: 548,
        height: 654,
        border: `8px solid ${ink}`,
        boxShadow: `16px 16px 0 ${ink}`,
        borderRadius: 'var(--osd-radius)',
        overflow: 'hidden',
        transform: 'rotate(3deg)',
      }}
    >
      <img src={imgTelegram} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ position: 'absolute', right: 560, top: 800 }}>
      <Chip bg="var(--osd-accent)" rotate={-6} size={28}>
        scan to say gm →
      </Chip>
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: 'Hi, I’m Ryan',
  createdAt: '2026-09-28T06:32:11.134Z',
};

export default [
  Cover,
  Glance,
  Path,
  DeFi,
  Privacy,
  OpenSource,
  Community,
  Network,
  Personality,
  Interests,
  Closing,
] satisfies Page[];
