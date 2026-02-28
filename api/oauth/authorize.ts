import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>OAuth setup required</title></head><body style="font-family:system-ui;max-width:520px;margin:2rem auto;padding:0 1rem;">
        <h1>OAuth not configured</h1>
        <p><strong>GITHUB_CLIENT_ID</strong> is not set for this deployment.</p>
        <ol style="line-height:1.6;">
          <li>In Vercel: Project → <strong>Settings</strong> → <strong>Environment Variables</strong>.</li>
          <li>Add <code>GITHUB_CLIENT_ID</code> and <code>GITHUB_CLIENT_SECRET</code> (from your <a href="https://github.com/settings/developers">GitHub OAuth App</a>) for <strong>Production</strong>.</li>
          <li><strong>Redeploy</strong> the project (env vars apply only to new deployments).</li>
        </ol>
        <p><a href="https://vercel.com/docs/environment-variables">Vercel env docs</a></p>
      </body></html>`
    );
    return;
  }

  // Determine the redirect URI based on the request host
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (!host) {
    res.status(500).setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      `<!DOCTYPE html><html><body style="font-family:system-ui;margin:2rem auto;max-width:480px;padding:0 1rem;"><h1>Server error</h1><p>Could not determine request host. Check Vercel proxy headers.</p></body></html>`
    );
    return;
  }

  const redirectUri = `${proto}://${host}/api/auth/callback`;
  const state = Math.random().toString(36).substring(2, 15);

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo user:email");
  authorizeUrl.searchParams.set("state", state);

  res.redirect(302, authorizeUrl.toString());
}
