import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  /**
   * get server status HTML page
   * fallback to a simple HTML if the template file is not found
   */
  getServer(): string {
    try {
      const templatePath = join(
        process.cwd(),
        'src',
        'templates',
        'server-status.html',
      );
      return readFileSync(templatePath, 'utf-8');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Server Status</title>
          </head>
          <body>
            <div class="card">
              <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
              <h1>Server is Running!</h1>
              <p class="status">FayraShop API is Active</p>
            </div>
          </body>
        </html>
      `;
    }
  }

  /**
   * health check endpoint
   * used for monitoring the service health
   */
  healthCheck() {
    return {
      status: 'ok',
      message: 'FayraShop API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  /**
   * API information endpoint
   * provides details about the API such as version, features, and documentation link
   */
  getApiInfo() {
    return {
      name: 'FayraShop API',
      version: '1.0.0',
      description: 'Production-ready E-commerce API Starter',
      features: [
        'Global Error Handling',
        'Request/Response Logging',
        'Pagination Support',
        'MongoDB Integration',
        'Swagger Documentation',
        'Custom Logger (Winston)',
        'Validation (class-validator)',
        'Base Repository Pattern',
        'Base Service Pattern',
      ],
      documentation: '/api/docs',
      endpoints: {
        health: '/api/v1/health',
        apiInfo: '/api/v1/api-info',
        docs: '/api/docs',
      },
    };
  }
}
