const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  PatientServiceMock,
  patientMock,
  createPatientMock,
} = require('../src/util/mocks/patientMocks');
const testServer = require('../src/util/testServer');

describe('- Patient Route', () => {
  const route = proxyquire('../src/routes/patient', {
    '../services/patient': PatientServiceMock,
  });

  const request = testServer(route);

  // Test
  describe('POST /api/patient', () => {
    it('Should create a Session', async () => {
      return request
        .post('/api/patient/session')
        .send(patientMock)
        .expect(201)
        .then((response) => {
          assert.deepEqual(response.body, {
            data: patientMock,
            message: 'Session Created',
          });
        });
    });
    it('Should create a patient', async () => {
      return request
        .post('/api/patient/')
        .send(createPatientMock)
        .expect(201)
        .then((response) => {
          assert.deepEqual(response.body, {
            data: createPatientMock,
            message: 'Patient Created',
          });
        });
    });
  });
});
