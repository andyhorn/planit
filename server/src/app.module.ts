import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database.config';
import { User } from './users/models/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'client')
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) =>
        databaseConfig.getConfig([
          User
        ])
    }),
    UsersModule,
  ],
})
export class AppModule { }
