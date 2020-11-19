import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity('cad_usuario')
class User {
  @PrimaryColumn()
  usu_codigo: string;

  @Column()
  usu_nome: string;

  @Column()
  usu_senha: string;
}

export default User;
