import fs from 'fs';
import path from 'path';

const VOTES_FILE = process.env.VOTES_PATH || path.join(process.cwd(), 'data', 'votes.json');

function ensureFile() {
  const dir = path.dirname(VOTES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(VOTES_FILE)) fs.writeFileSync(VOTES_FILE, '{}', 'utf-8');
}

export function getVotes(): Record<string, number> {
  ensureFile();
  const raw = fs.readFileSync(VOTES_FILE, 'utf-8');
  return JSON.parse(raw);
}

export function addVote(questionId: string): Record<string, number> {
  const votes = getVotes();
  votes[questionId] = (votes[questionId] || 0) + 1;
  fs.writeFileSync(VOTES_FILE, JSON.stringify(votes, null, 2), 'utf-8');
  return votes;
}
