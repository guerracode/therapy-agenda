const express = require('express');
const boom = require('@hapi/boom');
const TherapistService = require('../service/therapist');
const validationHandler = require('../util/middleware/validationHandler');
const { createScheduleSchema } = require('../util/schemas/schedule');

function therapistApi(app) {
  const router = express.Router();
  app.use('/api/therapist', router);

  router.get('/schedule', validationHandler(createScheduleSchema), async (req, res, next) => {
    try {
      res.status(200).json({
        data: req.body,
        message: 'Schedule obtained correctly',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = therapistApi;
