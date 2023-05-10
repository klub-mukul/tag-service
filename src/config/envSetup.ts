/**
 * Include at top of project to initialize env vars, etc.
 */
import * as dotenv from 'dotenv';
import { validateEnv } from './../utils/validate-env';

// import { validateEnv } from '../utils/validate-env';

dotenv.config(); // read .env files into process.env

validateEnv();
