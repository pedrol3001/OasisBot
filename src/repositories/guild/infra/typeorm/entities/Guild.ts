import { Plugin } from '@plugin/infra/typeorm/entities/Plugin';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('guild')
class Guild {
  @PrimaryColumn()
  id: string;

  @Column()
  prefix?: string;

  // subject entity
  @ManyToMany(() => Plugin, (plugin) => plugin.guilds)
  @JoinTable({
    name: 'guild_plugin',
    joinColumns: [{ name: 'guild_id' }],
    inverseJoinColumns: [{ name: 'plugin_id' }],
  })
  plugins: Plugin[];

  constructor(id?: string) {
    this.id = id || 'null';
    if (!this.prefix) {
      this.prefix = process.env.PREFIX || '!';
    }
  }
}

export { Guild };
