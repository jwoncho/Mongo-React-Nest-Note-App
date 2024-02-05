import 'express-session';
import { SessionData } from 'express-session';
import mongoose from 'mongoose';

declare module 'express-serve-static-core' {
  interface Request {
    session: SessionData & {
      userId?: mongoose.Types.ObjectId;
    };
  }
}
