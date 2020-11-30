import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let CreateAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await CreateAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123',
      provider_id: '12',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    CreateAppointment.execute({
      date: appointmentDate,
      user_id: '123',
      provider_id: '12',
    });

    await expect(
      CreateAppointment.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '1234',
        provider_id: '12134',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '1234',
        provider_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        user_id: '1234',
        provider_id: '12',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 10, 18),
        user_id: '1234',
        provider_id: '12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
