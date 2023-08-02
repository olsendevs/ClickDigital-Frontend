import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private repo: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto, userId: string) {
    return await this.repo.create({
      name: createCustomerDto.name,
      whatsapp: createCustomerDto.whatsapp,
      login: createCustomerDto.login,
      password: createCustomerDto.password,
      serviceId: createCustomerDto.serviceId,
      planId: createCustomerDto.planId,
      invoice: createCustomerDto.invoice,
      validateDate: createCustomerDto.validateDate,
      sendNotificationOn: createCustomerDto.sendNotificationOn,
      comment: createCustomerDto.comment,
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

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    userId: string,
  ) {
    return await this.repo.update(id, updateCustomerDto, userId);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
