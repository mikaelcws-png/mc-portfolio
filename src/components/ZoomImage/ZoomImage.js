'use client';
import { useState } from 'react';
import styles from './ZoomImage.module.css';

export default function ZoomImage({ src, alt, className }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${styles.thumb} ${className ?? ''}`}
        onClick={() => setOpen(true)}
        loading="lazy"
      />
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className={styles.full} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
