import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1696815018246 implements MigrationInterface {
  name = 'CreateTables1696815018246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo" character varying, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_f8d646c98446cc0ef6872e960cc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "CardCategory" ("card_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_c779eba9a60a88c1f1e98df9452" PRIMARY KEY ("card_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0ee83a5dddfb581a124180ef1d" ON "CardCategory" ("card_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e675a079ca975585da4dc22f5b" ON "CardCategory" ("category_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Cards" ADD CONSTRAINT "FK_be3144c782c5a87f7f3307c5fbe" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "CardCategory" ADD CONSTRAINT "FK_0ee83a5dddfb581a124180ef1da" FOREIGN KEY ("card_id") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "CardCategory" ADD CONSTRAINT "FK_e675a079ca975585da4dc22f5b9" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "CardCategory" DROP CONSTRAINT "FK_e675a079ca975585da4dc22f5b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "CardCategory" DROP CONSTRAINT "FK_0ee83a5dddfb581a124180ef1da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Cards" DROP CONSTRAINT "FK_be3144c782c5a87f7f3307c5fbe"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e675a079ca975585da4dc22f5b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0ee83a5dddfb581a124180ef1d"`,
    );
    await queryRunner.query(`DROP TABLE "CardCategory"`);
    await queryRunner.query(`DROP TABLE "Cards"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "Category"`);
  }
}
