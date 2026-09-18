import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#f6f8fb', text: '#132c47', accent: '#007c83' },
  fonts: { display: 'Arial, sans-serif', body: 'Arial, sans-serif' },
  typeScale: { hero: 64, body: 32 },
  radius: 10,
};
const muted = '#526578';
const mono = 'Menlo, Consolas, monospace';
const sdk = 'https://github.com/BitGo/BitGoJS/blob/master/modules/sdk-core/src/bitgo/wallet/wallets.ts';
const types = 'https://developers.bitgo.com/docs/wallet-types';
const C = ({ children }: { children: ReactNode }) => <code style={{ fontFamily: mono, fontSize: 28 }}>{children}</code>;
const Frame = ({ title, subtitle, children, source = sdk }: { title: string; subtitle: string; children: ReactNode; source?: string }) => (
  <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '100px 100px 70px', display: 'flex', flexDirection: 'column', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)', position: 'relative' }}>
    <div style={{ fontSize: 23, letterSpacing: 3, color: 'var(--osd-accent)', fontWeight: 700, marginBottom: 16 }}>BITGO · GENERATEWALLET · SDK PARAMETERS</div>
    <h1 style={{ fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)', lineHeight: 1.15, margin: 0, letterSpacing: -1.5 }}>{title}</h1>
    <p style={{ fontSize: 30, lineHeight: 1.4, color: muted, margin: '18px 0 24px' }}>{subtitle}</p>
    <section style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, flexShrink: 0, paddingBottom: 24 }}>{children}</section>
    <footer style={{ marginTop: 'auto', flexShrink: 0, borderTop: '1px solid #cbd8e2', paddingTop: 15, fontSize: 22, color: muted }}>Scope: installed @bitgo/sdk-core 38.17.0 · Asset support and enterprise permissions apply · <a href={source} style={{ color: 'var(--osd-accent)' }}>Source</a></footer>
  </main>
);
const td: CSSProperties = { padding: '12px 20px 12px 0', borderBottom: '1px solid #cbd8e2', verticalAlign: 'top', fontSize: 30, lineHeight: 1.45 };
const R = ({ a, b, c }: { a: ReactNode; b: ReactNode; c: ReactNode }) => <tr><th scope="row" style={{ ...td, textAlign: 'left', fontWeight: 700 }}>{a}</th><td style={td}>{b}</td><td style={td}>{c}</td></tr>;
const Table = ({ first, second, third, children, widths = [390, 450] }: { first: string; second: string; third: string; children: ReactNode; widths?: number[] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}><colgroup><col style={{ width: widths[0] }} /><col style={{ width: widths[1] }} /><col /></colgroup><thead><tr style={{ fontSize: 23, color: muted, textAlign: 'left', letterSpacing: 1 }}><th style={{ paddingBottom: 12 }}>{first}</th><th>{second}</th><th>{third}</th></tr></thead><tbody>{children}</tbody></table>
);
const Note = ({ children }: { children: ReactNode }) => <p style={{ fontSize: 28, lineHeight: 1.5, borderLeft: '4px solid var(--osd-accent)', paddingLeft: 24, margin: '20px 0 0' }}>{children}</p>;
const Block = ({ title, children }: { title: string; children: ReactNode }) => <div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 34, lineHeight: 1.2, color: 'var(--osd-accent)', margin: '0 0 10px' }}>{title}</h2><div style={{ fontSize: 32, lineHeight: 1.5 }}>{children}</div></div>;

const WalletMap: Page = () => (
  <Frame title="Parameters → wallet type" subtitle="coin selects asset capabilities; type selects custody/storage; multisigType selects the signing scheme.">
    <Table first="RESULT" second="TYPE / MULTISIGTYPE" third="KEY INPUTS IN ADDITION TO label" widths={[440, 410]}>
      <R a="Self-custody multisig hot" b={<><C>'hot'</C> / <C>'onchain'</C></>} c={<><C>passphrase</C> to generate keys; enterprise if coin requires it</>} />
      <R a="Self-custody multisig cold" b={<><C>'cold'</C> / <C>'onchain'</C></>} c={<><C>userKey</C> + <C>backupXpub</C>; offline key setup</>} />
      <R a="Self-custody MPC hot" b={<><C>'hot'</C> / <C>'tss'</C></>} c={<><C>enterprise</C> + <C>passphrase</C>; EVM version</>} />
      <R a="Self-custody MPC cold" b={<><C>'cold'</C> / <C>'tss'</C></>} c={<><C>enterprise</C> + existing MPC keys + derivation seed</>} />
      <R a="Custodial multisig" b={<><C>'custodial'</C> / <C>'onchain'</C></>} c="Custody-enabled account/enterprise; no local key inputs" />
      <R a="Custodial MPC" b={<><C>'custodial'</C> / <C>'tss'</C></>} c={<><C>enterprise</C> + custody access; EVM version</>} />
    </Table>
    <Note>All paths above require <C>label</C>. Access tokens configure the SDK client. Enterprise is also required for Ethereum multisig key creation.</Note>
  </Frame>
);

