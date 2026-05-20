import CaseStudyHero from '@/components/CaseStudyHero/CaseStudyHero';
import CaseStudySection from '@/components/CaseStudySection/CaseStudySection';
import CaseStudySidebar from '@/components/CaseStudySidebar/CaseStudySidebar';
import VisualBlock from '@/components/VisualBlock/VisualBlock';
import FunnelChart from '@/components/FunnelChart/FunnelChart';
import PersonaCard from '@/components/PersonaCard/PersonaCard';
import FigmaEmbed from '@/components/FigmaEmbed/FigmaEmbed';
import NextProjectCard from '@/components/NextProjectCard/NextProjectCard';
import Footer from '@/components/Footer/Footer';
import styles from './automate.module.css';

export const metadata = {
  title: 'AutoMate — Mikael Cheung',
};

const sections = [
  { id: 'context',      label: 'Context' },
  { id: 'company',      label: 'Company' },
  { id: 'problem',      label: 'Problem' },
  { id: 'user',         label: 'User' },
  { id: 'solution',     label: 'Solution' },
  { id: 'final-result', label: 'Final Result' },
  { id: 'prototype',    label: 'Prototype' },
  { id: 'learning',     label: 'Learning & Impact' },
];

const meta = [
  { label: 'Role', value: 'Product Designer' },
  { label: 'Timeline', value: '1 week sprint' },
  { label: 'Tools', value: 'Figma' },
];

