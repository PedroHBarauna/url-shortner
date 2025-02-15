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
				throw new BadRequestException('E-mail já cadastrado.');
			}

			const user = await this.userRepository.create(userData);

			return plainToClass(UserResponseDto, user, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			this.logger.error(`Error creating user: ${error.message}`, error.stack);

			if (error instanceof BadRequestException) {
				throw new BadRequestException('E-mail já cadastrado.');
			}

			throw new Error('Falha ao criar usuário');
		}
	}

	async list({
		page = 1,
		itens = 25,
	}: PaginationQueryDto): Promise<PaginationResultDto<UserResponseDto>> {
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
	}

	async getById(id: number): Promise<UserResponseDto> {
		const user = await this.userRepository.getById(id);

		if (!user) {
			this.logger.warn(`User ${id} not found`);
			throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
		}

		return plainToClass(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});
	}

	async getByEmail({ email }: EmailDto): Promise<UserResponseDto> {
		const user = await this.userRepository.getByEmail(email);

		if (!user) {
			this.logger.warn(`User ${email} not found`);
			throw new NotFoundException(
				`Usuário com e-mail ${email} não encontrado.`,
			);
		}

		return plainToClass(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});
	}

	async update(id: number, userData: UserUpdateDto): Promise<UserResponseDto> {
		const user = await this.userRepository.getById(id);

		if (!user) {
			this.logger.warn(`User ${id} not found`);
			throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
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
	}

	async delete(id: number): Promise<void> {
		const user = await this.userRepository.getById(id);

		if (!user) {
			this.logger.warn(`User ${id} not found`);
			throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
		}

		await this.userRepository.delete(id);
	}
}
