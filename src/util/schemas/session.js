const joiBase = require('joi');
const joiDate = require('@hapi/joi-date');

const joi = joiBase.extend(joiDate);

// Schema to validate the data received
const createSessionSchema = joi.object({
  start_time: joi.date().required(),
  end_time: joi.date().required(),
  duration: joi.number().required(),
  psy: joi.string().required(),
  patient: joi.string().required(),
});

module.exports = {
  createSessionSchema,
};
