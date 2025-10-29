import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * global database module that handles multiple database types
 */
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('database.type');
        if (dbType !== 'mongodb') {
          return { uri: '' };
        }
        return {
          uri: configService.get<string>('database.mongodb.uri'),
          ...(configService.get<object>('database.mongodb.options') || {}),
        };
      },
      inject: [ConfigService],
    }),

    // TypeORM connection for SQL databases (conditional)
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService): any => {
    //     const dbType = configService.get<string>('database.type');
    //
    //     if (dbType === 'postgres') {
    //       return {
    //         type: 'postgres' as const,
    //         ...(configService.get('database.postgres') || {}),
    //       };
    //     } else if (dbType === 'mysql') {
    //       return {
    //         type: 'mysql' as const,
    //         ...(configService.get('database.mysql') || {}),
    //       };
    //     }
    //
    //     // Return minimal dummy config if not using SQL
    //     return {
    //       type: 'postgres' as const,
    //       host: 'localhost',
    //       port: 5432,
    //       database: 'dummy',
    //       synchronize: false,
    //       autoLoadEntities: false,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  exports: [MongooseModule, TypeOrmModule],
})
export class DatabaseModule {}
