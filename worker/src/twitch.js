async function handleFetchData(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}

function responseWith(body, status) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/plain;charset=UTF-8",
    },
  });
}

async function getAccessToken(code, env, host) {
  const clientId = env.TWITCH_CLIENT_ID;
  const clientSecret = env.TWITCH_CLIENT_SECRET;
  const redirectUri = `https://${host}/auth/callback`;

  const formData = new FormData();
  formData.append("client_id", clientId);
  formData.append("client_secret", clientSecret);
  formData.append("code", code);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", redirectUri);

  try {
    const accessData = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: formData,
    });

    if (accessData?.status != 200) {
      const { message } = await accessData.json();
      throw new Error(message);
    }

    const accessToken = await handleFetchData(accessData);
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function twitchAuthHandle({ env, req }) {
  const url = new URL(req.url);
  const { code } = req.query;

  try {
    if (code === null || code === "" || typeof code === "undefined") {
      return responseWith("The code query oarameter is required", 500);
    }

    const accessToken = await getAccessToken(code, env, url.host);
    await env.KV.put(code, JSON.stringify(accessToken));

    return Response.redirect(`https://${url.host}/clip/create/${code}`, 301);
  } catch (error) {
    console.log(error);
    return responseWith(error.message, 500);
  }
}

export default twitchAuthHandle;
