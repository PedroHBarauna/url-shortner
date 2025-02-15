import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsInt,
	ValidateNested,
	IsArray,
	IsNotEmptyObject,
} from 'class-validator';

export class PaginationObjectDto {
	@ApiProperty({ description: 'Total de itens' })
	@Type(() => Number)
	@IsInt()
	totalItens: number;

	@ApiProperty({ description: 'Quantidade de itens por página' })
	@Type(() => Number)
	@IsInt()
	itens: number;

	@ApiProperty({ description: 'Página atual' })
	@Type(() => Number)
	@IsInt()
	page: number;

	@ApiProperty({ description: 'Total de páginas' })
	@Type(() => Number)
	@IsInt()
	totalPages: number;
}

export class PaginationResultDto<T> {
	@ApiProperty({ description: 'Objeto com as propriedades de paginação' })
	@ValidateNested()
	@Type(() => PaginationObjectDto)
	@IsNotEmptyObject()
	pagination: PaginationObjectDto | null = new PaginationObjectDto();

	@ApiProperty({ description: 'Itens retornados na paginação' })
	@IsArray()
	data: T[] | null;
}
