import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).json({ error: 'GITHUB_CLIENT_ID environment variable is not set' });
    return;
  }

  // Determine the redirect URI based on the request host
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const redirectUri = `${proto}://${host}/api/auth/callback`;

  // Simple random state for basic CSRF protection
  const state = Math.random().toString(36).substring(2, 15);

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.append('client_id', clientId);
  authorizeUrl.searchParams.append('redirect_uri', redirectUri);
  authorizeUrl.searchParams.append('scope', 'repo user:email');
  authorizeUrl.searchParams.append('state', state);

  res.redirect(302, authorizeUrl.toString());
}
