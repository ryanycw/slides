import { createContext, useContext } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import architectureImg from './assets/wallet-architecture.png';
import architectureBImg from './assets/wallet-architecture-option-b.png';
import capitalFlowImg from './assets/capital-flow.png';
import withdrawalImg from './assets/vault-withdrawal.png';

// Visual system: themes/electric-blue.md. Keep the components below in lockstep with it.

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap';
const FONT_LINK_ID = 'osd-webfont-bitgo-hedge-fund-proposal';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

export const design: DesignSystem = {
  palette: { bg: '#f4f6fb', text: '#0b1026', accent: '#2446ff' },
  fonts: { display: "'Inter', system-ui, sans-serif", body: "'Inter', system-ui, sans-serif" },
  typeScale: { hero: 64, body: 30 },
  radius: 14,
};
const navy = '#060a1f';
const cyan = '#3fd0f5';
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

const walletTypes = 'https://developers.bitgo.com/docs/wallet-types';
const policies = 'https://developers.bitgo.com/docs/policies-overview';
const goNetwork = 'https://www.bitgo.com/products/go-network-oes/';
const walletUsers = 'https://developers.bitgo.com/guides/wallets/users/add';
const hedgeFundRoles = 'https://financeunlocked.com/videos/who-works-in-a-hedge-fund';

// Every primitive reads the page tone, so the same markup works on light and dark pages.
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

type FooterProps = { source?: string; sourceLabel?: string; source2?: string; sourceLabel2?: string };

const Footer = ({ source, sourceLabel, source2, sourceLabel2 }: FooterProps) => {
  const { current, total } = useSlidePageNumber();
  const t = useTone();
  return (
    <footer style={{ marginTop: 'auto', flexShrink: 0, paddingTop: 14, fontSize: 22, color: t.sub, display: 'flex', justifyContent: 'space-between' }}>
      <span>bitgo.com{source && <> · Source: <a href={source} style={{ color: t.hi }}>{sourceLabel}</a></>}{source2 && <> · <a href={source2} style={{ color: t.hi }}>{sourceLabel2}</a></>}</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => {
  const t = useTone();
  return <div style={{ fontSize: 24, fontWeight: 500, color: t.hi, marginBottom: 10 }}>{children}</div>;
};

const Title = ({ children }: { children: ReactNode }) => (
  <h1 style={{ fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)', fontWeight: 300, lineHeight: 1.12, letterSpacing: -2, margin: 0 }}>{children}</h1>
);

type FrameProps = FooterProps & { tone?: ToneName; eyebrow?: string; title: string; subtitle?: string; children: ReactNode };

const Frame = ({ tone = 'light', eyebrow, title, subtitle, children, source, sourceLabel, source2, sourceLabel2 }: FrameProps) => (
  <Tone.Provider value={tone}>
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '64px 100px 56px', display: 'flex', flexDirection: 'column', background: tone === 'dark' ? bgDark : bgLight, color: tone === 'dark' ? '#ffffff' : 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {subtitle ? <p style={{ fontSize: 30, lineHeight: 1.4, color: tone === 'dark' ? mutedDark : muted, margin: '18px 0 32px' }}>{subtitle}</p> : <div style={{ height: 40 }} />}
      <section style={{ flexShrink: 0 }}>{children}</section>
      <Footer source={source} sourceLabel={sourceLabel} source2={source2} sourceLabel2={sourceLabel2} />
    </main>
  </Tone.Provider>
);

const Pill = ({ children, color }: { children: ReactNode; color?: string }) => {
  const t = useTone();
  const c = color ?? t.hi;
  return <span style={{ display: 'inline-block', fontSize: 20, fontWeight: 500, lineHeight: 1.2, color: c, border: `1.5px solid ${c}`, borderRadius: 999, padding: '6px 16px' }}>{children}</span>;
};

const Row = ({ cells }: { cells: ReactNode[] }) => {
  const t = useTone();
  const td: CSSProperties = { padding: '13px 24px 13px 0', borderBottom: `1px solid ${t.line}`, verticalAlign: 'top', fontSize: 26, lineHeight: 1.35 };
  return (
    <tr>
      <th scope="row" style={{ ...td, textAlign: 'left', fontWeight: 500 }}>{cells[0]}</th>
      {cells.slice(1).map((c, i) => <td key={i} style={td}>{c}</td>)}
    </tr>
  );
};
const Table = ({ heads, widths, children }: { heads: string[]; widths: number[]; children: ReactNode }) => {
  const t = useTone();
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <colgroup>{widths.map((w, i) => <col key={i} style={{ width: w }} />)}<col /></colgroup>
      <thead><tr style={{ fontSize: 20, fontWeight: 500, color: t.sub, textAlign: 'left' }}>{heads.map((h) => <th key={h} style={{ fontWeight: 500, paddingBottom: 12, borderBottom: `1px solid ${t.line}` }}>{h}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const Note = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 24, marginTop: 28 }}>
    <span style={{ width: 4, flexShrink: 0, borderRadius: 2, background: accentBar }} />
    <p style={{ fontSize: 28, lineHeight: 1.45, margin: 0 }}>{children}</p>
  </div>
);

// Closing line of a page: a large one-line claim plus an optional muted follow-on.
const Takeaway = ({ lead, sub }: { lead: string; sub?: string }) => {
  const t = useTone();
  return (
    <div style={{ display: 'flex', gap: 28, marginTop: 56 }}>
      <span style={{ width: 6, flexShrink: 0, borderRadius: 3, background: accentBar }} />
      <div>
        <p style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.2, letterSpacing: -1, margin: 0 }}>{lead}</p>
        {sub && <p style={{ fontSize: 28, lineHeight: 1.4, color: t.sub, margin: '12px 0 0' }}>{sub}</p>}
      </div>
    </div>
  );
};

const Block = ({ title, children }: { title: string; children: ReactNode }) => {
  const t = useTone();
  return (
    <div style={{ marginBottom: 26 }}>
      <h2 style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.2, color: t.hi, margin: '0 0 8px' }}>{title}</h2>
      <div style={{ fontSize: 28, lineHeight: 1.45 }}>{children}</div>
    </div>
  );
};

