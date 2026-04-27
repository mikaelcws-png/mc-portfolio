'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ResearchBreakdown.module.css';

const DEFAULT_STATS = [
  {
    value:    '6',
    label:    'Participants',
    sublabel: 'Different ethnic backgrounds, income levels & age groups',
  },
  {
    value:    'Semi-structured',
    label:    'Interview format',
    sublabel: 'Divided into four parts',
  },
  {
    value:    'Think-aloud',
    label:    'Protocol',
    sublabel: 'Testers spoke aloud about their reactions',
  },
  {
    value:    'Recorded',
    label:    'Sessions',
    sublabel: "With participants' permission",
  },
];

export default function ResearchBreakdown({
  stats   = DEFAULT_STATS,
  caption = 'Semi-structured interview methodology',
}) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50% 0px' });

  return (
    <figure ref={ref} className={styles.figure}>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.tile}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.55,
              delay:    i * 0.08,
              ease:     [0.16, 1, 0.3, 1],
            }}
          >
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
            {stat.sublabel && (
              <span className={styles.sublabel}>{stat.sublabel}</span>
            )}
          </motion.div>
        ))}
      </div>

      {caption && (
        <figcaption className={styles.caption}>{caption}</figcaption>
      )}
    </figure>
  );
}
