import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	HttpStatus,
	Logger,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResultDto } from 'src/common/dto/pagination-result.dto';
import { EmailDto } from 'src/common/dto/email.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { IdDto } from 'src/common/dto/id.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('User')
@ApiBearerAuth('default')
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('user')
export class UserController {
	private readonly logger = new Logger(UserController.name);

	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'User successfully created.',
		type: UserResponseDto,
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Bad Request.',
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal Server Error.',
	})
	async create(
		@Body() data: UserCreateDto,
	): Promise<{ message: string; user: UserResponseDto }> {
		const user = await this.userService.create(data);
		this.logger.log(`User ${user.id} created successfully`);
		return { message: 'User created successfully', user };
	}

	@Get('all')
	@ApiOperation({ summary: 'List all users with pagination' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'List of users retrieved successfully.',
		type: PaginationResultDto<UserResponseDto>,
	})
	async list(
		@Query() queryParams: PaginationQueryDto,
	): Promise<PaginationResultDto<UserResponseDto>> {
		const usersPagination = await this.userService.list(queryParams);
		this.logger.log(`Retrieved ${usersPagination.pagination.itens} users`);
		return usersPagination;
	}

	@Get('email')
	@ApiOperation({ summary: 'Get user details by email' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User retrieved successfully.',
		type: UserResponseDto,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'User not found.',
	})
	async getByEmail(@Query() email: EmailDto): Promise<UserResponseDto> {
		const user = await this.userService.getByEmail(email);

		this.logger.log(`Retrieved user ${email}`);
		return user;
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user details by ID' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User retrieved successfully.',
		type: UserResponseDto,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'User not found.',
	})
	async getById(@Param() param: IdDto): Promise<UserResponseDto> {
		const user = await this.userService.getById(param.id);

		this.logger.log(`Retrieved user ${param.id}`);
		return user;
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Partially update user data' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User partially updated successfully.',
		type: UserResponseDto,
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'User not found.',
	})
	async update(
		@Body() userData: UserUpdateDto,
		@Param() param: IdDto,
	): Promise<{ message: string; updatedUser: UserResponseDto }> {
		await this.userService.getById(param.id);
		const updatedUser = await this.userService.update(param.id, userData);

		this.logger.log(`Partially updated user ${param.id}`);
		return { message: 'User partially updated successfully', updatedUser };
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete user by ID' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User deleted successfully.',
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'User not found.',
	})
	async delete(@Param() param: IdDto): Promise<{ message: string }> {
		await this.userService.delete(param.id);
		this.logger.log(`Deleted user ${param.id}`);
		return { message: 'User deleted successfully' };
	}
}
