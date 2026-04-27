'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './FunnelChart.module.css';

const DEFAULT_STEPS = [
  { step: 1, label: 'Homepage',           value: 100  },
  { step: 2, label: 'Inspection',         value: 68.5 },
  { step: 3, label: 'Inspection-location', value: 51.3 },
  { step: 4, label: 'Inspection-date',    value: 48.7 },
  { step: 5, label: 'Inspection-time',    value: 47.7 },
  { step: 6, label: 'Payment-method',     value: 25.9 },
  { step: 7, label: 'Review',             value: 18.3 },
];

const DEFAULT_DROPOFFS = [
  { startIndex: 1, label: '−25.2%' },
  { startIndex: 4, label: '−45.8%' },
];

const Y_TICKS = [100, 75, 50, 25, 0];

export default function FunnelChart({
  steps    = DEFAULT_STEPS,
  dropOffs = DEFAULT_DROPOFFS,
  caption  = 'Inspection checkout flow funnel report',
}) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50% 0px' });

  const highlightedIndices = new Set(
    dropOffs.flatMap(d => [d.startIndex, d.startIndex + 1])
  );

  return (
    <figure ref={ref} className={styles.figure}>
      <div className={styles.chartGrid}>

        {/* ── Y-axis labels ── */}
        <div className={styles.yAxis} aria-hidden="true">
          {Y_TICKS.map(tick => (
            <span key={tick} className={styles.yLabel}>{tick}%</span>
          ))}
        </div>

        {/* ── Chart area ── */}
        <div className={styles.chartArea}>

          {/* Gridlines */}
          {Y_TICKS.map(tick => (
            <div
              key={tick}
              className={styles.gridline}
              style={{ bottom: `${tick}%` }}
              aria-hidden="true"
            />
          ))}

          {/* Drop-off badges */}
          {dropOffs.map(d => {
            const higherValue = Math.max(steps[d.startIndex].value, steps[d.startIndex + 1].value);
            return (
              <div
                key={d.label}
                className={styles.dropOffBadge}
                style={{
                  left:   `${((d.startIndex + 1) / steps.length) * 100}%`,
                  bottom: `calc(${higherValue}% + var(--badge-offset, 18px))`,
                }}
                aria-label={`Drop-off: ${d.label}`}
              >
                {d.label}
              </div>
            );
          })}

          {/* Bars */}
          {steps.map((step, i) => (
            <div key={step.step} className={styles.barGroup}>
              <div
                className={styles.barInner}
                style={{ height: `${step.value}%` }}
              >
                <span className={styles.barValue}>{step.value}%</span>
                <motion.div
                  className={`${styles.bar} ${highlightedIndices.has(i) ? styles.barHighlighted : ''}`}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{
                    duration: 0.9,
                    delay:    i * 0.1,
                    ease:     [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: 'bottom center' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── X-axis: spacer + labels ── */}
        <div aria-hidden="true" />
        <div className={styles.xLabels}>
          {steps.map(step => (
            <div key={step.step} className={styles.xLabel}>
              <span className={styles.xStep}>{step.step}</span>
              <span className={styles.xName}>{step.label}</span>
            </div>
          ))}
        </div>

      </div>

      {caption && (
        <figcaption className={styles.caption}>{caption}</figcaption>
      )}
    </figure>
  );
}
