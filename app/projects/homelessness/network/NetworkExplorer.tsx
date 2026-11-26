"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import styles from "./network.module.css";

type NodeKind = "government" | "provider" | "funding" | "governance" | "program" | "oversight";
type Layer = "funding" | "governance" | "services" | "oversight" | "procurement" | "policy";
type ViewId = "overview" | "funding" | "services" | "institutions" | "accountability" | "everything";

type RecordNode = {
  id: string;
  label: string;
  kind: NodeKind;
  group: string;
  description: string;
  research_focus?: string;
  source_ids?: string[];
};
type RecordEdge = {
  id: string;
  source: string;
  target: string;
  relation: string;
  layer: Layer;
  date_or_period: string;
  value: string | number | null;
  unit: string | null;
  evidence_class?: string;
  source_id: string;
  source_ids: string[];
  source_url: string;
  details: string;
  amount_type?: string;
};
type ResearchSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind?: string;
  research_note?: string;
};
export type NetworkDataset = {
  dataset: string;
  version: string;
  compiled_date: string;
  scope: string;
  caveats: string[];
  nodes: RecordNode[];
  edges: RecordEdge[];
  sources: ResearchSource[];
};

type PhysicalNode = RecordNode & SimulationNodeDatum & { degree: number };
type PhysicalEdge = SimulationLinkDatum<PhysicalNode> & RecordEdge;
type Camera = { x: number; y: number; k: number };
type Point = { x: number; y: number };
type Route = { nodes: string[]; edges: string[] };

const WIDTH = 1100;
const HEIGHT = 760;
const NODE_COLORS: Record<NodeKind, string> = {
  government: "#e9a87b",
  provider: "#8ac9ad",
  funding: "#e6c17f",
  governance: "#a9b7e7",
  program: "#75bed2",
  oversight: "#d8a6db",
};
const KIND_NAMES: Record<NodeKind, string> = {
  government: "Public agencies",
  provider: "Service providers",
  funding: "Funding & revenue instruments",
  governance: "Governing institutions",
  program: "Programs, systems & policies",
  oversight: "Oversight bodies",
};
const KINDS = Object.keys(NODE_COLORS) as NodeKind[];
const VIEWS: { id: ViewId; label: string; subtitle: string; layers: Layer[] }[] = [
  { id: "overview", label: "Overview", subtitle: "All 2026 pilot relationships", layers: ["funding","governance","services","oversight","procurement","policy"] },
  { id: "funding", label: "Funding & allocations", subtitle: "Grants, budgets and funding context", layers: ["funding"] },
  { id: "services", label: "Services & providers", subtitle: "Directories, programs and documented contracts", layers: ["services"] },
  { id: "institutions", label: "Governance", subtitle: "Agency roles, CoC and system management", layers: ["governance", "policy"] },
  { id: "accountability", label: "Oversight & procurement", subtitle: "Reviews, solicitations and related governance", layers: ["oversight", "procurement", "governance"] },
  { id: "everything", label: "All evidence", subtitle: "Full source-backed pilot dataset", layers: ["funding","governance","services","oversight","procurement","policy"] },
];
const LAYER_NAMES: Record<Layer, string> = {
  funding: "Funding, allocations or fiscal authority",
  governance: "Governance / administration",
  services: "Provider listing / service relationship",
  oversight: "Public oversight",
  procurement: "Procurement notice (not contract award)",
  policy: "Legislation / policy",
};
const LAYER_COLORS: Record<Layer, string> = {
  funding: "#e4bb73",
  governance: "#a7b8e8",
  services: "#80c4ab",
  oversight: "#d3a4d3",
  procurement: "#74bfdd",
  policy: "#e9a684",
};
const CENTERS: Record<NodeKind, [number, number]> = {
  government: [610, 280],
  provider: [245, 545],
  funding: [745, 195],
  governance: [420, 175],
  program: [635, 600],
  oversight: [930, 455],
};
const FEATURED = ["county_hh", "hhap5", "coc", "county_bos", "abode", "oakland", "county_measure_w"];
const formatMoney = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: value % 1 === 0 ? 0 : 2 }).format(value);
const formatRelation = (value: string) => value.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
const degreeRadius = (degree: number) => Math.min(25, 10 + Math.sqrt(degree) * 3.2);
const stableHash = (s: string) => [...s].reduce((a, ch) => (a * 33 + ch.charCodeAt(0)) >>> 0, 5381);
const truncate = (label: string, limit: number) => label.length > limit ? `${label.slice(0, limit - 1)}…` : label;

