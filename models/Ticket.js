// models/Ticket.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  userName: {
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
  additionalInfo: {
    type: String,
    required: true,
    default: '',
  },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
