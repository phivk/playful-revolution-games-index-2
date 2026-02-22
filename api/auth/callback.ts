import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, error } = req.query;

  if (error) {
    // GitHub returned an error (e.g. user denied access)
    res.status(400).send(
      `<script>
        window.opener.postMessage(
          'authorization:github:error:${String(error)}',
          window.location.origin
        );
        window.close();
      </script>`
    );
    return;
  }

  if (!code || typeof code !== 'string') {
    res.status(400).json({ error: 'No authorization code provided' });
    return;
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res.status(500).json({ error: 'OAuth credentials not configured' });
    return;
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenResponse.json() as { access_token?: string; token_type?: string; error?: string };

    if (data.error || !data.access_token) {
      res.status(400).send(
        `<script>
          window.opener.postMessage(
            'authorization:github:error:${data.error || 'token_exchange_failed'}',
            window.location.origin
          );
          window.close();
        </script>`
      );
      return;
    }

    // Decap CMS expects a postMessage with the token in this exact format
    const token = data.access_token;
    const tokenType = data.token_type || 'bearer';

    res.setHeader('Content-Type', 'text/html');
    res.send(
      `<!DOCTYPE html>
      <html>
      <body>
      <script>
        (function() {
          function receiveMessage(e) {
            window.opener.postMessage(
              'authorization:github:success:{"token":"${token}","provider":"github"}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>
      </body>
      </html>`
    );
  } catch (err) {
    res.status(500).json({ error: 'Token exchange request failed' });
  }
}
