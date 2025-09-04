const { findAvailableDoctors, bookAppointment, findUserAppointments, cancelAppointment } = require('../modules/appointment.js');
const pool = require('../config/db.js');
const Joi = require('joi');

const bookSchema = Joi.object({
  specializationId: Joi.number().required(),
  date: Joi.date().required(),
  symptom: Joi.string().optional()
});


const getAppointmentsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

const cancelAppointmentSchema = Joi.object({
  appointmentId: Joi.number().integer().required(),
});


const bookAppointmentHandler = async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let { specializationId, date, symptom } = req.body;
    if (symptom) {
      const result = await pool.query(
        'SELECT specialization_id FROM symptom_mappings WHERE symptom = $1',
        [symptom]
      );

      if (result.rows[0]) specializationId = result.rows[0].specialization_id;
    }

    const doctors = await findAvailableDoctors(specializationId, date);
    if (!doctors.length) return res.status(404).json({ error: 'No Doctors Available' });


    const doctorId = doctors[0].id;
    const appointmentTime = new Date(date);
    const appointment = await bookAppointment(req.user.id, doctorId, appointmentTime);
    res.status(201).json(appointment)
  } catch (error) {
    return res.status(400).json({ error: 'Booking failed' });
  }
};

module.exports = { bookAppointmentHandler };
