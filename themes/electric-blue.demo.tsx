import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { type DesignSystem, type Page, useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#f4f6fb', text: '#0b1026', accent: '#2446ff' },
  fonts: { display: "'Inter', system-ui, sans-serif", body: "'Inter', system-ui, sans-serif" },
  typeScale: { hero: 64, body: 30 },
  radius: 14,
};
const navy = '#060a1f';
const skyBlue = '#7cc4ff';
const blueSoft = '#e8eeff';
const muted = '#5b6480';
const mutedDark = '#a9b3d6';
const rule = '#d9deeb';
const ruleDark = 'rgba(255,255,255,0.16)';
const glass = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.22)' };
const bgLight = 'radial-gradient(900px 600px at 100% 0%, rgba(36,70,255,0.10), transparent 60%), #f4f6fb';
const bgDark = `radial-gradient(1100px 700px at 0% 115%, rgba(36,70,255,0.55), transparent 60%), radial-gradient(900px 600px at 105% -10%, rgba(41,182,246,0.30), transparent 60%), ${navy}`;
const bgBlue = 'linear-gradient(180deg, transparent 55%, rgba(6,10,31,0.55) 100%), radial-gradient(1000px 700px at 90% 10%, rgba(63,208,245,0.70), transparent 60%), linear-gradient(115deg, #0a1bd9 0%, #2446ff 50%, #1f7cf0 100%)';
const accentBar = 'linear-gradient(180deg, #2446ff, #3fd0f5)';

// Demo-only font load (allowed in theme demos).
const Font = () => <style>{"@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');"}</style>;

type ToneName = 'light' | 'dark';
const Tone = createContext<ToneName>('light');
const useTone = () => {
  const dark = useContext(Tone) === 'dark';
  return {
    dark,
    text: dark ? '#ffffff' : 'var(--osd-text)',
    sub: dark ? mutedDark : muted,
    hi: dark ? skyBlue : 'var(--osd-accent)',
    line: dark ? ruleDark : rule,
  };
};

const Title = ({ children }: { children: ReactNode }) => (
  <h1 style={{ fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)', fontWeight: 300, lineHeight: 1.12, letterSpacing: -2, margin: 0 }}>{children}</h1>
);

const Eyebrow = ({ children }: { children: ReactNode }) => {
  const t = useTone();
  return <div style={{ fontSize: 24, fontWeight: 500, color: t.hi, marginBottom: 14 }}>{children}</div>;
};

type FooterProps = { source?: string; sourceLabel?: string; caption?: string; illustrative?: boolean };

const Footer = ({ source, sourceLabel, caption, illustrative }: FooterProps) => {
  const { current, total } = useSlidePageNumber();
  const t = useTone();
  return (
    <footer style={{ marginTop: 'auto', flexShrink: 0, paddingTop: 14, fontSize: 22, color: t.sub, display: 'flex', justifyContent: 'space-between' }}>
      <span>
        bitgo.com · {illustrative && 'Allocations are illustrative · '}
        {caption ?? <>Source: <a href={source} style={{ color: t.hi }}>{sourceLabel}</a></>}
      </span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
  );
};

type FrameProps = FooterProps & { tone?: ToneName; eyebrow?: string; title: string; subtitle: string; children: ReactNode };

const Frame = ({ tone = 'light', eyebrow, title, subtitle, children, source, sourceLabel, caption, illustrative }: FrameProps) => (
  <Tone.Provider value={tone}>
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '80px 100px 56px', display: 'flex', flexDirection: 'column', background: tone === 'dark' ? bgDark : bgLight, color: tone === 'dark' ? '#ffffff' : 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
      <Font />
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      <p style={{ fontSize: 30, lineHeight: 1.4, color: tone === 'dark' ? mutedDark : muted, margin: '18px 0 32px' }}>{subtitle}</p>
      <section style={{ flexShrink: 0 }}>{children}</section>
      <Footer source={source} sourceLabel={sourceLabel} caption={caption} illustrative={illustrative} />
    </main>
  </Tone.Provider>
);

const Pill = ({ children, color }: { children: ReactNode; color?: string }) => {
  const t = useTone();
  const c = color ?? t.hi;
  return <span style={{ display: 'inline-block', fontSize: 20, fontWeight: 500, lineHeight: 1.2, color: c, border: `1.5px solid ${c}`, borderRadius: 999, padding: '6px 16px' }}>{children}</span>;
};

const Card = ({ tag, title, children }: { tag?: string; title: string; children: ReactNode }) => {
  const t = useTone();
  return (
    <div style={{ ...(t.dark ? glass : { background: blueSoft }), borderRadius: 'var(--osd-radius)', padding: '30px 32px' }}>
      {tag && <div style={{ marginBottom: 18 }}><Pill>{tag}</Pill></div>}
      <h2 style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.2, margin: '0 0 14px' }}>{title}</h2>
      <div style={{ fontSize: 28, lineHeight: 1.6, color: t.dark ? '#e6eaff' : 'var(--osd-text)' }}>{children}</div>
    </div>
  );
};

