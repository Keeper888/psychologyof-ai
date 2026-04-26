import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.logoIcon}>&#x03C8;</span>
              psychologyof<span className={styles.accent}>.ai</span>
            </span>
            <p className={styles.tagline}>
              Mapping the human mind in the age of artificial intelligence.
            </p>
          </div>
          <div className={styles.links}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Explore</h4>
              <Link href="/research">Research Library</Link>
              <Link href="/#topics">Topics</Link>
              <Link href="/#questions">Vote on Questions</Link>
            </div>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>About</h4>
              <Link href="/about">The Project</Link>
              <a href="https://github.com/Keeper888" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} psychologyof.ai &mdash; A research project by Antonio Gison</p>
        </div>
      </div>
    </footer>
  );
}
