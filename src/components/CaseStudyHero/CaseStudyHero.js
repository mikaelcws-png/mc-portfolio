import styles from './CaseStudyHero.module.css';

export default function CaseStudyHero({ title, tagline, image, imageAlt = '', meta = [], noWrapTitle = false }) {
  return (
    <section className={styles.hero}>
      {image && (
        <div className={styles.imageWrap}>
          <img
            src={image}
            alt={imageAlt}
            className={styles.heroImage}
            loading="eager"
          />
        </div>
      )}
      <div className={`${styles.content}${noWrapTitle ? ` ${styles.contentStacked}` : ''}`}>
        {noWrapTitle ? (
          <>
            <h1 className={`${styles.title} ${styles.titleNoWrap}`}>{title}</h1>
            {(tagline || meta.length > 0) && (
              <div className={styles.bottom}>
                {tagline && <p className={styles.tagline}>{tagline}</p>}
                {meta.length > 0 && (
                  <dl className={styles.metaStrip}>
                    {meta.map(({ label, value }) => (
                      <div key={label} className={styles.metaItem}>
                        <dt className={styles.metaLabel}>{label}</dt>
                        <dd className={styles.metaValue}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.left}>
              <h1 className={styles.title}>{title}</h1>
              {tagline && <p className={styles.tagline}>{tagline}</p>}
            </div>
            {meta.length > 0 && (
              <dl className={styles.metaStrip}>
                {meta.map(({ label, value }) => (
                  <div key={label} className={styles.metaItem}>
                    <dt className={styles.metaLabel}>{label}</dt>
                    <dd className={styles.metaValue}>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        )}
      </div>
    </section>
  );
}
