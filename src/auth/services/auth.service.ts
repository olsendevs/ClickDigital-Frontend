import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload.type';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(private repo: AuthRepository) {}
  async signPayload(payload: Payload) {
    return await this.repo.signPayload(payload);
  }
  async validateUser(payload: Payload) {
    return await this.repo.validateUser(payload);
  }
}
