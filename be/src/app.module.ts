import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'config/database.module';
import * as multer from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SubscriberModule } from './subscriber/subscriber.module';
import { UploadController } from './uploadImage/upload';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    CartModule,
    CheckoutModule,
    OrderModule,
    // cau hinh de upload image
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    SubscriberModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
