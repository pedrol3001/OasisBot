import Discord from 'discord.js';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('guild')
class Guild {

  @PrimaryColumn()
  id: string;

  @Column()
  prefix?: string;

  constructor(id?: string) {
    this.id = id || null;
    if (!this.prefix) {
      this.prefix = process.env.PREFIX || '!';
    }
  }
}



export {Guild};
