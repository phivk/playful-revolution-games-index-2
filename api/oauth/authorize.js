module.exports = function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      [
        "<!DOCTYPE html><html><head><meta charset='utf-8'><title>OAuth setup required</title></head>",
        "<body style='font-family:system-ui;max-width:520px;margin:2rem auto;padding:0 1rem;'>",
        "<h1>OAuth not configured</h1>",
        "<p><strong>GITHUB_CLIENT_ID</strong> is not set for this deployment.</p>",
        "<ol style='line-height:1.6;'>",
        "<li>In Vercel: Project → <strong>Settings</strong> → <strong>Environment Variables</strong>.</li>",
        "<li>Add <code>GITHUB_CLIENT_ID</code> and <code>GITHUB_CLIENT_SECRET</code> for <strong>Production</strong>.</li>",
        "<li><strong>Redeploy</strong> the project (env vars apply only to new deployments).</li>",
        "</ol></body></html>",
      ].join("")
    );
    return;
  }

  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;

  if (!host) {
    res.status(500).json({ error: "Could not determine request host" });
    return;
  }

  const redirectUri = proto + "://" + host + "/api/auth/callback";
  const state = Math.random().toString(36).substring(2, 15);

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "repo user:email");
  url.searchParams.set("state", state);

  res.redirect(302, url.toString());
};
