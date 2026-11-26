import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Homelessness System | Civic Intelligence Lab",
  description:
    "An evidence-led investigation of homelessness funding, institutions, service providers, and public accountability in Alameda County, Oakland, and Berkeley.",
};

const allocations = [
  { label: "City of Oakland", amount: "$28.45M", exact: "$28,446,565.83", share: 100 },
  { label: "Regional Continuum of Care", amount: "$14.03M", exact: "$14,033,347.21", share: 49.3 },
  { label: "Alameda County", amount: "$13.46M", exact: "$13,463,753.50", share: 47.3 },
];

const lenses = [
  {
    number: "01",
    heading: "Follow the money",
    description: "Trace awards, authorized allocations, contracts, and eventually actual payments without counting the same dollars twice.",
    detail: "Funding & procurement",
  },
  {
    number: "02",
    heading: "Map the institutions",
    description: "Identify who plans, administers, coordinates, provides services, and oversees the homelessness response.",
    detail: "Governance & providers",
  },
  {
    number: "03",
    heading: "Document public decisions",
    description: "Connect public votes, oversight records, lobbying filings, and campaign finance only where a dated source supports the relationship.",
    detail: "Policy & accountability",
  },
  {
    number: "04",
    heading: "Examine the outcomes",
    description: "Compare reported services and housing outcomes using consistent geography, dates, denominators, and program definitions.",
    detail: "Measures & limitations",
  },
];

const organizations = [
  {
    label: "California HCD",
    type: "State funding",
    description: "Administers Homeless Housing, Assistance and Prevention (HHAP) funding rounds.",
    href: "https://www.hcd.ca.gov/funding/hhap",
  },
  {
    label: "Alameda County Health",
    type: "Local coordination",
    description: "Housing and Homelessness Services oversees Coordinated Entry and HMIS.",
    href: "https://health.alamedacountyca.gov/department/housing-homelessness-services/",
  },
  {
    label: "EveryOne Home",
    type: "Regional governance",
    description: "Continuum of Care structure and related policies for the Alameda County region.",
    href: "https://everyonehome.org/",
  },
  {
    label: "Housing Resource Centers",
    type: "Service access",
    description: "Directory of service-access organizations; listings do not establish grant or contract amounts.",
    href: "https://health.alamedacountyca.gov/housing-resource-center-directory/",
  },
];

const sources = [
  {
    id: "01",
    label: "California HCD — HHAP Round 5 awards",
    note: "Three distinct allocation figures; not actual expenditures",
    href: "https://www.hcd.ca.gov/sites/default/files/docs/grants-and-funding/calich/hhap-r5-awardee-list.pdf",
  },
  {
    id: "02",
    label: "Alameda County — Measure W Home Together Fund",
    note: "FY2025–26 county allocation; a separate funding source",
    href: "https://health.alamedacountyca.gov/measure-w-home-together-fund/",
  },
  {
    id: "03",
    label: "Alameda County — Housing and Homelessness Services",
    note: "Coordinated Entry, HMIS, and service coordination",
    href: "https://health.alamedacountyca.gov/department/housing-homelessness-services/",
  },
  {
    id: "04",
    label: "EveryOne Home — regional Continuum of Care",
    note: "Governance and CoC context",
    href: "https://everyonehome.org/",
  },
  {
    id: "05",
    label: "California HCD — HHAP fiscal dashboard",
    note: "Reported fiscal progress; necessary for expenditure analysis",
    href: "https://www.hcd.ca.gov/housing-open-data-tools/hhap-dashboard",
  },
  {
    id: "06",
    label: "HUD — Continuum of Care program",
    note: "Federal program authority and structure",
    href: "https://www.hud.gov/program_offices/comm_planning/coc",
  },
];

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A87946]">
      {children}
    </p>
  );
}

