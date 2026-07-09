'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import PhotoCard from '@/components/PhotoCard/PhotoCard';
import Highlight from '@/components/Highlight/Highlight';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const containerRef = useRef(null);
  const [activePanel, setActivePanel] = useState(0);

  const { scrollXProgress } = useScroll({ container: containerRef });

  // Translate vertical wheel scroll into free horizontal scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (window.innerWidth <= 768) return;
      // Sideways trackpad swipes already scroll the container natively
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();

      // deltaMode: 0 = pixels, 1 = lines (Firefox mouse wheel), 2 = pages
      const unit = e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? el.clientWidth : 1;
      el.scrollLeft += e.deltaY * unit;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  useMotionValueEvent(scrollXProgress, 'change', (latest) => {
    if (latest < 0.25) setActivePanel(0);
    else if (latest < 0.75) setActivePanel(1);
    else setActivePanel(2);
  });

  return (
    <div className={styles.container} ref={containerRef}>

      {/* ── Panel 1: text left, photo right ── */}
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.textContent}>
            <h1 className={styles.heading}>
              Honestly? I have never thought of being a designer
            </h1>
            <p className={styles.body}>
              I started out as someone obsessed with{' '}
              <Highlight>understanding people.</Highlight> Studying social
              sciences, I was always asking why humans behave the way they do,
              what shapes our choices, and what makes life feel a little easier
              or a little harder.
            </p>
          </div>
          <div className={styles.photoSide}>
            <PhotoCard
              src="/images/about/panel%201%20image.png"
              alt="Mikael standing in a vineyard landscape"
              rotate={2}
            />
          </div>
        </div>
      </div>

      {/* ── Panel 2: photo left, text right ── */}
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.photoSide}>
            <PhotoCard
              src="/images/about/panel%202%20image.png"
              alt="Design sprint week at a startup"
            />
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.heading}>
              Design is just understanding people, with a screen in between.
            </h2>
            <p className={styles.body}>
              That curiosity led me to product design, where I found a way to
              actually do something about it. I believe every product should be
              intuitive enough that no one ever has to stop and think.{' '}
              When the first iPhone launched, nobody needed a tutorial, you just
              picked it up and it made sense.{' '}
              That&apos;s the kind of experience I&apos;m always chasing. Now I
              spend my days making sure that anyone, regardless of their
              experience or background, can pick up a product and just get it.
            </p>
          </div>
        </div>
      </div>

      {/* ── Panel 3: text left, photo right ── */}
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.textContent}>
            <h2 className={styles.heading}>When I&apos;m not designing?</h2>
            <p className={styles.body}>
              I&apos;m probably in a deep conversation with someone, hearing a
              story they&apos;ve never told anyone. I&apos;ve spent my whole
              life trying to understand people, and every conversation leaves me
              more convinced that the deepest parts of someone are always worth
              finding.
            </p>
            <a
              href="https://www.linkedin.com/in/mikael-cheung/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              have a convo
            </a>
          </div>
          <div className={styles.photoSide}>
            <PhotoCard
              src="/images/about/panel%203%20image.png"
              alt="Mikael at a café in conversation"
              rotate={-2}
            />
          </div>
        </div>
      </div>

      {/* Scroll progress dots */}
      <div className={styles.dots}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${styles.dot} ${activePanel === i ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
