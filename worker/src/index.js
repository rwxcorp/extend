import { Router } from '@tsndr/cloudflare-worker-router'
import pastebin from './pastebin.js'

const router = new Router()
router.cors()

router.get('/pastebin/:paste', pastebin)

export default {
  async fetch(request, env, context) {
    return router.handle(request, env, context)
  }
}
