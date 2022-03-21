import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data): Promise<Product> {
    return this.productModel.create(data);
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id });
  }

  async update(id: number, data): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, data, {
      runValidators: true,
      new: true,
    });
  }

  async delete(id: number): Promise<any> {
    console.log('id in delete', id);
    return this.productModel.findOneAndDelete({ id });
  }
}
