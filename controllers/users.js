const moment = require('moment');
const momentTz = require('moment-timezone');
const Users = require('../models/users');
const Greetings = require('../models/greetings');

class UserController {
  async insertUser(req, res, next) {
    try {
      let { first_name, last_name, birthday_date, location } = req.body;
      let date = new Date(birthday_date);

      let user = await Users.create({ first_name, last_name, birthday_date: moment(date).utc(true), location });

      let setHour = moment(date.setHours(date.getHours() + 9)).format();
      let setTimezone = momentTz(setHour).tz(location, true).format();
      let offset = momentTz().tz(user.location).utcOffset() / 60;

      let send_date = setTimezone;
      let message = `Hey ${user.first_name} ${user.last_name}, it's your birthday`;
      let user_id = user._id;
      let greetings = await Greetings.create({ message, send_date, user_id, offset });
      
      res.status(201).json({
        result: user,
        greetings: greetings
      });
    } catch (error) {
      console.log('error', error);
      res.status(400).json({
        error: error
      });
    }
  }

  async deleteUser(req, res, next) {
    try {
      let { id } = req.params;
      let filter = { _id: id };
      
      let deleteUser = await Users.deleteOne(filter);
      console.log('success', deleteUser);

      res.status(200).json({
        result: deleteUser
      });
    } catch (error) {
      console.log('error', error);
      res.status(400).json({
        error: error
      });
    }
  }
  
  async updateUser(req, res, next) {
    try {
      let { first_name, last_name, birthday_date, location } = req.body;
      let date = new Date(birthday_date);

      let user = await Users.findOneAndUpdate(
        { _id: req.params.id },
        { first_name, last_name, birthday_date: moment(date).utc(true), location },
        { new: true }
      );

      let setHour = moment(date.setHours(date.getHours() + 9)).format();
      let setTimezone = momentTz(setHour).tz(location, true).format();
      let offset = momentTz().tz(user.location).utcOffset() / 60;

      let send_date = setTimezone;
      let message = `Hey ${user.first_name} ${user.last_name}, it's your birthday`;
      let user_id = user._id;
      let greetings = await Greetings.findOneAndUpdate(
        { user_id: req.params.id },
        { message, send_date, user_id, offset },
        { new: true }
      );
      
      res.status(200).json({
        result: user,
        greetings: greetings
      });
    } catch (error) {
      console.log('error', error);
      res.status(400).json({
        error: error
      });
    }
  }
}

module.exports = new UserController();
