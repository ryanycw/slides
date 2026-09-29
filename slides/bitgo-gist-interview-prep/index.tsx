import { createContext, useContext } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

// Visual system: themes/electric-blue.md. Components below are copied from it.

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap';
const FONT_LINK_ID = 'osd-webfont-bitgo-gist-interview-prep';
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

const addWebhookRef = 'https://developers.bitgo.com/reference/v2walletaddwebhook';
const webhooksDoc = 'https://developers.bitgo.com/docs/webhooks-wallet';
const createWalletsDoc = 'https://developers.bitgo.com/docs/wallets-create-wallets';

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

// Left mark is the deck's purpose rather than bitgo.com: this is interview prep, not a BitGo pitch.
const Footer = ({ source, sourceLabel }: FooterProps) => {
  const { current, total } = useSlidePageNumber();
  const t = useTone();
  return (
    <footer style={{ marginTop: 'auto', flexShrink: 0, paddingTop: 14, fontSize: 22, color: t.sub, display: 'flex', justifyContent: 'space-between' }}>
      <span>Gist walkthrough · interview prep{source && <> · Source: <a href={source} style={{ color: t.hi }}>{sourceLabel}</a></>}</span>
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

const Pill = ({ children }: { children: ReactNode }) => {
  const t = useTone();
  return <span style={{ display: 'inline-block', fontSize: 20, fontWeight: 500, lineHeight: 1.2, color: t.hi, border: `1.5px solid ${t.hi}`, borderRadius: 999, padding: '6px 16px' }}>{children}</span>;
};

// dense: tighter rows for the 11-row field walkthrough.
const Row = ({ cells, dense }: { cells: ReactNode[]; dense?: boolean }) => {
  const t = useTone();
  const td: CSSProperties = { padding: dense ? '10px 24px 10px 0' : '13px 24px 13px 0', borderBottom: `1px solid ${t.line}`, verticalAlign: 'top', fontSize: 26, lineHeight: 1.35 };
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

// Every Q&A page uses the same two columns: likely question, one-line answer.
const QA = ({ children }: { children: ReactNode }) => <Table heads={['Likely question', 'Answer']} widths={[760]}>{children}</Table>;

const Note = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 24, marginTop: 36 }}>
    <span style={{ width: 4, flexShrink: 0, borderRadius: 2, background: accentBar }} />
    <p style={{ fontSize: 28, lineHeight: 1.45, margin: 0 }}>{children}</p>
  </div>
);

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

const Cover: Page = () => (
  <Tone.Provider value="dark">
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '80px 140px 56px', display: 'flex', flexDirection: 'column', background: bgBlue, color: '#ffffff', fontFamily: 'var(--osd-font-body)' }}>
      <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: -0.5 }}>BitGo API Challenge</span>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h1 style={{ fontSize: 124, fontWeight: 300, lineHeight: 1.08, margin: '0 0 40px', letterSpacing: -4, fontFamily: 'var(--osd-font-display)' }}>
          Gist walkthrough<br />
          <span style={{ color: skyBlue }}>Likely questions</span>
        </h1>
        <p style={{ fontSize: 36, color: 'rgba(255,255,255,0.82)', margin: 0 }}>One page per Gist file, 01–07, with a one-line answer each.</p>
      </div>
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>Interview prep</div>
    </main>
  </Tone.Provider>
);

const CreateWallet: Page = () => (
  <Frame eyebrow="01 · create-wallet.mjs" title="Creating the wallet: why this design" subtitle="Wallet type, the two secrets, and what the access token does.">
    <QA>
      <Row cells={['Why MPC (TSS) instead of multisig?', 'A plain EOA on-chain: less gas, no contract, looks single-sig']} />
      <Row cells={['passphrase vs passcodeEncryptionCode?', 'First encrypts the User Key; second backs up the passphrase']} />
      <Row cells={['What does self-custody mean here?', 'I hold the User Key; BitGo alone can’t move funds']} />
      <Row cells={['Hot vs cold wallet?', 'Hot: code signs online. Cold: keys offline, manual signing']} />
      <Row cells={['What can the access token do?', 'Authenticates only, can’t sign; limit scope, amount and IP']} />
    </QA>
  </Frame>
);

