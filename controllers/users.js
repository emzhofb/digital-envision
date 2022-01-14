const moment = require('moment');
const Users = require('../models/users');

class UserController {
  async insertUser(req, res, next) {
    try {
      let { first_name, last_name, birthday_date, location } = req.body;
      birthday_date = new Date(birthday_date);
      let user = await Users.create({ first_name, last_name, birthday_date, location });

      console.log('success', user);
      res.status(201).json({
        result: user
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
}

module.exports = new UserController();
