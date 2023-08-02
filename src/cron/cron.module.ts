// openwa.module.ts

import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { CustomerSchema } from 'src/customer/entities/customer.entity';
import { MessageConfigsRepository } from 'src/message-configs/repositories/message-configs.repository';
import { MessageConfigSchema } from 'src/message-configs/entities/message-config.entity';
import { OpenWAService } from 'src/open-wa/open-wa.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'MessageConfigs',
        schema: MessageConfigSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    CronService,
    CustomerRepository,
    MessageConfigsRepository,
    OpenWAService,
  ],
})
export class CronModule {}
