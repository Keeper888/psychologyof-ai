import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About — Psychology of AI',
  description: 'About the psychologyof.ai research hub and its mission to map the human mind in the age of AI.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <p className="section-label">About</p>
          <h1 className={styles.title}>Mapping the Human Mind in the Age of AI</h1>

          <div className={styles.body}>
            <p>
              <strong>psychologyof.ai</strong> is an independent research hub dedicated to a single
              question: <em>How does artificial intelligence change us?</em>
            </p>

            <p>
              As AI systems become embedded in every aspect of our lives — from the therapists we
              confide in to the art we consume, from the decisions we delegate to the companions
              we keep — understanding the psychological impact is no longer optional. It is urgent.
            </p>

            <p>
              This platform curates, synthesizes, and makes accessible the growing body of research
              at the intersection of psychology and AI. Each paper is selected for its contribution
              to understanding the human side of the equation.
            </p>

            <h2>Why This Matters</h2>
            <p>
              The conversation about AI is dominated by capabilities and benchmarks. What gets
              lost is the human experience: the trust we place in algorithms, the emotions we
              project onto chatbots, the anxiety we feel about our relevance, the subtle ways
              AI reshapes how we think, create, and connect.
            </p>
            <p>
              Psychology has the tools to study these phenomena. But the research is scattered
              across journals, conferences, and preprint servers. There is no single place
              where a curious person — researcher, student, journalist, or policymaker — can
              find a coherent picture.
            </p>
            <p>
              That is what psychologyof.ai aims to be.
            </p>

            <h2>The Community Poll</h2>
            <p>
              Science should be guided by the questions that matter to people. Our{' '}
              <Link href="/#questions">community poll</Link> lets visitors vote on unexplored
              questions at the frontier of psychology and AI. The results are public, live,
              and intended to signal to researchers which directions the public cares about most.
            </p>

            <h2>Built By</h2>
            <p>
              This project is built and maintained by <strong>Antonio Gison</strong>, a psychology
              student who believes that understanding the human side of AI is the most important
              intellectual challenge of our time.
            </p>
            <p>
              The platform is open source and will continue to grow. If you are a researcher whose
              work belongs here, or if you have a question that should be on the poll, get in touch.
            </p>
          </div>

          <div className={styles.contact}>
            <a href="mailto:antonio@gison.it" className="btn btn-primary">
              Get in Touch
            </a>
            <a href="https://github.com/Keeper888" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
