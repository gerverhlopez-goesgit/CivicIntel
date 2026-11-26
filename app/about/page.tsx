import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Civic Intelligence Lab",
  description:
    "Meet CivicIntel, an independent student-led research initiative combining political economy, environmental economics, and chemical engineering to make complex systems understandable.",
  openGraph: {
    title: "About Civic Intelligence Lab | CivicIntel",
    description:
      "Two interdisciplinary perspectives. One commitment to transparent, evidence-based research into policy, economics, engineering, and communities.",
    url: "/about",
    siteName: "Civic Intelligence Lab",
    type: "website",
  },
};

const principles = [
  {
    number: "01",
    title: "Start with evidence",
    description:
      "We connect claims to verifiable sources, distinguish observed relationships from interpretations, and avoid treating correlation as proof of causation.",
  },
  {
    number: "02",
    title: "Show the trade-offs",
    description:
      "We ask who benefits, who bears the costs, what constraints exist, and how alternative decisions might affect different communities.",
  },
  {
    number: "03",
    title: "Make methods visible",
    description:
      "We aim to explain data choices, assumptions, limitations, and uncertainty so others can question and build on the research.",
  },
  {
    number: "04",
    title: "Make research accessible",
    description:
      "We use clear language and interactive tools to help people explore complex systems without needing specialized training.",
  },
];

