'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ProcessTimeline.module.css';

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21h6" />
      <path d="M12 3a6 6 0 0 1 3.75 10.66V17a1 1 0 0 1-1 1H9.25a1 1 0 0 1-1-1v-3.34A6 6 0 0 1 12 3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

const DEFAULT_PHASES = [
  {
    label: 'Discover',
    icon: <SearchIcon />,
    activities: ['Semi-structured Interview'],
  },
  {
    label: 'Define',
    icon: <LightbulbIcon />,
    activities: ['User journey maps'],
  },
  {
    label: 'Develop',
    icon: <CheckIcon />,
    activities: ['User flow', 'Functional map', 'Wireframes', 'User testing'],
  },
  {
    label: 'Deliver',
    icon: <SparkleIcon />,
    activities: ['Hi-fi prototype'],
  },
];

export default function ProcessTimeline({
  phases    = DEFAULT_PHASES,
  startDate = 'Aug 2024',
  endDate   = 'Feb 2025',
}) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50% 0px' });

  return (
    <div ref={ref} className={styles.wrapper}>

      {/* Date labels — same grid as nodeRow so they align with nodes 1 and 4 */}
      <div className={styles.dateRow} aria-hidden="true">
        <span className={styles.dateLabel}>{startDate}</span>
        <span />
        <span />
        <span className={styles.dateLabel}>{endDate}</span>
      </div>

      {/* Node row — also hosts the bar as an absolute child */}
      <div className={styles.nodeRow}>
        {/* Bar: anchored from center of first node to center of last node */}
        <motion.div
          className={styles.rail}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left center' }}
          aria-hidden="true"
        />

        {phases.map((phase, i) => (
          <motion.div
            key={phase.label}
            className={styles.nodeCell}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.45, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <div className={styles.node}>{phase.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Phase columns */}
      <div className={styles.columns}>
        {phases.map((phase, i) => (
          <motion.div
            key={phase.label}
            className={styles.column}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45, delay: 0.65 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.phaseName}>{phase.label}</span>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
