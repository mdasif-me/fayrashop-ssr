import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

/**
 * - custom logger
 * - global validation pipe
 * - CORS
 * - API versioning
 * - swagger documentation
 */
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    const configService = app.get(ConfigService);
    const logger = app.get(LoggerService);

    // use custom logger
    app.useLogger(logger);

    // global prefix for all routes (e.g., /api/v1/...)
    app.setGlobalPrefix('api/v1');

    // enable CORS
    app.enableCors({
      origin: configService.get<string>('app.corsOrigin', '*'),
      credentials: true,
    });

    // global validation pipe with transformation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // swagger API documentation setup
    const swaggerConfig = new DocumentBuilder()
      .setTitle('FayraShop API')
      .setDescription('API documentation for FayraShop e-commerce platform')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Health', 'Health check and server status')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      customSiteTitle: 'FayraShop API Docs',
      customCss: '.swagger-ui .topbar { display: none }',
    });

    // get port from configuration
    const port: number = configService.get<number>('app.port', 3000);
    const host: string = configService.get<string>('app.host', 'localhost');
    const protocol: string = configService.get<string>('app.protocol', 'http');

    // start the server
    await app.listen(port, host);

    logger.log(`🚀 Application is running on: ${protocol}://${host}:${port}`);
    logger.log(`📚 API Documentation: ${protocol}://${host}:${port}/api/docs`);
    logger.log(
      `🌍 Environment: ${configService.get<string>('app.nodeEnv', 'development')}`,
    );
    logger.log(`server status: ${protocol}://${host}:${port}`);
  } catch (error) {
    console.error('error starting application:', error);
    process.exit(1);
  }
}

void bootstrap();
