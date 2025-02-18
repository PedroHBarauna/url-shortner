import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
	imports: [
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		RedirectModule,
		AuthModule,
		UserModule,
		UrlModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
