export type QuestionType = 'interest' | 'yesno' | 'multiple';

export interface Question {
  id: string;
  text: string;
  category: string;
  description: string;
  type: QuestionType;
  options?: string[];
}

export const questions: Question[] = [
  {
    id: 'emotional-bonds',
    text: 'Can humans form genuine emotional bonds with AI?',
    category: 'Attachment',
    description: 'Exploring whether attachment theory applies to human-AI relationships and what implications this has for social development.',
    type: 'yesno',
  },
  {
    id: 'ai-art-emotions',
    text: 'Does AI-generated art evoke the same emotions as human-made art?',
    category: 'Creativity',
    description: 'Investigating whether knowledge of authorship (human vs. AI) changes the emotional and aesthetic experience of art.',
    type: 'yesno',
  },
  {
    id: 'children-ai-development',
    text: 'Will children raised with AI assistants develop differently?',
    category: 'Development',
    description: 'How constant access to AI from early childhood might reshape cognitive development, social skills, and theory of mind.',
    type: 'multiple',
    options: ['Better social skills', 'Worse social skills', 'Different but not worse', 'No meaningful difference'],
  },
  {
    id: 'ai-therapy-effectiveness',
    text: 'Can AI therapy match human therapists in effectiveness?',
    category: 'Clinical',
    description: 'Comparing therapeutic outcomes between AI-driven and human-led interventions across different mental health conditions.',
    type: 'multiple',
    options: ['Already can', 'Will within 5 years', 'Never for serious conditions', 'Useful as supplement only'],
  },
  {
    id: 'honesty-with-ai',
    text: 'Do people behave more honestly with AI than with humans?',
    category: 'Social',
    description: 'Whether the absence of human judgment reduces social desirability bias in interactions with AI systems.',
    type: 'yesno',
  },
  {
    id: 'ai-loneliness',
    text: 'Can AI companions reduce loneliness, or do they deepen isolation?',
    category: 'Social',
    description: 'The paradox of AI companionship: does it serve as a bridge to human connection or a substitute that atrophies social skills?',
    type: 'multiple',
    options: ['Reduces loneliness', 'Deepens isolation', 'Both depending on context', 'Neither — no real effect'],
  },
  {
    id: 'ai-content-perception',
    text: 'How does knowing content is AI-generated change our perception of it?',
    category: 'Cognition',
    description: 'Attribution effects on credibility, engagement, and emotional response when AI authorship is disclosed.',
    type: 'interest',
  },
  {
    id: 'cognitive-offloading',
    text: 'Will widespread AI use reshape human cognitive abilities?',
    category: 'Cognition',
    description: 'Cognitive offloading at scale: are we enhancing our minds or outsourcing the skills that define human intelligence?',
    type: 'multiple',
    options: ['Enhance them', 'Diminish them', 'Transform (neither better nor worse)', 'No significant effect'],
  },
  {
    id: 'ai-moral-status',
    text: 'Does anthropomorphizing AI affect our ethical treatment of it?',
    category: 'Ethics',
    description: 'How perceiving AI as human-like shapes moral reasoning about its rights, treatment, and the boundaries of empathy.',
    type: 'multiple',
    options: ['Makes us more ethical toward AI', 'Makes us less ethical toward humans', 'Both effects simultaneously', 'No real effect'],
  },
  {
    id: 'ai-learning-dependency',
    text: 'Does AI-assisted learning create dependency or empower growth?',
    category: 'Education',
    description: 'Whether AI tutoring scaffolds lasting knowledge acquisition or creates learned helplessness in students.',
    type: 'multiple',
    options: ['Creates dependency', 'Empowers growth', 'Depends on implementation', 'Too early to tell'],
  },
  {
    id: 'ai-bias-self-perception',
    text: 'How does AI bias affect the self-perception of marginalized groups?',
    category: 'Identity',
    description: 'When algorithms encode societal biases, how does exposure to biased AI outputs influence identity and self-worth?',
    type: 'interest',
  },
  {
    id: 'grieving-ai',
    text: 'Do people grieve the loss of AI companions?',
    category: 'Attachment',
    description: 'When an AI service shuts down or a chatbot is discontinued, do users experience genuine grief responses?',
    type: 'yesno',
  },
  {
    id: 'ai-persuasion',
    text: 'Can AI nudging be more effective than human persuasion?',
    category: 'Behavioral',
    description: 'Whether AI systems that learn individual psychological profiles can craft more effective behavioral interventions.',
    type: 'yesno',
  },
  {
    id: 'trust-uncertainty',
    text: 'Do people trust AI more when it admits uncertainty?',
    category: 'Trust',
    description: 'How expressions of confidence calibration in AI systems affect human trust, reliance, and decision-making.',
    type: 'yesno',
  },
  {
    id: 'ai-dream-consciousness',
    text: 'Does believing AI is conscious change how humans interact with it?',
    category: 'Philosophy',
    description: 'The psychological effects of consciousness attribution on empathy, cooperation, and moral behavior toward AI.',
    type: 'interest',
  },
];
