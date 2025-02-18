import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResultDto } from 'src/common/dto/pagination-result.dto';
import { EmailDto } from 'src/common/dto/email.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { IdDto } from 'src/common/dto/id.dto';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { mockUserResponse } from 'src/common/mocks/user.mock';

describe('UserController', () => {
	let controller: UserController;
	let service: UserService;
	let repository: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						create: jest.fn(),
						list: jest.fn(),
						getByEmail: jest.fn(),
						getById: jest.fn(),
						update: jest.fn(),
						delete: jest.fn(),
					},
				},
				{
					provide: UserRepository,
					useValue: {
						create: jest.fn(),
						list: jest.fn(),
						getByEmail: jest.fn(),
						getById: jest.fn(),
						update: jest.fn(),
						delete: jest.fn(),
						count: jest.fn(),
					},
				},
				{
					provide: PrismaService,
					useValue: {
						user: {
							findMany: jest.fn(),
							findFirst: jest.fn(),
							create: jest.fn(),
							update: jest.fn(),
							delete: jest.fn(),
							count: jest.fn(),
						},
					},
				},
			],
		})
			.overrideGuard(AuthGuard)
			.useValue({ canActivate: jest.fn().mockReturnValue(true) })
			.compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
		repository = module.get<UserRepository>(UserRepository);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create a user', async () => {
			const userCreateDto: UserCreateDto = {
				email: 'user@urlshortner.com',
				password: 'password',
			};
			const userResponseDto: UserResponseDto = mockUserResponse;
			jest.spyOn(service, 'create').mockResolvedValue(userResponseDto);

			const result = await controller.create(userCreateDto);
			expect(result).toEqual({
				message: 'User created successfully',
				user: userResponseDto,
			});
			expect(service.create).toHaveBeenCalledWith(userCreateDto);
		});
	});

	describe('list', () => {
		it('should return a list of users', async () => {
			const paginationQueryDto: PaginationQueryDto = { itens: 10, page: 1 };
			const paginationResultDto: PaginationResultDto<UserResponseDto> = {
				pagination: { itens: 10, page: 1, totalItens: 1, totalPages: 1 },
				data: [
					{
						id: 1,
						name: null,
						email: 'user@urlshortner.com',
						createdAt: new Date(),
						updatedAt: new Date(),
						deletedAt: null,
					},
				],
			};
			jest.spyOn(service, 'list').mockResolvedValue(paginationResultDto);

			const result = await controller.list(paginationQueryDto);
			expect(result).toEqual(paginationResultDto);
			expect(service.list).toHaveBeenCalledWith(paginationQueryDto);
		});
	});

	describe('getById', () => {
		it('should return a user by ID', async () => {
			const idDto: IdDto = { id: 1 };
			const userResponseDto: UserResponseDto = mockUserResponse;
			jest.spyOn(service, 'getById').mockResolvedValue(userResponseDto);

			const result = await controller.getById(idDto);
			expect(result).toEqual(userResponseDto);
			expect(service.getById).toHaveBeenCalledWith(1);
		});
	});

	describe('update', () => {
		it('should update a user', async () => {
			const idDto: IdDto = { id: 1 };
			const userUpdateDto: UserUpdateDto = { email: 'user@urlshortner.com' };
			const userResponseDto: UserResponseDto = mockUserResponse;
			jest.spyOn(service, 'getById').mockResolvedValue(userResponseDto);
			jest.spyOn(service, 'update').mockResolvedValue(userResponseDto);

			const result = await controller.update(userUpdateDto, idDto);
			expect(result).toEqual({
				message: 'User partially updated successfully',
				updatedUser: userResponseDto,
			});
			expect(service.update).toHaveBeenCalledWith(1, userUpdateDto);
		});
	});

	describe('delete', () => {
		it('should delete a user', async () => {
			const idDto: IdDto = { id: 1 };
			jest.spyOn(service, 'delete').mockResolvedValue(undefined);

			const result = await controller.delete(idDto);
			expect(result).toEqual({ message: 'User deleted successfully' });
			expect(service.delete).toHaveBeenCalledWith(1);
		});
	});
});