const Diagram = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
  <img src={src} alt={alt} style={{ width, height, flexShrink: 0, borderRadius: 'var(--osd-radius)', background: '#fff', boxShadow: '0 24px 60px -32px rgba(20,40,120,0.45)' }} />
);
const Split = ({ children }: { children: ReactNode }) => <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>{children}</div>;
const B = ({ children }: { children: ReactNode }) => {
  const t = useTone();
  return <strong style={{ color: t.hi, fontWeight: 500 }}>{children}</strong>;
};

// Pale-blue card on light pages, glass card on dark pages: pill tag, title, one line per child.
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
const Grid = ({ cols, children }: { cols: number; children: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 40 }}>{children}</div>
);

// Glass pill row with a tick or cross marker, as in the reference comparison page.
const Mark = ({ ok }: { ok: boolean }) => (
  <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 500, background: '#ffffff', color: ok ? '#2446ff' : '#e5484d' }}>{ok ? '✓' : '✕'}</span>
);
const CheckRow = ({ ok, n, compact, children }: { ok: boolean; n?: number; compact?: boolean; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 14 : 18, padding: compact ? '10px 18px' : '14px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.30)', fontSize: compact ? 26 : 28, marginTop: compact ? 10 : 14 }}>
    <Mark ok={ok} />
    {n !== undefined && <span style={{ width: 18, flexShrink: 0, color: 'rgba(255,255,255,0.6)' }}>{n}</span>}
    <span>{children}</span>
  </div>
);

// Safe-to-fast bar that frames the three "today" cards beneath it.
const Spectrum = () => (
  <div style={{ marginBottom: 36 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, fontWeight: 500, marginBottom: 12 }}>
      <span style={{ color: skyBlue }}>← Safer, slower to move</span>
      <span style={{ color: '#ffffff' }}>Faster, more exposed →</span>
    </div>
    <div style={{ height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${cyan}, #2446ff)` }} />
  </div>
);

const Wordmark = () => <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: -0.5 }}>BitGo</span>;

const Cover: Page = () => (
  <Tone.Provider value="dark">
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '80px 140px 56px', display: 'flex', flexDirection: 'column', background: bgBlue, color: '#ffffff', fontFamily: 'var(--osd-font-body)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Wordmark />
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h1 style={{ fontSize: 124, fontWeight: 300, lineHeight: 1.08, margin: '0 0 40px', letterSpacing: -4, fontFamily: 'var(--osd-font-display)' }}>
          Protect the reserve.<br />
          <span style={{ color: skyBlue }}>Move at market speed.</span>
        </h1>
        <p style={{ fontSize: 36, lineHeight: 1.45, color: 'rgba(255,255,255,0.82)', margin: 0 }}>A custody and liquidity plan for the $300M digital-asset fund.</p>
      </div>
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>bitgo.com</div>
    </main>
  </Tone.Provider>
);

