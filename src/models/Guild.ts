import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('guild')
class Guild {
  @PrimaryColumn()
  guild_id: string;

  @Column()
  prefix: string;
}

export default Guild;
