import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationQueryDto {
	@ApiProperty({ description: 'Desired Page', required: false, example: 1 })
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page: number = 1;

	@ApiProperty({
		description: 'Number of items per page',
		required: false,
		example: 25,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	itens: number = 25;
}
