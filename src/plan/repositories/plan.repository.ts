import { Injectable } from '@nestjs/common';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from '../entities/plan.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlanRepository {
  constructor(@InjectModel('Plan') private readonly PlanModel: Model<Plan>) {}

  async create(doc: Plan) {
    const result = await new this.PlanModel(doc).save();
    return result.id;
  }

  async findAll(userId: string) {
    return await this.PlanModel.find({ deleted: false, userId });
  }

  async findOne(id: string, userId: string) {
    return await this.PlanModel.findOne({ _id: id, deleted: false, userId });
  }

  async update(id: string, updatePlanDto: UpdatePlanDto, userId: string) {
    await this.PlanModel.updateOne(
      { _id: id },
      {
        value: updatePlanDto.value,
        name: updatePlanDto.name,
        updateAt: new Date(),
      },
    );
    return await this.findOne(id, userId);
  }

  async delete(id: string) {
    await this.PlanModel.updateOne(
      { _id: id },
      {
        deleted: true,
        updateAt: new Date(),
      },
    );
    return true;
  }
}
