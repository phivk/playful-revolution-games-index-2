export const dynamic = 'force-dynamic';

interface InstagramPost {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM';
}

export async function GET(): Promise<Response> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return Response.json({ posts: [] }, { status: 200 });
  }

  try {
    const url =
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp&limit=9&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return Response.json({ posts: [] }, { status: 200 });
    }

    const data: { data: (InstagramPost & { media_type: string })[] } = await res.json();

    const posts: InstagramPost[] = data.data.filter(
      (item) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
    );

    return Response.json({ posts });
  } catch {
    return Response.json({ posts: [] }, { status: 200 });
  }
}
