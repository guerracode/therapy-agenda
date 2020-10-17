const joiBase = require('joi');
const joiDate = require('@hapi/joi-date')

const joi = joiBase.extend(joiDate); // extend Joi with Joi Date

// Schema to validate the data received
const createScheduleSchema = joi.object({
  selectedDay: joi.date().format("DD/MM/YYYY"),
  psy: joi.string(),
  duration: joi.number(),
});

module.exports = {
  createScheduleSchema,
};
