import CaseStudyHero from '@/components/CaseStudyHero/CaseStudyHero';
import CaseStudySection from '@/components/CaseStudySection/CaseStudySection';
import CaseStudySidebar from '@/components/CaseStudySidebar/CaseStudySidebar';
import VisualBlock from '@/components/VisualBlock/VisualBlock';
import NextProjectCard from '@/components/NextProjectCard/NextProjectCard';
import Footer from '@/components/Footer/Footer';
import ProcessTimeline from '@/components/ProcessTimeline/ProcessTimeline';
import ResearchBreakdown from '@/components/ResearchBreakdown/ResearchBreakdown';
import PersonaCard from '@/components/PersonaCard/PersonaCard';
import MarketDataViz from '@/components/MarketDataViz/MarketDataViz';
import JourneyMap, { LAURA_DATA, WILLIAM_DATA } from '@/components/JourneyMap/JourneyMap';
import FigmaEmbed from '@/components/FigmaEmbed/FigmaEmbed';
import styles from './itinera.module.css';

export const metadata = {
  title: 'Itinera — Mikael Cheung',
};

const sections = [
  { id: 'context',      label: 'Context' },
  { id: 'process',      label: 'Process' },
  { id: 'problem',      label: 'Problem' },
  { id: 'user',         label: 'User' },
  { id: 'solution',     label: 'Solution' },
  { id: 'user-testing', label: 'User Testing' },
  { id: 'final-result', label: 'Final Result' },
  { id: 'prototype',    label: 'Prototype' },
  { id: 'learning',     label: 'Learning & Impact' },
];

const meta = [
  { label: 'Role', value: 'Lead Product Designer' },
  { label: 'Timeline', value: '7 months' },
  { label: 'Tools', value: 'Figma' },
];

