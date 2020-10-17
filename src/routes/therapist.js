const express = require('express');
const boom = require('@hapi/boom');
const moment = require('moment');
const TherapistService = require('../service/therapist');
const validationHandler = require('../util/middleware/validationHandler');
const { createScheduleSchema } = require('../util/schemas/schedule');

function therapistApi(app) {
  const router = express.Router();
  app.use('/api/therapist', router);

  const therapistService = new TherapistService();
  // TODO Check if duration is > 60 and remove some times
  router.get('/schedule', validationHandler(createScheduleSchema), async (req, res, next) => {
    const { selectedDay, psy, duration } = req.body;

    const date = moment(selectedDay, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log('date', date);
    const date2 = moment().format('YYYY-MM-DD');
    console.log('date2', date2);

    try {
      const hours = await therapistService.getHours(date, psy);
      if (!hours) {
        next(boom.notFound());
      }

      res.status(200).json({
        hours: hours.days[0].hours,
        message: 'Schedule obtained correctly',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = therapistApi;
