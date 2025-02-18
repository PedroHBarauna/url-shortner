import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
	let paginationService: PaginationService;

	beforeEach(() => {
		paginationService = new PaginationService();
	});

	it('should be defined', () => {
		expect(paginationService).toBeDefined();
	});

	it('should return correct take and skip values for page 1', () => {
		const result = paginationService.paginate({ itens: 10, page: 1 });
		expect(result).toEqual({ take: 10, skip: 0 });
	});

	it('should return correct take and skip values for page 2', () => {
		const result = paginationService.paginate({ itens: 10, page: 2 });
		expect(result).toEqual({ take: 10, skip: 10 });
	});

	it('should return correct take and skip values for page 3', () => {
		const result = paginationService.paginate({ itens: 10, page: 3 });
		expect(result).toEqual({ take: 10, skip: 20 });
	});

	it('should return correct take and skip values for different items per page', () => {
		const result = paginationService.paginate({ itens: 5, page: 3 });
		expect(result).toEqual({ take: 5, skip: 10 });
	});

	it('should return correct take and skip values for page 0', () => {
		const result = paginationService.paginate({ itens: 10, page: 0 });
		expect(result).toEqual({ take: 10, skip: -10 });
	});

	it('should return correct take and skip values for negative page', () => {
		const result = paginationService.paginate({ itens: 10, page: -1 });
		expect(result).toEqual({ take: 10, skip: -20 });
	});
});
