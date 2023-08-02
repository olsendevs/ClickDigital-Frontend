import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name?: string;

  @IsString()
  password?: string;

  @IsString()
  whatsapp?: string;

  @IsEmail()
  email?: string;

  @IsString()
  company?: string;
}