const process = [
  {
    number: "01",
    title: "Frame the question",
    description:
      "Identify the public problem, decision-makers, communities, and outcomes that matter.",
  },
  {
    number: "02",
    title: "Map the system",
    description:
      "Follow institutions, public records, financial flows, infrastructure, and documented relationships.",
  },
  {
    number: "03",
    title: "Examine the mechanisms",
    description:
      "Bring economic reasoning and engineering considerations together to test what may be driving outcomes.",
  },
  {
    number: "04",
    title: "Share the evidence",
    description:
      "Present findings through research briefs, clear visuals, sources, and explicit limitations.",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M5 19 19 5M8 5h11v11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M4 12h16m-7-7 7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Conceptual illustration; its lines do not represent empirical claims. */
function SystemsIllustration() {
  const nodes = [
    { x: 70, y: 74, r: 10, c: "#77B6AC" },
    { x: 237, y: 44, r: 11, c: "#D59B7D" },
    { x: 395, y: 100, r: 10, c: "#89A7CD" },
    { x: 455, y: 237, r: 12, c: "#77B6AC" },
    { x: 267, y: 302, r: 11, c: "#D59B7D" },
    { x: 76, y: 245, r: 12, c: "#89A7CD" },
    { x: 260, y: 174, r: 29, c: "#E0B77B" },
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
  ];
  return (
    <div className="relative w-full max-w-[540px]" aria-hidden="true">
      <div className="absolute inset-7 rounded-full bg-[#D4AF77]/5 blur-3xl" />
      <svg className="relative h-auto w-full" viewBox="0 0 520 350" fill="none">
        <circle cx="260" cy="174" r="151" stroke="#55727A" opacity=".35" strokeDasharray="3 9" />
        <circle cx="260" cy="174" r="96" stroke="#6E8B94" opacity=".30" />
        {links.map(([a, b], index) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={index > 5 ? "#D5AD75" : "#78929A"}
            strokeWidth="1.2"
            opacity={index > 5 ? ".70" : ".35"}
          />
        ))}
        {nodes.map((node, index) => (
          <g key={index}>
            <circle cx={node.x} cy={node.y} r={node.r + 13} fill={node.c} opacity=".12" />
            <circle cx={node.x} cy={node.y} r={node.r} fill={node.c} />
            {index === 6 && (
              <text
                x={node.x}
                y={node.y + 4}
                fill="#10232D"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
              >
                CI
              </text>
            )}
          </g>
        ))}
        <text x="36" y="47" fill="#C5D6D7" fontSize="12">Institutions</text>
        <text x="242" y="17" textAnchor="middle" fill="#C5D6D7" fontSize="12">Evidence</text>
        <text x="403" y="67" fill="#C5D6D7" fontSize="12">Policy</text>
        <text x="439" y="273" fill="#C5D6D7" fontSize="12">Technology</text>
        <text x="278" y="333" fill="#C5D6D7" fontSize="12">Research</text>
        <text x="15" y="281" fill="#C5D6D7" fontSize="12">Communities</text>
      </svg>
      <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#8BA8B0]">
        An illustration of interconnected systems
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#142832]">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#142832] focus:not-sr-only"
      >
        Skip to content
      </a>

      {/* Shared visual language with the CivicIntel homepage. */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10232D]/95 text-white shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Civic Intelligence Lab home">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#CBA66E]/60 text-sm font-bold tracking-tight text-[#DDB778]">
              CI
            </span>
            <span className="text-sm font-semibold tracking-wide sm:text-base">
              Civic Intelligence Lab
            </span>
          </a>
          <nav aria-label="About page navigation" className="hidden items-center gap-7 lg:flex">
            <a className="text-sm text-[#CFDDDF] transition hover:text-[#E7BD80]" href="/#projects">Projects</a>
            <a className="text-sm text-[#CFDDDF] transition hover:text-[#E7BD80]" href="#mission">Mission</a>
            <a className="text-sm text-[#CFDDDF] transition hover:text-[#E7BD80]" href="#team">Team</a>
            <a className="text-sm text-[#CFDDDF] transition hover:text-[#E7BD80]" href="#approach">Approach</a>
            <a className="text-sm font-semibold text-[#E7BD80]" href="#principles" aria-label="Research principles section">Principles</a>
          </nav>
          <details className="group relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-white/25 px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7BD80] [&::-webkit-details-marker]:hidden">
              Menu
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </summary>
            <nav aria-label="Mobile About navigation" className="absolute right-0 top-12 w-60 rounded-xl border border-[#3B5661] bg-[#152D38] p-2 shadow-2xl">
              {[
                { name: "Home", href: "/" },
                { name: "Projects", href: "/#projects" },
                { name: "Mission", href: "#mission" },
                { name: "Team", href: "#team" },
                { name: "Approach", href: "#approach" },
                { name: "Principles", href: "#principles" },
              ].map((item) => (
                <a key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm text-[#E4EBEA] hover:bg-white/10 hover:text-[#E7BD80]">
                  {item.name}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>

      {/* Hero */}
      <section id="main-content" className="relative isolate overflow-hidden bg-[#10232D] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#8FB9AF]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#D0A16A]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E0B77B]">
              About Civic Intelligence Lab
            </p>
            <h1 className="mt-7 max-w-3xl font-serif text-[clamp(3rem,5.2vw,5.4rem)] leading-[1.07] tracking-tight">
              Understanding the systems behind the <em className="font-normal text-[#E0B77B]">decisions.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#C6D6D9] sm:text-lg">
              An independent, student-led research initiative connecting economics, public policy, engineering, and evidence to make complex systems easier to understand.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#team" className="inline-flex items-center gap-3 rounded-full bg-[#E0B77B] px-6 py-3.5 text-sm font-semibold text-[#10232D] transition hover:bg-[#F1CB96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0B77B]">
                Meet the team <ArrowIcon />
              </a>
              <a href="#approach" className="inline-flex items-center gap-3 rounded-full border border-[#66818A] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#E0B77B] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0B77B]">
                How we work <ArrowIcon diagonal />
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <SystemsIllustration />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A703A]">01 / Our mission</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Making complex systems <em className="font-normal text-[#9A703A]">understandable.</em>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#52646B] sm:text-lg">
            <p>
              Civic Intelligence Lab (CivicIntel) investigates how public policies, economic incentives, institutions, industries, and technological systems interact to shape communities and everyday life.
            </p>
            <p>
              We believe these relationships should be easier to explore. Through data analysis, interactive network maps, and evidence-based research, we aim to make the forces behind public decisions more visible and accessible.
            </p>
            <p className="border-l-2 border-[#D1A46C] pl-6 font-serif text-xl leading-8 text-[#142832] sm:text-2xl">
              Our work asks how systems operate, who benefits and bears the costs, and what could be improved.
            </p>
          </div>
        </div>
      </section>

      {/* Team and complementary disciplines */}
      <section id="team" className="scroll-mt-24 border-y border-[#E0E5DD] bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A703A]">02 / Who we are</p>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
            <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Different disciplines. A shared commitment to evidence.
            </h2>
            <p className="max-w-xl leading-8 text-[#52646B]">
              CivicIntel brings together two UC Berkeley seniors whose academic training offers complementary ways of understanding public problems. The initiative is student-led and independent of UC Berkeley as an institution.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-2xl border border-[#D9DFD9] bg-[#F7F7F2] p-7 sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E3E8E1] text-[#376272]">
                  <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="2">
                    <path d="M8 36h32M11 30l10-11 8 7 9-15" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="11" cy="30" r="2" fill="currentColor" /><circle cx="21" cy="19" r="2" fill="currentColor" /><circle cx="29" cy="26" r="2" fill="currentColor" /><circle cx="38" cy="11" r="2" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C713D]">Policy & economics</span>
              </div>
              <h3 className="mt-8 font-serif text-3xl leading-tight">Political Economy & Environmental Economics</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#35505B]">
                Political Economy — International Trade and Economic Analysis concentration
              </p>
              <p className="text-sm font-semibold leading-7 text-[#35505B]">Second major: Environmental Economics and Policy</p>
              <p className="mt-5 leading-8 text-[#52646B]">
                This perspective examines how institutions make decisions, how markets and incentives shape behavior, how resources are distributed, and how policies affect communities and the environment.
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {['Economic analysis', 'Public policy', 'International trade', 'Environmental regulation'].map((item) => (
                  <span key={item} className="rounded-full border border-[#C9D2CA] px-3 py-1.5 text-xs font-medium text-[#4F6266]">{item}</span>
                ))}
              </div>
            </article>

            <article className="flex h-full flex-col rounded-2xl border border-[#D9DFD9] bg-[#F7F7F2] p-7 sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECE7DB] text-[#8B704F]">
                  <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="2">
                    <path d="M18 7v15L9 38a2 2 0 0 0 2 3h26a2 2 0 0 0 2-3L30 22V7M15 7h18M14 31h20" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="22" cy="35" r="2" fill="currentColor" /><circle cx="29" cy="27" r="2" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C713D]">Engineering & systems</span>
              </div>
              <h3 className="mt-8 font-serif text-3xl leading-tight">Chemical Engineering & Technical Systems</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#35505B]">Chemical Engineering — UC Berkeley senior</p>
              <p className="mt-5 leading-8 text-[#52646B]">
                This perspective contributes foundations in physical and industrial processes, material and energy balances, technical feasibility, and the constraints that shape real-world solutions.
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {['Process engineering', 'Energy & materials', 'Technical feasibility', 'Industrial systems'].map((item) => (
                  <span key={item} className="rounded-full border border-[#C9D2CA] px-3 py-1.5 text-xs font-medium text-[#4F6266]">{item}</span>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-6 rounded-2xl bg-[#142D38] p-7 text-white sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E0B77B]">Why it matters</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight">Policy meets physical reality.</h3>
              </div>
              <p className="leading-8 text-[#C5D6D9]">
                Policies operate through real infrastructure, industries, and technologies. Bringing these perspectives together helps CivicIntel examine not only why decisions are made and who is affected, but also whether proposed solutions are technically and economically realistic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research approach */}
      <section id="approach" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A703A]">03 / Our approach</p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">From a question to a clearer picture.</h2>
            </div>
            <p className="max-w-lg leading-8 text-[#52646B]">
              Our approach combines institutional research, quantitative analysis, engineering context, and accessible visual storytelling. The exact methods depend on the question and available evidence.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <article key={step.number} className="rounded-2xl border border-[#DADFD9] bg-white p-7">
                <span className="font-serif text-4xl text-[#B38954]">{step.number}</span>
                <h3 className="mt-7 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#52646B]">{step.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { question: "How does it work?", context: "Map institutions, technical systems, and relationships." },
              { question: "Who gains and who pays?", context: "Examine incentives, trade-offs, and distributional impacts." },
              { question: "What can be improved?", context: "Evaluate alternatives against evidence and constraints." },
            ].map((item) => (
              <div key={item.question} className="border-l-2 border-[#C49B67] pl-5">
                <p className="font-serif text-xl text-[#142832]">{item.question}</p>
                <p className="mt-2 text-sm leading-7 text-[#52646B]">{item.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research principles */}
      <section id="principles" className="scroll-mt-24 bg-[#142D38] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#E0B77B]">04 / Research principles</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Credibility is built into the process.</h2>
          <p className="mt-6 max-w-2xl leading-8 text-[#C5D6D9]">
            A network map can reveal connections, but a diagram alone cannot establish influence, intent, or causation. We treat sourcing, definitions, and uncertainty as part of the story.
          </p>
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {principles.map((principle) => (
              <article key={principle.number} className="border-t border-[#516D76] pt-6">
                <span className="text-xs font-bold tracking-[0.2em] text-[#E0B77B]">{principle.number}</span>
                <h3 className="mt-4 text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-[#C5D6D9]">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investigations and emerging research areas */}
      <section id="work" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A703A]">05 / Explore our work</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-7">
            <h2 className="max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">Research you can investigate.</h2>
            <a href="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#184456] underline-offset-4 hover:underline">
              View all projects <ArrowIcon diagonal />
            </a>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col rounded-2xl border border-[#DADFD9] bg-white p-7 shadow-sm sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#9A703A]">Live investigation · Political economy</p>
              <h3 className="mt-4 font-serif text-3xl">The Politics of Sugar</h3>
              <p className="mt-4 flex-1 leading-7 text-[#52646B]">
                Explore the institutions, economic incentives, and policy relationships behind U.S. sugar protections.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#E3E5E0] pt-6">
                <a href="/projects/sugar-power" className="inline-flex items-center gap-2 text-sm font-semibold text-[#184456] hover:underline">Read the research <ArrowIcon /></a>
                <a href="/projects/sugar-power/network" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A703A] hover:underline">Explore network <ArrowIcon diagonal /></a>
              </div>
            </article>
            <article className="flex flex-col rounded-2xl border border-[#DADFD9] bg-white p-7 shadow-sm sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#9A703A]">Live investigation · Public policy</p>
              <h3 className="mt-4 font-serif text-3xl">The Homelessness System</h3>
              <p className="mt-4 flex-1 leading-7 text-[#52646B]">
                Follow documented public funding, service providers, governance, and oversight relationships in Alameda County.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#E3E5E0] pt-6">
                <a href="/projects/homelessness" className="inline-flex items-center gap-2 text-sm font-semibold text-[#184456] hover:underline">Read the research <ArrowIcon /></a>
                <a href="/projects/homelessness/network" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A703A] hover:underline">Explore network <ArrowIcon diagonal /></a>
              </div>
            </article>
          </div>
          <div className="mt-6 rounded-2xl border border-[#D2DAD0] bg-[#EAEDE7] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.19em] text-[#8C713D]">An area to develop together</p>
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl">Energy, environment & infrastructure</h3>
            <p className="mt-4 max-w-3xl leading-8 text-[#52646B]">
              Combining economic policy evaluation with engineering analysis could help us investigate building electrification, industrial energy use, water systems, and the costs and feasibility of environmental solutions. These are prospective directions, not published investigations.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#E7EDE7] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C713D]">Continue exploring</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">See the questions, relationships, and evidence behind our investigations.</h2>
          </div>
          <a href="/#projects" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#142D38] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#234554]">
            Explore investigations <ArrowIcon diagonal />
          </a>
        </div>
      </section>

      <footer className="bg-[#10232D] px-5 py-10 text-[#D6E1E2] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-start">
          <div>
            <a href="/" className="font-semibold tracking-wide text-white hover:text-[#E0B77B]">Civic Intelligence Lab</a>
            <p className="mt-2 text-xs text-[#99B0B5]">© 2026 Civic Intelligence Lab · civicintel.world</p>
            <p className="mt-2 max-w-lg text-xs leading-5 text-[#91A9AE]">
              Independent student-led initiative; not an official research unit of the University of California, Berkeley.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="/" className="hover:text-[#E0B77B]">Home</a>
            <a href="/#projects" className="hover:text-[#E0B77B]">Projects</a>
            <a href="#team" className="hover:text-[#E0B77B]">Team</a>
            <a href="#principles" className="hover:text-[#E0B77B]">Principles</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
