'use client';

import { useState, useEffect, useCallback } from 'react';
import { questions } from '@/data/questions';
import type { Question, QuestionType } from '@/data/questions';
import styles from './QuestionPoll.module.css';

type VoteData = Record<string, Record<string, number>>;
const STORAGE_KEY = 'psychologyof-ai-votes-v2';

function getLocalVotes(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalVote(questionId: string, option: string) {
  const votes = getLocalVotes();
  votes[questionId] = option;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

function getQuestionTotal(voteData: VoteData, questionId: string): number {
  const qVotes = voteData[questionId];
  if (!qVotes) return 0;
  return Object.values(qVotes).reduce((a, b) => a + b, 0);
}

function getOptionPercent(voteData: VoteData, questionId: string, option: string): number {
  const total = getQuestionTotal(voteData, questionId);
  if (total === 0) return 0;
  return Math.round(((voteData[questionId]?.[option] || 0) / total) * 100);
}

function getTypeLabel(type: QuestionType): string {
  switch (type) {
    case 'yesno': return 'Yes / No';
    case 'multiple': return 'Multiple Choice';
    case 'interest': return 'Priority Vote';
  }
}

function getOptions(q: Question): string[] {
  switch (q.type) {
    case 'yesno': return ['Yes', 'No', 'It depends'];
    case 'multiple': return q.options || [];
    case 'interest': return ['This matters to me'];
  }
}

export default function QuestionPoll() {
  const [voteData, setVoteData] = useState<VoteData>({});
  const [voted, setVoted] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    setVoted(getLocalVotes());
    fetch('/api/vote')
      .then(r => r.json())
      .then(data => setVoteData(data))
      .catch(() => {});
  }, []);

  const totalGlobalVotes = Object.values(voteData).reduce(
    (sum, qv) => sum + Object.values(qv).reduce((a, b) => a + b, 0), 0
  );

  const handleVote = useCallback(async (questionId: string, option: string) => {
    if (voted[questionId] || loading) return;

    setLoading(questionId);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, option }),
      });
      const data = await res.json();
      setVoteData(data);
      saveLocalVote(questionId, option);
      setVoted(prev => ({ ...prev, [questionId]: option }));
    } catch {
      // silently fail
    } finally {
      setLoading(null);
    }
  }, [voted, loading]);

  return (
    <section className={styles.section} id="questions">
      <div className={styles.container}>
        <p className={styles.label}>Community Poll</p>
        <h2 className={styles.title}>What Should We Research Next?</h2>
        <p className={styles.subtitle}>
          Open questions at the frontier of psychology and AI.
          Vote on the ones that matter — see what the community thinks.
        </p>
        {totalGlobalVotes > 0 && (
          <p className={styles.totalVotes}>{totalGlobalVotes} total votes across all questions</p>
        )}
        <div className={styles.grid}>
          {questions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              voteData={voteData}
              userVote={voted[q.id] || null}
              isLoading={loading === q.id}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  question: Question;
  voteData: VoteData;
  userVote: string | null;
  isLoading: boolean;
  onVote: (questionId: string, option: string) => void;
}

function QuestionCard({ question, voteData, userVote, isLoading, onVote }: CardProps) {
  const hasVoted = userVote !== null;
  const options = getOptions(question);
  const total = getQuestionTotal(voteData, question.id);

  return (
    <div className={`${styles.card} ${hasVoted ? styles.cardVoted : ''}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.category}>{question.category}</span>
          <span className={styles.typeTag} data-type={question.type}>{getTypeLabel(question.type)}</span>
        </div>
        <h3 className={styles.question}>{question.text}</h3>
        <p className={styles.description}>{question.description}</p>

        <div className={styles.optionsArea}>
          {options.map(option => {
            const pct = getOptionPercent(voteData, question.id, option);
            const count = voteData[question.id]?.[option] || 0;
            const isSelected = userVote === option;

            return (
              <button
                key={option}
                className={`${styles.optionBtn} ${hasVoted ? styles.optionRevealed : ''} ${isSelected ? styles.optionSelected : ''}`}
                onClick={() => onVote(question.id, option)}
                disabled={hasVoted || isLoading}
              >
                {hasVoted && (
                  <div className={styles.optionBar} style={{ width: `${pct}%` }} />
                )}
                <span className={styles.optionLabel}>
                  {isSelected && <span className={styles.checkmark}>&#10003;</span>}
                  {option}
                </span>
                {hasVoted && (
                  <span className={styles.optionStats}>
                    {pct}%
                    <span className={styles.optionCount}>({count})</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {hasVoted && total > 0 && (
          <p className={styles.cardTotal}>{total} {total === 1 ? 'vote' : 'votes'} on this question</p>
        )}
        {!hasVoted && !isLoading && (
          <p className={styles.votePrompt}>Select an option to see results</p>
        )}
        {isLoading && (
          <p className={styles.votePrompt}>Voting...</p>
        )}
      </div>
    </div>
  );
}
