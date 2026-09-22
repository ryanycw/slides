import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import architectureImg from './assets/wallet-architecture.png';
import capitalFlowImg from './assets/capital-flow.png';
import withdrawalImg from './assets/vault-withdrawal.png';

export const design: DesignSystem = {
  palette: { bg: '#f6f8fb', text: '#132c47', accent: '#007c83' },
  fonts: { display: 'Arial, sans-serif', body: 'Arial, sans-serif' },
  typeScale: { hero: 58, body: 30 },
  radius: 10,
};
const muted = '#526578';
const rule = '#cbd8e2';
const walletTypes = 'https://developers.bitgo.com/docs/wallet-types';
const policies = 'https://developers.bitgo.com/docs/policies-overview';
const goNetwork = 'https://www.bitgo.com/products/go-network-oes/';
const walletUsers = 'https://developers.bitgo.com/guides/wallets/users/add';

const Footer = ({ source, sourceLabel }: { source: string; sourceLabel: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer style={{ marginTop: 'auto', flexShrink: 0, borderTop: `1px solid ${rule}`, paddingTop: 14, fontSize: 22, color: muted, display: 'flex', justifyContent: 'space-between' }}>
      <span>Allocations are illustrative · Source: <a href={source} style={{ color: 'var(--osd-accent)' }}>{sourceLabel}</a></span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
  );
};

const Frame = ({ eyebrow = 'BITGO · HEDGE FUND PROPOSAL', title, subtitle, children, source = walletTypes, sourceLabel = 'BitGo wallet types' }: { eyebrow?: string; title: string; subtitle: string; children: ReactNode; source?: string; sourceLabel?: string }) => (
  <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '80px 100px 56px', display: 'flex', flexDirection: 'column', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ fontSize: 23, letterSpacing: 3, color: 'var(--osd-accent)', fontWeight: 700, marginBottom: 16 }}>{eyebrow}</div>
    <h1 style={{ fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)', lineHeight: 1.15, margin: 0, letterSpacing: -1.5 }}>{title}</h1>
    <p style={{ fontSize: 30, lineHeight: 1.4, color: muted, margin: '16px 0 28px' }}>{subtitle}</p>
    <section style={{ flexShrink: 0 }}>{children}</section>
    <Footer source={source} sourceLabel={sourceLabel} />
  </main>
);

const td: CSSProperties = { padding: '12px 24px 12px 0', borderBottom: `1px solid ${rule}`, verticalAlign: 'top', fontSize: 28, lineHeight: 1.35 };
const Row = ({ cells }: { cells: ReactNode[] }) => (
  <tr>
    <th scope="row" style={{ ...td, textAlign: 'left', fontWeight: 700 }}>{cells[0]}</th>
    {cells.slice(1).map((c, i) => <td key={i} style={td}>{c}</td>)}
  </tr>
);
const Table = ({ heads, widths, children }: { heads: string[]; widths: number[]; children: ReactNode }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
    <colgroup>{widths.map((w, i) => <col key={i} style={{ width: w }} />)}<col /></colgroup>
    <thead><tr style={{ fontSize: 22, color: muted, textAlign: 'left', letterSpacing: 1 }}>{heads.map((h) => <th key={h} style={{ paddingBottom: 10 }}>{h}</th>)}</tr></thead>
    <tbody>{children}</tbody>
  </table>
);
const Note = ({ children }: { children: ReactNode }) => <p style={{ fontSize: 28, lineHeight: 1.45, borderLeft: '4px solid var(--osd-accent)', paddingLeft: 24, margin: '24px 0 0' }}>{children}</p>;
const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <div style={{ marginBottom: 26 }}>
    <h2 style={{ fontSize: 32, lineHeight: 1.2, color: 'var(--osd-accent)', margin: '0 0 8px' }}>{title}</h2>
    <div style={{ fontSize: 28, lineHeight: 1.45 }}>{children}</div>
  </div>
);
const Diagram = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
  <img src={src} alt={alt} style={{ width, height, flexShrink: 0, border: `1px solid ${rule}`, borderRadius: 'var(--osd-radius)', background: '#fff' }} />
);
const Split = ({ children }: { children: ReactNode }) => <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>{children}</div>;
const B = ({ children }: { children: ReactNode }) => <strong style={{ color: 'var(--osd-accent)' }}>{children}</strong>;

