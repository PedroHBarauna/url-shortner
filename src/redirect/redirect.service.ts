import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { Url } from '@prisma/client';
import { UrlRepository } from 'src/url/url.repository';

@Injectable()
export class RedirectService {
	private readonly logger = new Logger(RedirectService.name);

	constructor(private readonly urlRepository: UrlRepository) {}

	async redirect(shortUrlId: string): Promise<Url> {
		try {
			const url = await this.urlRepository.getByShortUrlId(shortUrlId);

			if (!url) {
				throw new NotFoundException('URL not found');
			}

			await this.urlRepository.update(url.id, {
				clicks: url.clicks + 1,
			});

			return url;
		} catch (error) {
			this.logger.error(`Error redirecting: ${error.message}`, error.stack);

			if (error instanceof NotFoundException) {
				throw new NotFoundException('URL not found');
			}

			throw new InternalServerErrorException('Erro ao redirecionar');
		}
	}
}
