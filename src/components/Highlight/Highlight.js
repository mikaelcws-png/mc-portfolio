import styles from './Highlight.module.css';

export default function Highlight({ children }) {
  return <span className={styles.highlight}>{children}</span>;
}
