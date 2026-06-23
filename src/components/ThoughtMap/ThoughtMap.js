'use client';

import { useEffect, useRef, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ThoughtMap.module.css';

const CLUSTERS = [
  {
    id: 'automate',
    label: 'AutoMate',
    url: '/automate',
    image: '/images/case-studies/automate-cover.png',
    anchor: [0.22, 0.28],
    satellites: ['Conversion funnel', 'User onboarding', 'A/B testing', 'Accessibility'],
  },
  {
    id: 'cozey',
    label: 'Cozey',
    url: '/cozey',
    image: '/images/case-studies/cozey-cover.png',
    anchor: [0.72, 0.25],
    satellites: ['Cognitive load', 'Modular components', 'Information architecture'],
  },
  {
    id: 'itinera',
    label: 'Itinera',
    url: '/itinera',
    image: '/images/case-studies/itinera-cover.png',
    anchor: [0.25, 0.70],
    satellites: ['Journey mapping', 'Design systems', 'Interaction patterns', 'Prototyping'],
  },
  {
    id: 'trust',
    label: 'Trust Calibration',
    url: '/trust-calibration',
    image: '/images/case-studies/trust-calibration-cover.png',
    anchor: [0.72, 0.68],
    satellites: ['Agentic UX', 'Mental models', 'Problem reframing', 'Heuristic evaluation'],
  },
];

const CROSS_EDGES = [
  ['Cognitive load', 'User onboarding'],
  ['Design systems', 'Modular components'],
  ['Problem reframing', 'Conversion funnel'],
  ['Agentic UX', 'Trust Calibration'],
  ['Journey mapping', 'User onboarding'],
  ['Heuristic evaluation', 'A/B testing'],
];

const SCATTER_DURATION = 900;
const BASE_EDGE_OPACITY = 0.15;
const MAIN_RADIUS = 5;
const SAT_RADIUS = 3;
const HOVER_RADIUS_BOOST = 2;
// Orbit radius as fraction of canvas width, computed in pixel space
const ORBIT_FRAC = 0.09;
const ARC_SPREAD = (200 * Math.PI) / 180; // 200° arc, biased outward

// Per-slot angle jitter and radius variation — deterministic, creates organic feel
const JITTER_ANGLES = [0.22, -0.28, 0.14, -0.20, 0.32];
const RADIUS_MULTS  = [1.0,   1.25,  0.82,  1.12,  0.95];

const COLOR_MAIN = '#3A5635';
const COLOR_SAT  = '#525C50';
const COLOR_EDGE_HIGHLIGHT = 'rgba(58, 86, 53, 0.5)';

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function buildGraph(W, H) {
  const nodes = [];
  const edges = [];
  const labelToIndex = {};
  const cx = W / 2;
  const cy = H / 2;

  const centerIdx = nodes.length;
  nodes.push({
    id: 'center',
    label: '',
    fx: 0.5,
    fy: 0.5,
    px: cx,
    py: cy,
    radius: 0,
    isMain: false,
    isCenter: true,
    caseId: null,
    url: null,
    image: null,
    clusterLabel: null,
  });

  for (const cluster of CLUSTERS) {
    const [fx, fy] = cluster.anchor;
    const mainPx = fx * W;
    const mainPy = fy * H;

    const mainIdx = nodes.length;
    nodes.push({
      id: cluster.id + '_main',
      label: cluster.label,
      fx, fy,
      px: mainPx,
      py: mainPy,
      radius: MAIN_RADIUS,
      isMain: true,
      caseId: cluster.id,
      url: cluster.url,
      image: cluster.image,
      clusterLabel: cluster.label,
    });
    labelToIndex[cluster.label] = mainIdx;
    edges.push({ a: centerIdx, b: mainIdx });

    const count = cluster.satellites.length;
    // Outward direction: angle from canvas center to this cluster (pixel space)
    const outwardAngle = Math.atan2(mainPy - cy, mainPx - cx);
    const spreadStart = outwardAngle - ARC_SPREAD / 2;
    const orbitPx = ORBIT_FRAC * W;

    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const angle = spreadStart + t * ARC_SPREAD + JITTER_ANGLES[i % JITTER_ANGLES.length];
      const r = orbitPx * RADIUS_MULTS[i % RADIUS_MULTS.length];
      const satPx = mainPx + r * Math.cos(angle);
      const satPy = mainPy + r * Math.sin(angle);

      const satIdx = nodes.length;
      nodes.push({
        id: cluster.id + '_sat_' + i,
        label: cluster.satellites[i],
        fx: satPx / W,
        fy: satPy / H,
        px: satPx,
        py: satPy,
        radius: SAT_RADIUS,
        isMain: false,
        caseId: cluster.id,
        url: cluster.url,
        image: cluster.image,
        clusterLabel: cluster.label,
      });
      labelToIndex[cluster.satellites[i]] = satIdx;
      edges.push({ a: mainIdx, b: satIdx });
    }
  }

  for (const [la, lb] of CROSS_EDGES) {
    const ai = labelToIndex[la];
    const bi = labelToIndex[lb];
    if (ai !== undefined && bi !== undefined) {
      edges.push({ a: ai, b: bi });
    }
  }

  return { nodes, edges };
}

