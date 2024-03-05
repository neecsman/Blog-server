import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginByUsernameFormData, RegistrationFormData } from 'src/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Birthday } from 'src/user/entities/birthday.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Birthday)
    private birthdayRepository: Repository<Birthday>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findOne(username);

    if (!user)
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.NOT_FOUND,
      );

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch)
      throw new HttpException('Неправильный пароль', HttpStatus.BAD_REQUEST);

    const userDto = new UserDto(user);
    return userDto;
  }

  async registration(userData: RegistrationFormData): Promise<string> {
    const user = await this.userRepository.findOne({
      where: [{ username: userData.username }, { email: userData.email }],
    });

    if (user) {
      if (user.username === userData.username)
        throw new HttpException(
          'Пользователь с таким никнеймом уже существует',
          HttpStatus.CONFLICT,
        );

      if (user.email === userData.email)
        throw new HttpException(
          'Пользователь с таким email уже существует',
          HttpStatus.CONFLICT,
        );
    }

    let newUser = new User();
    let newBirthday = new Birthday();

    const hashPass = await bcrypt.hash(userData.password, 10);

    const { birthday, ...otheUserData } = userData;

    newBirthday = Object.assign(newBirthday, birthday);
    const savedBirthday = await this.birthdayRepository.save(newBirthday);

    newUser = Object.assign(newUser, otheUserData);
    newUser.birthday = savedBirthday;
    newUser.password = hashPass;
    const savedUser = await this.userRepository.save(newUser);

    const userDto = new UserDto(savedUser);

    return await this.createToken(userDto);
  }

  async loginByUsername(data: LoginByUsernameFormData) {
    const user = await this.validateUser(data.username, data.password);

    const token = await this.createToken(user);

    return { user, token };
  }

  private async createToken(user: UserDto) {
    const payload = { username: user.username, id: user.id };
    return this.jwtService.sign(payload);
  }
}
