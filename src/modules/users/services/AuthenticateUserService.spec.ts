import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let AuthenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    AuthenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    const reponse = await AuthenticateUser.execute({
      email: 'john@doe.com',
      password: '1234',
    });

    expect(reponse).toHaveProperty('token');
    expect(reponse.user).toEqual(user);
  });

  it('should be able to authenticate with non existing user', async () => {
    expect(
      AuthenticateUser.execute({
        email: 'john@doe.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    expect(
      AuthenticateUser.execute({
        email: 'john@doe.com',
        password: '12344',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
