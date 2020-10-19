const joiBase = require('joi');
const joiDate = require('@hapi/joi-date');

const joi = joiBase.extend(joiDate); // extend Joi with Joi Date

// Schema to validate the data received
const createCreateScheduleSchema = joi.object({
  psy: joi.string().required(),
  date: joi.date().format('DD/MM/YYYY').required(),
  dayOfWeek: joi.string(),
  workingPlan: joi
    .object({
      start: joi.string(),
      end: joi.string(),
    })
    .required(),
  breaks: joi.array().items({
    start: joi.string(),
    end: joi.string(),
  }),
});

module.exports = {
  createCreateScheduleSchema,
};
