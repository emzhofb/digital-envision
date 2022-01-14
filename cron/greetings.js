const Greetings = require('../models/greetings');
const Failed = require('../models/failed');
const axios = require('axios');

exports.sendBirthdayGreetings = async () => {
  try {
    console.log('cron running...');
    const today = new Date();
    const todayBirthDay = await Greetings.find({
      $where: `return this.send_date.getDate() === ${today.getDate()} 
        && this.send_date.getMonth() === ${today.getMonth()}
        && this.send_date.getHours() === ${today.getHours()}`
    });
  
    for (let data of todayBirthDay) {
      try {
        await axios({
          method: 'POST',
          url: 'https://hookb.in/NOjaQJ3yDjCe8mNN8bmb',
          data: data.message
        });
      } catch (error) {
        console.log(error);
        await Failed.create({
          message: data.message,
          user_id: data.user_id,
          offset: data.offset,
          send_date: data.send_date,
          is_sent: false
        });
        continue;
      }
    }
  } catch (error) {
    console.log('error', error);
  }
  
  return;
}

exports.reSendGreetings = async () => {
  try {
    console.log('resend the greetings...');
    const failedGreets = await Failed.find({ is_sent: false });
    for (let data of failedGreets) {
      try {
        await axios({
          method: 'POST',
          url: 'https://hookb.in/NOjaQJ3yDjCe8mNN8bmb',
          data: data.message
        });
        await Failed.findOneAndRemove({ _id: data._id });
      } catch (error) {
        continue;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return;
}
