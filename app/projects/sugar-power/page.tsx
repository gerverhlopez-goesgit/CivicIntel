import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Politics of Sugar | Civic Intelligence Lab",
  description:
    "A CivicIntel research project exploring the history, economic impacts, and political networks behind U.S. sugar protections.",
};

const questions = [
  {
    number: "01",
    heading: "Who is involved?",
    text: "Identify the public agencies, industry organizations, trade interests, and political institutions connected to U.S. sugar policy.",
  },
  {
    number: "02",
    heading: "How did it develop?",
    text: "Trace key legislation, trade agreements, and the arguments used to justify or challenge protection.",
  },
  {
    number: "03",
    heading: "Who benefits and who pays?",
    text: "Study how the economic effects are distributed among growers, processors, manufacturers, and consumers.",
  },
];

const milestones = [
  {
    year: "1981",
    title: "Foundation of the modern program",
    text: "The Agriculture and Food Act established the structure underlying today's U.S. sugar program.",
  },
  {
    year: "2014",
    title: "U.S.–Mexico sugar agreements",
    text: "Trade arrangements introduced minimum prices and quantity limits on Mexican sugar shipped to the United States.",
  },
  {
    year: "2018",
    title: "Farm Bill reauthorization",
    text: "Congress continued the program, with the policy remaining part of federal agricultural law.",
  },
  {
    year: "2023",
    title: "Independent economic assessment",
    text: "The Government Accountability Office reviewed producer benefits, consumer costs, and the operation of import restrictions.",
  },
];

const networkNodes = [
  { id: "policy", x: 310, y: 166, r: 40, label: "Policy", color: "#DBAE71" },
  { id: "growers", x: 122, y: 68, r: 29, label: "Growers", color: "#8CB5A5" },
  { id: "congress", x: 515, y: 65, r: 33, label: "Congress", color: "#DF997E" },
  { id: "industry", x: 91, y: 258, r: 30, label: "Industry", color: "#8CB5A5" },
  { id: "agencies", x: 519, y: 262, r: 32, label: "Agencies", color: "#DF997E" },
  { id: "consumers", x: 317, y: 331, r: 29, label: "Consumers", color: "#B8C5D0" },
];
const networkEdges = [
  [310, 166, 122, 68],
  [310, 166, 515, 65],
  [310, 166, 91, 258],
  [310, 166, 519, 262],
  [310, 166, 317, 331],
  [122, 68, 91, 258],
  [515, 65, 519, 262],
  [91, 258, 317, 331],
] as const;

const sources = [
  {
    name: "USDA Economic Research Service",
    topic: "Sugar policy and program rules",
    url: "https://www.ers.usda.gov/topics/crops/sugar-and-sweeteners/policy",
  },
  {
    name: "Government Accountability Office",
    topic: "Independent sugar program assessment (2023)",
    url: "https://www.gao.gov/products/gao-24-106144",
  },
  {
    name: "Federal Election Commission",
    topic: "Disclosed federal campaign finance data",
    url: "https://www.fec.gov/data/",
  },
  {
    name: "Lobbying Disclosure Act Database",
    topic: "Federal lobbying filings",
    url: "https://lda.gov/",
  },
];

