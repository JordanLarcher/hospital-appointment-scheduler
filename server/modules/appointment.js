const pool = require('../config/db.js');


const findUserAppointments = async (userId, role) => {
  if (role === 'admin') {
    const result = await pool.query(
      `SELECT a.*, d.name as doctor_name, s.name as specialization
      FROM appointments a 
      JOIN doctors d ON a.doctor_id = d.doctor_id
      JOIN specializations s ON d.spec_id = s.spec_id
      WHERE a.status = 'scheduled'
      ORDER BY a.appointment_time`
    );
    return result.rows;
  }

  const result = await pool.query(
    `SELECT a.*, d.name as doctor_name, s.name as specialization
    FROM appointments a
    JOIN doctors d ON a.appointment_id = d.doctor_id
    JOIN specializations s ON d.spec_id = s.spec_id
    WHERE a.patient_id = $1 AND a.status = 'scheduled'
    ORDER BY a.appointment_time`,
    [userId]
  );

  return result.rows;
};


const cancelAppointment = async (userId, appointmentId, role) => {
  const query = role === 'admin'
    ? 'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *'
    : 'UPDATE appointments SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *'
  const params = role === 'admin' ? ['cancelled', appointmentId] : ['cancelled', appointmentId, userId];
  const results = await pool.query(query, params);
  if (!results.rows[0]) throw new Error('Appointment not found or unauthorized');
  return results.rows[0];
}

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


module.exports = { findAvailableDoctors, bookAppointment, cancelAppointment, findUserAppointments };
