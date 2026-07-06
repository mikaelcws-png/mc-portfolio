'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Nav.module.css';
import { capture } from '@/lib/analytics';

const RESUME_URL = 'https://docs.google.com/document/d/1WQB9v0uNSAhqpTb7eQeT1_Nc0902GC5KhXP6ttRilF8/edit?usp=drive_link';

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastY.current && currentY > 80);
      lastY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.pill}>
        <Link href="/" className={styles.logo}>MC</Link>
        <div className={styles.links}>
          <Link
            href="/about"
            className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
          >
            About
          </Link>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onClick={() => capture('resume_downloaded', { location: 'nav' })}
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
