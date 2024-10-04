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

// GET method for retrieving all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Fetch all tickets from the database
    res.status(StatusCodes.OK).json(tickets); // Respond with the list of tickets
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};


// Get a specific ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createTicket,
  getTickets,
  getTicketById,
};
