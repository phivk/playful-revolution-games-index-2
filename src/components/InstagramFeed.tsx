interface Props {
  posts: string[];
}

export default function InstagramFeed({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-gray-200 pt-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">@playrevolution</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((url) => {
          const embedUrl = `${url.replace(/\/$/, '')}/embed/`;
          return (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-[3/4]"
            >
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                title="Instagram post"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
