import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UserResponseDto {
	@ApiProperty({
		description: 'ID do usuário',
		example: '1',
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'Nome do usuário',
		minLength: 3,
		maxLength: 50,
		example: 'Lucas',
	})
	@IsString()
	@Expose()
	name: string;

	@ApiProperty({
		description: 'Email do usuário',
		format: 'email',
		example: 'admin@dominio.com',
	})
	@IsEmail()
	@Expose()
	email: string;

	@ApiProperty({
		description: 'Data de criação do usuário',
		example: '2021-07-01T00:00:00.000Z',
	})
	@IsDateString()
	@Expose()
	createdAt: Date;

	@ApiProperty({
		description: 'Data de atualização do usuário',
		example: '2021-07-01T00:00:00.000Z',
	})
	@IsDateString()
	@Expose()
	updatedAt: Date;
}
