import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from '../auth/constants';

describe('AuthGuard', () => {
	let authGuard: AuthGuard;
	let jwtService: JwtService;

	beforeEach(() => {
		jwtService = new JwtService({ secret: jwtConstants.secret });
		authGuard = new AuthGuard(jwtService);
	});

	it('should be defined', () => {
		expect(authGuard).toBeDefined();
	});

	it('should return true if token is valid', async () => {
		const mockExecutionContext = {
			switchToHttp: jest.fn().mockReturnThis(),
			getRequest: jest.fn().mockReturnValue({
				headers: {
					authorization: 'Bearer validToken',
				},
			}),
		} as unknown as ExecutionContext;

		jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ userId: 1 });

		const result = await authGuard.canActivate(mockExecutionContext);
		expect(result).toBe(true);
	});

	it('should throw UnauthorizedException if token is not provided', async () => {
		const mockExecutionContext = {
			switchToHttp: jest.fn().mockReturnThis(),
			getRequest: jest.fn().mockReturnValue({
				headers: {},
			}),
		} as unknown as ExecutionContext;

		await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
			UnauthorizedException,
		);
	});

	it('should throw UnauthorizedException if token is invalid', async () => {
		const mockExecutionContext = {
			switchToHttp: jest.fn().mockReturnThis(),
			getRequest: jest.fn().mockReturnValue({
				headers: {
					authorization: 'Bearer invalidToken',
				},
			}),
		} as unknown as ExecutionContext;

		jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error());

		await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
			UnauthorizedException,
		);
	});
});
