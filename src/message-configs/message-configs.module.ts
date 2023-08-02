import { Module } from '@nestjs/common';
import { MessageConfigsService } from './services/message-configs.service';
import { MessageConfigsController } from './message-configs.controller';
import { MessageConfigsRepository } from './repositories/message-configs.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageConfigSchema } from './entities/message-config.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MessageConfigs',
        schema: MessageConfigSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [MessageConfigsController],
  providers: [
    MessageConfigsService,
    MessageConfigsRepository,
    UserRepository,
    UserService,
    AuthService,
    AuthRepository,
  ],
})
export class MessageConfigsModule {}
