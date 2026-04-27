'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './CozeyEmotionChart.module.css';

const EASE = [0.16, 1, 0.3, 1];

const CURVE_PATH =
  'M 0,35 C 80,35 220,130 300,130 C 390,130 440,72 510,72 C 570,72 610,52 670,52 C 740,52 800,135 1000,135';

const FILL_PATH =
  'M 0,35 C 80,35 220,130 300,130 C 390,130 440,72 510,72 C 570,72 610,52 670,52 C 740,52 800,135 1000,135 L 1000,100 L 0,100 Z';

const POINTS = [
  { leftPct: 11,  curveYPct: 13,   emoji: '🤩', label: 'Wow, so aesthetic!',           labelPosition: 'above' },
  { leftPct: 30,  curveYPct: 65,   emoji: '😟', label: 'So many options',               labelPosition: 'below' },
  { leftPct: 51,  curveYPct: 36,   emoji: '🤔', label: 'This sofa looks nice',          labelPosition: 'above' },
  { leftPct: 67,  curveYPct: 26,   emoji: '🤔', label: 'But how would it fit my home',  labelPosition: 'above' },
  { leftPct: 90,  curveYPct: 67.5, emoji: '🤔', label: 'Are the comments real?',        labelPosition: 'below' },
];

export default function CozeyEmotionChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <figure ref={ref} className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.yAxis}>
          <span className={styles.yLabel}>POSITIVE</span>
          <span className={styles.yLabel}>NEGATIVE</span>
        </div>

        <div className={styles.chartArea}>
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className={styles.svg}
          >
            {/* filled area */}
            <motion.path
              d={FILL_PATH}
              fill="var(--color-text-secondary)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.08 } : {}}
              transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
            />

            {/* dashed midline */}
            <motion.line
              x1="0" y1="100" x2="1000" y2="100"
              stroke="var(--color-text-secondary)"
              strokeWidth="1.5"
              strokeDasharray="6 5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.35 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            />

            {/* stroke curve */}
            <motion.path
              d={CURVE_PATH}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            />
          </svg>

          {POINTS.map((pt, i) => (
            <div
              key={i}
              className={`${styles.marker} ${pt.labelPosition === 'above' ? styles.markerAbove : styles.markerBelow}`}
              style={{ left: `${pt.leftPct}%`, top: `${pt.curveYPct}%` }}
            >
              <motion.div
                className={styles.markerInner}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.0 + i * 0.12, ease: EASE }}
              >
                <span className={styles.markerLabel}>{pt.label}</span>
                <span className={styles.emoji}>{pt.emoji}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
