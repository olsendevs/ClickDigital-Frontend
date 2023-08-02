import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessageService } from './services/message.service';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('Message')
export class MessageController {
  constructor(private readonly MessageService: MessageService) {}

  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  findAll(@Req() request) {
    const userId = request.user.id;
    return this.MessageService.findAll(userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    return this.MessageService.findOne(id, userId);
  }
}