const Selectors: Page = () => (
  <Frame title="Defaults, custody and wallet versions" subtitle="Set the selectors explicitly when comparing wallet configurations.">
    <Table first="PARAMETER" second="VALUE / DEFAULT" third="DEPENDENCY OR EFFECT">
      <R a={<C>type</C>} b={<><C>'hot'</C> when omitted</>} c="Standard hot self-custody path; cold and custodial are explicit branches." />
      <R a={<C>multisigType</C>} b="Coin default when omitted" c={<><C>'onchain'</C> = multisignature; <C>'tss'</C> = MPC.</>} />
      <R a={<C>enterprise</C>} b="Required for TSS" c="Also required by some on-chain coins and enabled custody products." />
      <R a={<C>walletVersion</C>} b="EVM TSS: 3, 5 or 6" c="5/6 require MPCv2 coin support; enterprise settings may select v5." />
      <R a="Custodial storage" b={<C>type: 'custodial'</C>} c="Standard on-chain custody products are cold. 'cold' instead selects self-custody cold." />
    </Table>
    <Note>Wallet version changes the coin-specific implementation. It does not change who holds the keys.</Note>
  </Frame>
);

const ColdExample: Page = () => (
  <Frame title="Self-custody MPC cold: parameter example" subtitle="Ethereum Hoodi · requires an existing cold MPC key setup and compatible enterprise settings.">
    <div style={{ display: 'grid', gridTemplateColumns: '1050px 1fr', gap: 60 }}>
      <pre style={{ margin: 0, padding: 32, background: '#e7eef5', borderRadius: 'var(--osd-radius)', fontFamily: mono, fontSize: 28, lineHeight: 1.65, whiteSpace: 'pre' }}>{`await bitgo.coin('hteth').wallets().generateWallet({
  label: 'Self-Custody MPC Cold',
  type: 'cold',
  multisigType: 'tss',
  enterprise: '<ENTERPRISE_ID>',
  walletVersion: 5,
  bitgoKeyId: '<EXISTING_BITGO_MPC_KEY_ID>',
  commonKeychain: '<MATCHING_COMMON_KEYCHAIN>',
  coldDerivationSeed: '<COLD_DERIVATION_SEED>',
});`}</pre>
      <div>
        <Block title="Existing key material">The BitGo MPC key and matching common keychain must already exist.</Block>
        <Block title="No local key generation">This branch does not use <C>passphrase</C>, <C>userKey</C> or <C>backupXpub</C>.</Block>
        <Block title="Recovery option">The hot-wallet <C>passcodeEncryptionCode</C> option is not used here.</Block>
      </div>
    </div>
    <Note>This call registers a wallet using prepared MPC material. It is not a complete offline key-generation ceremony.</Note>
  </Frame>
);

const ColdPrerequisites: Page = () => (
  <Frame title="Cold MPC: prerequisites and validation" subtitle="The SDK checks relationships between the key inputs, not just their presence." source={types}>
    <Table first="INPUT" second="REQUIRED RELATIONSHIP" third="WHY IT MATTERS" widths={[410, 570]}>
      <R a={<C>bitgoKeyId</C>} b={<><C>source === 'bitgo'</C></>} c="Must resolve to an existing BitGo MPC keychain." />
      <R a={<C>commonKeychain</C>} b="Exact match with the BitGo key" c="The user, backup and BitGo material belong to the same MPC setup." />
      <R a={<C>coldDerivationSeed</C>} b="Required at runtime" c="Must come from the cold derivation workflow; optional typing is misleading." />
      <R a="Cold key ceremony" b="Complete before this SDK call" c="The wallet call does not create offline user and backup shares." />
    </Table>
    <Note><strong>Product workflow distinction:</strong> BitGo documents Offline Vault MPC creation through its web application and OVC. The existing-key SDK branch does not replace that workflow.</Note>
  </Frame>
);

const KeyDependencies: Page = () => (
  <Frame title="Key inputs, recovery and exclusive options" subtitle="Most key-import options below belong to the standard on-chain multisignature path.">
    <Table first="INPUT / CONDITION" second="BEHAVIOR" third="DEPENDENCY" widths={[440, 540]}>
      <R a={<C>userKey</C>} b="Imports the user public key" c="Otherwise: passphrase required." />
      <R a={<C>backupXpub</C>} b="Imports the backup public key" c="Or backupXpubProvider; never both." />
      <R a="Generate backup key" b="No supplied backup key/provider" c="Requires passphrase." />
      <R a={<C>passcodeEncryptionCode</C>} b="Optional hot-wallet recovery" c="With passphrase, produces encryptedWalletPassphrase." />
      <R a={<><C>gasPrice</C> / <C>eip1559</C></>} b="Applicable fee overrides" c="Choose one; unused by standard TSS generation." />
    </Table>
    <Note><C>type: 'cold'</C> alone does not keep keys offline. Supply offline-generated public keys.</Note>
  </Frame>
);

