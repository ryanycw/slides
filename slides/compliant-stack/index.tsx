import type { ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { Step, Steps } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#0d1b2e', text: '#f2f6fc', accent: '#ffcd01' },
  fonts: {
    display: '-apple-system, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
    body: '-apple-system, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 120, body: 36 },
  radius: 20,
};

// Formal variant of the house style: deep navy ground, one loud accent.
const yellow = '#ffcd01';
const blue = '#4190de';
const card = '#16263f';
const line = 'rgba(255,255,255,0.14)';
const muted = '#8ba0bf';
const ink = '#111111';

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

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
} as const;

const PageRefs = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      left: 120,
      bottom: 36,
      fontSize: 20,
      fontWeight: 600,
      color: muted,
      opacity: 0.9,
    }}
  >
    Refs: {children}
  </div>
);

const Heading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 72,
      fontWeight: 900,
      margin: 0,
      lineHeight: 1.15,
      letterSpacing: -1,
    }}
  >
    {children}
  </h2>
);

const Bullet = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 26 }}>
    <span
      style={{
        width: 18,
        height: 18,
        borderRadius: 999,
        background: yellow,
        flexShrink: 0,
        marginTop: 17,
      }}
    />
    <span style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5 }}>{children}</span>
  </div>
);

const B = ({ children }: { children: ReactNode }) => (
  <strong style={{ color: yellow, fontWeight: 800 }}>{children}</strong>
);

const Banner = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      marginTop: 56,
      background: yellow,
      color: ink,
      borderRadius: 'var(--osd-radius)',
      padding: '30px 52px',
      fontSize: 34,
      fontWeight: 800,
      lineHeight: 1.45,
    }}
  >
    {children}
  </div>
);

const Player = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      background: card,
      border: `1px solid ${line}`,
      borderRadius: 999,
      padding: '10px 26px',
      fontSize: 25,
      fontWeight: 700,
    }}
  >
    {children}
  </span>
);

const PlayerStrip = ({ label = 'MAJOR PLAYERS', top = 48, children }: { label?: string; top?: number; children: ReactNode }) => (
  <div style={{ marginTop: top }}>
    <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 3, color: muted, marginBottom: 16 }}>
      {label}
    </div>
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>{children}</div>
  </div>
);

const VsRow = ({ dot, children }: { dot: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
    <span style={{ width: 14, height: 14, borderRadius: 999, background: dot, flexShrink: 0, marginTop: 15 }} />
    <span style={{ fontSize: 30, lineHeight: 1.45 }}>{children}</span>
  </div>
);

/* ------------------------------------------------ 01 · Cover */

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 160px',
    }}
  >
    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 6, color: muted, marginBottom: 44 }}>
      @RYANYCW · ETHEREUM × TRADFI
    </div>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 900,
        margin: 0,
        lineHeight: 1.08,
        letterSpacing: -2,
      }}
    >
      Bridging Regulation
      <br />& Decentralization
    </h1>
    <div style={{ width: 220, height: 10, background: yellow, borderRadius: 999, margin: '48px 0' }} />
    <p style={{ fontSize: 42, fontWeight: 700, margin: 0, color: 'var(--osd-text)' }}>
      Tech Stacks for <span style={{ color: yellow }}>Compliant Adoption</span>
    </p>
  </div>
);

Cover.transition = {
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

/* ------------------------------------------------ 02 · Hook */

const Hook: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 160px',
    }}
  >
    <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 4, color: muted, marginBottom: 40 }}>
      THE THESIS
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 92,
        fontWeight: 900,
        margin: 0,
        lineHeight: 1.15,
        letterSpacing: -1,
      }}
    >
      The next major wave of capital
      <br />
      entering Ethereum is <span style={{ color: yellow }}>TradFi</span>.
    </h2>
    <div
      style={{
        marginTop: 64,
        background: yellow,
        color: ink,
        borderRadius: 'var(--osd-radius)',
        padding: '34px 52px',
        fontSize: 38,
        fontWeight: 800,
        lineHeight: 1.4,
        alignSelf: 'flex-start',
      }}
    >
      Institutional liquidity requires institutional-grade compliance.
    </div>
  </div>
);

/* ------------------------------------------------ 03 · Why now */

