import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ViewEntity,
} from 'typeorm';
import PessoaFuncionario from './PessoaFuncionario';

@ViewEntity({
  expression: `
      SELECT *
      FROM "cad_pessoa_funcionario_area" "post"
  `,
})
//@Entity('cad_pessoa_funcionario_area')
class PessoaFuncionarioArea {
  @PrimaryGeneratedColumn()
  fun_are_codigo: string;

  @PrimaryColumn()
  pes_codigo: string;

  @Column()
  are_codigo: string;

  // @ManyToOne(type => PessoaFuncionario, func => func.areas)
  // funcionario: PessoaFuncionario;
}

export default PessoaFuncionarioArea;
