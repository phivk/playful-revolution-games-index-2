module.exports = function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).json({ error: "GITHUB_CLIENT_ID is not set" });
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
