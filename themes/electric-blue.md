---
name: Electric Blue
description: Electric-blue to cyan gradients, deep navy and airy grey-white pages, thin Inter headlines, pill tags and glass rows. Built for institutional fintech pitches.
mode: light
---

# Electric Blue

Built for the BitGo hedge-fund pitch (`slides/bitgo-hedge-fund-pitch`), which is the reference implementation.
It is modelled on the Sinesubs visual identity: electric-blue gradients over navy, alternating with light pages.
**The deck and this file must stay in lockstep.** If you change a component here, change it in the deck, and the reverse.

## Palette

| Role        | Value                      | Notes                                                    |
| ----------- | -------------------------- | -------------------------------------------------------- |
| bg          | `#f4f6fb`                  | light page base (`design.palette.bg`)                    |
| text        | `#0b1026`                  | primary copy on light pages (`design.palette.text`)      |
| accent      | `#2446ff`                  | electric blue: eyebrows, pills, key numbers (`design.palette.accent`) |
| muted       | `#5b6480`                  | subtitles, footers, table heads on light pages           |
| navy        | `#060a1f`                  | dark page base                                           |
| cyan        | `#3fd0f5`                  | **gradient glow only** (cover glow, accent bar, spectrum bar); never text |
| skyBlue     | `#7cc4ff`                  | the one light-blue text accent on dark and gradient pages: eyebrow, pills, `B`, block titles, cover headline line 2 (from the reference "6M+" stat) |
| mutedDark   | `#a9b3d6`                  | secondary copy on dark pages                             |
| blueSoft    | `#e8eeff`                  | card fill on light pages                                 |
| rule        | `#d9deeb`                  | hairlines on light pages                                 |
| ruleDark    | `rgba(255,255,255,0.16)`   | hairlines on dark pages                                  |
| glass       | `rgba(255,255,255,0.06)` + `1px solid rgba(255,255,255,0.22)` | card / panel on dark pages |
| cross       | `#e5484d`                  | **only** the ✕ mark in comparison rows                   |

Backgrounds (the three page tones):

```ts
const bgLight = 'radial-gradient(900px 600px at 100% 0%, rgba(36,70,255,0.10), transparent 60%), #f4f6fb';
const bgDark = `radial-gradient(1100px 700px at 0% 115%, rgba(36,70,255,0.55), transparent 60%), radial-gradient(900px 600px at 105% -10%, rgba(41,182,246,0.30), transparent 60%), ${navy}`;
const bgBlue = 'linear-gradient(180deg, transparent 55%, rgba(6,10,31,0.55) 100%), radial-gradient(1000px 700px at 90% 10%, rgba(63,208,245,0.70), transparent 60%), linear-gradient(115deg, #0a1bd9 0%, #2446ff 50%, #1f7cf0 100%)';
const accentBar = 'linear-gradient(180deg, #2446ff, #3fd0f5)';
```

## Typography

- Display and body font: `'Inter', system-ui, sans-serif`.
  - Headlines use weight **300** with tight tracking (`letterSpacing: -2`, or `-4` at cover size).
  - Body copy is 400. Labels, pills and table row heads are 500.
  - Never use 600 or heavier, and never use all-caps letter-spaced labels.
