import { Shutdown } from "http-shutdown";
import puppeteer, { Browser, Page } from "puppeteer";
import dock, { env as dockEnvConfig } from "@lineage/dock";
import dockAPI from "@lineage/dock-api";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IScopeOptions {
  host: string;
}

export interface IScope {
  host: string;
  driver: typeof puppeteer;
  context: { currentPage: Page | null };
  dock: Shutdown;
  dockAPI: Shutdown;
  browser: Browser | null;
}

const defaultScope: Omit<IScope, "dockAPI"> = {
  host: `http://localhost:${dockEnvConfig.DOCK_PORT}`,
  driver: puppeteer,
  context: { currentPage: null },
  dock,
  browser: null,
};

export async function getScope(): Promise<IScope> {
  return { ...defaultScope, dockAPI: await dockAPI };
}
