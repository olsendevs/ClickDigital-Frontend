import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-plan.dto';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
