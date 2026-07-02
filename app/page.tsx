type Kind = "ok" | "warn" | "bad" | "muted" | "brand";
function Pill({ kind, children }: { kind: Kind; children: React.ReactNode }) {
  return (
    <span className={`pill ${kind}`}>
      <span className="dot" />
      {children}
    </span>
  );
}

function Section({ k, title, note, children }: { k: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="sec-head">
        <span className="k">{k}</span>
        <h2>{title}</h2>
      </div>
      {note && <p className="sec-note">{note}</p>}
      {children}
    </section>
  );
}

// ── Live deployments ───────────────────────────────────────────
const DEPLOYMENTS: [string, string, React.ReactNode][] = [
  ["Web (marketplace)", "https://collabstr-clone.vercel.app", <Pill key="a" kind="ok">Live</Pill>],
  ["Admin console", "https://nakhla-admin.vercel.app", <Pill key="b" kind="ok">Live</Pill>],
  ["API (NestJS)", "https://nakhla-api.vercel.app/api/v1/health", <Pill key="c" kind="ok">Live · 200</Pill>],
  ["Database (Postgres)", "Neon · us-east-2 · migrated + seeded", <Pill key="d" kind="warn">Claim pending</Pill>],
  ["Source", "github.com/eng-AhmedMahmoud/collabstr-clone", <Pill key="e" kind="ok">Auto-deploy</Pill>],
];

// ── What shipped this session ──────────────────────────────────
const SHIPPED: [string, string, React.ReactNode][] = [
  ["PDPL/GDPR cookie consent", "Opt-in per category, AR/EN, RTL, 6-mo re-consent, reopen from footer", <Pill key="1" kind="ok">Shipped</Pill>],
  ["Privacy policy + terms", "Bilingual, PDPL/GDPR-structured, Mawthooq + ZATCA clauses, KSA law", <Pill key="2" kind="ok">Shipped</Pill>],
  ["Data export + deletion", "GET /users/me/export (portability) + account delete", <Pill key="3" kind="ok">Shipped</Pill>],
  ["Motion system", "Scroll-reveal, hero stagger, micro-interactions, reduced-motion safe", <Pill key="4" kind="ok">Shipped</Pill>],
  ["API hardening", "helmet, rate-limit (login 10/min), Prisma→HTTP filter, body cap", <Pill key="5" kind="ok">Shipped</Pill>],
  ["Mawthooq verification", "Licence submit → admin review → Licensed badge; order gate", <Pill key="6" kind="ok">Shipped</Pill>],
  ["Full deployment", "Web + admin + API + Postgres, all auto-deploying from main", <Pill key="7" kind="ok">Shipped</Pill>],
];

// ── Competitor parity snapshot ─────────────────────────────────
const PARITY: [string, React.ReactNode, React.ReactNode][] = [
  ["Search + buy packages", <Pill key="a" kind="ok">Collabstr</Pill>, <Pill key="b" kind="ok">Nakhla ✓</Pill>],
  ["Post campaign → applications", <Pill key="c" kind="ok">Collabstr</Pill>, <Pill key="d" kind="ok">Nakhla ✓</Pill>],
  ["Escrow / pay-on-approval", <Pill key="e" kind="ok">Collabstr</Pill>, <Pill key="f" kind="warn">States ✓ · gateway pending</Pill>],
  ["Verified social stats (APIs)", <Pill key="g" kind="ok">Collabstr</Pill>, <Pill key="h" kind="bad">Not yet</Pill>],
  ["Reviews + chat + approval flow", <Pill key="i" kind="ok">Collabstr</Pill>, <Pill key="j" kind="ok">Nakhla ✓</Pill>],
  ["Creator payouts + tax docs", <Pill key="k" kind="ok">Collabstr</Pill>, <Pill key="l" kind="bad">Not yet</Pill>],
];

// ── KSA differentiators ────────────────────────────────────────
const DIFF: [string, React.ReactNode][] = [
  ["Mawthooq licence verification (nobody does this)", <Pill key="1" kind="ok">Shipped</Pill>],
  ["Arabic-first RTL product", <Pill key="2" kind="ok">Shipped</Pill>],
  ["Snapchat-first profiles (top KSA reach)", <Pill key="3" kind="brand">Enum ready</Pill>],
  ["mada / Apple Pay / STC Pay / Tamara / Tabby", <Pill key="4" kind="warn">Planned</Pill>],
  ["ZATCA e-invoices (FATOORA)", <Pill key="5" kind="warn">Planned</Pill>],
  ["Coupon → Salla/Zid revenue attribution", <Pill key="6" kind="muted">Backlog</Pill>],
  ["Maroof brand-verification badge", <Pill key="7" kind="muted">Backlog</Pill>],
];

