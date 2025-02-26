import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/commom.module';
import { UserRepository } from 'src/user/user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashService } from 'src/common/services/hash.service';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1h' },
		}),
		UserModule,
		PrismaModule,
		CommonModule,
	],
	controllers: [AuthController],
	providers: [AuthService, HashService, UserRepository],
})
export class AuthModule {}
