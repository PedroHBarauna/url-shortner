import { Injectable, Logger } from '@nestjs/common';
import { UrlRepository } from './url.repository';
import { UrlCreateDto } from './dto/url-create.dto';
import { UrlResponseDto } from './dto/url-response.dto';
import { nanoid } from 'nanoid';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IdDto } from 'src/common/dto/id.dto';
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
		const shortUrlId = nanoid(6);

		const shortUrl = `${process.env.BASE_URL}/${shortUrlId}`;

		const clicks = 0;

		let userId = null;

		if (cookie) {
			const token = cookie.substring(6);

			userId = await this.jwtService.decode(token)['id'];
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
	}

	async list({ page = 1, itens = 25 }: PaginationQueryDto) {
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
	}

	async update(id: number, data: UrlUpdateDto) {
		const url = await this.urlRepository.update(id, data);

		return plainToClass(UrlResponseDto, url, {
			excludeExtraneousValues: true,
		});
	}

	async delete(id: number) {
		const url = await this.urlRepository.delete(id);

		return plainToClass(UrlResponseDto, url);
	}
}
