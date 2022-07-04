import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { ConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database.config';
import { User } from './users/models/user.entity';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { Room } from './rooms/models/room.entity';
import { Message } from './messages/models/message.entity';

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
          User,
          Room,
          Message
        ])
    }),
    UsersModule,
    RoomsModule,
    MessagesModule,
  ],
})
export class AppModule { }