const WhyNow: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 120 }}>
    <Heading>
      The regulators <span style={{ color: yellow }}>aren't waiting</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 60 }}>
      <Bullet>
        <B>MiCA & DORA</B> are live in the EU — licensing and resilience rules apply
      </Bullet>
      <Bullet>
        <B>Travel Rule</B> enforcement keeps expanding across jurisdictions
      </Bullet>
      <Bullet>
        <B>Basel</B> frameworks now price banks' crypto exposure
      </Bullet>
      <Bullet>
        Qualified custody rules decide <B>who may hold institutional assets</B>
      </Bullet>
    </div>
    <Banner>Compliance is no longer optional homework — it's the entry exam. 🏛️</Banner>
    <PageRefs>hackmd.io (Compliance Need) · fireblocks.com · bitgo.com</PageRefs>
  </div>
);

/* ------------------------------------------------ 04 · The tension */

const Tension: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '100px 120px' }}>
    <Heading>
      Two worlds, <span style={{ color: yellow }}>one bridge to build</span>
    </Heading>
    <div style={{ display: 'flex', gap: 32, marginTop: 52 }}>
      <div style={{ flex: 1, background: card, borderRadius: 'var(--osd-radius)', padding: '40px 44px', border: `1px solid ${line}` }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: yellow, marginBottom: 30 }}>
          What institutions need
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <VsRow dot={yellow}>KYC'd counterparties</VsRow>
          <VsRow dot={yellow}>Policy controls & approvals</VsRow>
          <VsRow dot={yellow}>Audit trails & reporting</VsRow>
          <VsRow dot={yellow}>Licensed, insured rails</VsRow>
        </div>
      </div>
      <div style={{ flex: 1, background: card, borderRadius: 'var(--osd-radius)', padding: '40px 44px', border: `1px solid ${line}` }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: blue, marginBottom: 30 }}>
          What Ethereum promises
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <VsRow dot={blue}>Permissionless access</VsRow>
          <VsRow dot={blue}>Censorship resistance</VsRow>
          <VsRow dot={blue}>Credible neutrality</VsRow>
          <VsRow dot={blue}>Global, always-on settlement</VsRow>
        </div>
      </div>
    </div>
    <div
      style={{
        marginTop: 44,
        background: yellow,
        color: ink,
        borderRadius: 'var(--osd-radius)',
        padding: '28px 52px',
        fontSize: 32,
        fontWeight: 800,
      }}
    >
      The bridge is an architecture problem — not a compromise. 🌉
    </div>
  </div>
);

/* ------------------------------------------------ 05 · Two doors diagram */

const DoorCard = ({
  left,
  top,
  w,
  emoji,
  title,
  desc,
  titleColor,
}: {
  left: number;
  top: number;
  w: number;
  emoji: string;
  title: string;
  desc: string;
  titleColor: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: w,
      background: card,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 36px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <div style={{ fontSize: 40, lineHeight: 1 }}>{emoji}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 900, color: titleColor }}>
      {title}
    </div>
    <div style={{ fontSize: 24, lineHeight: 1.45, color: muted }}>{desc}</div>
  </div>
);

const DoorLabel = ({ left, top, children }: { left: number; top: number; children: ReactNode }) => (
  <div style={{ position: 'absolute', left, top, fontSize: 25, fontWeight: 700, color: muted }}>
    {children}
  </div>
);

const TwoDoors: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', overflow: 'hidden' }}>
    <FlowHeading>
      Compliance isn't a compromise — <span style={{ color: yellow }}>it's a second door</span>
    </FlowHeading>
    <Steps>
      <DoorCard
        left={220}
        top={230}
        w={560}
        emoji="🧑‍🚀"
        title="Crypto natives"
        desc="self-custody, DeFi, full permissionless access"
        titleColor={blue}
      />
      <FlowLink x1={500} y1={430} x2={500} y2={820} dir="down" />
      <DoorLabel left={560} top={600}>
        🔓 Nothing changes on this side
      </DoorLabel>
      <Step>
        <div>
          <DoorCard
            left={1140}
            top={230}
            w={560}
            emoji="🏦"
            title="TradFi institutions"
            desc="funds, banks, corporates — new capital"
            titleColor={yellow}
          />
          <FlowLink x1={1420} y1={430} x2={1420} y2={540} dir="down" />
          <div
            style={{
              position: 'absolute',
              left: 1140,
              top: 550,
              width: 560,
              background: card,
              border: `2px solid ${yellow}`,
              borderRadius: 'var(--osd-radius)',
              padding: '24px 36px',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: yellow }}>🛂 Compliant gateway</div>
            <div style={{ fontSize: 23, color: muted, marginTop: 8 }}>
              identity · custody · policy · screening
            </div>
          </div>
          <FlowLink x1={1420} y1={700} x2={1420} y2={820} dir="down" />
          <DoorLabel left={1470} top={745}>
            🚪 A new door — not a replacement
          </DoorLabel>
        </div>
      </Step>
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 840,
          width: 1720,
          background: blue,
          borderRadius: 16,
          padding: '0 44px',
          height: 120,
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <span style={{ fontSize: 40 }}>⚖️</span>
        <span style={{ fontSize: 36, fontWeight: 900 }}>The same neutral Ethereum</span>
        <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.9)' }}>
          one permissionless core — untouched
        </span>
      </div>
    </Steps>
  </div>
);

