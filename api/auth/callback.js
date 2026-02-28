module.exports = async function handler(req, res) {
  var code = req.query.code;
  var error = req.query.error;

  if (error) {
    res.status(400).send(
      "<script>" +
        "window.opener.postMessage(" +
        "'authorization:github:error:" + String(error) + "'," +
        "window.location.origin" +
        ");" +
        "window.close();" +
        "</script>"
    );
    return;
  }

  if (!code || typeof code !== "string") {
    res.status(400).json({ error: "No authorization code provided" });
    return;
  }

  var clientId = process.env.GITHUB_CLIENT_ID;
  var clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res.status(500).json({ error: "OAuth credentials not configured" });
    return;
  }

  try {
    var tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    var data = await tokenResponse.json();

    if (data.error || !data.access_token) {
      res.status(400).send(
        "<script>" +
          "window.opener.postMessage(" +
          "'authorization:github:error:" + (data.error || "token_exchange_failed") + "'," +
          "window.location.origin" +
          ");" +
          "window.close();" +
          "</script>"
      );
      return;
    }

    var token = data.access_token;

    res.setHeader("Content-Type", "text/html");
    res.send(
      '<!DOCTYPE html><html><body><script>' +
        "(function() {" +
        "function receiveMessage(e) {" +
        "window.opener.postMessage(" +
        '\'authorization:github:success:{"token":"' + token + '","provider":"github"}\'' + "," +
        "e.origin" +
        ");" +
        "}" +
        'window.addEventListener("message", receiveMessage, false);' +
        'window.opener.postMessage("authorizing:github", "*");' +
        "})();" +
        "</script></body></html>"
    );
  } catch (err) {
    res.status(500).json({ error: "Token exchange request failed" });
  }
};
