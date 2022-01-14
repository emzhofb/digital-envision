const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/digital-envision', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log(err));

const userRoutes = require('./routes/users');
app.use('/', userRoutes);

const schedule = require('node-schedule');
const { sendBirthdayGreetings, reSendGreetings } = require('./cron/greetings');
const everyMinute = '* * * * *';
const everyHour = '0 * * * *';
schedule.scheduleJob(everyHour, function() {
  sendBirthdayGreetings();
});
schedule.scheduleJob(everyMinute, function() {
  reSendGreetings();
});

app.listen(port, () => {
  console.log('listening on port', port);
});
