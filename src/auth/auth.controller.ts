import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginByUsernameFormData, RegistrationFormData } from 'src/interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async reginstration(
    @Body() cred: RegistrationFormData,
    @Res() res: Response,
  ) {
    try {
      const token = await this.authService.registration(cred);
      res.status(HttpStatus.CREATED).json(token);
    } catch (error) {
      res.status(error.getStatus()).json({ message: error.message });
    }
  }

  @Post('login/username')
  @UseGuards(AuthGuard('local'))
  async loginByUsername(
    @Body() cred: LoginByUsernameFormData,
    @Res() res: Response,
  ) {
    try {
      const token = await this.authService.loginByUsername(cred);
      res.status(HttpStatus.CREATED).json(token);
    } catch (error) {
      res.status(error.getStatus()).json({ message: error.message });
    }
  }
}
