import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ServiceRepository } from '../repositories/service.repository';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(private repo: ServiceRepository) {}

  async create(createServiceDto: CreateServiceDto, userId: string) {
    return await this.repo.create({
      name: createServiceDto.name,
      cost: createServiceDto.cost,
      createAt: new Date(),
      updateAt: new Date(),
      deleted: false,
      userId,
    });
  }

  async findAll(userId: string) {
    return await this.repo.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    return await this.repo.findOne(id, userId);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, userId: string) {
    return await this.repo.update(id, updateServiceDto, userId);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