const Cover: Page = () => (
  <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '0 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ fontSize: 26, letterSpacing: 4, color: 'var(--osd-accent)', fontWeight: 700 }}>BITGO · CUSTODY AND LIQUIDITY PROPOSAL</div>
    <h1 style={{ fontSize: 112, lineHeight: 1.08, margin: '36px 0', letterSpacing: -3, fontFamily: 'var(--osd-font-display)' }}>Custody architecture for a $300M digital-asset fund</h1>
    <p style={{ fontSize: 38, lineHeight: 1.45, color: muted, margin: 0, maxWidth: 1400 }}>Six wallets in three tiers: insured storage, fast venue access, and role-based control on every wallet.</p>
  </main>
);

const Needs: Page = () => (
  <Frame title="Three needs, three tiers" subtitle="New York hedge fund · $300M in BTC, ETH and stablecoins · moving off exchanges onto BitGo.">
    <Table heads={['THE FUND WANTS', 'BITGO ANSWER', 'WHY IT FITS']} widths={[540, 500]}>
      <Row cells={['Insured, safe long-term storage', <B>Tier 1 · Custody cold vaults</B>, 'Qualified custodian, keys offline, insured']} />
      <Row cells={['Fast capital deployment to venues', <B>Tier 2 · Go Account + Go Network</B>, 'Trade on exchanges while assets stay in custody']} />
      <Row cells={['Self-custody, reach to any venue', <B>Tier 3 · Self-custody hot wallets</B>, 'Fund holds the keys; API sends in minutes']} />
      <Row cells={['Role-based access on each wallet', <B>All tiers · Roles + policy rules</B>, 'Per-wallet roles, whitelists, limits, approvals']} />
    </Table>
    <Note>Roughly 85% of assets sit in tier 1, 10% in tier 2 and 5% in tier 3, so speed never costs more than a small exposure.</Note>
  </Frame>
);

const Types: Page = () => (
  <Frame title="Which wallet types: three of them" subtitle="Each type trades speed for protection differently, so each tier gets the type that matches its job.">
    <Table heads={['TYPE', 'WHO HOLDS THE KEYS', 'SPEED OUT', 'JOB IN THIS DESIGN']} widths={[290, 500, 460]}>
      <Row cells={['Custody cold', 'BitGo holds all three, offline', 'Within 24h SLA, after video ID', 'Stores ~85%; slow on purpose']} />
      <Row cells={['Go Account', 'BitGo custody, off-chain ledger', 'Instant in-network', 'Trading float ~10%; holds USD too']} />
      <Row cells={['Self-custody hot', 'Fund holds 2 keys, BitGo holds 1', 'Minutes, signed by API', 'Working capital ~5%, any venue']} />
    </Table>
    <Note>BTC wallets use multisig; ETH wallets use MPC (one signature, lower gas).</Note>
  </Frame>
);

const Architecture: Page = () => (
  <Frame title="How many wallets: six" subtitle="BitGo wallets are per chain, so each tier gets one wallet per asset family.">
    <Split>
      <Diagram src={architectureImg} alt="Six wallets in three tiers, drawn with Archify" width={1100} height={621} />
      <div>
        <Block title="3 custody vaults · ~$255M">One each for BTC, ETH, stablecoins.</Block>
        <Block title="1 Go Account · ~$30M">Funded by vaults; trades off-chain.</Block>
        <Block title="2 hot wallets · ~$15M">BTC, and ETH with ERC-20 stablecoins.</Block>
        <Block title="Optional 7th">Self-custody cold, as a second model.</Block>
      </div>
    </Split>
  </Frame>
);

const CapitalFlow: Page = () => (
  <Frame title="How capital reaches venues quickly" subtitle="Leaving the vault is slow by design. Everything after it is fast." source={goNetwork} sourceLabel="Go Network off-exchange settlement">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Diagram src={capitalFlowImg} alt="Capital flow from vaults to venues and back, drawn with Archify" width={1160} height={531} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginTop: 26 }}>
      <Block title="Planned">Vault top-ups: scheduled, approved.</Block>
      <Block title="Instant">Go Network: nothing moves on-chain.</Block>
      <Block title="Minutes">Hot wallets send to venues by API.</Block>
    </div>
  </Frame>
);

const Who = ({ name, detail }: { name: string; detail: string }) => <>{name} <span style={{ fontWeight: 400, color: muted }}>· {detail}</span></>;

