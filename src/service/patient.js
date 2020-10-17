const { ObjectID } = require('mongodb');
const moment = require('moment');
const mongo = require('../lib/mongo');

class PatientService {
  constructor() {
    this.patient = 'Patient_Sessions';
    this.schedule = 'Therapist_Agenda';
  }

  async createSession(data) {
    const date = moment(data.start_time).format('YYYY-MM-DD');
    const hour = moment(data.start_time).format('H:00');
    let dateFinish;
    let hourFinish;
    let existsFinish;

    try {
      const db = await mongo();

      if (data.duration > 60) {
        dateFinish = moment(data.end_time).format('YYYY-MM-DD');
        hourFinish = moment(data.end_time).format('H:00');

        existsFinish = await db.collection(this.schedule).updateOne(
          {
            psy: ObjectID(data.psy),
            'days.day': dateFinish,
          },
          { $pull: { 'days.$.hours': hourFinish } }
        );
        console.log('EXISTS', existsFinish.result.nModified);
        existsFinish = existsFinish.result.nModified;
      }
      // Check if time is available and update
      let exists = await db.collection(this.schedule).updateOne(
        {
          psy: ObjectID(data.psy),
          'days.day': date,
        },
        { $pull: { 'days.$.hours': hour } }
      );

      console.log('EXISTS', exists.result.nModified);
      exists = exists.result.nModified;

      let session;
      if (exists === 1) {
        session = await db.collection(this.patient).insertOne(data);
        console.log('SESSION', session);
      } else {
        throw new Error('Session not Available');
      }

      return session.ops;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PatientService;
