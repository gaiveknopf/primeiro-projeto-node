import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('cfg_configuracao_box_areas')
class AreaConfig {
  @PrimaryColumn()
  cfg_box_are_codigo: number;

  @Column()
  cfg_box_are_nao_complemento: string;

  @Column()
  cfg_box_are_bloquear_area: string;

  @Column()
  cfg_box_are_bloquear_area_funcionario: string;

  @Column()
  cfg_box_are_permitir_funcionario_mesmo_tempo: string;

  @Column()
  cfg_box_are_permitir_fechada: string;

  @Column()
  cfg_box_are_permitir_data_diferente: string;

  @Column()
  cfg_box_are_fechar_abertura: string;

  @Column()
  cfg_box_are_abrir_e_fechar: string;

  @Column()
  cfg_box_are_bloquear_os_nao_autorizada: string;

  @Column()
  cfg_box_are_bloquear_comp_nao_autorizado: string;
}

export default AreaConfig;
