export const env = {
  mongodbUri: "mongodb+srv://Tapclone_irs:Tapclone%40123%40@cluster0.prco7.mongodb.net/kgvss",
  jwtSecret: "replace-with-a-long-random-secret",
  adminCookieName: "kgvss_admin_token",
  nodeEnv: process.env.NODE_ENV ?? "development",
};

export function hasMongoConfig() {
  return Boolean(env.mongodbUri);
}
