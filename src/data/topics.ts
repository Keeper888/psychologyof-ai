export interface Topic {
  slug: string;
  name: string;
  description: string;
  icon: string;
  paperCount: number;
  color: string;
}

export const topics: Topic[] = [
  {
    slug: 'trust',
    name: 'Trust in AI',
    description: 'How humans develop, calibrate, and sometimes misplace trust in algorithmic systems. From algorithm aversion to automation bias.',
    icon: '🤝',
    paperCount: 3,
    color: '#818cf8',
  },
  {
    slug: 'anthropomorphism',
    name: 'Anthropomorphism',
    description: 'When and why we treat machines as if they have minds. The psychology of seeing human qualities in artificial agents.',
    icon: '🪞',
    paperCount: 3,
    color: '#38bdf8',
  },
  {
    slug: 'anxiety',
    name: 'AI Anxiety',
    description: 'Fear of replacement, existential dread, and the psychological impact of living alongside increasingly capable AI systems.',
    icon: '⚡',
    paperCount: 3,
    color: '#f472b6',
  },
  {
    slug: 'decision-making',
    name: 'Decision Making',
    description: 'How AI recommendations reshape human judgment. Algorithm appreciation, automation bias, and the psychology of delegation.',
    icon: '⚖️',
    paperCount: 3,
    color: '#a78bfa',
  },
  {
    slug: 'creativity',
    name: 'Creativity & AI',
    description: 'Perception of machine-generated art, music, and text. How authorship attribution changes aesthetic experience.',
    icon: '🎨',
    paperCount: 3,
    color: '#fb923c',
  },
  {
    slug: 'collaboration',
    name: 'Human-AI Teams',
    description: 'How humans and AI systems perform together. Complementary intelligence, explanation effects, and team dynamics.',
    icon: '🧩',
    paperCount: 3,
    color: '#34d399',
  },
  {
    slug: 'ethics',
    name: 'Ethics & Fairness',
    description: 'Psychological responses to algorithmic bias, justice perceptions, and how people reason about AI moral decisions.',
    icon: '⚖️',
    paperCount: 3,
    color: '#fbbf24',
  },
  {
    slug: 'emotional-ai',
    name: 'Emotional AI',
    description: 'Affective computing, emotional bonds with machines, and what happens when AI begins to read and respond to human feelings.',
    icon: '💭',
    paperCount: 3,
    color: '#f87171',
  },
];
