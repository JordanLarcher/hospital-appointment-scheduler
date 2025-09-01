const pool = require('../config/db.js');


const findAvailableDoctors = async (spec_id, date) => {
  const startOfDay = new Date(date).setHours(0, 0, 0, 0);
  const endOfDay = new Date(date).setHours(23, 59, 59, 999);
  const result = await pool.query(
    `SELECT d.id, d.name, d.max_appointments,
      COUNT(a.id) as booked
    FROM doctors d
    LEFT JOIN appointments a ON d.id = a.doctor_id
    AND a.appointment_time BETWEEN $1 AND $2
    WHERE d.spec_id = $3
    GROUP BY d.id 
    HAVING COUNT(a.id) < d.max_appointments`,
    [new Date(startOfDay), new Date(endOfDay), spec_id]
  );
  return result.rows[0];
};

const bookAppointment = async (userId, doctorId, appointmentTime) => {
  const result = await pool.query(
    'INSERT INTO appointments (user_id, doctor_id, appointment_time, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, doctorId, appointmentTime, 'scheduled']
  );
  return result.rows[0];
};


module.exports = { findAvailableDoctors, bookAppointment };
