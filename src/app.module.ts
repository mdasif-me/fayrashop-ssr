import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';
import { ErrorsFilter } from './errors/errors.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AppController } from './root/app.controller';
import { AppService } from './root/app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

/**
 * - mongoDB connection
 * - global error handling
 * - request/response interceptors
 * - custom logger with Winston
 * - pagination support
 * - configuration management
 */
@Module({
  imports: [
    // global configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: '.env',
    }),

    // mongodb connection with mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),

    // add your feature modules here
    // ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    // global exception filter with custom error codes - handles all uncaught exceptions
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
    // global response interceptor - standardizes all API responses
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // global logging interceptor - logs all requests/responses
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
