import { Types } from 'mongoose';

export class CreateCartItemDTO {
  productId: Types.ObjectId;
  quantity: number;
  price: string;
  size: string;
  color: string;
  guestId?: Types.ObjectId;
  userId?: Types.ObjectId;
}
