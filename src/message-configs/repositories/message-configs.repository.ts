import { Injectable } from '@nestjs/common';
import { UpdateMessageConfigDto } from '../dto/update-message-config.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MessageConfig } from '../entities/message-config.entity';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class MessageConfigsRepository {
  constructor(
    @InjectModel('MessageConfigs')
    private readonly MessageConfigsModel: Model<MessageConfig>,
  ) {}

  async create(doc: MessageConfig) {
    const result = await new this.MessageConfigsModel(doc).save();
    return result;
  }

  async findByUserId(userId: string) {
    return await this.MessageConfigsModel.findOne({
      deleted: false,
      userId: userId,
    });
  }

  async findOne(id: string, userId: string) {
    return await this.MessageConfigsModel.findOne({
      _id: id,
      deleted: false,
      userId,
    });
  }

  async update(
    id: string,
    updateMessageConfigsDto: UpdateMessageConfigDto,
    userId: string,
  ) {
    console.log(id);
    await this.MessageConfigsModel.updateOne(
      { _id: id },
      {
        fiveDaysBefore: updateMessageConfigsDto.fiveDaysBefore,
        threeDaysBefore: updateMessageConfigsDto.threeDaysBefore,
        oneDayBefore: updateMessageConfigsDto.oneDayBefore,
        EndDay: updateMessageConfigsDto.EndDay,
        oneDayAfter: updateMessageConfigsDto.oneDayAfter,
        updateAt: new Date(),
      },
    );
    return await this.findOne(id, userId);
  }

  async delete(id: string) {
    await this.MessageConfigsModel.updateOne(
      { _id: id },
      {
        deleted: true,
        updateAt: new Date(),
      },
    );
    return true;
  }
}
