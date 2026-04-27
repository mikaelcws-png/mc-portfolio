import VisualBlock from '@/components/VisualBlock/VisualBlock';
import styles from './CaseStudySection.module.css';

/**
 * layout variants:
 *   'text-only'        — single column text, no visual
 *   'text-full-visual' — text block, then visual spanning full content width below
 *   'text-side-visual' — text left, visual right (2-column)
 *   'visual-grid'      — 2 or 3 visuals side by side (no text block)
 */
export default function CaseStudySection({ id, label, layout = 'text-only', children, visual, visualNode, wide }) {
  return (
    <section id={id} className={`${styles.section} ${!label ? styles.sectionNoLabel : ''}`}>
      <div className={styles.inner}>
        {label && <span className={styles.label}>{label}</span>}

        {layout === 'text-only' && (
          <div className={`${styles.textOnly} ${wide ? styles.textOnlyWide : ''}`}>
            {children}
          </div>
        )}

        {layout === 'text-full-visual' && (
          <div className={styles.textFull}>
            <div className={styles.prose}>{children}</div>
            {visualNode ?? (visual && <VisualBlock {...visual} />)}
          </div>
        )}

        {layout === 'text-side-visual' && (
          <div className={styles.textSide}>
            <div className={styles.prose}>{children}</div>
            {(visualNode || visual) && (
              <div className={styles.sideVisual}>
                {visualNode ?? <VisualBlock {...visual} />}
              </div>
            )}
          </div>
        )}

        {layout === 'visual-grid' && (
          visualNode ?? (visual && <VisualBlock {...visual} />)
        )}
      </div>
    </section>
  );
}
