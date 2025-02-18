import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({}).compile();
	});

	describe('app', () => {
		it('should be defined', () => {
			expect(module).toBeDefined();
		});
	});
});
