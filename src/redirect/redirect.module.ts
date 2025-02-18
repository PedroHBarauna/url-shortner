import { PrismaModule } from 'src/prisma/prisma.module';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { UrlModule } from 'src/url/url.module';
import { UrlRepository } from 'src/url/url.repository';
import { Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule, UrlModule],
	controllers: [RedirectController],
	providers: [RedirectService, UrlRepository],
})
export class RedirectModule {}
