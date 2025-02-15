import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class IdDto {
	@ApiProperty({
		description: 'Id',
		example: 1,
	})
	@IsNumber()
	@IsNotEmpty()
	@Transform(({ value }) => Number(value))
	id: number;
}
