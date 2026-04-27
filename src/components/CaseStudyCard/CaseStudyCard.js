'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CaseStudyCard.module.css';

export default function CaseStudyCard({ title, description, stat, statLabel, href, image, featured = false, darkText = false, animatedHover = false, gradientOverlay = false }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`${styles.card} ${featured ? styles.featured : ''} ${darkText ? styles.darkText : ''} ${animatedHover ? styles.animatedCard : ''}`}
    >
      <Link href={href} className={styles.link}>

        {/* Image */}
        <div className={styles.imageWrap}>
          {image ? (
            <img src={image} alt={title} className={styles.image} />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>

        {/* Hover overlay — animated cards only */}
        {animatedHover && <div className={`${styles.hoverOverlay} ${gradientOverlay ? styles.hoverOverlayGradient : ''}`} />}

        {/* Text */}
        <div className={styles.content}>
          {animatedHover ? (
            <div className={styles.readCta}>
              <span>Read case study</span>
              <span className={styles.arrow}>→</span>
            </div>
          ) : (
            <>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.meta}>
                <p className={styles.description}>{description}</p>
                {stat && (
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{stat}</span>
                    <span className={styles.statLabel}>{statLabel}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

      </Link>
    </motion.div>
  );
}
