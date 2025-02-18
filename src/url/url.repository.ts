import { Injectable } from '@nestjs/common';
import { Url } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: any) {
		return this.prismaService.url.create({
			data,
		});
	}

	async list(skip: number, take: number, whereOptions: object) {
		return this.prismaService.url.findMany({
			skip: skip,
			take: take,
			where: whereOptions,
			include: {
				user: true,
			},
		});
	}

	async getById(id: number): Promise<Url> {
		return this.prismaService.url.findFirst({
			where: {
				id,
			},
		});
	}

	async getByShortUrlId(shortUrlId: string): Promise<Url> {
		return this.prismaService.url.findFirst({
			where: {
				shortUrlId,
			},
		});
	}

	async count(whereOptions) {
		return this.prismaService.url.count({
			where: whereOptions,
		});
	}

	async update(id: number, data: any) {
		return this.prismaService.url.update({
			where: {
				id,
			},
			data,
		});
	}

	async delete(id: number) {
		return this.prismaService.url.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
