import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UrlCreateDto {
	@ApiProperty({
		description: 'Origin Url',
		format: 'url',
		example: 'https://teddydigital.io',
	})
	@IsNotEmpty()
	@IsUrl()
	@IsString()
	originUrl: string;
}
