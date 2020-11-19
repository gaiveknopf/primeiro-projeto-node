import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ViewEntity,
} from 'typeorm';
import Pessoa from './Pessoa';
import PessoaFuncionarioArea from './PessoaFuncionarioArea';


@ViewEntity({
  expression: `
      SELECT "pes_codigo"
      FROM "cad_pessoa_funcionario" "post"
  `,
})
//@Entity('cad_pessoa_funcionario')
class PessoaFuncionario {
  @PrimaryGeneratedColumn({})
  pes_fun_codigo: number;

  @PrimaryColumn()
  pes_codigo: number;

  @Column()
  pes_fun_gerente_oficina: string;

  // @OneToMany(type => PessoaFuncionarioArea, area => area.funcionario, {
  //   eager: true,
  // })
  // areas: PessoaFuncionarioArea[];


}

export default PessoaFuncionario;
