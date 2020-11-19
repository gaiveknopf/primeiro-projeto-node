import { Router } from 'express';
import { getRepository } from 'typeorm';
import PessoaFuncionario from '../models/PessoaFuncionario';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Pessoa from '../models/Pessoa';
import PessoaFuncionarioArea from '../models/PessoaFuncionarioArea';

const funcionarioRouter = Router();

funcionarioRouter.use(ensureAuthenticated);

funcionarioRouter.get('/', async (request, response) => {
  //  const funcionarioRepository = getRepository(PessoaFuncionario);
  //  const funcionario = await funcionarioRepository.find();

  let funcfunc = [];

  const pesCod = 155;

  const funcionario = await getRepository(PessoaFuncionario).find()
    // .createQueryBuilder('f')
    // .leftJoin('cad_pessoa', 'p', 'p.pes_codigo = f.pes_codigo')
    // .addSelect('p.pes_razao_social')
    // .leftJoinAndSelect(
    //   PessoaFuncionarioArea,
    //   'a',
    //   `a.pes_codigo =  "f"."pes_codigo"`,
    // )
    // .where(`p.pes_codigo = ${pesCod}`)
    // .getSql();

  console.log(funcionario);
  // const funcionario = await getRepository(PessoaFuncionario)
  //   .createQueryBuilder('p')
  //   .select(['p.pes_codigo', 'p.pes_fun_codigo', 'a.pes_razao_social'])
  //   .leftJoin('cad_pessoa', 'a', 'a.pes_codigo = p.pes_codigo')
  //   .where(`p.pes_codigo = ${pesCod}`)
  //   .getOne();

  // const areas = await getRepository(PessoaFuncionarioArea)
  //   .createQueryBuilder('a')
  //   .select(['a.are_codigo'])
  //   .where(`a.pes_codigo = ${pesCod}`)
  //   .getMany();

  return response.json(funcionario);
});

export default funcionarioRouter;
