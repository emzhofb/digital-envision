const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    birthday_date: {
      type: Date
    },
    location: {
      type: String
    }
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  }
);

module.exports = mongoose.model("users", UserSchema, "users"); // Export model
