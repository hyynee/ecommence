import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
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

export class UpdateProductDTO {
  @IsOptional()
  @IsMongoId()
  _id: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  name: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  price: number;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discountPrice: number;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  countInStock: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  sku: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  category: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  brand: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  sizes: string[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  colors: string[];
  @IsOptional()
  @IsString()
  @ApiProperty()
  collections: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  material: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  gender: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  @ApiProperty({ type: [Image] })
  images: Image[];
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isFeatured: boolean;
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isPublished: boolean;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  rating: number;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  numReviews: number;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  tags: string[];
  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  user: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  metaTitle: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  metaDescription: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  metaKeywords: string;
  @IsOptional()
  @ValidateNested()
  @ApiProperty()
  @Type(() => Dimensions)
  dimensions: Dimensions;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  weight: number;
}
