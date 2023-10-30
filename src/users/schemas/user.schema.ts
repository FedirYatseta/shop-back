import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  _id: string;

  id?: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  name: string;
}

export const UserShema = SchemaFactory.createForClass(User);

UserShema.set('toObject', { virtuals: true });
