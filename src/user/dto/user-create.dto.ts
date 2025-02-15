import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
	@ApiProperty({
		description: 'Nome do usuário',
		minLength: 3,
		maxLength: 50,
		example: 'Lucas',
	})
	@IsString()
	@IsOptional()
	name?: string;

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
	@IsNotEmpty()
	password: string;
}
