import { Router } from '@tsndr/cloudflare-worker-router'
import { responseWith, status } from './utils.js'
import twitch from './twitch.js'
import pastebin from './pastebin.js'

const router = new Router()
router.cors()

router.get('/auth/twitch', twitch.linkAuthorization)
router.get('/auth/twitch/callback', twitch.authCallback)

router.get('/clip/create/:id', twitch.createClip)
router.get('/clip/command/:id', twitch.clipCommand)

router.get('/pastebin/:paste', pastebin)

export default {
  async fetch(request, env, context) {
    return router.handle(request, env, context)
  }
}
