import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOperation({ summary: 'Authenticate a user and return an access token' })
	async login(@Body() authLogin: AuthLoginDto, @Res() res: Response) {
		const { email, password } = authLogin;
		const { accessToken } = await this.authService.login({
			email,
			password,
		});
		res.cookie('token', accessToken, {
			httpOnly: true,
			maxAge: 3600000,
		});
		return res.send({
			message: 'Login realizado com sucesso',
			accessToken,
		});
	}

	@Post('logout')
	@ApiOperation({
		summary: 'Log out the current user and invalidate the session.',
	})
	async logout(@Res() res: Response) {
		res.clearCookie('token');
		return res.send({ message: 'Logout realizado com sucesso' });
	}
}
