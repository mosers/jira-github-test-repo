declare module "http-shutdown" {
  import { Server } from "http";

  export type Shutdown = Server & { shutdown: (cb: Function) => void };
  export default function(server: Server, cb?: Function): Shutdown;
}
