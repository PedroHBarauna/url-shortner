import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
	paginate({ itens, page }: { itens: number; page: number }): {
		take: number;
		skip: number;
	} {
		const offset = (page - 1) * itens;
		return { take: itens, skip: offset };
	}
}
