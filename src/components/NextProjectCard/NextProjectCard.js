'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './NextProjectCard.module.css';

export default function NextProjectCard({ title, description, href, image }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Next project</span>
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.card}
        >
          <Link href={href} className={styles.link}>
            <div className={styles.imageWrap}>
              {image
                ? <img src={image} alt={title} className={styles.image} loading="lazy" />
                : <div className={styles.placeholder} />
              }
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              <div className={styles.text}>
                <h2 className={styles.title}>{title}</h2>
                {description && <p className={styles.description}>{description}</p>}
              </div>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
