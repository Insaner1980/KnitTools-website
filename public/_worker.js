export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (
      response.status !== 404 ||
      !response.headers.get("content-type")?.includes("text/html")
    ) {
      return response;
    }

    // Pages replaces _headers Cache-Control with no-store for missing pages.
    const result = new Response(response.body, response);
    result.headers.append("Cache-Control", "no-transform");
    return result;
  },
};
