import { Injectable, Type } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfig {
    public getConfig(entities: Type[]): TypeOrmModuleOptions {
        const config: TypeOrmModuleOptions = {
            synchronize: false
        };

        switch (process.env.NODE_ENV) {
            case 'development':
                Object.assign(config, <Partial<TypeOrmModuleOptions>>{
                    type: 'sqlite',
                    database: 'db.dev.sqlite',
                    entities,
                    migrationsRun: true,
                });
                break;
            case 'test':
                Object.assign(config, <Partial<TypeOrmModuleOptions>>{
                    type: 'sqlite',
                    database: 'db.test.sqlite',
                    entities,
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