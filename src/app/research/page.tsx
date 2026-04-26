'use client';

import { useState, useMemo } from 'react';
import { papers } from '@/data/papers';
import { topics } from '@/data/topics';
import PaperCard from '@/components/PaperCard';
import styles from './page.module.css';

export default function ResearchPage() {
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return papers.filter(p => {
      const matchesTopic = !activeTopic || p.topic === activeTopic;
      const matchesSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authors.toLowerCase().includes(search.toLowerCase()) ||
        p.abstract.toLowerCase().includes(search.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [search, activeTopic]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="section-label">Research Library</p>
          <h1 className="section-title">All Research Papers</h1>
          <p className="section-subtitle">
            {papers.length} papers across {topics.length} topics, curated from leading journals
            in psychology, HCI, and AI ethics.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search papers by title, author, or keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${!activeTopic ? styles.filterActive : ''}`}
              onClick={() => setActiveTopic(null)}
            >
              All ({papers.length})
            </button>
            {topics.map(t => {
              const count = papers.filter(p => p.topic === t.slug).length;
              return (
                <button
                  key={t.slug}
                  className={`${styles.filterBtn} ${activeTopic === t.slug ? styles.filterActive : ''}`}
                  onClick={() => setActiveTopic(t.slug)}
                  style={activeTopic === t.slug ? { borderColor: t.color, color: t.color } as React.CSSProperties : undefined}
                >
                  {t.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.results}>
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(paper => (
                <PaperCard key={paper.slug} paper={paper} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No papers match your search. Try a different keyword or topic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
