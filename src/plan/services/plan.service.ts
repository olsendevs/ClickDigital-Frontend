import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanRepository } from '../repositories/plan.repository';

@Injectable()
export class PlanService {
  constructor(private repo: PlanRepository) {}

  async create(createPlanDto: CreatePlanDto, userId: string) {
    return await this.repo.create({
      name: createPlanDto.name,
      value: createPlanDto.value,
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

  async update(id: string, updatePlanDto: UpdatePlanDto, userId: string) {
    return await this.repo.update(id, updatePlanDto, userId);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
