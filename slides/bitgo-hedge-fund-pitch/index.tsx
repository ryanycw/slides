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
const FONT_LINK_ID = 'osd-webfont-bitgo-hedge-fund-pitch';
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
const licenses = 'https://www.bitgo.com/company/licenses/';
const trustCenter = 'https://trustcenter.bitgo.com/';

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

type FooterProps = { source?: string; sourceLabel?: string };

const Footer = ({ source, sourceLabel }: FooterProps) => {
  const { current, total } = useSlidePageNumber();
  const t = useTone();
  return (
    <footer style={{ marginTop: 'auto', flexShrink: 0, paddingTop: 14, fontSize: 22, color: t.sub, display: 'flex', justifyContent: 'space-between' }}>
      <span>bitgo.com{source && <> · Source: <a href={source} style={{ color: t.hi }}>{sourceLabel}</a></>}</span>
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

const Frame = ({ tone = 'light', eyebrow, title, subtitle, children, source, sourceLabel }: FrameProps) => (
  <Tone.Provider value={tone}>
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '64px 100px 56px', display: 'flex', flexDirection: 'column', background: tone === 'dark' ? bgDark : bgLight, color: tone === 'dark' ? '#ffffff' : 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {subtitle ? <p style={{ fontSize: 30, lineHeight: 1.4, color: tone === 'dark' ? mutedDark : muted, margin: '18px 0 32px' }}>{subtitle}</p> : <div style={{ height: 40 }} />}
      <section style={{ flexShrink: 0 }}>{children}</section>
      <Footer source={source} sourceLabel={sourceLabel} />
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
  <Frame eyebrow="04 · How it works" tone="dark" title="No single person can move funds" subtitle="Three rules decide who gets which role, set wallet by wallet." source={walletUsers} sourceLabel="BitGo wallet users and roles">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 28 }}>
      <Rule n="1" title="Split duties">Whoever starts a transfer never approves it</Rule>
      <Rule n="2" title="Least privilege">Each person gets only what the job needs</Rule>
      <Rule n="3" title="Always watched">Compliance sees and can freeze all</Rule>
    </div>
    <Table heads={['People', 'Vaults (3)', 'Go Account', 'Hot wallets (2)']} widths={[560, 390, 390]}>
      <Row cells={['COO · CFO · CIO', 'Admin: approve, set policy', 'Admin: approve withdrawals', 'Admin: approve big sends']} />
      <Row cells={['Treasury operations', 'Spender: initiate only', 'Spender: initiate only', 'Spender + API token']} />
      <Row cells={['Portfolio managers', 'Viewer', 'Trader: orders, allocations', 'Viewer']} />
      <Row cells={['Compliance · Auditor', 'Auditor + Freeze', 'Auditor + Freeze', 'Auditor + Freeze']} />
      <Row cells={['Fund administrator', 'Viewer', 'Viewer', 'Viewer']} />
    </Table>
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
const Person = ({ name, role }: { name: string; role: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 76, borderBottom: `1px solid ${rule}` }}>
    <div style={{ fontSize: 26, fontWeight: 500 }}>{name}</div>
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
const Act = ({ kind, opt, last, children }: { kind?: ActKind; opt?: boolean; last?: boolean; children?: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 76, borderBottom: last && opt ? '1.5px dashed #9db0ff' : `1px solid ${rule}`, padding: '0 6px', ...(opt ? optCol : {}), ...(last && opt ? { borderRadius: '0 0 12px 12px' } : {}) }}>
    {kind && <Chip kind={kind}>{children}</Chip>}
  </div>
);

