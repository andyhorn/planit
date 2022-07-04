import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'client')
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) =>
        databaseConfig.getConfig()
    }),
    UsersModule,
    RoomsModule,
    MessagesModule,
  ],
})
export class AppModule { }
