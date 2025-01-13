import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ProductsService } from './orders/products/products.service';
import { ProductsService } from './products/products.service';
import { OrdersService } from './orders/orders.service';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ProductsController, OrdersController],
  providers: [AppService, UsersService, ProductsService, OrdersService],
})
export class AppModule {}