const AgendaItem = ({ n, title, detail, pages }: { n: string; title: string; detail: string; pages: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '110px 600px 1fr 150px', alignItems: 'baseline', padding: '24px 0', borderBottom: `1px solid ${rule}` }}>
    <span style={{ fontSize: 40, fontWeight: 300, color: 'var(--osd-accent)' }}>{n}</span>
    <span style={{ fontSize: 40, fontWeight: 400, letterSpacing: -0.5 }}>{title}</span>
    <span style={{ fontSize: 28, color: muted }}>{detail}</span>
    <span style={{ fontSize: 22, color: muted, textAlign: 'right' }}>{pages}</span>
  </div>
);

const Agenda: Page = () => (
  <Frame title="Agenda" subtitle="Understand the situation, the need, then our solution.">
    <div style={{ borderTop: `1px solid ${rule}` }}>
      <AgendaItem n="01" title="Priorities" detail="Safety, speed and control, and today’s trade-off" pages="P. 3–4" />
      <AgendaItem n="02" title="Success Criteria" detail="Six checkpoints for the right setup" pages="P. 5" />
      <AgendaItem n="03" title="Our proposal" detail="Three tiers, six wallets; Option B with five" pages="P. 6–7" />
      <AgendaItem n="04" title="How it works" detail="Capital flow, roles, and the withdrawal path" pages="P. 8–11" />
      <AgendaItem n="05" title="Next steps" detail="What changes, and the path to full migration" pages="P. 12–13" />
    </div>
  </Frame>
);

const Heard: Page = () => (
  <Frame eyebrow="01 · Priorities" title="Safety, speed and control, all at once">
    <Grid cols={2}>
      <Card tag="Where you are today" title="A $300M book, spread out">
        <div><B>•</B> BTC, ETH and stablecoins</div>
        <div><B>•</B> Held across several exchanges and wallets</div>
        <div><B>•</B> Based in New York</div>
        <div><B>•</B> Moving to custody plus self-custody wallets</div>
      </Card>
      <Card tag="What you want" title="Three goals, plus two must-haves">
        <div><B>1</B> · Long-term assets insured and safe</div>
        <div><B>2</B> · Capital deployed to venues quickly</div>
        <div><B>3</B> · Role-based control on every wallet</div>
        <div><B>+</B> · Access to deep, on-demand liquidity</div>
        <div><B>+</B> · Fully legal and compliant in the US</div>
      </Card>
    </Grid>
    <Takeaway lead="Safe storage and fast deployment rarely come together." sub="Here is where that tension shows up today." />
  </Frame>
);

const Problem: Page = () => (
  <Frame eyebrow="01 · Priorities" tone="dark" title="Today, safety and speed pull against each other" subtitle="What we typically see when a fund's assets sit across several exchanges and wallets.">
    <Spectrum />
    <Grid cols={3}>
      <Card tag="Controlled · heavy to run" title="In your own wallets">
        <div>You hold every key</div>
        <div>One stolen key can move funds</div>
        <div>Each send is manual work</div>
      </Card>
      <Card tag="Fragmented" title="Across both">
        <div>Balances in many places</div>
        <div>No single view of the book</div>
        <div>No one place to approve</div>
      </Card>
      <Card tag="Fast · exposed" title="On exchanges">
        <div>Fast to trade and settle</div>
        <div>Exposed if a venue fails</div>
        <div>Not insured as custody</div>
      </Card>
    </Grid>
    <Takeaway lead="What is missing is one setup that does both." sub="The reserve stays safe, and trading capital still moves fast." />
  </Frame>
);

const Criteria: Page = () => (
  <Frame eyebrow="02 · Success Criteria" title="Six checkpoints for the right setup" subtitle="Each one traces back to a need we heard. Every choice that follows answers one of them.">
    <Grid cols={2}>
      <Card tag="Goal 1 · insured and safe" title="1 · Reserve insured by default">
        <div>Long-term assets in insured, offline storage</div>
      </Card>
      <Card tag="Goal 2 · fast deployment" title="2 · Capital moves, custody stays">
        <div>Trade on venues without pre-funding them</div>
      </Card>
      <Card tag="Goal 3 · role-based control" title="3 · No single person can move funds">
        <div>Every move needs a second, separate approver</div>
      </Card>
      <Card tag="Goals 1 + 2" title="4 · Speed never risks the whole book">
        <div>Only a small, capped share is ever exposed</div>
      </Card>
      <Card tag="Must-have · liquidity" title="5 · Liquidity on demand">
        <div>Trade, settle or borrow without leaving custody</div>
      </Card>
      <Card tag="Must-have · US compliance" title="6 · Legal and compliant in the US">
        <div>Custody that meets US rules for fund assets</div>
      </Card>
    </Grid>
  </Frame>
);

