import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { INestApplication } from '@nestjs/common';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onModuleInit', () => {
    it('must call the $connect method of PrismaClient', async () => {
      const connectSpy = jest
        .spyOn(prismaService, '$connect')
        .mockResolvedValue(undefined);
      await prismaService.onModuleInit();
      expect(connectSpy).toHaveBeenCalled();
    });
  });

  describe('enabledShutDownHooks', () => {
    it('must register a listener for the beforeExit event that closes the application', async () => {
      const app = {
        close: jest.fn().mockResolvedValue(undefined),
      } as unknown as INestApplication;
      const processOnSpy = jest
        .spyOn(process, 'on')
        .mockImplementation((event, listener) => {
          if (event === 'beforeExit') {
            listener();
          }
          return process;
        });
      await prismaService.enabledShutDownHooks(app);
      expect(processOnSpy).toHaveBeenCalledWith(
        'beforeExit',
        expect.any(Function),
      );
      expect(app.close).toHaveBeenCalled();
    });

    it('must register the listener correctly without calling app.close immediately', async () => {
      const app = {
        close: jest.fn().mockResolvedValue(undefined),
      } as unknown as INestApplication;
      const mockListener = jest.fn();
      const processOnSpy = jest
        .spyOn(process, 'on')
        .mockImplementation((event, listener) => {
          if (event === 'beforeExit') {
            mockListener.mockImplementation(listener);
          }
          return process;
        });
      await prismaService.enabledShutDownHooks(app);
      expect(processOnSpy).toHaveBeenCalledWith(
        'beforeExit',
        expect.any(Function),
      );
      expect(app.close).not.toHaveBeenCalled();
      mockListener();
      expect(app.close).toHaveBeenCalled();
    });
  });
});
