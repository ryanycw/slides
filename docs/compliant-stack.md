# Bridging Regulation & Decentralization — content draft

> Maps 1:1 to `slides/compliant-stack/index.tsx` (15 pages, ~15-minute talk, English).
> Edit the text here, then ask Claude to sync it back to the slide.
> Style: formal variant of the house design — deep navy `#0d1b2e` ground, single yellow `#ffcd01` accent, blue `#4190de` as secondary. Refs render bottom-left on slides.

Talk metadata
- **Title**: Bridging Regulation and Decentralization: Tech Stacks for Compliant Adoption
- **Abstract**: The next major wave of capital entering Ethereum will come from traditional finance, but institutional liquidity requires institutional grade compliance. This talk outlines the critical infrastructure layers necessary to build legally compliant gateways into Ethereum — from identity registries and automated policy engines to compliant DeFi frontends — and how to future-proof architecture against incoming regulation while keeping core protocols credibly neutral.

---

## Page 1 · Cover【navy】

- Eyebrow: `@RYANYCW · ETHEREUM × TRADFI · 15 MIN`
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

## Page 5 · The compliant stack, top to bottom【layer diagram · stepped, revealed top-down, read bottom-up】

| # | Layer | One-liner |
|---|-------|-----------|
| 5 | Compliant frontends | geo-fencing, gated pools, screened access |
| 4 | Screening & Travel Rule | risk scoring, sanctions, VASP messaging |
| 3 | Policy engines | limits, whitelists, approval quorums |
| 2 | Keys & custody | multisig, MPC, TEE / HSM roots |
| 1 | Identity & attestations | KYC once, prove everywhere |
| ⚖️ | **Neutral protocol core** (blue base bar) | permissionless, untouched — and it must stay that way |

---

## Page 6 · Layer 1 — Identity & attestation registries

- **KYC once, prove everywhere** — attestations instead of document copies
- VASP registries & directories: **TRUST · VerifyVASP · Sumsub**
- **IVMS 101** as the shared data language between institutions
- Onchain: screened-address attestations, **zero raw PII** on the chain

> Yellow banner: Identity lives beside the chain — never on it. 🪪

> Refs: [21 Analytics: IVMS 101](https://www.21analytics.co/glossary/inter-vasp-messaging-standard-ivms/) · [VerifyVASP](https://www.verifyvasp.com/en/alliance/) · [Sumsub: Travel Rule protocols](https://sumsub.com/blog/crypto-travel-rule-protocols/)

---

## Page 7 · Layer 2 — Keys & custody

- **Multisig (Safe)**: thresholds on-chain, transparent by design
- **MPC (CMP · DKLs)**: chain-agnostic, threshold invisible, the full key never exists
- Hardware roots: **TEE** (SGX, Nitro) and **HSM** — mature setups layer both
- Key refresh & approval quorums make signer rotation an **off-chain event**

> Yellow banner: Qualified custody is the entry ticket for regulated capital. 🎫

> Refs: [Safe](https://safe.global/blog/the-best-crypto-wallets-for-institutions) · [Fireblocks: What is MPC](https://www.fireblocks.com/report/what-is-mpc) · [BitGo](https://www.bitgo.com/resources/blog/institutional-crypto-wallets-how-they-work/)

---

## Page 8 · Layer 3 — Automated policy engines

- Programmable guardrails: **limits, whitelists, approval matrices**
- Four-eyes and role-based quorums **before any signature happens**
- Humans set the rules, machines enforce them (**Fireblocks · Narval**)
- Agent-ready: the same rails let **AI agents spend safely**

> Yellow banner: Paper policy becomes executable policy. 📜→⚙️

> Refs: [Fireblocks: Wallet Infrastructure](https://www.fireblocks.com/blog/wallet-infrastructure-institution-competitive-edge) · [Narval](https://www.narval.xyz/)

---

## Page 9 · Layer 4 — Screening & Travel Rule rails

- Transaction screening & risk scoring: **Chainalysis · Elliptic**
- Travel Rule messaging between VASPs: **Notabene · Sumsub**
- Today: alliances — **TRUST 200+ · VerifyVASP 150+ · GTR 116**
- Tomorrow: open standards — **TRP + IVMS 101**

> Yellow banner: From compliance cliques to a TCP/IP moment. 🌐

> Refs: [Notabene](https://notabene.id/solutions/safe-connect) · [21 Analytics](https://www.21analytics.co/glossary/inter-vasp-messaging-standard-ivms/) · [Global Travel Rule](https://www.globaltravelrule.com/en/home)

---

## Page 10 · Layer 5 — Compliant DeFi frontends

- Geo-fencing, screened wallets and **permissioned pools at the frontend**
- Attestation-gated DeFi: **prove compliance, not identity**
- Institutional access through custody rails (**Fireblocks DeFi · Liminal on Safe**)
- Underneath it all, the protocol **stays permissionless**

> Yellow banner: Regulate the doorway — not the road. 🚪

> Refs: [Liminal × Safe](https://www.liminalcustody.com/blog/building-on-safe-has-become-extra-beneficial-with-liminals-superpowers/) · [Fireblocks](https://www.fireblocks.com/blog/wallet-infrastructure-institution-competitive-edge)

---

## Page 11 · Case study: life of a compliant transaction【snake diagram · stepped】

① 🧾 Initiate (user or API requests a withdrawal) → ② 🛡 Policy engine (limits, whitelists, approval matrix) → ③ 🔍 Screening (risk score, sanctions, Travel Rule) → ④ 👀 Manual review (high-risk cases go four-eyes) → ⑤ ✍️ MPC / HSM sign (shares co-sign, key never assembles) → ⑥ ⛓ Settle & report (broadcast, audit trail, SAR filings)

- Bottom note: 🐢 The slow steps are ③ and ④ — the crypto is never the bottleneck.

---

## Page 12 · Keep the core credibly neutral

- Compliance lives **at the edges**: frontends, custody, identity rails
- Core contracts: **no allowlists, no admin backdoors**, no special cases
- Neutrality is **why the asset is worth regulating into** in the first place

> Yellow banner: A biased core can't be un-biased later. Neutrality is load-bearing. ⚖️

---

## Page 13 · Future-proofing checklist【✓ rows】

- ✓ Put compliance in swappable modules — never in the protocol
- ✓ Prefer open standards (IVMS 101, TRP) over closed alliances
- ✓ Design for attestations: prove properties, not documents
- ✓ Keep audit trails and proofs exportable from day one
- ✓ Assume the rules will change — your architecture shouldn't have to

---

## Page 14 · Three things to take home 🎒

1. TradFi capital arrives through compliant gateways — someone has to build them
2. The stack: identity → custody → policy → screening → frontend
3. Compliance at the edges is what keeps the core credibly neutral

---

## Page 15 · Thanks【navy】

- Eyebrow: `THANK YOU`
- Title: Let's build the bridge 🌉
- Footer: @ryanycw · full research notes: hackmd.io/@ryanycw
