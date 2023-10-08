import { Router } from "@tsndr/cloudflare-worker-router";
import twitchAuthHandle from "./twitch.js";

const router = new Router();
router.cors(); // enable cors

router.get("/", function () {
  return new Response("Hello World", { status: 200 });
});

router.get("/auth/callback", twitchAuthHandle);

export default {
  async fetch(request, env, context) {
    return router.handle(request, env, context);
  },
};
