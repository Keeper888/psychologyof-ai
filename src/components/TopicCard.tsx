import Link from 'next/link';
import type { Topic } from '@/data/topics';
import styles from './TopicCard.module.css';

interface Props {
  topic: Topic;
}

export default function TopicCard({ topic }: Props) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={styles.card}
      style={{ '--topic-color': topic.color } as React.CSSProperties}
    >
      <span className={styles.icon}>{topic.icon}</span>
      <h3 className={styles.name}>{topic.name}</h3>
      <p className={styles.description}>{topic.description}</p>
      <span className={styles.count}>{topic.paperCount} papers</span>
    </Link>
  );
}
