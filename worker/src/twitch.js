import { handleFetchData, responseWith, status } from './utils.js'

async function getAccessToken(code, env, host) {
  const clientId = env.TWITCH_CLIENT_ID
  const clientSecret = env.TWITCH_CLIENT_SECRET
  const redirectUri = `https://${host}/auth/callback`

  const formData = new FormData()
  formData.append('client_id', clientId)
  formData.append('client_secret', clientSecret)
  formData.append('code', code)
  formData.append('grant_type', 'authorization_code')
  formData.append('redirect_uri', redirectUri)

  try {
    const accessData = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: formData
    })

    if (accessData?.status != status.OK) {
      const { message } = await handleFetchData(response)
      throw new Error(message)
    }

    const accessToken = await handleFetchData(accessData)
    return accessToken
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

export async function twitchAuthHandle({ env, req }) {
  const url = new URL(req.url)
  const { code } = req.query

  try {
    if (code === null || code === '' || typeof code === 'undefined') {
      return responseWith(
        'The code query oarameter is required',
        status.BadRequest
      )
    }

    const accessToken = await getAccessToken(code, env, url.host)
    await env.KV.put(code, JSON.stringify(accessToken))

    return Response.redirect(`https://${url.host}/clip/command/${code}`, 301)
  } catch (error) {
    console.log(error)
    return responseWith(error.message, status.BadRequest)
  }
}

async function getChannelId(channel) {
  try {
    const data = await fetch(`https://decapi.me/twitch/id/${channel}`)
    const channelId = await handleFetchData(data)

    if (channelId.includes('User not found')) {
      throw new Error(channelId)
    }

    return channelId
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

async function createClip(accessToken, channelId, clientId) {
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${channelId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Client-Id': clientId
        }
      }
    )

    if (response?.status != status.Accepted) {
      const { message } = await handleFetchData(response)
      throw new Error(message)
    }

    const {
      data: [{ id }]
    } = await handleFetchData(response)

    return `https://clips.twitch.tv/${id}`
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

export async function createClipHandle({ env, req }) {
  const token = req.params.id
  const { channel } = req.query

  try {
    const channelId = await env.KV.get(channel)
    const accessToken = JSON.parse(await env.KV.get(token))

    if (channelId === null) {
      const _channelId = await getChannelId(channel)
      await env.KV.put(channel, _channelId)

      const clipUrl = await createClip(
        accessToken.access_token,
        _channelId,
        env.TWITCH_CLIENT_ID
      )

      return responseWith(clipUrl, status.OK)
    } else {
      const clipUrl = await createClip(
        accessToken.access_token,
        channelId,
        env.TWITCH_CLIENT_ID
      )

      return responseWith(clipUrl, status.OK)
    }
  } catch (error) {
    console.log(error)
    return responseWith(error.message, status.OK)
  }
}
