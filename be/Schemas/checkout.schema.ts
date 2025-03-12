import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
@Schema({ _id: false })
export class CheckoutItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  color: string;
}

export const CheckoutItemSchema = SchemaFactory.createForClass(CheckoutItem);

@Schema({ timestamps: true })
export class Checkout extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [CheckoutItemSchema], default: [] })
  checkoutItems: CheckoutItem[];

  @Prop({
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    required: true,
  })
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  paidAt?: Date;

  @Prop({ default: 'pending' })
  paymentStatus: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  paymentDetails?: any;

  @Prop({ default: false })
  isFinallized: boolean;

  @Prop()
  finallizedAt?: Date;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
