import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
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
        <html lang="eng">
          <head>
            <title>Server Status</title>
          </head>
          <body>
            <h1>Server is running!</h1>
          </body>
        </html>
      `;
    }
  }
}
