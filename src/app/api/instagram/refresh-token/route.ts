// NOTE: The new token is returned in the response but cannot be stored back to Vercel env vars at runtime.
// As long as this cron runs daily, the existing token's 60-day window is continuously extended.
// Document this as a known limitation.

export async function GET(): Promise<Response> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return Response.json({ error: 'No token configured' }, { status: 500 });
  }

  try {
    const url =
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

    const res = await fetch(url);

    if (!res.ok) {
      return Response.json({ refreshed: false, error: 'Refresh failed' }, { status: 500 });
    }

    const data: { access_token?: string; expires_in?: number } = await res.json();

    if (!data.access_token) {
      return Response.json({ refreshed: false, error: 'Refresh failed' }, { status: 500 });
    }

    return Response.json({ refreshed: true, expires_in: data.expires_in });
  } catch {
    return Response.json({ refreshed: false, error: 'Refresh failed' }, { status: 500 });
  }
}
