import { Shutdown } from "http-shutdown";

require("dotenv").config();

const server = require("./server").default as Promise<Shutdown>;

export default server;
