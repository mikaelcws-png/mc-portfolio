'use client';

import { Fragment, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './VideoHero.module.css';

const line1 = ["I'm", "Mikael,", "and", "I", "overthink"];
const line2 = ["so", "you", "don't", "have", "to."];
const wordDuration = 0.35;
const stagger = 0.07; // ~0.98s total (9 × 0.07 + 0.35)

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * stagger,
      duration: wordDuration,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function VideoHero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/videos/hero-loop.mp4"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className={styles.scrim} aria-hidden="true" />
      <h1 className={styles.headline}>
        <span className={styles.line}>
          {line1.map((word, i) => (
            <Fragment key={i}>
              <motion.span
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
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
                animate="visible"
                className={styles.word}
              >
                {word}
              </motion.span>{' '}
            </Fragment>
          ))}
        </span>
      </h1>
      <motion.p
        className={styles.subheadline}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        Diagnosing the real problem first and designing AI products people can
        actually trust.
      </motion.p>
      <motion.a
        href="#case-studies"
        className={styles.scrollCue}
        aria-label="Scroll to case studies"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className={styles.scrollLabel}>scroll</span>
        <svg
          className={styles.scrollArrow}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 1v11M2.5 7.5 7 12l4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
    </section>
  );
}
