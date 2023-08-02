import { IsString } from 'class-validator';

export class CreateMessageConfigDto {
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
