/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as session from 'express-session';
//import MongoStore from 'connect-mongo';
import { env } from './util/validateEnv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const MongoStore = require('connect-mongo');

  // Morgan middleware for logging
  app.use(morgan('dev'));

  // Session middleware configuration
  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
      },
      rolling: true,
      store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING,
      }),
    }),
  );

  await app.listen(env.PORT);
  console.log(`Server running on port: ${env.PORT}`);
}

bootstrap().catch(console.error);
