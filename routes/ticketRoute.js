// routes/ticketRoute.js
const express = require('express');
const { createTicket, getTickets,getTicketById } = require('../controllers/ticketController');
const router = express.Router();

router.post('/tickets', createTicket);

// GET method for retrieving tickets
router.get('/gettickets', getTickets);
router.get('/tickets/:id', getTicketById);


module.exports = router;
