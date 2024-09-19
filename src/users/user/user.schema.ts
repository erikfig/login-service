import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User {
  _id: ObjectId;

  @Prop({ type: SchemaTypes.String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, select: false })
  password: string;

  @Prop({ type: SchemaTypes.Boolean, required: true })
  active: boolean;

  @Prop()
  updated_at: Date;

  @Prop()
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
