import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await CreateUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with duplicated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await CreateUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    expect(
      CreateUser.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
