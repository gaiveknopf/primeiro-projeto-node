import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let CreateAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await CreateAppointment.execute({
      date: new Date(),
      user_id: '123',
      provider_id: '12',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await CreateAppointment.execute({
      date: appointmentDate,
      user_id: '123',
      provider_id: '12',
    });

    expect(
      CreateAppointment.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