const WhoActs: Page = () => (
  <Frame eyebrow="04 · How it works" title="Who acts at each step of the money’s journey" subtitle="The moves from the capital-flow diagram, seen person by person." source={walletUsers} sourceLabel="BitGo wallet users and roles">
    <div style={{ display: 'grid', gridTemplateColumns: '270px repeat(7, 1fr)', columnGap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, paddingBottom: 18, borderBottom: `1px solid ${rule}`, fontSize: 20, color: muted }}>
        <Chip kind="start">Starts</Chip>
        <Chip kind="approve">Approves</Chip>
      </div>
      <Scenario n="1" title="Fund trading" route="Vault → Go Account" />
      <Scenario n="2" title="Trade" route="On Go Network" />
      <Scenario n="3" title="Refill" route="Vault → Hot Wallet" />
      <Scenario n="4" title="Pay a venue" route="Hot Wallet → Venue" />
      <Scenario n="5" title="Sweep back" route="Venue → Vault" />
      <Scenario n="6" title="Oversight" route="Any time" />
      <Scenario n="7" title="On-chain" route="Hot Wallet → DEX" opt />

      <Person name="Treasury operations" role="Spender" />
      <Act kind="start">Initiate</Act>
      <Act />
      <Act kind="start">Initiate</Act>
      <Act kind="start">API send</Act>
      <Act kind="start">Initiate</Act>
      <Act />
      <Act opt />

      <Person name="COO · CFO · CIO" role="Admins" />
      <Act kind="approve">Any 2 approve</Act>
      <Act />
      <Act kind="approve">Any 2 approve</Act>
      <Act kind="approve">If large</Act>
      <Act kind="approve">Approve</Act>
      <Act kind="act">Set policy</Act>
      <Act opt kind="approve">Over cap</Act>

      <Person name="Portfolio managers" role="Trader" />
      <Act />
      <Act kind="act">Place orders</Act>
      <Act />
      <Act />
      <Act />
      <Act />
      <Act opt kind="start">Bot · API</Act>

      <Person name="Compliance · Auditor" role="Auditor + Freeze" />
      <Act />
      <Act />
      <Act />
      <Act />
      <Act />
      <Act kind="act">Watch · freeze</Act>
      <Act opt />

      <Person name="Fund administrator" role="Viewer" />
      <Act />
      <Act />
      <Act />
      <Act />
      <Act />
      <Act kind="act">Reconcile NAV</Act>
      <Act opt last />
    </div>
    <Takeaway lead="Every move needs a starter and a separate approver." sub="Optional bot: ETH Hot Wallet only, whitelisted contracts, capped; an Admin approves above the cap." />
  </Frame>
);

