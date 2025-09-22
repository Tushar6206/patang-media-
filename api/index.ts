import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createServer } from "http";
import { createApp } from "../server/app";

let server: ReturnType<typeof createServer> | undefined;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    const app = await createApp();
    server = createServer(app);
  }
  server.emit("request", req, res);
}



