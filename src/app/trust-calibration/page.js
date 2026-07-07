import CaseStudyHero from '@/components/CaseStudyHero/CaseStudyHero';
import CaseStudySection from '@/components/CaseStudySection/CaseStudySection';
import VisualBlock from '@/components/VisualBlock/VisualBlock';
import PersonaCard from '@/components/PersonaCard/PersonaCard';
import TrustCalibrationFlow from '@/components/TrustCalibrationFlow/TrustCalibrationFlow';
import Footer from '@/components/Footer/Footer';
import CaseStudyTracker from '@/components/CaseStudyTracker/CaseStudyTracker';
import styles from './trust-calibration.module.css';

export const metadata = {
  title: 'Trust Calibration - Mikael Cheung',
};

const meta = [
  { label: 'Role', value: 'Product Manager and Designer' },
  { label: 'Timeline', value: '2 weeks' },
  { label: 'Tools', value: 'Claude Code, Figma Make' },
];

export default function TrustCalibrationPage() {
  return (
    <>
      <CaseStudyTracker caseStudy="trust-calibration" />
      <CaseStudyHero
        title="Trust Calibration for Agentic AI in Enterprise"
        tagline="Agentic AI products are designed for users who already trust them. Most don't. This is what designing for the gap looks like."
        image="/images/case-studies/trust-calibration-cover.png"
        imageAlt="Trust Calibration case study cover"
        meta={meta}
        noWrapTitle
      />

      <CaseStudySection id="problem" label="Problem Statement" layout="text-only" wide>
        <h2>The problem nobody has designed for</h2>
        <p>Agentic AI tools are being deployed into organizations where most users have no prior experience working with an AI agent. These users arrive without a mental model of what the agent does, how it reasons, or what happens when it gets something wrong.</p>
        <p>The products themselves assume a level of familiarity the user hasn't earned yet. They ask for action-level trust before establishing baseline trust. The result is low adoption, shallow usage, and AI investment that doesn't convert into measurable business value.</p>
        <p>This isn't a UI problem. It's a sequencing problem. The industry hasn't designed for the moment before the agent can be useful.</p>
      </CaseStudySection>

      <CaseStudySection
        id="diagnosis"
        label="Diagnosis"
        layout="text-side-visual"
        visualNode={
          <div className={styles.cardWrap}>
            <VisualBlock
              type="image"
              src="/images/case-studies/trust-pyramid.png"
              alt="Trust pyramid diagram showing baseline trust as the foundation for action-level trust"
              caption="Adapted from the NN/g Pyramid of Trust"
              natural
              noShadow
            />
          </div>
        }
      >
        <h2>Layers of trust, but the base is missing.</h2>
        <p>Baseline trust is the belief that a system is predictable and understandable - that you know roughly what it will do and why. Action-level trust is the willingness to act on a system's output and put your name on the result. These are different things, and they have to be earned in sequence. You can't skip baseline trust and expect action-level trust to follow.</p>
        <p>Agentic AI products are designed around action-level trust. They surface recommendations, flag anomalies, and generate outputs. What they rarely do is show their work in a way that builds the baseline layer first. The assumption is that users will calibrate through experience. But in organizational contexts, most users don't have the time, the safety, or the permission to experiment before they're expected to produce.</p>
        <p>Even reasoning traces don't close the gap. A trace answers "what did it do" after the fact. Calibration answers "can I rely on it" before the first real case. Traces are the raw material for trust - calibration is the mechanism that builds it.</p>
      </CaseStudySection>

      <CaseStudySection id="user-profile" label="User Profile" layout="text-only" wide>
        <h2>Use case</h2>
        <p>Maya is a mid-level lending auditor at an equipment rental company. As part of a firm-wide AI initiative, her team was given an enterprise AI workspace built for regulated industries - an AI assistant, search across the company's internal systems, and customizable agents that automate multi-step workflows.</p>
        <p>On paper, it should transform her work. A lending audit means pulling a file - application, bank statements, audit reports, approval memos - and verifying the decision followed policy. The workspace can search and summarize documents scattered across the company's systems, extract key figures, flag inconsistencies between what was documented and what policy requires, and draft the audit summary. A day of manual document review should become a couple of hours of reviewing the agent's work.</p>
        <p>But Maya's confusion sits in her workflow, not the product. The workspace logs its interactions and shows reasoning traces - the tool itself is well built. What nobody told her is how to work with it. The capability was deployed. The working relationship wasn't.</p>
        <div className={`${styles.commonGround} ${styles.gapBelow}`}>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundLabel}>Delegation</span>
            <p>Which parts of the audit is she allowed to delegate to the agent, and which must she still do herself?</p>
          </div>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundLabel}>Defensibility</span>
            <p>Is an agent-drafted summary defensible when a regulator asks who verified the bank statements?</p>
          </div>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundLabel}>Judgment</span>
            <p>How does the agent decide a discrepancy is worth flagging versus ignoring?</p>
          </div>
        </div>
        <PersonaCard
          variant="automate"
          name="Maya"
          imageSrc="/images/case-studies/maya.png"
          imageAlt="Maya, mid-level lending auditor"
          demographics={{ age: '34', occupation: 'Mid-level Lending Auditor', location: 'Toronto, ON' }}
          quote="The tool can show me exactly what it did. What nobody can tell me is whether I'm allowed to rely on it."
          goals={[
            'Complete lending audits faster without sacrificing defensibility',
            'Understand what the agent is doing and why',
            'Build a workflow she can rely on case after case',
          ]}
          painPoints={[
            'No one defined which audit steps she can delegate to the agent',
            'Output needs to be defensible to managers and regulators',
            "Can't tell where the agent's judgment ends and hers begins",
          ]}
          currentSolution="Re-verifies everything the agent produces manually - erasing the time savings"
          interests={['Professional accuracy', 'Regulatory compliance', 'Efficient workflows']}
          photoWrapClassName={styles.mayaPhotoWrap}
          photoClassName={styles.mayaPhoto}
        />
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        label="Solution"
        layout="text-full-visual"
        visualNode={<TrustCalibrationFlow />}
      >
        <h2>Calibration, not onboarding</h2>
        <p>A trust calibration layer that sits before the agent takes any action on a real case. Not onboarding. Onboarding teaches features. Calibration builds a working relationship. The core mechanic: the agent works a past resolved case the user already knows the answer to. She watches it reason through something familiar before relying on it for anything real.</p>
      </CaseStudySection>

      <CaseStudySection id="what-changes" label="What Changes" layout="text-only" wide>
        <h2>What AI actually mean for each team?</h2>
        <div className={styles.commonGround}>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundLabel}>For Maya</span>
            <p>She understands what the agent does before she relies on it. Her output stays defensible because she's never guessing what the agent did or why.</p>
          </div>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundLabel}>For IT</span>
            <p>Per-team configuration is no longer an engineering dependency. The user builds her own workflow context in plain language, grounded in how she actually works.</p>
          </div>
          <div className={styles.commonGroundItem}>
            <span className={styles.commonGroundLabel}>For Leadership</span>
            <p>AI usage measured by decisions made, not tokens consumed. Faster time to actual utility. Workflows that reflect real operations.</p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="stakeholders" label="Stakeholders" layout="text-only" wide>
        <h2>What are their concerns?</h2>
        <div className={styles.cardWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Stakeholder</th>
                <th>Role</th>
                <th>Primary concern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maya (end user)</td>
                <td>Lending auditor</td>
                <td>Can I trust this enough to use it on real cases?</td>
              </tr>
              <tr>
                <td>Maya's manager</td>
                <td>Audit team lead</td>
                <td>Is the team's output still defensible and reviewable?</td>
              </tr>
              <tr>
                <td>IT / implementation</td>
                <td>Enterprise deployment</td>
                <td>Can we deploy without configuring every team individually?</td>
              </tr>
              <tr>
                <td>Compliance / legal</td>
                <td>Risk oversight</td>
                <td>Does agent-assisted output meet regulatory standards?</td>
              </tr>
              <tr>
                <td>Procurement / leadership</td>
                <td>Budget holder</td>
                <td>Is this producing value beyond token counts?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="prototype"
        label="Prototype"
        layout="text-full-visual"
        visualNode={
          <VisualBlock
            type="embed"
            src="/prototype/index.html"
            alt="Trust Calibration interactive prototype"
            aspectRatio="16/9"
          />
        }
      >
        <h2>See it in action</h2>
        <p>A walkthrough of the trust calibration onboarding flow - from intake questions to a saved agent context. Navigate through the screens using the buttons inside the prototype.</p>
        <p><a href="/prototype/index.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline', fontSize: 'var(--text-sm)' }}>Open in full screen →</a></p>
      </CaseStudySection>

      <CaseStudySection id="limitations" label="Limitations" layout="text-only" wide>
        <h2>What this doesn't solve</h2>
        <p>This calibration layer addresses the trust gap at the product level. It does not fix the organizational problem upstream - most companies buy AI tools without defining what good usage looks like for each team. Organizational guidance, training, and success metrics still matter and sit outside the scope of this design.</p>
      </CaseStudySection>

      <CaseStudySection id="metrics" label="Success Metrics" layout="text-only" wide>
        <h2>How we'd measure this</h2>
        <div className={styles.cardWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Signal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Completion rate of first-use flow</td>
                <td>Are users finishing calibration or dropping off?</td>
              </tr>
              <tr>
                <td>Time to first real case</td>
                <td>How quickly does calibration convert to productive use?</td>
              </tr>
              <tr>
                <td>User-reported confidence after step 3</td>
                <td>Does watching the agent work a past case build trust?</td>
              </tr>
              <tr>
                <td>Review cadence on live cases</td>
                <td>Are users over-reviewing (low trust) or under-delegating?</td>
              </tr>
              <tr>
                <td>Retention at 30 and 90 days</td>
                <td>Does early calibration produce sustained usage?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CaseStudySection>

      <CaseStudySection id="open-questions" label="Open Questions" layout="text-only" wide>
        <h2>How to optimize this product?</h2>
        <ol className={styles.questionList}>
          <li>
            <span className={styles.questionNumber}>1</span>
            <p>What happens when a user has no past case to upload? The flow needs a graceful fallback - a templated example or skip-ahead state - that doesn't break the trust-building sequence.</p>
          </li>
          <li>
            <span className={styles.questionNumber}>2</span>
            <p>How does the calibration layer interact with organizational compliance requirements? In regulated industries, the agent's reasoning may need to be logged regardless of user preference.</p>
          </li>
          <li>
            <span className={styles.questionNumber}>3</span>
            <p>At what point does a saved workflow need to be recertified? If regulations change or the user's role expands, stale preferences become a liability.</p>
          </li>
        </ol>
      </CaseStudySection>

      <CaseStudySection id="next-steps" label="Next Steps" layout="text-only" wide>
        <h2>Where this goes next</h2>
        <h3>Role-adaptive flow</h3>
        <p>The current prototype presents the same calibration experience regardless of intake answers. The next iteration uses those answers to adjust the flow: document types surfaced, judgment scenarios presented, and agent language throughout. An auditor and a sales ops analyst are doing fundamentally different work.</p>
        <h3>Multi-team rollout model</h3>
        <p>The current design solves for individual onboarding. The next question is organizational: how does a team lead deploy this across twelve auditors without each person starting from scratch? A shared workflow template, seeded by a team lead and adjustable per user, would reduce setup time and create consistency.</p>
        <h3>Workflow versioning</h3>
        <p>As regulations change or a user's role expands, saved preferences become stale. A lightweight versioning system that flags when a saved workflow hasn't been reviewed in a defined period would keep the calibration layer accurate over time.</p>
      </CaseStudySection>

      <Footer />
    </>
  );
}
