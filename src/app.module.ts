import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PlanModule } from './plan/plan.module';
import { CustomerModule } from './customer/customer.module';
import { OpenWAModule } from './open-wa/open-wa.module';
import { CronModule } from './cron/cron.module';
import { MessageConfigsModule } from './message-configs/message-configs.module';
import { MessageModule } from './message/message.module';
import { HealthCheckController } from './health-check/health-check.controller';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/click-digital'),
    ServiceModule,
    UserModule,
    AuthModule,
    PlanModule,
    CustomerModule,
    OpenWAModule,
    CronModule,
    MessageConfigsModule,
    MessageModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