// ── Cost breakdown ─────────────────────────────────────────────
const COSTS: [string, string, string][] = [
  ["Hostinger KVM2 VPS", "$7–8/mo promo", "$13–15/mo renewal"],
  ["Vercel web + admin", "$0 Hobby", "$20/mo Pro (commercial)"],
  ["Postgres", "$0 (on VPS)", "$0 co-located"],
  ["Cloudflare R2 media", "$0 (10GB)", "~$1.50 / 100GB"],
  ["Domain (.com / .sa)", "~$1–3/mo", "same"],
  ["Resend email", "$0 (3k/mo)", "$20/mo (50k)"],
  ["Unifonic SMS OTP", "~SAR 0.07/SMS", "usage"],
  ["Fixed total", "≈ $8–10/mo", "≈ $80–95/mo"],
];

const PAYMENTS: [string, string, string][] = [
  ["mada (Tap/Moyasar)", "~1% + SAR 1", "~SAR 11"],
  ["Visa / Mastercard", "~2.4–2.75% + SAR 1", "~SAR 26–29"],
  ["Tamara / Tabby BNPL", "~5–7% + SAR 1.5", "~SAR 52–72"],
];

// ── Next steps ─────────────────────────────────────────────────
const NEXT: [string, string, React.ReactNode][] = [
  ["1", "Escrow / payment models + checkout scaffolding", <Pill key="1" kind="brand">Buildable now</Pill>],
  ["2", "Email verification + password reset flows", <Pill key="2" kind="brand">Buildable now</Pill>],
  ["3", "Server-side consent log + signup marketing opt-in", <Pill key="3" kind="brand">Buildable now</Pill>],
  ["4", "Admin mobile responsiveness (tables/drawer)", <Pill key="4" kind="brand">Buildable now</Pill>],
  ["5", "Provision Hostinger VPS → move API + Postgres", <Pill key="5" kind="warn">Needs VPS IP</Pill>],
  ["6", "Wire Tap + Tamara + Resend + Unifonic", <Pill key="6" kind="warn">Needs accounts</Pill>],
];

// ── Accounts to create ─────────────────────────────────────────
const ACCOUNTS: [string, string, string][] = [
  ["Hostinger VPS", "New dedicated KVM2 for Nakhla", "hpanel.hostinger.com"],
  ["Neon (claim DB)", "Attach live DB so it never expires", "neon.new/database/b45669…"],
  ["Tap Payments", "mada + Apple Pay + BNPL gateway", "register.tap.company/sa"],
  ["Tamara", "Saudi BNPL (direct)", "tamara.co/en-SA/partners"],
  ["Resend", "Transactional email", "resend.com/signup"],
  ["Unifonic", "KSA SMS OTP", "cloud.unifonic.com/signup"],
];

