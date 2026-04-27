'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './JourneyMap.module.css';

const EASE = [0.16, 1, 0.3, 1];
const COL_CENTERS = [12.5, 37.5, 62.5, 87.5];

// SVG viewBox: 0 0 1000 200
// Curve y values map to curveYPct = (svgY / 200 * 100)

export const LAURA_DATA = {
  persona: 'Laura — Adventurer',
  // Dips deepest at Evaluate (col 2) — overwhelmed by commercialized options
  curvePath:
    'M 0,65 C 30,40 90,45 125,55 C 200,72 290,98 375,110 C 460,122 545,147 625,150 C 710,153 795,132 875,122 C 930,114 975,112 1000,112',
  columns: [
    {
      label: 'Define',
      steps: [
        'Decides what destination they will go and book the essential items, like flights and hotels.',
        'Marks down some key spots or activities they must visit using Google search engine',
      ],
    },
    {
      label: 'Compare',
      steps: [
        'Researches secondary spots around the key items and spots through different platforms, like blogs, videos, and social media',
        'Collects all the spot into a document or note websites',
      ],
    },
    {
      label: 'Evaluate',
      steps: [
        'Organizes all the spot into a document or note websites like Google Document, spreadsheet, or apps like Wanderlog',
        'Chooses which spots they would keep and eliminate the rest based on all the travellers',
      ],
    },
    {
      label: 'Select',
      steps: [
        'Organizes the final itinerary into a spreadsheet or travel planning app',
      ],
    },
  ],
  // curveYPct = svgY / 200 * 100
  markers: [
    { colIndex: 0, emoji: '😄', curveYPct: 27.5 },
    { colIndex: 1, emoji: '🧐', curveYPct: 55 },
    { colIndex: 2, emoji: '😩', curveYPct: 75 },
    { colIndex: 3, emoji: '😤', curveYPct: 61 },
  ],
  quotes: [
    { colIndex: 0, text: '"I wonder what I can do in this place."',                                           topPct: 3  },
    { colIndex: 0, text: '"Okay, we booked flight tickets and hotels. But what should we do there?"',         topPct: 42 },
    { colIndex: 1, text: '"I know what I like. Let\'s look into some local spots."',                          topPct: 28 },
    { colIndex: 1, text: '"Ugh, so many websites I have to go through."',                                     topPct: 68 },
    { colIndex: 2, text: '"Are these spots recommended by locals?"',                                          topPct: 49 },
    { colIndex: 2, text: '"I really don\'t want to go to commercialized spots."',                             topPct: 82 },
    { colIndex: 3, text: '"I think I finally have my plan together."',                                        topPct: 36 },
  ],
};

export const WILLIAM_DATA = {
  persona: 'William — Family-oriented',
  // Dips deepest at Compare (col 1) — overwhelmed choosing for the whole family
  curvePath:
    'M 0,35 C 40,22 85,30 125,38 C 220,58 310,132 375,158 C 435,174 510,148 625,110 C 718,80 800,87 875,88 C 930,88 975,86 1000,85',
  columns: [
    {
      label: 'Define',
      steps: [
        'Decides who is going on the trip',
        'Decides what destination they will go and book the essential items, like flights and hotels.',
        'Marks down some key spots or activities they must visit using Google search engine',
      ],
    },
    {
      label: 'Compare',
      steps: [
        'Researches secondary spots around the key items and spots through different platforms, like blogs, videos, and social media',
        'Collects all the spot into a document or note websites',
      ],
    },
    {
      label: 'Evaluate',
      steps: [
        'Organizes all the spot into a document or note websites like Google Document, spreadsheet, or apps like Wanderlog',
        'Chooses which spots they would keep and eliminate the rest based on all the travellers',
      ],
    },
    {
      label: 'Select',
      steps: [
        'Organizes the final itinerary into a spreadsheet or travel planning app',
      ],
    },
  ],
  markers: [
    { colIndex: 0, emoji: '😄',   curveYPct: 19   },
    { colIndex: 1, emoji: '😵‍💫', curveYPct: 79   },
    { colIndex: 2, emoji: '🤔',   curveYPct: 55   },
    { colIndex: 3, emoji: '😤',   curveYPct: 44   },
  ],
  quotes: [
    { colIndex: 0, text: '"I\'m so excited the whole family is going on a trip together"',                            topPct: 2  },
    { colIndex: 0, text: '"Okay, we booked flight tickets and hotels. But what should we do there?"',                  topPct: 36 },
    { colIndex: 1, text: '"There is so many spots we can go. Which one should I choose?"',                            topPct: 20 },
    { colIndex: 1, text: '"I\'m just gonna select all the spots they might be interested and let them decide."',       topPct: 44 },
    { colIndex: 2, text: '"I guess my parents would want to visit somewhere cultural but the kids want to have fun."', topPct: 22 },
    { colIndex: 2, text: '"I need to talk to everyone who is going on this trip, so time consuming."',                topPct: 66 },
    { colIndex: 3, text: '"They all want to go to different spot. How should I plan the day?"',                       topPct: 16 },
    { colIndex: 3, text: '"I need to organize so much information. I wish there is some tools that can help me with it."', topPct: 54 },
  ],
};

export default function JourneyMap({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <figure ref={ref} className={styles.figure}>
      <div className={styles.scrollWrapper}>

        {/* Column headers */}
        <div className={styles.headerRow}>
          {data.columns.map((col) => (
            <div key={col.label} className={styles.header}>
              {col.label}
            </div>
          ))}
        </div>

        {/* Step lists */}
        <div className={styles.stepsRow}>
          {data.columns.map((col, i) => (
            <motion.ol
              key={col.label}
              className={styles.stepsList}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              {col.steps.map((step, j) => (
                <li key={j} className={styles.step}>{step}</li>
              ))}
            </motion.ol>
          ))}
        </div>

        {/* Emotion curve area */}
        <div className={styles.curveArea}>

          {/* SVG curve */}
          <svg
            className={styles.curveSvg}
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d={data.curvePath}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeOpacity="0.55"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            />
          </svg>

          {/* Column dividers */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={styles.colDivider}
              style={{ left: `${i * 25}%` }}
              aria-hidden="true"
            />
          ))}

          {/* Emoji markers */}
          {data.markers.map((marker, i) => (
            <motion.div
              key={i}
              className={styles.emoji}
              style={{
                left: `${COL_CENTERS[marker.colIndex]}%`,
                top:  `${marker.curveYPct}%`,
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1, ease: EASE }}
            >
              {marker.emoji}
            </motion.div>
          ))}

          {/* Speech bubbles */}
          {data.quotes.map((quote, i) => (
            <motion.div
              key={i}
              className={styles.bubble}
              style={{
                left: `${COL_CENTERS[quote.colIndex]}%`,
                top:  `${quote.topPct}%`,
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.05, ease: EASE }}
            >
              {quote.text}
            </motion.div>
          ))}

        </div>
      </div>

      <figcaption className={styles.caption}>{data.persona}</figcaption>
    </figure>
  );
}
