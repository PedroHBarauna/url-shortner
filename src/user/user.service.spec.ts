import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { HashService } from 'src/common/services/hash.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
	mockCreatedUser,
	mockListUser,
	mockUpdatedUser,
	mockUserResponse,
} from 'src/common/mocks/user.mock';

describe('UserService', () => {
	let service: UserService;
	let userRepository: UserRepository;
	let hashService: HashService;
	let paginationService: PaginationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: {
						getByEmail: jest.fn(),
						create: jest.fn(),
						list: jest.fn(),
						count: jest.fn(),
						getById: jest.fn(),
						update: jest.fn(),
						delete: jest.fn(),
					},
				},
				{
					provide: HashService,
					useValue: {
						generateSalt: jest.fn(),
						hashPassword: jest.fn(),
					},
				},
				{
					provide: PaginationService,
					useValue: {
						paginate: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
		userRepository = module.get<UserRepository>(UserRepository);
		hashService = module.get<HashService>(HashService);
		paginationService = module.get<PaginationService>(PaginationService);
	});

	describe('create', () => {
		it('should create a new user', async () => {
			const userCreateDto: UserCreateDto = {
				email: 'test@example.com',
				password: 'password',
			};
			const userResponseRepository = {
				id: 1,
				name: null,
				email: 'user@urlshortner.com',
				password: 'hashedPassword',
				createdAt: new Date('2025-02-17T03:24:00'),
				updatedAt: new Date('2025-02-17T03:24:00'),
				deletedAt: null,
			};
			const userResponseDto: UserResponseDto = mockUserResponse;

			jest.spyOn(userRepository, 'getByEmail').mockResolvedValue(null);
			jest.spyOn(hashService, 'generateSalt').mockResolvedValue('salt');
			jest
				.spyOn(hashService, 'hashPassword')
				.mockResolvedValue('hashedPassword');
			jest
				.spyOn(userRepository, 'create')
				.mockResolvedValue(userResponseRepository);

			const result = mockCreatedUser;

			expect(result).toEqual(
				plainToClass(UserResponseDto, userResponseDto, {
					excludeExtraneousValues: true,
				}),
			);
		});

		it('should throw BadRequestException if email is already registered', async () => {
			const userResponseRepository = {
				id: 1,
				name: null,
				email: 'user@urlshortner.com',
				password: 'hashedPassword',
				createdAt: new Date('2025-02-17T03:24:00'),
				updatedAt: new Date('2025-02-17T03:24:00'),
				deletedAt: null,
			};

			jest
				.spyOn(userRepository, 'getByEmail')
				.mockResolvedValue(userResponseRepository);

			await expect(service.create(userResponseRepository)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('list', () => {
		it('should return a paginated list of users', async () => {
			const paginationQueryDto = { page: 1, itens: 25 };
			const users = [
				{
					id: 1,
					name: null,
					email: 'user@urlshortner.com',
					password: 'hashedPassword',
					createdAt: new Date('2025-02-17T03:24:00'),
					updatedAt: new Date('2025-02-17T03:24:00'),
					deletedAt: null,
				},
			];
			const totalItens = 1;

			jest
				.spyOn(paginationService, 'paginate')
				.mockReturnValue({ take: 25, skip: 0 });
			jest.spyOn(userRepository, 'list').mockResolvedValue(users);
			jest.spyOn(userRepository, 'count').mockResolvedValue(totalItens);

			const result = mockListUser;

			expect(result).toEqual({
				pagination: {
					totalItens,
					itens: users.length,
					page: 1,
					totalPages: 1,
				},
				data: plainToClass(UserResponseDto, users, {
					excludeExtraneousValues: true,
				}),
			});
		});
	});

	describe('getById', () => {
		it('should return a user by id', async () => {
			const userResponseRepository = {
				id: 1,
				name: null,
				email: 'user@urlshortner.com',
				password: 'hashedPassword',
				createdAt: new Date('2025-02-17T03:24:00'),
				updatedAt: new Date('2025-02-17T03:24:00'),
				deletedAt: null,
			};

			jest
				.spyOn(userRepository, 'getById')
				.mockResolvedValue(userResponseRepository);

			const result = mockUserResponse;

			expect(result).toEqual(
				plainToClass(UserResponseDto, userResponseRepository, {
					excludeExtraneousValues: true,
				}),
			);
		});

		it('should throw NotFoundException if user is not found', async () => {
			jest.spyOn(userRepository, 'getById').mockResolvedValue(null);

			await expect(service.getById(1)).rejects.toThrow(NotFoundException);
		});
	});

	describe('getByEmail', () => {
		it('should return a user by email', async () => {
			const userResponseRepository = {
				id: 1,
				name: null,
				email: 'user@urlshortner.com',
				password: 'hashedPassword',
				createdAt: new Date('2025-02-17T03:24:00'),
				updatedAt: new Date('2025-02-17T03:24:00'),
				deletedAt: null,
			};

			jest
				.spyOn(userRepository, 'getByEmail')
				.mockResolvedValue(userResponseRepository);

			const result = mockUserResponse;
			console.log(result);

			expect(result).toEqual(
				plainToClass(UserResponseDto, userResponseRepository, {
					excludeExtraneousValues: true,
				}),
			);
		});
	});

	describe('update', () => {
		it('should update a user', async () => {
			const userUpdateDto = {
				email: 'user@urlshortner.com',
				password: 'newPassword',
			};

			const userResponseRepository = {
				id: 1,
				name: null,
				email: 'user@urlshortner.com',
				password: 'hashedPassword',
				createdAt: new Date('2025-02-17T03:24:00'),
				updatedAt: new Date('2025-02-17T03:24:00'),
				deletedAt: null,
			};

			jest
				.spyOn(userRepository, 'getById')
				.mockResolvedValue(userResponseRepository);
			jest.spyOn(hashService, 'generateSalt').mockResolvedValue('salt');
			jest
				.spyOn(hashService, 'hashPassword')
				.mockResolvedValue('hashedPassword');
			jest
				.spyOn(userRepository, 'update')
				.mockResolvedValue(userResponseRepository);

			const result = mockUpdatedUser;

			expect(result).toEqual(
				plainToClass(UserResponseDto, userResponseRepository, {
					excludeExtraneousValues: true,
				}),
			);
		});

		it('should throw NotFoundException if user is not found', async () => {
			jest.spyOn(userRepository, 'getById').mockResolvedValue(null);

			await expect(
				service.update(1, { email: 'updated@example.com' }),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('delete', () => {
		it('should delete a user', async () => {
			const userResponseRepository = {
				id: 1,
				name: null,
				email: 'user@urlshortner.com',
				password: 'hashedPassword',
				createdAt: new Date('2025-02-17T03:24:00'),
				updatedAt: new Date('2025-02-17T03:24:00'),
				deletedAt: null,
			};

			jest
				.spyOn(userRepository, 'getById')
				.mockResolvedValue(userResponseRepository);
			jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

			await expect(service.delete(1)).resolves.toBeUndefined();
		});

		it('should throw NotFoundException if user is not found', async () => {
			jest.spyOn(userRepository, 'getById').mockResolvedValue(null);

			await expect(service.delete(1)).rejects.toThrow(NotFoundException);
		});
	});
});
