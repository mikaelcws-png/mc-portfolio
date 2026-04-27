'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './PersonaCard.module.css';

export default function PersonaCard({
  variant = 'itinera',
  number,
  name,
  archetype,
  description,
  quote,
  expectations = [],
  imageSrc,
  imageAlt,
  // automate variant
  demographics,
  goals = [],
  painPoints = [],
  currentSolution,
  interests = [],
}) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });

  if (variant === 'automate') {
    return (
      <motion.div
        ref={ref}
        className={styles.automateCard}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Top row: photo + demographics + quote ── */}
        <div className={styles.automateTop}>
          <div className={styles.automatePhotoWrap}>
            {imageSrc ? (
              <img src={imageSrc} alt={imageAlt || name} className={styles.automatePhoto} loading="lazy" />
            ) : (
              <div className={styles.photoFallback}>{name?.charAt(0)}</div>
            )}
          </div>
          <div className={styles.automateMeta}>
            <span className={styles.name}>{name}</span>
            {demographics && (
              <dl className={styles.demographics}>
                {demographics.age && <><dt>Age</dt><dd>{demographics.age}</dd></>}
                {demographics.occupation && <><dt>Occupation</dt><dd>{demographics.occupation}</dd></>}
                {demographics.location && <><dt>Location</dt><dd>{demographics.location}</dd></>}
              </dl>
            )}
          </div>
          {quote && (
            <blockquote className={styles.automateQuote}>
              <p>"{quote}"</p>
            </blockquote>
          )}
        </div>

        {/* ── Middle grid: goals + pain points ── */}
        <div className={styles.automateGrid}>
          {goals.length > 0 && (
            <div className={styles.automateSection}>
              <span className={styles.automateSectionLabel}>Goals</span>
              <ul className={styles.automateList}>
                {goals.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}
          {painPoints.length > 0 && (
            <div className={styles.automateSection}>
              <span className={styles.automateSectionLabel}>Pain points</span>
              <ul className={styles.automateList}>
                {painPoints.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}
          {currentSolution && (
            <div className={styles.automateSection}>
              <span className={styles.automateSectionLabel}>Current solution</span>
              <p className={styles.automatePara}>{currentSolution}</p>
            </div>
          )}
          {interests.length > 0 && (
            <div className={styles.automateSection}>
              <span className={styles.automateSectionLabel}>Interest</span>
              <ul className={styles.automateList}>
                {interests.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Left: photo ── */}
      <div className={styles.photoCol}>
        <div className={styles.photoWrap}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || name}
              className={styles.photo}
              loading="lazy"
            />
          ) : (
            <div className={styles.photoFallback} aria-label={name}>
              {name?.charAt(0)}
            </div>
          )}
          {number != null && (
            <span className={styles.badge} aria-label={`Persona ${number}`}>
              {number}
            </span>
          )}
        </div>
      </div>

      {/* ── Center: content ── */}
      <div className={styles.contentCol}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{name}</span>
          {archetype && (
            <span className={styles.archetype}>{archetype}</span>
          )}
        </div>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        {quote && (
          <blockquote className={styles.quote}>
            <p>"{quote}"</p>
          </blockquote>
        )}
      </div>

      {/* ── Right: expectations ── */}
      {expectations.length > 0 && (
        <div className={styles.expectationsCol}>
          <span className={styles.expectationsLabel}>Expectations</span>
          <ul className={styles.expectationsList}>
            {expectations.map((item, i) => (
              <li key={i} className={styles.expectationItem}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