- Webfont import: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap`.
  - Inject it once at module top level with a slide-scoped id (`osd-webfont-<slide-id>`), as described in `slide-authoring/references/webfonts.md`.
- Type scale:
  - Cover headline: 124 px / 300
  - Appendix divider: 140 px / 300
  - Page title (`design.typeScale.hero`): 64 px / 300
  - Subtitle: 30 px, muted
  - Card title: 34 px / 400
  - Block title: 30 px / 500
  - Takeaway lead: 44 px / 400 (sub 28 px, muted)
  - Body, cards, notes: 28 px
  - Table body: 26 px (row head 500)
  - Eyebrow: 24 px / 500
  - Table head and footer: 20–22 px
  - Pill: 20 px / 500
- **One line per cell.** Inter at 28 px is about 15 px per character. Budget column widths with that before you write copy, and shorten the copy rather than letting it wrap.

## Layout

- Canvas 1920 × 1080. Content padding is `80px 100px 56px` (top / sides / bottom), which gives a 1720 px content width. The cover and appendix divider use 140 px side padding.
- `Frame` structure: optional `Eyebrow` → `Title` → optional subtitle (margin `18px 0 32px`; without one, a 40 px gap) → content section → `Footer` pinned to the bottom with `marginTop: auto`.
- **Three tones.**
  - `light`: `bgLight`, dark text, blue accent.
  - `dark`: `bgDark`, white text, sky-blue accent.
  - `gradient`: `bgBlue`, white text. Use it only for the cover, dividers and one highlighted panel per page.
- Primitives read the tone from a React context, so the same markup works in both `light` and `dark`.
- Page rhythm: start with a gradient cover, keep light pages as the default, and switch to a dark page at each turn of the story (problem, controls, close). Avoid three dark pages in a row. Put diagrams on light pages.
- Grids: 2 or 3 equal columns with a 40 px gap. A diagram plus side column uses a 56 px gap.
- Comparison layout (before / after): a 2-column grid, with a `glass` panel of ✕ rows on the left and a `bgBlue` panel of ✓ rows on the right.

## Fixed components

Paste-ready. They assume the palette constants above, plus `useSlidePageNumber` from `@open-slide/core` and `createContext` / `useContext` from `react`.

### Tone context

```tsx
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
```

### Title

```tsx
const Title = ({ children }: { children: ReactNode }) => (
  <h1 style={{ fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)', fontWeight: 300, lineHeight: 1.12, letterSpacing: -2, margin: 0 }}>{children}</h1>
);
```

### Eyebrow

Optional; content pages omit it by default. Use it to mark a section that differs from the main flow, such as "Appendix · pull up if asked". Sentence case, coloured, no tracking.

```tsx
const Eyebrow = ({ children }: { children: ReactNode }) => {
  const t = useTone();
  return <div style={{ fontSize: 24, fontWeight: 500, color: t.hi, marginBottom: 14 }}>{children}</div>;
};
```

### Footer

Left: `bitgo.com` on every page (ownership mark), followed by ` · Source: <link>` when the page cites one. Right: page number. No captions or disclaimers: keep those in speaker notes. The cover carries `bitgo.com` at the bottom.

```tsx
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
```

### Frame (standard content page)

```tsx
type FrameProps = FooterProps & { tone?: ToneName; eyebrow?: string; title: string; subtitle?: string; children: ReactNode };

const Frame = ({ tone = 'light', eyebrow, title, subtitle, children, source, sourceLabel }: FrameProps) => (
  <Tone.Provider value={tone}>
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '80px 100px 56px', display: 'flex', flexDirection: 'column', background: tone === 'dark' ? bgDark : bgLight, color: tone === 'dark' ? '#ffffff' : 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {subtitle ? <p style={{ fontSize: 30, lineHeight: 1.4, color: tone === 'dark' ? mutedDark : muted, margin: '18px 0 32px' }}>{subtitle}</p> : <div style={{ height: 40 }} />}
      <section style={{ flexShrink: 0 }}>{children}</section>
      <Footer source={source} sourceLabel={sourceLabel} />
    </main>
  </Tone.Provider>
);
```

### Pill

```tsx
const Pill = ({ children, color }: { children: ReactNode; color?: string }) => {
  const t = useTone();
  const c = color ?? t.hi;
  return <span style={{ display: 'inline-block', fontSize: 20, fontWeight: 500, lineHeight: 1.2, color: c, border: `1.5px solid ${c}`, borderRadius: 999, padding: '6px 16px' }}>{children}</span>;
};
```

### Card

A pale-blue card on light pages and a glass card on dark pages. Layout: pill tag, then title, then one line per child.

```tsx
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
```

### Note (gradient accent bar)

```tsx
const Note = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 24, marginTop: 28 }}>
    <span style={{ width: 4, flexShrink: 0, borderRadius: 2, background: accentBar }} />
    <p style={{ fontSize: 28, lineHeight: 1.45, margin: 0 }}>{children}</p>
  </div>
);
```

### Takeaway (closing line)

Use it as the last element on a page whose final line is its conclusion. Keep `Note` for supporting remarks. The lead must fit one line at 44 px, which is about 21 px per character, so roughly 80 characters.

```tsx
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
```

### Block (small titled paragraph)

```tsx
const Block = ({ title, children }: { title: string; children: ReactNode }) => {
  const t = useTone();
  return (
    <div style={{ marginBottom: 26 }}>
      <h2 style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.2, color: t.hi, margin: '0 0 8px' }}>{title}</h2>
      <div style={{ fontSize: 28, lineHeight: 1.45 }}>{children}</div>
    </div>
  );
};
```

### Grid

```tsx
const Grid = ({ cols, children }: { cols: number; children: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 40 }}>{children}</div>
);
```

### CheckRow (✓ / ✕ glass row)

```tsx
const Mark = ({ ok }: { ok: boolean }) => (
  <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 500, background: '#ffffff', color: ok ? '#2446ff' : '#e5484d' }}>{ok ? '✓' : '✕'}</span>
);
// n: optional item number (aligns rows with a numbered list elsewhere); compact: for 5+ rows.
const CheckRow = ({ ok, n, compact, children }: { ok: boolean; n?: number; compact?: boolean; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 14 : 18, padding: compact ? '10px 18px' : '14px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.30)', fontSize: compact ? 26 : 28, marginTop: compact ? 10 : 14 }}>
    <Mark ok={ok} />
    {n !== undefined && <span style={{ width: 18, flexShrink: 0, color: 'rgba(255,255,255,0.6)' }}>{n}</span>}
    <span>{children}</span>
  </div>
);
```

### Table

The body is 26 px. There are no vertical rules, only hairlines between rows. The first cell of each row is a 500-weight `th`.

```tsx
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
```

### Diagram frame

```tsx
const Diagram = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
  <img src={src} alt={alt} style={{ width, height, flexShrink: 0, borderRadius: 'var(--osd-radius)', background: '#fff', boxShadow: '0 24px 60px -32px rgba(20,40,120,0.45)' }} />
);
```

## Motion

- Philosophy: **static**. Pages snap; the gradients and blurred blobs supply the energy. Do not add transitions or keyframes.

## Aesthetic

Calm, precise, premium fintech. Think of the Sinesubs identity: a saturated electric-blue gradient bleeding into cyan, set against deep navy, and punctuated by airy grey-white pages. Headlines are large and thin. Labels are small, coloured and in sentence case. Tags are outlined pills. Comparisons use glassy rows with ✓ / ✕ markers. Quotes sit behind a thin blue-to-cyan bar.

Avoid:
- warm accent colours (red appears only in the ✕ mark);
- a second light-blue text colour: sky blue is the only light-blue text accent, and cyan appears only inside gradients;
- heavy weights (600 or more);
- all-caps tracked labels;
- solid-coloured boxes with borders on light pages (use `blueSoft` fills instead);
- drop shadows except on the diagram frame;
- emoji;
- more than one gradient panel per content page.

## Example usage

```tsx
const Cover: Page = () => (
  <Tone.Provider value="dark">
    <main style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '80px 140px 56px', display: 'flex', flexDirection: 'column', background: bgBlue, color: '#ffffff', fontFamily: 'var(--osd-font-body)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: -0.5 }}>BitGo</span>
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <h1 style={{ fontSize: 124, fontWeight: 300, lineHeight: 1.08, margin: '0 0 40px', letterSpacing: -4 }}>
          Protect the reserve.<br />
          <span style={{ color: skyBlue }}>Move at market speed.</span>
        </h1>
        <p style={{ fontSize: 36, color: 'rgba(255,255,255,0.82)', margin: 0 }}>A custody and liquidity plan for your fund.</p>
      </div>
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>bitgo.com</div>
    </main>
  </Tone.Provider>
);

