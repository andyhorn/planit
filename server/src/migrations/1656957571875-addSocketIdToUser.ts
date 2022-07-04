import { MigrationInterface, QueryRunner } from "typeorm";

export class addSocketIdToUser1656957571875 implements MigrationInterface {
    name = 'addSocketIdToUser1656957571875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "roomId" integer, "socketId" varchar, CONSTRAINT "FK_9a5b6e98e76999b2c6778a30eec" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "firstName", "lastName", "email", "roomId") SELECT "id", "firstName", "lastName", "email", "roomId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "roomId" integer, CONSTRAINT "FK_9a5b6e98e76999b2c6778a30eec" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "email", "roomId") SELECT "id", "firstName", "lastName", "email", "roomId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
