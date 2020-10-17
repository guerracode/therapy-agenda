const express = require('express');
const boom = require('@hapi/boom');
const PatientService = require('../service/patient');
const validationHandler = require('../util/middleware/validationHandler');
const { createSessionSchema } = require('../util/schemas/session');

function patientApi(app) {
  const router = express.Router();
  app.use('/api/patient', router);

  const patientService = new PatientService();

  router.post('/session', validationHandler(createSessionSchema), async (req, res, next) => {
    const data = req.body;

    try {
      const hours = await patientService.createSession(data);
      if (!hours) {
        next(boom.notFound());
      }

      res.status(200).json({
        data: hours,
        message: 'Session Created',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = patientApi;
