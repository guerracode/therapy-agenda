const express = require('express');
const cors = require('cors');

const app = express();

const therapist = require('./src/routes/therapist');
const patient = require('./src/routes/patient');
const config = require('./src/config/index');
const { logErrors, wrapErrors, errorHandler } = require('./src/util/middleware/errorHandler');

const { port } = config.general;

app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/docs', express.static('public'));

// routes
therapist(app);
patient(app);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
