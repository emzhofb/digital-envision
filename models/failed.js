const mongoose = require('mongoose');

const FailedGreetingSchema = new mongoose.Schema(
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
    },
    is_sent: {
      type: Boolean,
      default: false
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

module.exports = mongoose.model("failed-greetings", FailedGreetingSchema, "failed-greetings"); // Export model
