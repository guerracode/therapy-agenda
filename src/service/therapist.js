const { ObjectID } = require('mongodb');
const mongo = require('../lib/mongo');

class TherapistService {
  constructor() {
    this.collection = 'Therapist_Agenda';
  }

  async getHours(date, id, duration) {
    try {
      const db = await mongo();
      const hours = await db
        .collection(this.collection)
        .findOne(
          { psy: ObjectID(id), 'days.day': date },
          { projection: { days: { $elemMatch: { day: date } } } }
        );

      console.log('HOURS', hours);

      return hours;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = TherapistService;
