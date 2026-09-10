import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('dev', 'development', 'test', 'production')
    .default('dev'),
  DB_HOST: Joi.string().required(),
  PORT: Joi.number().port().default(5001),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_DIALECT: Joi.string().valid('mssql', 'mysql', 'postgres').default('mssql'),
  DB_ENCRYPT: Joi.boolean().truthy('true').falsy('false').default(true),
  DB_TRUST_SERVER_CERTIFICATE: Joi.boolean()
    .truthy('true')
    .falsy('false')
    .default(true),
  CORS_URL: Joi.string().uri().default('http://localhost:3000'),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH: Joi.string().required(),
});
