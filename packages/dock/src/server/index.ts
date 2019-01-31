import http from "http";
import shutdown from "http-shutdown";
import express from "express";
import proxy from "express-http-proxy";
import { join } from "path";

require("dotenv").config();

const env = require("./config/env");
const app = express();
const server = shutdown(http.createServer(app));

app.use(
  "/api",
  proxy(env.DOCK_API_URI, {
    proxyReqPathResolver: req => `/api${req.url}`,
  }),
);
app.use(express.static(join(__dirname, "../build")));

server.listen(env.DOCK_PORT);

export default server;
export { env };
