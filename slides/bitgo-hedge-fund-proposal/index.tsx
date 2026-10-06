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
const licenses = 'https://www.bitgo.com/company/licenses/';
const hedgeFundRoles = 'https://financeunlocked.com/videos/who-works-in-a-hedge-fund';
const fundOffices = 'https://www.akj.com/blog/hedge-fund-roles-explained';
const trustCenter = 'https://trustcenter.bitgo.com/';
const insurance = 'https://www.bitgo.com/solutions/insurance/';
const goAccount = 'https://www.bitgo.com/products/go-account/';
const protocols = 'https://assets.bitgo.com/protocols';
const goNetworkDocs = 'https://developers.bitgo.com/docs/go-network-overview';
const billing = 'https://bitgo.com/resources/billing-methodology/';
const custodyAgreement = 'https://www.bitgo.com/legal/bitgo-custodial-services-agreement/';

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
      <th style={{ ...td, textAlign: 'left', fontWeight: 500 }}>{cells[0]}</th>
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
      <AgendaItem n="04" title="How it works" detail="Capital flow, people, roles, policies, withdrawal" pages="P. 8–13" />
      <AgendaItem n="05" title="Next steps" detail="What changes, and the path to full migration" pages="P. 14–15" />
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

// Org chart: CEO over four executives, each with the teams they lead.
const OrgBox = ({ title, sub, top, ext }: { title: string; sub: string; top?: boolean; ext?: boolean }) => (
  <div style={{ ...(top ? { background: bgBlue, border: '1px solid rgba(255,255,255,0.25)' } : glass), ...(ext ? { border: '1.5px dashed rgba(255,255,255,0.35)', background: 'transparent' } : {}), borderRadius: 12, padding: '14px 20px' }}>
    <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2 }}>{title}</div>
    <div style={{ fontSize: 20, color: top ? 'rgba(255,255,255,0.85)' : mutedDark, marginTop: 4 }}>{sub}</div>
  </div>
);
// via: a team this proposal leaves out of BitGo; its executive acts for it.
const Team = ({ title, sub, ext, via }: { title: string; sub: string; ext?: boolean; via?: string }) => (
  <div style={{ padding: '10px 0', borderBottom: `1px ${via ? 'dashed' : 'solid'} ${ruleDark}`, opacity: via ? 0.55 : 1 }}>
    <div style={{ fontSize: 24, fontWeight: 500 }}>{title}{ext && <span style={{ fontWeight: 400, color: mutedDark }}> · external</span>}{via && <span style={{ marginLeft: 10, fontSize: 16, fontWeight: 500, color: skyBlue, border: `1.5px dashed ${skyBlue}`, borderRadius: 999, padding: '1px 8px', verticalAlign: 'middle' }}>{via}</span>}</div>
    <div style={{ fontSize: 20, color: mutedDark }}>{sub}</div>
  </div>
);
const Branch = ({ office, head, children }: { office: string; head: ReactNode; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ width: 2, height: 24, background: ruleDark, alignSelf: 'center' }} />
    {head}
    <div style={{ marginTop: 16, marginBottom: 4 }}><Pill>{office}</Pill></div>
    {children}
  </div>
);

