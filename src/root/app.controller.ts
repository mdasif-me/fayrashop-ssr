import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SkipResponseInterceptor } from '../common/decorators/skip-response-interceptor.decorator';
import { Public } from '../modules/auth/decorators/public.decorator';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Public()
  @SkipResponseInterceptor()
  @Header('Content-Type', 'text/html')
  @ApiOperation({ summary: 'Server status page' })
  @ApiResponse({ status: 200, description: 'Server is running' })
  getServer(): string {
    return this.appService.getServer();
  }

  @Get('health')
  @Public()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  healthCheck() {
    return this.appService.healthCheck();
  }

  @Get('api-info')
  @Public()
  @ApiOperation({ summary: 'API information' })
  @ApiResponse({ status: 200, description: 'API details' })
  getApiInfo() {
    return this.appService.getApiInfo();
  }
}
