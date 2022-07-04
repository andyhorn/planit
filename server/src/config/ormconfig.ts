import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

const defaultOptions: Partial<TypeOrmModuleOptions> = {
    synchronize: false,
    migrations: ['dist/migrations/**.js'],
    migrationsRun: true
};

export const createTypeOrmOptions = (): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => {
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
        entities: ['**/*.entity.js'],
    };
}

const makeProductionOptions = (): TypeOrmModuleOptions => {
    return {
        ...defaultOptions,
        type: 'sqlite',
        database: 'db.test.sqlite',
        entities: ['**/*.entity.ts'],
    };
}

const makeTestOptions = (): TypeOrmModuleOptions => {
    return <Partial<TypeOrmModuleOptions>>{
        ...defaultOptions,
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        entities: ['**/*.entity.js'],
    };
}

export const dataSource = new DataSource(<DataSourceOptions>createTypeOrmOptions());