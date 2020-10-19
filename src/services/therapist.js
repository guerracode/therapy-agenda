const { ObjectID } = require('mongodb');
const moment = require('moment');
const mongo = require('../lib/mongo');
const { timeController, timeBreakdown } = require('../lib/timeController');

class TherapistService {
  constructor() {
    this.therapistAgenda = 'Therapist_Agenda';
    this.therapist = 'Therapist';
  }

  async createTherapist(data) {
    try {
      const db = await mongo();
      const therapist = await db.collection(this.therapist).insertOne(data);
      return therapist.ops;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get therapist available hours
  async getHours(date, id, duration = undefined) {
    try {
      const db = await mongo();

      // Find the hours available
      let hours = await db
        .collection(this.therapistAgenda)
        .findOne(
          { psy: ObjectID(id), 'days.day': date },
          { projection: { days: { $elemMatch: { day: date } } } }
        );

      // If hours requested are > than 60 then filter the hours available to
      // return only consequent sessions.
      if (duration && duration > 60) {
        hours = timeController(hours.days[0].hours);
      } else {
        hours = hours.days[0].hours;
      }

      return hours;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create new Therapist Schedule
  async createSchedule(data) {
    // Filter data received to manipulate them.
    const { psy, date, dayOfWeek, workingPlan, breaks } = data;
    const year = moment(date, 'DD/MM/YYYY').format('YYYY');
    const month = moment(date, 'DD/MM/YYYY').format('MMMM');
    const day = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let weekDay;

    if (!dayOfWeek) {
      weekDay = moment(date, 'DD/MM/YYYY').format('dddd');
    } else {
      weekDay = dayOfWeek;
    }

    // Create Schedule schema to store always the same data in the DB
    const schema = {
      psy: ObjectID(psy),
      year,
      month,
      days: [
        {
          day,
          dayOfWeek: weekDay,
          workingPlan,
          hours: timeBreakdown(workingPlan.start, workingPlan.end, breaks),
          breaks,
        },
      ],
    };

    try {
      const db = await mongo();

      // Check if Schedule of that month and year already exists
      const find = await db
        .collection(this.therapistAgenda)
        .findOne({ psy: schema.psy, year: schema.year, month: schema.month });

      // If schedule doesn't exists, create the document for all the month
      // If schedule exists only add the schedule for the day
      if (!find) {
        await db.collection(this.therapistAgenda).insert(schema);
      } else {
        await db
          .collection(this.therapistAgenda)
          .updateOne(
            { psy: schema.psy, year: schema.year, month: schema.month },
            { $addToSet: { days: schema.days[0] } }
          );
      }

      // Return Schedule
      return schema;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = TherapistService;
