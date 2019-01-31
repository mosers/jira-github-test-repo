export interface IEnvConfig {
  DOCK_PORT: string;
  DOCK_API_URI: string;
}

/**
 * Type guard used to ensure environment is configured correctly.
 * @param config environment config object (e.g. process.env)
 */
function isAppConfig(config: any): config is IEnvConfig {
  if (typeof config.DOCK_PORT !== "string") {
    console.error(`Invalid env variable DOCK_PORT`);
    return false;
  }

  if (typeof config.DOCK_API_URI !== "string") {
    console.error(`Invalid env variable DOCK_API_URI`);
    return false;
  }

  return true;
}

if (!isAppConfig(process.env)) {
  throw new Error(`Invalid config.`);
}

export const { DOCK_PORT, DOCK_API_URI } = process.env as IEnvConfig;