const Withdrawal: Page = () => (
  <Frame eyebrow="04 · How it works" title="What it takes to move a dollar out of the vault" subtitle="Four independent checks, all enforced by BitGo before anything is signed." source={policies} sourceLabel="BitGo policies overview">
    <Split>
      <Diagram src={withdrawalImg} alt="Vault withdrawal approval workflow, drawn with Archify" width={1100} height={623} />
      <div>
        <Block title="1 · Role">Only a Spender can start it.</Block>
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

const Scorecard: Page = () => (
  <Frame eyebrow="05 · Next steps" tone="dark" title="What changes, checkpoint by checkpoint" subtitle="Each checkpoint, before and after.">
    <Grid cols={2}>
      <Panel tag="Typical today">
        <CheckRow compact n={1} ok={false}>Reserve spread across venues and wallets</CheckRow>
        <CheckRow compact n={2} ok={false}>Pre-fund each venue on-chain to trade</CheckRow>
        <CheckRow compact n={3} ok={false}>Controls depend on each venue</CheckRow>
        <CheckRow compact n={4} ok={false}>Exposure sits wherever funds sit</CheckRow>
        <CheckRow compact n={5} ok={false}>Liquidity tied to each venue’s balance</CheckRow>
        <CheckRow compact n={6} ok={false}>Compliance varies venue by venue</CheckRow>
      </Panel>
      <Panel blue tag="With BitGo">
        <CheckRow compact n={1} ok>Qualified custodian, keys offline, insured</CheckRow>
        <CheckRow compact n={2} ok>Trade on Go Network while in custody</CheckRow>
        <CheckRow compact n={3} ok>Per-wallet roles and two approvals</CheckRow>
        <CheckRow compact n={4} ok>~5% in hot wallets, capped daily</CheckRow>
        <CheckRow compact n={5} ok>Go Network, Prime trading and lending</CheckRow>
        <CheckRow compact n={6} ok>OCC- and NYDFS-regulated custodian</CheckRow>
      </Panel>
    </Grid>
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

const AppendixDivider: Page = () => (
  <Tone.Provider value="dark">
    <main style={{ position: 'relative', width: '100%', height: '100%', boxSizing: 'border-box', padding: '0 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: bgBlue, color: '#ffffff', fontFamily: 'var(--osd-font-body)' }}>
      <div><Pill color="#ffffff">Backup material</Pill></div>
      <h1 style={{ fontSize: 140, fontWeight: 300, lineHeight: 1.1, margin: '32px 0', letterSpacing: -4 }}>Appendix</h1>
      <p style={{ fontSize: 36, lineHeight: 1.5, margin: 0, color: 'rgba(255,255,255,0.82)' }}>Wallet types · multisig vs MPC · ETH options · policies · roles · keys · liquidity · licenses · security</p>
      <div style={{ position: 'absolute', left: 140, bottom: 56, fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>bitgo.com</div>
    </main>
  </Tone.Provider>
);

const A = 'Appendix · pull up if asked';

const Types: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A1 · The three wallet types at a glance" subtitle="Each type trades speed for protection differently, so each tier gets the type that matches its job.">
    <Table heads={['Type', 'Who holds the keys', 'Speed out', 'Job in this design']} widths={[290, 500, 460]}>
      <Row cells={['Custody cold', 'BitGo holds all three, offline', 'Within 24h SLA, after video ID', 'Stores ~85%; slow on purpose']} />
      <Row cells={['Go Account', 'BitGo custody, off-chain ledger', 'Instant in-network', 'Trading float ~10%; holds USD too']} />
      <Row cells={['Self-custody hot', 'Fund holds 2 keys, BitGo holds 1', 'Minutes, signed by API', 'Working capital ~5%, any venue']} />
    </Table>
    <Note>BTC wallets use multisig; ETH wallets use MPC (one signature, lower gas).</Note>
  </Frame>
);

const A1Custody: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A2 · Wallets where BitGo holds the keys" subtitle="Custody products: the fund initiates, BitGo Bank & Trust signs.">
    <Table heads={['Wallet', 'Keys and signing', 'Speed', 'Best for']} widths={[330, 640, 310]}>
      <Row cells={['Custody multisig cold', 'All 3 keys in BitGo vaults; signed offline', 'Within 24h SLA', 'BTC, UTXO long-term holdings']} />
      <Row cells={['Custody MPC cold', 'Key shares in BitGo vaults; no full key', 'Within 24h SLA', 'ETH, account-based holdings']} />
      <Row cells={['Go Account', 'Omnibus custody, off-chain ledger, USD', 'Instant in-network', 'Trading and settlement']} />
      <Row cells={['Lightning', 'Single-sig hot, custody or self-custody', 'Seconds', 'BTC payments; not needed here']} />
    </Table>
    <Note>Custody wallets sign only in production; on testnet, test integrations on self-custody wallets.</Note>
  </Frame>
);

const A1Self: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A3 · Wallets where the fund holds the keys" subtitle="Self-custody: fund holds user + backup keys, BitGo holds the third and enforces policy.">
    <Table heads={['Wallet', 'How it signs', 'Speed', 'Best for']} widths={[330, 640, 310]}>
      <Row cells={['Multisig hot', 'SDK signs with user key, BitGo co-signs', 'Minutes', 'BTC working capital']} />
      <Row cells={['MPC hot', 'SDK share ceremony; one on-chain signature', 'Minutes', 'ETH, ERC-20 working capital']} />
      <Row cells={['Multisig cold', 'Sign offline in the OVC, BitGo co-signs', 'Hours, manual', 'Self-held reserves']} />
      <Row cells={['MPC cold', 'Offline signing with MPC key shares', 'Hours, manual', 'Self-held ETH-style reserves']} />
    </Table>
    <Note>Trade-off: control and speed, but no BitGo custody insurance, and key storage becomes the fund’s job.</Note>
  </Frame>
);

const A2: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A4 · Multisig vs MPC" subtitle="Both are 2-of-3. The difference is where the threshold is enforced.">
    <Table heads={['', 'Multisig', 'MPC (TSS)']} widths={[360, 640]}>
      <Row cells={['Key material', 'Three independent private keys', 'Encrypted shares; a full key never exists']} />
      <Row cells={['Signing', 'On-chain, cosigners sign asynchronously', 'Off-chain, synchronous; one combined signature']} />
      <Row cells={['Transaction cost', 'Higher: several signatures', 'Lower: a single signature']} />
      <Row cells={['During signing', 'Fees and nonces can still change', 'Nothing in the transaction can change']} />
      <Row cells={['Natural fit', 'Bitcoin and UTXO chains', 'Ethereum and account-based chains']} />
    </Table>
  </Frame>
);

const ArchitectureAlt: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A5 · Six wallets, or five: it depends on ETH" subtitle="A cold vault cannot touch DeFi, so ETH usage decides the vault split and hot-wallet size.">
    <Table heads={['', 'ETH held as a position', 'ETH deployed to DeFi']} widths={[300, 620]}>
      <Row cells={['Vault tier', 'Separate ETH and stablecoin vaults: 3 vaults', 'One ETH-chain reserve vault with stables: 2 vaults']} />
      <Row cells={['Why', 'Different approvers, limits and cadence', 'Both only refill the hot wallet, same approvers']} />
      <Row cells={['Hot tier', 'Small: ~5% working capital', 'Larger: ETH + stables together for protocols']} />
      <Row cells={['Extra controls', 'None beyond the standard policy set', 'Whitelist protocol contracts; per-tx thresholds']} />
      <Row cells={['Total wallets', 'Six', 'Five']} />
    </Table>
    <Note>Ask the fund: is ETH held long-term or moved into DeFi? Smart-contract risk sits outside custody cover.</Note>
  </Frame>
);

const TierPolicies: Page = () => (
  <Frame eyebrow={A} title="A6 · Policy rules lock each tier down" subtitle="Roles say who may act. Policies say what an action may do; BitGo enforces them before signing." source={policies} sourceLabel="BitGo policies overview">
    <Table heads={['Tier', 'Where funds may go', 'Approvals and limits']} widths={[230, 700]}>
      <Row cells={['Vaults', 'Only own Go Account and own hot wallets', '2 Admin approvals · video ID over $250k/day · daily cap']} />
      <Row cells={['Go Account', 'Partner venues; out only to own wallets and bank', 'Traders trade freely · Admin approves withdrawals']} />
      <Row cells={['Hot wallets', 'Only whitelisted venue deposit addresses', 'Small sends auto · large need Admin · daily and % caps']} />
    </Table>
    <Note>Policies lock after 48h and only BitGo support can loosen them, so no admin can quietly open a wallet.</Note>
  </Frame>
);

const A3: Page = () => (
  <Frame eyebrow={A} title="A7 · Roles and permissions compared" subtitle="Default roles cover most funds; custom roles combine permissions when they do not." source={walletUsers} sourceLabel="BitGo wallet users and roles">
    <Table heads={['Role / permission', 'Scope', 'Can', 'Cannot']} widths={[300, 220, 760]}>
      <Row cells={['Enterprise Admin', 'Enterprise', 'Create wallets, manage users, enterprise policy', 'Skip approval rules']} />
      <Row cells={['Wallet Admin', 'Wallet', 'Set wallet policy, users, whitelists; approve', 'Approve own requests']} />
      <Row cells={['Spender', 'Wallet', 'Initiate withdrawals, create addresses', 'Change policy']} />
      <Row cells={['Trader', 'Go Account', 'Place orders; view enterprise wallets', 'Withdraw']} />
      <Row cells={['Viewer', 'Wallet', 'See balances, transactions, users', 'Move funds']} />
      <Row cells={['Auditor', 'Enterprise', 'Read activity logs for every user', 'Move funds']} />
      <Row cells={['Freeze', 'Wallet', 'Halt all withdrawals on a wallet', 'Unfreeze alone']} />
    </Table>
  </Frame>
);

const A4: Page = () => (
  <Frame eyebrow={A} title="A8 · The policy toolkit" subtitle="A rule is a condition plus an action, scoped to one wallet or the whole enterprise." source={policies} sourceLabel="BitGo policies overview">
    <Table heads={['Rule type', 'Triggers on', 'Used here for']} widths={[400, 600]}>
      <Row cells={['Destination (whitelist)', 'Address not on the approved list', 'Every tier: deny unknown addresses']} />
      <Row cells={['Threshold', 'Size of a single withdrawal', 'Hot wallets: large sends need an Admin']} />
      <Row cells={['Velocity limit', 'Total withdrawn in a time window', 'Daily caps on vaults and hot wallets']} />
      <Row cells={['% of wallet balance', 'Share of the balance leaving', 'Stops a hot wallet being drained']} />
      <Row cells={['Initiator', 'Who started the withdrawal', 'Tighter rules for API tokens']} />
      <Row cells={['Webhook', 'Response from the fund’s own system', 'Optional check with a risk engine']} />
    </Table>
    <Note>Actions: deny, require N approvals, or video ID. Rules lock after 48h; custody adds BitGo’s own rules.</Note>
  </Frame>
);

const A5: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A9 · Keys and recovery for the hot wallets" subtitle="Self-custody moves key responsibility to the fund. This is how to carry it.">
    <Table heads={['Key', 'Held by', 'Stored', 'Used for']} widths={[220, 200, 780]}>
      <Row cells={['User key', 'Fund', 'Encrypted by passphrase; passphrase in KMS or HSM', 'Daily signing through the SDK']} />
      <Row cells={['Backup key', 'Fund', 'Offline, split between two officers, separate site', 'Recovery only']} />
      <Row cells={['BitGo key', 'BitGo', 'BitGo HSMs', 'Co-signs after policy passes']} />
    </Table>
    <Note>User + backup keys recover funds without BitGo and bypass its policy: guard the backup key like a vault.</Note>
    <Note>API access tokens: spending limits, IP allowlist, short lifetimes, one token per service.</Note>
  </Frame>
);