const Rbac: Page = () => (
  <Frame title="Role-based access: who can do what" subtitle="Roles are assigned per wallet. No one both initiates and approves, and traders never withdraw." source={walletUsers} sourceLabel="BitGo wallet users and roles">
    <Table heads={['PEOPLE', 'VAULTS (3)', 'GO ACCOUNT', 'HOT WALLETS (2)']} widths={[560, 390, 390]}>
      <Row cells={[<Who name="COO · CFO · CIO" detail="Enterprise Admins" />, 'Admin: approve, set policy', 'Admin: approve withdrawals', 'Admin: approve big sends']} />
      <Row cells={[<Who name="Treasury operations" detail="2–3 people" />, 'Spender: initiate only', 'Spender: initiate only', 'Spender + API token']} />
      <Row cells={[<Who name="Portfolio managers" detail="trading desk" />, 'Viewer', 'Trader: orders, allocations', 'Viewer']} />
      <Row cells={[<Who name="Compliance officer" detail="and auditor" />, 'Auditor + Freeze', 'Auditor + Freeze', 'Auditor + Freeze']} />
      <Row cells={[<Who name="Fund administrator" detail="NAV" />, 'Viewer', 'Viewer', 'Viewer']} />
    </Table>
    <Note>Three Admins, never one: any two can approve, so holidays and time zones do not stall the fund.</Note>
  </Frame>
);

const TierPolicies: Page = () => (
  <Frame title="Policy rules lock each tier down" subtitle="Roles say who may act. Policies say what any action may do, and BitGo enforces them before signing." source={policies} sourceLabel="BitGo policies overview">
    <Table heads={['TIER', 'WHERE FUNDS MAY GO', 'APPROVALS AND LIMITS']} widths={[230, 700]}>
      <Row cells={['Vaults', 'Only own Go Account and own hot wallets', '2 Admin approvals · video ID over $250k/day · daily cap']} />
      <Row cells={['Go Account', 'Partner venues; out only to own wallets and bank', 'Traders trade freely · Admin approves withdrawals']} />
      <Row cells={['Hot wallets', 'Only whitelisted venue deposit addresses', 'Small sends auto · large need Admin · daily and % caps']} />
    </Table>
    <Note>Policies lock 48h after creation; only BitGo support can loosen them, so a compromised admin cannot open a wallet.</Note>
  </Frame>
);

const Withdrawal: Page = () => (
  <Frame title="A vault withdrawal, step by step" subtitle="Four independent checks stand between a request and the blockchain." source={policies} sourceLabel="BitGo policies overview">
    <Split>
      <Diagram src={withdrawalImg} alt="Vault withdrawal approval workflow, drawn with Archify" width={1120} height={613} />
      <div>
        <Block title="1 · Role">Only a Spender can start it.</Block>
        <Block title="2 · Policy">Whitelist and limits, else denied.</Block>
        <Block title="3 · People">Two other Admins must approve.</Block>
        <Block title="4 · BitGo">Video ID, offline signing, webhook.</Block>
      </div>
    </Split>
  </Frame>
);

const Rollout: Page = () => (
  <Frame title="Rollout and open questions" subtitle="Migrate in tranches so no step puts the whole book at risk.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
      <div>
        <Block title="1 · Onboard">KYC, users, roles, 2FA, scoped API tokens.</Block>
        <Block title="2 · Build">Six wallets, whitelists, policies. Let them lock.</Block>
        <Block title="3 · Prove">Small test transfers on every path.</Block>
        <Block title="4 · Migrate">Move assets in tranches, vaults first.</Block>
      </div>
      <div style={{ borderLeft: `3px solid ${rule}`, paddingLeft: 40 }}>
        <Block title="Which venues?">Which exchanges, and are they Go partners?</Block>
        <Block title="Who approves?">How many approvers, in which time zones?</Block>
        <Block title="How much cover?">Is cover above the shared $250M needed?</Block>
        <Block title="What else?">Any DeFi, staking or lending plans?</Block>
      </div>
    </div>
  </Frame>
);

const AppendixDivider: Page = () => (
  <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '0 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--osd-text)', color: 'var(--osd-bg)', fontFamily: 'var(--osd-font-body)' }}>
    <div style={{ fontSize: 26, letterSpacing: 4, color: '#5fd0d6', fontWeight: 700 }}>BACKUP MATERIAL</div>
    <h1 style={{ fontSize: 120, lineHeight: 1.1, margin: '32px 0', letterSpacing: -3 }}>Appendix</h1>
    <p style={{ fontSize: 36, lineHeight: 1.5, margin: 0, color: '#c5d3df' }}>Wallet types · multisig vs MPC · roles · policies · keys · liquidity · further needs</p>
  </main>
);

