import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('server')
class Server {
  @PrimaryColumn()
  guild_id: string;

  @Column()
  prefix: string;
}

export default Server;
