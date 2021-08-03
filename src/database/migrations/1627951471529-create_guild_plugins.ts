import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createGuildPlugins1627951471529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'guild_plugin',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
            },
            {
              name: 'guild_id',
              type: 'varchar',
            },
            {
              name: 'plugin_id',
              type: 'varchar',
            },
          ],

        }),
      );

      await queryRunner.createForeignKey(
        "guild_plugin",
        new TableForeignKey({
          name: "FKGuildPlugin",
          referencedTableName: "guild",
          referencedColumnNames: ["id"],
          columnNames: ["guild_id"],
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        })
      );

      await queryRunner.createForeignKey(
        "guild_plugin",
        new TableForeignKey({
          name: "FKPluginGuild",
          referencedTableName: "plugin",
          referencedColumnNames: ["id"],
          columnNames: ["plugin_id"],
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        })
      );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropForeignKey(
        "guild_plugin",
        "FKPluginGuild"
      );

      await queryRunner.dropForeignKey(
        "guild_plugin",
        "FKGuildPlugin"
      );

      queryRunner.dropTable('guild_plugin');
    }

}
