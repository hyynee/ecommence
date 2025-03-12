import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class CartItems extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;
  @Prop()
  name: string;
  @Prop()
  image: string;
  @Prop()
  price: string;
  @Prop()
  size: string;
  @Prop()
  color: string;

  @Prop({ default: 1 })
  quantity: number;
}

export const CartItemsSchema = SchemaFactory.createForClass(CartItems);

@Schema()
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: String, required: false })
  guestId?: string;

  @Prop({ type: [CartItemsSchema], default: [] })
  products: Types.DocumentArray<CartItems>;

  @Prop({ type: Number, required: true, default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
