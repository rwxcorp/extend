import { Router } from '@tsndr/cloudflare-worker-router'
import { responseWith, status } from './utils.js'
import { twitchAuthHandle, createClipHandle } from './twitch.js'
import pastebinHandle from './pastebin.js'

const router = new Router()
router.cors() // enable cors

router.get('/auth/callback', twitchAuthHandle)
router.get('/clip/create/:id', createClipHandle)
router.get('/clip/command/:id', function ({ req }) {
  const url = new URL(req.url)
  const id = req.params.id

  return responseWith(
    `$(customapi.https://${url.host}/clip/create/${id}?channel=$(channel))`,
    status.OK
  )
})
router.get('/login', function ({ env, req }) {
  const url = new URL(req.url)
  const twitchURL = 'https://id.twitch.tv/oauth2/authorize?response_type='
  const type = 'code'
  const clientId = `&client_id=${env.TWITCH_CLIENT_ID}`
  const redirectURI = `&redirect_uri=https://${url.host}/auth/callback`
  const scope = '&scope=clips:edit'

  const authLink = `${twitchURL}${type}${clientId}${redirectURI}${scope}`

  return Response.redirect(authLink, status.Redirect)
})
router.get('/pastebin/:paste', pastebinHandle)

export default {
  async fetch(request, env, context) {
    return router.handle(request, env, context)
  }
}
