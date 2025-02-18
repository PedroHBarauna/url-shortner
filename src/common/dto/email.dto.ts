import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
	@ApiProperty({
		description: 'User email',
		format: 'email',
		example: 'user@urlshortner.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