const OrgChart: Page = () => (
  <Frame tone="dark" eyebrow="04 · How it works" title="Who works in the fund, and who they report to" subtitle="The people behind every move. Faded teams are represented by their executive here." source={hedgeFundRoles} sourceLabel="Who works in a hedge fund" source2={fundOffices} sourceLabel2="Front, middle and back office">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 620 }}><OrgBox top title="CEO" sub="Runs the firm; oversees investment and operations" /></div>
    </div>
    <div style={{ width: 2, height: 24, background: ruleDark, margin: '0 auto' }} />
    <div style={{ height: 2, background: ruleDark, margin: '0 12.5%' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      <Branch office="Front office" head={<OrgBox title="CIO" sub="Sets strategy; picks investments" />}>
        <Team title="Portfolio managers" sub="Run capital and place trades" />
        <Team title="Analysts" sub="Research ideas; take no direct risk" />
        <Team title="Quants" sub="Build models and trading signals" />
      </Branch>
      <Branch office="Middle office" head={<OrgBox title="CRO" sub="Sets risk limits; one of three approvers" />}>
        <Team via="Via CRO" title="Risk team" sub="Limits, exposure and margin" />
      </Branch>
      <Branch office="Back office" head={<OrgBox title="COO" sub="Operations, compliance and legal" />}>
        <Team title="Treasury operations" sub="Move cash, settle, reconcile" />
        <Team title="Compliance · Auditor" sub="Rules, monitoring, audit" />
        <Team ext title="Fund admin" sub="Independent NAV and reporting" />
      </Branch>
      <Branch office="Back office" head={<OrgBox title="CTO" sub="Runs systems; manages user access" />}>
        <Team via="Via CTO" title="IT team" sub="Access, integrations, security" />
      </Branch>
    </div>
  </Frame>
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

// Role design: roles to create (with the permissions they bundle) and who holds each.
const roleGrid = '300px 560px repeat(8, 1fr)';
const PersonHead = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 19, fontWeight: 500, color: mutedDark, textAlign: 'center', lineHeight: 1.25, whiteSpace: 'nowrap', padding: '0 0 12px', borderBottom: `1px solid ${ruleDark}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>{children}</div>
);
// y = holds the role, o = optional, '' = no.
const Dot = ({ v }: { v: '' | 'y' | 'o' }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${ruleDark}` }}>
    {v === 'y' && <span style={{ width: 18, height: 18, borderRadius: 9, background: skyBlue }} />}
    {v === 'o' && <span style={{ width: 18, height: 18, borderRadius: 9, border: `2px dashed ${skyBlue}` }} />}
  </div>
);
const RoleRow = ({ name, bundle, opt, who }: { name: string; bundle: string; opt?: boolean; who: ('' | 'y' | 'o')[] }) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', height: 58, fontSize: 26, fontWeight: 500, borderBottom: `1px solid ${ruleDark}` }}>
      {name}{opt && <span style={{ marginLeft: 8, fontWeight: 400, color: mutedDark }}>(opt.)</span>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#dbe1f5', borderBottom: `1px solid ${ruleDark}`, paddingRight: 16 }}>{bundle}</div>
    {who.map((v, i) => <Dot key={i} v={v} />)}
  </>
);

const RoleDesign: Page = () => (
  <Frame tone="dark" eyebrow="04 · How it works" title="No single person can move funds" subtitle="Three rules shape the roles; create them once, then assign people." source={walletUsers} sourceLabel="BitGo wallet users and roles" source2={hedgeFundRoles} sourceLabel2="Who works in a hedge fund">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
      <Rule n="1" title="Split duties">Whoever starts a transfer never approves it</Rule>
      <Rule n="2" title="Least privilege">Each person gets only what the job needs</Rule>
      <Rule n="3" title="Always watched">Compliance audits all; approvers freeze</Rule>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: roleGrid }}>
      <div style={{ fontSize: 20, fontWeight: 500, color: mutedDark, padding: '0 0 12px', borderBottom: `1px solid ${ruleDark}`, display: 'flex', alignItems: 'flex-end' }}>Role to create</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: mutedDark, padding: '0 0 12px', borderBottom: `1px solid ${ruleDark}`, display: 'flex', alignItems: 'flex-end', gap: 24 }}>Bundles these permissions<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 400 }}><span style={{ width: 14, height: 14, borderRadius: 7, background: skyBlue }} />holds<span style={{ width: 14, height: 14, borderRadius: 7, border: `2px dashed ${skyBlue}`, marginLeft: 10 }} />optional</span></div>
      <PersonHead>CEO</PersonHead>
      <PersonHead>COO</PersonHead>
      <PersonHead>CRO</PersonHead>
      <PersonHead>CTO</PersonHead>
      <PersonHead>CIO<br />PMs</PersonHead>
      <PersonHead>Treasury<br />operations</PersonHead>
      <PersonHead>Compliance<br />Auditor</PersonHead>
      <PersonHead>Fund admin<br />Quants<br />Analysts</PersonHead>
      <RoleRow name="Fund Approver" bundle="Enterprise Admin · Wallet Admin · Video ID" who={['y', 'y', 'y', '', '', '', '', '']} />
      <RoleRow name="Access Manager" bundle="Organization Admin" who={['y', 'y', '', 'y', '', '', '', '']} />
      <RoleRow name="Treasury Operator" bundle="Wallet Spend · Wallet View" who={['', '', '', '', '', 'y', '', '']} />
      <RoleRow name="Trader" bundle="Trader · Wallet View" who={['', '', '', '', 'y', '', '', '']} />
      <RoleRow name="On-chain Trader" opt bundle="DeFi · Wallet Spend" who={['', '', '', '', 'o', '', '', '']} />
      <RoleRow name="Compliance Monitor" bundle="Auditor · Organization View" who={['', '', '', '', '', '', 'y', '']} />
      <RoleRow name="Read Only" bundle="Wallet View" who={['', '', '', 'y', '', '', '', 'y']} />
      <RoleRow name="Billing" bundle="Billing" who={['', 'y', '', '', '', '', '', '']} />
    </div>
  </Frame>
);

