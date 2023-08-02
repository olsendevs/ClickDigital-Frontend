import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { Payload } from 'src/types/payload.type';

@Injectable()
export class UserService {
  constructor(private repo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.repo.create({
      name: createUserDto.name,
      company: createUserDto.company,
      email: createUserDto.email,
      password: createUserDto.password,
      whatsapp: createUserDto.whatsapp,
      createAt: new Date(),
      updateAt: new Date(),
      deleted: false,
    });
  }

  async findAll() {
    return await this.repo.findAll();
  }

  async findOne(id: string) {
    return await this.repo.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.repo.update(id, updateUserDto);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
  async authUser(userDto: LoginUserDto) {
    return await this.repo.authUser(userDto);
  }

  async findByPayload(payload: Payload) {
    return await this.repo.findByPayload(payload);
  }
}
