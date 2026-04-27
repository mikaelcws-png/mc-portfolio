import CaseStudyCard from '@/components/CaseStudyCard/CaseStudyCard';
import styles from './CaseStudyGrid.module.css';

const caseStudies = [
  {
    title: 'AutoMate',
    description: 'Transforming a fragmented booking flow into a conversion-optimized system.',

    href: '/automate',
    image: '/images/case-studies/automate-card-bg.png',
    featured: true,
    animatedHover: true,
    gradientOverlay: true,
  },
  {
    title: 'Cozey',
    description: 'Turning modular product complexity into a clearer, more confident buying experience.',
    href: '/cozey',
    image: '/images/case-studies/cozey-card-bg.png',
    featured: false,
    animatedHover: true,
    gradientOverlay: true,
  },
  {
    title: 'Itinera',
    description: 'Helping users move from endless research to confident travel decisions.',
    href: '/itinera',
    image: '/images/case-studies/itinera-card-bg.png',
    featured: false,
    animatedHover: true,
    gradientOverlay: true,
  },
];

export default function CaseStudyGrid() {
  return (
    <section id="case-studies" className={styles.section}>
      <p className={styles.label}>Case studies</p>
      <div className={styles.grid}>
        {/* Featured — full width */}
        <div className={styles.featured}>
          <CaseStudyCard {...caseStudies[0]} />
        </div>
        {/* Standard — side by side */}
        <div className={styles.row}>
          <CaseStudyCard {...caseStudies[1]} />
          <CaseStudyCard {...caseStudies[2]} />
        </div>
      </div>
    </section>
  );
}