const A = 'APPENDIX · PULL UP IF ASKED';

const A1Custody: Page = () => (
  <Frame eyebrow={A} title="A1 · Wallets where BitGo holds the keys" subtitle="Custody products: the fund initiates, BitGo Bank & Trust signs.">
    <Table heads={['WALLET', 'KEYS AND SIGNING', 'SPEED', 'BEST FOR']} widths={[330, 640, 310]}>
      <Row cells={['Custody multisig cold', 'All 3 keys in BitGo vaults; signed offline', 'Within 24h SLA', 'BTC, UTXO long-term holdings']} />
      <Row cells={['Custody MPC cold', 'Key shares in BitGo vaults; no full key', 'Within 24h SLA', 'ETH, account-based holdings']} />
      <Row cells={['Go Account', 'Omnibus custody, off-chain ledger, USD', 'Instant in-network', 'Trading and settlement']} />
      <Row cells={['Lightning', 'Single-sig hot, custody or self-custody', 'Seconds', 'BTC payments; not needed here']} />
    </Table>
    <Note>Custody wallets sign only in production; testnet withdrawals stay unsigned, so test integrations on self-custody wallets.</Note>
  </Frame>
);

const A1Self: Page = () => (
  <Frame eyebrow={A} title="A1 · Wallets where the fund holds the keys" subtitle="Self-custody: fund holds user + backup keys, BitGo holds the third and enforces policy.">
    <Table heads={['WALLET', 'HOW IT SIGNS', 'SPEED', 'BEST FOR']} widths={[330, 640, 310]}>
      <Row cells={['Multisig hot', 'SDK signs with user key, BitGo co-signs', 'Minutes', 'BTC working capital']} />
      <Row cells={['MPC hot', 'SDK share ceremony; one on-chain signature', 'Minutes', 'ETH, ERC-20 working capital']} />
      <Row cells={['Multisig cold', 'Sign offline in the OVC, BitGo co-signs', 'Hours, manual', 'Self-held reserves']} />
      <Row cells={['MPC cold', 'Offline signing with MPC key shares', 'Hours, manual', 'Self-held ETH-style reserves']} />
    </Table>
    <Note>Trade-off: control and speed, but no BitGo custody insurance, and key storage becomes the fund’s job.</Note>
  </Frame>
);

const A2: Page = () => (
  <Frame eyebrow={A} title="A2 · Multisig vs MPC" subtitle="Both are 2-of-3. The difference is where the threshold is enforced.">
    <Table heads={['', 'MULTISIG', 'MPC (TSS)']} widths={[360, 640]}>
      <Row cells={['Key material', 'Three independent private keys', 'Encrypted shares; a full key never exists']} />
      <Row cells={['Signing', 'On-chain, cosigners sign asynchronously', 'Off-chain, synchronous; one combined signature']} />
      <Row cells={['Transaction cost', 'Higher: several signatures', 'Lower: a single signature']} />
      <Row cells={['During signing', 'Fees and nonces can still change', 'Nothing in the transaction can change']} />
      <Row cells={['Natural fit', 'Bitcoin and UTXO chains', 'Ethereum and account-based chains']} />
    </Table>
  </Frame>
);

const A3: Page = () => (
  <Frame eyebrow={A} title="A3 · Roles and permissions compared" subtitle="Default roles cover most funds; custom roles combine permissions when they do not." source={walletUsers} sourceLabel="BitGo wallet users and roles">
    <Table heads={['ROLE / PERMISSION', 'SCOPE', 'CAN', 'CANNOT']} widths={[300, 220, 760]}>
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
  <Frame eyebrow={A} title="A4 · The policy toolkit" subtitle="A rule is a condition plus an action, scoped to one wallet or the whole enterprise." source={policies} sourceLabel="BitGo policies overview">
    <Table heads={['RULE TYPE', 'TRIGGERS ON', 'USED HERE FOR']} widths={[400, 600]}>
      <Row cells={['Destination (whitelist)', 'Address not on the approved list', 'Every tier: deny unknown addresses']} />
      <Row cells={['Threshold', 'Size of a single withdrawal', 'Hot wallets: large sends need an Admin']} />
      <Row cells={['Velocity limit', 'Total withdrawn in a time window', 'Daily caps on vaults and hot wallets']} />
      <Row cells={['% of wallet balance', 'Share of the balance leaving', 'Stops a hot wallet being drained']} />
      <Row cells={['Initiator', 'Who started the withdrawal', 'Tighter rules for API tokens']} />
      <Row cells={['Webhook', 'Response from the fund’s own system', 'Optional check with a risk engine']} />
    </Table>
    <Note>Actions: deny, require N approvals, or video ID. Rules lock after 48 hours; custody wallets add BitGo’s own rules.</Note>
  </Frame>
);

