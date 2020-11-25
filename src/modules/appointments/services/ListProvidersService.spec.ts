import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Petter',
      email: 'john@petter.com',
      password: '1234',
    });

    const loggerUser = await fakeUsersRepository.create({
      name: 'John Logged',
      email: 'john@logged.com',
      password: '1234',
    });

    const providers = await listProviders.execute({
      user_id: loggerUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
