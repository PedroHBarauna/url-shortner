import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
	@ApiProperty({
		description: 'User name',
		minLength: 3,
		maxLength: 50,
		example: 'Lucas',
	})
	@IsString()
	@IsOptional()
	name?: string;

	@ApiProperty({
		description: 'User email',
		format: 'email',
		example: 'user@urlshortner.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: 'User Password',
		minLength: 8,
		example: 'P@ssw0rd123',
	})
	@IsNotEmpty()
	password: string;
}
