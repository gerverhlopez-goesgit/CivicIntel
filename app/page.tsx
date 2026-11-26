// Civic Intelligence Lab — Homepage 2.0
// Replace ONLY app/page.tsx with this file.
// No new dependencies are required.

const researchAreas = [
  {
    number: "01",
    title: "Social Network Analysis",
    description: "Map documented relationships among institutions, people, and policies.",
  },
  {
    number: "02",
    title: "Political Economy",
    description: "Examine how incentives, public decisions, and economic interests intersect.",
  },
  {
    number: "03",
    title: "Housing & Homelessness",
    description: "Study public funding, housing systems, service delivery, and accountability.",
  },
  {
    number: "04",
    title: "Urban Economics",
    description: "Explore how markets, infrastructure, and location shape opportunity.",
  },
  {
    number: "05",
    title: "Environmental Economics",
    description: "Investigate environmental policies, trade-offs, and long-run impacts.",
  },
  {
    number: "06",
    title: "Spatial Analysis",
    description: "Connect evidence to the geography of cities and communities.",
  },
];

const navigation = [
  { label: "Projects", href: "#projects" },
  { label: "Networks", href: "#networks" },
  { label: "Research", href: "#research" },
  { label: "Data & Methods", href: "#data" },
  { label: "About", href: "#about" },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 19 19 5M8 5h11v11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12h16m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A conceptual diagram only. No research claims are represented by these links.
function HeroNetwork() {
  const connections = [
    [270, 215, 101, 83], [270, 215, 425, 83], [270, 215, 79, 296],
    [270, 215, 438, 312], [270, 215, 282, 49], [270, 215, 284, 381],
    [101, 83, 282, 49], [425, 83, 438, 312], [79, 296, 284, 381],
    [101, 83, 79, 296], [282, 49, 425, 83], [284, 381, 438, 312],
    [101, 83, 438, 312], [79, 296, 425, 83],
  ];
  const satellites = [
    { x: 101, y: 83, color: "#75B4AA", label: "Institutions", dx: -56, dy: -23 },
    { x: 425, y: 83, color: "#D99B80", label: "Policy", dx: 19, dy: -11 },
    { x: 79, y: 296, color: "#91A8D1", label: "Communities", dx: -25, dy: 34 },
    { x: 438, y: 312, color: "#75B4AA", label: "Markets", dx: 16, dy: 28 },
    { x: 282, y: 49, color: "#D99B80", label: "Evidence", dx: 18, dy: -17 },
    { x: 284, y: 381, color: "#91A8D1", label: "Research", dx: 14, dy: 24 },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[570px]" aria-hidden="true">
      <div className="absolute inset-8 rounded-full bg-[#CBA66E]/5 blur-3xl" />
      <svg viewBox="0 0 540 430" className="relative h-auto w-full" role="presentation">
        <circle cx="270" cy="215" r="178" fill="none" stroke="#56717A" strokeWidth="1" strokeDasharray="3 10" opacity="0.42" />
        <circle cx="270" cy="215" r="111" fill="none" stroke="#56717A" strokeWidth="1" opacity="0.38" />
        {connections.map(([x1, y1, x2, y2], index) => (
          <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={index < 6 ? "#D4AB72" : "#7899A3"} strokeWidth={index < 6 ? "1.6" : "1"} opacity={index < 6 ? "0.56" : "0.26"} />
        ))}
        {satellites.map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="25" fill={node.color} opacity="0.10" />
            <circle cx={node.x} cy={node.y} r="10" fill={node.color} />
            <circle cx={node.x} cy={node.y} r="3" fill="#10232D" />
            <text x={node.x + node.dx} y={node.y + node.dy} fill="#C9D7D9" fontSize="13" letterSpacing="0.2">{node.label}</text>
          </g>
        ))}
        <circle cx="270" cy="215" r="65" fill="#D4AB72" opacity="0.09" className="motion-safe:animate-pulse" />
        <circle cx="270" cy="215" r="45" fill="#D4AB72" />
        <text x="270" y="220" fill="#10232D" fontSize="15" fontWeight="700" textAnchor="middle">CivicIntel</text>
      </svg>
      <p className="mt-3 text-center text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#88A2A7]">
        An illustration of interconnected systems
      </p>
    </div>
  );
}

