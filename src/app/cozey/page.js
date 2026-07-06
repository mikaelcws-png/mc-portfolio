import CaseStudyHero from '@/components/CaseStudyHero/CaseStudyHero';
import CaseStudySection from '@/components/CaseStudySection/CaseStudySection';
import CaseStudySidebar from '@/components/CaseStudySidebar/CaseStudySidebar';
import NextProjectCard from '@/components/NextProjectCard/NextProjectCard';
import Footer from '@/components/Footer/Footer';
import CozeyEmotionChart from '@/components/CozeyEmotionChart/CozeyEmotionChart';
import VisualBlock from '@/components/VisualBlock/VisualBlock';
import ZoomImage from '@/components/ZoomImage/ZoomImage';
import CaseStudyTracker from '@/components/CaseStudyTracker/CaseStudyTracker';
import styles from './cozey.module.css';

export const metadata = {
  title: 'Cozey — Mikael Cheung',
};

const sections = [
  { id: 'context',      label: 'Context' },
  { id: 'company',      label: 'Company' },
  { id: 'problem',      label: 'Problem' },
  { id: 'solution',     label: 'Solution' },
  { id: 'user-testing', label: 'User Testing' },
  { id: 'final-result', label: 'Final Result' },
  { id: 'learning',     label: 'Learning & Impact' },
];

const meta = [
  { label: 'Role', value: 'External Product Designer' },
  { label: 'Duration', value: '3 months' },
];

