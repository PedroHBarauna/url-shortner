import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { HashService } from 'src/common/services/hash.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository,
		private readonly hashService: HashService,
	) {}

	async login({ email, password }: AuthLoginDto): Promise<{
		accessToken: string;
	}> {
		const user = await this.userRepository.getByEmail(email);
		if (!user) {
			throw new UnauthorizedException('Credenciais inválidas');
		}

		const passwordMatches = await this.hashService.comparePassword(
			password,
			user.password,
		);
		if (!passwordMatches) {
			throw new UnauthorizedException('Credenciais inválidas');
		}

		const payload = { sub: user.id, email: user.email };
		const token = await this.jwtService.signAsync(payload);
		return {
			accessToken: token,
		};
	}
}