export default function SugarPowerPage() {
  return (
    <main className="min-h-screen bg-[#F7F4ED] text-[#162630]">
      <header className="border-b border-[#D9D4C9] bg-[#F7F4ED]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="text-sm font-semibold tracking-tight hover:underline">
            ← Civic Intelligence Lab
          </Link>
          <nav aria-label="Project navigation" className="flex flex-wrap gap-5 text-xs font-medium text-[#53636A] sm:text-sm">
            <a href="#research" className="hover:text-[#162630]">Research</a>
            <a href="#network" className="hover:text-[#162630]">Network</a>
            <a href="#history" className="hover:text-[#162630]">History</a>
            <a href="#methods" className="hover:text-[#162630]">Methods</a>
            <a href="#behavior" className="hover:text-[#162630]">Consumer Behavior</a>
          </nav>
        </div>
      </header>

      <section className="bg-[#162630] px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DBAE71]">
            CivicIntel / Research Project 001
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            The Politics <span className="text-[#DBAE71]">of Sugar</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#D7E0E0] sm:text-2xl">
            Who benefits, who pays, and who holds power?
          </p>
          <p className="mt-7 max-w-2xl leading-8 text-[#C3D0D1]">
            An ongoing investigation of how U.S. sugar protections emerged, which
            organizations participate in the system, and how the economic effects
            are shared across society.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#research" className="rounded-full bg-[#DBAE71] px-6 py-3 text-sm font-semibold text-[#162630] hover:bg-[#E8BE88]">
              Explore the research
            </a>
            <a href="#network" className="rounded-full border border-[#6D8589] px-6 py-3 text-sm font-semibold text-white hover:bg-[#24404B]">
              Preview the network
            </a>
          </div>
        </div>
      </section>

      <section id="research" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B3E]">01 / Research question</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">
          How are sugar protections created, sustained, and experienced?
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4B5C63]">
          Our research combines political economy and Social Network Analysis
          (SNA). We look beyond the law itself to study the relationships among
          institutions, economic interests, and the people affected by policy.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {questions.map((q) => (
            <article key={q.number} className="rounded-xl border border-[#DAD4C8] bg-white p-7">
              <p className="text-sm font-semibold text-[#A77F49]">{q.number}</p>
              <h3 className="mt-4 text-xl font-semibold">{q.heading}</h3>
              <p className="mt-3 text-sm leading-7 text-[#526169]">{q.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="network" className="scroll-mt-8 bg-[#E9EEE9] px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#607A6E]">02 / Social network analysis</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Mapping relationships, not just institutions.</h2>
            <p className="mt-5 leading-8 text-[#4B5C63]">
              Who is connected to whom? Who links industry and public decision-making?
              In the next phase, every node will identify a documented actor,
              and every relationship will be supported by a traceable source.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#4B5C63]">
              Planned filters: government, industry, lobbying, campaign finance,
              trade policy, and affected groups.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-[#1D3440] p-5 shadow-lg sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DBAE71]">Network preview</p>
              <span className="rounded-full border border-[#587078] px-3 py-1 text-[11px] text-[#CDDDDE]">Conceptual only</span>
            </div>
            <svg viewBox="0 0 620 390" role="img" aria-label="Concept diagram with generic actors connected to sugar policy; connections are illustrative, not research findings" className="mt-4 h-auto w-full">
              {networkEdges.map(([x1, y1, x2, y2], index) => (
                <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#88A0A7" strokeWidth="1.6" strokeOpacity="0.55" />
              ))}
              {networkNodes.map((node) => (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r={node.r + 11} fill={node.color} fillOpacity="0.12" />
                  <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="#162630">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-1 text-xs leading-5 text-[#C3D0D1]">
              Illustration of the planned experience. Lines do not imply documented influence or affiliation.
            </p>
          </div>
        </div>
      </section>

      <section id="history" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B3E]">03 / Policy history</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">How the modern system took shape.</h2>
        <p className="mt-5 max-w-3xl leading-8 text-[#4B5C63]">
          These selected milestones provide a starting point. The full investigation
          will reach farther back and examine the social and political context
          surrounding each major decision.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {milestones.map((item) => (
            <article key={item.year} className="border-l-2 border-[#C99B5C] bg-white p-6 shadow-sm">
              <p className="text-2xl font-semibold text-[#A77F49]">{item.year}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#526169]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="bg-[#162630] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DBAE71]">04 / Who gains and who pays?</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">The distribution of benefits matters.</h2>
            <p className="mt-5 leading-8 text-[#CCD8D9]">
              Policies can generate concentrated gains and widely distributed costs.
              We will compare producer benefits, consumer and manufacturer costs,
              rural economic arguments, and alternative policy proposals.
            </p>
          </div>
          <aside className="rounded-xl border border-[#45616B] bg-[#223C48] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DBAE71]">A question for further investigation</p>
            <p className="mt-4 text-3xl font-semibold">~$1 billion / year</p>
            <p className="mt-4 text-sm leading-7 text-[#C8D5D7]">
              Approximate net annual economic cost described in the U.S. Government
              Accountability Office's 2023 assessment, based on the research it reviewed.
              This is an estimate, not a current-year accounting total.
            </p>
            <a href="https://www.gao.gov/products/gao-24-106144" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-[#DBAE71] underline underline-offset-4">
              Read the GAO assessment ↗
            </a>
          </aside>
        </div>
      </section>

      <section id="methods" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B3E]">05 / Method and transparency</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Evidence before conclusions.</h2>
        <div className="mt-6 grid gap-7 text-sm leading-7 text-[#526169] md:grid-cols-2">
          <p>
            <strong className="text-[#162630]">Research scope.</strong> U.S. sugar protections,
            with relevant international trade relationships. The historical analysis
            will trace older policy origins; the initial network will prioritize
            publicly documented relationships from 2018 onward.
          </p>
          <p>
            <strong className="text-[#162630]">Standard of evidence.</strong> We distinguish
            reported relationships, estimated economic effects, and analytical
            interpretations. A political contribution or lobbying filing does
            not by itself demonstrate improper influence or causation.
          </p>
        </div>
        <h3 className="mt-12 text-xl font-semibold">Initial source library</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-[#DAD4C8] bg-white p-5 hover:border-[#B99261]">
              <p className="font-semibold group-hover:underline">{source.name} ↗</p>
              <p className="mt-2 text-sm text-[#526169]">{source.topic}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Related Research: Behavioral Economics */}
      <section
        id="behavior"
        className="border-t border-[#DAD4C8] bg-[#F7F4ED] px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B3E]">
            Related Research / Behavioral Economics
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The Behavioral Economics of Sugar
          </h2>

          <p className="mt-6 max-w-3xl leading-8 text-[#4B5C63]">
            Sugar consumption is shaped not only by prices and
            government policy, but also by the environments in
            which consumers make purchasing decisions.
          </p>

          <div className="mt-10 rounded-xl border border-[#DAD4C8] bg-white p-8">
            <p className="text-sm font-medium text-[#8C6B3E]">
              Featured Research · Cardinali et al. (2026)
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              Temptation &amp; Limited Attention
            </h3>

            <p className="mt-5 text-4xl font-semibold text-[#63867A]">
              17%
            </p>

            <p className="mt-2 text-sm text-[#526169]">
              Relative decline in single-serving candy sales share
              following self-checkout adoption.
            </p>

            <p className="mt-6 leading-7 text-[#526169]">
              Research using supermarket transaction data finds
              that the adoption of self-checkout is associated with
              fewer impulse candy purchases. The evidence is
              consistent with limited attention reducing temptation.
            </p>

            <p className="mt-4 text-sm text-[#526169]">
              Working paper · April 2026 · Not peer-reviewed
              · Transaction data from 2008–2011
            </p>

            <a
              href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6809309"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-semibold text-[#8C6B3E] underline underline-offset-4"
            >
              Read the Research Paper ↗
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-[#DAD4C8] bg-[#EFE9DD] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B3E]">What comes next</p>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">From concept to an evidence-backed network.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#526169]">
            This is the research concept and page architecture (Option A).
            Option B will build a documented dataset of organizations and connections.
            Option C will turn that dataset into an interactive exploration.
          </p>
        </div>
      </section>

      <footer className="bg-[#162630] px-6 py-8 text-sm text-[#BDCFD0]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p>© 2026 Civic Intelligence Lab</p>
          <Link href="/" className="hover:text-white hover:underline">Return to CivicIntel</Link>
        </div>
      </footer>
    </main>
  );
}
