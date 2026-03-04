'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

interface Props {
  posts: string[];
}

export default function InstagramFeed({ posts }: Props) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="border-t border-gray-200 pt-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">@playrevolution</h2>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
      <div className="flex flex-col gap-4 items-center">
        {posts.map((url) => {
          const embedUrl = `${url.replace(/\/$/, '')}/?utm_source=ig_embed&utm_campaign=loading`;
          return (
            <blockquote
              key={url}
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={embedUrl}
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: 0,
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: 0,
                width: '99.375%',
              }}
            >
              <a href={embedUrl} target="_blank" rel="noopener noreferrer">
                View this post on Instagram
              </a>
            </blockquote>
          );
        })}
      </div>
    </section>
  );
}
