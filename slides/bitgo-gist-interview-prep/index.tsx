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
  fonts: {
    display: "'Inter', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif",
    body: "'Inter', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif",
  },
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

// Every Q&A page uses the same two columns: likely question, one-line answer.
const QA = ({ children }: { children: ReactNode }) => <Table heads={['可能被問', '回答重點']} widths={[760]}>{children}</Table>;

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
          <span style={{ color: skyBlue }}>可能被問的問題</span>
        </h1>
        <p style={{ fontSize: 36, color: 'rgba(255,255,255,0.82)', margin: 0 }}>依 Gist 檔案 01–07 整理，每題一句回答重點。</p>
      </div>
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>Interview prep</div>
    </main>
  </Tone.Provider>
);

const CreateWallet: Page = () => (
  <Frame eyebrow="01 · create-wallet.mjs" title="建立錢包：為什麼這樣設計" subtitle="錢包類型、兩組密碼，以及 access token 的角色。">
    <QA>
      <Row cells={['為什麼選 MPC（TSS），不用 multisig？', '鏈上是普通 EOA：gas 低、不需合約、看不出多簽']} />
      <Row cells={['passphrase 和 passcodeEncryptionCode？', '前者加密 User Key；後者加密密碼備份，用來復原']} />
      <Row cells={['self-custody 是什麼意思？', 'User Key 在我手上，BitGo 單方面動不了資金']} />
      <Row cells={['hot 和 cold wallet 差在哪？', 'hot 由程式線上簽名；cold 金鑰離線、人工簽名']} />
      <Row cells={['access token 能做什麼？', '只認證身分、不能簽名；可限權限、限額、IP']} />
    </QA>
  </Frame>
);

const WalletResponse: Page = () => (
  <Frame eyebrow="02 · 錢包建立回應" title="回應裡有什麼，為什麼要 redact" subtitle="哪些欄位是秘密，哪些可以公開。">
    <QA>
      <Row cells={['為什麼 redact 部分欄位？', 'encryptedPrv 外洩後，只剩密碼強度在保護']} />
      <Row cells={['commonKeychain 為什麼保留？', '它是公鑰資訊，公開沒有風險']} />
      <Row cells={['m: 2, n: 3 代表什麼？', '3 把 key 分片，任 2 把就能簽名']} />
      <Row cells={['baseAddress 和其他地址欄位？', 'baseAddress 是錢包主地址；其餘面試前先查']} />
      <Row cells={['MPCv2 是什麼？', 'BitGo 第二代 ECDSA MPC，簽名回合更少']} />
    </QA>
  </Frame>
);

const WebhookConfig: Page = () => (
  <Frame tone="dark" eyebrow="03 · webhook 設定" title="Webhook：可靠性與安全" subtitle="numConfirmations 那題要老實講實際結果。" source={addWebhookRef} sourceLabel="Add wallet webhook">
    <QA>
      <Row cells={['webhook 和 polling 比起來？', '即時、省 API 呼叫；但可能延遲、重送、亂序']} />
      <Row cells={['numConfirmations: 0 是什麼意思？', '首次看到通知一次，確認後再通知一次']} />
      <Row cells={['你有收到 unconfirmed 嗎？', '沒有，兩筆都只有 confirmed；Hoodi 出塊太快']} />
      <Row cells={['正式環境怎麼保護 endpoint？', 'HTTPS、回查 API、transfer ID 去重、限 IP']} />
      <Row cells={['為什麼註冊了好幾個 webhook？', 'ngrok 網址換過；舊的設定應該刪掉']} />
    </QA>
  </Frame>
);

const InboundWebhook: Page = () => (
  <Frame eyebrow="04–05 · 入帳 webhook" title="讀懂一筆入帳通知" subtitle="1.89375 ETH 從 faucet 進到 Part 1 的錢包。" source={webhooksDoc} sourceLabel="Wallet webhooks">
    <QA>
      <Row cells={['value 和 baseValue 差在哪？', '這筆兩者相同，gas 由寄件方付；定義先查']} />
      <Row cells={['為什麼另外有 valueString？', 'wei 超過 JS number 的安全範圍，字串不失精度']} />
      <Row cells={['initiator: external 代表什麼？', '不是 BitGo 帳號內發起，是 faucet 打進來的']} />
      <Row cells={['收到 webhook 就馬上入帳嗎？', '不會，先用 transfer ID 呼叫 API 查證']} />
    </QA>
    <Note>systemNotes 本身就警告：不要只靠 webhook 判斷最終狀態。</Note>
  </Frame>
);

