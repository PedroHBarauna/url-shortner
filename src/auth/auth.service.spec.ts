import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/user.repository';
import { HashService } from 'src/common/services/hash.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { mockUserResponse } from 'src/common/mocks/user.mock';

describe('AuthService', () => {
	let service: AuthService;
	let jwtService: JwtService;
	let userRepository: UserRepository;
	let hashService: HashService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn(),
					},
				},
				{
					provide: UserRepository,
					useValue: {
						getByEmail: jest.fn(),
					},
				},
				{
					provide: HashService,
					useValue: {
						comparePassword: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		jwtService = module.get<JwtService>(JwtService);
		userRepository = module.get<UserRepository>(UserRepository);
		hashService = module.get<HashService>(HashService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('login', () => {
		it('should return access token if credentials are valid', async () => {
			const authLoginDto: AuthLoginDto = {
				email: 'user@urlshortner.com',
				password: 'password',
			};
			const user = {
				...mockUserResponse,
				password: 'hashedPassword',
			};
			const token = 'jwtToken';

			jest.spyOn(userRepository, 'getByEmail').mockResolvedValue(user);
			jest.spyOn(hashService, 'comparePassword').mockResolvedValue(true);
			jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

			const result = await service.login(authLoginDto);

			expect(result).toEqual({ accessToken: token });
			expect(userRepository.getByEmail).toHaveBeenCalledWith(
				authLoginDto.email,
			);
			expect(hashService.comparePassword).toHaveBeenCalledWith(
				authLoginDto.password,
				user.password,
			);
			expect(jwtService.signAsync).toHaveBeenCalledWith({
				id: user.id,
				email: user.email,
			});
		});

		it('should throw UnauthorizedException if user is not found', async () => {
			const authLoginDto: AuthLoginDto = {
				email: 'user@urlshortner.com',
				password: 'password',
			};

			jest.spyOn(userRepository, 'getByEmail').mockResolvedValue(null);

			await expect(service.login(authLoginDto)).rejects.toThrow(
				UnauthorizedException,
			);
			expect(userRepository.getByEmail).toHaveBeenCalledWith(
				authLoginDto.email,
			);
		});

		it('should throw UnauthorizedException if password does not match', async () => {
			const authLoginDto: AuthLoginDto = {
				email: 'user@urlshortner.com',
				password: 'password',
			};
			const user = {
				...mockUserResponse,
				password: 'hashedPassword',
			};

			jest.spyOn(userRepository, 'getByEmail').mockResolvedValue(user);
			jest.spyOn(hashService, 'comparePassword').mockResolvedValue(false);

			await expect(service.login(authLoginDto)).rejects.toThrow(
				UnauthorizedException,
			);
			expect(userRepository.getByEmail).toHaveBeenCalledWith(
				authLoginDto.email,
			);
			expect(hashService.comparePassword).toHaveBeenCalledWith(
				authLoginDto.password,
				user.password,
			);
		});
	});
});
