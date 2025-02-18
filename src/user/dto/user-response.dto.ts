import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UserResponseDto {
	@ApiProperty({
		description: 'User id',
		example: '1',
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'User name',
		minLength: 3,
		maxLength: 50,
		example: 'Lucas',
	})
	@IsString()
	@Expose()
	name: string;

	@ApiProperty({
		description: 'User email',
		format: 'email',
		example: 'admin@dominio.com',
	})
	@IsEmail()
	@Expose()
	email: string;

	@ApiProperty({
		description: 'User created at',
		example: '2021-07-01T00:00:00.000Z',
	})
	@IsDateString()
	@Expose()
	createdAt: Date;

	@ApiProperty({
		description: 'User updated at',
		example: '2021-07-01T00:00:00.000Z',
	})
	@IsDateString()
	@Expose()
	updatedAt: Date;

	@ApiProperty({
		description: 'User deleted at',
		example: '2021-07-01T00:00:00.000Z',
	})
	@IsDateString()
	@Expose()
	deletedAt: Date;
}
