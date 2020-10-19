const express = require('express');
const boom = require('@hapi/boom');
const PatientService = require('../service/patient');
const validationHandler = require('../util/middleware/validationHandler');
const { createSessionSchema } = require('../util/schemas/session');
const { createPatientSchema } = require('../util/schemas/patient');

function patientApi(app) {
  const router = express.Router();
  app.use('/api/patient', router);

  const patientService = new PatientService();

  router.post('/', validationHandler(createPatientSchema), async (req, res, next) => {
    const data = req.body;

    try {
      const patient = await patientService.createPatient(data);
      if (!patient) {
        next(boom.notFound());
      }

      res.status(201).json({
        data: patient,
        message: 'Patient Created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/session', validationHandler(createSessionSchema), async (req, res, next) => {
    const data = req.body;

    try {
      const hours = await patientService.createSession(data);
      if (!hours) {
        next(boom.notFound());
      }

      res.status(201).json({
        data: hours,
        message: 'Session Created',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = patientApi;