// Headline oval's center + radii in canvas pixel space, read from the live DOM element
function computeOvalRect(canvas, headlineEl) {
  if (!canvas || !headlineEl) return null;
  const canvasRect = canvas.getBoundingClientRect();
  const hRect = headlineEl.getBoundingClientRect();
  const rx = hRect.width / 2;
  const ry = hRect.height / 2;
  if (!rx || !ry) return null;
  return {
    cx: hRect.left + rx - canvasRect.left,
    cy: hRect.top + ry - canvasRect.top,
    rx,
    ry,
  };
}

function recomputePixels(nodes, W, H) {
  for (const n of nodes) {
    n.px = n.fx * W;
    n.py = n.fy * H;
  }
}

function connectedEdges(edges, nodeIdx) {
  return edges.reduce((acc, e, i) => {
    if (e.a === nodeIdx || e.b === nodeIdx) acc.push(i);
    return acc;
  }, []);
}

function drawLabel(ctx, text, ix, iy, fy, isMain, alpha, W) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = 'center';

  if (isMain) {
    ctx.font = "400 20px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = '#111111';
  } else {
    ctx.font = "400 16px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = '#525C50';
  }

  // Above the dot if in lower half of canvas, below otherwise
  const above = fy > 0.55;
  const dotR = isMain ? MAIN_RADIUS : SAT_RADIUS;
  const gap = 6;
  const ty = above ? iy - dotR - gap : iy + dotR + gap;
  ctx.textBaseline = above ? 'bottom' : 'top';

  // Clamp x so text doesn't clip at canvas edges
  const halfTextW = ctx.measureText(text).width / 2;
  const clampedX = Math.max(halfTextW + 8, Math.min(ix, W - halfTextW - 8));

  ctx.fillText(text, clampedX, ty);
  ctx.restore();
}

// Radius from the ellipse center to its boundary along a given angle
function ellipseRadiusAtAngle(angle, rx, ry) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return 1 / Math.sqrt((cos / rx) ** 2 + (sin / ry) ** 2);
}

