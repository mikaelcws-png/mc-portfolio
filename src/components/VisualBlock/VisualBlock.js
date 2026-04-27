import styles from './VisualBlock.module.css';

/**
 * type variants:
 *   'image'      — single image with optional caption
 *   'image-grid' — 2 or 3 images side by side, each with optional caption
 *   'video'      — <video> tag with src
 *   'embed'      — <iframe> for Figma prototypes, Loom, etc.
 */
export default function VisualBlock({ type = 'image', src, alt = '', caption, items, aspectRatio = '16/9', natural = false, noShadow = false }) {
  return (
    <figure className={styles.figure}>
      {type === 'image' && natural && (
        <img src={src} alt={alt} className={noShadow ? styles.imageNaturalNoShadow : styles.imageNatural} loading="lazy" />
      )}
      {type === 'image' && !natural && (
        <div className={noShadow ? styles.imageWrapNoShadow : styles.imageWrap} style={{ aspectRatio }}>
          <img src={src} alt={alt} className={styles.image} loading="lazy" />
        </div>
      )}

      {type === 'image-grid' && items && (
        <div className={styles.grid} data-count={items.length}>
          {items.map((item, i) => (
            <figure key={i} className={styles.gridItem}>
              <div className={styles.imageWrap} style={{ aspectRatio }}>
                <img src={item.src} alt={item.alt ?? ''} className={styles.image} loading="lazy" />
              </div>
              {item.caption && <figcaption className={styles.caption}>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {type === 'video' && (
        <div className={styles.imageWrap} style={{ aspectRatio }}>
          <video src={src} controls className={styles.image} />
        </div>
      )}

      {type === 'embed' && (
        <div className={styles.imageWrap} style={{ aspectRatio }}>
          <iframe src={src} className={styles.embed} allowFullScreen title={alt || 'Embedded content'} />
        </div>
      )}

      {caption && type !== 'image-grid' && (
        <figcaption className={styles.caption}>{caption}</figcaption>
      )}
    </figure>
  );
}