// A tier of the design, plus the P5 checkpoints it carries.
const Tier = ({ title, meets, children }: { title: string; meets: string[]; children: ReactNode }) => (
  <div style={{ marginBottom: 30 }}>
    <h2 style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.2, color: 'var(--osd-accent)', margin: '0 0 6px' }}>{title}</h2>
    <div style={{ fontSize: 26, lineHeight: 1.4 }}>{children}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 20, color: muted }}>
      Checkpoint{meets.length > 1 ? 's' : ''}
      {meets.map((m) => <Pill key={m}>{m}</Pill>)}
    </div>
  </div>
);

const Answer: Page = () => (
  <Frame eyebrow="03 · Our proposal" source={walletTypes} sourceLabel="BitGo wallet types" title="Three tiers, six wallets, one control plane" subtitle="Each tier does one job. Together they cover all six checkpoints.">
    <Split>
      <Diagram src={architectureImg} alt="Six wallets in three tiers (Reserve, Trade, Operate), drawn with Archify" width={1080} height={609} />
      <div>
        <Tier title="Reserve · ~85% · 3 vaults" meets={['1', '6']}>Insured custody cold storage</Tier>
        <Tier title="Trade · ~10% · Go Account" meets={['2', '5']}>Trades and borrows inside custody</Tier>
        <Tier title="Operate · ~5% · 2 hot wallets" meets={['4']}>Fast sends, capped daily</Tier>
        <Tier title="Across all six" meets={['3']}>One set of roles and policies</Tier>
      </div>
    </Split>
  </Frame>
);

const OptionB: Page = () => (
  <Frame eyebrow="03 · Our proposal" source={walletTypes} sourceLabel="BitGo wallet types" title="Option B: five wallets, one ETH-chain vault" subtitle="If ETH, like stablecoins, also refills the ETH hot wallet, one vault can do both jobs.">
    <Split>
      <Diagram src={architectureBImg} alt="Option B: five wallets with a combined ETH and stablecoin vault, drawn with Archify" width={1000} height={563} />
      <div>
        <Block title="Reserve · 2 vaults">BTC; ETH and stablecoins together</Block>
        <Block title="Why merge">Same chain, approvers and refill path</Block>
        <Block title="Hot tier">Larger: ETH + stables, e.g. for DeFi</Block>
        <Block title="Extra controls">Whitelist contracts; per-tx limits</Block>
        <Block title="Watch out">DeFi risk sits outside custody cover</Block>
      </div>
    </Split>
  </Frame>
);

const CapitalFlow: Page = () => (
  <Frame eyebrow="04 · How it works" title="The reserve stays put; trading capital moves fast" subtitle="Leaving the vault is slow by design. Everything after it is fast." source={goNetwork} sourceLabel="Go Network off-exchange settlement">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Diagram src={capitalFlowImg} alt="Capital flow from vaults to venues and back, drawn with Archify" width={1260} height={637} />
    </div>
  </Frame>
);

// A design rule behind the role table: short name plus the one-line rule.
const Rule = ({ n, title, children }: { n: string; title: string; children: ReactNode }) => {
  const t = useTone();
  return (
    <div style={{ ...(t.dark ? glass : { background: blueSoft }), borderRadius: 'var(--osd-radius)', padding: '18px 24px' }}>
      <div style={{ fontSize: 26, fontWeight: 500, color: t.hi }}>{n} · {title}</div>
      <div style={{ fontSize: 24, lineHeight: 1.4, marginTop: 6 }}>{children}</div>
    </div>
  );
};

const Rbac: Page = () => (
  <Frame eyebrow="04 · How it works" tone="dark" title="No single person can move funds" subtitle="Three rules decide who gets which role, set wallet by wallet." source={walletUsers} sourceLabel="BitGo wallet users and roles" source2={hedgeFundRoles} sourceLabel2="Who works in a hedge fund">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 12 }}>
      <Rule n="1" title="Split duties">Whoever starts a transfer never approves it</Rule>
      <Rule n="2" title="Least privilege">Each person gets only what the job needs</Rule>
      <Rule n="3" title="Always watched">Compliance audits all; Admins freeze</Rule>
    </div>
    <Table heads={['People', 'Vaults (3)', 'Go Account', 'Hot wallets (2)']} widths={[560, 390, 390]}>
      <Row cells={['Treasury operations', 'Wallet Spend', 'Wallet Spend', 'Wallet Spend + API token']} />
      <Row cells={['CEO · COO · CRO', 'Wallet Admin', 'Wallet Admin', 'Wallet Admin']} />
      <Row cells={['CIO · PMs', <>Wallet View <span style={{ color: mutedDark }}>(opt. for PMs)</span></>, 'Trader', <>Wallet View <span style={{ color: mutedDark }}>· opt. DeFi</span></>]} />
      <Row cells={['Compliance · Auditor', 'Auditor', 'Auditor', 'Auditor']} />
      <Row cells={['CTO · Fund admin · Quants · Analysts', 'Wallet View', 'Wallet View', 'Wallet View']} />
    </Table>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16, fontSize: 22, color: mutedDark }}>
      Enterprise-wide
      <Pill>CEO · COO · CRO: Enterprise Admin · Video ID</Pill>
      <Pill>CEO · COO · CTO: Organization Admin</Pill>
      <Pill>Compliance: Organization View</Pill>
    </div>
    <Takeaway lead="Any two of three Admins can approve." sub="No single point of failure, and holidays or time zones never stall the fund." />
  </Frame>
);

