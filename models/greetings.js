const mongoose = require('mongoose');

const GreetingSchema = new mongoose.Schema(
  {
    message: {
      type: String
    },
    user_id: {
      type: String
    },
    offset: {
      type: Number
    },
    send_date: {
      type: Date
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

module.exports = mongoose.model("greetings", GreetingSchema, "greetings"); // Export model
