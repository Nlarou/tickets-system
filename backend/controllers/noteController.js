const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

//@desc get notes of a ticket
//@route GET /api/tickets/:ticketsId/notes
//@access Private access
const getNotes = asyncHandler(async (req, res) => {
  //get user with JWT id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (user.role === "regular" && ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const notes = await Note.find({ ticket: req.params.ticketId }).populate(
    "user",
    "name"
  );

  res.status(200).json(notes);
});

//@desc create a note for a ticket
//@route POST /api/tickets/:ticketsId/notes
//@access Private access
const createNote = asyncHandler(async (req, res) => {
  //get user with  JWT id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  //Stop other user to create note on other people tickets
  if (user.role === "regular" && ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //Create the note
  const noteCreated = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: ["staff", "admin"].includes(user.role),
    user: req.user.id,
  });
  //fetch the newly create note with user information
  const note = await Note.findById(noteCreated._id).populate("user", "name");
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  createNote,
};
