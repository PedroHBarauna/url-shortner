import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UrlRepository } from './url.repository';
import { UrlCreateDto } from './dto/url-create.dto';
import { UrlResponseDto } from './dto/url-response.dto';
import { nanoid } from 'nanoid';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UrlUpdateDto } from './dto/url-update.dto';

@Injectable()
export class UrlService {
	private readonly logger = new Logger(UrlService.name);

	constructor(
		private readonly urlRepository: UrlRepository,
		private readonly jwtService: JwtService,
		private readonly paginationService: PaginationService,
	) {}

	async create(data: UrlCreateDto, cookie: string): Promise<UrlResponseDto> {
		try {
			const shortUrlId = nanoid(6);

			const shortUrl = `${process.env.BASE_URL}/${shortUrlId}`;

			const clicks = 0;

			let userId = null;

			if (cookie) {
				const token = cookie.substring(6);

				userId = await this.jwtService.decode(token)['id'];

				const user = await this.urlRepository.getById(userId);

				if (!user) {
					userId = null;
				}
			}

			const url = await this.urlRepository.create({
				...data,
				shortUrlId,
				shortUrl,
				clicks,
				userId,
			});

			return plainToClass(UrlResponseDto, url, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			this.logger.error(
				`Error creating short URL: ${error.message}`,
				error.stack,
			);

			throw new Error('Error creating short URL');
		}
	}

	async list({ page = 1, itens = 25 }: PaginationQueryDto) {
		try {
			const { take, skip } = this.paginationService.paginate({ itens, page });

			const urls = await this.urlRepository.list(skip, take);

			const totalItens = await this.urlRepository.count();

			return {
				pagination: {
					totalItens,
					itens: urls.length,
					page,
					totalPages: Math.ceil(totalItens / itens),
				},
				data: plainToClass(UrlResponseDto, urls, {
					excludeExtraneousValues: true,
				}),
			};
		} catch (error) {
			this.logger.error(`Error listing URLs: ${error.message}`, error.stack);
			throw new Error('Error listing URLs');
		}
	}

	async update(id: number, data: UrlUpdateDto) {
		try {
			const url = await this.urlRepository.getById(id);

			if (!url) {
				this.logger.warn(`URL ${id} not found`);
				throw new NotFoundException(`URL with Id: ${id} not found`);
			}

			const urlUpdated = await this.urlRepository.update(id, data);

			return plainToClass(UrlResponseDto, url, {
				excludeExtraneousValues: true,
			});
		} catch (error) {
			this.logger.error(`Error updating URL: ${error.message}`, error.stack);

			if (error instanceof NotFoundException) {
				throw new NotFoundException(`URL with Id: ${id} not found`);
			}

			throw new Error('Error updating URL');
		}
	}

	async delete(id: number): Promise<UrlResponseDto> {
		try {
			const url = await this.urlRepository.getById(id);

			if (!url) {
				this.logger.warn(`URL ${id} not found`);
				throw new NotFoundException(`URL with Id: ${id} not found`);
			}

			const urlDeleted = await this.urlRepository.delete(id);

			return plainToClass(UrlResponseDto, urlDeleted);
		} catch (error) {
			this.logger.error(`Error deleting URL: ${error.message}`, error.stack);

			if (error instanceof NotFoundException) {
				throw new NotFoundException(`URL with Id: ${id} not found`);
			}

			throw new Error('Error deleting URL');
		}
	}
}
