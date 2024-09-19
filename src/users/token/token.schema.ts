import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

@Schema({
  collection: 'tokens',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Token {
  _id: ObjectId;

  @Prop({ type: SchemaTypes.String, required: true })
  userId: string;

  @Prop()
  updated_at: Date;

  @Prop()
  created_at: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
export type TokenDocument = HydratedDocument<Token>;
