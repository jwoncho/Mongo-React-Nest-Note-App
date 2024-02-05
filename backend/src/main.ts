import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { env } from './util/validateEnv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Your application's global middleware, error handlers, etc., can be set up here

  await app.listen(env.PORT);
  console.log(`Server running on port: ${env.PORT}`);
}

bootstrap().catch(console.error);
