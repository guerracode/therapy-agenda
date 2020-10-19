const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  TherapistServiceMock,
  therapistMock,
  createSchedule,
  getSchedule,
} = require('../src/util/mocks/therapistMocks');
const testServer = require('../src/util/testServer');

describe('- Therapist Route', () => {
  const route = proxyquire('../src/routes/therapist', {
    '../services/therapist': TherapistServiceMock,
  });

  const request = testServer(route);

  // Test
  describe('POST /api/therapist', () => {
    it('Should create a Therapist', async () => {
      return request
        .post('/api/therapist')
        .send(therapistMock)
        .expect(201)
        .then((response) => {
          assert.deepEqual(response.body, {
            data: therapistMock,
            message: 'Therapist Created',
          });
        });
    });
    it('Should get the Therapist Schedule', async () => {
      return request
        .get('/api/therapist/schedule')
        .send(getSchedule)
        .expect(200)
        .then((response) => {
          assert.deepEqual(response.body, {
            hours: getSchedule,
            message: 'Schedule obtained correctly',
          });
        });
    });
    it('Should create a Therapist Schedule', async () => {
      return request
        .post('/api/therapist/createSchedule')
        .send(createSchedule)
        .expect(201)
        .then((response) => {
          assert.deepEqual(response.body, {
            data: createSchedule,
            message: 'Schedule created correctly',
          });
        });
    });
  });
});
