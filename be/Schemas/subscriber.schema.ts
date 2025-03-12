import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscriber extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ default: Date.now })
  subscriberAt: Date;
}
export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
