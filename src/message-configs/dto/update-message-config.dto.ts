import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageConfigDto } from './create-message-config.dto';
import { IsString } from 'class-validator';

export class UpdateMessageConfigDto extends PartialType(
  CreateMessageConfigDto,
) {
  @IsString()
  fiveDaysBefore?: string;

  @IsString()
  threeDaysBefore?: string;

  @IsString()
  oneDayBefore?: string;

  @IsString()
  EndDay?: string;

  @IsString()
  oneDayAfter?: string;
}