/* ------------------------------------------------ 06 · Stack overview */

const LayerBar = ({
  num,
  name,
  desc,
  base = false,
}: {
  num?: string;
  name: string;
  desc: string;
  base?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 30,
      background: base ? blue : card,
      border: `1px solid ${base ? blue : line}`,
      borderRadius: 16,
      padding: '0 40px',
      height: 90,
    }}
  >
    {num ? (
      <span
        style={{
          background: yellow,
          color: ink,
          borderRadius: 999,
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          fontWeight: 900,
          flexShrink: 0,
        }}
      >
        {num}
      </span>
    ) : (
      <span style={{ fontSize: 34, flexShrink: 0 }}>⚖️</span>
    )}
    <span style={{ fontSize: 34, fontWeight: 900, flexShrink: 0 }}>{name}</span>
    <span style={{ fontSize: 25, color: base ? 'rgba(255,255,255,0.9)' : muted }}>{desc}</span>
  </div>
);

const StackOverview: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '100px 120px' }}>
    <Heading>
      The <span style={{ color: yellow }}>compliant stack</span>, top to bottom
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 44 }}>
      <Steps>
        <Step>
          <div style={{ marginBottom: 12 }}>
            <LayerBar num="6" name="Compliant frontends" desc="geo-fencing, gated pools, screened access" />
          </div>
        </Step>
        <Step>
          <div style={{ marginBottom: 12 }}>
            <LayerBar num="5" name="Travel Rule rails" desc="VASP discovery, IVMS messaging" />
          </div>
        </Step>
        <Step>
          <div style={{ marginBottom: 12 }}>
            <LayerBar num="4" name="AML screening" desc="sanctions, risk scoring, monitoring, forensics" />
          </div>
        </Step>
        <Step>
          <div style={{ marginBottom: 12 }}>
            <LayerBar num="3" name="Policy engines" desc="limits, whitelists, approval quorums" />
          </div>
        </Step>
        <Step>
          <div style={{ marginBottom: 12 }}>
            <LayerBar num="2" name="Keys & custody" desc="multisig, MPC, TEE / HSM roots" />
          </div>
        </Step>
        <Step>
          <div style={{ marginBottom: 12 }}>
            <LayerBar num="1" name="Identity & attestations" desc="KYC once, prove everywhere" />
          </div>
        </Step>
        <LayerBar base name="Neutral protocol core" desc="permissionless, untouched — and it must stay that way" />
      </Steps>
    </div>
  </div>
);

/* ------------------------------------------------ 06 · Layer 1 Identity */

const LayerIdentity: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '100px 120px' }}>
    <Heading>
      Layer 1 — <span style={{ color: yellow }}>Identity & attestation registries</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 60 }}>
      <Bullet>
        <B>KYC once, prove everywhere</B> — attestations instead of document copies
      </Bullet>
      <Bullet>
        Onchain attestation infra: <B>reusable, revocable, composable</B>
      </Bullet>
      <Bullet>
        zk-credentials: prove <B>"KYC'd, not sanctioned, accredited"</B> — without doxxing
      </Bullet>
      <Bullet>
        <B>Zero raw PII</B> ever touches the chain
      </Bullet>
    </div>
    <PlayerStrip label="KYC VERIFIERS" top={40}>
      <Player>Sumsub</Player>
      <Player>Persona</Player>
      <Player>Jumio</Player>
      <Player>Regula</Player>
      <Player>ZKPassport</Player>
      <Player>Onflow</Player>
    </PlayerStrip>
    <PlayerStrip label="ATTESTATION RAILS & ISSUERS" top={22}>
      <Player>EAS</Player>
      <Player>Coinbase Verifications</Player>
      <Player>Human Passport (ex-Gitcoin)</Player>
    </PlayerStrip>
    <Banner>Identity lives beside the chain — never on it. 🪪</Banner>
    <PageRefs>attest.org · sumsub.com</PageRefs>
  </div>
);

/* ------------------------------------------------ 07 · Layer 2 Custody */

