import {MigrationInterface, QueryRunner} from "typeorm";

export class createBD1605783023447 implements MigrationInterface {
    name = 'createBD1605783023447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP CONSTRAINT "pessoa_pkey"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" DROP CONSTRAINT "pessoa_pkey"`);
        await queryRunner.query(`CREATE TABLE "cad_usuario" ("usu_codigo" character varying NOT NULL, "usu_nome" character varying NOT NULL, "usu_senha" character varying NOT NULL, CONSTRAINT "PK_5ccb9b7c611ebc55208434f7f90" PRIMARY KEY ("usu_codigo"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider_id" character varying NOT NULL, "date" TIME WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cfg_configuracao_box_areas" ("cfg_box_are_codigo" integer NOT NULL, "cfg_box_are_nao_complemento" character varying NOT NULL, "cfg_box_are_bloquear_area" character varying NOT NULL, "cfg_box_are_bloquear_area_funcionario" character varying NOT NULL, "cfg_box_are_permitir_funcionario_mesmo_tempo" character varying NOT NULL, "cfg_box_are_permitir_fechada" character varying NOT NULL, "cfg_box_are_permitir_data_diferente" character varying NOT NULL, "cfg_box_are_fechar_abertura" character varying NOT NULL, "cfg_box_are_abrir_e_fechar" character varying NOT NULL, "cfg_box_are_bloquear_os_nao_autorizada" character varying NOT NULL, "cfg_box_are_bloquear_comp_nao_autorizado" character varying NOT NULL, CONSTRAINT "PK_26784dd40b940e632ab567515ad" PRIMARY KEY ("cfg_box_are_codigo"))`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD "funcionarioId" integer`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD "areaId" integer`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD CONSTRAINT "UQ_ab5654a516a7c0e32de98c648bd" UNIQUE ("areaId")`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP COLUMN "pes_id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD "pes_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP COLUMN "pes_id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD "pes_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP COLUMN "are_id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD "are_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" ALTER COLUMN "pes_id" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cad_pessoa_funcionario"."pes_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" DROP COLUMN "gerente_oficina"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" ADD "gerente_oficina" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP CONSTRAINT "PK_558e0d87916c96ab30f7e5adfa6"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD CONSTRAINT "PK_558e0d87916c96ab30f7e5adfa6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP COLUMN "apelido"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD "apelido" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP COLUMN "razao_social"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD "razao_social" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "cad_usuario"("usu_codigo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD CONSTRAINT "FK_46ceabe03204c78609f1a409718" FOREIGN KEY ("funcionarioId") REFERENCES "cad_pessoa_funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD CONSTRAINT "FK_ab5654a516a7c0e32de98c648bd" FOREIGN KEY ("areaId") REFERENCES "cad_pessoa_funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP CONSTRAINT "FK_ab5654a516a7c0e32de98c648bd"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP CONSTRAINT "FK_46ceabe03204c78609f1a409718"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP COLUMN "razao_social"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD "razao_social" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP COLUMN "apelido"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD "apelido" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP CONSTRAINT "PK_558e0d87916c96ab30f7e5adfa6"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" ADD CONSTRAINT "PK_558e0d87916c96ab30f7e5adfa6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" DROP COLUMN "gerente_oficina"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" ADD "gerente_oficina" character varying(3)`);
        await queryRunner.query(`COMMENT ON COLUMN "cad_pessoa_funcionario"."pes_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" ALTER COLUMN "pes_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP COLUMN "are_id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD "are_id" integer`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP COLUMN "pes_id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD "pes_id" integer`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP COLUMN "pes_id"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD "pes_id" integer`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP CONSTRAINT "UQ_ab5654a516a7c0e32de98c648bd"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa" DROP COLUMN "areaId"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" DROP COLUMN "funcionarioId"`);
        await queryRunner.query(`DROP TABLE "cfg_configuracao_box_areas"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "cad_usuario"`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario" ADD CONSTRAINT "pessoa_pkey" FOREIGN KEY ("id", "id") REFERENCES "cad_pessoa"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cad_pessoa_funcionario_area" ADD CONSTRAINT "pessoa_pkey" FOREIGN KEY ("id", "id") REFERENCES "cad_pessoa"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
