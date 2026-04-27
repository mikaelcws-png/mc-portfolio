import styles from './PhotoCard.module.css';

export default function PhotoCard({ src, alt = '', rotate = 0 }) {
  return (
    <div className={styles.card} style={{ transform: `rotate(${rotate}deg)` }}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  );
}
