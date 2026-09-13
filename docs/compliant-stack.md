# Bridging Regulation & Decentralization — content draft

> Maps 1:1 to `slides/compliant-stack/index.tsx` (19 pages, ~15-minute talk, English).
> Edit the text here, then ask Claude to sync it back to the slide.
> Style: formal variant of the house design — deep navy `#0d1b2e` ground, single yellow `#ffcd01` accent, blue `#4190de` as secondary. Refs render bottom-left on slides.

Talk metadata
- **Title**: Bridging Regulation and Decentralization: Tech Stacks for Compliant Adoption
- **Abstract**: The next major wave of capital entering Ethereum will come from traditional finance, but institutional liquidity requires institutional grade compliance. This talk outlines the critical infrastructure layers necessary to build legally compliant gateways into Ethereum — from identity registries and automated policy engines to compliant DeFi frontends — and how to future-proof architecture against incoming regulation while keeping core protocols credibly neutral.

---

## Page 1 · Cover【navy】

- Eyebrow: `@RYANYCW · ETHEREUM × TRADFI`
- Title: **Bridging Regulation & Decentralization**
- Yellow rule divider
- Sub: Tech Stacks for **Compliant Adoption**

---

## Page 2 · The Thesis【statement】

- Eyebrow: `THE THESIS`
- Statement: The next major wave of capital entering Ethereum is **TradFi**.
- Yellow banner: Institutional liquidity requires institutional-grade compliance.

Speaker note: framing — not about killing DeFi with paperwork; about plumbing that lets regulated money touch neutral protocols.

---

## Page 3 · The regulators aren't waiting

- **MiCA & DORA** are live in the EU — licensing and resilience rules apply
- **Travel Rule** enforcement keeps expanding across jurisdictions
- **Basel** frameworks now price banks' crypto exposure
- Qualified custody rules decide **who may hold institutional assets**

> Yellow banner: Compliance is no longer optional homework — it's the entry exam. 🏛️

