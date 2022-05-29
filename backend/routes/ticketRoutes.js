const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");
const { protectedRoute } = require("../middleware/authMiddleware");

//Reroute into note router
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);
router
  .route("/")
  .get(protectedRoute, getTickets)
  .post(protectedRoute, createTicket);

router
  .route("/:id")
  .get(protectedRoute, getTicket)
  .delete(protectedRoute, deleteTicket)
  .put(protectedRoute, updateTicket);
module.exports = router;
