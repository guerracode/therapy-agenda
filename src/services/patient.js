const { ObjectID } = require('mongodb');
// const moment = require('moment');
const moment = require('moment-timezone');
const mongo = require('../lib/mongo');

class PatientService {
  constructor() {
    this.patientSessions = 'Patient_Sessions';
    this.schedule = 'Therapist_Agenda';
    this.patient = 'Patient';
  }

  // Update Session Hours to remove the hours that are now occupied
  async updateSession(id, date, hour) {
    const db = await mongo();

    let exists = await db.collection(this.schedule).updateOne(
      {
        psy: ObjectID(id),
        'days.day': date,
      },
      { $pull: { 'days.$.hours': hour } }
    );

    exists = exists.result.nModified;
    return exists;
  }

  // Create a new Patient Session
  async createSession(data) {
    // Format date and hours to manipulate them
    const date = moment(data.start_time).format('YYYY-MM-DD');
    const hour = moment(data.start_time).tz('America/Mexico_City').format('H:00');
    let dateFinish;
    let hourFinish;

    try {
      const db = await mongo();

      // If duration is > 60 to update the second time two
      if (data.duration > 60) {
        dateFinish = moment(data.end_time).format('YYYY-MM-DD');
        hourFinish = moment(data.end_time).tz('America/Mexico_City').format('H:00');

        const existFinish = await this.updateSession(data.psy, dateFinish, hourFinish);
        if (existFinish !== 1) {
          throw new Error('Sessions not Available');
        }
      }

      // Check if time is available and update
      const exists = await this.updateSession(data.psy, date, hour);

      let session;
      if (exists === 1) {
        session = await db.collection(this.patientSessions).insertOne(data);
      } else {
        throw new Error('Session not Available');
      }

      // Return session created
      return session.ops;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createPatient(data) {
    try {
      const db = await mongo();
      const patient = await db.collection(this.patient).insertOne(data);
      return patient.ops;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PatientService;
