import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsString } from 'class-validator';

export class UrlResponseDto {
	@ApiProperty({
		description: 'ID da URL',
		example: '1',
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'URL original',
		example: 'https://www.google.com',
	})
	@Expose()
	originUrl: string;

	@ApiProperty({
		description: 'id da URL encurtada',
		example: `abc123`,
	})
	@Expose()
	shortUrlId: string;

	@ApiProperty({
		description: 'URL encurtada',
		example: `${process.env.BASE_URL}/abc123`,
	})
	@Expose()
	shortUrl: string;

	@ApiProperty({
		description: 'ID do Usuário',
		example: '1',
	})
	@Expose()
	userId: number;

	@ApiProperty({
		description: 'Número de cliques na URL',
		example: '1',
	})
	@Expose()
	clicks: number;

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

	@ApiProperty({
		description: 'Data de atualização do usuário',
		example: '2021-07-01T00:00:00.000Z',
	})
	@IsDateString()
	@Expose()
	deletedAt: Date;
}
