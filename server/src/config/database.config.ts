import { Injectable, Type } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfig {
    public getConfig(): TypeOrmModuleOptions {
        const config: TypeOrmModuleOptions = {
            synchronize: false
        };

        switch (process.env.NODE_ENV) {
            case 'development':
                Object.assign(config, <Partial<TypeOrmModuleOptions>>{
                    type: 'sqlite',
                    database: 'db.dev.sqlite',
                    autoLoadEntities: true,
                    migrationsRun: true,
                });
                break;
            case 'test':
                Object.assign(config, <Partial<TypeOrmModuleOptions>>{
                    type: 'sqlite',
                    database: 'db.test.sqlite',
                    autoLoadEntities: true,
                    migrationsRun: true,
                });
                break;
            case 'production':
                break;
            default:
                throw new Error(`Unknown node environment: ${process.env.NODE_ENV}`);
        }

        return config;
    }
}