// Scenario map: one column per money movement, one row per person.
// opt marks an optional scenario: dashed, lightly tinted column.
const optCol: CSSProperties = { background: 'rgba(36,70,255,0.04)', borderLeft: '1.5px dashed #9db0ff', borderRight: '1.5px dashed #9db0ff' };
const Scenario = ({ n, title, route, opt }: { n: string; title: string; route: string; opt?: boolean }) => (
  <div style={{ padding: opt ? '0 10px 14px' : '0 8px 14px', borderBottom: `1px solid ${rule}`, ...(opt ? { ...optCol, borderTop: '1.5px dashed #9db0ff', borderRadius: '12px 12px 0 0', paddingTop: 8 } : {}) }}>
    <div style={{ fontSize: 20, color: muted }}>{n}{opt && <span style={{ marginLeft: 10, fontSize: 18, fontWeight: 500, color: 'var(--osd-accent)', border: '1.5px dashed var(--osd-accent)', borderRadius: 999, padding: '2px 10px' }}>Optional</span>}</div>
    <div style={{ fontSize: 26, fontWeight: 500, color: 'var(--osd-accent)', marginTop: 2, whiteSpace: 'nowrap' }}>{title}</div>
    <div style={{ fontSize: 18, color: muted, marginTop: 2, whiteSpace: 'nowrap' }}>{route}</div>
  </div>
);
// tall: two-line name (several people sharing one role).
const Person = ({ name, role, tall }: { name: ReactNode; role: string; tall?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: tall ? 100 : 76, borderBottom: `1px solid ${rule}` }}>
    <div style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.25 }}>{name}</div>
    <div style={{ fontSize: 20, color: muted }}>{role}</div>
  </div>
);
// kind: start (outline), approve (solid), act (soft fill).
type ActKind = 'start' | 'approve' | 'act';
const Chip = ({ kind, children }: { kind: ActKind; children: ReactNode }) => {
  const look: CSSProperties = kind === 'approve'
    ? { background: 'var(--osd-accent)', color: '#ffffff', border: '1.5px solid var(--osd-accent)' }
    : kind === 'start'
      ? { background: '#ffffff', color: 'var(--osd-accent)', border: '1.5px solid var(--osd-accent)' }
      : { background: blueSoft, color: 'var(--osd-text)', border: `1.5px solid ${blueSoft}` };
  return <span style={{ ...look, fontSize: 20, fontWeight: 500, borderRadius: 999, padding: '7px 14px', whiteSpace: 'nowrap' }}>{children}</span>;
};
// One grid cell; empty when no kind.
const Act = ({ kind, opt, last, tall, children }: { kind?: ActKind; opt?: boolean; last?: boolean; tall?: boolean; children?: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: tall ? 100 : 76, borderBottom: last && opt ? '1.5px dashed #9db0ff' : `1px solid ${rule}`, padding: '0 6px', ...(opt ? optCol : {}), ...(last && opt ? { borderRadius: '0 0 12px 12px' } : {}) }}>
    {kind && <Chip kind={kind}>{children}</Chip>}
  </div>
);