export default function CozeyPage() {
  return (
    <>
      <CaseStudyTracker caseStudy="cozey" />
      <CaseStudySidebar sections={sections} revealAtId="company" />
      <CaseStudyHero
        title="Cozey"
        tagline="Visualizing Modular Furniture in Small Spaces"
        image="/images/case-studies/cozey-cover.png"
        imageAlt="Cozey app interface"
        meta={meta}
      />

      {/* Context — text only */}
      <CaseStudySection id="context" label="Context" layout="text-only" wide>
        <h2>TL;DR</h2>
        <div className={styles.contextGrid}>
          <div>
            <h3>Problem Statement</h3>
            <p>Users with limited space struggle to visualize how modular sofas can adapt to their needs, reducing confidence in their purchasing decisions and limiting Cozey's appeal in urban markets.</p>
            <h3>Project Objective</h3>
            <p>Our project analysed customer behaviour during sofa purchases to enhance the shopping experience. We aimed to understand customer desires and create an enjoyable process that helps users visualize the sofas in their living spaces, making it easy to find or build the ideal sofa for their home.</p>
          </div>
          <div>
            <h3>My Role</h3>
            <p>As an External Product Designer, I conducted user research, created prototypes, and collaborated with the marketing team to design solutions that highlight modular sofa versatility while maintaining accessibility and user satisfaction.</p>
            <h3>Result</h3>
            <p>The redesign achieved an 83% user satisfaction rate in testing, provided actionable insights for further optimization, and effectively communicated the adaptability of Cozey's modular sofas to a wider audience.</p>
          </div>
        </div>
      </CaseStudySection>

      {/* Company — text left, image right */}
      <CaseStudySection
        id="company"
        label="Company"
        layout="text-side-visual"
        visual={{ type: 'image', src: '/images/case-studies/cozey-company.png', alt: 'Cozey product overview' }}
      >
        <h2>Who is Cozey?</h2>
        <p>Cozey is an online furniture company based in Montreal. They provide a unique and innovative experience to their customers during sofa shopping.</p>
        <p>Customers can personalize their design, from receiving the swatches to choosing the configuration. Cozey's sofas are delivered right to your door with elegant designs and high-quality materials — they fit through any door and assemble without any tools.</p>
      </CaseStudySection>

      {/* Problem — custom layout */}
      <CaseStudySection id="problem" label="Problem" layout="text-only" wide>
        <h2>What we hadn't noticed</h2>
        <div className={styles.problemIntroGrid}>
          <div className={styles.problemIntroText}>
            <p>As the target cities for the business, we hadn't understood the needs of our target audience in their households. Average apartment sizes in our key markets — Toronto (647 sq ft.), New York City (737 sq ft.), and Montreal (844 sq ft.) — mean most customers are furnishing compact spaces.</p>
            <p>Smaller spaces require furniture that can adapt to multiple uses, such as modular sofas that can be rearranged for different activities like lounging, dining, or sleeping. Yet customers in small spaces often find it challenging to visualize how furniture fits or functions in their homes.</p>
          </div>
          <VisualBlock type="image" src="/images/case-studies/cozey-problem-1.png" alt="Average apartment sizes" caption="Average apartment size" natural />
        </div>
        <CozeyEmotionChart />
        <div className={styles.currentStateGrid}>
          <p>A current state analysis of the website revealed that the product page focused on explaining the product itself rather than how it would fit into users' homes. Product descriptions lacked any mention of how the sofa could functionally fit into users' day-to-day lives or specific needs.</p>
          <ZoomImage src="/images/case-studies/cozey-current-state-2.png" alt="Current state analysis" />
        </div>
        <div className={styles.currentStateGrid}>
          <p>I analyzed competitors who offer modular sofas and their strategies for helping users visualize furniture in their homes across various use cases.</p>
          <ZoomImage src="/images/case-studies/cozey-competitive.png" alt="Competitive analysis" />
        </div>
        <p className={styles.competitorSummaryHeading}>What is missing among the competitors?</p>
        <div className={styles.competitorSummary}>
          <div className={styles.competitorSummaryItem}>
            <span className={styles.competitorSummaryEmoji}>💡</span>
            <p>Ideas on how to utilize their limited space at home for multiple scenarios</p>
          </div>
          <div className={styles.competitorSummaryItem}>
            <span className={styles.competitorSummaryEmoji}>🙅</span>
            <p>Visualization on how the sofa would fit into the user's home</p>
          </div>
        </div>
      </CaseStudySection>

      {/* Solution — text + natural side-by-side images */}
      <CaseStudySection
        id="solution"
        label="Solution"
        layout="text-full-visual"
        visualNode={
          <div className={styles.solutionImageGrid}>
            <img src="/images/case-studies/cozey-solution-1.png" alt="Scenario-based visualization" loading="lazy" />
            <img src="/images/case-studies/cozey-solution-2.png" alt="Customer stories and social proof" loading="lazy" />
          </div>
        }
      >
        <h2>Two ways to build confidence</h2>
        <p>The first solution was scenario-based visualization — videos and animations demonstrating how the furniture adapts to various activities, like rearranging for a family gathering or creating a cozy corner. This highlights the versatility of the furniture in real-life small apartment settings.</p>
        <p>The second was customer stories and social proof — showcasing customer photos, reviews, and videos of their furniture setups in small homes. User-generated content adds authenticity and inspires potential buyers with relatable, real-world examples.</p>
      </CaseStudySection>

      {/* User Testing — text + full-width visual */}
      <CaseStudySection
        id="user-testing"
        label="User Testing"
        layout="text-only"
        wide
      >
        <h2>Testing with real users</h2>
        <p>We used wireframes to quickly test our ideas and validate whether they solved the identified problems. I conducted prototype testing with 30 participants who live in Toronto in small living spaces of approximately 400–700 sq ft., from diverse backgrounds and family situations.</p>
        <div className={styles.testingStatsGrid}>
          <div className={styles.testingStatItem}>
            <span className={styles.testingStatValue}>83%</span>
            <p><strong>Task Completion Rate</strong></p>
            <p>25 out of 30 participants were able to successfully understand how to rearrange the furniture.</p>
          </div>
          <div className={styles.testingStatItem}>
            <span className={styles.testingStatValue}>3 min</span>
            <p><strong>Per user</strong></p>
            <p>Average time on task</p>
          </div>
          <div className={styles.testingStatItem}>
            <span className={styles.testingStatValue}>4.3/5</span>
            <p><strong>Helpfulness</strong></p>
            <p>Participants generally found the videos or animations useful for visualizing the product.</p>
          </div>
        </div>
      </CaseStudySection>

      {/* Final Result — text only */}
      <CaseStudySection
        id="final-result"
        label="Final Result"
        layout="text-only"
      >
        <h2>Final interfaces</h2>
        <p>The two solutions — scenario-based visualization and customer stories — were integrated directly into Cozey's existing product page, adding contextual lifestyle videos and a dedicated section for user-submitted photos and reviews. Rather than rebuilding the page, the additions layered onto the current structure to help users picture the sofa in their own space without disrupting the existing purchase flow.</p>
        <a
          href="https://www.figma.com/proto/tHg44ISDTVAc7h3J6X2Abu/Portfolio-Case-studies?node-id=1465-7999&viewport=237%2C863%2C0.19&t=Hc1RmbMxDsNLC4Bj-1&scaling=min-zoom&content-scaling=fixed&page-id=1387%3A1881"
          target="_blank"
          rel="noopener noreferrer"
        >View prototype →</a>
      </CaseStudySection>

      {/* Learning & Impact — text only */}
      <CaseStudySection id="learning" label="Learning & Impact" layout="text-only">
        <h2>Authenticity over aesthetics</h2>
        <h3>Reflection</h3>
        <p>For online furniture stores, authenticity is more important than aesthetics because it builds trust and resonates with customers seeking genuine, relatable experiences. While aesthetics can attract initial attention, authenticity fosters a deeper connection by showcasing real use cases and stories that reflect the practical value of modular furniture.</p>
        <p>By prioritizing authenticity, Cozey can position itself as a brand that truly understands and addresses the needs of its customers — especially those living in small, adaptable spaces.</p>
        <h3>Opportunities: Data-driven Improvements</h3>
        <p>The next opportunity is data-driven improvement. Cozey can conduct A/B or multivariate testing on the new website by creating variations of key features — such as scenario-based visualization tools and customer story sections — and comparing metrics like engagement rates, time on page, and conversion rates to identify what resonates most with users.</p>
      </CaseStudySection>

      <NextProjectCard
        title="AutoMate"
        description="Transforming a fragmented booking flow into a conversion-optimized system."
        href="/automate"
        image="/images/case-studies/automate.png"
      />
      <Footer />
    </>
  );
}
