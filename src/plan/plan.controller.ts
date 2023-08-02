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
import { PlanService } from './services/plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('Plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @UseGuards(RolesGuard)
  @Roles('default')
  @Post()
  create(@Body() createPlanDto: CreatePlanDto, @Req() request) {
    const userId = request.user.id;
    return this.planService.create(createPlanDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  findAll(@Req() request) {
    const userId = request.user.id;
    return this.planService.findAll(userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    return this.planService.findOne(id, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
    @Req() request,
  ) {
    const userId = request.user.id;
    return this.planService.update(id, updatePlanDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.delete(id);
  }
}
