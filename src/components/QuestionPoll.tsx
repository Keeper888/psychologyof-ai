'use client';

import { useState, useEffect, useCallback } from 'react';
import { questions } from '@/data/questions';
import styles from './QuestionPoll.module.css';

const STORAGE_KEY = 'psychologyof-ai-votes';

function getLocalVotes(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLocalVote(id: string) {
  const votes = getLocalVotes();
  votes.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(votes)));
}

export default function QuestionPoll() {
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    setVoted(getLocalVotes());
    fetch('/api/vote')
      .then(r => r.json())
      .then(data => {
        setVoteCounts(data);
        setTotalVotes(Object.values(data as Record<string, number>).reduce((a: number, b: number) => a + b, 0));
      })
      .catch(() => {});
  }, []);

  const handleVote = useCallback(async (questionId: string) => {
    if (voted.has(questionId) || loading) return;

    setLoading(questionId);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId }),
      });
      const data = await res.json();
      setVoteCounts(data);
      setTotalVotes(Object.values(data as Record<string, number>).reduce((a: number, b: number) => a + b, 0));
      saveLocalVote(questionId);
      setVoted(prev => { const next = new Set(prev); next.add(questionId); return next; });
    } catch {
      // silently fail
    } finally {
      setLoading(null);
    }
  }, [voted, loading]);

  const getPercentage = (id: string) => {
    if (totalVotes === 0) return 0;
    return Math.round(((voteCounts[id] || 0) / totalVotes) * 100);
  };

  const hasVotedAny = voted.size > 0;

  return (
    <section className={styles.section} id="questions">
      <div className={styles.container}>
        <p className={styles.label}>Community Poll</p>
        <h2 className={styles.title}>What Should We Research Next?</h2>
        <p className={styles.subtitle}>
          These are open questions at the frontier of psychology and AI.
          Vote on the ones that matter to you — see what the community thinks.
        </p>
        {hasVotedAny && totalVotes > 0 && (
          <p className={styles.totalVotes}>{totalVotes} total votes cast</p>
        )}
        <div className={styles.grid}>
          {questions.map(q => {
            const hasVoted = voted.has(q.id);
            const pct = getPercentage(q.id);
            const count = voteCounts[q.id] || 0;
            const isLoading = loading === q.id;

            return (
              <button
                key={q.id}
                className={`${styles.card} ${hasVoted ? styles.cardVoted : ''}`}
                onClick={() => handleVote(q.id)}
                disabled={hasVoted || isLoading}
              >
                {hasVoted && (
                  <div
                    className={styles.progressBar}
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className={styles.cardContent}>
                  <span className={styles.category}>{q.category}</span>
                  <h3 className={styles.question}>{q.text}</h3>
                  <p className={styles.description}>{q.description}</p>
                  <div className={styles.cardFooter}>
                    {hasVoted ? (
                      <div className={styles.stats}>
                        <span className={styles.percentage}>{pct}%</span>
                        <span className={styles.count}>{count} {count === 1 ? 'vote' : 'votes'}</span>
                      </div>
                    ) : (
                      <span className={styles.votePrompt}>
                        {isLoading ? 'Voting...' : 'Click to vote'}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
