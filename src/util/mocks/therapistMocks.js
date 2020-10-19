/* eslint-disable class-methods-use-this */
const therapistMock = {
  name: 'Lauraisabel Ortíz Gómez',
  tags: [
    'ataques de pánico',
    'depresión',
    'manejo de estrés',
    'orientación sexual',
    'problemas de relación',
  ],
  description:
    'Mi objetivo es establecer una dinámica que te permita encontrar o desarrollar recursos emocionales para hacer frente a cuestiones complejas de la vida, así como apoyarte a (re)descubrir tu deseo y apuntar a ello.',
  cedule: '8387065',
};

const createSchedule = {
  psy: '5f8d3dd25418f6bd7741a03e',
  date: '19/10/2020',
  workingPlan: {
    start: '07:00',
    end: '20:00',
  },
  breaks: [
    {
      start: '15:15',
      end: '16:15',
    },
    {
      start: '18:15',
      end: '19:15',
    },
  ],
};

const getSchedule = {
  selectedDay: '19/10/2020',
  psy: '5f8d3dd25418f6bd7741a03e',
  duration: 50,
};

class TherapistServiceMock {
  createTherapist() {
    return Promise.resolve(therapistMock);
  }

  getHours() {
    return Promise.resolve(getSchedule);
  }

  createSchedule() {
    return Promise.resolve(createSchedule);
  }
}

module.exports = {
  TherapistServiceMock,
  therapistMock,
  createSchedule,
  getSchedule,
};