export default function Page() {
  return (
    <div className="wrap">
      <header className="hero">
        <span className="badge">
          <span className="brand-dot">ن</span>
          Nakhla · KSA Influencer Marketplace
        </span>
        <h1>
          Build session <span className="grad">report</span>
        </h1>
        <p className="sub">
          Everything shipped this session — live deployments, competitive standing, costs, and what comes next.
        </p>
        <p className="meta">Generated 2 July 2026 · web + admin + API + Postgres live on Vercel</p>

        <div className="stats">
          <div className="stat"><div className="n">4</div><div className="l">Services live</div></div>
          <div className="stat"><div className="n">7</div><div className="l">Features shipped</div></div>
          <div className="stat"><div className="n">$95M</div><div className="l">KSA market/yr</div></div>
          <div className="stat"><div className="n">#1</div><div className="l">Mawthooq first-mover</div></div>
        </div>
      </header>

      <Section k="01" title="Live deployments" note="All three apps auto-deploy from the main branch on every push.">
        <div className="card">
          <table>
            <thead><tr><th>Service</th><th>Location</th><th>Status</th></tr></thead>
            <tbody>
              {DEPLOYMENTS.map(([svc, loc, st], i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{svc}</td>
                  <td>{loc.startsWith("http") ? <a href={loc} target="_blank" rel="noreferrer">{loc.replace("https://", "")}</a> : loc}</td>
                  <td>{st}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section k="02" title="What shipped this session">
        <div className="card">
          <table>
            <thead><tr><th>Feature</th><th>Detail</th><th>Status</th></tr></thead>
            <tbody>
              {SHIPPED.map(([f, d, s], i) => (
                <tr key={i}><td style={{ fontWeight: 600 }}>{f}</td><td style={{ color: "var(--muted)" }}>{d}</td><td>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section k="03" title="Competitive parity vs Collabstr" note="Core marketplace loop is at parity; discovery/payout automation is the remaining gap.">
        <div className="card">
          <table>
            <thead><tr><th>Capability</th><th>Baseline</th><th>Nakhla</th></tr></thead>
            <tbody>
              {PARITY.map(([cap, base, us], i) => (
                <tr key={i}><td style={{ fontWeight: 600 }}>{cap}</td><td>{base}</td><td>{us}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section k="04" title="KSA differentiators" note="Where Nakhla beats global players. Mawthooq verification is a genuine first-mover — no competitor verifies advertising licences.">
        <div className="card">
          <table>
            <thead><tr><th>Differentiator</th><th>Status</th></tr></thead>
            <tbody>
              {DIFF.map(([d, s], i) => (
                <tr key={i}><td style={{ fontWeight: 600 }}>{d}</td><td>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section k="05" title="Cost breakdown" note="Launch is cheap; the real cost is payment rails + legal setup (CR before gateways go live).">
        <div className="card" style={{ marginBottom: 16 }}>
          <table>
            <thead><tr><th>Item</th><th>Launch</th><th>At growth</th></tr></thead>
            <tbody>
              {COSTS.map(([item, l, g], i) => (
                <tr key={i} style={i === COSTS.length - 1 ? { fontWeight: 800 } : undefined}>
                  <td>{item}</td><td>{l}</td><td>{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <table>
            <thead><tr><th>Payment rail</th><th>Typical KSA rate</th><th className="num">On SAR 1,000</th></tr></thead>
            <tbody>
              {PAYMENTS.map(([r, rate, ex], i) => (
                <tr key={i}><td style={{ fontWeight: 600 }}>{r}</td><td style={{ color: "var(--muted)" }}>{rate}</td><td className="num">{ex}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section k="06" title="Company structure — recommendation">
        <div className="callout">
          <h3>New Saudi entity, with you registered as shareholder from day one.</h3>
          <p>
            Running Nakhla under your partner&apos;s existing CR with a profit-share side agreement is <strong>tasattur</strong>{" "}
            (commercial concealment): up to 5 years&apos; prison, SAR 5M fine, deportation with lifetime ban — and the side
            agreement is <strong>legally void</strong>, so you&apos;d hold nothing. Since Feb 2025 the new Investment Law lets
            Egyptians register directly via <strong>MISA</strong>, 100% foreign ownership, no capital minimum. Use the{" "}
            <strong>Entrepreneur licence</strong> (~SAR 2,000/yr, accelerator letter). When you raise VC, add an{" "}
            <strong>ADGM holding company</strong> over the Saudi opco. Not legal advice — confirm with KSA counsel.
          </p>
        </div>
      </Section>

      <Section k="07" title="Next steps" note="Top four are buildable now with no external accounts.">
        <div className="card">
          <table>
            <thead><tr><th className="num">#</th><th>Item</th><th>Readiness</th></tr></thead>
            <tbody>
              {NEXT.map(([n, item, r], i) => (
                <tr key={i}><td className="num" style={{ fontWeight: 800, color: "var(--brand-2)" }}>{n}</td><td style={{ fontWeight: 600 }}>{item}</td><td>{r}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section k="08" title="Accounts to create" note="I can&apos;t create accounts or accept terms — create these, then say “connect X” and I take it from the dashboard.">
        <div className="card">
          <table>
            <thead><tr><th>Service</th><th>Purpose</th><th>Where</th></tr></thead>
            <tbody>
              {ACCOUNTS.map(([s, p, w], i) => (
                <tr key={i}><td style={{ fontWeight: 600 }}>{s}</td><td style={{ color: "var(--muted)" }}>{p}</td><td><code>{w}</code></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <footer>
        Nakhla · نخلة — Hire vetted creators across the Kingdom. Pay in SAR. Ship campaigns in days.
      </footer>
    </div>
  );
}
