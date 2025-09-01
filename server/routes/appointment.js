const express = require('express');
const router = express.Router();
const { authenticate, restrictTo } = require('../middleware/auth.js');
const { bookAppointmentHandler } = require('../controllers/appointmentController.js');

router.post('/book', authenticate, restrictTo(['patient']), bookAppointmentHandler);
module.exports = router;
