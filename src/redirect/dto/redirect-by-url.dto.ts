import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class RedirectByUrlDto {
	@ApiProperty({
		description: 'Url short id',
		example: `${process.env.BASE_URL}/bZnMok`,
	})
	@IsString()
	@IsUrl({ require_tld: false })
	shortUrl: string;
}
