import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { createTypeOrmOptions as create } from "./ormconfig";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    public createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return create();
    }
}