const WalletResponse: Page = () => (
  <Frame eyebrow="02 · Wallet creation response" title="What’s in the response, and why redact" subtitle="Which fields are secret and which are safe to share.">
    <QA>
      <Row cells={['Why redact some fields?', 'If encryptedPrv leaks, only the passphrase protects it']} />
      <Row cells={['Why keep commonKeychain?', 'It’s public-key data, so sharing it carries no risk']} />
      <Row cells={['What do m: 2, n: 3 mean?', 'Three key shares; any two can sign']} />
      <Row cells={['baseAddress and the other addresses?', 'baseAddress is the main address; check the rest first']} />
      <Row cells={['What is MPCv2?', 'BitGo’s second-gen ECDSA MPC, with fewer signing rounds']} />
    </QA>
  </Frame>
);

const WalletFields: Page = () => (
  <Frame eyebrow="02 · Wallet creation response, field by field" title="Walking through the wallet JSON" subtitle="The fields worth explaining in the redacted Gist file, top to bottom.">
    <Table heads={['Field', 'Value', 'What it tells you']} widths={[520, 400]}>
      <Row dense cells={['type · isCold', 'hot · false', 'Self-custody hot wallet; code signs online']} />
      <Row dense cells={['multisigType · walletVersion', 'tss · 5', 'MPCv2 wallet; version 5 is required for ECDSA TSS']} />
      <Row dense cells={['m · n', '2 · 3', 'Three key shares; any two can sign']} />
      <Row dense cells={['keys', '3 keychain IDs', 'User, backup and BitGo keychains, in that order']} />
      <Row dense cells={['commonKeychain', 'Same in all three', 'One shared public key; no full private key exists']} />
      <Row dense cells={['encryptedPrv', 'Redacted', 'User and backup shares, encrypted with the passphrase']} />
      <Row dense cells={['encryptedWalletPassphrase', 'Redacted', 'Passphrase backup, encrypted with passcodeEncryptionCode']} />
      <Row dense cells={['bitgoKeychain', 'isBitGo: true', 'BitGo’s share stays with BitGo; no private data returned']} />
      <Row dense cells={['baseAddress · receiveAddress', '0x0217…e248', 'Same EOA; the faucet sent ETH here']} />
      <Row dense cells={['policy.rules · approvalsRequired', '[] · 1', 'No policies yet; prod adds whitelist and limits']} />
      <Row dense cells={['*BalanceString', '"0"', 'Brand new; funded from the faucet afterwards']} />
    </Table>
  </Frame>
);

const WebhookConfig: Page = () => (
  <Frame tone="dark" eyebrow="03 · Webhook configuration" title="Webhooks: reliability and security" subtitle="Be honest about what numConfirmations actually did." source={addWebhookRef} sourceLabel="Add wallet webhook">
    <QA>
      <Row cells={['Webhooks vs polling?', 'Real-time, fewer calls; but can be late, repeated, out of order']} />
      <Row cells={['What does numConfirmations: 0 mean?', 'Notify when first seen, then again once confirmed']} />
      <Row cells={['Did you get an unconfirmed one?', 'No, only confirmed; Hoodi blocks came too fast']} />
      <Row cells={['How to secure the endpoint in prod?', 'HTTPS, re-check via API, dedupe by transfer ID, IP allowlist']} />
      <Row cells={['Why several webhooks registered?', 'The ngrok URL changed; old configs should be removed']} />
    </QA>
  </Frame>
);

const InboundWebhook: Page = () => (
  <Frame eyebrow="04–05 · Incoming transfer webhook" title="Reading a deposit notification" subtitle="1.89375 ETH from the faucet into the Part 1 wallet." source={webhooksDoc} sourceLabel="Wallet webhooks">
    <QA>
      <Row cells={['value vs baseValue?', 'Equal here, the sender paid gas; check the definitions']} />
      <Row cells={['Why a separate valueString?', 'Wei exceeds JS number precision; a string keeps it exact']} />
      <Row cells={['What does initiator: external mean?', 'Not started from my BitGo account; the faucet sent it']} />
      <Row cells={['Credit funds as soon as it arrives?', 'No, look up the transfer ID through the API first']} />
    </QA>
    <Note>systemNotes says it too: don’t rely on the webhook alone for final state.</Note>
  </Frame>
);

