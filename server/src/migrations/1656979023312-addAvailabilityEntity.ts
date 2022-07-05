import { MigrationInterface, QueryRunner } from "typeorm";

export class addAvailabilityEntity1656979023312 implements MigrationInterface {
    name = 'addAvailabilityEntity1656979023312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "availability" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_availability" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_42a42b693f05f17e56d1d9ba93f" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_availability"("id", "date", "userId") SELECT "id", "date", "userId" FROM "availability"`);
        await queryRunner.query(`DROP TABLE "availability"`);
        await queryRunner.query(`ALTER TABLE "temporary_availability" RENAME TO "availability"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availability" RENAME TO "temporary_availability"`);
        await queryRunner.query(`CREATE TABLE "availability" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "availability"("id", "date", "userId") SELECT "id", "date", "userId" FROM "temporary_availability"`);
        await queryRunner.query(`DROP TABLE "temporary_availability"`);
        await queryRunner.query(`DROP TABLE "availability"`);
    }

}
