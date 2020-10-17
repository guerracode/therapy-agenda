const mongo = require('../lib/mongo');

class PatientService {
  constructor() {
    this.connection = mongo();
  }
}

module.exports = PatientService;
