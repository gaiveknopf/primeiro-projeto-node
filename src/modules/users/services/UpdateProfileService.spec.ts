import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Streetbook',
      email: 'john@street.com',
    });

    expect(updatedUser.name).toBe('John Streetbook');
    expect(updatedUser.email).toBe('john@street.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    const user = await fakeUsersRepository.create({
      name: 'Gaive Derek',
      email: 'sadman@mylife.com',
      password: '1234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gaive Derek',
        email: 'john@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Streetbook',
      email: 'john@street.com',
      old_password: '1234',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Streetbook',
        email: 'john@street.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Streetbook',
        email: 'john@street.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Teste name',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
