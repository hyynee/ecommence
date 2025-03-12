import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'Schemas/product.schema';
import { ProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getAllProducts(filters: any) {
    const query: any = {};
    // Lọc theo category, brand, material nếu có
    if (filters.category) query.category = filters.category;
    if (filters.brand) query.brand = filters.brand;
    if (filters.gender) query.gender = filters.gender;
    if (filters.color) query.colors = { $in: [filters.color] };
    if (filters.size) query.sizes = { $in: [filters.size] };
    if (filters.material) query.material = filters.material;
    //  Lọc theo khoảng giá
    if (filters.minPrice !== undefined)
      query.price = { $gte: filters.minPrice };
    if (filters.maxPrice !== undefined) {
      query.price = query.price || {};
      query.price.$lte = filters.maxPrice;
    }
    //  sản phẩm push nếu có
    if (filters.accessPublic) query.isPublished = true;
    // sort by
    let sortOptions: any = {};
    if (filters.sortBy) {
      if (filters.sortBy === 'priceAsc') {
        sortOptions.price = 1;
      } else if (filters.sortBy === 'priceDesc') {
        sortOptions.price = -1;
      } else if (filters.sortBy === 'popularity') {
        sortOptions.popularity = -1;
      } else {
        sortOptions[filters.sortBy] = filters.order === 'desc' ? -1 : 1;
      }
    }
    // phân trang
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, filters.limit || 10);
    const skip = (page - 1) * limit;
    return await this.productModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Product with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getSimilarProducts(id: string): Promise<Product[]> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Product with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const similarProducts = await this.productModel
        .find({
          _id: { $ne: id },
          gender: product.gender,
          category: product.category,
        })
        .limit(4);
      return similarProducts;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBestSellerProducts() {
    try {
      const bestseller = await this.productModel.findOne().sort({
        rating: -1,
      });
      if (bestseller) {
        return bestseller;
      } else {
        throw new HttpException(
          {
            statusCode: 404,
            message: `No BestSeller Product not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {}
  }

  async getNewArrivalProducts() {
    try {
      const newArrivalProducts = await this.productModel
        .find()
        .sort({
          createdAt: -1,
        })
        .limit(8);
      return newArrivalProducts;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createProduct(prod: ProductDTO) {
    const createdProduct = new this.productModel(prod);
    return {
      statusCode: 200,
      message: 'Create success',
      product: await createdProduct.save(),
    };
  }
  async updateProduct(prod: UpdateProductDTO, id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const updateData = {};
    Object.keys(prod).forEach((key) => {
      //  null, rỗng, undefined => thì giữ values cũ
      if (prod[key] !== undefined && prod[key] !== null && prod[key] !== '') {
        updateData[key] = prod[key];
      }
    });
    return {
      statusCode: 200,
      message: 'Update success',
      product: await this.productModel.findByIdAndUpdate(id, updateData, {
        new: true,
      }),
    };
  }
  async deleteProductById(id: string) {
    try {
      const existProd = await this.productModel.findById(id);
      if (!existProd) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Product with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: 200,
        message: 'Delete success',
        product: await this.productModel.findByIdAndDelete(id),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
