import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user.repository';
import { CommonModule } from 'src/common/commom.module';

@Module({
	imports: [PrismaModule, CommonModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
})
export class UserModule {}
