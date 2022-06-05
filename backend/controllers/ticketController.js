const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const { Mongoose } = require("mongoose");
//@desc get user tickets
//@route GET /api/tickets
//@access Private access
const getTickets = asyncHandler(async (req, res) => {
  //get user with JWT id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

//@desc create user ticket
//@route POST /api/tickets
//@access Private access
const createTicket = asyncHandler(async (req, res) => {
  const { product, description, priority } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.create({
    product,
    description,
    priority,
    user: req.user.id,
    status: "new",
  });
  res.status(201).json(ticket);
});

//@desc get user ticket
//@route GET /api/tickets/:id
//@access Private access
const getTicket = asyncHandler(async (req, res) => {
  //get user with JWT id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (user.role === "regular" && ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

//@desc delete ticket
//@route delete /api/tickets/:id
//@access Private access
const deleteTicket = asyncHandler(async (req, res) => {
  //get user with JWT id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});
//@desc Update ticket
//@route PUT /api/tickets/:id
//@access Private access
const updateTicket = asyncHandler(async (req, res) => {
  //get user with JWT id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

//@desc get all users tickets
//@route GET /api/tickets/all
//@access Private access staff & admin
const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await await Ticket.find()
    .sort({ _id: -1 })
    .populate("user", "name");

  //Make sure user is valid
  if (!req.user.role === ("admin" || "staff")) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  res.status(200).json(tickets);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
};
