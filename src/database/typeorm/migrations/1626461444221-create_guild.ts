import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createGuild1626461444221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'guild',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
            },
            {
              name: 'prefix',
              type: 'varchar',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable('guild');
    }

}
