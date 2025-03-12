import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/roles.guard';
import { ProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/get-products')
  async getAllProducts(
    @Query('category') category?: string,
    @Query('brand') brand?: string,
    @Query('material') material?: string,
    @Query('gender') gender?: string,
    @Query('color') color?: string,
    @Query('size') size?: string,
    @Query('minReviews') minReviews?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('accessPublic') accessPublic?: boolean,
  ) {
    return await this.productService.getAllProducts({
      category,
      brand,
      gender,
      color,
      size,
      material,
      minPrice,
      maxPrice,
      sortBy,
      order,
      page,
      limit,
      accessPublic,
    });
  }

  @Get('/get-product/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
  @Get('/similar/:id')
  getSimilarProducts(@Param('id') id: string) {
    return this.productService.getSimilarProducts(id);
  }

  @Get('/best-seller')
  getBestSellerProducts() {
    return this.productService.getBestSellerProducts();
  }

  @Get('/new-arrivals')
  getNewArrivalProducts() {
    return this.productService.getNewArrivalProducts();
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('/create-product')
  createProduct(@Body() prod: ProductDTO) {
    return this.productService.createProduct(prod);
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Put('/update-product/:id')
  updateProduct(@Body() prod: UpdateProductDTO, @Param('id') id: string) {
    return this.productService.updateProduct(prod, id);
  }

  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete('/delete-product/:id')
  deleteProductById(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }
}
