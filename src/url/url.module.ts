import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';
import { CommonModule } from 'src/common/commom.module';

@Module({
	imports: [PrismaModule, CommonModule],
	controllers: [UrlController],
	providers: [UrlService, UrlRepository],
})
export class UrlModule {}
