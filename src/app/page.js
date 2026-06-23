import ThoughtMap from '@/components/ThoughtMap/ThoughtMap';
import Hero from '@/components/Hero/Hero';
import CaseStudyGrid from '@/components/CaseStudyGrid/CaseStudyGrid';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.desktopOnly}>
        <ThoughtMap />
      </div>
      <div className={styles.mobileOnly}>
        <Hero />
        <CaseStudyGrid />
      </div>
      <Footer />
    </>
  );
}
