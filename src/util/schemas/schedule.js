const joiBase = require('joi');
const joiDate = require('@hapi/joi-date')

const joi = joiBase.extend(joiDate); // extend Joi with Joi Date

// Schema to validate the data received
const createScheduleSchema = joi.object({
  selectedDay: joi.date().format("DD/MM/YYYY").required(),
  // selectedDay: joi.string(),
  psy: joi.string().required(),
  duration: joi.number().required(),
});

module.exports = {
  createScheduleSchema,
};
