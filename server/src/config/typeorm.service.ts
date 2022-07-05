import { Injectable, Logger } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { createTypeOrmOptions as create } from "./ormconfig";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private logger: Logger = new Logger('TypeOrmConfigService');

    public createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        this.logger.verbose('Retrieving TypeORM configuration');
        return create();
    }
}
