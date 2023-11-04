import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovementsTable1698619762777 implements MigrationInterface {
  name = 'CreateMovementsTable1698619762777';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movements" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Deposito','Saque') ) NOT NULL DEFAULT ('Saque'), "status" varchar CHECK( "status" IN ('Started','Received','Done') ) NOT NULL DEFAULT ('Started'), "description" varchar(50), "amount" decimal(12,2) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "originId" integer NOT NULL, "destinyId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_3201dd37faaa7df170932aa49ea" FOREIGN KEY ("originId") REFERENCES "accounts" ("id"),  CONSTRAINT "FK_cfcb202326594f6c91e077d3989" FOREIGN KEY ("destinyId") REFERENCES "accounts" ("id"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movements"`);
  }
}
