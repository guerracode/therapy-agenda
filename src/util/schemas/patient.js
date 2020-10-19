const joi = require('joi');

// Schema to validate the data received
const createPatientSchema = joi.object({
  username: joi.string().required(),
  name: joi.string(),
  email: joi.string().email(),
});

module.exports = {
  createPatientSchema,
};