function ProjectNetwork({ variant }: { variant: "sugar" | "homelessness" }) {
  const points = variant === "sugar"
    ? [
        { x: 50, y: 105, r: 10, c: "#78B6A7" }, { x: 128, y: 43, r: 12, c: "#D9A078" },
        { x: 171, y: 109, r: 20, c: "#E1B676" }, { x: 265, y: 48, r: 12, c: "#8AABCD" },
        { x: 312, y: 114, r: 10, c: "#78B6A7" }, { x: 247, y: 166, r: 12, c: "#D9A078" },
        { x: 105, y: 167, r: 9, c: "#8AABCD" },
      ]
    : [
        { x: 48, y: 49, r: 11, c: "#D9A078" }, { x: 143, y: 44, r: 12, c: "#78B6A7" },
        { x: 205, y: 111, r: 19, c: "#E1B676" }, { x: 313, y: 47, r: 11, c: "#8AABCD" },
        { x: 307, y: 158, r: 11, c: "#78B6A7" }, { x: 121, y: 164, r: 12, c: "#D9A078" },
        { x: 54, y: 119, r: 9, c: "#8AABCD" },
      ];
  const edges = [[0, 1], [0, 6], [1, 2], [1, 3], [2, 3], [2, 4], [2, 5], [2, 6], [3, 4], [5, 6]];

  return (
    <svg viewBox="0 0 360 210" className="h-full w-full" aria-hidden="true">
      <circle cx="180" cy="108" r="94" fill="none" stroke="#5C7882" strokeDasharray="3 7" opacity=".35" />
      {edges.map(([a, b], i) => (
        <line key={i} x1={points[a].x} y1={points[a].y} x2={points[b].x} y2={points[b].y} stroke={i < 4 ? "#CFA86F" : "#86A5AE"} strokeWidth="1.5" opacity={i < 4 ? ".68" : ".36"} />
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.r * 1.65} fill={p.c} opacity=".10" />
          <circle cx={p.x} cy={p.y} r={p.r} fill={p.c} />
        </g>
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#142832]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#142832]">
        Skip to content
      </a>

      {/* Site navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10232D]/95 text-white shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Civic Intelligence Lab home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#CBA66E]/60 text-sm font-bold tracking-tight text-[#DDB778]">CI</span>
            <span className="text-sm font-semibold tracking-wide sm:text-base">Civic Intelligence Lab</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-[#CFDDDF] transition hover:text-[#E7BD80] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7BD80]">
                {item.label}
              </a>
            ))}
          </nav>
          <details className="group relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-white/25 px-3 py-2 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7BD80] [&::-webkit-details-marker]:hidden">
              Menu
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-12 w-60 rounded-xl border border-[#3B5661] bg-[#152D38] p-2 shadow-2xl">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm text-[#E4EBEA] hover:bg-white/10 hover:text-[#E7BD80]">
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>

      {/* Editorial hero */}
      <section id="main-content" className="relative isolate overflow-hidden bg-[#10232D] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-28 h-80 w-80 rounded-full bg-[#8FB9AF]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#D0A16A]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-28">
          <div>
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.23em] text-[#E0B77B]">
              Independent research · Interactive intelligence
            </p>
            <h1 className="max-w-3xl font-serif text-[clamp(3.1rem,6vw,5.9rem)] leading-[1.07] tracking-tight">
              Making the invisible systems shaping our world <em className="font-normal text-[#E0B77B]">visible.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#C6D6D9] sm:text-lg">
              Explore the institutions, economic incentives, public decisions, and documented relationships that shape communities and everyday life.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-3 rounded-full bg-[#E0B77B] px-6 py-3.5 text-sm font-semibold text-[#10232D] transition hover:bg-[#F1CB96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0B77B]">
                Explore investigations <ArrowIcon />
              </a>
              <a href="#networks" className="inline-flex items-center gap-3 rounded-full border border-[#66818A] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#E0B77B] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0B77B]">
                Interactive networks <ArrowIcon diagonal />
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroNetwork />
          </div>
        </div>
        <div className="border-t border-[#344B55]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-5 py-5 text-center text-xs uppercase tracking-[0.16em] text-[#9BB5BC] sm:grid-cols-3 sm:gap-6 sm:px-8">
            <span className="flex items-baseline justify-center gap-2"><strong className="text-base font-semibold text-[#E0B77B]">02</strong>Interactive networks</span>
            <span className="flex items-baseline justify-center gap-2"><strong className="text-base font-semibold text-[#E0B77B]">03</strong>Research projects</span>
            <span className="flex items-center justify-center">Source-aware · Evidence-first</span>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section id="projects" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A703A]">01 / Featured investigations</p>
              <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Explore the research.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#52646B]">Follow the questions, inspect the evidence, and explore interactive maps that reveal how systems connect.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Existing Sugar research page and network — both links preserved */}
            <article className="overflow-hidden rounded-2xl border border-[#DADFD9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden bg-[#132C36] p-5">
                <span className="absolute left-6 top-5 z-10 rounded-full border border-[#8B9FA4]/50 bg-[#132C36]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#DFB87A]">Political economy</span>
                <ProjectNetwork variant="sugar" />
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B704F]">Research 001 · Live investigation</p>
                <h3 className="mt-3 font-serif text-3xl">The Politics of Sugar</h3>
                <p className="mt-4 max-w-xl leading-7 text-[#52646B]">Who benefits, who pays, and who holds power? Explore the institutions, economic interests, and policy relationships behind U.S. sugar protections.</p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#E3E5E0] pt-6">
                  <a href="/projects/sugar-power" className="inline-flex items-center gap-2 text-sm font-semibold text-[#184456] underline-offset-4 hover:underline">Read the investigation <ArrowIcon /></a>
                  <a href="/projects/sugar-power/network" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A703A] underline-offset-4 hover:underline">Explore network <ArrowIcon diagonal /></a>
                </div>
              </div>
            </article>

            {/* Existing homelessness research page and network — both links preserved */}
            <article className="overflow-hidden rounded-2xl border border-[#DADFD9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden bg-[#132C36] p-5">
                <span className="absolute left-6 top-5 z-10 rounded-full border border-[#8B9FA4]/50 bg-[#132C36]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#DFB87A]">Public policy</span>
                <ProjectNetwork variant="homelessness" />
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B704F]">Research 002 · Live investigation</p>
                <h3 className="mt-3 font-serif text-3xl">The Homelessness System</h3>
                <p className="mt-4 max-w-xl leading-7 text-[#52646B]">Follow public funding, government institutions, service providers, and oversight relationships in Alameda County's homelessness response.</p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#E3E5E0] pt-6">
                  <a href="/projects/homelessness" className="inline-flex items-center gap-2 text-sm font-semibold text-[#184456] underline-offset-4 hover:underline">Read the investigation <ArrowIcon /></a>
                  <a href="/projects/homelessness/network" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A703A] underline-offset-4 hover:underline">Explore network <ArrowIcon diagonal /></a>
                </div>
              </div>
            </article>
          </div>

          {/* Original Quantifying Welfare project retained, with no invented destination */}
          <article className="mt-6 grid gap-6 rounded-2xl border border-[#DADFD9] bg-[#EDEFE9] p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66776B]">Research in development · Urban economics</p>
              <h3 className="mt-3 font-serif text-3xl">Quantifying Welfare</h3>
              <p className="mt-3 max-w-3xl leading-7 text-[#52646B]">Developing tools and methods to understand how economic, environmental, and spatial conditions shape quality of life across places and communities.</p>
            </div>
            <span className="w-fit rounded-full border border-[#B3C0B5] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#53695B]">In development</span>
          </article>
        </div>
      </section>

      {/* Interactive network spotlight */}
      <section id="networks" className="scroll-mt-24 bg-[#142D38] px-5 py-20 text-white sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#E0B77B]">02 / Interactive intelligence</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">Don't just read the story. <em className="font-normal text-[#E0B77B]">Explore the connections.</em></h2>
            <p className="mt-6 max-w-xl leading-8 text-[#C6D6D9]">Our network explorers let you examine actors, filter types of relationships, trace documented paths, and open supporting evidence—all within the same investigation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/projects/sugar-power/network" className="inline-flex items-center gap-2 rounded-full border border-[#64828A] px-5 py-3 text-sm font-semibold transition hover:border-[#E0B77B] hover:bg-white/10">Sugar network <ArrowIcon diagonal /></a>
              <a href="/projects/homelessness/network" className="inline-flex items-center gap-2 rounded-full border border-[#64828A] px-5 py-3 text-sm font-semibold transition hover:border-[#E0B77B] hover:bg-white/10">Homelessness network <ArrowIcon diagonal /></a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { number: "01", heading: "Find an actor", body: "Explore organizations and institutions represented in the public records." },
              { number: "02", heading: "Trace a link", body: "See how documented connections join different parts of a system." },
              { number: "03", heading: "Inspect evidence", body: "Open supporting sources and understand what each relationship means." },
            ].map((feature) => (
              <div key={feature.number} className="rounded-xl border border-[#46616B] bg-[#1D3A46] p-6 sm:min-h-60">
                <span className="font-serif text-4xl text-[#E0B77B]">{feature.number}</span>
                <h3 className="mt-6 text-lg font-semibold">{feature.heading}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C0D0D4]">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research areas */}
      <section id="research" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A703A]">03 / Areas of inquiry</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">Across disciplines. Connected by evidence.</h2>
          <div className="mt-12 grid gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <div key={area.number} className="border-t border-[#C9D0C9] py-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#9A703A]">{area.number}</p>
                <h3 className="mt-3 text-lg font-semibold">{area.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#52646B]">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology and transparency */}
      <section id="data" className="scroll-mt-24 border-y border-[#DEE3DB] bg-white px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A703A]">04 / Data & methods</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">A clear view of the evidence behind the map.</h2>
            <p className="mt-6 max-w-lg leading-8 text-[#52646B]">Network diagrams are tools for investigation, not automatic proof of influence or causation. CivicIntel distinguishes documented relationships, estimated effects, and open research questions.</p>
          </div>
          <div className="space-y-0">
            {[
              { number: "01", title: "Traceable sources", body: "Connect relationships to the public documents supporting them." },
              { number: "02", title: "Clear definitions", body: "Distinguish funding awards, spending, contracts, advocacy, and oversight." },
              { number: "03", title: "Visible limitations", body: "Identify gaps, uncertainty, and the boundaries of each dataset." },
            ].map((step) => (
              <div key={step.number} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[#E2E8E2] py-6 first:pt-0">
                <span className="font-serif text-2xl text-[#A17B4D]">{step.number}</span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#52646B]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[#EAEDE7] px-7 py-12 sm:px-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8C713D]">05 / About the lab</p>
          <div className="mt-5 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Research for a more understandable world.</h2>
            <p className="leading-8 text-[#52646B]">Civic Intelligence Lab is an independent research initiative bringing together economics, public policy, social network analysis, and technology. Its purpose is to make complex systems easier to investigate, question, and understand.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#10232D] px-5 py-10 text-[#D6E1E2] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold tracking-wide text-white">Civic Intelligence Lab</p>
            <p className="mt-2 text-xs text-[#99B0B5]">© 2026 Civic Intelligence Lab · civicintel.world</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="#projects" className="hover:text-[#E0B77B]">Projects</a>
            <a href="#networks" className="hover:text-[#E0B77B]">Networks</a>
            <a href="#data" className="hover:text-[#E0B77B]">Data & methods</a>
            <a href="#about" className="hover:text-[#E0B77B]">About</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
