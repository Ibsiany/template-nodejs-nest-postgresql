import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsUserAndCategory1697133487854
  implements MigrationInterface
{
  name = 'CreateRelationsUserAndCategory1697133487854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Category" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Category" ADD CONSTRAINT "FK_b0599b55851d01efb86c7955cf2" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Category" DROP CONSTRAINT "FK_b0599b55851d01efb86c7955cf2"`,
    );
    await queryRunner.query(`ALTER TABLE "Category" DROP COLUMN "user_id"`);
  }
}
