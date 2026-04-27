'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './MarketDataViz.module.css';

const EASE = [0.16, 1, 0.3, 1];

function StatBlock({ label, value, caption, delay, isInView }) {
  return (
    <motion.div
      className={styles.statBlock}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      {caption && <span className={styles.statCaption}>{caption}</span>}
    </motion.div>
  );
}

function GrowthBar({ year, percent, width, delay, isInView }) {
  return (
    <motion.div
      className={styles.barRow}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      <span className={styles.barYear}>{year}</span>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          style={{ width: `${width}%` }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: EASE }}
        >
          <span className={styles.barLabel}>+{percent}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function GlobeDecoration() {
  return (
    <svg
      className={styles.globe}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="80" cy="80" r="72" fill="var(--color-highlight-bg)" />
      <circle cx="80" cy="80" r="72" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* latitude lines */}
      <ellipse cx="80" cy="80" rx="72" ry="28" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.2" fill="none" />
      <ellipse cx="80" cy="80" rx="72" ry="52" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.15" fill="none" />
      <line x1="8" y1="80" x2="152" y2="80" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.2" />
      {/* longitude lines */}
      <ellipse cx="80" cy="80" rx="28" ry="72" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.2" fill="none" />
      <ellipse cx="80" cy="80" rx="52" ry="72" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.15" fill="none" />
      <line x1="80" y1="8" x2="80" y2="152" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.2" />
      {/* decorative dot cluster — North America region */}
      <circle cx="55" cy="62" r="3" fill="var(--color-accent)" fillOpacity="0.5" />
      <circle cx="64" cy="70" r="2" fill="var(--color-accent)" fillOpacity="0.35" />
      <circle cx="48" cy="72" r="2.5" fill="var(--color-accent)" fillOpacity="0.4" />
      <circle cx="58" cy="80" r="1.5" fill="var(--color-accent)" fillOpacity="0.3" />
    </svg>
  );
}

export default function MarketDataViz() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });

  return (
    <figure ref={ref} className={styles.figure}>
      <motion.h3
        className={styles.title}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        Travel data in 2024
      </motion.h3>

      <div className={styles.grid}>
        {/* Left column */}
        <div className={styles.col}>
          <StatBlock
            label="Overseas Spending"
            value="$6.5B"
            caption="After COVID-19, people travelled due to long depressing years of lockdowns."
            delay={0.1}
            isInView={isInView}
          />
          <StatBlock
            label="Average Spending per Trip"
            value="$2,353"
            delay={0.2}
            isInView={isInView}
          />
        </div>

        {/* Center decoration */}
        <div className={styles.centerCol}>
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <GlobeDecoration />
          </motion.div>
        </div>

        {/* Right column */}
        <div className={styles.col}>
          <motion.div
            className={styles.growthBlock}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <span className={styles.statLabel}>Spending Growth</span>
            <GrowthBar year="2023" percent="35.7" width={88} delay={0.25} isInView={isInView} />
            <GrowthBar year="2019" percent="31.2" width={76} delay={0.35} isInView={isInView} />
            <span className={styles.barCaption}>Comparing the second quarter of both years</span>
          </motion.div>

          <StatBlock
            label="Average Trip Length"
            value="13.2 nights"
            delay={0.3}
            isInView={isInView}
          />
        </div>
      </div>
    </figure>
  );
}
