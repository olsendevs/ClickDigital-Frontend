import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from '../entities/service.entity';
import { Model } from 'mongoose';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<Service>,
  ) {}

  async create(doc: Service) {
    const result = await new this.serviceModel(doc).save();
    return result.id;
  }

  async findAll(userId: string) {
    return await this.serviceModel.find({ deleted: false, userId });
  }

  async findOne(id: string, userId: string) {
    return await this.serviceModel.findOne({ _id: id, deleted: false, userId });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, userId: string) {
    await this.serviceModel.updateOne(
      { _id: id },
      {
        cost: updateServiceDto.cost,
        name: updateServiceDto.name,
        updateAt: new Date(),
      },
    );
    return await this.findOne(id, userId);
  }

  async delete(id: string) {
    await this.serviceModel.updateOne(
      { _id: id },
      {
        deleted: true,
        updateAt: new Date(),
      },
    );
    return true;
  }
}
