import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { HashService } from 'src/common/services/hash.service';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToClass } from 'class-transformer';
import { PaginationResultDto } from 'src/common/dto/pagination-result.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { EmailDto } from 'src/common/dto/email.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);

	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashService: HashService,
		private readonly paginationService: PaginationService,
	) {}

	async create(userData: UserCreateDto): Promise<UserResponseDto> {
		try {
			const existingUser = await this.userRepository.getByEmail(userData.email);

			const salt = await this.hashService.generateSalt();
			userData.password = await this.hashService.hashPassword(
				userData.password,
				salt,
			);

			if (existingUser) {
				throw new BadRequestException('E-mail already registered.');
			}

			const user = await this.userRepository.create(userData);

			return plainToClass(UserResponseDto, user, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			this.logger.error(`Error creating user: ${error.message}`, error.stack);

			if (error instanceof BadRequestException) {
				throw new BadRequestException('E-mail already registered.');
			}

			throw new Error('Error creating user');
		}
	}

	async list({
		page = 1,
		itens = 25,
	}: PaginationQueryDto): Promise<PaginationResultDto<UserResponseDto>> {
		try {
			const { take, skip } = this.paginationService.paginate({ itens, page });

			const users = await this.userRepository.list(skip, take);

			const totalItens = await this.userRepository.count();

			return {
				pagination: {
					totalItens,
					itens: users.length,
					page,
					totalPages: Math.ceil(totalItens / itens),
				},
				data: plainToClass(UserResponseDto, users, {
					excludeExtraneousValues: true,
				}),
			};
		} catch (error) {
			this.logger.error(`Error listing users: ${error.message}`, error.stack);
			throw new Error('Error listing users');
		}
	}

	async getById(id: number): Promise<UserResponseDto> {
		try {
			const user = await this.userRepository.getById(id);

			if (!user) {
				this.logger.warn(`User ${id} not found`);
				throw new NotFoundException(`User with Id: ${id} not found`);
			}

			return plainToClass(UserResponseDto, user, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			this.logger.error(
				`Error getting user by id: ${error.message}`,
				error.stack,
			);

			if (error instanceof NotFoundException) {
				throw new NotFoundException(`User with Id: ${id} not found`);
			}

			throw new Error('Error getting user by id');
		}
	}

	async getByEmail({ email }: EmailDto): Promise<UserResponseDto> {
		try {
			const user = await this.userRepository.getByEmail(email);

			if (!user) {
				this.logger.warn(`User ${email} not found`);
				throw new NotFoundException(`User with ${email} not found.`);
			}

			return plainToClass(UserResponseDto, user, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			this.logger.error(
				`Error getting user by email: ${error.message}`,
				error.stack,
			);

			if (error instanceof NotFoundException) {
				throw new NotFoundException(`User with ${email} not found.`);
			}

			throw new Error('Error getting user by email');
		}
	}

	async update(id: number, userData: UserUpdateDto): Promise<UserResponseDto> {
		try {
			const user = await this.userRepository.getById(id);

			if (!user) {
				this.logger.warn(`User ${id} not found`);
				throw new NotFoundException(`User with ${id} not found`);
			}

			if (userData.password) {
				const salt = await this.hashService.generateSalt();
				userData.password = await this.hashService.hashPassword(
					userData.password,
					salt,
				);
			}

			const updatedUser = await this.userRepository.update(id, userData);

			return plainToClass(UserResponseDto, updatedUser, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			this.logger.error(`Error updating user: ${error.message}`, error.stack);
			if (error instanceof NotFoundException) {
				throw new NotFoundException(`User with ${id} not found`);
			}

			throw new Error('Error updating user');
		}
	}

	async delete(id: number): Promise<void> {
		try {
			const user = await this.userRepository.getById(id);

			if (!user) {
				this.logger.warn(`User ${id} not found`);
				throw new NotFoundException(`User with ${id} not found`);
			}

			await this.userRepository.delete(id);
		} catch (error) {
			this.logger.error(`Error deleting user: ${error.message}`, error.stack);
			if (error instanceof NotFoundException) {
				throw new NotFoundException(`User with ${id} not found`);
			}

			throw new Error('Error deleting user');
		}
	}
}
