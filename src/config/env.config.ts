export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  dbHost: process.env.DB_HOST,
  port: process.env.PORT || 5001,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbDialect: process.env.DB_DIALECT,
  dbEncrypt: process.env.DB_ENCRYPT,
  dbTrustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE,
  corsUurl: process.env.CORS_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefresh: process.env.JWT_REFRESH,
});