const WhoActs: Page = () => (
  <Frame eyebrow="04 · How it works" title="Who acts at each step of the money’s journey" subtitle="The moves from the capital-flow diagram, seen person by person." source={walletUsers} sourceLabel="BitGo wallet users and roles" source2={hedgeFundRoles} sourceLabel2="Who works in a hedge fund">
    <div style={{ display: 'grid', gridTemplateColumns: '270px repeat(7, 1fr)', columnGap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, paddingBottom: 18, borderBottom: `1px solid ${rule}`, fontSize: 20, color: muted }}>
        <Chip kind="start">Starts</Chip>
        <Chip kind="approve">Approves</Chip>
      </div>
      <Scenario n="1" title="Fund trading" route="Vault → Go Account" />
      <Scenario n="2" title="Trade" route="On Go Network" />
      <Scenario n="3" title="Refill" route="Vault → Hot Wallet" />
      <Scenario n="4" title="Deploy to venue" route="Hot Wallet → Venue" />
      <Scenario n="5" title="Sweep back" route="Go Account → Vault" />
      <Scenario n="6" title="Oversight" route="Any time" />
      <Scenario n="7" title="On-chain" route="Hot Wallet → Dapp" opt />

      <Person name="Treasury operations" role="Wallet Spend" />
      <Act kind="start">Initiate</Act>
      <Act />
      <Act kind="start">Initiate</Act>
      <Act kind="start">API send</Act>
      <Act kind="start">Initiate</Act>
      <Act />
      <Act opt />

      <Person name="CEO · COO · CRO" role="Wallet Admin · Video ID" />
      <Act kind="approve">Any 2</Act>
      <Act />
      <Act kind="approve">Any 2</Act>
      <Act kind="approve">Over cap</Act>
      <Act kind="approve">Any 2</Act>
      <Act kind="act">Set rules · Freeze</Act>
      <Act opt kind="approve">Over cap</Act>

      <Person name="CIO · PMs" role="Trader" />
      <Act />
      <Act kind="act">Buy and sell</Act>
      <Act />
      <Act />
      <Act />
      <Act />
      <Act opt kind="start">Sign trade</Act>

      <Person name="Compliance · Auditor" role="Auditor" />
      <Act />
      <Act />
      <Act />
      <Act />
      <Act />
      <Act kind="act">Audit logs</Act>
      <Act opt />

      <Person tall name={<>CTO · Fund admin<br />Quants · Analysts</>} role="Wallet View" />
      <Act tall />
      <Act tall />
      <Act tall />
      <Act tall />
      <Act tall />
      <Act tall kind="act">Models · NAV</Act>
      <Act tall opt last />
    </div>
    <Takeaway lead="Every move needs a starter and a separate approver." sub="Optional PM trading: ETH Hot Wallet only, whitelisted contracts, capped; Admin above cap." />
  </Frame>
);

const Withdrawal: Page = () => (
  <Frame eyebrow="04 · How it works" title="What it takes to move a dollar out of the vault" subtitle="Four independent checks, all enforced by BitGo before anything is signed." source={policies} sourceLabel="BitGo policies overview">
    <Split>
      <Diagram src={withdrawalImg} alt="Vault withdrawal approval workflow, drawn with Archify" width={1100} height={623} />
      <div>
        <Block title="1 · Role">Only Wallet Spend can start it.</Block>
        <Block title="2 · Policy">Whitelist and daily cap, or denied.</Block>
        <Block title="3 · People">Two other Admins must approve.</Block>
        <Block title="4 · BitGo">Video ID, offline signing, webhook.</Block>
      </div>
    </Split>
  </Frame>
);

const Panel = ({ blue, tag, title, children }: { blue?: boolean; tag: string; title?: string; children: ReactNode }) => (
  <div style={{ ...(blue ? { background: bgBlue, border: '1px solid rgba(255,255,255,0.25)' } : glass), borderRadius: 'var(--osd-radius)', padding: '32px 36px 36px' }}>
    <Pill color={blue ? '#ffffff' : skyBlue}>{tag}</Pill>
    {title ? <h2 style={{ fontSize: 34, fontWeight: 400, margin: '18px 0 6px' }}>{title}</h2> : <div style={{ height: 8 }} />}
    {children}
  </div>
);

// Before/after table: one row per checkpoint, the BitGo column tinted.
const Cmp = ({ n, title, today, bitgo }: { n: number; title: string; today: string; bitgo: string }) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 72, borderBottom: `1px solid ${ruleDark}`, fontSize: 28, fontWeight: 500 }}>
      <span style={{ color: mutedDark, width: 22 }}>{n}</span>{title}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 72, borderBottom: `1px solid ${ruleDark}`, padding: '0 24px', fontSize: 26, color: '#dbe1f5' }}>
      <span style={{ color: '#ff8a8e', fontWeight: 500 }}>✕</span>{today}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 72, borderBottom: '1px solid rgba(255,255,255,0.22)', padding: '0 24px', fontSize: 26, background: 'rgba(36,70,255,0.28)' }}>
      <span style={{ color: skyBlue, fontWeight: 500 }}>✓</span>{bitgo}
    </div>
  </>
);

