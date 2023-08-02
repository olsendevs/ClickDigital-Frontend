import { Module } from '@nestjs/common';
import { ServiceService } from './services/service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './repositories/service.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './entities/service.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UserService } from 'src/user/services/user.service';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Service',
        schema: ServiceSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ServiceController],
  providers: [
    ServiceService,
    ServiceRepository,
    JwtService,
    UserService,
    UserRepository,
    AuthService,
    AuthRepository,
  ],
})
export class ServiceModule {}
