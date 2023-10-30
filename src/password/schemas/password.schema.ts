import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PasswordDocument = Password & Document;

@Schema({ versionKey: false })
export class Password {
  _id?: string;

  @Prop()
  userId: string;
}
export const PasswordSchema = SchemaFactory.createForClass(Password);