const Problem: Page = () => (
  <Frame tone="dark" title="Today, safety and speed pull against each other" subtitle="What we typically see across several venues.">
    <Grid cols={3}>
      <Card tag="Fast · exposed" title="On exchanges"><div>Exposed if a venue fails</div></Card>
      {/* … */}
    </Grid>
    <Note>What is missing: one setup that is both safe and fast.</Note>
  </Frame>
);
```

The runtime `design` const used with this theme:

```ts
export const design: DesignSystem = {
  palette: { bg: '#f4f6fb', text: '#0b1026', accent: '#2446ff' },
  fonts: { display: "'Inter', system-ui, sans-serif", body: "'Inter', system-ui, sans-serif" },
  typeScale: { hero: 64, body: 30 },
  radius: 14,
};
```

## Diagrams (Archify recolour)

Archify's built-in presets keep a per-type red/green/amber palette. To make diagrams match this theme, **do not edit the validated JSON geometry.** Render the diagram as usual, then re-shoot it with overridden CSS variables:

1. `node ~/.claude/skills/archify/bin/archify.mjs deliver <type> <spec>.json <name>.html --quality showcase --json` must report `ok: true`.
2. Open the HTML in headless Chrome (CDP) at 2000 × 1500, `deviceScaleFactor: 2`. Set `html[data-theme="light"]`, load Inter, and inject the override below.
3. Screenshot the `svg[data-quality-profile]` bounding box. Trim the white margin (keeping 32 px of air) and save to `slides/<id>/assets/<name>.png`. Then set the `Diagram` width and height to the PNG's aspect ratio.
4. Dataflow diagrams have tall, empty stage lanes. For those, also set `--lane-fill` and `--lane-stroke` to `transparent`.

Colour mapping: security → electric blue, cloud → cyan, backend → indigo, external → slate. Emphasised edges are electric blue; ordinary edges are slate-blue.

```css
html[data-theme] {
  --bg:#ffffff; --grid:transparent; --panel:#ffffff; --panel-border:transparent;
  --lane-fill:rgba(36,70,255,0.03); --lane-stroke:#c7d2fe;
  --text:#0b1026; --text-muted:#5b6480; --text-faint:#7a84a3; --text-dim:#9aa3bf; --mask:#ffffff;
  --security-fill:rgba(36,70,255,0.07); --security-stroke:#2446ff;
  --cloud-fill:rgba(14,165,217,0.09); --cloud-stroke:#0891c9;
  --backend-fill:rgba(99,102,241,0.08); --backend-stroke:#5b5bd6;
  --frontend-fill:rgba(59,130,246,0.08); --frontend-stroke:#3b82f6;
  --database-fill:rgba(96,165,250,0.10); --database-stroke:#60a5fa;
  --messagebus-fill:rgba(8,145,178,0.08); --messagebus-stroke:#0e7490;
  --external-fill:rgba(100,116,139,0.07); --external-stroke:#64748b;
  --arrow:#8a94b3; --arrow-emphasis:#2446ff;
}
body { background:#ffffff !important; }
.header, .header-row, .toolbar, .cards, footer { display:none !important; }
svg text { font-family: 'Inter', system-ui, sans-serif !important; }
.semantic-sigil { display:none !important; }   /* type icons carry no meaning for clients */
.c-region { fill: rgba(36,70,255,0.03) !important; stroke: #6b8cff !important; }
```

Reference sources: `slides/bitgo-hedge-fund-pitch/assets/archify/wallet-architecture.architecture.json` (tiers as Reserve / Operate / Trade boundaries; hot wallets sit left, Go Account right; one accepted crossing, so it is delivered at `--quality standard`) and `slides/bitgo-hedge-fund-proposal/assets/archify/*.json` for the other two. Of these, `capital-flow` is the dataflow that needs lanes hidden.
