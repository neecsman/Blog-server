import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDto | null> {
    const user = await this.usersService.findOne(username);
    const hash = await bcrypt.hash(pass, process.env.SALT_ROUND);

    if (user && user.password === hash) {
      const userDto = new UserDto(user);
      return userDto;
    }
    return null;
  }
  async loginByUsername(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { access_toekn: this.jwtService.sign(payload) };
  }
}
