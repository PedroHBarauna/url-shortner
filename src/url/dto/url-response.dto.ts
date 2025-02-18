import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString } from 'class-validator';

export class UrlResponseDto {
	@ApiProperty({
		description: 'Url Id',
		example: '1',
	})
	@Expose()
	id: number;

	@ApiProperty({
		description: 'Original Url',
		example: 'https://teddydigital.io',
	})
	@Expose()
	originUrl: string;

	@ApiProperty({
		description: 'Short Url Id',
		example: `abc123`,
	})
	@Expose()
	shortUrlId: string;

	@ApiProperty({
		description: 'Short url',
		example: `${process.env.BASE_URL}/abc123`,
	})
	@Expose()
	shortUrl: string;

	@ApiProperty({
		description: 'User Id',
		example: '1',
	})
	@Expose()
	userId: number;

	@ApiProperty({
		description: 'URL Clicks',
		example: '1',
	})
	@Expose()
	clicks: number;

	@ApiProperty({
		description: 'Url created at',
		example: '2021-07-01T00:00:00.000Z',
	})
	@IsDateString()
	@Expose()
	createdAt: Date;

	@ApiProperty({
		description: 'Url updated at',
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
