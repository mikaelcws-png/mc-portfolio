'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const line1 = ["I'm", "Mikael,", "and", "I", "overthink"];
const line2 = ["so", "you", "don't", "have", "to."];
const allWords = [...line1, ...line2];
const totalWords = allWords.length;
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

export default function Hero() {
  return (
    <section className={styles.hero}>
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
    </section>
  );
}
