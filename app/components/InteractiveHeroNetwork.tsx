"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";

// Educational illustration: these are concepts, not observed research relationships.
// For documented connections, use the Sugar Power and Homelessness network explorers.
const nodes = [
  {
    id: "institutions",
    x: 101, y: 83,
    color: "#75B4AA", label: "Institutions", dx: -56, dy: -23,
    heading: "Institutions are nodes",
    detail: "In Social Network Analysis (SNA), a node represents an actor: an agency, nonprofit, company, or person. We can study how institutions are connected through verified relationships.",
  },
  {
    id: "policy",
    x: 425, y: 83,
    color: "#D99B80", label: "Policy", dx: 19, dy: -11,
    heading: "Policies connect decisions to actors",
    detail: "A law, grant program, or public decision can be linked to the institutions involved. The type and date of each relationship matter as much as the connection itself.",
  },
  {
    id: "communities",
    x: 79, y: 296,
    color: "#91A8D1", label: "Communities", dx: -25, dy: 34,
    heading: "Networks have real-world effects",
    detail: "SNA helps frame who participates in a system and who may be affected. Our research uses aggregate community outcomes, not private information about individuals.",
  },
  {
    id: "markets",
    x: 438, y: 312,
    color: "#75B4AA", label: "Markets", dx: 16, dy: 28,
    heading: "Connections have different meanings",
    detail: "A grant, contract, partnership, and lobbying disclosure are different types of relationships. We label each separately instead of treating every line as proof of influence.",
  },
  {
    id: "evidence",
    x: 282, y: 49,
    color: "#D99B80", label: "Evidence", dx: 18, dy: -17,
    heading: "Every line needs evidence",
    detail: "In a research network, each connection should have a supporting source, a date, and a clear description. An apparent connection is not necessarily a causal relationship.",
  },
  {
    id: "research",
    x: 284, y: 381,
    color: "#91A8D1", label: "Research", dx: 14, dy: 24,
    heading: "Patterns become research questions",
    detail: "Network measures can show highly connected actors, bridges, and clusters. They describe the available records; they do not automatically measure power or wrongdoing.",
  },
] as const;

type NodeId = (typeof nodes)[number]["id"] | "civicintel";

const connections: { from: NodeId; to: NodeId }[] = [
  { from: "civicintel", to: "institutions" },
  { from: "civicintel", to: "policy" },
  { from: "civicintel", to: "communities" },
  { from: "civicintel", to: "markets" },
  { from: "civicintel", to: "evidence" },
  { from: "civicintel", to: "research" },
  { from: "institutions", to: "evidence" },
  { from: "policy", to: "markets" },
  { from: "communities", to: "research" },
  { from: "institutions", to: "communities" },
  { from: "evidence", to: "policy" },
  { from: "research", to: "markets" },
  { from: "institutions", to: "markets" },
  { from: "communities", to: "policy" },
];

const center = { x: 270, y: 215 };
const intro = {
  heading: "What is Civic Intelligence Lab?",
  detail: "Civic Intelligence Lab is an independent research initiative dedicated to making complex systems easier to understand. We investigate how public policy, economic incentives, institutions, and financial relationships shape our communities. Through data analysis, interactive networks, interdisciplines, and evidence basedresearch, we make hidden connections visible; we help people explore who makes decisions, the who gets what, when and why, and who is affected.",
};

