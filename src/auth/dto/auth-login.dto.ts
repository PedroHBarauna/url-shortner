import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AuthLoginDto {
	@ApiProperty({
		description: 'Email do usuário',
		format: 'email',
		example: 'admin@dominio.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: 'Senha do usuário (mínimo de 8 caracteres)',
		minLength: 8,
		example: 'P@ssw0rd123',
	})
	@IsStrongPassword({
		minLength: 8,
	})
	@IsNotEmpty()
	password: string;
}
