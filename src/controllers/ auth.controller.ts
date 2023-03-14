import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/helpers/auth';
import { MailService } from 'src/services/mail/mail.service';
import { AuthService } from '../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    await this.mailService.sendUserConfirmation(req.user);
    return await this.authService.login(req.user);
  }
}
