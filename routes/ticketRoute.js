const express = require("express");
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  getMyTickets,
  deleteTicket,
} = require("../controllers/ticketController");

const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

router.post("/tickets", createTicket); // Create a new ticket
router.get("/gettickets", getTickets); // Get all tickets
router.get("/tickets/:id", getTicketById); // Get ticket by ID
router.put("/tickets/:id", updateTicket); // Update ticket by ID
router.get("/mytickets", authenticateUser, getMyTickets); // Secure the route with authentication middleware
router.delete("/tickets/:id", deleteTicket);

module.exports = router;
