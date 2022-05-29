const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
//Replace body_parser
app.use(express.urlencoded({ extended: false }));
const { errorHandler } = require("./middleware/errorHandlerMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
// Connect to mongoDB database
connectDB();

app.get("/", (req, res) => {
  res.status("200").json({ message: "Bruh" });
});

// Allowed Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));