export default function AutoMatePage() {
  return (
    <>
      <CaseStudySidebar sections={sections} revealAtId="company" />
      <CaseStudyHero
        title="AutoMate"
        tagline="Turning low-trust bookings into confident in-app transactions at scale"
        image="/images/case-studies/automate-cover.png"
        imageAlt="AutoMate app interface"
        meta={meta}
      />

      <CaseStudySection id="context" label="Context" layout="text-only" wide>
        <h2>TL;DR</h2>
        <p>AutoMate connects drivers with local auto shops for maintenance services. However, 45–50% of users dropped off during the booking flow, and many bypassed the platform entirely by contacting customer service to complete bookings. While this preserved short-term conversions, it created operational strain and limited the platform's ability to scale.</p>
        <h3>Business Risk</h3>
        <p>The startup was operating on investor funding, and generating revenue quickly became critical to survival. Without a clear path to income, continued investment was at risk. The product faced a key tension: customer service could convert users effectively, but long-term growth required shifting bookings to a trusted self-service experience within the app.</p>
        <h3>Objective</h3>
        <p>Reduce booking drop-off and enable trusted, self-service transactions within the app.</p>
        <h3>My Role</h3>
        <p>I participated in end-to-end product design — from research and competitive analysis to prototyping and final UI — working closely with engineering during the one-week sprint, and development afterwards.</p>
      </CaseStudySection>

      <CaseStudySection
        id="company"
        label="Company"
        layout="text-side-visual"
        visualNode={
          <img
            src="/images/case-studies/automate-company.png"
            alt="AutoMate company overview"
            loading="lazy"
            style={{ width: '100%', height: 'auto', maxHeight: '260px', objectFit: 'contain', borderRadius: 'var(--radius-lg)', display: 'block' }}
          />
        }
      >
        <h2>Who is AutoMate?</h2>
        <p>AutoMate is a company, which adopting the marketplace business model, allows different auto shops to list their service on the platform. Car owners can search for maintenance services or products at their fingertips; without the worry to be tricked by dishonest mechanics.</p>
      </CaseStudySection>

      <CaseStudySection
        id="problem"
        label="Problem"
        layout="text-only"
        wide
      >
        <h2>Where did we lose our customer?</h2>
        <p>We observed significant drop-offs at two key stages of the booking flow: the Inspection location page and the Payment method page.</p>
        <FunnelChart />
        <p>While users typically searched for inspection locations near their home or workplace, the list view, displaying only shop names and addresses, made proximity difficult to assess, creating friction during provider selection.</p>
        <p>This contributed to drop-offs later in the flow, revealing two core issues: a credibility gap in evaluating auto shops and spatial decision friction when comparing nearby options.</p>

        <div className={styles.problemBlock}>
          <div className={styles.problemItem}>
            <div className={styles.problemText}>
              <h3>Confusing and ineffective</h3>
              <p>With a busy schedule, our user tends to search for a location where is either close to their house or work, so they can fit in a service into their day taking as less time as possible.</p>
              <p>However, the list view with only the auto shops' name and address is not helping user to achieve the goal as it is hard to determine how close the auto shops are with their active area.</p>
            </div>
            <VisualBlock
              type="image"
              src="/images/case-studies/automate-problem-2.png"
              alt="List view showing only auto shop names and addresses, making proximity hard to assess"
              natural
              noShadow
            />
          </div>

          <div className={styles.problemItem}>
            <div className={styles.problemText}>
              <h3>Distrust to pay a big amount</h3>
              <p>Almost half of the users who got to the payment page dropped off.</p>
              <p>Without a foundation of trust towards the auto shops or the platform, it is difficult to ask user for the whole amount way ahead before the service.</p>
            </div>
            <VisualBlock
              type="image"
              src="/images/case-studies/automate-problem-3.png"
              alt="Payment page where nearly half of users dropped off due to low trust"
              natural
              noShadow
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="user" label="User" layout="text-only" wide>
        <h2>Who is our user?</h2>
        <p>Using insights from customer service conversations and platform data, we developed two personas to better understand the demographic profile and expectations of our users.</p>
        <PersonaCard
          variant="automate"
          name="Norris Chung"
          imageSrc="/images/case-studies/Norris.png"
          imageAlt="Norris Chung"
          demographics={{ age: 55, occupation: 'Administration Manager', location: 'Hong Kong' }}
          quote="I've been through enough repairs to know what my car needs, but finding a shop I trust that's affordable and convenient is still a challenge."
          goals={[
            'Keep their car in optimal condition with minimal downtime and hassle.',
            'Extend the car\'s lifespan through consistent, preventive maintenance.',
            'Finding competitive pricing or promotions for regular services like oil changes or tire replacements.',
            'Quickly identify and address urgent issues.',
          ]}
          painPoints={[
            'Frustration with fluctuating service costs or lack of price transparency',
            'Difficulty coordinating maintenance schedules around their busy lives',
            'Lack of trust in certain service providers due to previous bad experience',
          ]}
          currentSolution="Building a long-term relationship with a trusted repair shop or mechanic. Relying on previous experience to access when and what kind of service is needed."
          interests={['Formula 1', 'Mercedes-Benz']}
        />
        <div className={styles.personaSpacing}>
        <PersonaCard
          variant="automate"
          name="Jennifer Kwan"
          imageSrc="/images/case-studies/Jennifer.png"
          imageAlt="Jennifer Kwan"
          demographics={{ age: 28, occupation: 'Sales Representative', location: 'Hong Kong' }}
          quote="I just got my car, and I have no idea what maintenance it needs or where to even start looking for a reliable repair shop."
          goals={[
            'Find a trustworthy and affordable repair shop or service',
            'Complete immediate maintenance tasks, such as oil changes or tire rotations',
            'Ensure the car remains reliable and safe to drive for years',
            'Avoid costly repairs by maintaining the car\'s health',
          ]}
          painPoints={[
            'Lack of knowledge about what services their car needs and when to schedule them',
            'Fear of being overcharged or scammed due to inexperience',
            'Difficulty finding a repair shop with good reviews and close proximity.',
          ]}
          currentSolution="Relying on recommendations from family or friends for repair shops. Searching for repair shops online and reading reviews."
          interests={['MINI', 'Tesla']}
        />
        </div>
        <div className={styles.commonGround}>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundEmoji}>🛡️</span>
            <p>Prioritize keeping their cars safe, reliable, and well-maintained, valuing trust in service providers and cost-effectiveness in repairs.</p>
          </div>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundEmoji}>🛠️</span>
            <p>Appreciate tools or services that simplify car maintenance, such as transparent pricing, convenient scheduling, and timely reminders.</p>
          </div>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundEmoji}>📝</span>
            <p>Open to learning more about car care and leveraging technology to enhance their ownership experience.</p>
          </div>
          <p className={styles.commonGroundCaption}>Common ground between Norris and Jennifer</p>
        </div>
        <div className={styles.researchBlock}>
          <h3>Design pattern research</h3>
          <h4>Competitor's approach</h4>
          <p>As AutoMate had no direct competitors in Hong Kong, we analyzed adjacent service marketplaces with similar booking flows to understand familiar interaction patterns. Our review revealed that many platforms lack transparency, particularly around pricing and service details, making it difficult for users to evaluate value before committing to a booking.</p>
          <h4>Other design reference</h4>
          <p>In addition to service marketplaces, we analyzed travel booking platforms for hotels and experiences, which offer booking workflows familiar to many users. These platforms support decision-making by presenting key information upfront, such as pricing, map location, and included amenities, allowing users to quickly compare options based on proximity and needs, an approach we explored adapting for AutoMate.</p>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        label="Solution"
        layout="text-full-visual"
        visualNode={
          <VisualBlock
            type="image"
            src="/images/case-studies/automate-solution-lofi.png"
            alt="Lo-fi prototype showing early concept improvements for AutoMate booking flow"
            natural
            noShadow
          />
        }
      >
        <h2>The solution</h2>
        <h3>Early concept</h3>
        <p>To reduce decision friction when selecting service locations, we first introduced quick improvements by automatically sorting listings by distance and highlighting nearby options.</p>
      </CaseStudySection>

      <CaseStudySection
        layout="text-full-visual"
        visualNode={
          <div className={styles.feedbackGrid}>
            <div className={styles.feedbackItem}>
              <span className={styles.feedbackEmoji}>📍</span>
              <p>Only 33% of users had granted location access (Mixpanel)</p>
            </div>
            <div className={styles.feedbackItem}>
              <span className={styles.feedbackEmoji}>💳</span>
              <p>Perceived financial risk was still a major barrier to booking.</p>
            </div>
            <div className={styles.feedbackItem}>
              <span className={styles.feedbackEmoji}>💬</span>
              <p>Inconsistent wording reduced user's confidence to commit.</p>
            </div>
          </div>
        }
      >
        <h3>User feedback</h3>
      </CaseStudySection>

      <CaseStudySection layout="text-only">
        <p>In response, we redesigned two key touchpoints. To address proximity friction without requiring GPS access, we introduced a map view letting users visually compare nearby auto shops. To lower the financial barrier, we shifted from full upfront payment to a deposit model — reducing the commitment required before trust was established.</p>
      </CaseStudySection>

      <CaseStudySection id="final-result" label="Final Result" layout="text-only" wide>
        <h2>What shipped</h2>
        <div className={styles.finalResultBlock}>
          <div className={styles.finalResultItem}>
            <div className={styles.finalResultText}>
              <h3>Auto shop location</h3>
              <p>We implemented a map view that allowed users to visually evaluate nearby auto shops without relying on GPS permissions.</p>
              <p>Given the relatively small dataset, engineering estimated the feature could be implemented within a week, making it feasible within the project timeline.</p>
            </div>
            <VisualBlock
              type="image"
              src="/images/case-studies/automate-final-location.png"
              alt="Map view showing nearby auto shops without requiring GPS permissions"
              natural
              noShadow
            />
          </div>

          <div className={styles.finalResultItem}>
            <div className={styles.finalResultText}>
              <h3>Deposit</h3>
              <p>We suggested only taking deposit at checkout to reduce the friction user might have due to low trust.</p>
            </div>
            <VisualBlock
              type="image"
              src="/images/case-studies/automate-final-payment.png"
              alt="Deposit-only checkout to reduce payment friction and build user trust"
              natural
              noShadow
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="prototype"
        label="Prototype"
        layout="text-full-visual"
        visualNode={
          <FigmaEmbed
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/tHg44ISDTVAc7h3J6X2Abu/Portfolio-Case-studies?node-id=55-237&scaling=scale-down&content-scaling=fixed&starting-point-node-id=55%3A237&page-id=0%3A1"
            title="AutoMate interactive prototype"
          />
        }
      >
        <h2>Try it yourself</h2>
        <p>Click through the interactive prototype to experience the redesigned booking flow.</p>
      </CaseStudySection>

      <CaseStudySection id="learning" label="Learning & Impact" layout="text-only">
        <h2>Trust matters more than features</h2>
        <p>The redesign resulted in a <strong>57% increase in conversion rate</strong> after official version update. In service marketplaces, trust often matters more than features — especially when users must pay before receiving a service. We prioritized credibility signals: clear service information, verified reviews, and guarantees, to reduce uncertainty and support in-app bookings.</p>
        <h3>Next opportunity: transparent quotation workflow</h3>
        <p>Many vehicle services require personalized assessments and pricing. A transparent quotation workflow could reduce uncertainty and help users decide before booking.</p>
      </CaseStudySection>

      <NextProjectCard
        title="Itinera"
        description="Helping users move from endless research to confident travel decisions."
        href="/itinera"
        image="/images/case-studies/itinera.png"
      />
      <Footer />
    </>
  );
}
