const joiBase = require('joi');
const joiDate = require('@hapi/joi-date')

const joi = joiBase.extend(joiDate);

// Schema to validate the data received
const createSessionSchema = joi.object({
  start_time: joi.date(),
  end_time: joi.date(),
  duration: joi.number(),
  psy: joi.string(),
  patient: joi.string(),
});

module.exports = {
  createSessionSchema,
};
