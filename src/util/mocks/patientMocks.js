/* eslint-disable class-methods-use-this */
const patientMock = {
  start_time: '2020-10-19T09:00:00-05:00',
  end_time: '2020-10-19T09:50:00-05:00',
  duration: 50,
  psy: '5f8d3dd25418f6bd7741a03e',
  patient: '5f8d3c0023520ebbccd4fb37',
};

const createPatientMock = {
  username: 'mario',
  name: 'Mario Perez',
  email: 'mario@gmail.com',
};

class PatientServiceMock {
  createSession() {
    return Promise.resolve(patientMock);
  }

  createPatient() {
    return Promise.resolve(createPatientMock);
  }
}

module.exports = {
  PatientServiceMock,
  patientMock,
  createPatientMock,
};
