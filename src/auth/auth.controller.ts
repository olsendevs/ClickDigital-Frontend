import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Payload } from 'src/types/payload.type';
import { Roles, RolesGuard } from './jwt/role.guard';
import { OpenWAService } from 'src/open-wa/open-wa.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private openWaService: OpenWAService,
  ) {}
  @Post('register')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    const payload: Payload = {
      sub: user._id,
      role: 'default',
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('login')
  async login(@Body() UserDTO: LoginUserDto) {
    const user = await this.userService.authUser(UserDTO);
    const payload: Payload = {
      sub: user._id,
      role: 'default',
    };
    const token = await this.authService.signPayload(payload);
    //this.openWaService.startSession(user._id.toString());
    return { user, token };
  }
}
