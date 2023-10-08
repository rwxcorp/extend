import { Router } from "@tsndr/cloudflare-worker-route";

const router = new Router();
router.cors(); // enable cors

router.get("/", function () {
  return new Response("Hello World", { status: 200 });
});

export default {
  async fetch(request, env, context) {
    return router.handle(request, env, context);
  },
};