function draw(canvas, ctx, nodes, edges, t, hoveredIdx, ovalRect) {
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width / dpr;
  const H = canvas.height / dpr;
  ctx.clearRect(0, 0, W, H);

  const isHovering = hoveredIdx !== null;
  const connected = isHovering ? connectedEdges(edges, hoveredIdx) : [];
  const connectedSet = new Set(connected);

  // Interpolated position: center → final as t goes 0 → 1
  function ipos(n) {
    return {
      ix: W / 2 + (n.fx * W - W / 2) * t,
      iy: H / 2 + (n.fy * H - H / 2) * t,
    };
  }

  const hasOval = ovalRect && ovalRect.rx > 0 && ovalRect.ry > 0;

  // Edges
  for (let i = 0; i < edges.length; i++) {
    const nodeA = nodes[edges[i].a];
    const nodeB = nodes[edges[i].b];
    let { ix: ax, iy: ay } = ipos(nodeA);
    let { ix: bx, iy: by } = ipos(nodeB);

    // Lines touching the oval start at its border, not its center
    if (hasOval && nodeA.isCenter) {
      const angle = Math.atan2(by - ovalRect.cy, bx - ovalRect.cx);
      const r = ellipseRadiusAtAngle(angle, ovalRect.rx, ovalRect.ry);
      ax = ovalRect.cx + r * Math.cos(angle);
      ay = ovalRect.cy + r * Math.sin(angle);
    }
    if (hasOval && nodeB.isCenter) {
      const angle = Math.atan2(ay - ovalRect.cy, ax - ovalRect.cx);
      const r = ellipseRadiusAtAngle(angle, ovalRect.rx, ovalRect.ry);
      bx = ovalRect.cx + r * Math.cos(angle);
      by = ovalRect.cy + r * Math.sin(angle);
    }

    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);

    if (!isHovering) {
      ctx.strokeStyle = `rgba(82, 92, 80, ${BASE_EDGE_OPACITY * t})`;
      ctx.lineWidth = 0.6;
    } else if (connectedSet.has(i)) {
      ctx.strokeStyle = COLOR_EDGE_HIGHLIGHT;
      ctx.lineWidth = 1.2;
    } else {
      ctx.strokeStyle = `rgba(82, 92, 80, ${BASE_EDGE_OPACITY * 0.3})`;
      ctx.lineWidth = 0.6;
    }
    ctx.stroke();
  }

  // Labels fade in during the last 35% of scatter
  const labelAlpha = Math.max(0, (t - 0.65) / 0.35);

  // Satellites first, main nodes on top (center node has no dot/label — it's the DOM headline)
  const order = [...nodes.filter(n => !n.isMain && !n.isCenter), ...nodes.filter(n => n.isMain)];
  for (const n of order) {
    const idx = nodes.indexOf(n);
    const { ix, iy } = ipos(n);
    const r = n.radius + (idx === hoveredIdx ? HOVER_RADIUS_BOOST : 0);

    ctx.beginPath();
    ctx.arc(ix, iy, r, 0, Math.PI * 2);
    ctx.fillStyle = n.isMain ? COLOR_MAIN : COLOR_SAT;
    ctx.fill();

    drawLabel(ctx, n.label, ix, iy, n.fy, n.isMain, labelAlpha, W);
  }
}

