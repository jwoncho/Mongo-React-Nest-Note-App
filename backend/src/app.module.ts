import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './util/validateEnv';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_CONNECTION_STRING),
    NotesModule,
    UsersModule,
  ],
})
export class AppModule {}
