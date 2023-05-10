import { cleanEnv, port, str } from 'envalid';

/**
 * validateEnv
 * @description Checks whether required environment variables are present for application
 */
export const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    // AUTH0_DOMAIN: str(),
    // AUTH0_AUDIENCE: str(),
    POSTGRES_DB: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    // AUDIT_SQS_URL: str(),
    // AUTH0_RULE_KEY: str(),
    // AWS_REGION: str(),
    // INTERNAL_API_KEY: str(),
  });
};