export default function ItineraPage() {
  return (
    <>
      <CaseStudySidebar sections={sections} revealAtId="process" />
      <CaseStudyHero
        title="Itinera"
        tagline="Making Trip Planning Possible Without Endless Research"
        image="/images/case-studies/itinera-cover.png"
        imageAlt="Itinera app interface"
        meta={meta}
      />

      <CaseStudySection id="context" label="Context" layout="text-only" wide>
        <h2>TL;DR</h2>
        <p>During research, I discovered that middle-aged travellers often face challenges finding reliable, personalized travel resources that cater to their unique needs. This demographic typically has financial stability and values meaningful experiences over cost-effectiveness. However, they often need to plan trips with family or friends, adding complexity to the process as they must balance diverse preferences, physical abilities, and interests within the group. Without a clear and trustworthy planning tool, they risk frustration, unmet expectations, and travel pitfalls, making their experiences less enjoyable.</p>
        <h3>Project Objective</h3>
        <p>Design a planning experience catering travellers' need, to help them avoid bad travel experience as much as possible, to ensure the journey matches their safety, time, budget and activity requirements. To achieve that level of customization, I integrated AI to create tailored itineraries, recommend attractions, and encourage experience sharing to simplify planning, enhance trust, and provide meaningful travel suggestions.</p>
        <h3>My Role</h3>
        <p>Lead Product Designer</p>
        <ul>
          <li>Conducted user research and semi-structured interviews.</li>
          <li>Defined user personas, created wireframes, and developed high-fidelity prototypes.</li>
        </ul>
        <h3>Result</h3>
        <p>The app uses AI to create personalized travel itineraries, offering tailored recommendations based on user preferences, energy, time, and budget. It includes group planning tools to balance diverse needs, real-time adjustments to adapt plans, and a feature for sharing experiences to help others.</p>
      </CaseStudySection>

      <CaseStudySection
        id="process"
        label="Process"
        layout="text-full-visual"
        visualNode={<ProcessTimeline />}
      >
        <h2>Process</h2>
        <p>In this case study, the Double Diamond method was used to provide a structured framework for tackling complex problem and opportunties in traveller planning behaviours.</p>
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem" layout="text-only" wide>
        <h2>The world is your oyster</h2>
        <p>This data provides essential context for understanding the travel behaviours and spending patterns of Canadian travellers, highlighting the market potential and informing the app's design to meet their needs effectively.</p>
        <MarketDataViz />
        <h3>What problem does these travellers face?</h3>
        <ul className={styles.problemList}>
          <li>
            <h4>Overwhelming information</h4>
            <p>Over millions results are shown every time you search up a destination. With that much of information, user tends to get overwhelmed.</p>
          </li>
          <li>
            <h4>Ineffective Search</h4>
            <p>User often need to evaluate their own needs to find the best attractions for their trips, often with seniors or children.</p>
          </li>
          <li>
            <h4>Complicated organization</h4>
            <p>They need to use their own way in organizing all the information they got, create itineraries and share with their family or friends who travel together.</p>
          </li>
        </ul>
        <h3>How do people plan their trips currently?</h3>
        <p>I used semi-structured interviews to understand how user plan their trips currently. The interview is divided into four parts;</p>
      </CaseStudySection>

      <CaseStudySection id="user" label="User" layout="text-only" wide>
        <h2>Current User Journey Map</h2>
        <p>During the interviews, the insights can be summarized into the following two groups of travellers. To fully understand the user experience, I created two customer journey maps to capture the distinct challenges faced by these audiences and identify opportunities for design solutions.</p>
        <PersonaCard
          number={1}
          name="William"
          archetype="Family-oriented"
          description="William is a family-oriented person. He loves providing great experience to his family in their day-to-day and vacations."
          quote="How am I supposed to plan a trip that keeps both my kids excited and my parents comfortable without someone feeling left out or exhausted?"
          expectations={[
            'Clear online information of all available spots and restaurants',
            'Ability to compare different rating of the tourist spots',
            'Easy to turn the information to an itinerary',
          ]}
          imageSrc="/images/case-studies/William.png"
          imageAlt="William persona photo"
        />
        <JourneyMap data={WILLIAM_DATA} />

        <PersonaCard
          number={2}
          name="Laura"
          archetype="Adventurer"
          description="Laura is an adventurer who loves visiting exotic places. She also loves to visiting off-the-beaten-path locations."
          quote="I just want to go somewhere I'll love, but I have no idea where to start!"
          expectations={[
            'Getting information from visual-based sources',
            'Prefer recommendations that feel more local or less commercialized',
            'Narrow down options rapidly without feeling bogged down by excess choices',
          ]}
          imageSrc="/images/case-studies/laura.png"
          imageAlt="Laura persona photo"
        />
        <JourneyMap data={LAURA_DATA} />

        <h3>Similarity</h3>
        <ul>
          <li>Both audience focus on avoiding bad experience in general</li>
          <li>Flexibility during travel is crucial (e.g. alternatives for energy levels.)</li>
          <li>Both value sharing experiences and contributing insights</li>
        </ul>

        <h3>Differences</h3>
        <div className={styles.differencesGrid}>
          <div>
            <h4>Group travellers</h4>
            <p>Focus on balancing preferences, group coordination, and inclusivity</p>
          </div>
          <div>
            <h4>Experienced Travellers</h4>
            <p>Focus on individual discovery and exploration</p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="solution" label="Solution" layout="text-only" wide>
        <h2>Solutions</h2>
        <div className={styles.solutionItem}>
          <span className={styles.solutionNumber}>1</span>
          <div>
            <h3>AI-Driven personalization</h3>
            <p>Based on criteria user value (e.g. who are they going with, activity level, prefer activities, and accessibility</p>
          </div>
        </div>
        <div className={styles.solutionItem}>
          <span className={styles.solutionNumber}>2</span>
          <div>
            <h3>Itinerary sharing</h3>
            <p>User can share their experience with their itinerary, so that other users can refer to the itinerary when they are planning with a similar participants demographics or needs.</p>
          </div>
        </div>
        <div className={styles.solutionItem}>
          <span className={styles.solutionNumber}>3</span>
          <div>
            <h3>Trip &amp; attraction recommendations</h3>
            <p>The system recommends destination and attractions based on your previous likes and bookmarks</p>
          </div>
        </div>

        <h3 className={styles.subBlockHeading}>How would people plan differently with our app</h3>
        <h4>User flow</h4>
        <p>I used user flows in this case study to visually map the step-by-step interactions users have with the app, showcasing how it simplifies complex processes like personalized trip planning or recommendations. It highlights how the app addresses user pain points efficiently, guiding them toward achieving their travel goals seamlessly.</p>
        <VisualBlock type="image" src="/images/case-studies/itinera-user-flow.png" alt="User flow diagram" natural />
        <h4>Functional Map</h4>
        <p>This functional map outline the app's key features, like the AI-driven personalization and planning tools, and how they work together based on the user flow. This provides a clear overview of the app's capabilities.</p>
        <VisualBlock type="image" src="/images/case-studies/itinera-function-map.png" alt="Functional map" natural />
      </CaseStudySection>

      <CaseStudySection id="user-testing" label="User Testing" layout="text-only" wide>
        <h2>User testing</h2>
        <h3>Low-fidelity Prototype</h3>
        <p>We used Lo-fi wireframes to quickly test our ideas to see if they can solve the mentioned problems.</p>
        <VisualBlock type="image" src="/images/case-studies/itinera-lofi.png" alt="Low-fidelity prototype wireframes" natural />
        <h3>Testing</h3>
        <div className={styles.testingLayout}>
          <p>6 Testers are coming from different ethical background, income, and age group. They were interviewed earlier in the project for the user insight. They played with the prototype freely to begin with, following with me asking semi-structured questions about their thoughts on the design. The tests were recorded with their permission. They said out loud whenever they have good or bad comments regarding the design, and I took notes during the process.</p>
          <VisualBlock type="image" src="/images/case-studies/itinera-testing.png" alt="User testing session" natural />
        </div>
        <ResearchBreakdown />
        <h3>Iteration direction</h3>
        <p>I went to the recordings afterwards, and summarized the main directions for the iteration.</p>
        <ul>
          <li>Measuring activity level, duration and prefer activities are good criteria for the AI personalization. It would be nice to include accessibility into consideration as well.</li>
          <li>User can save spots into their itineraries, but they should be able to save the spots even if they don't fit in a particular trip.</li>
          <li>Wordings used in the design might seems a little cold and inconsistent.</li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="final-result" label="Final Result" layout="text-only" wide>
        <h2>Finalized features</h2>
        <div className={styles.resultItem}>
          <div className={styles.resultText}>
            <h3>AI personalized itinerary</h3>
            <p>By entering the require information, AI will generate an itinerary based on user's preferences. This shorten the time for user to plan their trip from scratch and give them the flexibility to adjust in the future.</p>
            <p>The preference options includes:</p>
            <ul>
              <li>Destination</li>
              <li>Prefer activities</li>
              <li>Trip duration</li>
              <li>Participants</li>
              <li>Accessibility need</li>
              <li>Activity level</li>
            </ul>
          </div>
          <VisualBlock type="image" src="/images/case-studies/itinera-ai-personalized.png" alt="AI personalized itinerary screens" natural />
        </div>
        <div className={styles.resultItem}>
          <div className={styles.resultText}>
            <h3>Itinerary detail</h3>
            <p>By entering the require information, AI will generate an itinerary based on user's preferences. This shorten the time for user to plan their trip from scratch and give them the flexibility to adjust in the future.</p>
          </div>
          <VisualBlock type="image" src="/images/case-studies/itinera-itinerary-detail.png" alt="Itinerary detail screens" natural />
        </div>
        <div className={styles.resultItem}>
          <div className={styles.resultText}>
            <h3>Profile</h3>
            <p>User can save itineraries that they are interested in here in their profile for future use. If they like the AI personalized itinerary, it will be saved here as well.</p>
            <p>Bookmarks tab in their profile will be useful when they are interested in certain spots they see on the app, but they are planning to visit that destination any time soon. User can add the spots to an itinerary from the Bookmarks.</p>
            <p>The activity tab is used when user want to share their thoughts regarding a spot or their public itinerary. Those review will be shown on this tab.</p>
          </div>
          <VisualBlock type="image" src="/images/case-studies/itinera-profile.png" alt="Profile screens" natural />
        </div>
        <div className={styles.resultItem}>
          <div className={styles.resultText}>
            <h3>Explore options with others' input</h3>
            <p>There are two ways to explore itineraries on the app, through itineraries or blogs.</p>
            <p>With user-generated itinerary, users can see how other people plan their trips to destinations, which helps them to plan their own.</p>
            <p>Blogs provides a more in-depth review on a certain topics, like restaurants, must-visit spots, or other related topics regarding the destinations.</p>
          </div>
          <VisualBlock type="image" src="/images/case-studies/itinera-explore.png" alt="Explore and blog screens" natural />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="prototype"
        label="Prototype"
        layout="text-full-visual"
        visualNode={
          <FigmaEmbed
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/tHg44ISDTVAc7h3J6X2Abu/Portfolio-Case-studies?node-id=1014-754&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1014%3A754&page-id=8%3A1775"
            title="Itinera interactive prototype"
          />
        }
      >
        <h2>Try it yourself</h2>
        <p>Click through the interactive prototype to experience the Itinera travel planning flow.</p>
      </CaseStudySection>

      <CaseStudySection id="learning" label="Learning & Impact" layout="text-only">
        <h2>Reflection</h2>
        <h3>User-generated content is key</h3>
        <p>One of the main concerns for travellers is to avoid bad experience during their trips. By encouraging user-generated content, all users can be benefitted from those information and make well-informed decision. Before we have enough data to support the AI algorithms for personalization, we will have to collect useful information online and build our database.</p>
        <h3>Next steps: Multi-languages and localization</h3>
        <p>The app has opportunities to expand its functionality by integrating multi-languages and localization features, such as content translation and tailoring recommendations based on regional preferences. Advanced tools like real-time itinerary adjustments, multi-destination planning, and group coordination enhancements can further personalize the user experience.</p>
        <p>Additionally, partnerships with local businesses and loyalty programs will help this app develop into a leader in the travel planning and management tool as a company.</p>
      </CaseStudySection>

      <NextProjectCard
        title="Cozey"
        description="Turning modular product complexity into a clearer, more confident buying experience."
        href="/cozey"
        image="/images/case-studies/cozey.png"
      />
      <Footer />
    </>
  );
}
