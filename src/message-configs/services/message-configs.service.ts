import { Injectable } from '@nestjs/common';
import { CreateMessageConfigDto } from '../dto/create-message-config.dto';
import { UpdateMessageConfigDto } from '../dto/update-message-config.dto';
import { MessageConfigsRepository } from '../repositories/message-configs.repository';

@Injectable()
export class MessageConfigsService {
  constructor(private repo: MessageConfigsRepository) {}

  async create(
    createMessageConfigsDto: CreateMessageConfigDto,
    userId: string,
  ) {
    return await this.repo.create({
      fiveDaysBefore: createMessageConfigsDto.fiveDaysBefore,
      threeDaysBefore: createMessageConfigsDto.threeDaysBefore,
      oneDayBefore: createMessageConfigsDto.oneDayBefore,
      EndDay: createMessageConfigsDto.EndDay,
      oneDayAfter: createMessageConfigsDto.oneDayAfter,
      createAt: new Date(),
      updateAt: new Date(),
      deleted: false,
      userId,
    });
  }

  async findByUserId(userId: string) {
    let messageConfig = await this.repo.findByUserId(userId);

    if (messageConfig) {
      return messageConfig;
    }

    messageConfig = await this.repo.create({
      fiveDaysBefore: '',
      threeDaysBefore: '',
      oneDayBefore: '',
      EndDay: '',
      oneDayAfter: '',
      createAt: new Date(),
      updateAt: new Date(),
      deleted: false,
      userId,
    });

    return messageConfig;
  }

  async findOne(id: string, userId: string) {
    return await this.repo.findOne(id, userId);
  }

  async update(
    id: string,
    updateMessageConfigsDto: UpdateMessageConfigDto,
    userId: string,
  ) {
    return await this.repo.update(id, updateMessageConfigsDto, userId);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