> Refs: [Compliance Need notes (HackMD)](https://hackmd.io/vE8eb0sTT2OKB3UAhOP3bA#Compliance-Need) · [Fireblocks: Custody Compliance for Banks](https://www.fireblocks.com/blog/digital-asset-custody-compliance-banks) · [BitGo: Understanding Crypto Regulation](https://www.bitgo.com/resources/blog/understanding-crypto-regulation-compliance/)

---

## Page 4 · Two worlds, one bridge to build【two columns】

**What institutions need (yellow dots)**: KYC'd counterparties · policy controls & approvals · audit trails & reporting · licensed, insured rails
**What Ethereum promises (blue dots)**: permissionless access · censorship resistance · credible neutrality · global always-on settlement

> Yellow banner: The bridge is an architecture problem — not a compromise. 🌉

---

## Page 5 · Compliance isn't a compromise — it's a second door【diagram · stepped】

兩條路通往同一個 Ethereum 核心：

- 左路（藍・立即顯示）：🧑‍🚀 **Crypto natives**（self-custody, DeFi, full permissionless access）→ 直達核心，箭頭旁標 `🔓 Nothing changes on this side`
- 右路（黃・逐步顯示）：🏦 **TradFi institutions**（funds, banks, corporates — new capital）→ 🛂 **Compliant gateway**（identity · custody · policy · screening，黃框）→ 核心，標 `🚪 A new door — not a replacement`
- 底部藍色橫條：⚖️ **The same neutral Ethereum** — one permissionless core, untouched

**Speaker Notes**: the key rhetorical move — institutions get a NEW door; natives lose nothing. Everything that follows describes only the right-hand door.

---

## Page 6 · The compliant stack, top to bottom【layer diagram · stepped, revealed top-down, read bottom-up】

| # | Layer | One-liner |
|---|-------|-----------|
| 6 | Compliant frontends | geo-fencing, gated pools, screened access |
| 5 | Travel Rule rails | VASP discovery, IVMS messaging |
| 4 | AML screening | sanctions, risk scoring, monitoring, forensics |
| 3 | Policy engines | limits, whitelists, approval quorums |
| 2 | Keys & custody | multisig, MPC, TEE / HSM roots |
| 1 | Identity & attestations | KYC once, prove everywhere |
| ⚖️ | **Neutral protocol core** (blue base bar) | permissionless, untouched — and it must stay that way |

---

## Page 7 · Layer 1 — Identity & attestation registries

- **KYC once, prove everywhere** — attestations instead of document copies
- Onchain attestation infra: **reusable, revocable, composable**
- zk-credentials: prove **"KYC'd, not sanctioned, accredited"** — without doxxing
- **Zero raw PII** ever touches the chain

**KYC verifiers**: Sumsub · Persona · Jumio · Regula · ZKPassport · Onflow
**Attestation rails & issuers**: EAS · Coinbase Verifications · Human Passport (ex-Gitcoin)

（註：EAS 本身不做 KYC — 它是通用 attestation 基礎設施；KYC 供應商驗證後把結果發成 attestation，Coinbase Verifications 就是「Coinbase 當 issuer、EAS 當軌道」）

（VASP registry 與 IVMS 101 移出此頁 — 那是 Travel Rule 管線，屬於 Layer 4 / Page 10）

> Yellow banner: Identity lives beside the chain — never on it. 🪪

> Refs: [EAS](https://attest.org/) · [Sumsub](https://sumsub.com/)

---

## Page 8 · Layer 2 — Keys & custody

- **Multisig (Safe)**: thresholds on-chain, transparent by design
- **MPC (CMP · DKLs)**: chain-agnostic, threshold invisible, the full key never exists
- Hardware roots: **TEE** (SGX, Nitro) and **HSM** — mature setups layer both
- Key refresh & approval quorums make signer rotation an **off-chain event**

**Major players**: Safe · BitGo · Fireblocks · Anchorage · Cobo · Liminal

> Yellow banner: Qualified custody is the entry ticket for regulated capital. 🎫

> Refs: [Safe](https://safe.global/blog/the-best-crypto-wallets-for-institutions) · [Fireblocks: What is MPC](https://www.fireblocks.com/report/what-is-mpc) · [BitGo](https://www.bitgo.com/resources/blog/institutional-crypto-wallets-how-they-work/)

---

## Page 9 · Layer 3 — Automated policy engines

四個子分類（bullets 即分類法）：

- **Custody-side workflows** — limits, velocity caps, four-eyes approvals
- **Onchain permission frameworks** — roles & scoped delegation on smart accounts
- **Decoupled policy-as-code** — one engine, any key or custodian
- **Agent guardrails** — spending policies for autonomous AI wallets

**Major players**: BitGo · Fireblocks Policy Engine · Safe Modules · Cobo Argus · Narval · Coinbase Agentic

**Speaker Notes**: custody-side 住在金鑰旁（Fireblocks/BitGo）；onchain framework 住在智能帳戶上（Safe Modules/Zodiac Roles、Cobo Argus）；Narval 是解耦的 policy-as-code — 一套引擎管任何託管商；agent guardrails 是最新分支（Coinbase Agentic、Circle）。

> Yellow banner: Paper policy becomes executable policy. 📜→⚙️

> Refs: [Fireblocks: Wallet Infrastructure](https://www.fireblocks.com/blog/wallet-infrastructure-institution-competitive-edge) · [Narval](https://www.narval.xyz/)

---

## Page 10 · Layer 4 — AML screening & monitoring

- **Before**: wallet & address screening — sanctions lists, risk scores
- **During**: real-time monitoring — velocity, exposure, behavioral baselines
- **After**: forensics & tracing for investigations and SAR filings
- Coverage keeps widening: **DeFi hops, bridges, mixers**

**Major players**: Chainalysis · Elliptic · TRM Labs · Crystal

> Yellow banner: Know the address before, watch the flow during, trace the trail after. 🔍

> Refs: [Chainalysis](https://www.chainalysis.com/) · [Elliptic](https://www.elliptic.co/) · [TRM Labs](https://www.trmlabs.com/)

---

## Page 11 · Layer 5 — Travel Rule rails

- Counterparty **VASP discovery & due diligence** — who runs that address?
- **IVMS 101** payloads travel off-chain, alongside the transfer
- Today: alliances — **TRUST 200+ · VerifyVASP 150+ · GTR 116**
- Tomorrow: open standard — **TRP**; unhosted wallets via Satoshi Test

**Major players**: Notabene · Sygna · VerifyVASP · 21 Analytics

> Yellow banner: From compliance cliques to a TCP/IP moment. 🌐

> Refs: [Notabene](https://notabene.id/solutions/safe-connect) · [Sygna](https://www.sygna.io/bridge/) · [21 Analytics](https://www.21analytics.co/glossary/inter-vasp-messaging-standard-ivms/) · [Global Travel Rule](https://www.globaltravelrule.com/en/home)

---

## Page 12 · Layer 6 — Compliant DeFi frontends

- Geo-fencing, screened wallets and **permissioned pools at the frontend**
- Attestation-gated DeFi: **prove compliance, not identity**
- Institutional access flows **through custody rails**
- Underneath it all, the protocol **stays permissionless**

**Major players**: Uniswap Labs (screened app) · Ondo · Securitize · BitGo DeFi · Fireblocks DeFi

（Liminal 移至 Layer 2 — 它的本體是 Safe 上的機構託管，不是 DeFi 前端）

（Aave Arc 已於改版查證中確認停止運作 — 移至 speaker note 當歷史案例；Uniswap Labs 前端以 TRM 篩查錢包＋geo-blocking，是現役的 compliant frontend 經典）

> Yellow banner: Regulate the doorway — not the road. 🚪

> Refs: [Liminal × Safe](https://www.liminalcustody.com/blog/building-on-safe-has-become-extra-beneficial-with-liminals-superpowers/) · [Fireblocks](https://www.fireblocks.com/blog/wallet-infrastructure-institution-competitive-edge)

---

## Page 13 · What if a custodial provider is unlicensed?【question page】

- Eyebrow: `ASK YOURSELF`
- **The provider**: criminal exposure — 18 U.S.C. §1960, MiCA fines & shutdown
- **Its peers**: licensed VASPs de-risk you, banks pull the rails
- **Its users**: no segregation, no insurance — unsecured creditors
- **Institutions**: qualified-custodian rules mean they legally can't touch you

> Yellow banner: No license → no counterparties, no banking, no institutional money. 🚫

**Speaker Notes**: 四層後果 — 服務商（美國 §1960 刑責：Bitzlato、Samourai 被捕案例；歐盟 MiCA 強制授權）；同業（持牌 VASP de-risk、Travel Rule 沒對口、銀行切法幣通道）；用戶（無資產隔離/儲備證明/保險，破產時是無擔保債權人，執法時資金連帶凍結）；機構（SEC custody rule 要求 qualified custodian，法律上碰不得）。收尾：無照不是少一張紙，是少一個未來。

> Refs: [FinCEN](https://www.fincen.gov/) · [MiCA (eur-lex)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114) · [SEC custody rule](https://www.sec.gov/)

---

## Page 14 · The RegTech ecosystem, at a glance【2×3 grid】

| Category | Vendors |
|----------|---------|
| 🪪 KYC & identity | Sumsub · Jumio · Onfido · Persona · Regula · ZKPassport · Onflow |
| 📜 Onchain attestations | EAS · Human Passport (ex-Gitcoin) · Coinbase Verifications |
| 🔐 Custody & policy | Fireblocks · BitGo · Cobo Argus · Narval |
| 🔍 Analytics & monitoring | Chainalysis · Elliptic · TRM Labs · Crystal |
| ✉️ Travel Rule messaging | Notabene · Sygna · VerifyVASP · 21 Analytics |
| 🧾 Tax & Proof of Reserves | TaxBit · Koinly · Chainlink PoR |

- Bottom note: Non-exhaustive — the point: every layer of the stack already has vendors. You don't build this alone.

**Speaker Notes**: categories are converging — Chainalysis pairs with Notabene, Sumsub does KYC + Travel Rule, custody vendors ship policy engines. Expect consolidation; pick vendors with open interfaces so you can swap them.

> Refs: [Chainalysis](https://www.chainalysis.com/) · [Notabene](https://notabene.id/) · [EAS](https://attest.org/) · [Sumsub](https://sumsub.com/)

---

## Page 15 · Case study: life of a compliant transaction【snake diagram · stepped】

① 🧾 Initiate (user or API requests a withdrawal) → ② 🛡 Policy engine (limits, whitelists, approval matrix) → ③ 🔍 Screening (risk score, sanctions, Travel Rule) → ④ 👀 Manual review (high-risk cases go four-eyes) → ⑤ ✍️ MPC / HSM sign (shares co-sign, key never assembles) → ⑥ ⛓ Settle & report (broadcast, audit trail, SAR filings)

- Bottom note: 🐢 The slow steps are ③ and ④ — the crypto is never the bottleneck.

---

## Page 16 · Keep the core credibly neutral

- Compliance lives **at the edges**: frontends, custody, identity rails
- Core contracts: **no allowlists, no admin backdoors**, no special cases
- Neutrality is **why the asset is worth regulating into** in the first place

> Yellow banner: A biased core can't be un-biased later. Neutrality is load-bearing. ⚖️

---

## Page 17 · Future-proofing checklist【✓ rows】

- ✓ Put compliance in swappable modules — never in the protocol
- ✓ Prefer open standards (IVMS 101, TRP) over closed alliances
- ✓ Design for attestations: prove properties, not documents
- ✓ Keep audit trails and proofs exportable from day one
- ✓ Assume the rules will change — your architecture shouldn't have to

---

## Page 18 · Three things to take home 🎒

1. TradFi capital arrives through compliant gateways — someone has to build them
2. The stack: identity → custody → policy → AML → travel rule → frontend
3. Compliance at the edges is what keeps the core credibly neutral

---

## Page 19 · Thanks【navy】

- Eyebrow: `THANK YOU`
- Title: Let's build the bridge 🌉
- Footer: @ryanycw · full research notes: hackmd.io/@ryanycw
