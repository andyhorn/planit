import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { dataSource } from "./ormconfig";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    public createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return dataSource.options;
    }
}
