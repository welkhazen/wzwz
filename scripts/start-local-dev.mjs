import { createServer } from "vite";

const server = await createServer({
  configFile: "vite.config.ts",
  cacheDir: ".vite-local-cache",
  server: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
});

await server.listen();
server.printUrls();
await new Promise(() => {});