const line1 = ["I'm", 'Mikael,', 'and', 'I', 'overthink'];
const line2 = ['so', 'you', "don't", 'have', 'to.'];

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function ThoughtMap() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const sectionRef = useRef(null);
  const graphRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const scatterDoneRef = useRef(false);
  const hoveredIdxRef = useRef(null);
  const resizeTimerRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [headlineDimmed, setHeadlineDimmed] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const { nodes, edges } = buildGraph(W, H);
    graphRef.current = { nodes, edges };

    function animate(ts) {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const raw = Math.min(elapsed / SCATTER_DURATION, 1);
      const t = easeOutExpo(raw);

      draw(canvas, ctx, nodes, edges, t, hoveredIdxRef.current, computeOvalRect(canvas, headlineRef.current));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        scatterDoneRef.current = true;
      }
    }

    setMounted(true);
    setHeadlineVisible(true);
    // Headline + oval appear first; nodes scatter in once that's settled
    const startTimer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 900);

    function handleResize() {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        const dpr = window.devicePixelRatio || 1;
        const W = canvas.offsetWidth;
        const H = canvas.offsetHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        const newCtx = canvas.getContext('2d');
        newCtx.scale(dpr, dpr);
        recomputePixels(nodes, W, H);
        draw(canvas, newCtx, nodes, edges, 1, hoveredIdxRef.current, computeOvalRect(canvas, headlineRef.current));
      }, 100);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimerRef.current);
    };
  }, []);

  function handleMouseMove(e) {
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    if (!canvas || !graph || !scatterDoneRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const { nodes, edges } = graph;
    let found = null;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.isCenter) continue;
      const dx = mx - n.fx * canvas.offsetWidth;
      const dy = my - n.fy * canvas.offsetHeight;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        found = i;
        break;
      }
    }

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (found !== null) {
      hoveredIdxRef.current = found;
      canvas.style.cursor = 'pointer';
      setHeadlineDimmed(true);
      draw(canvas, ctx, nodes, edges, 1, found, computeOvalRect(canvas, headlineRef.current));

      const node = nodes[found];
      const cardW = 480;
      const cardH = 280;
      let cx = e.clientX + 16;
      let cy = e.clientY - 8;
      if (cx + cardW > window.innerWidth - 8) cx = e.clientX - cardW - 16;
      if (cy + cardH > window.innerHeight - 8) cy = e.clientY - cardH + 8;
      setHoverCard({ x: cx, y: cy, cluster: { id: node.caseId, label: node.clusterLabel, image: node.image } });
    } else {
      if (hoveredIdxRef.current !== null) {
        hoveredIdxRef.current = null;
        canvas.style.cursor = 'default';
        setHeadlineDimmed(false);
        setHoverCard(null);
        draw(canvas, ctx, nodes, edges, 1, null, computeOvalRect(canvas, headlineRef.current));
      }
    }
  }

  function handleMouseLeave() {
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    if (!canvas || !graph) return;
    hoveredIdxRef.current = null;
    canvas.style.cursor = 'default';
    setHeadlineDimmed(false);
    setHoverCard(null);
    if (scatterDoneRef.current) {
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(canvas, ctx, graph.nodes, graph.edges, 1, null, computeOvalRect(canvas, headlineRef.current));
    }
  }

  function handleClick(e) {
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    if (!canvas || !graph || !scatterDoneRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (const n of graph.nodes) {
      if (n.isCenter) continue;
      const dx = mx - n.fx * canvas.offsetWidth;
      const dy = my - n.fy * canvas.offsetHeight;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        router.push(n.url);
        return;
      }
    }
  }

  return (
    <section className={styles.section} ref={sectionRef}>
      <div
        className={styles.canvasWrap}
        role="img"
        aria-label="Thought map showing design topics connected across four case studies: AutoMate, Cozey, Itinera, and Trust Calibration"
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
      </div>

      {mounted && (
        <motion.div
          ref={headlineRef}
          className={styles.headline}
          initial={{ opacity: 0 }}
          animate={{ opacity: headlineVisible ? (headlineDimmed ? 0.12 : 1) : 0 }}
          transition={{ duration: headlineDimmed ? 0.15 : 1.0 }}
        >
          <span className={styles.line}>
            {line1.map((word, i) => (
              <Fragment key={i}>
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={headlineVisible ? 'visible' : 'hidden'}
                  className={styles.word}
                >
                  {word}
                </motion.span>{' '}
              </Fragment>
            ))}
          </span>
          <span className={styles.line}>
            {line2.map((word, i) => (
              <Fragment key={i}>
                <motion.span
                  custom={line1.length + i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={headlineVisible ? 'visible' : 'hidden'}
                  className={styles.word}
                >
                  {word}
                </motion.span>{' '}
              </Fragment>
            ))}
          </span>
        </motion.div>
      )}

      <AnimatePresence>
        {mounted && hoverCard && (
          <motion.div
            key={hoverCard.cluster.id}
            className={styles.card}
            style={{ left: hoverCard.x, top: hoverCard.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <img src={hoverCard.cluster.image} alt={hoverCard.cluster.label} loading="lazy" />
            <div className={styles.cardTitle}>{hoverCard.cluster.label}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className={styles.srOnly}>
        {CLUSTERS.map(c => (
          <li key={c.id}><a href={c.url}>{c.label}</a></li>
        ))}
      </ul>
    </section>
  );
}
