import Link from 'next/link';
import { papers } from '@/data/papers';
import { topics } from '@/data/topics';
import PaperCard from '@/components/PaperCard';
import TopicCard from '@/components/TopicCard';
import QuestionPoll from '@/components/QuestionPoll';
import styles from './page.module.css';

export default function Home() {
  const featuredPapers = papers.filter(p => p.featured);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroGlow} />
          <p className={styles.heroLabel}>Research Hub</p>
          <h1 className={styles.heroTitle}>
            The Psychology<br />
            <span className={styles.heroAccent}>of Artificial Intelligence</span>
          </h1>
          <p className={styles.heroSubtitle}>
            How does AI reshape the way we think, trust, create, and connect?
            We curate and synthesize the research that maps the human mind
            in the age of intelligent machines.
          </p>
          <div className={styles.heroCta}>
            <Link href="/research" className="btn btn-primary">
              Explore Research
            </Link>
            <a href="#questions" className="btn btn-ghost">
              Vote on Questions
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{papers.length}</span>
            <span className={styles.statLabel}>Research Papers</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>{topics.length}</span>
            <span className={styles.statLabel}>Research Topics</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>{new Set(papers.map(p => p.journal)).size}</span>
            <span className={styles.statLabel}>Journals & Venues</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>{Math.max(...papers.map(p => p.year)) - Math.min(...papers.map(p => p.year))}</span>
            <span className={styles.statLabel}>Years of Research</span>
          </div>
        </div>
      </section>

      {/* Question Poll */}
      <QuestionPoll />

      {/* Topics */}
      <section className="section" id="topics">
        <div className="container">
          <p className="section-label">Research Topics</p>
          <h2 className="section-title">Eight Lenses on Human-AI Psychology</h2>
          <p className="section-subtitle">
            Each topic represents a distinct psychological dimension of our relationship with artificial intelligence.
          </p>
          <div className={styles.topicGrid}>
            {topics.map(topic => (
              <TopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="section">
        <div className="container">
          <p className="section-label">Featured Research</p>
          <h2 className="section-title">Landmark Studies</h2>
          <p className="section-subtitle">
            The papers that shaped our understanding of how humans relate to AI.
          </p>
          <div className={styles.featuredGrid}>
            {featuredPapers.map(paper => (
              <PaperCard key={paper.slug} paper={paper} />
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/research" className="btn btn-ghost">
              View All Research &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>This is just the beginning.</h2>
          <p className={styles.ctaText}>
            psychologyof.ai is an evolving research hub. New papers, topics, and questions
            are added regularly. Built by a psychology student who believes that understanding
            the human side of AI is the most important work of our generation.
          </p>
          <Link href="/about" className="btn btn-primary">
            About This Project
          </Link>
        </div>
      </section>
    </>
  );
}
