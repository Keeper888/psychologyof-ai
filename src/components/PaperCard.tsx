import Link from 'next/link';
import type { Paper } from '@/data/papers';
import styles from './PaperCard.module.css';

interface Props {
  paper: Paper;
  compact?: boolean;
}

export default function PaperCard({ paper, compact }: Props) {
  return (
    <Link href={`/research/${paper.slug}`} className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <div className={styles.meta}>
        <span className={styles.year}>{paper.year}</span>
        <span className={styles.dot}>&middot;</span>
        <span className={styles.journal}>{paper.journal}</span>
      </div>
      <h3 className={styles.title}>{paper.title}</h3>
      <p className={styles.authors}>{paper.authors}</p>
      {!compact && <p className={styles.abstract}>{paper.abstract.slice(0, 180)}...</p>}
      <div className={styles.footer}>
        <span className={styles.tag}>{paper.topic.replace('-', ' ')}</span>
        <span className={styles.arrow}>&rarr;</span>
      </div>
    </Link>
  );
}