const LayerCustody: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 120 }}>
    <Heading>
      Layer 2 — <span style={{ color: yellow }}>Keys & custody</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 60 }}>
      <Bullet>
        <B>Multisig (Safe)</B>: thresholds on-chain, transparent by design
      </Bullet>
      <Bullet>
        <B>MPC (CMP · DKLs)</B>: chain-agnostic, threshold invisible, the full key never exists
      </Bullet>
      <Bullet>
        Hardware roots: <B>TEE</B> (SGX, Nitro) and <B>HSM</B> — mature setups layer both
      </Bullet>
      <Bullet>
        Key refresh & approval quorums make signer rotation an <B>off-chain event</B>
      </Bullet>
    </div>
    <PlayerStrip>
      <Player>Safe</Player>
      <Player>BitGo</Player>
      <Player>Fireblocks</Player>
      <Player>Anchorage</Player>
      <Player>Cobo</Player>
      <Player>Liminal</Player>
    </PlayerStrip>
    <Banner>Qualified custody is the entry ticket for regulated capital. 🎫</Banner>
    <PageRefs>safe.global · fireblocks.com (What is MPC) · bitgo.com</PageRefs>
  </div>
);

/* ------------------------------------------------ 08 · Layer 3 Policy */

const LayerPolicy: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '100px 120px' }}>
    <Heading>
      Layer 3 — <span style={{ color: yellow }}>Automated policy engines</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 52 }}>
      <Bullet>
        <B>Custody-side workflows</B> — limits, velocity caps, four-eyes approvals
      </Bullet>
      <Bullet>
        <B>Onchain permission frameworks</B> — roles & scoped delegation on smart accounts
      </Bullet>
      <Bullet>
        <B>Decoupled policy-as-code</B> — one engine, any key or custodian
      </Bullet>
      <Bullet>
        <B>Agent guardrails</B> — spending policies for autonomous AI wallets
      </Bullet>
    </div>
    <PlayerStrip>
      <Player>BitGo</Player>
      <Player>Fireblocks Policy Engine</Player>
      <Player>Safe Modules</Player>
      <Player>Cobo Argus</Player>
      <Player>Narval</Player>
      <Player>Coinbase Agentic</Player>
    </PlayerStrip>
    <Banner>Paper policy becomes executable policy. 📜→⚙️</Banner>
    <PageRefs>fireblocks.com · narval.xyz</PageRefs>
  </div>
);

/* ------------------------------------------------ 10 · Layer 4 AML screening */

const LayerAml: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 120 }}>
    <Heading>
      Layer 4 — <span style={{ color: yellow }}>AML screening & monitoring</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 60 }}>
      <Bullet>
        <B>Before</B>: wallet & address screening — sanctions lists, risk scores
      </Bullet>
      <Bullet>
        <B>During</B>: real-time monitoring — velocity, exposure, behavioral baselines
      </Bullet>
      <Bullet>
        <B>After</B>: forensics & tracing for investigations and SAR filings
      </Bullet>
      <Bullet>
        Coverage keeps widening: <B>DeFi hops, bridges, mixers</B>
      </Bullet>
    </div>
    <PlayerStrip>
      <Player>Chainalysis</Player>
      <Player>Elliptic</Player>
      <Player>TRM Labs</Player>
      <Player>Crystal</Player>
    </PlayerStrip>
    <Banner>Know the address before, watch the flow during, trace the trail after. 🔍</Banner>
    <PageRefs>chainalysis.com · elliptic.co · trmlabs.com</PageRefs>
  </div>
);

/* ------------------------------------------------ 11 · Layer 5 Travel Rule */

const LayerTravelRule: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 120 }}>
    <Heading>
      Layer 5 — <span style={{ color: yellow }}>Travel Rule rails</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 60 }}>
      <Bullet>
        Counterparty <B>VASP discovery & due diligence</B> — who runs that address?
      </Bullet>
      <Bullet>
        <B>IVMS 101</B> payloads travel off-chain, alongside the transfer
      </Bullet>
      <Bullet>
        Today: alliances — <B>TRUST 200+ · VerifyVASP 150+ · GTR 116</B>
      </Bullet>
      <Bullet>
        Tomorrow: open standard — <B>TRP</B>; unhosted wallets via Satoshi Test
      </Bullet>
    </div>
    <PlayerStrip>
      <Player>Notabene</Player>
      <Player>Sygna</Player>
      <Player>VerifyVASP</Player>
      <Player>21 Analytics</Player>
    </PlayerStrip>
    <Banner>From compliance cliques to a TCP/IP moment. 🌐</Banner>
    <PageRefs>notabene.id · sygna.io · 21analytics.co · globaltravelrule.com</PageRefs>
  </div>
);