const TransferOutput: Page = () => (
  <Frame eyebrow="06 · 轉帳輸出" title="轉帳輸出裡的狀態與欄位" subtitle="這份 JSON 是在簽名完成、剛廣播時存下來的。">
    <QA>
      <Row cells={['為什麼只轉 0.01 ETH？', 'MPC 錢包自付 gas，金額要低於 spendable']} />
      <Row cells={['transfer signed、txRequest delivered？', '簽完剛廣播就存檔；上鏈後才是 confirmed']} />
      <Row cells={['height: 999999999 是什麼？', '佔位值，代表這時還沒上鏈']} />
      <Row cells={['feeString 是 0，但 feeInfo 有值？', '還沒上鏈，實際手續費未知；feeInfo 是預估']} />
      <Row cells={['policiesChecked: true 是什麼？', '送出前已檢查白名單、限額、審批等政策']} />
      <Row cells={['signatureShares 為什麼是空的？', 'MPC 中間資料不保留，只留下 signedTx']} />
    </QA>
  </Frame>
);

const Signing: Page = () => (
  <Frame tone="dark" eyebrow="07 · 簽名流程" title="簽名與金鑰：最可能被深挖" subtitle="User Key + BitGo Key 共簽，Backup Key 只用來復原。">
    <QA>
      <Row cells={['私鑰有被完整組出來過嗎？', '沒有，這是 TSS 和切開保存私鑰的差別']} />
      <Row cells={['BitGo 倒了，資金怎麼拿回？', 'User Key + Backup Key，用 recovery tool']} />
      <Row cells={['User Key 外洩怎麼辦？', '仍需 BitGo 共簽和政策檢查；盡快轉新錢包']} />
      <Row cells={['access token 外洩怎麼辦？', '沒 passphrase 不能簽，但能讀取、改設定']} />
      <Row cells={['OTP / unlock 是做什麼的？', '敏感操作前解鎖 session；測試環境用 000000']} />
    </QA>
  </Frame>
);

const Extensions: Page = () => (
  <Frame eyebrow="延伸題" title="從測試網延伸到正式環境" subtitle="通常會接到第 3 頁的對沖基金提案。">
    <QA>
      <Row cells={['正式環境怎麼加強安全？', '地址白名單、單筆與每日限額、多人審批']} />
      <Row cells={['資產怎麼分層放？', '長期資產放 custodial cold，營運資金用 hot']} />
      <Row cells={['要支援 USDC 要改什麼？', '改 token 名稱和收款設定；參數先查文件']} />
    </QA>
    <Takeaway lead="把答案接回提案：安全、速度、權限控管" sub="測試網的每個設定，都能對應到對沖基金的需求。" />
  </Frame>
);

const ToVerify: Page = () => (
  <Frame tone="dark" eyebrow="面試前" title="這三題先查文件再回答" subtitle="目前的答案還沒有文件依據。">
    <Grid cols={3}>
      <Card tag="04–05" title="value vs baseValue"><div>兩個欄位的正式定義</div></Card>
      <Card tag="03" title="Webhook 簽章"><div>BitGo 有沒有簽章驗證</div></Card>
      <Card tag="延伸題" title="ERC-20 轉帳"><div>USDC 轉帳的具體參數</div></Card>
    </Grid>
    <Takeaway lead="不確定就直說，並說明會怎麼查證" />
  </Frame>
);

export const meta: SlideMeta = {
  title: 'BitGo Gist interview prep',
  createdAt: '2026-09-29T09:06:58.812Z',
  theme: 'electric-blue',
};
export default [Cover, CreateWallet, WalletResponse, WebhookConfig, InboundWebhook, TransferOutput, Signing, Extensions, ToVerify] satisfies Page[];
