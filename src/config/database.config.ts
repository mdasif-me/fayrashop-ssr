import { registerAs } from '@nestjs/config';

/**
 * enhanced database configuration supporting multiple database types
 * - MongoDB (default)
 * - PostgreSQL
 * - MySQL
 *
 * configuration is selected based on the DATABASE_TYPE environment variable.
 * additional database configurations can be uncommented and used as needed.
 */
export default registerAs('database', () => {
  const databaseType = process.env.DATABASE_TYPE || 'mongodb';

  return {
    type: databaseType,
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fayrashop',
      options: {
        retryWrites: true,
        w: 'majority',
      },
    },

    // // PostgreSQL Configuration
    // postgres: {
    //   host: process.env.POSTGRES_HOST || 'localhost',
    //   port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    //   username: process.env.POSTGRES_USER || 'postgres',
    //   password: process.env.POSTGRES_PASSWORD || 'postgres',
    //   database: process.env.POSTGRES_DATABASE || 'fayrashop',
    //   synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
    //   logging: process.env.NODE_ENV === 'development',
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   migrations: ['dist/database/migrations/*{.ts,.js}'],
    // },
    //
    // // MySQL Configuration
    // mysql: {
    //   host: process.env.MYSQL_HOST || 'localhost',
    //   port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    //   username: process.env.MYSQL_USER || 'root',
    //   password: process.env.MYSQL_PASSWORD || 'root',
    //   database: process.env.MYSQL_DATABASE || 'fayrashop',
    //   synchronize: process.env.MYSQL_SYNCHRONIZE === 'true',
    //   logging: process.env.NODE_ENV === 'development',
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   migrations: ['dist/database/migrations/*{.ts,.js}'],
    // },
  };
});
