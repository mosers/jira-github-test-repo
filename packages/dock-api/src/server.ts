import http from "http";
import shutdown from "http-shutdown";
import express, { Router } from "express";
import { IPallet } from "@lineage/core";
import { DOCK_API_PORT } from "./config/env";
import { json } from "body-parser";
import { createAuthClient } from "./auth";
import { createAuthRouter } from "./routes";
import passport from "passport";

const app = express();
const server = shutdown(http.createServer(app));

const v1 = Router();
const auth = createAuthClient(null);
const authRouter = createAuthRouter(null, auth);
const pallets: IPallet[] = [{ id: "1" }];

v1.get("/pallets", (req, res) => {
  res.json(pallets);
});

passport.use(auth.strategy.jwt);
passport.use(auth.strategy.local);

app.use(json());
app.use("/auth", authRouter);
app.use("/api/v1", v1);

server.listen(DOCK_API_PORT, (error: Error) => {
  if (error) {
    console.log(error);
  }

  console.log(`Lineage Dock API running on port ${DOCK_API_PORT}`);
});

export default server;
