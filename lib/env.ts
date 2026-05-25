export const env = {
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET ?? "development-only-change-me",
  adminCookieName: process.env.ADMIN_COOKIE_NAME ?? "kgvss_admin_token",
  nodeEnv: process.env.NODE_ENV ?? "development",
};

export function hasMongoConfig() {
  return Boolean(env.mongodbUri);
}
