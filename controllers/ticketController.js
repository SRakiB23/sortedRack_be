// controllers/ticketController.js
const Ticket = require('../models/Ticket');
const { StatusCodes } = require('http-status-codes');

const createTicket = async (req, res) => {
  const { userName, department, device, priority, additionalInfo } = req.body;

  try {
    const newTicket = await Ticket.create({ userName, department, device, priority, additionalInfo });
    res.status(StatusCodes.CREATED).json(newTicket);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
};
