import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { LoggerService } from './logger/logger.service';
import { ErrorsFilter } from './errors/errors.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { UploadModule } from './modules/upload/upload.module';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './root/app.controller';
import { AppService } from './root/app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import cloudinaryConfig from './config/cloudinary.config';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

/**
 * Main application module
 *
 * Features:
 * - Multi-database support (MongoDB, PostgreSQL, MySQL)
 * - JWT authentication with role-based access control
 * - Cloudinary file upload integration
 * - Global error handling with custom error codes
 * - Request/response interceptors
 * - Rate limiting/throttling
 * - Health checks
 * - API documentation with Swagger
 * - Custom logger with Winston
 * - Pagination support
 */
@Module({
  imports: [
    // global configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, cloudinaryConfig],
      envFilePath: '.env',
    }),

    // rate limiting / throttling
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 10, // 10 requests per ttl
      },
    ]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    UploadModule,
    HealthModule,
  ],
  controllers: [AppController],

  /**
   * global providers
   * - AppService: application-wide services
   * - LoggerService: custom logger using Winston
   * - ErrorsFilter: global error handling filter
   * - JwtAuthGuard: global JWT authentication guard
   * - ThrottlerGuard: global rate limiting guard
   * - ResponseInterceptor: global response formatting interceptor
   * - LoggingInterceptor: global request/response logging interceptor
   */
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
