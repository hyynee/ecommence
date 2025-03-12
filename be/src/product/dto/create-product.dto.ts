import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Image {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  altText: string;
}

class Dimensions {
  @IsNumber()
  @ApiProperty()
  length: number;

  @IsNumber()
  @ApiProperty()
  width: number;

  @IsNumber()
  @ApiProperty()
  height: number;
}

export class ProductDTO {
  @IsMongoId()
  _id: string;
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  discountPrice: number;

  @IsNumber()
  @ApiProperty()
  countInStock: number;

  @IsString()
  @ApiProperty()
  sku: string;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @ApiProperty()
  brand: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  sizes: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  colors: string[];

  @IsString()
  @ApiProperty()
  collections: string;

  @IsString()
  @ApiProperty()
  material: string;

  @IsString()
  @ApiProperty()
  gender: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  @ApiProperty({ type: [Image] })
  images: Image[];

  @IsBoolean()
  @ApiProperty()
  isFeatured: boolean;

  @IsBoolean()
  @ApiProperty()
  isPublished: boolean;

  @IsNumber()
  @ApiProperty()
  rating: number;

  @IsNumber()
  @ApiProperty()
  numReviews: number;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  tags: string[];

  @IsMongoId()
  @ApiProperty()
  user: string;

  @IsString()
  @ApiProperty()
  metaTitle: string;

  @IsString()
  @ApiProperty()
  metaDescription: string;

  @IsString()
  @ApiProperty()
  metaKeywords: string;

  @ValidateNested()
  @ApiProperty()
  @Type(() => Dimensions)
  dimensions: Dimensions;

  @IsNumber()
  @ApiProperty()
  weight: number;
}
