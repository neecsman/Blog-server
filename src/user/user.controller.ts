import { Controller, Get, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

interface RequestWithUser extends Request {
  user: UserDto;
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = await this.userService.findOne('neecsman');
    // const userDto = new UserDto(user);

    return res.json(user);
    // return res.json(req.user);
  }

  @Put('profile')
  async editProfile(@Req() req: RequestWithUser, @Res() res: Response) {
    console.log(req.body);

    const profile = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(req.body);
      }, 3000);
    });

    return res.json(profile);
  }
}
