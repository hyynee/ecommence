import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SubscriberDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  subscriberAt: Date;
}
