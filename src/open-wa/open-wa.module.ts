// openwa.module.ts

import { Module } from '@nestjs/common';
import { OpenWAService } from './open-wa.service';
import { OpenWAController } from './open-wa.controller';

@Module({
  controllers: [OpenWAController],
  providers: [OpenWAService],
  exports: [OpenWAService],
})
export class OpenWAModule {}
