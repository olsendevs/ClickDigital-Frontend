import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload.type';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/services/user.service';
@Injectable()
export class AuthRepository {
  constructor(private userService: UserService) {}
  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
