const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["Laptop", "Desktop", "Tablet", "MacBook", "iPad"],
    },
    description: {
      type: String,
      required: [true, "Please enter description of the issue"],
    },
    priority: {
      type: String,
      required: true,
      enum: ["critical", "high", "normal", "low"],
      default: "normal",
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed", "onHold"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