function findPath(start: string, end: string, edges: RecordEdge[]): Route | null {
  if (start === end) return { nodes: [start], edges: [] };
  // Undirected browsing path: this is adjacency in a document graph, NOT a causal pathway.
  const neighbors = new Map<string, { id: string; edge: string }[]>();
  for (const e of edges) {
    if (!neighbors.has(e.source)) neighbors.set(e.source, []);
    if (!neighbors.has(e.target)) neighbors.set(e.target, []);
    neighbors.get(e.source)!.push({ id: e.target, edge: e.id });
    neighbors.get(e.target)!.push({ id: e.source, edge: e.id });
  }
  const queue: string[] = [start];
  const seen = new Map<string, { from: string; via: string } | null>([[start, null]]);
  for (let i = 0; i < queue.length; i++) {
    const cur = queue[i];
    for (const next of neighbors.get(cur) ?? []) {
      if (seen.has(next.id)) continue;
      seen.set(next.id, { from: cur, via: next.edge });
      if (next.id === end) {
        const nodes: string[] = [end];
        const pathEdges: string[] = [];
        let at = end;
        while (at !== start) {
          const previous = seen.get(at)!;
          if (!previous) break;
          nodes.unshift(previous.from);
          pathEdges.unshift(previous.via);
          at = previous.from;
        }
        return { nodes, edges: pathEdges };
      }
      queue.push(next.id);
    }
  }
  return null;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function NetworkExplorer({ dataset }: { dataset: NetworkDataset }) {
  const [viewId, setViewId] = useState<ViewId>("overview");
  const [includedKinds, setIncludedKinds] = useState<NodeKind[]>(KINDS);
  const [query, setQuery] = useState("");
  const [chosenNode, setChosenNode] = useState<string | null>(null);
  const [chosenEdge, setChosenEdge] = useState<string | null>(null);
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const [destination, setDestination] = useState("");
  const [showRoute, setShowRoute] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, k: 0.88 });
  const [positions, setPositions] = useState<PhysicalNode[]>([]);
  const [fullscreen, setFullscreen] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const simulationRef = useRef<Simulation<PhysicalNode, PhysicalEdge> | null>(null);
  const dragRef = useRef<string | null>(null);
  const panRef = useRef<{ x: number; y: number; previous: Camera } | null>(null);
  const cameraRef = useRef(camera);
  const reduceMotion = useReducedMotion();
  const sourcesById = useMemo(() => new Map(dataset.sources.map((s) => [s.id, s])), [dataset.sources]);
  const rawById = useMemo(() => new Map(dataset.nodes.map((n) => [n.id, n])), [dataset.nodes]);
  const edgeById = useMemo(() => new Map(dataset.edges.map((e) => [e.id, e])), [dataset.edges]);
  const activeView = VIEWS.find((v) => v.id === viewId)!;

  const visibleGraph = useMemo(() => {
    const allowed = new Set(activeView.layers);
    const kinds = new Set(includedKinds);
    const edges = dataset.edges.filter((e) => {
      const a = rawById.get(e.source);
      const b = rawById.get(e.target);
      return allowed.has(e.layer) && !!a && !!b && kinds.has(a.kind) && kinds.has(b.kind);
    });
    const connected = new Set(edges.flatMap((e) => [e.source, e.target]));
    const nodes = dataset.nodes.filter((n) => kinds.has(n.kind) && connected.has(n.id));
    return { nodes, edges };
  }, [dataset.edges, dataset.nodes, activeView, viewId, includedKinds, rawById]);

  const visibleDegrees = useMemo(() => {
    const map = new Map<string, number>();
    for (const edge of visibleGraph.edges) {
      map.set(edge.source, (map.get(edge.source) ?? 0) + 1);
      map.set(edge.target, (map.get(edge.target) ?? 0) + 1);
    }
    return map;
  }, [visibleGraph.edges]);

  useEffect(() => {
    let alive = true;
    let frame = 0;
    const nodes: PhysicalNode[] = visibleGraph.nodes.map((node) => {
      const h = stableHash(node.id);
      const [cx, cy] = CENTERS[node.kind];
      const angle = (h % 360) * Math.PI / 180;
      const distance = 25 + ((h >>> 8) % 100);
      return { ...node, degree: visibleDegrees.get(node.id) ?? 0, x: cx + Math.cos(angle) * distance, y: cy + Math.sin(angle) * distance };
    });
    const links: PhysicalEdge[] = visibleGraph.edges.map((edge) => ({ ...edge }));
    const sim = forceSimulation<PhysicalNode, PhysicalEdge>(nodes)
      .force("link", forceLink<PhysicalNode, PhysicalEdge>(links).id((n) => n.id).distance((l) => l.layer === "funding" ? 155 : l.layer === "services" ? 150 : 135).strength(0.20))
      .force("charge", forceManyBody<PhysicalNode>().strength((n) => -145 - n.degree * 19))
      .force("collision", forceCollide<PhysicalNode>().radius((n) => degreeRadius(n.degree) + 15).iterations(2))
      .force("x", forceX<PhysicalNode>((n) => CENTERS[n.kind][0]).strength(0.037))
      .force("y", forceY<PhysicalNode>((n) => CENTERS[n.kind][1]).strength(0.037))
      .velocityDecay(0.28)
      .alpha(1);
    simulationRef.current = sim;
    if (reduceMotion) {
      sim.stop();
      for (let i = 0; i < 260; i++) sim.tick();
      setPositions(nodes.map((n) => ({ ...n })));
    } else {
      sim.on("tick", () => {
        if (!alive || frame) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          if (alive) setPositions(nodes.map((n) => ({ ...n })));
        });
      });
      setPositions(nodes.map((n) => ({ ...n })));
    }
    return () => {
      alive = false;
      if (frame) window.cancelAnimationFrame(frame);
      sim.stop();
      if (simulationRef.current === sim) simulationRef.current = null;
    };
  }, [visibleGraph, visibleDegrees, reduceMotion]);

  useEffect(() => { cameraRef.current = camera; }, [camera]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChosenNode(null);
        setChosenEdge(null);
        setDestination("");
        setShowRoute(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const onFullscreen = () => setFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  const coordsById = useMemo(() => new Map(positions.map((n) => [n.id, n])), [positions]);
  const selectedNode = chosenNode ? rawById.get(chosenNode) ?? null : null;
  const selectedEdge = chosenEdge ? edgeById.get(chosenEdge) ?? null : null;
  const neighborsOfSelected = useMemo(() => new Set(chosenNode ? visibleGraph.edges.filter((e) => e.source === chosenNode || e.target === chosenNode).flatMap((e) => [e.source, e.target]) : []), [chosenNode, visibleGraph.edges]);
  const relatedEdges = useMemo(() => chosenNode ? visibleGraph.edges.filter((e) => e.source === chosenNode || e.target === chosenNode) : [], [chosenNode, visibleGraph.edges]);
  const route = useMemo(() => showRoute && chosenNode && destination ? findPath(chosenNode, destination, visibleGraph.edges) : null, [chosenNode, destination, showRoute, visibleGraph.edges]);
  const routeNodes = useMemo(() => new Set(route?.nodes ?? []), [route]);
  const routeEdges = useMemo(() => new Set(route?.edges ?? []), [route]);
  const options = useMemo(() => visibleGraph.nodes.filter((n) => n.id !== chosenNode).sort((a,b) => a.label.localeCompare(b.label)), [visibleGraph.nodes, chosenNode]);
  const hits = useMemo(() => query.trim().length > 0 ? dataset.nodes.filter((n) => `${n.label} ${n.description}`.toLowerCase().includes(query.toLowerCase())).slice(0, 7) : [], [query, dataset.nodes]);

  const svgPoint = useCallback((clientX: number, clientY: number): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: WIDTH / 2, y: HEIGHT / 2 };
    const svgMatrix = svg.getScreenCTM();
    if (!svgMatrix) return { x: WIDTH / 2, y: HEIGHT / 2 };
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const p = point.matrixTransform(svgMatrix.inverse());
    return { x: p.x, y: p.y };
  }, []);

  const focusNode = useCallback((nodeId: string, moveCamera = false) => {
    setChosenNode(nodeId);
    setChosenEdge(null);
    setDestination("");
    setShowRoute(false);
    setShowHints(false);
    if (moveCamera) {
      const n = coordsById.get(nodeId);
      if (n?.x !== undefined && n?.y !== undefined) {
        setCamera((prev) => ({ ...prev, x: WIDTH / 2 - n.x! * prev.k, y: HEIGHT / 2 - n.y! * prev.k }));
      }
    }
  }, [coordsById]);

  const reset = useCallback(() => {
    setChosenEdge(null);
    setChosenNode(null);
    setDestination("");
    setShowRoute(false);
    setCamera({ x: 0, y: 0, k: 0.88 });
  }, []);

  const zoomAt = useCallback((at: Point, factor: number) => {
    setCamera((previous) => {
      const k = Math.max(0.37, Math.min(3.4, previous.k * factor));
      return { k, x: at.x - ((at.x - previous.x) / previous.k) * k, y: at.y - ((at.y - previous.y) / previous.k) * k };
    });
  }, []);

  const fitAll = useCallback(() => {
    const laidOut = positions.filter((n) => Number.isFinite(n.x) && Number.isFinite(n.y));
    if (!laidOut.length) return reset();
    const minX = Math.min(...laidOut.map((n) => n.x!)) - 65;
    const maxX = Math.max(...laidOut.map((n) => n.x!)) + 65;
    const minY = Math.min(...laidOut.map((n) => n.y!)) - 65;
    const maxY = Math.max(...laidOut.map((n) => n.y!)) + 65;
    const k = Math.max(0.37, Math.min(1.6, Math.min(WIDTH / (maxX - minX), HEIGHT / (maxY - minY))));
    setCamera({ x: WIDTH / 2 - ((minX + maxX) / 2) * k, y: HEIGHT / 2 - ((minY + maxY) / 2) * k, k });
  }, [positions, reset]);

  const onSvgDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0 || dragRef.current) return;
    panRef.current = { x: event.clientX, y: event.clientY, previous: cameraRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onSvgMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (dragRef.current) {
      const p = svgPoint(event.clientX, event.clientY);
      const view = cameraRef.current;
      const node = simulationRef.current?.nodes().find((n) => n.id === dragRef.current);
      if (node) {
        node.fx = (p.x - view.x) / view.k;
        node.fy = (p.y - view.y) / view.k;
        if (reduceMotion) { node.x = node.fx; node.y = node.fy; }
        if (reduceMotion) setPositions(simulationRef.current!.nodes().map((n) => ({ ...n })));
      }
      return;
    }
    if (!panRef.current) return;
    // Convert CSS-pixel movement to SVG viewBox units, accounting for viewBox fit.
    const now = svgPoint(event.clientX, event.clientY);
    const start = svgPoint(panRef.current.x, panRef.current.y);
    const prev = panRef.current.previous;
    setCamera({ x: prev.x + now.x - start.x, y: prev.y + now.y - start.y, k: prev.k });
  };
  const onSvgUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (dragRef.current) {
      const dragged = simulationRef.current?.nodes().find((n) => n.id === dragRef.current);
      if (dragged) { dragged.fx = null; dragged.fy = null; }
      simulationRef.current?.alphaTarget(0);
      if (reduceMotion && simulationRef.current) setPositions(simulationRef.current.nodes().map((n) => ({ ...n })));
      dragRef.current = null;
    }
    panRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onNodeDown = (event: ReactPointerEvent<SVGGElement>, id: string) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    dragRef.current = id;
    panRef.current = null;
    focusNode(id);
    const node = simulationRef.current?.nodes().find((n) => n.id === id);
    if (node) { node.fx = node.x; node.fy = node.y; }
    if (!reduceMotion) simulationRef.current?.alphaTarget(0.24).restart();
    // Capture events on the root SVG so drag works even when the pointer leaves the circle.
    const svg = svgRef.current;
    svg?.setPointerCapture(event.pointerId);
  };
  const onWheel = (event: ReactWheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const at = svgPoint(event.clientX, event.clientY);
    zoomAt(at, event.deltaY < 0 ? 1.12 : 1 / 1.12);
  };
  const onNodeFromSearch = (id: string) => {
    if (!visibleGraph.nodes.some((n) => n.id === id)) {
      setIncludedKinds(KINDS);
      setViewId("everything");
    }
    setQuery("");
    focusNode(id);
  };
  const toggleKind = (kind: NodeKind) => {
    setIncludedKinds((previous) => previous.includes(kind) ? previous.filter((k) => k !== kind) : [...previous, kind]);
    setChosenEdge(null); setChosenNode(null); setShowRoute(false);
  };
  const updateView = (id: ViewId) => {
    setViewId(id);
    setChosenNode(null); setChosenEdge(null);
    setDestination(""); setShowRoute(false);
  };
  const toggleFullscreen = async () => {
    if (!shellRef.current) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await shellRef.current.requestFullscreen();
    } catch { /* Some browsers disable fullscreen. The normal layout remains available. */ }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brandBlock}>
          <a className={styles.brand} href="/projects/homelessness" aria-label="Return to The Homelessness System">↖ Civic Intelligence Lab</a>
          <span className={styles.brandDivider} />
          <span className={styles.project}>THE HOMELESSNESS SYSTEM / NETWORK</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.liveDot} aria-hidden="true" />
          <span>Research dataset v{dataset.version} · {dataset.compiled_date}</span>
          <a className={styles.headerBack} href="/projects/homelessness">Read investigation ↗</a>
        </div>
      </header>

      <div className={styles.intro}>
        <div>
          <div className={styles.kicker}>CIVICINTEL / AN INTERACTIVE INVESTIGATION</div>
          <h1>The <em>Homelessness Network</em></h1>
          <p>Explore Alameda County’s documented funding allocations, public agencies, governance, providers and oversight. Political finance and service outcomes are not yet mapped.</p>
        </div>
        <div className={styles.introStats}>
          <div><strong>{dataset.nodes.length}</strong><span>total nodes</span></div>
          <div><strong>{dataset.edges.length}</strong><span>records</span></div>
          <div><strong>{dataset.sources.length}</strong><span>sources</span></div>
        </div>
      </div>

      <div ref={shellRef} className={styles.explorer}>
        <aside className={styles.controlRail} aria-label="Network exploration settings">
          <div className={styles.sidebarHeading}><span className={styles.smallTitle}>EXPLORE</span><span className={styles.version}>01 / VIEWS</span></div>
          <div className={styles.viewList}>
            {VIEWS.map((view) => (
              <button key={view.id} className={`${styles.viewButton} ${view.id === viewId ? styles.viewActive : ""}`} onClick={() => updateView(view.id)} aria-pressed={view.id === viewId}>
                <span className={styles.viewRadio} aria-hidden="true" />
                <span><b>{view.label}</b><small>{view.subtitle}</small></span>
              </button>
            ))}
          </div>
          <div className={styles.railDivider} />
          <div className={styles.sidebarHeading}><span className={styles.smallTitle}>FIND AN ACTOR</span></div>
          <div className={styles.searchBox}>
            <span aria-hidden="true">⌕</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search agencies, programs..." aria-label="Search all network nodes" />
          </div>
          {query.trim() && (
            <div className={styles.searchResults} aria-live="polite">
              {hits.length ? hits.map((node) => (
                <button key={node.id} onClick={() => onNodeFromSearch(node.id)}>
                  <span className={styles.searchDot} style={{ background: NODE_COLORS[node.kind] }} />
                  <span>{node.label}</span>
                </button>
              )) : <span className={styles.noResults}>No matching nodes found.</span>}
            </div>
          )}
          <div className={styles.railDivider} />
          <div className={styles.sidebarHeading}><span className={styles.smallTitle}>SHOW CATEGORIES</span><button className={styles.microButton} onClick={() => { setIncludedKinds(KINDS); setChosenNode(null); setChosenEdge(null); }}>All</button></div>
          <div className={styles.categoryList}>
            {KINDS.map((kind) => (
              <label key={kind} className={styles.categoryRow}>
                <input type="checkbox" checked={includedKinds.includes(kind)} onChange={() => toggleKind(kind)} />
                <span className={styles.kindDot} style={{ background: NODE_COLORS[kind] }} aria-hidden="true" />
                <span>{KIND_NAMES[kind]}</span>
              </label>
            ))}
          </div>
          <div className={styles.railNote}><span>i</span><p>Dots represent public institutions, providers and program instruments. Size reflects <strong>visible records</strong> only. Allocations are not expenditures; listings are not contracts.</p></div>
        </aside>

        <section className={styles.graphArea} aria-label="Interactive social network graph">
          <div className={styles.graphTop}>
            <div className={styles.graphTitle}><span className={styles.eyebrow}>NETWORK VIEW</span><strong>{activeView.label}</strong><small>{visibleGraph.nodes.length} nodes · {visibleGraph.edges.length} relationships visible</small></div>
            <div className={styles.graphActions}>
              <button title="Fit all visible nodes" aria-label="Fit all visible nodes" onClick={fitAll}>⊞</button>
              <button title="Zoom out" aria-label="Zoom out" onClick={() => zoomAt({ x: WIDTH / 2, y: HEIGHT / 2 }, 1 / 1.25)}>−</button>
              <span className={styles.zoomLabel}>{Math.round(camera.k * 100)}%</span>
              <button title="Zoom in" aria-label="Zoom in" onClick={() => zoomAt({ x: WIDTH / 2, y: HEIGHT / 2 }, 1.25)}>+</button>
              <button title="Toggle full screen" aria-label="Toggle full screen" onClick={toggleFullscreen}>{fullscreen ? "↙" : "⛶"}</button>
            </div>
          </div>
          <div className={styles.graphCanvas}>
            <div className={styles.graphGrid} aria-hidden="true" />
            <svg ref={svgRef} role="group" aria-label="Documented Alameda County homelessness-system relationships. Use the search box or sidebar lists to explore nodes with keyboard navigation." viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid meet" className={styles.networkSvg} onPointerDown={onSvgDown} onPointerMove={onSvgMove} onPointerUp={onSvgUp} onPointerCancel={onSvgUp} onWheel={onWheel}>
              <g transform={`translate(${camera.x} ${camera.y}) scale(${camera.k})`}>
                {visibleGraph.edges.map((edge) => {
                  const a = coordsById.get(edge.source);
                  const b = coordsById.get(edge.target);
                  if (!a || !b || a.x === undefined || b.x === undefined || a.y === undefined || b.y === undefined) return null;
                  const highlighted = routeEdges.has(edge.id);
                  const related = (chosenNode && (edge.source === chosenNode || edge.target === chosenNode)) || chosenEdge === edge.id;
                  const muted = !!(chosenNode || chosenEdge || route) && !highlighted && !related;
                  const lineClass = `${styles.edge} ${highlighted ? styles.pathEdge : ""} ${related ? styles.relatedEdge : ""} ${muted ? styles.mutedEdge : ""}`;
                  return (
                    <g key={edge.id}>
                      <line className={lineClass} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={LAYER_COLORS[edge.layer]} strokeWidth={highlighted ? 3.5 : related ? 2.4 : 1.2} />
                      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth={17} className={styles.hitEdge} onPointerDown={(event) => event.stopPropagation()} onClick={() => { setChosenEdge(edge.id); setChosenNode(null); setShowRoute(false); setShowHints(false); }}>
                        <title>{rawById.get(edge.source)?.label} → {rawById.get(edge.target)?.label}: {formatRelation(edge.relation)}</title>
                      </line>
                    </g>
                  );
                })}
                {positions.map((node) => {
                  if (node.x === undefined || node.y === undefined) return null;
                  const selected = chosenNode === node.id;
                  const hovered = hoverNode === node.id;
                  const onRoute = routeNodes.has(node.id);
                  const muted = !!(chosenNode || chosenEdge || route) && !selected && !hovered && !onRoute && !neighborsOfSelected.has(node.id);
                  const labelVisible = selected || hovered || onRoute || node.degree >= 3 || camera.k >= 1.45;
                  const radius = degreeRadius(node.degree);
                  return (
                    <g key={node.id} transform={`translate(${node.x} ${node.y})`} className={`${styles.node} ${muted ? styles.mutedNode : ""}`} onPointerDown={(e) => onNodeDown(e, node.id)} onPointerEnter={() => setHoverNode(node.id)} onPointerLeave={() => setHoverNode((current) => current === node.id ? null : current)} onClick={(event) => { event.stopPropagation(); focusNode(node.id); }} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); focusNode(node.id); } }} aria-label={`Select ${node.label}, ${node.degree} visible links`}>
                      {(selected || hovered || onRoute) && <circle r={radius + 15} fill={NODE_COLORS[node.kind]} fillOpacity=".10" stroke={NODE_COLORS[node.kind]} strokeOpacity=".55" strokeWidth="1.5" />}
                      <circle r={radius + 5} fill={NODE_COLORS[node.kind]} fillOpacity=".10" />
                      <circle r={radius} fill={NODE_COLORS[node.kind]} stroke={selected ? "#fff" : "#142a37"} strokeWidth={selected ? 3 : 2} />
                      <circle r={Math.max(3, radius * .27)} fill="#152633" opacity=".7" />
                      {labelVisible && <text className={styles.nodeLabel} y={radius + 21} textAnchor="middle">{truncate(node.label, node.degree > 4 ? 30 : 24)}</text>}
                      <title>{node.label} — {node.degree} documented records visible</title>
                    </g>
                  );
                })}
              </g>
            </svg>
            {showHints && (
              <div className={styles.hint}>
                <button aria-label="Dismiss instructions" className={styles.hintClose} onClick={() => setShowHints(false)}>×</button>
                <span className={styles.hintGlyph}>✦</span>
                <strong>Follow the public record.</strong>
                <p>Click a dot for an institution or program. Click a line for the original source and financial classification. Drag nodes or scroll to zoom.</p>
              </div>
            )}
            {visibleGraph.nodes.length === 0 && <div className={styles.emptyGraph}>No records match these filters. Select more categories or choose another view.</div>}
            <div className={styles.canvasFoot}><span>DATASET V{dataset.version} · SOURCE-LINKED</span><span>ALLOCATIONS ≠ SPENDING · LISTINGS ≠ CONTRACTS</span></div>
          </div>
        </section>

        <aside className={styles.inspector} aria-label="Selected node or relationship details">
          <div className={styles.sidebarHeading}><span className={styles.smallTitle}>EVIDENCE INSPECTOR</span><button className={styles.microButton} onClick={reset}>Clear</button></div>
          {selectedEdge ? (
            <div className={styles.inspectorBody}>
              <span className={styles.sectionTag}>DOCUMENTED RELATIONSHIP</span>
              <h2 className={styles.inspectorTitle}>{formatRelation(selectedEdge.relation)}</h2>
              <div className={styles.endpointCard}><span>{rawById.get(selectedEdge.source)?.label}</span><span className={styles.endpointArrow}>↓</span><span>{rawById.get(selectedEdge.target)?.label}</span></div>
              <p className={styles.bodyCopy}>{selectedEdge.details}</p>
              <div className={styles.detailGrid}>
                <span>Relationship layer</span><b>{LAYER_NAMES[selectedEdge.layer]}</b>
                <span>Reporting period</span><b>{selectedEdge.date_or_period}</b>
                {selectedEdge.value !== null && <>
                  <span>Reported amount</span><b>{typeof selectedEdge.value === "number" ? formatMoney(selectedEdge.value) : String(selectedEdge.value)}</b>
                  <span>Financial stage</span><b>{selectedEdge.amount_type === "budget_allocation" ? "Authorized budget allocation — not spending" : selectedEdge.amount_type === "allocation" ? "Eligible-jurisdiction allocation — not spending" : "Reported financial record"}</b>
                </>}
              </div>
              <div className={styles.evidenceCard}>
                <span>ORIGINAL PUBLIC RECORDS</span>
                {selectedEdge.source_ids.map((id) => {
                  const source = sourcesById.get(id);
                  if (!source) return null;
                  return <div key={id} style={{ paddingBottom: 12 }}>
                    <strong>{source.title}</strong>
                    <small>{source.publisher} · {id}</small>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">Open supporting record ↗</a>
                  </div>;
                })}
              </div>
              <button className={styles.outlineButton} onClick={() => focusNode(selectedEdge.source)}>Inspect source actor →</button>
              <p className={styles.disclaimer}>These records distinguish allocations, budgets, provider listings, contracts and solicitations. No relationship by itself demonstrates wrongdoing, political influence, or measured service outcomes.</p>
            </div>
          ) : selectedNode ? (
            <div className={styles.inspectorBody}>
              <span className={styles.sectionTag} style={{ color: NODE_COLORS[selectedNode.kind] }}>{KIND_NAMES[selectedNode.kind].toUpperCase()}</span>
              <h2 className={styles.inspectorTitle}>{selectedNode.label}</h2>
              <p className={styles.bodyCopy}>{selectedNode.description}</p>
              <div className={styles.nodeMetric}><strong>{relatedEdges.length}</strong><span>documented connections in this view</span></div>
              {!!selectedNode.source_ids?.length && <div className={styles.evidenceCard}>
                <span>ACTOR SOURCE RECORDS</span>
                {selectedNode.source_ids.map((id) => {
                  const source = sourcesById.get(id);
                  return source ? <div key={id} style={{ marginBottom: 12 }}>
                    <strong>{source.title}</strong>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">View source ↗</a>
                  </div> : null;
                })}
              </div>}
              <h3 className={styles.subheading}>Explore its relationships</h3>
              {relatedEdges.length ? <div className={styles.relationList}>
                {relatedEdges.map((edge) => {
                  const other = edge.source === selectedNode.id ? edge.target : edge.source;
                  return <button key={edge.id} onClick={() => { setChosenEdge(edge.id); setChosenNode(null); setShowRoute(false); }}><span className={styles.relationMarker} style={{ background: LAYER_COLORS[edge.layer] }} /><span><b>{rawById.get(other)?.label}</b><small>{formatRelation(edge.relation)}</small></span><span>↗</span></button>;
                })}
              </div> : <p className={styles.bodyCopy}>No edges in this filtered view.</p>}
              <div className={styles.traceBox}>
                <h3 className={styles.subheading}>Trace a documented path</h3>
                <p>Select another node to see the shortest connection through this view's records.</p>
                <select value={destination} aria-label="Choose destination node" onChange={(e) => { setDestination(e.target.value); setShowRoute(false); }}>
                  <option value="">Choose another actor...</option>
                  {options.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
                </select>
                <button disabled={!destination} className={styles.traceButton} onClick={() => setShowRoute(true)}>Trace connection <span>↗</span></button>
                {showRoute && destination && (route ? (
                  <div className={styles.traceResult}>
                    <strong>{route.edges.length} documented step{route.edges.length !== 1 ? "s" : ""}</strong>
                    {route.nodes.map((id, i) => <div key={`${id}-${i}`}><span>{rawById.get(id)?.label}</span>{i < route.edges.length && <small>↓ {formatRelation(edgeById.get(route.edges[i])?.relation ?? "linked")}</small>}</div>)}
                    <p>Paths describe recorded connections only, not causal influence. Documents and policy objects may serve as bridges.</p>
                  </div>
                ) : <div className={styles.noPath}>No path in this view. Try “All evidence” or enable more node categories.</div>)}
              </div>
            </div>
          ) : (
            <div className={styles.inspectorBody}>
              <div className={styles.emptyIcon}>✳</div>
              <h2 className={styles.inspectorTitle}>Every connection tells a story.</h2>
              <p className={styles.bodyCopy}>Select an actor or relationship to examine why it appears on the network, its reporting period, and the source behind it.</p>
              <h3 className={styles.subheading}>Suggested starting points</h3>
              <div className={styles.featuredList}>
                {FEATURED.map((id) => rawById.get(id)).filter((node): node is RecordNode => !!node).map((node) => <button key={node.id} onClick={() => onNodeFromSearch(node.id)}><span className={styles.kindDot} style={{ background: NODE_COLORS[node.kind] }} />{node.label}<span>↗</span></button>)}
              </div>
              <div className={styles.evidenceCard}><span>HOW TO READ THIS MAP</span><p>These records distinguish HHAP jurisdiction allocations, county-authorized budgets, provider directory entries, governance, and documented service contracts. No lobbying or campaign-finance records appear in this pilot.</p></div>
            </div>
          )}
        </aside>
      </div>

      <footer className={styles.footer}>
        <p><strong>About this network.</strong> This is an Alameda County pilot dataset (2020–2026), not an accounting of total homelessness spending. Amounts may represent allocations rather than payments. A provider listing is not necessarily a contract, and visual proximity is determined by layout physics, not political influence. No individual client information is included.</p>
        <div><span>Compiled {dataset.compiled_date} · Dataset v{dataset.version}</span><a href="/projects/homelessness#methods">Research methods ↗</a><button onClick={reset}>Reset exploration ↺</button></div>
      </footer>
    </main>
  );
}
