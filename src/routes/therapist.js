const express = require('express');
const boom = require('@hapi/boom');
const moment = require('moment');
const TherapistService = require('../services/therapist');
const validationHandler = require('../util/middleware/validationHandler');
const { createScheduleSchema } = require('../util/schemas/schedule');
const { createCreateScheduleSchema } = require('../util/schemas/createSchedule');
const { createTherapistSchema } = require('../util/schemas/therapist');

function therapistApi(app) {
  const router = express.Router();
  app.use('/api/therapist', router);

  const therapistService = new TherapistService();

  router.post('/', validationHandler(createTherapistSchema), async (req, res, next) => {
    const data = req.body;

    try {
      const therapist = await therapistService.createTherapist(data);
      if (!therapist) {
        next(boom.notFound());
      }

      res.status(201).json({
        data: therapist,
        message: 'Therapist Created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/schedule', validationHandler(createScheduleSchema), async (req, res, next) => {
    const { selectedDay, psy, duration } = req.body;

    const date = moment(selectedDay, 'DD/MM/YYYY').format('YYYY-MM-DD');

    try {
      const hours = await therapistService.getHours(date, psy, duration);
      if (!hours) {
        next(boom.notFound());
      }

      res.status(200).json({
        hours,
        message: 'Schedule obtained correctly',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/createSchedule',
    validationHandler(createCreateScheduleSchema),
    async (req, res, next) => {
      const data = req.body;

      try {
        const schedule = await therapistService.createSchedule(data);
        if (!schedule) {
          next(boom.notFound());
        }

        res.status(201).json({
          data: schedule,
          message: 'Schedule created correctly',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = therapistApi;
