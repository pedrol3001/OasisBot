import { v4 as uuidv4 } from 'uuid';
import { Guild } from '@repositories/guild/infra/typeorm/entities/Guild';
import { Column, Entity, ManyToMany, PrimaryColumn, Unique } from 'typeorm';

@Entity('plugin')
@Unique(['name'])
class Plugin {
  @PrimaryColumn()
  id: string;

  @Column()
  name?: string;

  @ManyToMany(() => Guild, (guild) => guild.plugins)
  guilds: Promise<Guild[]>;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Plugin };