export default function HomelessnessResearchPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#142B35]">
      <header className="border-b border-[#314752] bg-[#102530] text-[#E6ECEA]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="text-sm font-semibold tracking-tight transition hover:text-[#E2B77F]">
            ← Civic Intelligence Lab
          </Link>
          <nav aria-label="Project navigation" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-[#CAD7D8] sm:text-sm">
            <a href="#question" className="transition hover:text-white">The inquiry</a>
            <a href="#funding" className="transition hover:text-white">Funding</a>
            <a href="#institutions" className="transition hover:text-white">Institutions</a>
            <a href="#methods" className="transition hover:text-white">Methodology</a>
            <a href="#sources" className="transition hover:text-white">Sources</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#102530] px-6 pb-20 pt-20 text-white sm:pb-28 sm:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 h-[450px] w-[450px] rounded-full border border-[#31515A] opacity-40 sm:h-[640px] sm:w-[640px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[330px] w-[330px] rounded-full border border-[#31515A] opacity-40 sm:h-[520px] sm:w-[520px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#DAB078]">CivicIntel / Research Project 002</p>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[1.07] tracking-tight sm:text-6xl lg:text-7xl">
              The <span className="italic text-[#E7B778]">Homelessness</span> System
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#E0E9E9] sm:text-2xl">
              Following public resources, institutional relationships, decisions, and outcomes.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#B9CED0]">
              An ongoing, source-backed investigation beginning in Alameda County, Oakland, and Berkeley—and tracing connections to California and federal institutions.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#question" className="rounded-full bg-[#DDB37A] px-6 py-3 text-sm font-semibold text-[#112733] transition hover:bg-[#F0C994]">
                Explore the investigation ↓
              </a>      
              <a
  href="/projects/homelessness/network"
  className="rounded-full border border-[#66808A] px-5 py-3 text-sm font-semibold text-[#E5C28B] transition hover:border-[#DDB37A] hover:bg-[#233F49]"
>
  Explore the Interactive Network →
  </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-[#37525B] bg-[#17323D] p-5 shadow-2xl sm:p-7">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#DDB37A]">How the system connects</p>
              <span className="text-[10px] uppercase tracking-widest text-[#A8C3C7]">Concept preview</span>
            </div>
            <svg viewBox="0 0 460 310" role="img" aria-label="Concept illustration of state funding connected to local government, governance, service providers, and program measurement. Not a diagram of actual documented edges." className="h-auto w-full">
              <defs>
                <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D8B177"/><stop offset="1" stopColor="#77B8B2"/></linearGradient>
              </defs>
              {[
                [230, 55, 96, 149], [230, 55, 364, 149], [230, 55, 230, 151],
                [96, 149, 230, 251], [364, 149, 230, 251], [230, 151, 230, 251],
              ].map(([x1, y1, x2, y2], index) => (
                <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lineGlow)" strokeWidth="1.8" opacity="0.7" strokeDasharray={index > 2 ? "5 5" : "none"}/>
              ))}
              {[
                { x: 230, y: 55, r: 35, fill: "#DBB37B", text: "Funding", color: "#15303A" },
                { x: 96, y: 149, r: 35, fill: "#D6A080", text: "Policy", color: "#15303A" },
                { x: 230, y: 151, r: 41, fill: "#8CBFAD", text: "Agencies", color: "#15303A" },
                { x: 364, y: 149, r: 39, fill: "#B2A4D2", text: "Providers", color: "#15303A" },
                { x: 230, y: 251, r: 40, fill: "#9FBAD4", text: "Outcomes", color: "#15303A" },
              ].map((node) => (
                <g key={node.text}>
                  <circle cx={node.x} cy={node.y} r={node.r + 10} fill={node.fill} opacity="0.1" />
                  <circle cx={node.x} cy={node.y} r={node.r} fill={node.fill} />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill={node.color}>{node.text}</text>
                </g>
              ))}
            </svg>
            <p className="mt-2 text-xs leading-5 text-[#AAC3C6]">Illustration of analytical categories, not actual actors or inferred influence.</p>
          </div>
        </div>
        <div className="relative mx-auto mt-16 grid max-w-7xl gap-4 border-t border-[#38515B] pt-8 text-[#C9DADD] sm:grid-cols-3">
          {[
            { stat: "32", label: "pilot dataset nodes" },
            { stat: "35", label: "recorded relationships" },
            { stat: "16", label: "source references" },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-3">
              <span className="font-serif text-4xl text-[#E6B77A]">{item.stat}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="question" className="mx-auto max-w-7xl scroll-mt-12 px-6 py-20 sm:py-24">
        <SectionKicker>01 / The research question</SectionKicker>
        <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          Where do public resources go, who is responsible, and what can the evidence tell us?
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#52646B]">
          Homelessness policy is shaped by many institutions. We are building a public record of how agencies, funding programs, service organizations, and oversight bodies relate to one another, while keeping reported outcomes separate from assumptions about causation.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {lenses.map((item) => (
            <article key={item.number} className="rounded-2xl border border-[#DFD9CD] bg-white p-7 sm:p-8">
              <p className="text-xs font-bold tracking-[0.2em] text-[#AB7B45]">{item.number} / {item.detail}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.heading}</h3>
              <p className="mt-4 leading-7 text-[#57676D]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="funding" className="scroll-mt-8 bg-[#E8EEE9] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionKicker>02 / Follow the money</SectionKicker>
          <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Allocated is not spent.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-[#4D6267]">
            Our first funding view uses California&apos;s published HHAP Round 5 allocations. The three recipients below are distinct eligible jurisdictions, not sequential stops in a single transfer of dollars.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="rounded-2xl border border-[#C8D4CF] bg-white p-7 shadow-sm sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">HHAP Round 5 · Alameda region</h3>
                <span className="rounded-full bg-[#F2EDE4] px-3 py-1 text-xs font-semibold text-[#80663F]">Published allocations</span>
              </div>
              <div className="mt-9 space-y-7">
                {allocations.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <span className="text-sm font-semibold sm:text-base">{item.label}</span>
                      <span className="text-lg font-semibold tabular-nums text-[#174B55]">{item.amount}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-[#E8ECE9]">
                      <div className="h-full rounded-full bg-[#719C95]" style={{ width: `${item.share}%` }}/>
                    </div>
                    <p className="mt-2 text-xs tabular-nums text-[#718185]">Exact allocation: {item.exact}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-[#E4E9E6] pt-5">
                <a href="https://www.hcd.ca.gov/sites/default/files/docs/grants-and-funding/calich/hhap-r5-awardee-list.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#286B70] underline underline-offset-4 hover:text-[#194B50]">View California HCD awardee list ↗</a>
              </div>
            </div>
            <div className="space-y-5">
              <article className="rounded-2xl bg-[#173440] p-7 text-white sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DDB37A]">Separate funding source</p>
                <p className="mt-4 font-serif text-4xl text-[#EEC68B]">$168.9M</p>
                <h3 className="mt-4 text-lg font-semibold">Alameda County Measure W</h3>
                <p className="mt-3 text-sm leading-7 text-[#CAD8DA]">Home Together funds allocated by the Board of Supervisors for FY2025–26. Not interchangeable with HHAP allocations or verified spending.</p>
                <a href="https://health.alamedacountyca.gov/measure-w-home-together-fund/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-[#E9BD86] underline underline-offset-4">County funding record ↗</a>
              </article>
              <article className="rounded-2xl border border-[#C8D4CF] bg-[#F9FBF8] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3F746D]">Research distinction</p>
                <p className="mt-4 text-lg font-semibold">Awarded ≠ obligated ≠ paid ≠ spent</p>
                <p className="mt-3 text-sm leading-7 text-[#55686C]">Our network will label each financial stage. Funding amounts from separate programs will not be totaled as though they represent one comparable measure.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="institutions" className="mx-auto max-w-7xl scroll-mt-12 px-6 py-20 sm:py-24">
        <SectionKicker>03 / Institutional landscape</SectionKicker>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">Different roles. Different relationships.</h2>
        <p className="mt-5 max-w-3xl leading-8 text-[#52646B]">
          A funding agency, coordinating body, service provider, and oversight committee may all appear in the same system—but their connections mean different things. The first pilot maps documented institutional roles before adding political finance.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {organizations.map((org) => (
            <article key={org.label} className="flex flex-col rounded-xl border border-[#DED8CE] bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A87946]">{org.type}</p>
              <h3 className="mt-4 text-xl font-semibold">{org.label}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[#566A70]">{org.description}</p>
              <a href={org.href} target="_blank" rel="noopener noreferrer" className="mt-5 text-sm font-semibold text-[#266A70] underline underline-offset-4">Source record ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#132D39] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#DDB37A]">04 / Coming next</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">An explorable public-record network.</h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#C7D7D9]">
              The interactive explorer will let visitors select institutions, follow source-backed connections, filter relationship types, and inspect evidence in context. It will begin with the 32-node pilot and expand as new public records are verified.
            </p>
            <p className="mt-6 text-sm font-semibold text-[#E2BC86]">Network explorer · Under development</p>
          </div>
          <div className="rounded-2xl border border-[#45616C] bg-[#1C3A46] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#E1B77A]">Planned evidence views</p>
            <div className="mt-5 space-y-4">
              {[
                ["01", "Funding and grants"],
                ["02", "Government and governance"],
                ["03", "Organizations and contracts"],
                ["04", "Lobbying and political finance"],
                ["05", "Program outcomes"],
              ].map(([number, title]) => (
                <div key={number} className="flex items-center gap-4 border-b border-[#3C5963] pb-3 last:border-0 last:pb-0">
                  <span className="text-xs font-semibold text-[#DDB37A]">{number}</span>
                  <span className="text-sm text-[#E2EBEB]">{title}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-[#B5CACD]">Future layers will be added only when supported by a reviewed dataset. Relationships are not proof of influence or wrongdoing.</p>
          </div>
        </div>
      </section>

      <section id="methods" className="mx-auto max-w-7xl scroll-mt-12 px-6 py-20 sm:py-24">
        <SectionKicker>05 / Research methodology</SectionKicker>
        <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Evidence before conclusions.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Defined boundaries</h3>
            <p className="mt-3 text-sm leading-7 text-[#566A70]">Pilot geography: Alameda County, including Oakland and Berkeley, plus relevant state and federal institutions. Initial period: 2020–2026.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Verified connections</h3>
            <p className="mt-3 text-sm leading-7 text-[#566A70]">Every relationship in the underlying pilot dataset has a type and source reference. A directory listing is not a contract; an RFQ is not an award.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Responsible interpretation</h3>
            <p className="mt-3 text-sm leading-7 text-[#566A70]">Absence from the pilot does not mean an actor is uninvolved. Centrality does not establish corruption. Client-level records and private shelter locations are excluded.</p>
          </div>
        </div>
        <div className="mt-10 rounded-xl border-l-4 border-[#C79657] bg-[#EEE8DC] px-6 py-5 text-sm leading-7 text-[#4C5B60]">
          <strong>Research status:</strong> This is a preliminary institutional network, not a comprehensive accounting of homelessness spending, provider contracts, political activity, or housing outcomes. Where publicly available records stop, we will show a gap rather than infer what happened.
        </div>
      </section>

      <section id="sources" className="scroll-mt-12 border-t border-[#DED8CE] bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionKicker>06 / Evidence library</SectionKicker>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl sm:text-5xl">Start with the original records.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-[#52646B]">Selected sources from our 16-reference pilot. The expanded network will link individual relationships to their exact supporting records.</p>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {sources.map((source) => (
              <a key={source.id} href={source.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-xl border border-[#E2DED6] p-5 transition hover:border-[#B9905D] hover:bg-[#FBF8F1]">
                <span className="pt-0.5 text-xs font-bold text-[#A87946]">{source.id}</span>
                <span className="flex-1">
                  <span className="block font-semibold group-hover:underline">{source.label} ↗</span>
                  <span className="mt-2 block text-sm leading-6 text-[#68787D]">{source.note}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#102530] px-6 py-9 text-sm text-[#B6CBCE]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <p>© 2026 Civic Intelligence Lab · The Homelessness System</p>
          <Link href="/" className="font-medium hover:text-white hover:underline">Return to CivicIntel →</Link>
        </div>
      </footer>
    </main>
  );
}