const A6: Page = () => (
  <Frame eyebrow={A} title="A10 · Liquidity options from the Go Account" subtitle="All three settle through Go Network without assets leaving regulated custody." source={goNetwork} sourceLabel="Go Network off-exchange settlement">
    <Table heads={['Option', 'What it is', 'Use when']} widths={[380, 800]}>
      <Row cells={['Off-exchange settlement', 'Balance mirrored to a partner venue; settles off-chain', 'Keep venues, skip pre-funding']} />
      <Row cells={['BitGo Prime trading', 'One API to exchanges, market makers and OTC desks', 'Best execution over a set venue']} />
      <Row cells={['Financing and lending', 'Borrow against BTC, ETH or stablecoins in custody', 'Leverage or cash without selling']} />
    </Table>
    <Note>Partner coverage changes: check the fund’s venues against the Go Network list before sizing tiers 2–3.</Note>
  </Frame>
);

const A7: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A11 · If the fund asks for more" subtitle="Each need maps to an existing BitGo capability, so the design grows without a rebuild.">
    <Table heads={['Further need', 'Answer', 'Impact on the design']} widths={[430, 640]}>
      <Row cells={['Yield on idle ETH', 'Staking from custody wallets', 'None: stake from the ETH vault']} />
      <Row cells={['More assets or chains', 'Add a wallet per new chain in each tier', 'Same roles and policy templates']} />
      <Row cells={['Second custodian model', 'Self-custody cold wallet (an optional 7th)', 'Adds offline key ceremony']} />
      <Row cells={['Audit and NAV reporting', 'Viewer and Auditor roles, reports, webhooks', 'None: already provisioned']} />
      <Row cells={['Cover above $250M', 'Additional insurance arranged through BitGo', 'Commercial, not technical']} />
      <Row cells={['Automated treasury', 'BitGo SDK + transfer webhooks', 'Extends hot-wallet tooling']} />
    </Table>
  </Frame>
);

