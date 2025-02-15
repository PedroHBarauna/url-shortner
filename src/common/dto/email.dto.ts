import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
	@ApiProperty({
		description: 'Email do usuário',
		format: 'email',
		example: 'admin@dominio.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
