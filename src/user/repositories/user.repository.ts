import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { Payload } from 'src/types/payload.type';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(doc: User) {
    const userExists = await this.userModel.findOne({ email: doc.email });
    if (userExists) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(doc);
    await createdUser.save();

    const returnUser = { ...createdUser['_doc'] };
    delete returnUser.password;

    return returnUser;
  }

  async findAll() {
    return await this.userModel.find({ deleted: false }).select('-password');
  }

  async findOne(id: string) {
    return await this.userModel
      .findOne({ _id: id, deleted: false })
      .select('-password');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashed = await bcrypt.hash(updateUserDto.password, 10);
    await this.userModel.updateOne(
      { _id: id },
      {
        name: updateUserDto.name,
        company: updateUserDto.company,
        email: updateUserDto.email,
        password: hashed,
        whatsapp: updateUserDto.whatsapp,
        updateAt: new Date(),
      },
    );
    return await this.findOne(id);
  }

  async delete(id: string) {
    await this.userModel.updateOne(
      { _id: id },
      {
        deleted: true,
        updateAt: new Date(),
      },
    );
    return true;
  }

  async authUser(userDto: LoginUserDto) {
    const { email, password } = userDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      const returnUser = { ...user['_doc'] };
      delete returnUser.password;
      return returnUser;
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: Payload) {
    const { sub } = payload;
    return await this.userModel.findOne({ _id: sub });
  }
}