const A12: Page = () => (
  <Frame eyebrow={A} source={licenses} sourceLabel="BitGo licenses and registrations" title="A12 · Licenses and compliance" subtitle="A US-regulated qualified custodian, licensed in each major market it serves.">
    <Table heads={['Entity', 'Regulator', 'License']} widths={[520, 420]}>
      <Row cells={['BitGo Bank & Trust, N.A.', 'OCC (US federal)', 'National trust bank; qualified custodian']} />
      <Row cells={['BitGo New York Trust Co.', 'NYDFS (New York)', 'Limited-purpose trust; qualified custodian']} />
      <Row cells={['BitGo Technologies, LLC', 'FinCEN + US states', 'Money services business; money transmitter']} />
      <Row cells={['BitGo Europe GmbH', 'BaFin (Germany)', 'MiCA licence: custody, transfer, trading']} />
      <Row cells={['BitGo GmbH', 'FINMA (Switzerland)', 'Crypto-asset custody provider']} />
      <Row cells={['BitGo Singapore Pte. Ltd.', 'MAS (Singapore)', 'Major Payment Institution']} />
      <Row cells={['BitGo (Custody) MENA FZE', 'VARA (Dubai)', 'Custody; broker-dealer services']} />
    </Table>
    <Note>SOC 1 + SOC 2 Type 2 · $250M Lloyd’s cover where BitGo holds all keys · segregated client assets</Note>
  </Frame>
);

