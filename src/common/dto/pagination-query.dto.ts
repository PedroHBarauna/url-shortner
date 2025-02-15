import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationQueryDto {
	@ApiProperty({ description: 'Página desejada', required: false, example: 1 })
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page: number = 1;

	@ApiProperty({
		description: 'Quantidade de Itens por página',
		required: false,
		example: 25,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	itens: number = 25;
}
