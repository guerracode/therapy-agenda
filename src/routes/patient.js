const express = require('express');
const boom = require('@hapi/boom');
const PatientService = require('../service/patient');
const validationHandler = require('../util/middleware/validationHandler');
const { createSessionSchema } = require('../util/schemas/session');

function patientApi(app) {
  const router = express.Router();
  app.use('/api/patient', router);

  router.post('/session', validationHandler(createSessionSchema), async (req, res, next) => {
    try {
      res.status(200).json({
        data: req.body,
        message: "Session Created"
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = patientApi;
