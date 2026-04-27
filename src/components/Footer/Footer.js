import Link from 'next/link';
import styles from './Footer.module.css';

const RESUME_URL = 'https://docs.google.com/document/d/1WQB9v0uNSAhqpTb7eQeT1_Nc0902GC5KhXP6ttRilF8/edit?usp=drive_link';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mikael-cheung/';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Left — greeting + copyright */}
        <div className={styles.left}>
          <div>
            <p className={styles.heading}>Glad you're here!</p>
            <p className={styles.subheading}>I'd love to learn about you too :)</p>
          </div>
          <p className={styles.copyright}>© Mikael Cheung, {year}</p>
        </div>

        {/* Right — link columns */}
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.columnLabel}>Contact</p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnLink}
            >
              LinkedIn
            </a>
          </div>
          <div className={styles.column}>
            <p className={styles.columnLabel}>Navigation</p>
            <Link href="/about" className={styles.columnLink}>About</Link>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnLink}
            >
              Resume
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
