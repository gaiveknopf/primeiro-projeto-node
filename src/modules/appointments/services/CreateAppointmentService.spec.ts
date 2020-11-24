import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '12',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '12',
    });

    expect(
      CreateAppointment.execute({
        date: appointmentDate,
        provider_id: '12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
