'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>&#x03C8;</span>
          <span className={styles.logoText}>psychologyof<span className={styles.logoDot}>.ai</span></span>
        </Link>
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <Link href="/research" className={styles.link} onClick={() => setMenuOpen(false)}>Research</Link>
          <Link href="/about" className={styles.link} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/#questions" className={styles.ctaLink} onClick={() => setMenuOpen(false)}>Vote on Questions</Link>
        </nav>
      </div>
    </header>
  );
}
