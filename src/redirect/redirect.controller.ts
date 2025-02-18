import {
	Body,
	Controller,
	Get,
	Logger,
	Param,
	Post,
	Res,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { RedirectService } from './redirect.service';
import { RedirectByIdDto } from './dto/redirect-by-id.dto';
import { RedirectByUrlDto } from './dto/redirect-by-url.dto';
@ApiTags('Redirect')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller()
export class RedirectController {
	private readonly logger = new Logger(RedirectController.name);

	constructor(private readonly redirectService: RedirectService) {}

	@ApiOperation({ summary: 'Redirect to the original URL' })
	@ApiResponse({
		status: 302,
		description: 'Redirect to the original URL',
	})
	@Get('/:shortUrlId')
	async redirect(@Param() { shortUrlId }: RedirectByIdDto, @Res() res) {
		this.logger.log(`Redirecting to original URL for ${shortUrlId}`);
		const url = await this.redirectService.redirect(shortUrlId);
		return res.redirect(302, url.originUrl);
	}

	@ApiOperation({ summary: 'Redirect to the original URL' })
	@ApiResponse({
		status: 302,
		description: 'Redirect to the original URL',
	})
	@Post()
	async redirectWithUrl(@Body() { shortUrl }: RedirectByUrlDto, @Res() res) {
		const shortUrlId = shortUrl.split('/').pop();
		this.logger.log(`Redirecting to original URL for ${shortUrlId}`);
		const url = await this.redirectService.redirect(shortUrlId);
		return res.redirect(302, url.originUrl);
	}
}
