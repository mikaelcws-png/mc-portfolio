'use client';

import { Fragment, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './TrustCalibrationFlow.module.css';

const STEPS = [
  {
    id: 1,
    title: 'Role and context intake',
    annotation: 'The agent asks before it acts. No configuration — just four plain-language questions.',
    type: 'user-action',
  },
  {
    id: 2,
    title: 'Past case upload',
    annotation: 'She uploads a resolved case. The agent confirms its understanding. She corrects anything wrong.',
    type: 'user-action',
  },
  {
    id: 3,
    title: 'Agent works the past case',
    annotation: 'She watches the agent reason through something she already knows. This is the baseline trust moment.',
    type: 'system',
  },
  {
    id: 4,
    title: 'User evaluates and adjusts',
    annotation: 'She flags what it got right and what it missed. Preferences emerge from experience, not hypothesis.',
    type: 'decision',
  },
  {
    id: 5,
    title: 'Live case',
    annotation: "The agent works the real case inside the context she's established. At judgment boundaries, it pauses.",
    type: 'user-action',
  },
];

function FlowShape({ type, title }) {
  if (type === 'decision') {
    return (
      <div className={styles.diamond}>
        <span className={styles.diamondLabel}>{title}</span>
      </div>
    );
  }
  return (
    <div className={`${styles.rect} ${type === 'system' ? styles.rectSystem : ''}`}>
      <span className={`${styles.shapeLabel} ${type === 'system' ? styles.shapeLabelInverted : ''}`}>
        {title}
      </span>
    </div>
  );
}

export default function TrustCalibrationFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.row}>
        {STEPS.map((step, i) => (
          <Fragment key={step.id}>
            <motion.div
              className={styles.node}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.shapeArea}>
                <FlowShape type={step.type} title={step.title} />
              </div>
              <span className={styles.annotation}>{step.annotation}</span>
            </motion.div>

            {i < STEPS.length - 1 && (
              <motion.div
                className={styles.connector}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 + 0.25 }}
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendUser}`} />
          User action
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendSystem}`} />
          System response
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendSwatchDiamond} />
          Decision
        </div>
      </div>
    </div>
  );
}
