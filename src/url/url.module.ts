import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';
import { CommonModule } from 'src/common/commom.module';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';

@Module({
	imports: [PrismaModule, CommonModule, UserModule],
	controllers: [UrlController],
	providers: [UrlService, UrlRepository, UserRepository],
})
export class UrlModule {}
