const joi = require('joi');

// Schema to validate the data received
const createTherapistSchema = joi.object({
  name: joi.string().required(),
  tags: joi.array().items(joi.string()),
  description: joi.string(),
  cedule: joi.string(),
});

module.exports = {
  createTherapistSchema,
};
