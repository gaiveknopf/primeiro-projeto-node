import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import PessoaFuncionario from './PessoaFuncionario';

@Entity('cad_pessoa')
class Pessoa {
  @PrimaryColumn()
  pes_codigo: string;

  @Column()
  pes_razao_social: string;

  @Column()
  pes_fantasia: string;

  @OneToOne(type => PessoaFuncionario, pessoa => Pessoa)
  area: PessoaFuncionario;
}

export default Pessoa;
