import { cleanEnv, str, port } from 'envalid';

function validateEnv() {
  return cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
  });
}

export const env = validateEnv();