const A5: Page = () => (
  <Frame eyebrow={A} title="A5 · Keys and recovery for the hot wallets" subtitle="Self-custody moves key responsibility to the fund. This is how to carry it.">
    <Table heads={['KEY', 'HELD BY', 'STORED', 'USED FOR']} widths={[220, 200, 780]}>
      <Row cells={['User key', 'Fund', 'Encrypted by passphrase; passphrase in KMS or HSM', 'Daily signing through the SDK']} />
      <Row cells={['Backup key', 'Fund', 'Offline, split between two officers, separate site', 'Recovery only']} />
      <Row cells={['BitGo key', 'BitGo', 'BitGo HSMs', 'Co-signs after policy passes']} />
    </Table>
    <Note>User + backup keys recover funds without BitGo, and also bypass its policy: guard the backup key like a vault.</Note>
    <Note>API access tokens: spending limits, IP allowlist, short lifetimes, one token per service.</Note>
  </Frame>
);

const A6: Page = () => (
  <Frame eyebrow={A} title="A6 · Liquidity options from the Go Account" subtitle="All three settle through Go Network without assets leaving regulated custody." source={goNetwork} sourceLabel="Go Network off-exchange settlement">
    <Table heads={['OPTION', 'WHAT IT IS', 'USE WHEN']} widths={[380, 800]}>
      <Row cells={['Off-exchange settlement', 'Balance mirrored to a partner venue; settles off-chain', 'Keep venues, skip pre-funding']} />
      <Row cells={['BitGo Prime trading', 'One API to exchanges, market makers and OTC desks', 'Best execution over a set venue']} />
      <Row cells={['Financing and lending', 'Borrow against BTC, ETH or stablecoins in custody', 'Leverage or cash without selling']} />
    </Table>
    <Note>Partner coverage changes: check the fund’s venues against the current Go Network list before sizing tiers 2 and 3.</Note>
  </Frame>
);

const A7: Page = () => (
  <Frame eyebrow={A} title="A7 · If the fund asks for more" subtitle="Each need maps to an existing BitGo capability, so the design grows without a rebuild.">
    <Table heads={['FURTHER NEED', 'ANSWER', 'IMPACT ON THE DESIGN']} widths={[430, 640]}>
      <Row cells={['Yield on idle ETH', 'Staking from custody wallets', 'None: stake from the ETH vault']} />
      <Row cells={['More assets or chains', 'Add a wallet per new chain in each tier', 'Same roles and policy templates']} />
      <Row cells={['Second custodian model', 'Self-custody cold wallet (the optional 7th)', 'Adds offline key ceremony']} />
      <Row cells={['Audit and NAV reporting', 'Viewer and Auditor roles, reports, webhooks', 'None: already provisioned']} />
      <Row cells={['Cover above $250M', 'Additional insurance arranged through BitGo', 'Commercial, not technical']} />
      <Row cells={['Automated treasury', 'BitGo SDK + transfer webhooks', 'Extends hot-wallet tooling']} />
    </Table>
  </Frame>
);


// BitGo facts checked 2026-09-21 against developers.bitgo.com (wallet types, policies,
// wallet users) and bitgo.com (Go Network OES, Prime). Diagrams are Archify outputs;
// their JSON sources live in ./assets/archify/.
export const meta: SlideMeta = {
  title: 'BitGo proposal — $300M hedge fund custody architecture',
  createdAt: '2026-09-21T13:18:55.554Z',
};
export default [Cover, Needs, Types, Architecture, CapitalFlow, Rbac, TierPolicies, Withdrawal, Rollout, AppendixDivider, A1Custody, A1Self, A2, A3, A4, A5, A6, A7] satisfies Page[];
