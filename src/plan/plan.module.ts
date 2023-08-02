import { Module } from '@nestjs/common';
import { PlanService } from './services/plan.service';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanSchema } from './entities/plan.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { PlanRepository } from './repositories/plan.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UserService } from 'src/user/services/user.service';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Plan',
        schema: PlanSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PlanController],
  providers: [
    PlanService,
    PlanRepository,
    AuthService,
    AuthRepository,
    UserService,
    UserRepository,
  ],
})
export class PlanModule {}
