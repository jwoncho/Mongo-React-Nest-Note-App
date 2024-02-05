import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true, select: false })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  // Explicitly declare the _id property
  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
