import VideoHero from '@/components/VideoHero/VideoHero';
import CaseStudyGrid from '@/components/CaseStudyGrid/CaseStudyGrid';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <VideoHero />
      <div className={styles.below}>
        <CaseStudyGrid />
      </div>
      <Footer />
    </>
  );
}
