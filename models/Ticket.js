const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
});

const TicketSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In progress", "Solved", "Rejected"],
      default: "Pending",
    },
    additionalInfo: {
      type: [CommentSchema], // Array of comment objects
      default: [],
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