/* ------------------------------------------------ 10 · Layer 5 Frontends */

const LayerFrontend: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 120 }}>
    <Heading>
      Layer 6 — <span style={{ color: yellow }}>Compliant DeFi frontends</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 60 }}>
      <Bullet>
        Geo-fencing, screened wallets and <B>permissioned pools at the frontend</B>
      </Bullet>
      <Bullet>
        Attestation-gated DeFi: <B>prove compliance, not identity</B>
      </Bullet>
      <Bullet>
        Institutional access flows <B>through custody rails</B>
      </Bullet>
      <Bullet>
        Underneath it all, the protocol <B>stays permissionless</B>
      </Bullet>
    </div>
    <PlayerStrip>
      <Player>Uniswap Labs (screened app)</Player>
      <Player>Ondo</Player>
      <Player>Securitize</Player>
      <Player>BitGo DeFi</Player>
      <Player>Fireblocks DeFi</Player>
    </PlayerStrip>
    <Banner>Regulate the doorway — not the road. 🚪</Banner>
    <PageRefs>bitgo.com · fireblocks.com · uniswap.org</PageRefs>
  </div>
);

/* ------------------------------------------------ 11 · RegTech ecosystem map */

const EcoCard = ({ emoji, title, names }: { emoji: string; title: string; names: string }) => (
  <div
    style={{
      background: card,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '36px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}
  >
    <div style={{ fontSize: 32, fontWeight: 900, color: yellow }}>
      {emoji} {title}
    </div>
    <div style={{ fontSize: 27, lineHeight: 1.5, color: 'var(--osd-text)' }}>{names}</div>
  </div>
);

const EcosystemMap: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '90px 120px' }}>
    <Heading>
      The RegTech ecosystem, <span style={{ color: yellow }}>at a glance</span>
    </Heading>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 28,
        marginTop: 48,
      }}
    >
      <EcoCard emoji="🪪" title="KYC & identity" names="Sumsub · Jumio · Onfido · Persona · Regula · ZKPassport · Onflow" />
      <EcoCard emoji="📜" title="Onchain attestations" names="EAS · Human Passport (ex-Gitcoin) · Coinbase Verifications" />
      <EcoCard emoji="🔐" title="Custody & policy" names="Fireblocks · BitGo · Cobo Argus · Narval" />
      <EcoCard emoji="🔍" title="Analytics & monitoring" names="Chainalysis · Elliptic · TRM Labs · Crystal" />
      <EcoCard emoji="✉️" title="Travel Rule messaging" names="Notabene · Sygna · VerifyVASP · 21 Analytics" />
      <EcoCard emoji="🧾" title="Tax & Proof of Reserves" names="TaxBit · Koinly · Chainlink PoR" />
    </div>
    <div style={{ marginTop: 44, fontSize: 26, fontWeight: 700, color: muted }}>
      Non-exhaustive — the point: every layer of the stack already has vendors. You don't build this alone.
    </div>
    <PageRefs>chainalysis.com · notabene.id · attest.org · sumsub.com</PageRefs>
  </div>
);

/* ------------------------------------------------ 12 · Case study: pipeline */

const FlowHeading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      position: 'absolute',
      left: 100,
      top: 84,
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 58,
      fontWeight: 900,
      lineHeight: 1.2,
      letterSpacing: -1,
    }}
  >
    {children}
  </h2>
);

