import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

const defaultOptions: Partial<TypeOrmModuleOptions> = {
    synchronize: false,
    migrationsRun: true,
    autoLoadEntities: true,
    migrations: [
        "migrations/*.js"
    ],
};

const createTypeOrmOptions = (): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return makeDevelopmentOptions();
        case 'test':
            return makeTestOptions();
        case 'production':
            return makeProductionOptions();
        default:
            throw new Error(`Invalid node environment: ${process.env.NODE_ENV}`);
    }
}

const makeDevelopmentOptions = (): TypeOrmModuleOptions => {
    return {
        ...defaultOptions,
        type: 'sqlite',
        database: 'db.dev.sqlite',
    };
}

const makeProductionOptions = (): TypeOrmModuleOptions => {
    return {
        ...defaultOptions,
        type: 'sqlite',
        database: 'db.test.sqlite',
    };
}

const makeTestOptions = (): TypeOrmModuleOptions => {
    return <Partial<TypeOrmModuleOptions>>{
        ...defaultOptions,
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
}

export const dataSource = new DataSource(<DataSourceOptions>createTypeOrmOptions());