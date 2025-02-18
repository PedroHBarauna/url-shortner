import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RedirectByIdDto {
	@ApiProperty({
		description: 'Url short id',
		example: 'bZnMok',
	})
	@IsString()
	shortUrlId: string;
}