const FlowNode = ({
  left,
  top,
  w,
  emoji,
  title,
  desc,
}: {
  left: number;
  top: number;
  w: number;
  emoji: string;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: w,
      background: card,
      border: `1px solid ${line}`,
      color: 'var(--osd-text)',
      borderRadius: 'var(--osd-radius)',
      padding: '30px 34px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div style={{ fontSize: 40, lineHeight: 1 }}>{emoji}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 33, fontWeight: 900, lineHeight: 1.2, color: yellow }}>
      {title}
    </div>
    <div style={{ fontSize: 23, lineHeight: 1.45, color: muted }}>{desc}</div>
  </div>
);

const FlowLink = ({
  x1,
  y1,
  x2,
  y2,
  dir = 'right',
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dir?: 'right' | 'left' | 'down';
}) => {
  const pad = 24;
  const left = Math.min(x1, x2) - pad;
  const top = Math.min(y1, y2) - pad;
  const wdt = Math.abs(x2 - x1) + pad * 2;
  const hgt = Math.abs(y2 - y1) + pad * 2;
  const ax = x1 - left;
  const ay = y1 - top;
  const bx = x2 - left;
  const by = y2 - top;
  const mx = ax + (bx - ax) / 2;
  const my = ay + (by - ay) / 2;
  const stroke = '#f2f6fc';
  const path =
    dir === 'down'
      ? `M ${ax} ${ay} C ${ax} ${my}, ${bx} ${my}, ${bx} ${by - 12}`
      : dir === 'left'
        ? `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx + 12} ${by}`
        : `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx - 12} ${by}`;
  const head =
    dir === 'down'
      ? `${bx - 12},${by - 20} ${bx},${by} ${bx + 12},${by - 20}`
      : dir === 'left'
        ? `${bx + 20},${by - 12} ${bx},${by} ${bx + 20},${by + 12}`
        : `${bx - 20},${by - 12} ${bx},${by} ${bx - 20},${by + 12}`;
  return (
    <svg style={{ position: 'absolute', left, top, pointerEvents: 'none' }} width={wdt} height={hgt}>
      <path d={path} stroke={stroke} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
      <polygon points={head} fill={stroke} opacity={0.9} />
    </svg>
  );
};

const CasePipeline: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', overflow: 'hidden' }}>
    <FlowHeading>
      Case study: <span style={{ color: yellow }}>life of a compliant transaction</span>
    </FlowHeading>
    <Steps>
      <FlowNode left={100} top={230} w={480} emoji="🧾" title="① Initiate" desc="user or API requests a withdrawal" />
      <Step>
        <div>
          <FlowLink x1={580} y1={340} x2={710} y2={340} />
          <FlowNode left={720} top={230} w={480} emoji="🛡" title="② Policy engine" desc="limits, whitelists, approval matrix" />
        </div>
      </Step>
      <Step>
        <div>
          <FlowLink x1={1200} y1={340} x2={1330} y2={340} />
          <FlowNode left={1340} top={230} w={480} emoji="🔍" title="③ Screening" desc="risk score, sanctions, Travel Rule" />
        </div>
      </Step>
      <Step>
        <div>
          <FlowLink x1={1580} y1={460} x2={1580} y2={620} dir="down" />
          <FlowNode left={1340} top={630} w={480} emoji="👀" title="④ Manual review" desc="high-risk cases go four-eyes" />
        </div>
      </Step>
      <Step>
        <div>
          <FlowLink x1={1330} y1={740} x2={1210} y2={740} dir="left" />
          <FlowNode left={720} top={630} w={480} emoji="✍️" title="⑤ MPC / HSM sign" desc="shares co-sign, key never assembles" />
        </div>
      </Step>
      <Step>
        <div>
          <FlowLink x1={710} y1={740} x2={590} y2={740} dir="left" />
          <FlowNode left={100} top={630} w={480} emoji="⛓" title="⑥ Settle & report" desc="broadcast, audit trail, SAR filings" />
        </div>
      </Step>
    </Steps>
    <div
      style={{
        position: 'absolute',
        left: 100,
        bottom: 70,
        fontSize: 26,
        fontWeight: 700,
        color: muted,
      }}
    >
      🐢 The slow steps are ③ and ④ — the crypto is never the bottleneck.
    </div>
  </div>
);

/* ------------------------------------------------ 12 · Credible neutrality */

const Neutrality: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 120 }}>
    <Heading>
      Keep the core <span style={{ color: yellow }}>credibly neutral</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 60 }}>
      <Bullet>
        Compliance lives <B>at the edges</B>: frontends, custody, identity rails
      </Bullet>
      <Bullet>
        Core contracts: <B>no allowlists, no admin backdoors</B>, no special cases
      </Bullet>
      <Bullet>
        Neutrality is <B>why the asset is worth regulating into</B> in the first place
      </Bullet>
    </div>
    <Banner>A biased core can't be un-biased later. Neutrality is load-bearing. ⚖️</Banner>
  </div>
);

/* ------------------------------------------------ 13 · Future-proofing */

const CheckRow = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
    <span
      style={{
        background: yellow,
        color: ink,
        borderRadius: 10,
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
        fontWeight: 900,
        flexShrink: 0,
        marginTop: 4,
      }}
    >
      ✓
    </span>
    <span style={{ fontSize: 34, lineHeight: 1.45 }}>{children}</span>
  </div>
);

