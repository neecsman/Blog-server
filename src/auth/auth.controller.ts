import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  loginByUsername(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    console.log();
    return res.json(createAuthDto);
  }
}