const Note = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 24, marginTop: 28 }}>
    <span style={{ width: 4, flexShrink: 0, borderRadius: 2, background: accentBar }} />
    <p style={{ fontSize: 28, lineHeight: 1.45, margin: 0 }}>{children}</p>
  </div>
);

const Grid = ({ cols, children }: { cols: number; children: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 40 }}>{children}</div>
);

const Mark = ({ ok }: { ok: boolean }) => (
  <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 500, background: '#ffffff', color: ok ? '#2446ff' : '#e5484d' }}>{ok ? '✓' : '✕'}</span>
);
const CheckRow = ({ ok, children }: { ok: boolean; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.30)', fontSize: 28, marginTop: 14 }}>
    <Mark ok={ok} />
    <span>{children}</span>
  </div>
);

const Cover: Page = () => (
  <Tone.Provider value="dark">
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '80px 140px 56px', display: 'flex', flexDirection: 'column', background: bgBlue, color: '#ffffff', fontFamily: 'var(--osd-font-body)' }}>
      <Font />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: -0.5 }}>BitGo</span>
        <Pill color="#ffffff">Electric Blue</Pill>
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h1 style={{ fontSize: 124, fontWeight: 300, lineHeight: 1.08, margin: '0 0 40px', letterSpacing: -4 }}>
          Protect the reserve.<br />
          <span style={{ color: skyBlue }}>Move at market speed.</span>
        </h1>
        <p style={{ fontSize: 36, color: 'rgba(255,255,255,0.82)', margin: 0 }}>Gradient cover: wordmark, pill, thin two-tone headline.</p>
      </div>
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>bitgo.com</div>
    </main>
  </Tone.Provider>
);

const Content: Page = () => (
  <Frame title="So the right setup has to do four things" subtitle="Light page: pale-blue cards with pill tags, thin title, gradient-bar note." caption="Light tone">
    <Grid cols={2}>
      <Card tag="Goal 1 · insured and safe" title="1 · Reserve insured by default">
        <div>Long-term assets with a qualified custodian</div>
      </Card>
      <Card tag="Goal 2 · fast deployment" title="2 · Capital moves, custody stays">
        <div>Trade on venues without pre-funding them</div>
      </Card>
    </Grid>
    <Note>Every choice that follows answers one of these tests.</Note>
  </Frame>
);

const Closer: Page = () => (
  <Frame tone="dark" title="What changes for your fund" subtitle="Dark page: glass panel of crosses against a gradient panel of ticks." caption="Dark tone">
    <Grid cols={2}>
      <div style={{ ...glass, borderRadius: 'var(--osd-radius)', padding: '32px 36px 36px' }}>
        <Pill>Typical today</Pill>
        <CheckRow ok={false}>Reserve spread across venues</CheckRow>
        <CheckRow ok={false}>Controls depend on each venue</CheckRow>
      </div>
      <div style={{ background: bgBlue, border: '1px solid rgba(255,255,255,0.25)', borderRadius: 'var(--osd-radius)', padding: '32px 36px 36px' }}>
        <Pill color="#ffffff">With BitGo</Pill>
        <CheckRow ok>Qualified custodian, insured</CheckRow>
        <CheckRow ok>Per-wallet roles, two approvals</CheckRow>
      </div>
    </Grid>
  </Frame>
);

export default [Cover, Content, Closer];
