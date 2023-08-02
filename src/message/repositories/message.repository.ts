import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../entities/message.entity';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel('Message')
    private readonly MessageModel: Model<Message>,
  ) {}

  async create(doc: Message) {
    const result = await new this.MessageModel(doc).save();
    return result.id;
  }

  async findAll(userId: string) {
    return await this.MessageModel.find({ deleted: false, userId }).populate(
      'customerId',
      'whatsapp',
    );
  }
  async findActive() {
    return await this.MessageModel.find({
      deleted: false,
      validateDate: { $gte: new Date() },
    });
  }

  async findOne(id: string, userId: string) {
    return await this.MessageModel.findOne({
      _id: id,
      deleted: false,
      userId,
    });
  }

  async delete(id: string) {
    await this.MessageModel.updateOne(
      { _id: id },
      {
        deleted: true,
        updateAt: new Date(),
      },
    );
    return true;
  }
}
