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

	async list(skip: number, take: number) {
		return this.prismaService.url.findMany({
			skip: skip,
			take: take,
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

	async count() {
		return this.prismaService.url.count();
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
