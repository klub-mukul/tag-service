import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1683734889829 implements MigrationInterface {
  name = 'Migrations1683734889829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tag"."tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "type" text NOT NULL, "resource" character varying, "resource_id" character varying, "resource_type" character varying, "conditions" jsonb DEFAULT '[]', "is_static" boolean NOT NULL DEFAULT true, "slug" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" text NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" text NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tag"."tag"`);
  }
}
