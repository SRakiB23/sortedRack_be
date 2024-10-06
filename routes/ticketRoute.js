const express = require("express");
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/tickets", createTicket); // Create a new ticket
router.get("/gettickets", getTickets); // Get all tickets
router.get("/tickets/:id", getTicketById); // Get ticket by ID
router.put("/tickets/:id", updateTicket); // Update ticket by ID

module.exports = router;