export default function InteractiveHeroNetwork() {
  const [hoveredId, setHoveredId] = useState<NodeId | null>(null);
  const [selectedId, setSelectedId] = useState<NodeId | null>(null);
  const activeId = hoveredId ?? selectedId;
  const selected = nodes.find((node) => node.id === selectedId);
  const explanation = selectedId === "civicintel" ? intro : selected;

  function toggle(id: NodeId) {
    setSelectedId((current) => current === id ? null : id);
  }

  function handleKey(event: KeyboardEvent<SVGGElement>, id: NodeId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(id);
    } else if (event.key === "Escape") {
      setSelectedId(null);
    }
  }

  function coordinates(id: NodeId) {
    if (id === "civicintel") return center;
    const match = nodes.find((node) => node.id === id);
    return { x: match?.x ?? center.x, y: match?.y ?? center.y };
  }

  return (
    <div className="relative mx-auto w-full max-w-[570px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-8 rounded-full bg-[#CBA66E]/5 blur-3xl" />
      <svg
        viewBox="0 0 540 430"
        className="relative h-auto w-full overflow-visible"
        role="group"
        aria-label="Interactive illustration explaining Social Network Analysis. Select a node to learn more."
      >
        <circle cx="270" cy="215" r="178" fill="none" stroke="#56717A" strokeWidth="1" strokeDasharray="3 10" opacity="0.42" />
        <circle cx="270" cy="215" r="111" fill="none" stroke="#56717A" strokeWidth="1" opacity="0.38" />
        {connections.map((link, index) => {
          const from = coordinates(link.from);
          const to = coordinates(link.to);
          const emphasized = !!activeId && (link.from === activeId || link.to === activeId);
          return (
            <line
              key={`${link.from}-${link.to}`}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={emphasized ? "#F0C78D" : index < 6 ? "#D4AB72" : "#7899A3"}
              strokeWidth={emphasized ? 2.7 : index < 6 ? 1.6 : 1}
              opacity={activeId ? (emphasized ? 0.95 : 0.13) : index < 6 ? 0.56 : 0.26}
              className="pointer-events-none transition-all duration-300 motion-reduce:transition-none"
            />
          );
        })}
        {nodes.map((node) => {
          const active = activeId === node.id;
          const selectedNode = selectedId === node.id;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x} ${node.y})`}
              role="button"
              tabIndex={0}
              aria-label={`${node.label}: select to learn how this concept relates to Social Network Analysis`}
              aria-pressed={selectedNode}
              className="cursor-pointer outline-none"
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => toggle(node.id)}
              onKeyDown={(event) => handleKey(event, node.id)}
            >
              <circle r="29" fill="transparent" />
              <circle r={active ? 30 : 25} fill={node.color} opacity={active ? 0.23 : 0.10} className="transition-all duration-300 motion-reduce:transition-none" />
              <circle r={active ? 13 : 10} fill={node.color} stroke={selectedNode ? "#F5D29D" : "none"} strokeWidth="2" className="transition-all duration-300 motion-reduce:transition-none" />
              <circle r="3" fill="#10232D" />
              <text x={node.dx} y={node.dy} fill={active ? "#FFF2D8" : "#C9D7D9"} fontSize="13" letterSpacing="0.2" className="select-none transition-colors duration-300">{node.label}</text>
            </g>
          );
        })}
        <g
          role="button"
          tabIndex={0}
          aria-label="CivicIntel: learn what Social Network Analysis means"
          aria-pressed={selectedId === "civicintel"}
          className="cursor-pointer outline-none"
          onMouseEnter={() => setHoveredId("civicintel")}
          onMouseLeave={() => setHoveredId(null)}
          onFocus={() => setHoveredId("civicintel")}
          onBlur={() => setHoveredId(null)}
          onClick={() => toggle("civicintel")}
          onKeyDown={(event) => handleKey(event, "civicintel")}
        >
          <circle cx="270" cy="215" r="73" fill="transparent" />
          <circle cx="270" cy="215" r={activeId === "civicintel" ? 69 : 65} fill="#D4AB72" opacity={activeId === "civicintel" ? 0.21 : 0.09} className="transition-all duration-300 motion-reduce:transition-none" />
          <circle cx="270" cy="215" r="45" fill="#D4AB72" stroke={selectedId === "civicintel" ? "#FFF0CB" : "none"} strokeWidth="2" />
          <text x="270" y="220" fill="#10232D" fontSize="15" fontWeight="700" textAnchor="middle" className="pointer-events-none select-none">CivicIntel</text>
        </g>
      </svg>
      <p className="mt-3 text-center text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#88A2A7]">
        An illustration of interconnected systems
      </p>
      {explanation ? (
        <div className="relative mt-3 rounded-xl border border-[#B99261]/50 bg-[#182F3A] p-4 text-left shadow-xl" aria-live="polite">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            aria-label="Close the network explanation"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#718892]/50 text-[#C6D6D9] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E0B77B]"
          >
            ×
          </button>
          <h2 className="mt-1 pr-8 font-serif text-lg text-white">{explanation.heading}</h2>
          <p className="mt-1 text-xs leading-5 text-[#C8DADD] sm:text-sm">{explanation.detail}</p>
          <a href="#networks" className="mt-3 inline-flex text-xs font-semibold text-[#E0B77B] underline underline-offset-4 hover:text-[#FFE0B1]">Explore the real research networks →</a>
        </div>
      ) : (
        <p className="mt-3 text-center text-xs text-[#A8BFC3]">Select any node to learn what Social Network Analysis reveals.</p>
      )}
      <p className="mt-2 text-center text-[10px] leading-relaxed text-[#78939A]">Illustrative links only; not research findings.</p>
    </div>
  );
}
