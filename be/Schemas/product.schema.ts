import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

class Image {
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  altText: string;
}
@Schema()
export class Product extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  discountPrice: number;

  @Prop({
    required: true,
    default: 0,
  })
  countInStock: number;

  @Prop({
    required: true,
    unique: true,
  })
  sku: string;

  @Prop({
    required: true,
  })
  category: string;

  @Prop({
    required: true,
  })
  brand: string;

  @Prop({
    required: true,
  })
  sizes: string[];

  @Prop({
    required: true,
  })
  colors: string[];

  @Prop({
    required: true,
  })
  collections: string;
  @Prop({
    required: true,
  })
  material: string;

  @Prop({
    required: true,
    enum: ['Men', 'Women', 'Unisex'],
  })
  gender: string;

  @Prop({ required: true, type: [Image] })
  images: Image[];

  @Prop({
    default: false,
  })
  isFeatured: boolean;

  @Prop({
    default: false,
  })
  isPublished: boolean;

  @Prop({
    default: 0,
  })
  rating: number;

  @Prop({
    default: 0,
  })
  numReviews: number;

  tags: string[];

  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
    required: true;
  };

  metaTitle: string;

  metaDescription: string;

  metaKeywords: string;

  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
