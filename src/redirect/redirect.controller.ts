import {
	Controller,
	Get,
	Logger,
	Param,
	Res,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RedirectService } from './redirect.service';
import { RedirectDto } from './dto/redirect.dto';
@ApiTags('Redirect')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller()
export class RedirectController {
	private readonly logger = new Logger(RedirectController.name);

	constructor(private readonly redirectService: RedirectService) {}

	@ApiOperation({ summary: 'Redirect to the original URL' })
	@Get('/:shortUrlId')
	async redirect(@Param() { shortUrlId }: RedirectDto, @Res() res) {
		this.logger.log(`Redirecting to original URL for ${shortUrlId}`);
		const url = await this.redirectService.redirect(shortUrlId);
		return res.redirect(url.originUrl);
	}
}
