import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
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
	ApiHeader,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { UrlService } from './url.service';
import { UrlResponseDto } from './dto/url-response.dto';
import { UrlCreateDto } from './dto/url-create.dto';
import { PaginationResultDto } from 'src/common/dto/pagination-result.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UrlUpdateDto } from './dto/url-update.dto';
import { IdDto } from 'src/common/dto/id.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Url')
@ApiBearerAuth('default')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('url')
export class UrlController {
	private readonly logger = new Logger(UrlController.name);

	constructor(private readonly urlService: UrlService) {}

	@ApiOperation({ summary: 'Create a  short URL', description: '' })
	@ApiHeader({
		name: 'cookie',
		required: false,
		description: 'JWT token',
		example: 'token=jwt_token',
	})
	@ApiOkResponse({
		description: 'Short URL created successfully',
		type: UrlResponseDto,
	})
	@Post()
	async createShortUrl(
		@Body() data: UrlCreateDto,
		@Headers('cookie') cookie?: string,
	): Promise<UrlResponseDto> {
		const url = await this.urlService.create(data, cookie);
		this.logger.log(`Short URL ${url.shortUrl} created successfully`);
		return url;
	}

	@ApiOperation({ summary: 'List URLs' })
	@ApiOkResponse({
		description: 'list de URLs',
		type: UrlResponseDto,
	})
	@UseGuards(AuthGuard)
	@Get('all')
	async list(
		@Query() queryParams: PaginationQueryDto,
	): Promise<PaginationResultDto<UrlResponseDto>> {
		const urls = await this.urlService.list(queryParams);
		this.logger.log(`List of URLs retrieved successfully`);
		return urls;
	}

	@ApiOperation({ summary: 'Update URL' })
	@ApiOkResponse({
		description: 'URL updated successfully',
		type: UrlResponseDto,
	})
	@UseGuards(AuthGuard)
	@Patch(':id')
	async update(
		@Param() param: IdDto,
		@Body() data: UrlUpdateDto,
	): Promise<UrlResponseDto> {
		const url = await this.urlService.update(param.id, data);
		this.logger.log(`URL ${url.shortUrl} updated successfully`);
		return url;
	}

	@ApiOperation({ summary: 'Delete the original URL' })
	@ApiOkResponse({
		description: 'URL deleted successfully',
		type: UrlResponseDto,
	})
	@UseGuards(AuthGuard)
	@Delete(':id')
	async delete(@Param() param: IdDto): Promise<UrlResponseDto> {
		const url = await this.urlService.delete(param.id);
		this.logger.log(`URL ${url.shortUrl} deleted successfully`);
		return url;
	}
}
