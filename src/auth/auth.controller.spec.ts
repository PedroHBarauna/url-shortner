import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { HashService } from 'src/common/services/hash.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
	let authService: AuthService;
	let userRepository: UserRepository;
	let hashService: HashService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserRepository,
					useValue: {
						getByEmail: jest.fn(), // Mock UserRepository
					},
				},
				{
					provide: HashService,
					useValue: {
						comparePassword: jest.fn(), // Mock HashService
					},
				},
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn(), // Mock JWTService
					},
				},
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userRepository = module.get<UserRepository>(UserRepository);
		hashService = module.get<HashService>(HashService);
		jwtService = module.get<JwtService>(JwtService);
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('login', () => {
		it('should return an access token when credentials are valid', async () => {
			const mockUser = {
				id: 1,
				email: 'test@example.com',
				password: 'hashedPassword',
			};
			const mockToken = 'mocked.jwt.token';

			userRepository.getByEmail = jest.fn().mockResolvedValue(mockUser);
			hashService.comparePassword = jest.fn().mockResolvedValue(true);
			jwtService.signAsync = jest.fn().mockResolvedValue(mockToken);

			const result = await authService.login({
				email: 'test@example.com',
				password: 'password123',
			});

			expect(result).toEqual({ accessToken: mockToken });
			expect(userRepository.getByEmail).toHaveBeenCalledWith(
				'test@example.com',
			);
			expect(hashService.comparePassword).toHaveBeenCalledWith(
				'password123',
				'hashedPassword',
			);
			expect(jwtService.signAsync).toHaveBeenCalledWith({
				id: mockUser.id,
				email: mockUser.email,
			});
		});

		it('should throw UnauthorizedException if user is not found', async () => {
			userRepository.getByEmail = jest.fn().mockResolvedValue(null);

			await expect(
				authService.login({
					email: 'wrong@example.com',
					password: 'password123',
				}),
			).rejects.toThrow(UnauthorizedException);

			expect(userRepository.getByEmail).toHaveBeenCalledWith(
				'wrong@example.com',
			);
		});

		it('should throw UnauthorizedException if password is incorrect', async () => {
			const mockUser = {
				id: 1,
				email: 'test@example.com',
				password: 'hashedPassword',
			};

			userRepository.getByEmail = jest.fn().mockResolvedValue(mockUser);
			hashService.comparePassword = jest.fn().mockResolvedValue(false);

			await expect(
				authService.login({
					email: 'test@example.com',
					password: 'wrongpassword',
				}),
			).rejects.toThrow(UnauthorizedException);

			expect(hashService.comparePassword).toHaveBeenCalledWith(
				'wrongpassword',
				'hashedPassword',
			);
		});
	});
});
