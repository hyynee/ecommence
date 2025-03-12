import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CheckoutItemDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  
}

export class ShippingAddressDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

export class CheckoutDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDTO)
  checkoutItems: CheckoutItemDTO[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  shippingAddress: ShippingAddressDTO;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paidAt?: Date;

  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @IsOptional()
  paymentDetails?: any;

  @IsOptional()
  @IsBoolean()
  isFinallized?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  finallizedAt?: Date;
}

export class CreateCheckoutDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDTO)
  checkoutItems: CheckoutItemDTO[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  shippingAddress: ShippingAddressDTO;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
