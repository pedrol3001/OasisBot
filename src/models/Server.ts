import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('servers')
class Server {
  @PrimaryColumn()
  guild_id: string;

  @Column()
  prefix: string;
}

export default Server;
