import { notFound } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/data/topics';
import { papers } from '@/data/papers';
import PaperCard from '@/components/PaperCard';
import styles from './page.module.css';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return topics.map(t => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props) {
  const topic = topics.find(t => t.slug === params.slug);
  if (!topic) return { title: 'Topic Not Found' };
  return {
    title: `${topic.name} — Psychology of AI`,
    description: topic.description,
  };
}

export default function TopicPage({ params }: Props) {
  const topic = topics.find(t => t.slug === params.slug);
  if (!topic) notFound();

  const topicPapers = papers.filter(p => p.topic === topic.slug);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.sep}>/</span>
          <Link href="/#topics">Topics</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>{topic.name}</span>
        </div>

        <div className={styles.header}>
          <span className={styles.icon}>{topic.icon}</span>
          <h1 className={styles.title} style={{ color: topic.color }}>{topic.name}</h1>
          <p className={styles.description}>{topic.description}</p>
          <p className={styles.count}>{topicPapers.length} research papers</p>
        </div>

        <div className={styles.grid}>
          {topicPapers.map(paper => (
            <PaperCard key={paper.slug} paper={paper} />
          ))}
        </div>

        <div className={styles.back}>
          <Link href="/#topics" className="btn btn-ghost">&larr; All Topics</Link>
        </div>
      </div>
    </div>
  );
}
