import { getAboutPage } from '@/lib/about';
import SocialLinks from '@/components/SocialLinks';
import InstagramFeed from '@/components/InstagramFeed';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return {
    title: about ? `${about.title} | Playful Revolution Games` : 'About | Playful Revolution Games',
  };
}

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
          {about.title}
        </h1>
        {about.body && (
          <article className="[&_p]:my-6 [&_p]:text-lg [&_p]:leading-relaxed mb-12 text-gray-800">
            <ReactMarkdown>{about.body}</ReactMarkdown>
          </article>
        )}
        {about.socialLinks.length > 0 && (
          <section className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect with Us</h2>
            <SocialLinks links={about.socialLinks} />
          </section>
        )}
        <InstagramFeed posts={about.instagramPosts} />
      </div>
    </main>
  );
}
