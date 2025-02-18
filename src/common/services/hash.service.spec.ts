import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('HashService', () => {
	let service: HashService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [HashService],
		}).compile();

		service = module.get<HashService>(HashService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('generateSalt', () => {
		it('should generate a salt', async () => {
			const salt = 'randomSalt';
			(bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);

			expect(await service.generateSalt()).toBe(salt);
			expect(bcrypt.genSalt).toHaveBeenCalled();
		});
	});

	describe('hashPassword', () => {
		it('should hash a password with a given salt', async () => {
			const password = 'password';
			const salt = 'randomSalt';
			const hashedPassword = 'hashedPassword';
			(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

			expect(await service.hashPassword(password, salt)).toBe(hashedPassword);
			expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
		});
	});

	describe('comparePassword', () => {
		it('should compare a password with a hashed password', async () => {
			const password = 'password';
			const hashedPassword = 'hashedPassword';
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);

			expect(await service.comparePassword(password, hashedPassword)).toBe(
				true,
			);
			expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
		});

		it('should return false if passwords do not match', async () => {
			const password = 'password';
			const hashedPassword = 'hashedPassword';
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			expect(await service.comparePassword(password, hashedPassword)).toBe(
				false,
			);
			expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
		});
	});
});