const FutureProofing: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '100px 120px' }}>
    <Heading>
      Future-proofing <span style={{ color: yellow }}>checklist</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 56 }}>
      <CheckRow>Put compliance in swappable modules — never in the protocol</CheckRow>
      <CheckRow>Prefer open standards (IVMS 101, TRP) over closed alliances</CheckRow>
      <CheckRow>Design for attestations: prove properties, not documents</CheckRow>
      <CheckRow>Keep audit trails and proofs exportable from day one</CheckRow>
      <CheckRow>Assume the rules will change — your architecture shouldn't have to</CheckRow>
    </div>
  </div>
);

/* ------------------------------------------------ 17-18 · My takeaways */

const TakeawayEyebrow = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 5, color: muted, marginBottom: 28 }}>
    {children}
  </div>
);

const TakeawayTaiwan: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '100px 120px' }}>
    <TakeawayEyebrow>FIELD NOTES · 1</TakeawayEyebrow>
    <Heading>
      Building from Taiwan, <span style={{ color: yellow }}>where most custodians hold no license</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 52 }}>
      <Bullet>
        Most global custody providers <B>aren't registered in Taiwan</B>
      </Bullet>
      <Bullet>
        New: <B>Liminal Taiwan</B> cleared FSC AML registration — first foreign custodian (list now 10)
      </Bullet>
      <Bullet>
        The <B>VASP Act has landed</B> — but can you rely on foreign-licensed custodians? Still unclear
      </Bullet>
      <Bullet>
        Playbook: partner via a <B>branch in a licensed jurisdiction</B>, integrate the stack there first
      </Bullet>
    </div>
    <Banner>Integrate abroad today — port it home the day the rules turn clear. 🇹🇼</Banner>
    <PageRefs>fsc.gov.tw · abmedia.io (VASP registry) · liminalcustody.com</PageRefs>
  </div>
);

const TakeawayPrivacy: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: '100px 120px' }}>
    <TakeawayEyebrow>FIELD NOTES · 2</TakeawayEyebrow>
    <Heading>
      Why privacy matters <span style={{ color: yellow }}>inside KYC</span>
    </Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 52 }}>
      <Bullet>
        KYC flows hoard <B>ID documents + selfies</B> — and they leak, constantly
      </Bullet>
      <Bullet>
        Leaked PII fuels <B>social engineering</B>: attackers know exactly who you are
      </Bullet>
      <Bullet>
        Leaked faces feed <B>AI deepfakes</B> — social engineering now wears your face
      </Bullet>
      <Bullet>
        The fix is Layer 1: <B>zk-credentials & selective disclosure</B> — prove, don't upload
      </Bullet>
    </div>
    <Banner>Every stored KYC copy is a future attack surface. 🎭</Banner>
    <PageRefs>see: 隱私與 KYC slides (docs.google.com)</PageRefs>
  </div>
);

/* ------------------------------------------------ Takeaways */

const Takeaway = ({ num, children }: { num: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
    <span
      style={{
        background: yellow,
        color: ink,
        borderRadius: 999,
        width: 64,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 34,
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      {num}
    </span>
    <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.45 }}>{children}</span>
  </div>
);

const Takeaways: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 160px',
    }}
  >
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 88,
        fontWeight: 900,
        margin: '0 0 72px',
        letterSpacing: -1,
      }}
    >
      Three things to take home 🎒
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
      <Takeaway num="1">TradFi capital arrives through compliant gateways — someone has to build them</Takeaway>
      <Takeaway num="2">The stack: identity → custody → policy → AML → travel rule → frontend</Takeaway>
      <Takeaway num="3">Compliance at the edges is what keeps the core credibly neutral</Takeaway>
    </div>
  </div>
);

/* ------------------------------------------------ 15 · Thanks */

const Thanks: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 160px',
    }}
  >
    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 8, color: muted, marginBottom: 44 }}>
      THANK YOU
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 120,
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: -2,
      }}
    >
      Let's build the bridge 🌉
    </div>
    <div style={{ width: 220, height: 10, background: yellow, borderRadius: 999, margin: '52px 0' }} />
    <div style={{ fontSize: 34, fontWeight: 700 }}>
      @ryanycw
    </div>
  </div>
);