const A13: Page = () => (
  <Frame eyebrow={A} source={trustCenter} sourceLabel="BitGo Trust Center" title="A13 · Security and compliance controls" subtitle="What sits behind the licenses: audited controls, insured custody, segregated assets.">
    <Table heads={['Measure', 'What BitGo does', 'Why it matters']} widths={[360, 820]}>
      <Row cells={['Independent audits', 'SOC 1 Type 2 and SOC 2 Type 2 reports', 'Controls tested by an outside auditor']} />
      <Row cells={['Custody insurance', '$250M, Lloyd’s syndicate; BitGo pays deductibles', 'Covers loss, theft and misuse']} />
      <Row cells={['Segregated assets', 'Client accounts held apart, never commingled', 'Bankruptcy remote by design']} />
      <Row cells={['Key security', 'Multisig and MPC, cold storage, offline signing', 'No single key can move funds']} />
      <Row cells={['Transaction monitoring', 'KYT screening and policy controls in custody', 'Blocks risky or unknown flows']} />
      <Row cells={['Travel Rule', 'Co-developed the Travel Rule Protocol (TRP)', 'Sender data travels with transfers']} />
    </Table>
    <Note>The $250M policy covers only keys BitGo holds; hot wallets are outside it. Excess cover is available.</Note>
  </Frame>
);

// BitGo facts checked 2026-09-21 (licenses 2026-09-24, bitgo.com/company/licenses) against developers.bitgo.com (wallet types, policies,
// wallet users) and bitgo.com (Go Network OES, Prime). Customer facts come only from the
// assessment brief; "today" pain points are framed as typical patterns, not claims.
// Diagrams: Archify sources in ./assets/archify (wallet architecture) and
// ./assets/archify (capital flow) and ../bitgo-hedge-fund-proposal/assets/archify (withdrawal), recoloured per
// the "Diagrams" section of themes/electric-blue.md.
export const meta: SlideMeta = {
  title: 'BitGo pitch: custody and liquidity for your fund',
  theme: 'electric-blue',
  createdAt: '2026-09-23T08:32:45.980Z',
};

