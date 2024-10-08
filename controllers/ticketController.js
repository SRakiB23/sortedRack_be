const Ticket = require("../models/Ticket");
const { StatusCodes } = require("http-status-codes");

// Create a new ticket
const createTicket = async (req, res) => {
  const {
    userName,
    email,
    department,
    device,
    priority,
    additionalInfo = [],
  } = req.body;

  try {
    const newTicket = await Ticket.create({
      userName,
      email,
      department,
      device,
      priority,
      additionalInfo,
    });
    res.status(StatusCodes.CREATED).json(newTicket);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Fetch all tickets
    res.status(StatusCodes.OK).json(tickets); // Respond with tickets list
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Get a specific ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(StatusCodes.OK).json(ticket);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Update a ticket's status and additional comments
const updateTicket = async (req, res) => {
  const { status, comment } = req.body;

  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (status) {
      ticket.status = status;
    }

    // Add a new comment to the array if provided
    if (comment) {
      const newComment = { comment }; 
      ticket.additionalInfo.push(newComment); 
    }

    await ticket.save(); // Save the updated ticket
    res.status(StatusCodes.OK).json(ticket);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const userId = req.user._id; 
    const tickets = await Ticket.find({ author: userId });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  getMyTickets,
};
