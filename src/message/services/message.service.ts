import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';

@Injectable()
export class MessageService {
  constructor(private repo: MessageRepository) {}

  async findAll(userId: string) {
    return await this.repo.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    return await this.repo.findOne(id, userId);
  }
}
