import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './repositories/message.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: MessageSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageRepository,
    UserRepository,
    UserService,
    AuthService,
    AuthRepository,
  ],
})
export class MessageModule {}
