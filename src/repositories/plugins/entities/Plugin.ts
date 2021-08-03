import {v4 as uuidv4} from 'uuid';
import { Column, Entity, ManyToMany, PrimaryColumn, Unique } from 'typeorm';
import { Guild } from '@repositories/guilds/entities/Guild';

@Entity('plugin')
@Unique(['name'])
class Plugin {

  @PrimaryColumn()
  id: string;

  @Column()
  name?: string;

  @ManyToMany(() => Guild, guild => guild.plugins)
  guilds: Promise<Guild[]>;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}



export {Plugin};
