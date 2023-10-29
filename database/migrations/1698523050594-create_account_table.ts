import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTable1698523050594 implements MigrationInterface {
  name = 'CreateAccountTable1698523050594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "type" varchar CHECK( "type" IN ('corrente','poupança') ) NOT NULL DEFAULT ('corrente'), "balance" decimal(12,2) NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