const TransferOutput: Page = () => (
  <Frame eyebrow="06 · Transfer output" title="States and fields in the transfer output" subtitle="This JSON was saved right after signing and broadcast.">
    <QA>
      <Row cells={['Why only 0.01 ETH?', 'MPC wallets pay their own gas, so stay under spendable']} />
      <Row cells={['transfer signed, txRequest delivered?', 'Saved right after broadcast; confirmed comes later']} />
      <Row cells={['What is height: 999999999?', 'A placeholder: not on-chain yet']} />
      <Row cells={['feeString is 0 but feeInfo has a value?', 'Real fee unknown until mined; feeInfo is an estimate']} />
      <Row cells={['What does policiesChecked: true mean?', 'Whitelist, limit and approval policies ran before sending']} />
      <Row cells={['Why is signatureShares empty?', 'MPC intermediate data isn’t kept; only signedTx is']} />
    </QA>
  </Frame>
);

const Signing: Page = () => (
  <Frame tone="dark" eyebrow="07 · Signing" title="Signing and keys: expect deep dives" subtitle="User Key and BitGo Key co-sign; the Backup Key is for recovery.">
    <QA>
      <Row cells={['Is the full private key ever assembled?', 'No. That’s the difference between TSS and a split key']} />
      <Row cells={['If BitGo disappears, how do you recover?', 'User Key + Backup Key with BitGo’s recovery tool']} />
      <Row cells={['What if the User Key leaks?', 'BitGo co-signing and policies still apply; move funds']} />
      <Row cells={['What if the access token leaks?', 'No signing without the passphrase, but it can read and edit']} />
      <Row cells={['What are OTP and unlock for?', 'Unlock the session for sensitive actions; 000000 in test']} />
    </QA>
  </Frame>
);

const Extensions: Page = () => (
  <Frame eyebrow="Follow-ups" title="From testnet to production" subtitle="These usually lead into the hedge-fund proposal." source={createWalletsDoc} sourceLabel="Create wallets">
    <QA>
      <Row cells={['How would you harden this for prod?', 'Address whitelist, per-tx and daily limits, multi-approval']} />
      <Row cells={['How would you tier the assets?', 'Long-term in custodial cold; operating funds in hot']} />
      <Row cells={['Can you create a self-custody cold wallet by API?', 'Yes: make keys offline, upload public keys, then Add Wallet']} />
      <Row cells={['How is a self-custody cold wallet signed?', 'Offline Vault Console on an air-gapped machine; BitGo co-signs']} />
      <Row cells={['What changes to support USDC?', 'Token name and receive setup; check exact parameters']} />
    </QA>
    <Takeaway lead="Tie it back: safety, speed and access control" sub="Every testnet setting maps to a need in the hedge-fund case." />
  </Frame>
);

const ToVerify: Page = () => (
  <Frame tone="dark" eyebrow="Before the interview" title="Check these three in the docs" subtitle="These answers aren’t backed by documentation yet.">
    <Grid cols={3}>
      <Card tag="04–05" title="value vs baseValue"><div>The official definitions</div></Card>
      <Card tag="03" title="Webhook signatures"><div>Does BitGo sign webhooks?</div></Card>
      <Card tag="Follow-ups" title="ERC-20 transfers"><div>Exact USDC parameters</div></Card>
    </Grid>
    <Takeaway lead="If unsure, say so, and explain how you’d check" />
  </Frame>
);

export const meta: SlideMeta = {
  title: 'BitGo Gist interview prep',
  createdAt: '2026-09-29T09:06:58.812Z',
  theme: 'electric-blue',
};
export default [Cover, CreateWallet, WalletResponse, WalletFields, WebhookConfig, InboundWebhook, TransferOutput, Signing, Extensions, ToVerify] satisfies Page[];
