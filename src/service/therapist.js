const mongo = require('../lib/mongo');

class TherapistService {
  constructor() {
    this.connection = mongo();
  }
}

module.exports = TherapistService;
