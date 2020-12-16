import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createServerTable1607362133982
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servers',
        columns: [
          {
            name: 'guild_id',
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
    await queryRunner.dropTable('servers');
  }
}
