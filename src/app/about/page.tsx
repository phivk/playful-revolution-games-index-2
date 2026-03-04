import { getAboutPage } from '@/lib/about';
import SocialLinks from '@/components/SocialLinks';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Playful Revolution Games',
  description: 'Learn about Playful Revolution and how to connect with us.',
};

export default async function AboutPage() {
  const about = await getAboutPage();

  if (!about) {
    return (
      <main className="min-h-screen bg-revolution-paper px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-revolution-red mb-4">About</h1>
          <p className="text-gray-600">About page content not available.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-revolution-paper">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-revolution-red mb-6">
          {about.organisationName}
        </h1>
        {about.description && (
          <p className="text-xl text-gray-700 mb-8">{about.description}</p>
        )}
        {about.body && (
          <article className="prose prose-lg max-w-none mb-12 text-gray-800">
            <ReactMarkdown>{about.body}</ReactMarkdown>
          </article>
        )}
        {about.socialLinks.length > 0 && (
          <section className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect with Us</h2>
            <SocialLinks links={about.socialLinks} />
          </section>
        )}
      </div>
    </main>
  );
}
