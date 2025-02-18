import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: UserCreateDto) {
		return this.prismaService.user.create({
			data,
		});
	}

	async list(skip: number, take: number) {
		return this.prismaService.user.findMany({
			skip: skip,
			take: take,
			where: {
				deletedAt: null,
			},
		});
	}

	async getByEmail(email: string) {
		return this.prismaService.user.findUnique({
			where: {
				email,
			},
		});
	}

	async getById(id: number) {
		return this.prismaService.user.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		});
	}

	async update(id: number, data: UserUpdateDto) {
		return this.prismaService.user.update({
			where: {
				id,
				deletedAt: null,
			},
			data,
		});
	}

	async delete(id: number) {
		return this.prismaService.user.update({
			where: {
				id,
				deletedAt: null,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	}

	async count() {
		return this.prismaService.user.count();
	}
}