// Presenter-mode speaker notes — one entry per page.
export const notes: (string | undefined)[] = [
  undefined, // 1 Cover
  'Frame: this is not a talk about killing DeFi with paperwork — it is about the plumbing that lets regulated money touch neutral protocols.', // 2 Hook
  'MiCA/DORA live in EU; Travel Rule thresholds tightening; Basel gives banks capital treatment for crypto; qualified custody decides who may hold client assets.', // 3 Why now
  'Neither column wins by defeating the other — the architecture assigns each requirement a layer where it can live without touching the core.', // 4 Tension
  'The key rhetorical move of the talk: institutions get a NEW door; natives lose nothing. Everything that follows describes only the right-hand door — the left one is untouched.', // 5 Two doors
  'Read bottom-up: the base never changes; every compliance requirement maps to exactly one layer above it.', // 6 Stack overview
  'Attestations mean a venue can verify "this address passed KYC at provider X" without ever seeing documents. EAS is the general-purpose attestation rail; zk-credentials go further — prove a property (KYC\'d, accredited, not sanctioned) while revealing nothing else. VASP directories and IVMS belong to Layer 4, not here.', // 7 L1 Identity
  'One-line recap of the custody talk: Safe = transparent on-chain thresholds; MPC (CMP by Fireblocks, DKLs by BitGo/Silence Labs) = invisible thresholds, standard single sig on-chain; TEE vs HSM both used in layered setups.', // 8 L2 Custody
  'Four sub-categories: custody-side workflows (Fireblocks, BitGo) live where the keys are; onchain permission frameworks (Safe Modules / Zodiac Roles, Cobo Argus) live on the smart account; Narval is the decoupled policy-as-code play — one engine over any custodian; agent guardrails (Coinbase Agentic, Circle) are the newest branch. Same idea everywhere: the compliance manual becomes code that runs before signing.', // 9 L3 Policy
  'One vendor often covers all three phases — Chainalysis KYT screens pre-flight, monitoring watches exposure in-flight, Reactor traces post-hoc. Coverage race is now about DeFi hops, bridges and mixers.', // 10 L4 AML
  'Alliance fragmentation is real — some exchanges sit in two or three networks. TRP + IVMS 101 is the path from cliques to one protocol. Unhosted wallets are handled with ownership proofs like the Satoshi Test.', // 11 L5 Travel Rule
  'Permissioned frontends over permissionless protocols: the Uniswap Labs app geo-blocks and screens wallets via TRM while the protocol below stays neutral. Aave Arc pioneered permissioned pools in 2022 but has since wound down — cite it as history, not as a live product. Attestation-gating beats identity-gating for privacy.', // 12 L6 Frontends
  'Categories are converging: Chainalysis pairs with Notabene, Sumsub does both KYC and Travel Rule, custody vendors ship policy engines. Expect consolidation — pick vendors with open interfaces so you can swap them.', // 13 Ecosystem map
  'Walk the snake: steps 3 and 4 (screening + manual review) dominate latency — MPC signing is milliseconds-to-seconds. The bottleneck is process, not cryptography.', // 14 Case pipeline
  'Vitalik-style argument: neutrality is the product. If the core takes sides, TradFi has no reason to prefer it over their existing databases.', // 15 Neutrality
  'Each check maps to a failure mode seen in the wild: hardcoded compliance (Tornado-style collateral damage), closed alliances, un-exportable audit data.', // 16 Checklist
  'Verified Sept 2026: FSC AML-registered VASPs went from 8 to 10 — TSG EX and Liminal Taiwan (優答台灣, NT$60.5M capital) cleared together; Liminal is the first foreign custody provider on the list and plans to apply for the full license under the VASP Act. The Act itself has passed — the open question is whether integrating a custodian licensed only abroad satisfies Taiwanese requirements; no guidance yet. The branch playbook keeps Taiwanese teams shippable while that ambiguity resolves.', // 17 Takeaway Taiwan
  'The KYC paradox: the process that is supposed to reduce risk creates a honeypot of IDs and faces. Once leaked, PII powers targeted social engineering — and face data takes it further: deepfaked video calls and voice clones that impersonate you to your family, your colleagues, your bank. The scam no longer pretends to be a stranger; it pretends to be you. This is why Layer 1 zk-credentials are not a privacy luxury but a security requirement.', // 18 Takeaway Privacy
  undefined, // 19 Takeaways
  undefined, // 20 Thanks
];

export const meta: SlideMeta = {
  title: 'Bridging Regulation & Decentralization',
  createdAt: '2026-09-12T18:41:23.046Z',
};

export default [
  Cover,
  Hook,
  WhyNow,
  Tension,
  TwoDoors,
  StackOverview,
  LayerIdentity,
  LayerCustody,
  LayerPolicy,
  LayerAml,
  LayerTravelRule,
  LayerFrontend,
  EcosystemMap,
  CasePipeline,
  Neutrality,
  FutureProofing,
  TakeawayTaiwan,
  TakeawayPrivacy,
  Takeaways,
  Thanks,
] satisfies Page[];