export const notes: (string | undefined)[] = [
  'Open on the tension, not on BitGo: most funds think they must choose between a safe reserve and a fast desk. Today we show you do not have to.', // 1 Cover
  'Set expectations: ten minutes, and we start with them, not with BitGo. Invite interruptions; the appendix holds the detail for any deep question.', // 2 Agenda
  'Play back what they told us before pitching anything. Say it out loud: ask them to correct anything that is off. The design depends on these goals, so get a yes or a correction here.', // 3 What we heard
  'Frame as patterns we see, not a critique of their setup. Each place their assets sit today gives up something: exchanges give up safety, own wallets give up ease, and the spread gives up control. Land the last line as the bridge.', // 4 Problem
  'These six checkpoints are the contract for the rest of the talk: 1 to 4 come from the three goals, 5 and 6 from the two must-haves. They are requirements, not our product; ask if they would add or change any.', // 5 Criteria
  'Walk the tiers top to bottom and read each one\'s checkpoint pills: reserve covers 1 and 6, the Go Account 2 and 5, hot wallets 4, and the shared roles 3. Every checkpoint lands on exactly one tier. Percentages are a starting point to tune.', // 6 Answer
  'Option B, only if it fits how they use ETH: if ETH, like stablecoins, will also refill the ETH hot wallet (or go to DeFi), one ETH-chain vault replaces two. Same tiers, five wallets. Default stays Option A: separate vaults for different approvers, limits and cadence.', // 6b Option B
  'Walk the diagram left to right; each line says how fast it is. Leaving a vault is the slow step on purpose: two Admin approvals, BitGo signs within its 24h SLA, and video ID above $250k a day. After that it is fast: on Go Network the fund trades against partner venues while assets stay in BitGo custody and settle net, so nothing moves on-chain; hot wallets reach other venues by API in minutes.', // 7 Capital flow
  'Walk left to right in the order money moves. In every movement column there is an outline chip (who starts) and a solid chip (who approves), never the same person. Column 7 is optional, only if the fund trades on-chain (DEX or DeFi, see Option B): give the trading bot an API token as Spender on the ETH Hot Wallet only, whitelist the contracts it may call, and cap it per trade, per day and as a share of the wallet. Be upfront: under the cap those trades run on policy alone, so it is not two-person; the exposure is bounded because hot wallets hold about 5% and the caps hold. Over the cap an Admin approves.', // 9b Who acts
  'This turns the previous page into configuration. Name the three rules first: rule 1 is why Treasury and Admins hold opposite roles, rule 2 is why PMs trade but never withdraw and the fund administrator (who calculates NAV) only views, rule 3 is the compliance row, which covers the compliance officer and the auditor. Sizing: COO, CFO and CIO are the three Enterprise Admins; Treasury operations is 2 to 3 people so leave never blocks a transfer. Land the takeaway: any two of the three Admins can approve.', // 8 RBAC
  'Make it concrete: even a CFO with a stolen laptop cannot empty a vault. Each of the four checks is independent, and policies lock after 48 hours so an insider cannot quietly loosen them.', // 9 Withdrawal
  'Read across each numbered row: the cross on the left becomes the tick on the right. Keep "typical today" neutral. Land the takeaway, then move straight to next steps.', // 10 Scorecard
  'Make the ask. Four steps, reserve first, test before moving size. Three decisions shape the final design; propose a working session with ops and compliance to settle them this week.', // 11 Next steps
  undefined, // Appendix divider
  undefined, // A1 Types
  undefined, // A2 Custody wallets
  undefined, // A3 Self-custody wallets
  undefined, // A4 Multisig vs MPC
  'Use if they answer "DeFi" to the ETH question on the next-steps slide.', // A5 Six or five
  undefined, // A6 Tier policies
  undefined, // A7 Roles
  undefined, // A8 Policy toolkit
  undefined, // A9 Keys
  undefined, // A10 Liquidity
  undefined, // A11 Further needs
  'Use when compliance comes up (their US must-have on page 3). OCC charter: conversion from the South Dakota trust approved Dec 2025. Insurance covers only assets where BitGo holds all keys, not the self-custody hot wallets.', // A12 Licenses
  'Pair with A12. TRP was co-developed with ING and Standard Chartered. BitGo reports zero internal asset losses in over a decade; say it as their claim, not ours.', // A13 Security and compliance
];

export default [Cover, Agenda, Heard, Problem, Criteria, Answer, OptionB, CapitalFlow, WhoActs, Rbac, Withdrawal, Scorecard, NextSteps, AppendixDivider, Types, A1Custody, A1Self, A2, ArchitectureAlt, TierPolicies, A3, A4, A5, A6, A7, A12, A13] satisfies Page[];
