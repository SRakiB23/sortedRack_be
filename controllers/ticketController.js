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
    author,
  } = req.body;

  try {
    const newTicket = await Ticket.create({
      userName,
      email,
      department,
      device,
      priority,
      additionalInfo,
      author,
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
  const { id } = req.params;
  const { additionalInfo } = req.body;

  try {
    // Find the ticket by ID and update additionalInfo
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { additionalInfo }, // Updating additionalInfo array
      { new: true } // Return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket", error });
  }
};


const getMyTickets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tickets = await Ticket.find({ author: userId });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id; // Get the ticket ID from the request parameters
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId); // Delete the ticket by ID

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully', ticket: deletedTicket });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  getMyTickets,
  deleteTicket,
};