const Fast = ({ children }: { children: ReactNode }) => <span style={{ color: muted }}>{children}</span>;

const PolicySet: Page = () => (
  <Frame eyebrow="04 · How it works" title="Then write the policies" subtitle="Approvals select the Wallet Admin permission, which only Fund Approvers hold." source={policies} sourceLabel="BitGo policies overview">
    <Table heads={['Scope', 'Condition', 'Triggers when', 'Action']} widths={[290, 250, 470]}>
      <Row cells={['All wallets', 'Destination', 'Address not on the whitelist', 'Deny']} />
      <Row cells={['Vaults', 'Any withdrawal', 'Every send out of a vault', 'Any 2 Wallet Admins; not the initiator']} />
      <Row cells={['Vaults', 'Velocity', 'Over $250k in a day', 'Video ID with BitGo']} />
      <Row cells={['Go Account', 'Any withdrawal', 'Settlement or withdrawal', 'Any 2 Wallet Admins; not the initiator']} />
      <Row cells={['Hot wallets', 'Threshold', 'Single send over the cap', <>1 Wallet Admin <Fast>· for speed</Fast></>]} />
      <Row cells={['Vaults · hot wallets', 'Velocity · %', 'Over the daily or balance cap', 'Deny']} />
      <Row cells={['Hot wallets', 'Initiator', 'Sent by an API token', 'Tighter caps than people']} />
      <Row cells={[<>ETH Hot Wallet <Fast>(opt.)</Fast></>, 'Destination', 'Contract not on the whitelist', <>Deny; over cap, 1 Wallet Admin <Fast>· for speed</Fast></>]} />
    </Table>
    <Takeaway lead="Rules lock 48 hours after creation." sub="Only BitGo support can loosen them, so no admin can quietly open a wallet." />
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

const AppendixDivider: Page = () => (
  <Tone.Provider value="dark">
    <main style={{ position: 'relative', width: '100%', height: '100%', boxSizing: 'border-box', padding: '0 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: bgBlue, color: '#ffffff', fontFamily: 'var(--osd-font-body)' }}>
      <div><Pill color="#ffffff">Backup material</Pill></div>
      <h1 style={{ fontSize: 140, fontWeight: 300, lineHeight: 1.1, margin: '32px 0', letterSpacing: -4 }}>Appendix</h1>
      <p style={{ fontSize: 36, lineHeight: 1.5, margin: 0, color: 'rgba(255,255,255,0.82)' }}>Wallets · roles · policies · keys · Go Account · liquidity · compliance · pricing</p>
      <div style={{ position: 'absolute', left: 140, bottom: 56, fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>bitgo.com</div>
    </main>
  </Tone.Provider>
);

const A = 'Appendix';

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
  </Frame>
);

const A3: Page = () => (
  <Frame eyebrow={A} title="A6 · BitGo permissions behind each role" subtitle="What each built-in permission allows, and which role on page 11 bundles it." source={walletUsers} sourceLabel="BitGo wallet users and roles">
    <Table heads={['Permission', 'Allows', 'Bundled into']} widths={[330, 760]}>
      <Row cells={['Organization Admin', 'Manage users and roles; approve user changes', 'Access Manager']} />
      <Row cells={['Organization View', 'View users, roles and user changes', 'Compliance Monitor']} />
      <Row cells={['Enterprise Admin', 'Create wallets, enterprise policies, bank accounts', 'Fund Approver']} />
      <Row cells={['Video ID', 'Video ID for withdrawals and policy unlocks', 'Fund Approver']} />
      <Row cells={['Wallet Admin', 'Whitelists, wallet policies, approvals, freeze', 'Fund Approver']} />
      <Row cells={['Wallet Spend', 'Withdraw from wallets; new receive addresses', 'Treasury Operator · On-chain Trader']} />
      <Row cells={['Trader', 'Buy and sell on the Go Account', 'Trader']} />
      <Row cells={['DeFi', 'Connect BitGo-integrated DeFi apps to wallets', 'On-chain Trader (opt.)']} />
      <Row cells={['Auditor', 'Audit logs across enterprises, wallets, users', 'Compliance Monitor']} />
      <Row cells={['Wallet View', 'View balances and transactions', 'Treasury Operator · Trader · Read Only']} />
      <Row cells={['Billing', 'View and pay BitGo invoices', 'Billing']} />
    </Table>
  </Frame>
);

const A4: Page = () => (
  <Frame eyebrow={A} title="A7 · The policy toolkit" subtitle="A rule is a condition plus an action, scoped to one wallet or the whole enterprise." source={policies} sourceLabel="BitGo policies overview">
    <Table heads={['Condition', 'Triggers on', 'Used in this proposal']} widths={[400, 560]}>
      <Row cells={['Destination (whitelist)', 'Address not on the approved list', 'Vaults to own wallets; hot wallets to venues']} />
      <Row cells={['Threshold', 'Size of a single withdrawal', 'Large hot-wallet sends and on-chain trades']} />
      <Row cells={['Velocity limit', 'Total withdrawn in a time window', 'Daily caps on vaults and hot wallets']} />
      <Row cells={['% of wallet balance', 'Share of the balance leaving', 'Stops a hot wallet being drained at once']} />
      <Row cells={['Initiator', 'Who or which API token started it', 'Stricter limits for API tokens than people']} />
      <Row cells={['Webhook', 'Response from the fund’s own system', 'Optional: the fund’s risk engine decides']} />
    </Table>
    <Note>Actions: deny, require N approvals, or video ID above $250k a day. Rules lock 48h after creation.</Note>
    <Note>Custody adds BitGo’s own rules. User + backup key recovery bypasses all policy: guard the backup key.</Note>
  </Frame>
);

const A5: Page = () => (
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" title="A8 · Keys and recovery for the hot wallets" subtitle="Self-custody moves key responsibility to the fund. This is how to carry it.">
    <Table heads={['Key', 'Held by', 'Stored', 'Used for']} widths={[220, 200, 780]}>
      <Row cells={['User key', 'Fund', 'Encrypted by passphrase; passphrase in KMS or HSM', 'Daily signing through the SDK']} />
      <Row cells={['Backup key', 'Fund', 'Offline, split between two officers, separate site', 'Recovery only']} />
      <Row cells={['BitGo key', 'BitGo', 'BitGo HSMs', 'Co-signs after policy passes']} />
    </Table>
    <Note>User + backup keys recover funds without BitGo and bypass its policy: guard the backup key like a vault.</Note>
    <Note>API access tokens: spending limits, IP allowlist, short lifetimes, one token per service.</Note>
  </Frame>
);

const GoAccount: Page = () => (
  <Frame eyebrow={A} source={protocols} sourceLabel="BitGo supported assets" source2={goNetworkDocs} sourceLabel2="Go Network overview" title="A9 · The Go Account: one omnibus account for trading" subtitle="The Trade tier: one custody account for every asset BitGo supports, plus the Go Network.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 500, color: muted, marginBottom: 8 }}>The account</div>
        <Table heads={[]} widths={[230]}>
          <Row cells={['Omnibus', 'Many assets in one account, incl. fiat']} />
          <Row cells={['Coverage', '97 chains and 2,831 tokens']} />
          <Row cells={['Fiat', 'Deposit or withdraw USD directly']} />
          <Row cells={['Ledger', 'Off-chain; Go Account moves are instant']} />
          <Row cells={['Keys', 'One key held by BitGo, not three']} />
          <Row cells={['Setup', 'One per enterprise, with a wallet ID']} />
          <Row cells={['Deposits', 'Available within minutes']} />
          <Row cells={['Withdrawals', 'On-chain within hours; 24h SLA']} />
        </Table>
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 500, color: muted, marginBottom: 20 }}>Go Network services it unlocks</div>
        <Block title="Off-exchange settlement">Allocate to partner venues; assets stay in custody</Block>
        <Block title="Settlements">Multi-asset, off-chain, between Go Accounts</Block>
        <Block title="Counterparties">Directory of Go Accounts; add your partners</Block>
        <Block title="Trades">Place and cancel trade orders from the account</Block>
      </div>
    </div>
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
  <Frame eyebrow={A} source={walletTypes} sourceLabel="BitGo wallet types" source2={insurance} sourceLabel2="BitGo insurance" title="A11 · If the fund asks for more" subtitle="Each need maps to an existing BitGo capability, so the design grows without a rebuild.">
    <Table heads={['Further need', 'Answer', 'Impact on the design']} widths={[430, 640]}>
      <Row cells={['Yield on idle ETH', 'Staking from custody wallets', 'None: stake from the ETH vault']} />
      <Row cells={['More assets or chains', 'Add a wallet per new chain in each tier', 'Same roles and policy templates']} />
      <Row cells={['Second custodian model', 'Self-custody cold wallet (an optional 7th)', 'Adds offline key ceremony']} />
      <Row cells={['Audit and NAV reporting', 'Wallet View and Auditor roles, webhooks', 'None: already provisioned']} />
      <Row cells={['Cover above $250M', 'Excess specie cover via BitGo’s broker', 'Commercial, not technical']} />
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

const Pricing: Page = () => (
  <Frame eyebrow={A} source={billing} sourceLabel="BitGo billing methodology" source2={custodyAgreement} sourceLabel2="Custodial services agreement" title="A14 · How BitGo charges" subtitle="Fees are negotiated per client; this is how the bill is built.">
    <Table heads={['Fee', 'How it is calculated', 'Notes']} widths={[300, 720]}>
      <Row cells={['Custody (AUC)', 'bps on the monthly average USD balance', 'Hourly snapshots; billed per asset']} />
      <Row cells={['Transactions', 'bps on outgoing volume, tiered by monthly volume', 'Moves between own wallets are free']} />
      <Row cells={['Network fees', 'Gas and miner fees passed through', 'Paid in the asset moved']} />
      <Row cells={['Settlement', 'Go Network settlement fees, per contract', 'Off-chain moves need no gas']} />
      <Row cells={['Self-custody', 'No AUC fee under BitGo’s published method', 'May change; contract governs']} />
      <Row cells={['Minimum', 'Monthly minimum across all fees', 'Set per contract']} />
    </Table>
    <Note>For a $300M book expect custom tiered bps; the Billing role views and pays invoices.</Note>
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
  'Set expectations: ten minutes, and we start with them, not with BitGo. Invite interruptions; the appendix holds the detail for any deep question.', // 2 Agenda
  'Play back what they told us before pitching anything. Say it out loud: ask them to correct anything that is off. The design depends on these goals, so get a yes or a correction here.', // 3 What we heard
  'Frame as patterns we see, not a critique of their setup. Each place their assets sit today gives up something: exchanges give up safety, own wallets give up ease, and the spread gives up control. Land the last line as the bridge.', // 4 Problem
  'These six checkpoints are the contract for the rest of the talk: 1 to 4 come from the three goals, 5 and 6 from the two must-haves. They are requirements, not our product; ask if they would add or change any.', // 5 Criteria
  'Walk the tiers top to bottom and read each one\'s checkpoint pills: reserve covers 1 and 6, the Go Account 2 and 5, hot wallets 4, and the shared roles 3. Every checkpoint lands on exactly one tier. Percentages are a starting point to tune.', // 6 Answer
  'Option B, only if it fits how they use ETH: if ETH, like stablecoins, will also refill the ETH hot wallet (or go to DeFi), one ETH-chain vault replaces two. Same tiers, five wallets. Default stays Option A: separate vaults for different approvers, limits and cadence.', // 6b Option B
  'Walk the diagram left to right; each line says how fast it is. Leaving a vault is the slow step on purpose: two Admin approvals, BitGo signs within its 24h SLA, and video ID above $250k a day. After that it is fast: on Go Network the fund trades against partner venues while assets stay in BitGo custody and settle net, so nothing moves on-chain; hot wallets reach other venues by API in minutes.', // 7 Capital flow
  'Before assigning anyone permissions, meet the people. The CEO runs the firm and oversees both sides. Front office is the CIO’s team: portfolio managers run capital, analysts research without taking risk, quants build models. Middle office is the CRO, who sets risk limits and is one of the three approvers. Back office is the COO’s team, which runs day-to-day operations: treasury operations move cash and settle, compliance watches the rules, and an independent fund administrator calculates NAV. The CTO runs the systems and manages user access. The risk and IT teams are real, but in this proposal they get no BitGo access of their own: the CRO and CTO act for them, which keeps the role design small. Keep this split in mind: the front office decides and trades, the middle office limits, the back office moves and records. The next pages turn exactly that separation into BitGo permissions.', // 8a Org chart
  'Walk left to right in the order money moves. In every movement column there is an outline chip (who starts) and a solid chip (who approves), never the same person. Sweep back here is Go Account to vault, a withdrawal that needs approval; funds coming back from other venues are withdrawn on the exchange, and deposits into a vault need no approval. Oversight: Admins set policy and can freeze a wallet (freeze sits inside Wallet Admin); Compliance holds Auditor and reads every log. Column 7 is optional, only if the fund trades on-chain (see Option B). For DeFi apps BitGo integrates, give PMs the DeFi role. For any other Dapp the trade is a transaction from the wallet, so it needs Wallet Spend and a whitelisted contract address. Either way, cap it per trade, per day and as a share of the wallet. Be upfront: under the cap those trades run on policy alone, so they are not two-person; exposure stays bounded because hot wallets hold about 5% and the caps hold. Over the cap an Admin approves.', // 9b Who acts
  'Turn the previous page into what the fund actually configures in BitGo. Start with the three rules, then show that the roles simply apply them. Rule 1: Treasury Operator starts, Fund Approver approves, never the same person. Rule 2: each role bundles only what the job needs; the investment side trades but never withdraws, and the CTO, fund admin, quants and analysts only view. Rule 3: Compliance Monitor audits every log and every role change; freezing sits inside Wallet Admin, so the approvers freeze on Compliance’s call. Why roles: onboarding and offboarding become one step, every holder changes together when a role changes, and audit shows role membership. People can hold several roles: the COO is Fund Approver, Access Manager and Billing; the CTO is Access Manager and Read Only. Details: Treasury’s API token carries Treasury Operator and is used on hot wallets; vault view is optional for PMs; On-chain Trader is optional, DeFi for BitGo-integrated apps and Wallet Spend on the ETH Hot Wallet for others. Treasury operations is 2 to 3 people so leave never blocks a transfer. Policies select a permission, not a custom role: vault withdrawals need any two Wallet Admins, and only Fund Approver bundles Wallet Admin, so that means two of CEO, COO and CRO. Never add Wallet Admin to another role.', // 9 Roles (merged)
  'With roles in place, these are the rules. Approval steps select the Wallet Admin permission, and only the Fund Approver role holds it, so approvers are always CEO, COO or CRO. Vaults and the Go Account need any two approvers, and the initiator can never approve their own request. Hot wallets need just one Wallet Admin over the cap. That is a deliberate choice for speed: they hold about 5% of assets, sends are capped per trade, per day and as a share of the balance, and they only go to whitelisted addresses. API tokens get tighter caps than people. The last row applies only if the fund trades on-chain. Optional extra: a webhook rule can ask the fund’s own risk engine to approve or reject each send. Close on the lock: once created, rules lock after 48 hours and only BitGo support can loosen them.', // 8c Policies
  'Make it concrete: even an executive with a stolen laptop cannot empty a vault. Each of the four checks is independent, and policies lock after 48 hours so an insider cannot quietly loosen them.', // 9 Withdrawal
  'Read across each numbered row: the cross on the left becomes the tick on the right. Keep "typical today" neutral. Land the takeaway, then move straight to next steps.', // 10 Scorecard
  'Make the ask. Four steps, test before moving size. Why reserve first: it is about 85% of assets and today sits on venues with counterparty risk and no custody cover, so moving it first takes the biggest risk off the table early; trading capital stays on its venues until the Go Account and hot wallets are proven, so the desk is not disrupted; and deposits into a vault need no approvals or video ID, only withdrawals do. Why decide approvers now: the any-two-of-three rule needs named Admins, and policies lock 48 hours after Build, after which only BitGo support can change them; approvals gate the 24h withdrawal SLA, so approvers spread across time zones keep withdrawals moving around the clock; each approver needs KYC, 2FA and video ID set up during Onboard; and approvers must be different people from Treasury, who initiate. Close by proposing a working session with ops and compliance to settle the three decisions this week.', // 11 Next steps
  undefined, // Appendix divider
  undefined, // A1 Types
  undefined, // A2 Custody wallets
  undefined, // A3 Self-custody wallets
  undefined, // A4 Multisig vs MPC
  'Use if they answer "DeFi" to the ETH question on the next-steps slide.', // A5 Six or five
  'Reference for page 11. Use it when someone asks what a role can actually do. Two design rules to repeat: Wallet Admin sits only in Fund Approver, because approval steps select that permission; and freezing is part of Wallet Admin, so Compliance audits and the approvers freeze.', // A6 Permissions
  'Map each condition to where it bites in this design: whitelists on every tier (hot wallets also to whitelisted contracts if they trade on-chain), thresholds behind the Over cap step on page 9, daily velocity caps, a percent-of-balance cap on hot wallets, stricter rules for API tokens. Locked rules can only be loosened through BitGo support, so a compromised admin cannot open a wallet.', // A7 Policy toolkit
  undefined, // A8 Keys
  'Use when they ask what the Go Account is. Omnibus here means one custody account that holds many assets, including fiat, instead of one wallet per coin. It covers every asset BitGo supports: 97 chains and 2,831 tokens on BitGo’s protocol list (the token count changes as BitGo adds assets), and USD can be deposited or withdrawn directly. It runs on BitGo’s off-chain ledger with a single key held in custody, one per enterprise, and behaves like any other wallet in the API. Deposits land within minutes; on-chain withdrawals usually finish within hours, inside the 24-hour custody SLA. The right side is why it sits in the Trade tier: it is the entry point to Go Network, with off-exchange settlement (allocate assets to partner venues and trade there while they stay in custody), multi-asset off-chain settlements between Go Accounts, a directory of counterparties, and trade orders. If engineers mention trading wallets or trading accounts in the API or SDK, those are the old names for the Go Account.', // A9 Go Account
  undefined, // A10 Liquidity
  undefined, // A11 Further needs
  'Use when compliance comes up (their US must-have on page 3). OCC charter: conversion from the South Dakota trust approved Dec 2025. Insurance covers only assets where BitGo holds all keys, not the self-custody hot wallets.', // A12 Licenses
  'Pair with A12. TRP was co-developed with ING and Standard Chartered. BitGo reports zero internal asset losses in over a decade; say it as their claim, not ours.', // A13 Security and compliance
  'Use when they ask about cost. Pricing is quoted after discovery, per client. The custody (AUC) fee usually dominates, so the vault share drives cost, and the bill moves with prices because AUC is measured in USD. Internal moves such as vault refills and sweeps are not charged transaction fees. BitGo custody accounts typically start from $1M, well below this fund. Do not quote basis points without the deal desk.', // A14 Pricing
];

export default [Cover, Agenda, Heard, Problem, Criteria, Answer, OptionB, CapitalFlow, OrgChart, WhoActs, RoleDesign, PolicySet, Withdrawal, Scorecard, NextSteps, AppendixDivider, Types, A1Custody, A1Self, A2, ArchitectureAlt, A3, A4, A5, GoAccount, A6, A7, A12, A13, Pricing] satisfies Page[];
