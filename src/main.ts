import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function createApp() {
	const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
		cors: true,
		logger: ['error', 'warn', 'log', 'debug', 'verbose'],
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('API')
		.setDescription('API description')
		.setVersion('1.0')
		.addTag('API')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			'default',
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);

	return app;
}

async function bootstrap() {
	const app = await createApp();
	const port = process.env.PORT || 3000;
	await app.listen(port);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
