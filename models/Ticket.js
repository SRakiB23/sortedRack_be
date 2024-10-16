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
  userName: {
    type: String,
    required: true,
  }
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
      enum: ["Pending", "Open", "In progress", "Closed", "Rejected"],
      default: "Pending",
    },
    additionalInfo: {
      type: [CommentSchema], // Array of comment objects
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User schema
      ref: "User",
      required: true, // Ensure tickets are always associated with a user
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