const Infrastructure: Page = () => (
  <Frame title="Specialized infrastructure variants" subtitle="Separate SDK branches and modifiers; these are not unrestricted combinations of every flag.">
    <Table first="VARIANT" second="SELECTING INPUTS" third="PREREQUISITES / EFFECT" widths={[360, 620]}>
      <R a="Distributed custody" b={<><C>isDistributedCustody: true</C><br /><C>type: 'cold'</C> + <C>enterprise</C></>} c="Non-TSS path; enterprise licensing and appropriate key setup required." />
      <R a="EVM key ring" b={<><C>evmKeyRingReferenceWalletId</C><br />+ <C>label</C> + EVM coin</>} c="Reuses an eligible reference wallet’s keys; bypasses ordinary key generation." />
      <R a="External signer" b={<><C>createKeychainCallback</C><br /><C>multisigType: 'onchain'</C></>} c="Callback supplies user/backup public keys; cannot combine with passphrase or key-import options." />
      <R a="Shielded custody" b={<><C>isShielded: true</C><br /><C>type: 'custodial'</C> + <C>'tss'</C></>} c="Supported shielded asset and enterprise required; no self-custody shielded branch here." />
    </Table>
    <Note>External-signer on-chain generation also rejects custodial type, WebAuthn info and passcodeEncryptionCode.</Note>
  </Frame>
);

const SpecialAccounts: Page = () => (
  <Frame title="Lightning wallets and Go Accounts" subtitle="The coin family selects these branches before the standard on-chain / MPC flow.">
    <Table first="RESULT" second="SELECTOR" third="REQUIRED INPUTS / VARIATION" widths={[400, 580]}>
      <R a="Lightning custody" b={<><C>subType: 'lightningCustody'</C><br />Lightning coin family</>} c={<><C>label</C>, <C>enterprise</C>, <C>passphrase</C>,<br /><C>passcodeEncryptionCode</C></>} />
      <R a="Lightning self-custody" b={<><C>subType: 'lightningSelfCustody'</C><br />Lightning coin family</>} c="Same required fields. Optional lightningProvider: amboss or voltage." />
      <R a="Go Account" b={<><C>type: 'trading'</C><br />OFC coin family</>} c={<><C>label</C>, <C>enterprise</C>; normally also<br /><C>passphrase</C> + <C>passcodeEncryptionCode</C></>} />
      <R a="Go Account variation" b={<C>userKeySigningRequired: false</C>} c="Allows both passphrase fields to be omitted in this SDK version." />
    </Table>
    <Note>Lightning uses its subtype to distinguish custody and creates a hot wallet. A Go Account uses an off-chain ledger; “trading” is its SDK name.</Note>
  </Frame>
);

const Boundaries: Page = () => (
  <Frame title="Support boundaries and your current script" subtitle="An accepted TypeScript value does not establish a supported wallet-creation recipe." source={types}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
      <div>
        <Block title="Advanced wallets"><C>type: 'advanced'</C> appears in the interface. The product requires its HSM integration; the flag alone is not a complete recipe.</Block>
        <Block title="BLS DKG"><C>multisigType: 'blsdkg'</C> is coin-specific. It is not a universal alternative to on-chain multisig or TSS.</Block>
        <Block title="Availability">Check the asset, enterprise permissions and SDK version before treating any combination as supported.</Block>
      </div>
      <div style={{ borderLeft: '3px solid #cbd8e2', paddingLeft: 40 }}>
        <Block title="Your existing wallet configuration"><C>coin: 'hteth'</C><br /><C>multisigType: 'tss'</C><br /><C>walletVersion: 5</C><br />Omitted <C>type</C> defaults to <C>'hot'</C>.</Block>
        <Block title="Result">Ethereum Hoodi self-custody MPC hot wallet.</Block>
        <Block title="Environment inputs">Token, enterprise and passphrase are required. Your script also requires the recovery code, although the SDK makes it optional here.</Block>
      </div>
    </div>
  </Frame>
);

// Requirements checked against installed sdk-core 38.17.0, including generateWallet,
// generateSMCMpcWallet, Lightning / Go Account codecs and evmUtils.
// Public guidance: https://developers.bitgo.com/docs/wallets-create-wallets
// Cold OVC limitation: https://developers.bitgo.com/docs/wallet-types
export const meta: SlideMeta = {
  title: 'generateWallet — wallet types, parameters & dependencies',
  createdAt: '2026-09-18T09:14:03.867Z',
};
export default [WalletMap, Selectors, ColdExample, ColdPrerequisites, KeyDependencies, Infrastructure, SpecialAccounts, Boundaries] satisfies Page[];
