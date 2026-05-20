'use client';

import styles from './FigmaEmbed.module.css';

export default function FigmaEmbed({ src, title = 'Figma prototype', aspectRatio = '9/16' }) {
  return (
    <div className={styles.wrapper} style={{ aspectRatio }}>
      <iframe
        src={src}
        title={title}
        allowFullScreen
        className={styles.frame}
      />
    </div>
  );
}
