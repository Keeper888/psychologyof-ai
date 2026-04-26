import { notFound } from 'next/navigation';
import Link from 'next/link';
import { papers } from '@/data/papers';
import { topics } from '@/data/topics';
import PaperCard from '@/components/PaperCard';
import styles from './page.module.css';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return papers.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const paper = papers.find(p => p.slug === params.slug);
  if (!paper) return { title: 'Paper Not Found' };
  return {
    title: `${paper.title} — Psychology of AI`,
    description: paper.abstract.slice(0, 160),
  };
}

export default function PaperPage({ params }: Props) {
  const paper = papers.find(p => p.slug === params.slug);
  if (!paper) notFound();

  const topic = topics.find(t => t.slug === paper.topic);
  const related = papers.filter(p => p.topic === paper.topic && p.slug !== paper.slug).slice(0, 3);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/research">Research</Link>
          <span className={styles.sep}>/</span>
          {topic && <Link href={`/topics/${topic.slug}`}>{topic.name}</Link>}
          <span className={styles.sep}>/</span>
          <span className={styles.current}>Paper</span>
        </div>

        <article className={styles.article}>
          <div className={styles.meta}>
            <span className={styles.year}>{paper.year}</span>
            <span className={styles.dot}>&middot;</span>
            <span className={styles.journal}>{paper.journal}</span>
          </div>

          <h1 className={styles.title}>{paper.title}</h1>
          <p className={styles.authors}>{paper.authors}</p>

          {topic && (
            <Link
              href={`/topics/${topic.slug}`}
              className={styles.topicTag}
              style={{ '--tag-color': topic.color } as React.CSSProperties}
            >
              {topic.icon} {topic.name}
            </Link>
          )}

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Abstract</h2>
            <p className={styles.abstract}>{paper.abstract}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Findings</h2>
            <ul className={styles.findings}>
              {paper.keyFindings.map((finding, i) => (
                <li key={i} className={styles.finding}>{finding}</li>
              ))}
            </ul>
          </div>

          {paper.doi && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Source</h2>
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.doi}
              >
                DOI: {paper.doi} &rarr;
              </a>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>Related Papers</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <PaperCard key={p.slug} paper={p} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