const Scorecard: Page = () => (
  <Frame tone="dark" eyebrow="05 · Next steps" title="What changes, checkpoint by checkpoint" subtitle="Each checkpoint, before and after.">
    <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr 1fr' }}>
      <div style={{ fontSize: 20, fontWeight: 500, color: mutedDark, padding: '14px 0 12px', borderBottom: `1px solid ${ruleDark}` }}>Checkpoint</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: mutedDark, padding: '14px 24px 12px', borderBottom: `1px solid ${ruleDark}` }}>Typical today</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: '#ffffff', padding: '14px 24px 12px', borderBottom: '1px solid rgba(255,255,255,0.22)', background: 'rgba(36,70,255,0.45)', borderRadius: '12px 12px 0 0' }}>With BitGo</div>
      <Cmp n={1} title="Insured reserve" today="Reserve on venues, not insured as custody" bitgo="Qualified custodian, keys offline, insured" />
      <Cmp n={2} title="Fast deployment" today="Pre-fund each venue on-chain to trade" bitgo="Trade on Go Network while in custody" />
      <Cmp n={3} title="Split control" today="One person or one key can move funds" bitgo="Per-wallet roles and two approvals" />
      <Cmp n={4} title="Capped exposure" today="No cap on how much is exposed" bitgo="~5% in hot wallets, capped daily" />
      <Cmp n={5} title="Liquidity" today="Liquidity locked up in each venue" bitgo="Prime trading and lending, in custody" />
      <Cmp n={6} title="US compliance" today="No qualified custodian for fund assets" bitgo="OCC- and NYDFS-regulated custodian" />
    </div>
    <Takeaway lead="All six checkpoints, in one setup." sub="Safety and speed stop being a trade-off." />
  </Frame>
);

const NextSteps: Page = () => (
  <Frame eyebrow="05 · Next steps" tone="dark" title="From first call to fully migrated" subtitle="Move in tranches, so no single step puts the whole book at risk.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
      <div>
        <Block title="1 · Onboard">KYC, users, roles, 2FA, scoped API tokens.</Block>
        <Block title="2 · Build">Six wallets, whitelists, policies. Let them lock.</Block>
        <Block title="3 · Prove">Small test transfers on every path.</Block>
        <Block title="4 · Migrate">Move assets in tranches, reserve first.</Block>
      </div>
      <div style={{ borderLeft: `1px solid ${ruleDark}`, paddingLeft: 48 }}>
        <div style={{ fontSize: 22, fontWeight: 500, color: mutedDark, marginBottom: 18 }}>Decisions we need from you</div>
        <Block title="Which venues?">Which exchanges, and are they Go partners?</Block>
        <Block title="Who approves?">How many approvers, in which time zones?</Block>
        <Block title="How will you use ETH?">Held long-term, or deployed to DeFi?</Block>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20, fontSize: 28 }}>
      <Pill>Proposed next step</Pill>
      <span>A working session with your ops and compliance leads to settle these three.</span>
    </div>
  </Frame>
);

// BitGo facts checked 2026-09-21 (licenses 2026-09-24, bitgo.com/company/licenses) against developers.bitgo.com (wallet types, policies,
// wallet users) and bitgo.com (Go Network OES, Prime). Customer facts come only from the
// assessment brief; "today" pain points are framed as typical patterns, not claims.
// Diagrams: Archify sources in ./assets/archify (wallet architecture) and
// ./assets/archify (all three diagrams), recoloured per
// the "Diagrams" section of themes/electric-blue.md.
export const meta: SlideMeta = {
  title: 'BitGo proposal: custody and liquidity for your fund',
  theme: 'electric-blue',
  createdAt: '2026-09-21T13:18:55.554Z',
};

