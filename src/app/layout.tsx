import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Psychology of AI — Research Hub',
  description: 'Exploring how artificial intelligence reshapes human cognition, emotion, trust, and behavior. Curated research at the intersection of psychology and AI.',
  keywords: ['psychology', 'artificial intelligence', 'AI', 'trust', 'anthropomorphism', 'human-AI interaction', 'research'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ paddingTop: '72px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
