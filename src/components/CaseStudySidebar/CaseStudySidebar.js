'use client';

import { useEffect, useState } from 'react';
import styles from './CaseStudySidebar.module.css';

export default function CaseStudySidebar({ sections, revealAtId }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, [sections]);

  useEffect(() => {
    if (!revealAtId) { setVisible(true); return; }
    const el = document.getElementById(revealAtId);
    if (!el) return;

    const handleScroll = () => {
      const top = el.getBoundingClientRect().top;
      // Show once the section has entered the viewport, hide only when it's back below
      setVisible(top < window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealAtId]);

  return (
    <nav className={`${styles.sidebar} ${visible ? styles.visible : ''}`} aria-label="Page sections">
      <ul className={styles.list}>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.item} ${activeId === id ? styles.active : ''}`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className={styles.line} />
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