export const notes: (string | undefined)[] = [
  'Open on the tension, not on BitGo: most funds think they must choose between a safe reserve and a fast desk. Today we show you do not have to.', // 1 Cover
  'Set expectations: ten minutes, and we start with them, not with BitGo. Invite interruptions; deeper detail is available on request.', // 2 Agenda
  'Play back what they told us before pitching anything. Say it out loud: ask them to correct anything that is off. The design depends on these goals, so get a yes or a correction here.', // 3 What we heard
  'Frame as patterns we see, not a critique of their setup. Each place their assets sit today gives up something: exchanges give up safety, own wallets give up ease, and the spread gives up control. Land the last line as the bridge.', // 4 Problem
  'These six checkpoints are the contract for the rest of the talk: 1 to 4 come from the three goals, 5 and 6 from the two must-haves. They are requirements, not our product; ask if they would add or change any.', // 5 Criteria
  'Walk the tiers top to bottom and read each one\'s checkpoint pills: reserve covers 1 and 6, the Go Account 2 and 5, hot wallets 4, and the shared roles 3. Every checkpoint lands on exactly one tier. Percentages are a starting point to tune.', // 6 Answer
  'Option B, only if it fits how they use ETH: if ETH, like stablecoins, will also refill the ETH hot wallet (or go to DeFi), one ETH-chain vault replaces two. Same tiers, five wallets. Default stays Option A: separate vaults for different approvers, limits and cadence.', // 6b Option B
  'Walk the diagram left to right; each line says how fast it is. Leaving a vault is the slow step on purpose: two Admin approvals, BitGo signs within its 24h SLA, and video ID above $250k a day. After that it is fast: on Go Network the fund trades against partner venues while assets stay in BitGo custody and settle net, so nothing moves on-chain; hot wallets reach other venues by API in minutes.', // 7 Capital flow
  'Walk left to right in the order money moves. In every movement column there is an outline chip (who starts) and a solid chip (who approves), never the same person. Sweep back here is Go Account to vault, a withdrawal that needs approval; funds coming back from other venues are withdrawn on the exchange, and deposits into a vault need no approval. Oversight: Admins set policy and can freeze a wallet (freeze sits inside Wallet Admin); Compliance holds Auditor and reads every log. Column 7 is optional, only if the fund trades on-chain (see Option B). For DeFi apps BitGo integrates, give PMs the DeFi role. For any other Dapp the trade is a transaction from the wallet, so it needs Wallet Spend and a whitelisted contract address. Either way, cap it per trade, per day and as a share of the wallet. Be upfront: under the cap those trades run on policy alone, so they are not two-person; exposure stays bounded because hot wallets hold about 5% and the caps hold. Over the cap an Admin approves.', // 9b Who acts
  'This turns the previous page into configuration, using the role names from BitGo’s user settings. Rule 1: Treasury holds Wallet Spend and the approvers hold Wallet Admin, so the one who starts never approves. Rule 2: the investment side (CIO and PMs) is Trader on the Go Account and view-only elsewhere; the CTO, quants, analysts and the fund administrator only view (quants read positions for their models). Rule 3: Compliance holds Auditor; freezing is part of Wallet Admin, so the approvers freeze on Compliance’s call. Approvers are the CEO, COO and CRO: none of them runs money, which keeps investment and control apart. They also hold Enterprise Admin and Video ID (needed for withdrawals above $250k a day); the CEO, COO and CTO hold Organization Admin: the CTO’s team handles day-to-day onboarding and offboarding, and every user or role change is approved by another Organization Admin. The CTO holds no role that moves or approves funds, and Compliance sees every role change through Organization View. Treasury operations is 2 to 3 people so leave never blocks a transfer. If they use the optional on-chain column, the CIO and PMs add DeFi for BitGo-integrated apps, or Wallet Spend on the ETH Hot Wallet for other Dapps. Land the takeaway: any two of the three Admins can approve. If quants run automated strategies, the strategy’s API token sits under the CIO and PMs’ permissions (Trader on the Go Account; DeFi or Wallet Spend on-chain, capped); the quant personally holds nothing that moves funds. Vault view is optional for PMs: the CIO sees the whole book, but PMs may only need the Go Account and hot wallets, so let the fund decide per its internal controls.', // 8 RBAC
  'Make it concrete: even an executive with a stolen laptop cannot empty a vault. Each of the four checks is independent, and policies lock after 48 hours so an insider cannot quietly loosen them.', // 9 Withdrawal
  'Read across each numbered row: the cross on the left becomes the tick on the right. Keep "typical today" neutral. Land the takeaway, then move straight to next steps.', // 10 Scorecard
  'Make the ask. Four steps, test before moving size. Why reserve first: it is about 85% of assets and today sits on venues with counterparty risk and no custody cover, so moving it first takes the biggest risk off the table early; trading capital stays on its venues until the Go Account and hot wallets are proven, so the desk is not disrupted; and deposits into a vault need no approvals or video ID, only withdrawals do. Why decide approvers now: the any-two-of-three rule needs named Admins, and policies lock 48 hours after Build, after which only BitGo support can change them; approvals gate the 24h withdrawal SLA, so approvers spread across time zones keep withdrawals moving around the clock; each approver needs KYC, 2FA and video ID set up during Onboard; and approvers must be different people from Treasury, who initiate. Close by proposing a working session with ops and compliance to settle the three decisions this week.', // 11 Next steps
];

export default [Cover, Agenda, Heard, Problem, Criteria, Answer, OptionB, CapitalFlow, WhoActs, Rbac, Withdrawal, Scorecard, NextSteps] satisfies Page[];
