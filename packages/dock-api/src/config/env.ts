export interface IEnvConfig {
  DOCK_API_PORT: string;
  DOCK_API_JWT_SECRET: string;
  DOCK_API_JWT_EXPIRE: string;
}

/**
 * Type guard used to ensure environment is configured correctly.
 * @param config environment config object (e.g. process.env)
 */
function isAppConfig(config: any): config is IEnvConfig {
  if (typeof config.DOCK_API_PORT !== "string") {
    console.error(`Invalid env variable DOCK_API_PORT`);
    return false;
  }

  if (typeof config.DOCK_API_JWT_SECRET !== "string") {
    console.error(`Invalid env variable DOCK_API_JWT_SECRET`);
    return false;
  }

  if (typeof config.DOCK_API_JWT_EXPIRE !== "string") {
    console.error(`Invalid env variable DOCK_API_JWT_EXPIRE`);
    return false;
  }

  return true;
}

if (!isAppConfig(process.env)) {
  throw new Error(`Invalid config.`);
}

export const {
  DOCK_API_JWT_SECRET,
  DOCK_API_JWT_EXPIRE,
  DOCK_API_PORT,
} = process.env as IEnvConfig;
